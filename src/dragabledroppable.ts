import { Browser, chromium, Locator, Page,FrameLocator,expect } from '@playwright/test';

// IIFE - Immediately Invoked Function Expression
(async () => {
  let browser: Browser = await chromium.launch({
    headless: false,
    channel : 'chrome',
    
  });

  let page: Page = await browser.newPage();

  await page.goto('https://jqueryui.com/resources/demos/droppable/default.html');

  let source = page.locator('#draggable');
  let target = page.locator('#droppable');

  await source.dragTo(target);
  await expect(target).toContainText('Dropped!');

})();


