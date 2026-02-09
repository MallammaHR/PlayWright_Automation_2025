import{Browser, chromium, Page,test} from '@playwright/test';

(async()=>{
     let browser:Browser=await chromium.launch({
        headless:false,
        channel:"chrome"
     });
    let BrwCtx = await browser.newContext();
    const page = await BrwCtx.newPage();

     page.on('framenavigated', async() => {
        let accetCookiesButton = page.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');
        if(await accetCookiesButton.isVisible())
        {
            accetCookiesButton.click();
        }
    });

    await page.goto('https://www.orangehrm.com/en/contact-sales/');
    let ornageHRMtitle=await page.title();
    await page.locator(`//a[contains(@href,'mycompany')]`).click();
    await page.locator(`//a[contains(@href,'x.com')]`).click();
    await page.locator(` //a[contains(@href,'instagram')]`).click();
    await page.locator(`//a[contains(@href,'facebook')]`).click();

   let allPages:Page[]= BrwCtx.pages();
   console.log(('Total Number of Pages : '+allPages.length));
   
   for(let pg of allPages){
      console.log(await pg.title());
      if(await pg.title()!==ornageHRMtitle){
         await pg.close();
      }
   }
})();