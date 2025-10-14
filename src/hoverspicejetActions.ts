import { Browser, chromium, Locator, Page,FrameLocator } from '@playwright/test';

// IIFE - Immediately Invoked Function Expression
(async () => {
  let browser: Browser = await chromium.launch({
    headless: false,
    channel : 'chrome',
    
  });

  let page: Page = await browser.newPage();

  await page.goto('https://www.spicejet.com/');

  await page.getByText('Add-ons',{exact:true}).hover();

  await page.getByTestId('test-id-Taxi').click();
})();