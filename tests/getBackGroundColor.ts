import{Browser, chromium, Locator, Page,test} from '@playwright/test';

let page:Page;
(async()=>{
    let browser:Browser=await chromium.launch({
        headless:false,
        channel:"chrome"
    });

    page=await browser.newPage();
    await page.goto('https://www.orangehrm.com/en/contact-sales',{waitUntil:"load"});

    //page.getByText('Contact Sales',{exact:true});
    //page.getByRole('button', { name: 'Contact Sales' })

    let contactSales:Locator=page.getByRole('button', { name: 'Contact Sales'}).first()
    //get the background color
    let bgColor= await contactSales.evaluate(ele=>getComputedStyle(ele).backgroundColor);
    console.log('Background Color : '+bgColor);



})();