import { Browser, chromium, Locator, Page } from '@playwright/test';

// IIFE - Immediately Invoked Function Expression
(async () => {
  let browser: Browser = await chromium.launch({
    headless: false,
    channel: 'chrome' ,
      });
  let page: Page = await browser.newPage();
  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
  //Register account 
  let firstHeader : string =await page.getByRole('heading' , {name : 'Register Account' , level : 1}).innerText();
  console.log("First Header is : "+firstHeader);

  //Your Personal Details
   //let secondHeader : string =await page.getByRole('heading' , {name : 'Your Personal Details'}).innerText();//getByrole i cant use 
   let secondHeader : string = await page.getByText('Your Personal Details').innerText();
   console.log('Second header is  : '+secondHeader);
   //First Name
   await page.getByRole('textbox' , {name : 'First Name'}).fill('selenium');
 //Last Name
   await page.getByRole('textbox' , {name : 'Last Name'}).fill('test');
   //email
   await page.getByRole('textbox' ,{name : '* E-Mail',  exact :true}).fill('seleniumtest3@play.com');
   //telephone
   await page.getByRole('textbox',{name : 'telephone'}).fill('98989898989');
   //password 
   await page.getByRole('textbox' , {name : ' * Password' , exact : true}).fill('sele@123');
   //confirm password
   await page.getByRole('textbox' , {name : ' * Password Confirm'}).fill('sele@123');
   //radio button
   await page.getByRole('radio' , {name :'Yes' , exact:true }).click();
   //check box
   await page.getByRole('checkbox').click();
   //contine
   await page. getByRole('button' , {name : 'Continue'}).click();   //verify the message 
   let sucsMsg : string = await page.getByRole('heading' , { name : 'Your Account Has Been Created!'}).innerText();
   console.log("Sucees Message is : "+ sucsMsg)
 //close the brower
 //await page.close();
})();