import { Browser, chromium, Locator, Page } from '@playwright/test';

// IIFE - Immediately Invoked Function Expression
(async () => {
  let browser: Browser = await chromium.launch({
    headless: false,
    channel : 'chrome',
    
  });

  let page: Page = await browser.newPage();

  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');

  // 1. getByRole()-textbox-name is text itself
     await page.getByRole('textbox', { name: '* First Name' }).fill('mallumani');
     await page.getByRole('textbox', { name: '* Last Name' }).fill('INDIA');
     await page.getByRole('radio',{name:'Yes'}).click();
     //await page.getByRole('checkbox').click();  //risky 
     // because if tommor if there mulitple check boxes then its risky 
     // better go for css selector or xpath--there is no role also
     await page.locator('input[type="checkbox"]').click(); 

     // 2. getByRole()-link=name=link text
     await page.getByRole('link',{name:'Forgotten Password'}).click();

    
     // 3. getByRole()-header=>h1----to ---h6
     //role-heading
     //h1-largest font size ,h6-smallest font size
     //name for haeder is  "text,"

    let header : string = await page.getByRole('heading', {name:'Register Account'}).innerText();
    console.log("Header of the registration page is : "+header)


 //close the brower
    await page.close();
})();