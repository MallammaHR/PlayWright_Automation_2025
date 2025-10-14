import { Browser,chromium,Page,Locator } from "@playwright/test";

let page :Page;
//IIFE
(async() => {
    let browser : Browser = await chromium.launch({
        headless : false,
        channel : 'chrome'
    });
   

    //basic auth popup
    //1.directly sending the username and password in the URL
    // await page.goto(`https://admin:admin@the-internet.herokuapp.com/basic_auth`);
    //2.creating seperately the username and password
    // let page : Page = await browser.newPage();
    // let userName = 'admin';
    // let password = 'admin';

    // await page.goto(`https://${userName}:${password}@the-internet.herokuapp.com/basic_auth`);//Note:cannot have two or more @ in URL 
    
    //3.by passing the username and password in httpCredentials through browserContext
   let context = await browser.newContext({
        
        httpCredentials : {
            username: "admin",
            password: "admin"
        }

       }
    )

    page=await context.newPage();
    page.goto(`https://the-internet.herokuapp.com/basic_auth`);
    page


})();