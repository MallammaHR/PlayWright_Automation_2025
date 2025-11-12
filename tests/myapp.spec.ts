import {test,expect} from '@playwright/test';


test.describe('login feature',()=>{

    test.beforeEach('user-loggerin',async({page,browserName})=>{

        await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    });

    test.afterEach('close Browser',async({page})=>{
        await page.close();
    });

    test('title test', async({page})=>{
        await expect(page).toHaveTitle('Account Login');
    });

    test('url test',async({page})=>
    {
       await  expect(page).toHaveURL(/.*account\/login.*/);
    });
});
