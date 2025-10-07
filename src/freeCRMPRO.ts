import { Browser, chromium, Locator, Page,FrameLocator } from '@playwright/test';

// IIFE - Immediately Invoked Function Expression
(async () => {
  let browser: Browser = await chromium.launch({
    headless: false,
    
  });

  let page: Page = await browser.newPage();

  await page.goto('https://classic.crmpro.com/index.html');

 await page.locator(`input[name='username']`).fill('roopa12345');

 await page.locator(`input[name='password']`).fill('roopa@12345');

 await page.locator(`//input[@value='Login']`).click();
let mainFrame : FrameLocator = page.frameLocator(`frame[name='mainpanel']`);

//await page.waitForTimeout(2000);

await mainFrame.getByTitle('Contacts',{exact : true}).hover();
await page.waitForTimeout(5000);
// await mainFrame.locator(`//a[text()="Contacts"]`).hover();
//await mainFrame.locator(`//a[text()="New Contact"]`).click();
})();

