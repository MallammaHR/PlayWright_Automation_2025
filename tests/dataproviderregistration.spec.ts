import { test, Page, Locator, expect } from '@playwright/test';
import { createPublicKey } from 'crypto';

let regData = [
  { 
    firstname: 'Bob',
    lastname: 'Eric',
    email: 'bob1@gmail.com',
    telephone: '9898989872',
    password: 'test123',
    confirmpassword: 'test123',
    subscribe: 'yes',
    continue: 'click'
  },

  {
    firstname: 'Job',
    lastname: 'ric',
    email: 'job1@gmail.com',
    telephone: '9098989872',
    password: 'test123',
    confirmpassword: 'test123',
    subscribe: 'yes',
    continue: 'click'
  },

  {
    firstname: 'rob',
    lastname: 'ric',
    email: 'robicb1@gmail.com',
    telephone: '09898989872',
    password: 'test123',
    confirmpassword: 'test123',
    subscribe: 'yes',
    continue: 'click'
  }
];

// Loop should be OUTSIDE the array
for (let data of regData) {
  test(`res user for ${data.firstname} and ${data.lastname}`, async ({ page }) => {
    
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
    await page.locator('#input-firstname').fill(data.firstname);

    await page.fill('#input-lastname', data.lastname);

    await page.fill('#input-email', data.email);
    await page.fill('#input-telephone', data.telephone);
    await page.fill('#input-password', data.password);
    await page.fill('#input-confirm', data.confirmpassword);

    page.getByRole('radio', { name: 'Yes', checked: false });

    await page.getByRole('checkbox').click();

    await page.locator(`//input[@type='submit']`).click();

    let sucessMs = page.getByRole('heading', {name : 'Your Account Has Been Created!'});

    await expect(sucessMs).toBeVisible();

  });
}
