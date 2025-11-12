import { chromium, Browser,Dialog, Page } from "@playwright/test";

let page : Page;

//IIFE
(async() => {
    let browser : Browser = await chromium.launch({
        headless : false,
        channel : 'chrome'
    });
    page = await browser.newPage();

    page.goto("https://www.orangehrm.com/en/contact-sales/");
    await page.locator('#CybotCookiebotDialogBodyLevelButtonLevel OptinAllowAll').click();

    let [newTab] = await Promise.all([

        page.waitForEvent('popup'),
        page.locator(`//a[contains(@href,'careers')]`).nth(2).click(),

    ]);

    await page.waitForTimeout(3000);
    console.log(await newTab.title());
    console.log(newTab.url());
    await newTab.close();

    //back to main the page
    await page.bringToFront();
    await page.waitForTimeout(2000);
    let firstName  = page.getByPlaceholder('Full Name*')
    await firstName.fill('MALLUUUUUUUUUUUUU');
    let  inputValue = await firstName.inputValue();
    console.log(inputValue);
    await page.close();

})();