
//refer last chapter of typescript and we use type to create our own fixture in typscipt
import { test, expect } from '@playwright/test';
import fs from 'fs';

//schema/type of reg data fields
type RegData = {
    firstName: string,
    lastName: string,
    telephone: string,
    password: string,
    subscribeNewsletter: string
}

let registerationData: RegData[] = JSON.parse(fs.readFileSync('./data/register.json', 'utf-8'));

for (let user of registerationData) {
    test(`Registration test for ${user.firstName}`, async ({ page }) => 
        {
        await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
        await page.getByRole('textbox', { name: 'First Name' }).fill(user.firstName);
        await page.getByRole('textbox', { name: 'Last Name' }).fill(user.lastName);
        await page.getByRole('textbox', { name: 'E-Mail' }).fill(getRandomEmail());
        await page.getByRole('textbox', { name: 'Telephone' }).fill(user.telephone);
        await page.getByRole('textbox', { name: 'Password' }).first().fill(user.password);
        await page.getByRole('textbox', { name: 'Password Confirm' }).fill(user.password);

        if (user.subscribeNewsletter === "Yes") {
            await page.getByRole('radio', { name: 'Yes', checked: false }).click();
        }
        else {
            await page.getByRole('radio', { name: 'No', checked: true }).click();
        }
        await page.locator('[name="agree"]').click();
        await page.getByRole('button', { name: 'Continue' }).click();

        await expect(page.getByText('Your Account Has Been Created!', { exact: true })).toBeVisible();
    })
}


function getRandomEmail() : string{
    let randomValue = Math.random().toString(36).substring(2, 9);
    return `auto_${randomValue}@nal.com`;
}
 
//delete * from user where email like 'auto_%'
//  to install csv=>npm install csv-parse(with or without sudo)
//npx playwright test --browser=chromium =>we can run our tests on specific browser