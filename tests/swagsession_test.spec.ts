import { test, expect } from '@playwright/test';

//test.use({storageState:'auth/Swag_Admin.json'});


test('navigate to cart-page without login', async ({page}) => {

    await page.goto("https://www.saucedemo.com/v1/cart.html");

    await page.waitForTimeout(5000);
});

test('navigate to cart-page without swag_user-1 login', async ({page}) => {

    await page.goto("https://www.saucedemo.com/v1/cart.html");

    await page.waitForTimeout(5000);
});

