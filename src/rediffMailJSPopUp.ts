import { Browser,chromium,Page,Locator } from "@playwright/test";

//IIFE
(async() => {
    let browser : Browser = await chromium.launch({
        headless : false,
        channel : 'chrome'
    });
    let page : Page = await browser.newPage();

    page.on('dialog',async dialog => { 
        console.log(dialog.message());
        await dialog.accept();
    })

    

    await page.goto('https://mail.rediff.com/cgi-bin/login.cgi/config/ma');
    await page.getByText('Log In').click();



})();