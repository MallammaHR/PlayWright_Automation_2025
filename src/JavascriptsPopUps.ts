import { Browser,chromium,Page,Locator } from "@playwright/test";

//IIFE
(async() => {
    let browser : Browser = await chromium.launch({
        headless : false,
        channel : 'chrome'
    });
    let page : Page = await browser.newPage();

    //Add one listener at the page level,running in background -keep checking do we get any JS popUp
    //if any popup is coming just dismiss it immediately
    page.on('dialog', async dialog => {
        console.log(dialog.message());
        //console.log(dialog.defaultValue());//blan
        // console.log(dialog.page());
       // await dialog.dismiss();
        console.log(dialog.type());
        console.log('**************************************');
        if(dialog.type()==='prompt')
        {
               await dialog.accept('MalluMani');
        }
        else
        {
            await dialog.accept();
         

            
        }
        //console.log(await page.innerText('body'));
     
    })

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

     //1.Alert : simple Alert(only the message ) with only ----"Ok" button
    //await page.getByText('Click for JS Alert').click();
     await page.getByRole('button',{name : 'Click for JS Alert'}).click();
    let alertPopUpMsg =  await page.locator('#result').innerText();
    console.log('The alert PopUp Message is  : '+alertPopUpMsg);
     //2.Ocnfrimaion PopUp: confrime(are you sure?)--Ok and Cancel button
    await page.getByRole('button',{name :'Click for JS Confirm'}).click();
    let ConfirmPopUpMsg =  await page.locator('#result').innerText();
    console.log('The confrim PopUp Message is  : '+ConfirmPopUpMsg);
     //3.prompt PopUp:prompt(enter username)-->only one textfeild with ok/cancel
    await page.getByRole('button',{name:'Click for JS Prompt'}).click();
    let promptPopUpMsg =  await page.locator('#result').innerText();
    console.log('The prompt PopUp Message is  : '+promptPopUpMsg);

    
    

})();