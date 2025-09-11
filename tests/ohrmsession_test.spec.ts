import { test, expect } from '@playwright/test';

test.use({storageState:'auth/OHRM_Admin.json'});
//test.use({storageState:'auth/Swag_User-1.json'});
// test.use({storageState:'auth/User-2.json'});

test('navigate to Profile without login', async ({page}) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPersonalDetails/empNumber/7");

    await page.waitForTimeout(5000);
});

test('navigate to cart-page without login', async ({page}) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList");

    await page.waitForTimeout(5000);
});

test('navigate to Directory without login', async ({page}) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory");

    await page.waitForTimeout(5000);
});