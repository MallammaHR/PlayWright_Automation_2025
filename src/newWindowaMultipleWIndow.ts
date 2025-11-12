import { Browser,chromium,Page,Locator } from "@playwright/test";
import { promises } from "readline";

let page :Page;
//IIFE
(async() => {
    let browser : Browser = await chromium.launch({
        headless : false,
        channel : 'chrome'
    });

   let brCtx =await  browser.newContext();
    page = await brCtx .newPage();

    //delete all the cookies
   page.on('framenavigated', async() => {
        let accetCookiesButton = page.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');
        if(await accetCookiesButton.isVisible())
        {
            await accetCookiesButton.click();
        }
        
    });

    
    await page.goto('https://www.orangehrm.com/en/contact-sales/');//parent Window
    let orangeHRMTitle = await page.title();
    
    await page.locator(`//a[contains(@href,'linkedin')]`).click(),
    
    await page.locator(`//a[contains(@href,'facebook')]`).click(),
    
    await page.locator(`//a[contains(@href,'youtube')]`).click(),
  

    await page.waitForTimeout(3000);
    //number of windows including parent window beacuse the parent window triggeres the newWindow
    //count total number of pages{0,1,2,3 including home Page}
   let allPages : Page[] = brCtx.pages();
   console.log('Total Number of Windows Opened   : '+allPages.length);

   //Iterate one by one
   for(let pg of allPages){
    console.log(await pg.title());
    if(await pg.title()  !== orangeHRMTitle){
        await pg.close();
    }
   }
   await page.bringToFront();
    //await page.evaluate(() => window.scrollTo(0,document.body.scrollHeight));
    // await page.evaluate(() =>window.scrollTo(document.body.scrollHeight,0));
    // await page.waitForTimeout(2000);
    await page.locator('#Form_getForm_FullName').fill('MalluMani');
    console.log(await page.title());
   // await page.close();

})();