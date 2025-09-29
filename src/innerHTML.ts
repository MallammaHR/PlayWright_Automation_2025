import {chromium,Browser,Locator, Page} from'@playwright/test';
import { emit } from 'process';
 

///This is not the complete program and i wrote all the X-Path here and what all the best way i write xpath
//IIFE
(async () => {

      let browser: Browser = await chromium.launch({

        headless :false,
        channel :'chrome',
    });

        let page : Page = await browser.newPage();

        await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
        //<h1>Register Account</h1>
        let innerHTML : string = await page.getByRole('heading' , {name : 'Register Account'}).innerHTML();
        console.log(innerHTML);

        //<input type="text" name="firstname" value="" placeholder="First Name" id="input-firstname" class="form-control">

        let inputFirstNameHTML = await page.locator('#input-firstname').innerHTML();
        console.log(inputFirstNameHTML);
        console.log('by!!!!!!!!!');

        //1.if child elemets available then it will return its child elements
        //2.if it does not have child it does not return anything 
        //3.if the elemet is having text then it will retun the text First Name

        let innerINPTFirst : string = await page.getByRole('textbox' , {name : 'First Name'}).innerHTML();
        console.log(innerINPTFirst);

        let formHTML: string =await page.locator(`form.form-horizontal`).innerHTML();
        console.log(formHTML);


})();