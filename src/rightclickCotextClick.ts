import { Browser, chromium, Locator, Page,FrameLocator } from '@playwright/test';

// IIFE - Immediately Invoked Function Expression
(async () => {
  let browser: Browser = await chromium.launch({
    headless: false,
    channel : 'chrome',
    
  });

  let page: Page = await browser.newPage();

  await page.goto('https://swisnl.github.io/jQuery-contextMenu/demo.html');
  //right click
  await page.locator(`span.context-menu-one`).click({button :'right'});
  //print all the options on the right click
  let allOptions :string[] = await page.locator(`ul.context-menu-list span`).allInnerTexts();////ul[contains(@class,'context-menu-list')]//li/span
  console.log(allOptions);
  //option.1.clicking
  await page.getByText('Quit',{exact : true}).click();

  //option 2.clicking
//   for(let options of allOptions)
//   {
//      console.log(options);
//      if(options === 'Copy')
//      {
//         await page.getByText(options,{exact:true}).click();
//      }
//   }


})();
