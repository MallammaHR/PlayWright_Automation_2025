import { chromium, Browser,Dialog, Page } from "@playwright/test";

let page : Page;

//IIFE
(async() => {
    let browser : Browser = await chromium.launch({
        headless : false,
        channel : 'chrome'
    });
      let brCtx =await  browser.newContext();
      page = await brCtx .newPage();

       page.on('framenavigated', async() => {
        let accetCookiesButton = page.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');
        if(await accetCookiesButton.isVisible())
        {
            await accetCookiesButton.click();
        }
        
    });

    
   await page.goto("https://www.orangehrm.com/en/contact-sales/");

    let orangeHRMTitle = await page.title();

    await page.locator(`//a[contains(@href,'linkedin')]`).click(),
    
    await page.locator(`//a[contains(@href,'facebook')]`).click(),
    
    await page.locator(`//a[contains(@href,'youtube')]`).click(),

    await page.waitForTimeout(3000);
    let allPages : Page[] = brCtx.pages();
    console.log('total number webpages opened : '+allPages.length);

    for(let pg of allPages)
    {
        if(await pg.title() !==  orangeHRMTitle)
        {
            await pg.close();
        }
    }
    
    await page.bringToFront();

    console.log(await page.title());
    await page.close();
})();