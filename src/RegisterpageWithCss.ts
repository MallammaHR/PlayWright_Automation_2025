import {chromium,Browser, Page} from'@playwright/test';
 
//IIFE
(async () => {

      let browser: Browser = await chromium.launch({

        headless :false,
        channel :'chrome',
    });

    let page : Page = await browser.newPage();
    
    page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');

    //1.id
   await page.locator("#input-firstname").fill("Alex");
   await page.locator("#input-lastname").fill("Zen");

   //2.name
   await page.locator(`[name="email"][placeholder="E-Mail"][type="email"]#input-email.form-control`).fill("roopa123@test.co");
   //classname
   await page.locator(`input[name="telephone"][type="tel"][placeholder="Telephone"].form-control`).fill('9898989898');

    //other atrributes
    await page.locator('input[type="input-password"],input[name="password"],[type="tel"][placeholder="Password"].form-control').fill("abcd@123");

    await page.locator(`input[type="input-confirm"],input[name="confirm"],[type="password"][placeholder="Password Confirm"].form-control`).fill(`abcd@123`);

    await page.locator(`input[type="radio"][name="newsletter"][value="1"]`).click();

    await page.locator(`input[type="checkbox"][name="agree"]`).click();

    await page.locator(`input[value="Continue"][type="submit"]`).click();

    //close the browser
    await page.close();

})();
