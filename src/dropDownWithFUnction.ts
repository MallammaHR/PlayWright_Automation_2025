import {chromium,Browser,Locator, Page} from'@playwright/test';
 

///This is not the complete program and i wrote all the X-Path here and what all the best way i write xpath
//IIFE
(async () => {

      let browser: Browser = await chromium.launch({

        headless :false,
        channel :'chrome',
    });

    let page : Page = await browser.newPage();
    
    await page.goto('https://naveenautomationlabs.com/opencart/ui/selectdropdowns.html');

    await page.locator('#month >> option[value="5"]').waitFor({ state: 'visible' });

    //Locators of all drop Downs
    let day : Locator = page.locator('#day');
    let month : Locator = page.locator('#month');
    let year: Locator = page.locator('#year');

    //Drop Downs Can be Handled By using selectOption() by passing the attribute vlaue,visible text or index value

   

    await page.close();
})();
