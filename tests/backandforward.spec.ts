import { test, expect } from '@playwright/test';

test('Back and Forward Button Simulation Test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  console.log('Page Title is : ', await page.title());//plawright
  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/logout');
  console.log('Page Title is : ', await page.title());//Account Login
  await page.goBack();
  console.log('Page Title is : ', await page.title());//playwright
  await page.goForward();
  console.log('Page Title is : ', await page.title());//Account Login
  await page.goBack();
  console.log('Page Title is : ', await page.title());//playwright

  await page.waitForTimeout(5000);

  await page.reload();//refresh the page 


});
