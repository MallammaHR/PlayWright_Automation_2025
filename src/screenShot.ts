import { Browser,chromium,Page,Locator } from "@playwright/test";

let page :Page;
//IIFE
(async() => {
    let browser : Browser = await chromium.launch({
        headless : false,
        channel : 'chrome'
    });
    page = await browser.newPage();

    await page.goto('https://www.orangehrm.com/en/contact-sales/');
    //1.By using screenshot()
    // await page.screenshot({path : 'one.png'});
    // //2.to take full page
    // await page.screenshot({path : 'fullPage.png',fullPage:true});
    // await page.screenshot({path:'./screenshot/mypic.png',fullPage:true});//specific location 
    //3.screenshot of specific page with height and width 
    await page.screenshot({
        path :'./screenshot/random.png',
        clip : {x : 0,y : 0, width :800,height:600}
    })
    //4.specific element or locator
    let logoELement:Locator =page.getByAltText('OrangeHRM Logo').first();
    await logoELement.screenshot({path : './screenshot/log.png'});

    let formElement : Locator = page.locator('#Form_getForm_FullName');
    await formElement.screenshot({path : './screenshot/formele.png'});

    //5.chang the formate and png to jpg(by default playwright takw screenshot in the form of png)
    await page.screenshot({

        path : './screenshot/profilepic.jpeg',
        type :  'jpeg',
        quality : 80,//(by deafault 0 to 100)
        fullPage : false
    })

})();