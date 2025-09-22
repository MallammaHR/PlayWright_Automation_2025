import { Browser, chromium, Locator, Page } from '@playwright/test';

// IIFE - Immediately Invoked Function Expression
(async () => {
  let browser: Browser = await chromium.launch({
    headless: false,
    channel : 'chrome',
    
  });

  let page: Page = await browser.newPage();

  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');


  //for button or input  ,if visible text or value is availble (for eg:Login,Conitnue)
  //for button if its  link-tag (a) then its link with 
  //input or button=>role=button
  //link(a)=>role=>link
  await page.getByRole('button',{ name:'Login'}).highlight();
  //await page .getByRole('link',{name:'CContinue'}).highlight();


 //close the brower
    //await page.close();
})();