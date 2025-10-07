    // import {chromium,Browser,Locator, Page} from'@playwright/test';

    // //IIFE
    // (async () => {

    //     let browser: Browser = await chromium.launch({

    //         headless :false,
    //         channel :'chrome',
    //     });


    //      //  //Dynmaic xpath
    //     //   let batsManLocator = page.locator(`//a[@title='Abhishek Sharma']/ancestor::td/following-sibling::td/span/span`);

    //     //   let wicketTakerName = await batsManLocator.textContent();

    //     //   console.log(wicketTakerName);

    //     let page : Page = await browser.newPage();

    //     await page.goto('https://www.espncricinfo.com/series/men-s-t20-asia-cup-2025-1496919/india-vs-pakistan-final-1496938/full-scorecard');

    // //    let batsMan : Locator = page.locator(`//a[@title='Sahibzada Farhan']/ancestor::td/following-sibling::td[contains(@class,'ds-text-right ')]`);

    // //    let scorecard = await batsMan.textContent();


    // //    console.log(scorecard);

    //    let allPlayersLocator : Locator[] = await page.locator(`//table[contains(@class,'ds-w-full ds-table ds-table-md ds-table-auto  ci-scorecard-table')]//tbody/tr[td[1]//a]`).all();
    //    console.log(allPlayersLocator.length);
        

    //    let table = page.locator(`//table[contains(@class,'ci-scorecard-table')]`).first();
       
    //    for(let players of allPlayersLocator)
    //    {
    //     //console.log(await players.textContent());
    //    }

    //    let scores : number[] = [];

    //    for(let row of allPlayersLocator)
    //    {
    //    let runs = page.locator(`table//thead//th[text()='R']//ancestor::table[contains(@class,'ds-w-full ds-table ds-table-md ds-table-auto  ci-scorecard-table')]`).first();
    //    let runText = await runs.textContent();
    //    console.log(runText?.trim());
    //    }
    
import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({
    headless: false,
    channel: 'chrome',
  });

  const page = await browser.newPage();

  await page.goto('https://www.espncricinfo.com/series/men-s-t20-asia-cup-2025-1496919/india-vs-pakistan-final-1496938/full-scorecard');

  //here create blank
  const scores: number[] = [];

  const scorecardTables = await page.locator(`xpath=//table[contains(@class,'ci-scorecard-table')]`).all();

  for (let table of scorecardTables) 
    {
    const headers = await table.locator('thead tr th').allTextContents();
    const runsIndex = headers.findIndex(h => h.trim() === 'R');
    const rows = await table.locator(`xpath=.//tbody/tr[td//a]`).all();
    for (const row of rows) {
      const cells = row.locator('td');
      const cellCount = await cells.count();

      if (runsIndex < cellCount) {
        const runText = await cells.nth(runsIndex).textContent();
        const run = parseInt(runText?.trim() || '');
        if (!isNaN(run)) {
          scores.push(run);
        }
      }
    }
  }

  console.log('Extracted Runs:', scores);

  // ascending
  const ascending = [...scores].sort((a, b) => a - b);
  console.log('Runs sorted ascending:', ascending);

  // descending
  const descending = [...scores].sort((a, b) => b - a);
  console.log('Runs sorted descending:', descending);

})();
