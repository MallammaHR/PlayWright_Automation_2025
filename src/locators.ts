import { Browser,chromium,Locator, Page } from '@playwright/test';

// IIFE - Immediately Invoked Function Expression
(async () => {

  let browser: Browser = await chromium.launch(
    
    { 
      headless: false , 
      channel:'chrome',

    });

//   //launch the browser 
      let page: Page = await browser.newPage();
//   await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

//   //using loactor-id
//   await page.locator('#input-email').fill('seleniumtest1@play.com');
//   await  page.locator('#input-password').fill('sele@123');
//   await page.locator(`//input[@value='Login']`).click();


//2.getByText()-string | null--
// if there are multiple matching elemnts then there will be no ambityu insterat it will throw error -stric mode 
//can be s=resolved by using first(),nth(),by using specific locator
//1.first()  
//let header:string | null=await page.getByText('My Account').first().textContent();
 // console.log("Headrer is : "+header);

  //2-nth()
//    let header:string | null=await page.getByText('My Account').nth(1).textContent();
//   console.log("Headrer is : "+header);

  //3.By using specific loactor-using xpath also
//    let header:string | null =await page.locator('//h2[text()="My Account"]').textContent();
//     console.log("Headrer is : "+header);

//elements by using palceholder
await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
//await page.getByPlaceholder('First Name').highlight();
//await page.getByPlaceholder('First Name').fill('testing');
//await page.getByPlaceholder('Telephone').highlight();
//await page.getByPlaceholder('Telephone').fill('9898989898988');

//highligh-debugging
//await page.locator('#input-firstname').highlight();

//instaed of filling the whole text we can fill character by character
await page.locator('#input-firstname').pressSequentially('palaywright with Javascript',{delay:200});


//using getByRole()

  
  //close the browser 
 // await browser.close(); 



})();
