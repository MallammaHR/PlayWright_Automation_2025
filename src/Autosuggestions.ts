import {chromium,Browser,Locator, Page} from'@playwright/test';
 

///This is not the complete program and i wrote all the X-Path here and what all the best way i write xpath
//IIFE
(async () => {

      let browser: Browser = await chromium.launch({

        headless :false,
        channel :'chrome',
    });

        let page : Page = await browser.newPage();


       // Use case 1: serach scenario :at google=> apple .....

     await page.goto('https://www.amazon.co.in');

     await page.locator(`//input[@aria-label ='Search Amazon.in']`).fill('apple');

     await page.locator(`//div[@aria-label='apple 17']`).filter({hasText : '17' }).click();

    //Use case 2: serach scenario :at google=>seraching testing
    await page.goto('https://www.google.com/');

    //Use case 3: serach scenario :at flipkart

})();