import {chromium,Browser,Locator, Page} from'@playwright/test';
 

///This is not the complete program and i wrote all the X-Path here and what all the best way i write xpath
//IIFE
(async () => {

      let browser: Browser = await chromium.launch({

        headless :false,
        channel :'chrome',
    });

    let page : Page = await browser.newPage();
    
    //await page.goto('https://naveenautomationlabs.com/opencart/ui/selectdropdowns.html');

    //await page.locator('#month >> option[value="5"]').waitFor({ state: 'visible' });

    await page.goto('https://business.facebook.com/signup');

    //Locators of all drop Downs
    let day : Locator = page.locator('#day');
    let month : Locator = page.locator('#month');
    let year: Locator = page.locator('#year');

    //Drop Downs Can be Handled By using selectOption() by passing the attribute vlaue,visible text or index value

    //this selectOption()--will check the select-option based HTML tag and then only we can use this method
    //1.selectBy Value Attribut--IInd Prefernces
    await day.selectOption('5');
    await month.selectOption('9');
    await year.selectOption('2020');

    await page.waitForTimeout(3000);

    //2.select by label== visible text -Ist prefernce
    await day.selectOption({label : '20'});
    await month.selectOption({label : 'Oct'});
    await year.selectOption({label : '2014'});

    await page.waitForTimeout(3000);

    //select by index---IIIrd prefernce(quite risky when dynmic dropdowns)
    await day.selectOption({index  : 2 });
    await month.selectOption({index : 11});
    await year.selectOption({index : 6 });

   // await page.close();
})();
