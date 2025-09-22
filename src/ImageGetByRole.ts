import { Browser, chromium, Locator, Page } from '@playwright/test';

// IIFE - Immediately Invoked Function Expression
(async () => {
  let browser: Browser = await chromium.launch({
    headless: false,
    channel : 'chrome',
    
  });

  let page: Page = await browser.newPage();
 // await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');

  //image--->name:alt attribute value
 // await page.getByRole('img',{name : 'naveenopencart'}).highlight();

  //amazon co.in
  await page.goto('https://www.amazon.co.in/');
  //to  highlight all the images
 // await page.getByRole('img').highlight();

  //\if we want to higlight the speicifc image then 
  await page.getByRole('img' , {name : 'Lighting solutions'}).highlight();

 //close the brower
//await page.close();
 })() ;
