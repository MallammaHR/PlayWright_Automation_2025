import { Browser, chromium, Locator, Page,FrameLocator } from '@playwright/test';
import { FORMERR } from 'dns';

// IIFE - Immediately Invoked Function Expression
(async () => {
  let browser: Browser = await chromium.launch({
    headless: false,
    channel : 'chrome',
    
  });

  let page: Page = await browser.newPage();

  await page.goto('https://www.espncricinfo.com/series/men-s-t20-asia-cup-2025-1496919/india-vs-pakistan-final-1496938/full-scorecard');
  

//let scoreDet : string[] = await page.locator(`//a[@title='Sahibzada Farhan']/ancestor::td/following-sibling::td`).allInnerTexts();
let scoreDet : string[] = await page.locator(`//a[@title='Abhishek Sharma']/ancestor::tr/td[position() >= 2 and position() <= 7]`).allInnerTexts();

let cleanedScoreDet = scoreDet.slice(1, scoreDet.length - 3);
//console.log(scoreDet);

for(let e of scoreDet)
{
  console.log(e);
}

})();