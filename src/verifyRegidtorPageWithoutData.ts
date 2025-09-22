import { Browser, chromium, Locator, Page } from '@playwright/test';

// IIFE - Immediately Invoked Function Expression
(async () => {
  let browser: Browser = await chromium.launch({
    headless: false,
    channel: 'chrome' ,
    
  });

  let page: Page = await browser.newPage();

  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');

     //radio button
   await page.getByRole('radio' , {name :'Yes' , exact:true }).click();

     //check box
   await page.getByRole('checkbox').click();

   //contine
   await page. getByRole('button' , {name : 'Continue'}).click();

  //First Name  Error Message 

  let FirstNameErrorMsgLoc = page.getByText('First Name must be between 1 and 32 characters!' , {exact : true });
  await FirstNameErrorMsgLoc.waitFor();

  let FirstNameErrorMsg :string = await FirstNameErrorMsgLoc.innerText();
  console.log('First Name Error Message : '+FirstNameErrorMsg );

    //Last Name  Error Message 

  let LastNameErrorMsgLoc = page.getByText('Last Name must be between 1 and 32 characters!' , {exact : true });
  await LastNameErrorMsgLoc.waitFor();

  let LastNameErrorMsg :string = await LastNameErrorMsgLoc.innerText();
  console.log('Last Name Error Message :  ' + LastNameErrorMsg );

    //Email  Error Message 

  let EmailErrorMsgLoc = page.getByText('E-Mail Address does not appear to be valid!' , {exact : true });
  await EmailErrorMsgLoc.waitFor();

  let EmailErrorMsg :string = await EmailErrorMsgLoc.innerText();
  console.log('Email Error Message : '+EmailErrorMsg );

     //Telephone  Error Message 

  let TelephoneErrorMsgLoc = page.getByText('Telephone must be between 3 and 32 characters!' , {exact : true });
  await TelephoneErrorMsgLoc.waitFor();

  let TeleErrorMsg :string = await TelephoneErrorMsgLoc.innerText();
  console.log('Telephone Error Message :  ' + TeleErrorMsg );

  
    //Password  Error Message 

  let PassErrorMsgLoc = page.getByText('Password must be between 4 and 20 characters!' , {exact : true });
  await PassErrorMsgLoc.waitFor();

  let PassErrorMsg :string = await PassErrorMsgLoc.innerText();
  console.log('Password  Error Message  : '+PassErrorMsg );

})();