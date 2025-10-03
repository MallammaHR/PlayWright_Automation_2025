import {chromium,Browser,Locator, Page} from'@playwright/test';
 

///This is not the complete program and i wrote all the X-Path here and what all the best way i write xpath
//IIFE
(async () => {

      let browser: Browser = await chromium.launch({

        headless :false,
        channel :'chrome',
    });

    let page : Page = await browser.newPage();
    
    await page.goto('https://www.facebook.com/r.php?locale=es_LA&display=page&entry_point=login');

    await page.locator('#month >> option[value="5"]').waitFor({ state: 'visible' });

    //Locators of all drop Downs
    let day : Locator = page.locator('#day');
    let month : Locator = page.locator('#month');
    let year: Locator = page.locator('#year');

    //Drop Downs Can be Handled By using selectOption() by passing the attribute vlaue,visible text or index value

   
    // by value
    await day.selectOption('5'); 
    await month.selectOption('5');
    await year.selectOption('2021')

    await page.waitForTimeout(3000);

   //select by visible Text

    await day.selectOption({label : '5'});
    await month.selectOption({label : '6'});
    await year.selectOption({label : '2021'});

    await page.waitForTimeout(2000);

      //select by index
    await day.selectOption({ index: 1 });
    await month.selectOption({ index: 4 });
    await year.selectOption({ index: 5 });



    await page.close();


})();