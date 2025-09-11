//1.with test block

import { test, expect } from '@playwright/test';

test('Google title test', async ({ page }) => {
  await page.goto('https://www.google.com');
  
  const title = await page.title();
  console.log('Page Title is : ', title);
  expect(title).toBe('Google');
});
