import { Browser, chromium, Locator, Page } from '@playwright/test';

// IIFE - Immediately Invoked Function Expression
(async () => {
  let browser: Browser = await chromium.launch({
    headless: false,
    channel: 'chrome' ,
    
  });

  let page: Page = await browser.newPage();

  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');

  //get the title of the register account 
  //textContent():will give text of the element + any hidden text in the DOM 
  let header :string = await page.getByText('Register Account' , {exact : true }).innerText();
 console.log(header);



 //close the brower
 await page.close();
})();