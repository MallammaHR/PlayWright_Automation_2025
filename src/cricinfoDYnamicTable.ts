    import {chromium,Browser,Locator, Page} from'@playwright/test';

    //IIFE
    (async () => {

        let browser: Browser = await chromium.launch({

            headless :false,
            channel :'chrome',
        });


         //  //Dynmaic xpath
        //   let batsManLocator = page.locator(`//a[@title='Abhishek Sharma']/ancestor::td/following-sibling::td/span/span`);

        //   let wicketTakerName = await batsManLocator.textContent();

        //   console.log(wicketTakerName);

        let page : Page = await browser.newPage();

        await page.goto('https://www.espncricinfo.com/series/men-s-t20-asia-cup-2025-1496919/india-vs-pakistan-final-1496938/full-scorecard');

        let AbhishekCricWickInfo = await getWicketTakerData(page,'Abhishek Sharma');
        console.log('Abhishek Wicket Take Name is  :' +AbhishekCricWickInfo);

    })();

    async function getWicketTakerData(page : Page , playerName : string):Promise<string|null>{
        return await page.locator(`//a[@title='${playerName}']/ancestor::td/following-sibling::td/span/span`).textContent();

    }

        //https://react-select.com/home