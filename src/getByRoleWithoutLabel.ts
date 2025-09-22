import { Browser, chromium, Locator, Page } from '@playwright/test';

// IIFE - Immediately Invoked Function Expression
(async () => {
  let browser: Browser = await chromium.launch({
    headless: false,
    channel : 'chrome',
    
  });

  let page: Page = await browser.newPage();
  await page.goto('https://classic.freecrm.com/register/');

  //await page.waitForTimeout(5000);

//   //if we want to use getByRole() but both label and ARIA- label also not avaialble -
//   // then we can use the placeholder value ,and if still placeholdervalue is also not there then we can ude css/xptha
   await page.getByRole('combobox').selectOption({ label: 'Free Edition' });
   await page.getByRole('textbox' , {name : 'First Name'}).fill('mallumani');
   await page.getByRole('textbox', {name :'Last Name'}).fill('kinnis');
   await page.getByRole('textbox', { name : 'Email' , exact : true }).fill('mallumanish17@gmail.com');
   await page.getByRole('textbox', { name : 'Confirm Email' }).fill('mallumanish17@gmail.com');
   await page.getByRole('textbox', {name :'Username'}).fill("Mallamma");
   await page.getByRole('textbox', {name:'Password' , exact : true}).fill('Mallu@1234');
   await page.getByRole('textbox', {name:'Confirm Password'}).fill('Mallu@1234')
   await page.getByRole('checkbox' , {name:'I agree with the Terms and Conditions'}).uncheck();
   //selects checkbox if already not slected
   //await page.waitForTimeout(3000);
   await page.getByRole('checkbox',{name:'I agree with the Terms and Conditions '}).check();
   //deselects checkbox if already selected
   await page.getByRole('button' , {name : 'SUBMIT'}).click();
 //close the brower
   //await page.close();
 })() ;
