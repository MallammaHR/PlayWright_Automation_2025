// import { test, expect, chromium } from '@playwright/test';

// test('Opera login test', async () => {
//   let operaPath = 'C:\\Users\\Mallukinnis\\AppData\\Local\\Programs\\Opera\\opera.exe';

//   let browser = await chromium.launch({
//     headless: true,
//     executablePath: operaPath,
//   });
// let page: Page = await browser.newPage();
 
//   await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

//   const title = await page.title();
//   console.log('Page Title:', title);
//   expect(title).toBe('Account Login');

//   await page.fill('#input-email', 'naveen@gmail.com');

//   await browser.close();
// });