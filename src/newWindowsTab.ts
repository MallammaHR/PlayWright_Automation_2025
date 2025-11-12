import { chromium, Browser,Dialog, Page } from "@playwright/test";


let page :Page;
//IIFE
(async() => {
    let browser : Browser = await chromium.launch({
        headless : false,
        channel : 'chrome'
    });
    page = await browser.newPage();

    await page.goto('https://www.orangehrm.com/en/contact-sales/');
    await page.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').click();

    //tager=_blank should be there to handle newWindowTab
    //if we want to run in the parallel mode we have to to use two prmosises or array of promosises which say array of promisise
    //even for the popup is dialog but for new window/tab-playwright says that for me its popup
    let [newTab]= await Promise.all([

        page.waitForEvent('popup'),
       page.locator(`//a[contains(@href,'mycompany')]`).click() 

    ]);
    await page.waitForTimeout(3000);
    console.log(await newTab.title());
    console.log( page.url());
    await newTab.waitForTimeout(1000);
    await newTab.close();

     //another method to point to the main page
     await page.bringToFront();
     console.log("Parent WIndow Title is  : " + await page.title());
     await page.close();


})();