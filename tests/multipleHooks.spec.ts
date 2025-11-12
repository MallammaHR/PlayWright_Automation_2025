import {test} from'@playwright/test';

test.describe('Multiple Hooks Example', () => {

  test.beforeAll(async () => {
    console.log('beforeAll #1 — Setup database');
  });

  test.beforeAll(async () => {
    console.log('beforeAll #2 — Launch browser');
  });

  test.beforeEach(async () => {
    console.log('beforeEach — Login user');
  });

  test('Test A', async () => {
    console.log('Running Test A');
  });

  test.afterEach(async () => {
    console.log('afterEach #1 — Logout user');
  });

  test.afterEach(async () => {
    console.log('afterEach #2 — Clear cookies');
  });

  test.afterAll(async () => {
    console.log('afterAll #1 — Close browser');
  });

  test.afterAll(async () => {
    console.log('afterAll #2 — Clean up database');
  });
});
