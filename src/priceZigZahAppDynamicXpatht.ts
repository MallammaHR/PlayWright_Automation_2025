import { Browser, chromium, Locator, Page } from '@playwright/test';

// IIFE - Immediately Invoked Function Expression
(async () => {
  let browser: Browser = await chromium.launch({
    headless: false,
    channel : 'chrome',
    
  });

  let page: Page = await browser.newPage();

  await page.goto('https://int.zigzag.lk/?srsltid=AfmBOoovJKuf0iX2PPfqooUFAFoA-5Oye9BlX-Aj19o05V6SqFdMoUdz');

 let priceDetail1 : string = await page.locator(`//a[text()='Detailed Collar Short Sleeve Top']/ancestor::div[contains(@class,'d-flex flex-column')]/child::div/span/span[contains(text(),'USD')]`).innerText();

console.log(priceDetail1);

let priceDetails2 :string = await page.locator(`//a[contains(text(),'Floral Embroidered Shirt')]/ancestor::div[contains(@class,'d-flex flex-column')]/child::div/span/span[contains(text(),'USD')]`).innerText();

console.log(priceDetails2);


})();