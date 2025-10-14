    import {chromium,Browser,Locator, Page, FrameLocator} from'@playwright/test';

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

        await page.goto('https://petdiseasealerts.org/forecast-map#/');

        let frameEle :FrameLocator = page.frameLocator(`frame[id*='map-instance']`);

        https://selectorshub.com/iframe-in-shadow-dom/
        https://selectorshub.com/iframe-in-shadow-dom/
    })();