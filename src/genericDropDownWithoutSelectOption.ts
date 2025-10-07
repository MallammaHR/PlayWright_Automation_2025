import { Browser, chromium, firefox, webkit, Locator, Page, selectors, expect } from "@playwright/test";

//IIFE
(async () => {

    //selectors.setTestIdAttribute('data-testid');

    let browser: Browser = await chromium.launch(
        {
            headless: false,
            channel: 'chrome',
        });

    let page: Page = await browser.newPage();

    //in this page the drop downs are devloped by using select-option based class so we have to use xpath.

    await page.goto('https://react-select.com/home');

    // await page.locator(`.select__control`).first().click();

    //  let textConetent : string | null= await page.getByText('Red',{exact:true}).first().textContent();

    // console.log(textConetent);
   // await page.locator(`//div[@class='select__control css-13cymwt-control']`).first().click();
    // await page.locator('.select__input-container').first().click();
    // await page.getByRole('option',{name : 'Red',exact :true}).click();

    await selectCOlour(page,'.select__input-container','Red');


})();


    async function selectCOlour(page:Page,dropDownColour:string,colour:string):Promise<void> {
    await page.locator(`${dropDownColour}`).first().click();
    await page.getByRole('option',{name : `${colour}`,exact :true}).click();

}