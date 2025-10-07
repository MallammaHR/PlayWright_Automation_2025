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

    await page.goto('https://naveenautomationlabs.com/opencart/ui/dropdowns.html');
    
    // //Choose your preferred programming languagem
    // await page.locator(`//span[text()='Choose your preferred programming language']`).click();
    // page.getByText('Python' , {exact : true}).click();
    // let textcontent1=await page.locator(`//span[text()='Python']`).textContent();
    // console.log(textcontent1);
 

    // let inst1Messga = await page.locator(`//div[text()='Select your primary programming language']`).innerText();
    // console.log(inst1Messga);
    // //Choose your preferred web framework
    // await page.locator(`//span[text()='Choose your preferred web framework']`).click();
    // page.getByText('Angular',{exact : true});

    // //Select your database preference
    // await page.locator(`//span[text()='Select your database preference']`).click();
    // page.getByText('PostgreSQL',{exact : true});
    // let dataBaseText = page.locator(`//div[@data-value='mongodb']`).textContent();
    // console.log(dataBaseText);

    // await page.locator(`//label[text()='Development Environment']`).click();
    // page.getByText('Apache Cassandra',{exact:true});
    // let deText = page.locator(`//div[@data-value='cassandra']`).textContent();
    // console.log(deText);

    // await page.locator(`//span[text()='Select your experience level']`).click();
    // page.getByText('Junior (2-3 years)',{exact:true});

    await selectValue(page,'Choose your preferred programming language','Java');
 
    //Generic Utilty
    async function selectValue(page:Page,dropDownLabel:string,value:string):Promise<void>
    {
         await page.locator(`//span[text()='${dropDownLabel}']`).click();
    page.getByText(`${value}` , {exact : true}).click();
        
    }



    })();