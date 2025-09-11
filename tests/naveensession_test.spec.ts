import { test, expect } from '@playwright/test';

// test.use({storageState:'auth/Admin.json'});

test('navigate to cart-page without login', async ({page}) => {

    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=checkout/cart");

    await page.waitForTimeout(5000);
});

test('navigate to transcation -page', async ({page}) => {

    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/transaction");

    await page.waitForTimeout(5000);
});

test('My Account Page - Information', async ({page}) => {

    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/edit");

    await page.waitForTimeout(5000);
});
