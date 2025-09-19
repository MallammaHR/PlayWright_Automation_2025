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
      //1.getByAltText()
 await page.goto('https://naveenautomationlabs.com/opencart/ui/data-testid-page.html');
 //await page.getByAltText('naveenopencart').click();

 //2.getByTestId()-is a unique and stable and test-freindy
  //await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
  //<input type="text" name="firstname" value="" placeholder="First Name" id="input-firstname" class="form-control">
  //await page.getByTestId('input-firstname').fill('Palywrigth VS  Selenium'); //error - invalid
  // await page.locator('#input-firstname').fill('Naveen Automation Labs'); //valid

  //<input type="text" class="form-input" data-testid="username-input" placeholder="Enter your username" required="">
  // await page.goto("https://naveenautomationlabs.com/opencart/ui/data-testid-page.html");
//let testId:Locator= page.getByTestId('username-input');
  await page.getByTestId('home-nav-btn').click(); 

  ////3.getByTitle()
  //check the title attribute value
  //https://naveenautomationlabs.com/opencart/index.php?route=account/register
  //<img title="naveenopencart" alt="naveenopencart" class="img-responsive">
  await page.getByTitle('naveenopencart').click();
  
  
  //close the browser 
 // await browser.close(); 
})();
