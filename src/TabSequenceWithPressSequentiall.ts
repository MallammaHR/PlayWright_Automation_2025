import { Browser, chromium, Locator, Page,FrameLocator } from '@playwright/test';

// IIFE - Immediately Invoked Function Expression
(async () => {
  let browser: Browser = await chromium.launch({
    headless: false,
    channel : 'chrome',
    
  });

  let page: Page = await browser.newPage();

  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
 
  await page.locator('#input-firstname').focus();
  await page.locator('#input-firstname').pressSequentially('Testing',{delay:200});
  await page.keyboard.press('Tab');
  await page.keyboard.type('Automation',{delay : 200});
  await page.keyboard.press('Tab');
  await page.keyboard.type('testing1234@gmail.com',{delay:200});
  await page.keyboard.press('Tab');


})();