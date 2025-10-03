import {chromium,Browser,Locator, Page} from'@playwright/test';

//IIFE
(async () => {

      let browser: Browser = await chromium.launch({

        headless :false,
        channel :'chrome',
    });

    let page : Page = await browser.newPage();

     await page.goto('https://naveenautomationlabs.com/opencart/ui/webtable.html');

    //syntax:for writing xpath for Dynamic Webtable

     ////td[text()='Joe.Root']/preceding-sibling::td/input[@type='checkbox']--Joe.Root
     ////td[text()='Jonathan.Adams']/preceding-sibling::td/input[@type='checkbox']--Jonathan.Adams
    // await page.locator(`//td[text()='Joe.Root']/preceding-sibling::td/input[@type='checkbox']`).click();
     //await page.locator(`//td[text()='Jonathan.Adams']/preceding-sibling::td/input[@type='checkbox']`).click();
     
     //i will get all locators for all the checkbox-->root start from table-tbody-tr-td-input[specific one]

     let allCheckBoxLocator : Locator = page.locator(`//table//tbody//tr//td/input[@type='checkbox']`);


     //count total checkbox
     const allBoxCount=await allCheckBoxLocator.count();
     console.log(allBoxCount);



     //clicking one by one with for of loop
     //1.click/check all the checkBoxec one by one
     for (let i = 0; i < allBoxCount; i++)
      {
        //store all the checkbox one by one in checkbox
       let checkBox = allCheckBoxLocator.nth(i);

       if(!(await checkBox.isChecked()))//here i am NOT because if check box is not checked then it will check and 
       {
          await checkBox.click();

          //await page.waitForTimeout(3000);//if I put here delay i can click checkBox one by one how it perofrms.
       }
      }
      
      //Here I will give some delay ,so that it will wait for some time and then it will uncheck all the checkboxes
      await page.waitForTimeout(3000);

      //2.Unheck all checkBoxes if already checked 
      for(let i = 0 ;i <allBoxCount; i++)//here I am not wrigthing the NOT becuasuse checkbox is already checked so i want to unchek it
      {
        let checkBox = allCheckBoxLocator.nth(i);

        if(await checkBox.isChecked())
        {
          await checkBox.click();
        }
      }

     //await browser.close();


})();