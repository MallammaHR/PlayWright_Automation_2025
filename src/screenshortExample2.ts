import {test,Page,Locator,Browser, chromium} from '@playwright/test';

(async()=>{
     let browser:Browser=await chromium.launch({

        headless:false,
        channel:"chrome"
     });

     let page:Page=await browser.newPage();

     await page.goto('https://www.orangehrm.com/en/contact-sales');

    //  await page.screenshot({path:'one.png'});
    //  await page.screenshot({path:'fullPage.png',fullPage:true});

        await page.screenshot({

        path : './screenshot/profile.jpeg',
        type :  'jpeg',
        quality : 80,//(by deafault 0 to 100)
        fullPage : false
    });
})();
