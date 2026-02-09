import { Browser,chromium,Page,Locator } from "@playwright/test";

let page :Page;
//IIFE
(async() => {
    let browser : Browser = await chromium.launch({
        headless : false,
        channel : 'chrome'
    });
   

    page = await browser.newPage();
    await page.goto('https://github.com/MallammaHR?tab=repositories');
   // await page.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').click();

    await page.evaluate(() => window.scrollTo(0,document.body.scrollHeight));
    await page.waitForTimeout(3000);

    await page.evaluate(()=>window.scrollTo(document.body.scrollHeight,0));


})();