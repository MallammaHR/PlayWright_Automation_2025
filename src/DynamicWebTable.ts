import {chromium,Browser,Locator, Page} from'@playwright/test';
 

///This is not the complete program and i wrote all the X-Path here and what all the best way i write xpath
//IIFE
(async () => {

      let browser: Browser = await chromium.launch({

        headless :false,
        channel :'chrome',
    });

    let page : Page = await browser.newPage();

     await page.goto('https://naveenautomationlabs.com/opencart/ui/webtable.html');


     await page.locator(`//td[text()='Joe.Root']/preceding-sibling::td/input[@type='checkbox']`).click();

     await page.locator(`//td[text()='Jonathan.Adams']/preceding-sibling::td/input[@type='checkbox']`).click();

     //await browser.close();


})();