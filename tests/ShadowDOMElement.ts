import{Browser, Page,chromium, test} from '@playwright/test';

let page:Page;
(async()=>{
    let browser:Browser=await chromium.launch({
        headless:false,
        channel:'chrome'
    });
    
    page=await browser.newPage();
    //page->shadowDOM1->shadowDOM1->input feild
    await page.goto('https://selectorshub.com/iframe-in-shadow-dom/');
    
    await page.locator('#pizza').fill('Veg-Pizza');


})();