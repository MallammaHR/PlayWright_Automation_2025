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


     //Multiple links at specific area[Header or footer or at login section or at list group]
     //list of  groups
    //xpath://a[@class='list-group-item'] or css:a.list-group-item
    let allInnerlinks:string[]=await page.locator(`a.list-group-item`).allInnerTexts();
    console.log(allInnerlinks.length);//13
    console.log(allInnerlinks);//[.......]

    //print one by one using for..of..loop
    // for(let e of allInnerlinks)
    // {
    //     console.log(e);
    //     if( e === 'Forgotten Password')
    //     {
    //         await page.getByText(e).first().click();
    //         break;
    //     }
    // }

    console.log("========================================================");
    //indexing or for loop
    for(let i =0;i < allInnerlinks.length;i++)
    {
        console.log(allInnerlinks[i]);
        if( allInnerlinks[i] === 'Forgotten Password')
        {
            await page.getByText(allInnerlinks[i]).first().click();
            break;
        }
    }

    //Note:Can be used any one method for loop or for...of loop also can be used 


    //await page.close();

})();