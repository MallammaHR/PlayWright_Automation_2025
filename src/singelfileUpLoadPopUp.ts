import { Browser,chromium,Page,Locator } from "@playwright/test";

let page :Page;
//IIFE
(async() => {
    let browser : Browser = await chromium.launch({
        headless : false,
        channel : 'chrome'
    });
   
//1.singleFile Upload
    //for fileUpload Popup ,We should inspect choose file (but should not click)
    // and also we should see the type="file" attribute should be there for there choose button,
    // otherwise we cannot upload the file or we cannot automate
    page=await browser.newPage();
    page.goto('https://practice.expandtesting.com/upload');
    await page.getByTestId('file-input').setInputFiles('C:/Users/Mallukinnis/OneDrive/Documents/mallu.xlsx');//In selenium we senKeys() to  pass the fileLoctaion
    //inspect the upload button and then click ok
    await page.locator('#fileSubmit').click();
})();