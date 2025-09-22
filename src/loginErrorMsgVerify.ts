import { Browser, chromium, Locator, Page } from '@playwright/test';

// IIFE - Immediately Invoked Function Expression
(async () => {
  let browser: Browser = await chromium.launch({
    headless: false,
    channel: 'chrome' ,
    
  });

  let page: Page = await browser.newPage();

  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

  await page.getByRole('textbox', {name : 'E-Mail Address'}).fill('123march2024@open.com')
  await page.getByRole('textbox' , {name : 'password'}).fill('Selenium@12345');

  await page.getByRole('button' , {name : 'Login'}).click();

  let loginErrMsgLoc=page.getByText(' Warning: No match for E-Mail Address and/or Password.' , {exact:true})
  await loginErrMsgLoc.waitFor();

  let LoginErrMsgTxt : string = await loginErrMsgLoc.innerText();
  console.log('Login Error Message is : '+LoginErrMsgTxt);

  await page.waitForTimeout(2000);

  //close the brwoser
   await page.close();

})();