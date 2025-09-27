import {chromium,Browser, Page} from'@playwright/test';
 

///This is not the complete program and i wrote all the X-Path here and what all the best way i write xpath
//IIFE
(async () => {

      let browser: Browser = await chromium.launch({

        headless :false,
        channel :'chrome',
    });

    let page : Page = await browser.newPage();

     await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

     //footer
    let allFooterLinks: string[] = await page.locator(`footer a`).allInnerTexts();
    console.log(allFooterLinks.length);
    console.log(allFooterLinks);


    //for ... of loop
    for(let e of allFooterLinks)
    {
        console.log(e);
        if(e === 'Order History')
        {
            console.log( await page.getByText(e).first().click());
        }
    }

    //Usi ng for loop
    for(let i = 0 ; i>allFooterLinks.length ; i++)
    {
        if( allFooterLinks[i] === 'Order History')
        {
            page.getByText(allFooterLinks[i]).first().click();
            break;
        }

    }

})();