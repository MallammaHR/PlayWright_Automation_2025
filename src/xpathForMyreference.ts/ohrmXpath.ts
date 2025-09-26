import {chromium,Browser, Page} from'@playwright/test';
 

///This is not the complete program and i wrote all the X-Path here and what all the best way i can write xpath
//this is not complete code and i wrote it for my refernce 
//IIFE
(async () => {

      let browser: Browser = await chromium.launch({

        headless :false,
        channel :'chrome',
    });

    let page : Page = await browser.newPage();

     await page.goto('https://www.orangehrm.com/en/contact-sales/');

  
    //1.id
     await page.locator(`//input[@id='Form_getForm_FullName']`).fill('mallu');
    
     //2.name
     await page.locator(`//input[@name='Contact']`).fill("roopa@gmail.com");
    
     //3.class
     await page.locator(`//input[@class='email text']`).fill("90837423082364092834");

     //4.parent/child(only the direct child elements) & also we can use //parent//child(direct + indirect child elements)
    await page.locator(`//select[@id='Form_getForm_Country']`).selectOption({ value: 'Algeria' });

       //5.text() Allow All cokkies
     await page.locator(`//button[text()='Allow all']`).click();

    //6.other attribute
    await page.locator(`//input[@placeholder='Company Name']`).fill("ABCSD");

    //7 contains() with attribute
    await page.locator(`//input[contains(@placeholder,'Job')]`).fill('QA');

    //8.conatins with text()
     await page.locator(`//select[@id='Form_getForm_NoOfEmployees']`).selectOption({value : '51 - 200'});

     //9. conatins() and  id(without conatins)
     page.locator(`//textarea[contains(@placeholder,'Your') and  @id='Form_getForm_Comment']`).fill('A good plat foam');
     
     //captch box click
     await page.locator(`//div[@class='recaptcha-checkbox-border']`).check();

     //click on conatct sales
     await page.locator(`//input[@value='Contact Sales']`).click();
})();