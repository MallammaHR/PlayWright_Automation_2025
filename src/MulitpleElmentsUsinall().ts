import {chromium,Browser,Locator, Page} from'@playwright/test';
 

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
    //let allFooterLinks: string[] = await page.locator(`footer a`).allInnerTexts();
    // console.log(allFooterLinks.length);
    // console.log(allFooterLinks);
  
    //cpature all the footer link
    let allfooterLocator: Locator[] = await  page.locator('footer a').all();
    console.log(allfooterLocator.length);
    console.log(allfooterLocator);
    
    for(let e  of allfooterLocator)
    {
        //let allLocstring : string = await e.innerText()
        //console.log(await e.innerText());
        // console.log("*******************************************************************************")
        //console.log(await e.getAttribute('href'))
        console.log(await e.inputValue());
        
    }

})();