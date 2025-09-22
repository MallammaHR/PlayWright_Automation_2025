import { Browser, chromium, Locator, Page } from '@playwright/test';

// IIFE - Immediately Invoked Function Expression
(async () => {
  let browser: Browser = await chromium.launch({
    headless: false,
    channel: 'chrome' ,
    
  });

  let page: Page = await browser.newPage();

  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');

  // 1. getByRole()
     await page.getByRole('textbox', { name: 'First Name' }).fill('mallumani');
     await page.getByRole('textbox', { name: 'Last Name' }).fill('INDIA');
     await page.getByRole('radio',{name:'Yes'}).click();
    //await page.getByRole('button',{name:'Continue'}).check();
    
 //close the brower
    // await page.close();
})();