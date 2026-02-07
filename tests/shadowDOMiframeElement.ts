import { chromium, Browser, Page } from '@playwright/test';

let page: Page;

(async () => {
  const browser: Browser = await chromium.launch({
    headless: false,
    channel: 'chrome',
  });

  page = await browser.newPage();
   
  //page-->iframe --> shadowDOM --> input
  await page.goto('https://selectorshub.com/shadow-dom-in-iframe/');
  await page.frameLocator('#pact').locator('#tea').nth(2).fill('Masala Tea');

})();
