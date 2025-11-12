import {test,expect} from '@playwright/test';

// test('title test', async ({ page }) => {
// await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
// console.log(await page.title());
// await expect(page).toHaveTitle('Account Login');
// });

// test('url test', async ({page}) => {
// await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
// //await expect(page).toHaveURL(/.*account\/login.*/);
// let appURL =page.url();
// await expect(page).toHaveURL(appURL);

// });
test.beforeAll(async() =>{
    console.log('beforeALL------server is up and running');
    console.log('beforeALL---chrome browseris open');
})
test.beforeEach(async() =>{
    console.log('user is Logged-in');
});
test('Home Page Test',async() =>{
    console.log('Home Page Test');
});
test('Search Product Test',async() =>{
    console.log('Search Product Test');
});
test('test-D',async() =>{
    console.log('D-BLock');
});
test.afterAll('tear Down', async() =>{
    console.log('Done!!!!!!!!!!!!!!!!!!!!!!!!');
})
