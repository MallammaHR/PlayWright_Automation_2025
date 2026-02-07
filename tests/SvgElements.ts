import{Browser, chromium, Page, test} from'@playwright/test';
let page:Page;

(async()=>{
    let browser : Browser = await chromium.launch({
        headless:false,
        channel:"chrome",
    });
     page=await browser.newPage();
      await page.goto('https://www.flipkart.com/');
    
     let title= await page.title();
     console.log('Title of the WebPage is : '+title);

     await page.locator(`input[name='q']`).fill('Macbook');
     await page.locator(`button[title='Search for Products, Brands and More'] svg`).click();

     //css
     //button[title='Search for Products, Brands and More'] svg

     //xpath
     //*[local-name()='svg' and  @fill='none'] 
     //*[name()='svg' and  @fill='none']
     ////*[name()='svg']//*[name()='g' and @id='regions']/*[name()='g']


////*[name()='svg']//*[name()='g' and @id='regions']/*[name()='g'  and @class='region']


})();