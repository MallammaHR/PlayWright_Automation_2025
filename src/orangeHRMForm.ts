import { Browser, chromium, Locator, Page } from '@playwright/test';

// IIFE - Immediately Invoked Function Expression
(async () => {
  let browser: Browser = await chromium.launch({
    headless: false,
    channel : 'chrome',
    
  });

  let page: Page = await browser.newPage();
  await page.goto('https://www.orangehrm.com/en/contact-sales/');

  //Enter the name
  await page.getByRole('button', {name :'Allow all'}).click();
  await page.getByRole('textbox', {name:'Full Name'}).fill('MallammaHR');
  await page.getByRole('textbox' ,{name:'Phone Number'}).fill('624567637829');
  await page.getByRole('textbox', {name:'Email'}).fill("mallumanish17@gmail.com");
  await page.getByRole('combobox', { name: 'Country' }).selectOption({ label: 'Australia' });
  await page.getByRole('combobox', { name: 'No Of Employees' }).selectOption({ label: '200 - 1,000' }); 
  await page.getByRole('textbox', {name: 'Job title'}).fill('QA');
  await page.getByRole('textbox', {name :'Your Message'}).fill('This OHRM -Form submission');

  await page.getByRole('button' , {name : 'Contact Sales'}).click();
  //Please answer the captcha, if you do not see the captcha please enable JavaScript-I am getting the error for this since i am not automating the CAPTCHA
 //close the brower
   //await page.close();
})();