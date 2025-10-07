import {chromium,Browser,Locator, Page} from'@playwright/test';
//IIFE
(async () => {

      let browser: Browser = await chromium.launch({

        headless :false,
        channel :'chrome',
    });

    let page : Page = await browser.newPage();

    await page.goto('https://naveenautomationlabs.com/opencart/ui/webtable.html');

   // await page.locator(`//td[text()='Ryan.Lopez']/preceding-sibling::td/input[@type='checkbox']`).click();

   await doClickCheckBox(page,'Ryan.Lopez');
   await doClickCheckBoxCss(page,'Joe.Root');

})();

//xpath
async function doClickCheckBox(page:Page , userName : string) :Promise<void>
{
    await page.locator(`//td[text()='${userName}']/preceding-sibling::td/input[@type='checkbox']`).first().click(); 
}

//css
async function doClickCheckBoxCss(page:Page,username:string):Promise<void>{
     await page.locator(`tr:has(td:text('${username}'))`).locator('td').first().click();
    
}