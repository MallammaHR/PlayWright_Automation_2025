import {chromium,Browser,Locator, Page} from'@playwright/test';
//IIFE
(async () => {

      let browser: Browser = await chromium.launch({

        headless :false,
        channel :'chrome',
    });

    let page : Page = await browser.newPage();

    await page.goto('https://naveenautomationlabs.com/opencart/ui/webtable.html');
    //cssselector
    //await page.locator(`tr:has(td:text('Joe.Root'))`).locator('td').first().click();

    //await selectUser(page,'Joe.Root');
    // await selectUser(page,'Jhon.Smith')

    //await selectUsercss(page, 'Joe.Root');
   
    //to get all the column data
    // let userData = await page.locator(`//td[text()='Joe.Root']/following-sibling::td`).allInnerTexts() 
    // console.log(userData);
   // await page.close();
  let joeData= await  getUserData(page,'Joe.Root');
  console.log(joeData);

})();

//xpath 
async function selectUser(page:Page,username:string):Promise<void>{
    await page.locator(`//td[text()='${username}']/preceding-sibling::td/input[@type='checkbox']`).click();
}


//cssSelector with pseudo-path

async function selectUsercss(page:Page,username:string):Promise<void>{
     await page.locator(`tr:has(td:text('${username}'))`).locator('td').first().click();
    
}

//usedData onspecific user
 async function getUserData(page:Page,username:string):Promise<string[]>
 {
     return await page.locator(`//td[text()='${username}']/following-sibling::td`).allInnerTexts() 
 }

