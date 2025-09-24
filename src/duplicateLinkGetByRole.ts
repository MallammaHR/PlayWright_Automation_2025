import { Browser, chromium, Locator, Page } from '@playwright/test';

// IIFE - Immediately Invoked Function Expression
(async () => {
  let browser: Browser = await chromium.launch({
    headless: false,
    channel: 'chrome' ,
    
  });

  let page: Page = await browser.newPage();

  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
  //await page.getByRole('link' , {name : 'Forgotten Password'}).click();
  await page.getByRole('link' , {name : 'Forgotten Password'}).first().click();

  await page.waitForTimeout(2000);

  //close the brwoser
   await page.close();

})();