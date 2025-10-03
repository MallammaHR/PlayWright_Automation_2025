import {chromium,Browser,Locator, Page, expect} from'@playwright/test';
 
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

    // //this selectOption()--will check the select-option based HTML tag and then only we can use this method
    // //1.selectBy Value Attribut--IInd Prefernces
    // await day.selectOption('5');
    // await month.selectOption('9');
    // await year.selectOption('2020');

    // await page.waitForTimeout(3000);

    // //2.select by label== visible text -Ist prefernce
    // await day.selectOption({label : '20'});
    // await month.selectOption({label : 'Oct'});
    // await year.selectOption({label : '2014'});

    // await page.waitForTimeout(3000);

    // //select by index---IIIrd prefernce(quite risky when dynmic dropdowns)
    // await day.selectOption({index  : 2 });
    // await month.selectOption({index : 11});
    // await year.selectOption({index : 6 });

  	// public static void doSelectByVisibleText(By loctaor, String text)
	// {
	// 	Select select = new Select(getElement(loctaor));
	// 	select.selectByVisibleText(text); 
	// }

    //1.value
    await selectDropDownByValue(day,'5');
    await selectDropDownByValue(month,'5');
    await selectDropDownByValue(year,'2021');

    await page.waitForTimeout(3000);

    //2.visibleText
    await selectDropDownByVisibleText(day,'5');
    await selectDropDownByVisibleText(month,'Nov');
    await selectDropDownByVisibleText(year,'1990');

    //3.indexValue
    await selectDropDownByIndex(day,5);
    await selectDropDownByIndex(month,8);
    await selectDropDownByIndex(year,5);

    

})();

//Generic Function:1-value
async function selectDropDownByValue(element : Locator, value : string):Promise<void>
{
    await element.selectOption(value);
    await expect(element). toHaveValue(value);   

}
//Generic Function:2-visible-Text(pass string as objects)
async function selectDropDownByVisibleText(element:Locator, label_value : string): Promise<void>
{
    await  element.selectOption({label : label_value});  
    let selectedValue = await element.inputValue();//to fetch the vlaue attribute
    console.log(selectedValue)
    await expect(element).toHaveValue(selectedValue);
}

//Generic Function:3-Index_Value(pass index as object)
async function selectDropDownByIndex(element:Locator, index_value : number): Promise<void>
{
    await  element.selectOption({index : index_value});  
    let index_Value = await element.inputValue();//to fetch the vlaue attribute
    console.log(index_Value)
    await expect(element).toHaveValue(index_Value);
}
