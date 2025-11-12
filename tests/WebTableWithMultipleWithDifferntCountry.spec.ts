import { test, expect } from '@playwright/test';

test('Multiple selection', async ({ page }) => {
    
  await page.goto('https://selectorshub.com/xpath-practice-page/');

 while(true)
 {
   let allEle = await page.locator(`//td[text()='India']/preceding-sibling::td/input[@type='checkbox'] | //td[text()='Russia']/preceding-sibling::td/input[@type='checkbox']`).all();

   if(allEle.length > 0 )
    {
        for(let e of allEle)
        {
            await e.click();
        }
   
    }
    //pagination:click on next icon
    let next =  page.getByRole('link',{name  : 'Next'});
   
    if(await next.isDisabled())
    {
        console.log('pagination is over...');
        break;
    }
    await page.waitForTimeout(2000);
     await next.click();
     

    }
    await page.pause();
})