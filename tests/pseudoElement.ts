import{Browser, Page,chromium, test} from '@playwright/test';

let page:Page;
(async()=>{

    let browser:Browser=await chromium.launch({
        headless:false,
        channel:"chrome"
    });

    page=await browser.newPage();

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
    //window.getComputedStyle(document.querySelector('label[for="input-firstname"]'),'::before').getPropertyValue('content')
    // window.getComputedStyle(document.querySelector('label[for="input-firstname"]'),'::before').getPropertyValue('color')
    let content = await page.evaluate(()=>{
        return window.getComputedStyle(document.querySelector('label[for="input-firstname"]')!,'::before').getPropertyValue('content')
    })
    console.log('content is : '+content);
    if(content.includes('*')){
        console.log('first name is a mandatory feind');
    }

    let color= await page.evaluate(()=>{
        return window.getComputedStyle(document.querySelector('label[for="input-telephone"]')!,'::before').getPropertyValue('color')
    })
    console.log('color is : '+color);
  

})();