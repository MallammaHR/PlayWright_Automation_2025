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

  const allScores : string[] = await page.locator(`//span[text()='India']/ancestor::div[contains(@class,'fill-translucent-hover')]/following-sibling::div/table[contains(@class,'ci-scorecard-table')]//tr/td[3]`).allInnerTexts();

    const allscoresValue: number[] = [];

  for(let i = 0; i<allScores.length-2; i++ )
  {
    allscoresValue.push(parseInt(allScores[i]));
  }
  console.log(allscoresValue);

  //asceding order
  allscoresValue.sort((a,b) => a-b);  
  console.log(allscoresValue);
  //decsedning order
  allscoresValue.sort((a,b) => b-a);
  console.log(allscoresValue);

  //highest value
 console.log('highest score : '+ allscoresValue[allscoresValue.length - 1]);
 console.log('lowest score : '+allscoresValue[0]);

})();
