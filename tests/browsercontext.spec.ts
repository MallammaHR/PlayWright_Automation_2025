import { test, expect, chromium, Browser,BrowserContext,Page } from '@playwright/test';

test('Check the Page Title', async () => {

    let browser:Browser=await chromium.launch({headless:true,channel:'chrome'});

    let context1:BrowserContext = await browser.newContext();
    let context2:BrowserContext = await browser.newContext();
    let context3:BrowserContext =  await browser.newContext();

    let page1:Page=await context1.newPage();
    let page2:Page=await context2.newPage();
    let page3:Page=await context3.newPage();

    //user :admin1
    await page1.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
    await page1.locator("#input-email").fill('march2024@open.com');
    await page1.locator("#input-password").fill('Selenium@12345');
    await page1.locator('//input[@value="Login"]').click();

    //await page1.context().storageState({path:'auth/Admin1.json'});

    //user2:customer
    await page2.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
    await  page2.locator("#input-email").fill('pwtest@play.com');
    await page2.locator("#input-password").fill('test@123');
    await  page2.locator('//input[@value="Login"]').click();

    //await page2.context().storageState({path:'auth/Admin2.json'});

    // //user3:seller
    await page3.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
    await page3.locator("#input-email").fill('seleniumtest1@play.com');
    await page3.locator("#input-password").fill('sele@123');
    await page3.locator('//input[@value="Login"]').click();

    // await page.context().storageState({path:'auth/Admin.json'});

     await page1.waitForTimeout(50000);
     await page2.waitForTimeout(50000);
     await page3.waitForTimeout(50000);

    await context1.close();
    await context2.close();
    await context3.close();

    await browser.close();

});
