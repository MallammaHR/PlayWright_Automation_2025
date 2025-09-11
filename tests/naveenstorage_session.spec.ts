import { test, expect } from '@playwright/test';

test('store login sesssion-Admin', async ({page}) => {

    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
    await page.locator("#input-email").fill('pwtest@play.com');
    await page.locator("#input-password").fill('test@123');
    await page.locator('//input[@value="Login"]').click();
    await page.waitForURL('https://naveenautomationlabs.com/opencart/index.php?route=account/account');

    //to store the session
    await page.context().storageState({path:'auth/Admin.json'});
});

test('store login sesssion-User-1', async ({page}) => {

    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
    await  page.locator("#input-email").fill('pwtest@play.com');
    await  page.locator("#input-password").fill('test@123');
    await  page.locator('//input[@value="Login"]').click();
    await  page.waitForURL('https://naveenautomationlabs.com/opencart/index.php?route=account/account');

    //to store the session
    //await page.context().storageState({path:'auth/User-1.json'});

});

test('store login sesssion-User-3', async ({page}) => {

    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
    await page.locator("#input-email").fill('seleniumtest1@play.com');
    await page.locator("#input-password").fill('sele@123');
    await page.locator('//input[@value="Login"]').click();
    await page.waitForURL('https://naveenautomationlabs.com/opencart/index.php?route=account/account');

    //to store the session
   // await page.context().storageState({path:'auth/User-2.json'});

});

