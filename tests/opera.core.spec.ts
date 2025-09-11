import { chromium, Browser, Page, Locator } from '@playwright/test';

(async () => {

    const operaPath = 'C:\\Users\\Mallukinnis\\AppData\\Local\\Programs\\Opera\\opera.exe';

    const browser: Browser = await chromium.launch({
      headless: false,
      //channel: 'opera',
      executablePath: operaPath,
    });

    let page: Page = await browser.newPage();
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

    let title: string = await page.title();
    console.log('Page Title:', title);

    let urlPage: string = page.url();
    console.log('URL of the page is:', urlPage);

    let emailID: Locator = page.locator('#input-email');
    await emailID.fill('naveen@gmail.com');

    await browser.close();

})();