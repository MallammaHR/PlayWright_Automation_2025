import { Browser, firefox,chromium,webkit,Locator, Page } from '@playwright/test';

const bravePath = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';

(async () => {
  const browser: Browser = await chromium.launch({
    headless: false,
    executablePath: bravePath,
  });

  let page: Page = await browser.newPage();
  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

  let title = await page.title();
  console.log('Page Title:', title);

  let url = page.url();
  console.log('URL of the page is: ', url);

  let emailID: Locator = page.locator('#input-email');
  await emailID.fill('naveen@test.com');

  await browser.close();
})();