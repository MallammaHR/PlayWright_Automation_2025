import { Browser, chromium, Locator, Page } from '@playwright/test';

// IIFE - Immediately Invoked Function Expression
(async () => {
  let browser: Browser = await chromium.launch({
    headless: false,
    channel : 'chrome',
    
  });

  let page: Page = await browser.newPage();

  //await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
  await page.goto('https://www.freshworks.com/');

     // 3. getByRole()-header=>h1----to ---h6
     //role-heading
     //h1-largest font size ,h6-smallest font size
     //name for haeder is  "text,"

     //we can supply partial part of text 
    // let header : string = await page.getByRole('heading', {name:'Uncomplicate'}).innerText();
    // console.log("Header of the registration page is : "+header)

//we can also  supply full part of  text
    let header:string =await page.getByRole('heading', {name:'Uncomplicate your IT and customer service'}).innerText();
    console.log("Header of the registration page is : "+header);

    //for span,div,para -getByRole()  instead we have to use the  getByText()
    let secondheadre:string =await page.getByText('Freshworks provides').innerText();
    console.log("Second headre is : "+secondheadre)

    //Note:if there is a exact same headre and same text is there ,then we can differniate with level.
    //here header start from h1 to h6 then 
    //h1-Uncomplicate
    //  let header:string =await page.getByRole('heading', {name:'Uncomplicate'}).innerText();
    // console.log("Header of the registration page is : "+header);

    //h2-Uncomplicate(both h1 and h2 with same header text then ),level will works only for Header
   // let header:string =await page.getByRole('heading', {name:'Uncomplicate', level:2}).innerText();
    // console.log("Header of the registration page is : "+header);
    

 //close the brower
    await page.close();
})();