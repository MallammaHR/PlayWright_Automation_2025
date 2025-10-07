import { Browser, chromium, Locator, Page,FrameLocator,expect } from '@playwright/test';

// IIFE - Immediately Invoked Function Expression
(async () => {
  let browser: Browser = await chromium.launch({
    headless: false,
    channel : 'chrome',
    
  });

  let page: Page = await browser.newPage();

  await page.goto('https://the-internet.herokuapp.com/drag_and_drop');

  let source = page.locator('#column-a');
  let target = page.locator('#column-b');
  await source.dragTo(target);
  await expect(target).toContainText('A');
})();