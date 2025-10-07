import { Browser, chromium, Locator, Page } from '@playwright/test';

// IIFE - Immediately Invoked Function Expression
(async () => {
  let browser: Browser = await chromium.launch({
    headless: false,
    channel : 'chrome',
    
  });

  let page: Page = await browser.newPage();

  await page.goto('https://int.zigzag.lk/?srsltid=AfmBOoovJKuf0iX2PPfqooUFAFoA-5Oye9BlX-Aj19o05V6SqFdMoUdz');

  let allProduct = await page.locator(`//div[contains(@class,'sorting-collections__products')]`).innerText();

  console.log(allProduct);
})();