import {test,expect} from '@playwright/test';

test.beforeAll(async () => {
    console.log('beforeAll-----Server is Running......');
    console.log('beforeAll-----chrome browser is open ......');

});

test.beforeEach(async() =>{
  console.log('beforeeach--user login-in..........');
})

test('Home-Page Test', async ({ page }) => {
  console.log('Home Page test.....');
 
});

test('Search Page Test',async()=>{
  console.log('Search Page Test...');
});

test('Cart Page Test', async()=>{
  console.log('Cart PAge Test');
});

test.afterEach(async()=>{
console.log('afterEach---user logged-Out......');
});
test.afterAll(async () => {
  console.log('afterAll--Runs once after all tests');
  console.log('afterAll----delete Data....');
});










// test.beforeEach(async ({ page }) => {
//   console.log('Runs before each test');
//   await page.goto('https://example.com');
// });

// test.afterEach(async ({ page }, testInfo) => {
//   console.log('Runs after each test');
//   if (testInfo.status !== testInfo.expectedStatus) {
//     // optional: take screenshot on failure
//     await page.screenshot({ path: `screenshots/${testInfo.title}.png` });
//   }
// });
