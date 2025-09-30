import {chromium,Browser,Locator, Page} from'@playwright/test';
 

///This is not the complete program and i wrote all the X-Path here and what all the best way i write xpath
//IIFE
(async () => {

      let browser: Browser = await chromium.launch({

        headless :false,
        channel :'chrome',
    });

    let page : Page = await browser.newPage();

     await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

     let emailID : Locator = page.locator('#input-email');
     await emailID.fill('Mallu');

     //here I am using the inputValue() to get the current value of the input
      const inputValue = await emailID.inputValue();

      console.log('Email input value:', inputValue);

       await browser.close();


})();