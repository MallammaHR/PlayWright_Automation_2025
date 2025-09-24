import { Browser, chromium, Locator, Page } from '@playwright/test';

// IIFE - Immediately Invoked Function Expression
(async () => {
  let browser: Browser = await chromium.launch({
    headless: false,
    channel : 'chrome',
    
  });

  let page: Page = await browser.newPage();

  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

  //Different ways of using the Locator
  //1.id
  //syntax=>1.#id-#(with value of the id)
  //await page.locator('#input-email').fill('selenium1234@test.com');
  //tagname with #id=>tagname#id
  //await page.locator('input#input-email').fill('selen123@gmail.com')


  //2.class
  //Different ways of using the class
  //syntax=.classname
 const count :number= await page.locator('.form-control').count();
 console.log(count);
//syntax=tagnmae with classname
//tagname.classname=>input.form-control
 await page.locator('input.form-control').nth(1).fill("fmallumani123@test.com");
//if muliplt classes are available then 
//css selector for multiple classes
//.classnum1.classnum2.classnum3.
//.c1.c2.c3...
//we can write the css selector calsass name with name 
//tagname.c1.tagname.tagname.c2.tagnmae.c3.tagname.c4...
await page.locator('input.form-control.input-lg').fill('mackbook');
//await page.close();
})();