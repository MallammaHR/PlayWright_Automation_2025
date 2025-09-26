import {chromium,Browser, Page} from'@playwright/test';
 

///This is not the complete program and i wrote all the X-Path here and what all the best way i write xpath
//IIFE
(async () => {

      let browser: Browser = await chromium.launch({

        headless :false,
        channel :'chrome',
    });

    let page : Page = await browser.newPage();
    
    page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

    1.//xpath with only "id" with single attribute
    //syntax=//tagname[@id='value']
    await page.locator('//input[@id="input-firstname"]').fill('selenium1234@open.com');

    2.//With mulitple atrributes
    //syntax=>//tagname[@an="av" and @an="av" and @an=av]
    await page.locator('//input[@id="input-firstname" and @name="firstname" and @placeholder="First Name"]').fill('Alanso');

    3.//without tagname
    //*[@id="value"]
    await page.locator(`//*[id="input-firstname]`).fill('jeeva');//better tio avoide 

    // 4.//text() in the xpath:span,div,para,link,label,anytext
    // //tagname[text()="value"] where text is the existing function in the xpath
    // // //label[text()="First Name"] with lable also 
    // await page.locator(`//h1[text()="Register Account"]`).click();

    // 5.//contains() in xpath
    // //tagname[contains(@an,'av')]
    // await page.locator(`//input[contains(@placeholder,"Tele")]`).fill("7634743"); 
    // 6.//conatins() with id(without conatins)
    // //input[contains(@placeholder , 'First Name') and contains(@id='input-firstname']
    // 7.//contains() with id(with conatins )
    //input[contains(@placeholder , 'First Name') and contains(@id,'input-firstname']

    //8.conatins with text()
    //h1[contains(text(), 'Register Account')]

     //9.conatins with text() with other attributes
    //a[contains(text(),'Address Book') and contains(@class, 'list-group-item')]

    // await page.goto('https://www.orangehrm.com/en/contact-sales/');
    // // 10.preceding-siblibg::
    // let precedInpt: string = await page.locator(`//option[@value='Algeria']/preceding-sibling::option[@value='Afghanistan']`).innerText();
    // console.log( precedInpt);//Afganistan

    // //11.following-sibling
    // let folloInpt:string =await page.locator(`//option[@value='Algeria']/following-sibling::option[@value='Angola']`).innerText();
    // console.log(folloInpt);//Angola

    // //indexing in xpath
    // // (//input[@class='form-control'])[position()=1]
    //  await  page.locator(`(//input[@class='form-control'])[position()=1]`).fill("12344");
    // //(//input[@class='form-control'])[last()]
    //  await  page.locator(`(//input[@class='form-control'])[position()=1]`).fill("12344");
    //  //(//input[@class='form-control'])[last()-1]
    //  await  page.locator(`(//input[@class='form-control'])[position()=1]`).fill("12344");
    //  //(//input[@class='form-control'])[last()-3]
    //  await  page.locator(`(//input[@class='form-control'])[position()=1]`).fill("12344");



})();