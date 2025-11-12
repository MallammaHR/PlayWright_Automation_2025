import { Browser,chromium,Page,Locator } from "@playwright/test";
import { promises } from "readline";

let page :Page;
//IIFE
(async() => {
    let browser : Browser = await chromium.launch({
        headless : false,
        channel : 'chrome'
    });
    page = await browser.newPage();

    //create event listener for accept cookies
    //backgroun listener

    page.on('framenavigated', async() => {
        let accetCookiesButton = page.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');
        if(await accetCookiesButton.isVisible())
        {
            accetCookiesButton.click();
        }
        
    });

    await page.goto('https://www.orangehrm.com/en/contact-sales/');
    
    let [newTab1]= await Promise.all([

         page.waitForEvent('popup'),
         page.locator(`//a[contains(@href,'mycompany')]`).click(),


    ]);

    let [newTab2]= await Promise.all([

         page.waitForEvent('popup'),
         page.locator(`//a[contains(@href,'x.com')]`).click(),

    ]);

    let [newTab3]= await Promise.all([

         page.waitForEvent('popup'),
         page.locator(` //a[contains(@href,'instagram')]`).click(),

    ]);

        let [newTab4]= await Promise.all([

         page.waitForEvent('popup'),
         page.locator(`//a[contains(@href,'facebook')]`).click(),

    ]);
    //newtab1
    console.log("Ttitle of the newTab1 is : "+await newTab1.title());
    console.log("URL of the newTab1 is : " + newTab1.url());
    await newTab1.close();
    //newtab2
    console.log("Ttitle of the newTab2 is : "+await newTab2.title());
    console.log("URL of the newTab2 is : " + newTab2.url());
    await newTab2.close();
    //newtab3
    console.log("Ttitle of the newTab3 is : "+await newTab3.title());
    console.log("URL of the newTab3 is : " + newTab3.url());
    await newTab3.close();
    //newtab4
    console.log("Ttitle of the newTab4 is : "+await newTab4.title());
    console.log("URL of the newTab4 is : " + newTab4.url());
    await newTab4.close();
    //main page 
    console.log("Ttitle of the Main Page  is : "+await page.title());
    console.log("URL of the Main Page  is : " + page.url());
   
})();