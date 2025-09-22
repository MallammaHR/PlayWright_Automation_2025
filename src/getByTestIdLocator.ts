import { Browser,chromium,Locator, Page } from '@playwright/test';

// IIFE - Immediately Invoked Function Expression
(async () => {

  let browser: Browser = await chromium.launch(
    
    { 
      headless: false , 
      channel:'chrome',

    });

//   //launch the browser 
      let page: Page = await browser.newPage();
      await page.goto('https://naveenautomationlabs.com/opencart/ui/data-testid-page.html');
      await page.getByTestId('home-nav-btn').click();
      await page.getByTestId('username-input').fill('MAllumani');

      await page.waitForTimeout(2000);

      //close the browser
      await page,close();
})();