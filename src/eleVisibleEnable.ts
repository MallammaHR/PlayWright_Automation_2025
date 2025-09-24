import { Browser, chromium, Locator, Page } from '@playwright/test';

// IIFE - Immediately Invoked Function Expression
(async () => {
  let browser: Browser = await chromium.launch({
    headless: false,
    channel : 'chrome',
    
  });

  let page: Page = await browser.newPage();

  await page.goto('https://classic.freecrm.com/register/');

  //isVisible
 let submitBTN=page.locator("#submitButton");
 let isVisible:boolean=await submitBTN.isVisible();//true
 console.log(isVisible)

 //isEnabled
 let isEnabled:boolean =await submitBTN.isEnabled();//false
 console.log(isEnabled);
//isDisabled
 let isDisabled:boolean =await submitBTN.isDisabled();//true
 console.log(isDisabled);

 //i am trying to click on the disabled element 
 //It is not interactive.
//The browser will ignore click events.
//No form submission will occur.
//It may appear greyed out or visually inactive (depends on CSS or browser default styling).
//avoide clicking on the disabled element
 await submitBTN.click();

// await  page.locator('[name="agreeTerms"]').check();

// isVisible=await submitBTN.isVisible();
// console.log(isVisible);//true

// isEnabled=await submitBTN.isEnabled();
// console.log(isEnabled);//true

// isDisabled =await submitBTN.isDisabled();
// console.log(isDisabled);//false

await page.close();
})();