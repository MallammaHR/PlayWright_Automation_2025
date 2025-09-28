import {chromium,Browser,Locator, Page} from'@playwright/test';
 

///This is not the complete program and i wrote all the X-Path here and what all the best way i write xpath
//IIFE
(async () => {

      let browser: Browser = await chromium.launch({

        headless :false,
        channel :'chrome',
    });

    let page : Page = await browser.newPage();

     await page.goto('https://www.amazon.co.in');

    //total links on the page where href
     let totalLinks : string[] = await page.locator(`//a[@href]`).allInnerTexts();//css=a[href]
     console.log(totalLinks.length);

     
    //img on the page where alt
     //total links on the page where href
     let totalimg: string[] = await page.locator(`img[alt]`).allInnerTexts();//xpath=img[//@alt]
     console.log(totalimg.length);


})();