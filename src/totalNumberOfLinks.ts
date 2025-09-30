import {chromium, Page,Locator,Browser}  from '@playwright/test';

(async () => {
   

    let browser: Browser = await chromium.launch(
        {

        headless :false,
        channel :'chrome',

        });
   let page : Page = await browser.newPage();

   await page.goto('https://www.flipkart.com/');

   let totalLinks : string[] = await page.locator('a').allInnerTexts();//=>xpath=//a I using css selector 
   //it will print all the total number of links
   console.log(totalLinks.length);//425

   //console.log(totalLinks);
   let totalLinksWithhref : string[] = await page.locator('//a[@href]').allInnerTexts()
   //console.log(totalLinksWithhref.length);
   //console.log(totalLinksWithhref);//it will print all the total links where href available

   //i want to print all the total images
   let totalImges : string[] = await page.locator('//img[@alt]').allInnerTexts();
   console.log(totalImges.length);

})();

