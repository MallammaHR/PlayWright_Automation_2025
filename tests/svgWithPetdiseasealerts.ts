import{chromium,Page, Browser,test, FrameLocator, Locator} from '@playwright/test';

let page:Page;
(async()=>{
    let browser:Browser=await chromium.launch({
        headless:false,
        channel:'chrome'
    });

  page = await browser.newPage();

  await page.goto('https://petdiseasealerts.org/forecast-map', { waitUntil: 'load' });
  await page.waitForTimeout(3000);

  let frameEle: FrameLocator = page.frameLocator(`iframe[id*='map-instance']`);
  
  let allStates: Locator[] = await frameEle.locator(`//*[local-name()='svg']//*[name()='g' and @id='regions']/*[name()='g']`).all();
  
  console.log('total number of regions: ' + allStates.length);

  //itereate all one by one 
    for (let e of allStates) {

    let box = await e.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); //middle/center of the bounding box of the element
      await page.waitForTimeout(500);
    }
    let stateName = await e.getAttribute('id');
    console.log(stateName);
  await page.waitForTimeout(100);
  }
    
})();