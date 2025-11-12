import { test, expect } from '@playwright/test';

test('Single selection', async ({ page }) => {
    
  await page.goto('https://selectorshub.com/xpath-practice-page/');


 let count =0;
 while(true)
 {
   let eleExt =  await page.locator(`//td[text()='Hong Kong']`).isVisible();
    if(eleExt)
    {
      console.log('Element is found.............');
      await page.locator(`//td[text()='Hong Kong']/preceding-sibling::td/input[@type='checkbox']`).check();
      break;
    }
    let next = page.getByRole('link', { name: 'Next' });
    await next.click();
    count++;
    if(await next.isDisabled())
    {
      console.log('pagination is over........................');
      break;

    }
    await page.waitForTimeout(2000);
 }
 await page.pause();
});
