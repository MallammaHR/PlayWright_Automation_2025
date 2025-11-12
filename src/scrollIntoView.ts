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
     await page.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').click();
    // await page.locator(`//a[contains(text(),'Careers')]`).nth(2).scrollIntoViewIfNeeded();
    // await page.waitForTimeout(3000);
    // await page.locator(`//a[contains(text(),'Careers')]`).nth(2).click();
 

    //1.scroll pixel by pixel-window.scrollBy(0,1000);
    //to jump bottom of the page-window.scrollTo(0,document.body.scrollHeight);
    //to jump top of the page-window.scrollTo(document.body.scrollHeight,0);
    //another way:window.scrollTo(0,0)


    //2.scroll down b 1000 pixels
    // await page.evaluate(() => window.scrollBy(0, 100));
    // await page.waitForTimeout(2000);
    // await page.evaluate(() => window.scrollBy(0, 2000));

    //3.scroll down to bottom of the page
    await page.evaluate(() => window.scrollTo(0,document.body.scrollHeight));
    await page.waitForTimeout(2000);

    //4.scroll up to the top of the page
    await page.evaluate(() =>window.scrollTo(document.body.scrollHeight,0));


 
})();
