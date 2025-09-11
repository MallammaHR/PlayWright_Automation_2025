import { test, expect } from '@playwright/test';

test('swag login - Admin', async ({ page }) => {
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

  await page.locator("//input[@name='username']").fill('Admin');
  await page.locator("//input[@name='password']").fill('admin123');
  await page.locator("//button[@type='submit']").click();
  await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

    //to store the session
    await page.context().storageState({path:'auth/OHRM_Admin.json'});

});