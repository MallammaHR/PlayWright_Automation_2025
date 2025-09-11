import { test, expect } from '@playwright/test';

test('swag login - Admin', async ({ page }) => {
  await page.goto("https://www.saucedemo.com/v1/index.html");

  await page.locator("//input[@id='user-name']").fill('standard_user');
  await page.locator("//input[@id='password']").fill('secret_sauce');
  await page.locator("//input[@id='login-button']").click();
  await page.waitForURL('https://www.saucedemo.com/v1/inventory.html');

    //to store the session
    await page.context().storageState({path:'auth/Swag_Admin.json'});

});
test('swag login - User1', async ({ page }) => {
  await page.goto("https://www.saucedemo.com/v1/index.html");

  await page.locator("//input[@id='user-name']").fill('standard_user');
  await page.locator("//input[@id='password']").fill('secret_sauce');
  await page.locator("//input[@id='login-button']").click();
  await page.waitForURL('https://www.saucedemo.com/v1/inventory.html');

    //to store the session
    await page.context().storageState({path:'auth/Swag_User-1.json'});

});
