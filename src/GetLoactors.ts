import { Browser,chromium,Locator, Page } from '@playwright/test';

// IIFE - Immediately Invoked Function Expression
(async () => {

  let browser: Browser = await chromium.launch(
    
    { 
      headless: false , 
      channel:'chrome',

    });

//   //launch the browser 
      let page: Page = await browser.newPage();
//   await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

  //close the browser 
 // await browser.close(); 



})();
