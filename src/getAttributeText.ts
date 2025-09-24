import { Browser, chromium, Locator, Page } from '@playwright/test';

// IIFE - Immediately Invoked Function Expression
(async () => {
  let browser: Browser = await chromium.launch({
    headless: false,
    channel : 'chrome',
    
  });

  let page: Page = await browser.newPage();

  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

  let attvalId=await page.locator('#input-email').getAttribute("id");
  console.log(attvalId);

  let attValName=await page.locator('#input-email').getAttribute('name');
  console.log(attValName);

  //to getback the entered data on the login  username textfeild 
  //i want whatever i was eneteded on the username feild 
  //getAttribute will gives us the value which already present in DOM
//   await page.locator('#input-email').fill('naveen@gmail.com');
//   let enetedValue=await page.locator('#input-email').getAttribute('value');//selenoum



//if we want get the any other attribute other than Value attribut we can use getAttribute()
//In playwright we use the method inputValue() to get the value attribute 
await page.locator('#input-email').fill('naveen@gmail.com');
 let enterdInputValue= await page.locator('#input-email').inputValue();
 console.log("Enetered Input Value  : "+enterdInputValue)


 //close the brower
  await page.close();
})();