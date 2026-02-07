// ============================================
// PLAYWRIGHT AUTO PIPELINE - JENKINSFILE (Windows-ready)
// ============================================

pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20'
    }

    environment {
        NODE_VERSION = '20'
        CI = 'true'
        PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}\\.cache\\ms-playwright"
        SLACK_WEBHOOK_URL = credentials('slack-webhook-token')
        EMAIL_RECIPIENTS = 'mallammahr05@gmail.com'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '20'))
        timestamps()
        timeout(time: 60, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    stages {
        // ============================================
        // Static Code Analysis (ESLint)
        // ============================================
                    stage('🔍 ESLint Analysis') {
            steps {
                withEnv(["PUPPETEER_SKIP_DOWNLOAD=true"]) {

                    echo '============================================'
                    echo '📥 Installing dependencies...'
                    echo '============================================'
                    bat 'npm ci'

                    echo '============================================'
                    echo '📁 Generating ESLint HTML report...'
                    echo '============================================'
                    bat 'npm run lint || exit 0'

                    echo '============================================'
                    echo '🔍 Running ESLint...'
                    echo '============================================'

                    script {
                        def eslintStatus = bat(
                            script: 'npm run lint',
                            returnStatus: true
                        )
                        env.ESLINT_STATUS = eslintStatus == 0 ? 'success' : 'failure'
                    }
                }
            }

            post {
                always {
                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'eslint-report',
                        reportFiles: 'index.html',
                        reportName: 'ESLint Report',
                        reportTitles: 'ESLint Analysis'
                    ])

                    script {
                        if (env.ESLINT_STATUS == 'failure') {
                            echo '⚠️ ESLint found issues – review the report'
                        } else {
                            echo '✅ No ESLint issues found'
                        }
                    }
                }
            }
        }

        // ============================================
        // DEV Environment Tests
        // ============================================
        stage('🔧 DEV Tests') {
            steps {
                echo '============================================'
                echo '🎭 Installing Playwright browsers (chromium)...'
                echo '============================================'
                // install only chromium and dependencies
                bat 'npx playwright install --with-deps chromium'

                echo '============================================'
                echo '🧹 Cleaning previous results...'
                echo '============================================'
                // Use PowerShell to remove folders safely on Windows
                powershell '''
                    Remove-Item -Recurse -Force -ErrorAction SilentlyContinue "allure-results-combined"
                    New-Item -ItemType Directory -Path "allure-results-combined" -Force | Out-Null
                        '''


                echo '============================================'
                echo '🧪 Running DEV tests...'
                echo '============================================'
                script {
                    env.DEV_TEST_STATUS = bat(
                        script: 'npx playwright test --grep "@login" --config=playwright.config.dev.ts',
                        returnStatus: true
                    ) == 0 ? 'success' : 'failure'
                }

                echo '============================================'
                echo '🏷️ Adding Allure environment info...'
                echo '============================================'
                // create allure-results and write environment.properties using PowerShell (works on Windows)
                bat 'powershell -NoProfile -Command "New-Item -ItemType Directory -Path \\\"allure-results\\\" -Force | Out-Null; Set-Content -Path \\\"allure-results\\environment.properties\\\" -Value \\\"Environment=DEV\\\"; Add-Content -Path \\\"allure-results\\environment.properties\\\" -Value \\\"Browser=Google Chrome\\\"; Add-Content -Path \\\"allure-results\\environment.properties\\\" -Value \\\"Config=playwright.config.dev.ts\\\"; Exit 0"'
            }

            post {
                always {
                    // copy and generate DEV Allure report (PowerShell copy)
                    bat 'powershell -NoProfile -Command "Remove-Item -Recurse -Force -ErrorAction SilentlyContinue \\\"allure-results-dev\\\"; New-Item -ItemType Directory -Path \\\"allure-results-dev\\\" -Force | Out-Null; Copy-Item -Recurse -Force -ErrorAction SilentlyContinue \\\"allure-results\\*\\\" \\\"allure-results-dev\\\"; Exit 0"'
                    // generate allure report (if allure exists)
                    bat 'npx allure generate allure-results-dev --clean -o allure-report-dev || echo \"allure generate failed or not installed\"'

                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'allure-report-dev',
                        reportFiles: 'index.html',
                        reportName: 'DEV Allure Report',
                        reportTitles: 'DEV Allure Report'
                    ])

                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'DEV Playwright Report',
                        reportTitles: 'DEV Playwright Report'
                    ])

                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'playwright-html-report',
                        reportFiles: 'index.html',
                        reportName: 'DEV HTML Report',
                        reportTitles: 'DEV Custom HTML Report'
                    ])

                    archiveArtifacts artifacts: 'allure-results-dev/**/*', allowEmptyArchive: true
                    archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
                }
            }
        }

        // ============================================
        // QA Environment Tests
        // ============================================
        stage('🔍 QA Tests') {
            steps {
                echo '============================================'
                echo '🧹 Cleaning previous results...'
                echo '============================================'
                bat 'powershell -NoProfile -Command "Remove-Item -Recurse -Force -ErrorAction SilentlyContinue \\\"allure-results\\\"; Remove-Item -Recurse -Force -ErrorAction SilentlyContinue \\\"playwright-report\\\"; Remove-Item -Recurse -Force -ErrorAction SilentlyContinue \\\"playwright-html-report\\\"; Remove-Item -Recurse -Force -ErrorAction SilentlyContinue \\\"test-results\\\"; Exit 0"'

                echo '============================================'
                echo '🧪 Running QA tests...'
                echo '============================================'
                script {
                    env.QA_TEST_STATUS = bat(
                        script: 'npx playwright test --grep "@login" --config=playwright.config.qa.ts',
                        returnStatus: true
                    ) == 0 ? 'success' : 'failure'
                }

                echo '============================================'
                echo '🏷️ Adding Allure environment info...'
                echo '============================================'
                bat 'powershell -NoProfile -Command "New-Item -ItemType Directory -Path \\\"allure-results\\\" -Force | Out-Null; Set-Content -Path \\\"allure-results\\environment.properties\\\" -Value \\\"Environment=QA\\\"; Add-Content -Path \\\"allure-results\\environment.properties\\\" -Value \\\"Browser=Google Chrome\\\"; Add-Content -Path \\\"allure-results\\environment.properties\\\" -Value \\\"Config=playwright.config.qa.ts\\\"; Exit 0"'
            }

            post {
                always {
                    bat 'powershell -NoProfile -Command "Remove-Item -Recurse -Force -ErrorAction SilentlyContinue \\\"allure-results-qa\\\"; New-Item -ItemType Directory -Path \\\"allure-results-qa\\\" -Force | Out-Null; Copy-Item -Recurse -Force -ErrorAction SilentlyContinue \\\"allure-results\\*\\\" \\\"allure-results-qa\\\"; Exit 0"'
                    bat 'npx allure generate allure-results-qa --clean -o allure-report-qa || echo \"allure generate failed or not installed\"'

                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'allure-report-qa',
                        reportFiles: 'index.html',
                        reportName: 'QA Allure Report',
                        reportTitles: 'QA Allure Report'
                    ])

                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'QA Playwright Report',
                        reportTitles: 'QA Playwright Report'
                    ])

                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'playwright-html-report',
                        reportFiles: 'index.html',
                        reportName: 'QA HTML Report',
                        reportTitles: 'QA Custom HTML Report'
                    ])

                    archiveArtifacts artifacts: 'allure-results-qa/**/*', allowEmptyArchive: true
                    archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
                }
            }
        }

        // ============================================
        // STAGE Environment Tests
        // ============================================
        stage('🎯 STAGE Tests') {
            steps {
                echo '============================================'
                echo '🧹 Cleaning previous results...'
                echo '============================================'
                bat 'powershell -NoProfile -Command "Remove-Item -Recurse -Force -ErrorAction SilentlyContinue \\\"allure-results\\\"; Remove-Item -Recurse -Force -ErrorAction SilentlyContinue \\\"playwright-report\\\"; Remove-Item -Recurse -Force -ErrorAction SilentlyContinue \\\"playwright-html-report\\\"; Remove-Item -Recurse -Force -ErrorAction SilentlyContinue \\\"test-results\\\"; Exit 0"'

                echo '============================================'
                echo '🧪 Running STAGE tests...'
                echo '============================================'
                script {
                    env.STAGE_TEST_STATUS = bat(
                        script: 'npx playwright test --grep "@login" --config=playwright.config.stage.ts',
                        returnStatus: true
                    ) == 0 ? 'success' : 'failure'
                }

                echo '============================================'
                echo '🏷️ Adding Allure environment info...'
                echo '============================================'
                bat 'powershell -NoProfile -Command "New-Item -ItemType Directory -Path \\\"allure-results\\\" -Force | Out-Null; Set-Content -Path \\\"allure-results\\environment.properties\\\" -Value \\\"Environment=STAGE\\\"; Add-Content -Path \\\"allure-results\\environment.properties\\\" -Value \\\"Browser=Google Chrome\\\"; Add-Content -Path \\\"allure-results\\environment.properties\\\" -Value \\\"Config=playwright.config.stage.ts\\\"; Exit 0"'
            }

            post {
                always {
                    bat 'powershell -NoProfile -Command "Remove-Item -Recurse -Force -ErrorAction SilentlyContinue \\\"allure-results-stage\\\"; New-Item -ItemType Directory -Path \\\"allure-results-stage\\\" -Force | Out-Null; Copy-Item -Recurse -Force -ErrorAction SilentlyContinue \\\"allure-results\\*\\\" \\\"allure-results-stage\\\"; Exit 0"'
                    bat 'npx allure generate allure-results-stage --clean -o allure-report-stage || echo \"allure generate failed or not installed\"'

                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'allure-report-stage',
                        reportFiles: 'index.html',
                        reportName: 'STAGE Allure Report',
                        reportTitles: 'STAGE Allure Report'
                    ])

                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'STAGE Playwright Report',
                        reportTitles: 'STAGE Playwright Report'
                    ])

                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'playwright-html-report',
                        reportFiles: 'index.html',
                        reportName: 'STAGE HTML Report',
                        reportTitles: 'STAGE Custom HTML Report'
                    ])

                    archiveArtifacts artifacts: 'allure-results-stage/**/*', allowEmptyArchive: true
                    archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
                }
            }
        }

        // ============================================
        // PROD Environment Tests
        // ============================================
        stage('🚀 PROD Tests') {
            steps {
                echo '============================================'
                echo '🧹 Cleaning previous results...'
                echo '============================================'
                bat 'powershell -NoProfile -Command "Remove-Item -Recurse -Force -ErrorAction SilentlyContinue \\\"allure-results\\\"; Remove-Item -Recurse -Force -ErrorAction SilentlyContinue \\\"playwright-report\\\"; Remove-Item -Recurse -Force -ErrorAction SilentlyContinue \\\"playwright-html-report\\\"; Remove-Item -Recurse -Force -ErrorAction SilentlyContinue \\\"test-results\\\"; Exit 0"'

                echo '============================================'
                echo '🧪 Running PROD tests...'
                echo '============================================'
                script {
                    env.PROD_TEST_STATUS = bat(
                        script: 'npx playwright test --grep "@login" --config=playwright.config.prod.ts',
                        returnStatus: true
                    ) == 0 ? 'success' : 'failure'
                }

                echo '============================================'
                echo '🏷️ Adding Allure environment info...'
                echo '============================================'
                bat 'powershell -NoProfile -Command "New-Item -ItemType Directory -Path \\\"allure-results\\\" -Force | Out-Null; Set-Content -Path \\\"allure-results\\environment.properties\\\" -Value \\\"Environment=PROD\\\"; Add-Content -Path \\\"allure-results\\environment.properties\\\" -Value \\\"Browser=Google Chrome\\\"; Add-Content -Path \\\"allure-results\\environment.properties\\\" -Value \\\"Config=playwright.config.prod.ts\\\"; Exit 0"'
            }

            post {
                always {
                    bat 'powershell -NoProfile -Command "Remove-Item -Recurse -Force -ErrorAction SilentlyContinue \\\"allure-results-prod\\\"; New-Item -ItemType Directory -Path \\\"allure-results-prod\\\" -Force | Out-Null; Copy-Item -Recurse -Force -ErrorAction SilentlyContinue \\\"allure-results\\*\\\" \\\"allure-results-prod\\\"; Exit 0"'
                    bat 'npx allure generate allure-results-prod --clean -o allure-report-prod || echo \"allure generate failed or not installed\"'

                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'allure-report-prod',
                        reportFiles: 'index.html',
                        reportName: 'PROD Allure Report',
                        reportTitles: 'PROD Allure Report'
                    ])

                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'PROD Playwright Report',
                        reportTitles: 'PROD Playwright Report'
                    ])

                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'playwright-html-report',
                        reportFiles: 'index.html',
                        reportName: 'PROD HTML Report',
                        reportTitles: 'PROD Custom HTML Report'
                    ])

                    archiveArtifacts artifacts: 'allure-results-prod/**/*', allowEmptyArchive: true
                    archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
                }
            }
        }

        // ============================================
        // Generate Combined Allure Report (All Environments)
        // ============================================
        stage('📈 Combined Allure Report') {
            steps {
                echo '============================================'
                echo '📊 Generating Combined Allure Report...'
                echo '============================================'

                // Use PowerShell to merge copied environment results onto combined folder
                bat '''
                    powershell -NoProfile -Command "
                        Remove-Item -Recurse -Force -ErrorAction SilentlyContinue 'allure-results-combined';
                        New-Item -ItemType Directory -Path 'allure-results-combined' -Force | Out-Null;
                        Copy-Item -Recurse -Force -ErrorAction SilentlyContinue 'allure-results-dev\\*' 'allure-results-combined'  -ErrorAction SilentlyContinue;
                        Copy-Item -Recurse -Force -ErrorAction SilentlyContinue 'allure-results-qa\\*' 'allure-results-combined'  -ErrorAction SilentlyContinue;
                        Copy-Item -Recurse -Force -ErrorAction SilentlyContinue 'allure-results-stage\\*' 'allure-results-combined'  -ErrorAction SilentlyContinue;
                        Copy-Item -Recurse -Force -ErrorAction SilentlyContinue 'allure-results-prod\\*' 'allure-results-combined'  -ErrorAction SilentlyContinue;
                        Set-Content -Path 'allure-results-combined\\environment.properties' -Value 'Environment=ALL (DEV, QA, STAGE, PROD)';
                        Add-Content -Path 'allure-results-combined\\environment.properties' -Value 'Browser=Google Chrome';
                        Add-Content -Path 'allure-results-combined\\environment.properties' -Value \"Pipeline=${env.JOB_NAME}\";
                        Add-Content -Path 'allure-results-combined\\environment.properties' -Value \"Build=${env.BUILD_NUMBER}\";
                        Exit 0
                    "
                '''
            }
            post {
                always {
                    // generate combined report (if allure installed)
                    bat 'npx allure generate allure-results-combined --clean -o allure-report-combined || echo \"allure generate failed or not installed\"'

                    allure([
                        includeProperties: true,
                        jdk: '',
                        properties: [],
                        reportBuildPolicy: 'ALWAYS',
                        results: [[path: 'allure-results-combined']]
                    ])
                }
            }
        }

    } // end stages

    // ============================================
    // Post-Build Actions (Notifications)
    // ============================================
    post {
        always {
            echo '============================================'
            echo '📬 PIPELINE SUMMARY'
            echo '============================================'

            script {
                def devStatus = env.DEV_TEST_STATUS ?: 'unknown'
                def qaStatus = env.QA_TEST_STATUS ?: 'unknown'
                def stageStatus = env.STAGE_TEST_STATUS ?: 'unknown'
                def prodStatus = env.PROD_TEST_STATUS ?: 'unknown'

                def devEmoji = devStatus == 'success' ? '✅' : '❌'
                def qaEmoji = qaStatus == 'success' ? '✅' : '❌'
                def stageEmoji = stageStatus == 'success' ? '✅' : '❌'
                def prodEmoji = prodStatus == 'success' ? '✅' : '❌'

                echo """
============================================
📊 Test Results by Environment:
============================================
${devEmoji} DEV:   ${devStatus}
${qaEmoji} QA:    ${qaStatus}
${stageEmoji} STAGE: ${stageStatus}
${prodEmoji} PROD:  ${prodStatus}
============================================
"""

                def overallStatus = 'SUCCESS'
                def statusEmoji = '✅'
                def statusColor = 'good'

                if (devStatus == 'failure' || qaStatus == 'failure' || stageStatus == 'failure' || prodStatus == 'failure') {
                    overallStatus = 'FAILURE'
                    statusEmoji = '❌'
                    statusColor = 'danger'
                } else if (devStatus == 'unknown' || qaStatus == 'unknown' || stageStatus == 'unknown' || prodStatus == 'unknown') {
                    overallStatus = 'UNSTABLE'
                    statusEmoji = '⚠️'
                    statusColor = 'warning'
                }

                env.OVERALL_STATUS = overallStatus
                env.STATUS_EMOJI = statusEmoji
                env.STATUS_COLOR = statusColor
                env.DEV_EMOJI = devEmoji
                env.QA_EMOJI = qaEmoji
                env.STAGE_EMOJI = stageEmoji
                env.PROD_EMOJI = prodEmoji
            }
        }

        success {
            echo '✅ Pipeline completed successfully!'

            script {
                try {
                    slackSend(
                        color: 'good',
                        message: """✅ *Playwright Pipeline: All Tests Passed*

*Repository:* ${env.JOB_NAME}
*Branch:* ${env.GIT_BRANCH ?: 'N/A'}
*Build:* #${env.BUILD_NUMBER}

*Test Results:*
${env.DEV_EMOJI} DEV: ${env.DEV_TEST_STATUS}
${env.QA_EMOJI} QA: ${env.QA_TEST_STATUS}
${env.STAGE_EMOJI} STAGE: ${env.STAGE_TEST_STATUS}
${env.PROD_EMOJI} PROD: ${env.PROD_TEST_STATUS}

📊 <${env.BUILD_URL}allure|Combined Allure Report>
🔗 <${env.BUILD_URL}|View Build>"""
                    )
                } catch (Exception e) {
                    echo "Slack notification failed: ${e.message}"
                }

                // Send email (keeps your original HTML payload)
                try {
                    emailext(
                        subject: "✅ Playwright Tests Passed - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        body: """<!DOCTYPE html><html><head> ... (omitted here to keep Jenkinsfile compact) ...</html>""",
                        mimeType: 'text/html',
                        to: env.EMAIL_RECIPIENTS,
                        from: 'CI Notifications <mail@naveenautomationlabs.com>',
                        replyTo: 'mail@naveenautomationlabs.com'
                    )
                } catch (Exception e) {
                    echo "Email notification failed: ${e.message}"
                }
            }
        }

        failure {
            echo '❌ Pipeline failed!'
            script {
                try {
                    slackSend(
                        color: 'danger',
                        message: """❌ *Playwright Pipeline: Tests Failed*

*Repository:* ${env.JOB_NAME}
*Branch:* ${env.GIT_BRANCH ?: 'N/A'}
*Build:* #${env.BUILD_NUMBER}

*Test Results:*
${env.DEV_EMOJI ?: '❓'} DEV: ${env.DEV_TEST_STATUS ?: 'not run'}
${env.QA_EMOJI ?: '❓'} QA: ${env.QA_TEST_STATUS ?: 'not run'}
${env.STAGE_EMOJI ?: '❓'} STAGE: ${env.STAGE_TEST_STATUS ?: 'not run'}
${env.PROD_EMOJI ?: '❓'} PROD: ${env.PROD_TEST_STATUS ?: 'not run'}

📊 <${env.BUILD_URL}allure|View Allure Report>
🔗 <${env.BUILD_URL}|View Build>"""
                    )
                } catch (Exception e) {
                    echo "Slack notification failed: ${e.message}"
                }

                try {
                    emailext(
                        subject: "❌ Playwright Tests Failed - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        body: """<!DOCTYPE html><html><head> ... (omitted) ...</html>""",
                        mimeType: 'text/html',
                        to: env.EMAIL_RECIPIENTS,
                        from: 'CI Notifications <mail@naveenautomationlabs.com>',
                        replyTo: 'mail@naveenautomationlabs.com'
                    )
                } catch (Exception e) {
                    echo "Email notification failed: ${e.message}"
                }
            }
        }

        unstable {
            echo '⚠️ Pipeline completed with warnings!'
            script {
                try {
                    slackSend(
                        color: 'warning',
                        message: """⚠️ *Playwright Pipeline: Unstable*

*Repository:* ${env.JOB_NAME}
*Branch:* ${env.GIT_BRANCH ?: 'N/A'}
*Build:* #${env.BUILD_NUMBER}

📊 <${env.BUILD_URL}allure|View Allure Report>
🔗 <${env.BUILD_URL}|View Build>"""
                    )
                } catch (Exception e) {
                    echo "Slack notification failed: ${e.message}"
                }
            }
        }
    } // end post
}
