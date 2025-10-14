import { Browser, chromium, Locator, Page,FrameLocator } from '@playwright/test';

// IIFE - Immediately Invoked Function Expression
(async () => {
  let browser: Browser = await chromium.launch({
    headless: false,
    channel : 'chrome',
    
  });

  let page: Page = await browser.newPage();

  await page.goto('https://api.jquery.com/dblclick/');
 
  let frameElement :FrameLocator = page.frameLocator('iframe');
  let box =frameElement.locator('div');

  //1.Using dbClick()
  await box.dblclick();

  //using by increaing the click count

  await box.click({ clickCount : 2});
})();