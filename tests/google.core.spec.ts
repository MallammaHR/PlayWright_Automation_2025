import { Browser, firefox,chromium,webkit,Locator, Page } from '@playwright/test';

// IIFE - Immediately Invoked Function Expression
(async () => {

  let browser: Browser = await firefox.launch(
    
    { 
      headless: false , 
      //channel:'msedge' 
      channel:'firefox' 

    });
  let page: Page = await browser.newPage();

  await page.goto('https://www.google.com');
  // to check the title of the page 
  const title: string = await page.title();
  console.log('Page Title:', title);

//close the browser 
  await browser.close(); // important!

})();
