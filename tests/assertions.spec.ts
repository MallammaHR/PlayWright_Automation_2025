import { test, expect, Page, Locator } from '@playwright/test'

test('value assertions', async () => {
    
    expect(3 + 4).toBe
    expect(1 + 1).toBe(2);
    expect('playwright').toContain('play');
    expect([1, 2, 3]).toEqual([1, 2, 3]);
    expect(true).toBeTruthy();
    expect(false).toBeFalsy();
    expect(null).toBeNull();
    expect(50).toBeGreaterThan(10);
    expect({ role: 'admin' }).toEqual({ role: 'admin' });
    expect({ age: 20, role: 'admin' }).toEqual({ role: 'admin', age: 20 });
test('locator based assertions', async ({ page}) => {
    
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    let header = page.getByText('Returning Customer', { exact: true });
    await expect(header).toBeVisible();
    await expect(header).toHaveText('Returning Customer', { timeout: 10000 });
    await expect(header).toContainText('Returning');

    let emailId = page.getByRole('textbox', { name: 'E-Mail Address' });
    await expect(emailId).toHaveAttribute('id', 'input-email');
    await expect(emailId).toHaveCSS('height', '34px');

    let footerLinks = page.locator('//footer//a');
    await expect(footerLinks).toHaveCount(16);
    
    
 });

// test('soft assertions', async ({ page}) => {
    
//     await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
//     let header = page.getByText('Returning Customer', { exact: true });
//     //await expect(header).toHaveText('Returning Customer1');

//     //soft assertion:
//     await expect.soft(header).toHaveText('Returning ');
//     await expect.soft(header).toHaveText('Customer');

//     console.log('Done!!');    
// })


// test('not assertions', async ({ page}) => {
    
//     await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
//     await expect(page.locator('#error')).not.toBeVisible();
//     let title = await page.title();
//     expect(title).not.toContain('error');

// })


// test('screenshot assertions', async ({ page}) => {
//     await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
//     let header = page.getByText('Returning Customer', { exact: true });
//     await expect(header).toHaveScreenshot('header.png');
// })



// test('url and title assertions', async ({ page}) => {
//     await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

//     await expect(page).toHaveTitle('Account Login');
//     await expect(page).toHaveURL(/.*account\/login.*/);

//     let appUrl = page.url();
//     expect(appUrl).toContain('account/login');

// })



// test('element is visible, enabled, disabled assertions', async ({ page}) => {
//     await page.goto('https://classic.freecrm.com/register/');

//     let checkbox = page.getByLabel('I agree with the terms and conditions.');
//     let submitBtn = page.getByRole('button', { name: 'SUBMIT' });

//     await expect(checkbox).not.toBeChecked();
//     await expect(submitBtn).toBeDisabled();
//     await expect(submitBtn).toBeVisible();
    
//     await checkbox.check();

//     await expect(checkbox).toBeChecked();
//     await expect(submitBtn).toBeEnabled({timeout: 10000});
//     await expect(submitBtn).toBeVisible();

//    await page.pause();

});
