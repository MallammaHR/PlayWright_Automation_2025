import { Browser,chromium,Page,Locator } from "@playwright/test";

let page :Page;
//IIFE
(async() => {
    let browser : Browser = await chromium.launch({
        headless : false,
        channel : 'chrome'
    });
   

    page = await browser.newPage();
    await page.goto('https://www.orangehrm.com/en/contact-sales/');
    //scrollIntoViewIfNeeded
    page.on('framenavigated', async() => {
        let accetCookiesButton = page.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');
        if(await accetCookiesButton.isVisible())
        {
            accetCookiesButton.click();
        }
    });
      
     let [newTab3]= await Promise.all([

         page.waitForEvent('popup'),
         page.locator(` //a[contains(@href,'instagram')]`).click(),

    ]);
    await page.waitForTimeout(4000);
    console.log(await newTab3.title());
    console.log(newTab3.url());

// const [newTab] = await Promise.all([
//     await page.waitForEvent('popup'),
//     page.locator("//a[contains(@href,'youtube.com/user/orangehrm')]").click()
// ]);


})();
