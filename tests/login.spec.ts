import { test, expect } from '@playwright/test';

test('locator test', async ({ page }) => {
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");

  // ID locator
  await page.locator('#input-firstname').fill("Mallamma");
  await page.locator('#input-lastname').fill("Reddy");

  // Class name
  const logo = page.locator('.img-responsive');
  await expect(logo).toBeVisible();

  // Text
  await expect(page.locator('text=Register Account')).toBeVisible();
  await expect(page.locator('text=Continue')).toBeEnabled();
  await expect(page.locator('text=Forgotten Password')).toBeVisible();

  // CSS
  await page.locator('input#input-email').fill("roopa123@gmail.com");
  await page.locator('input[name="telephone"]').fill("9898976544");
  await page.locator('input[type="checkbox"]').click();

  // XPath
  await page.locator('//input[@id="input-password"]').fill("test@123");
  await page.locator('//input[@name="search" and @type="text"]').fill('macbook');
});


//https://www.espncricinfo.com/series/men-s-t20-asia-cup-2025-1496919/india-vs-pakistan-final-1496938/full-scorecard
//https://naveenautomationlabs.com/opencart/ui/webtable.html-table
//https://naveenautomationlabs.com/opencart/ui/selectdropdowns.html-dropdowns
