import{test} from '@playwright/test';

// test.describe.serial('Group A', () => {
//   test('A1', async () => {
//     console.log('A1 running');
//   });

//   test('A2', async () => {
//     console.log('A2 running');
//   });
// });

test.describe('Group A', () => {
  test('A1', async () => {
    console.log('Test A1');
  });

  test('A2', async () => {
    console.log('Test A2');
  });
});

test.describe('Group B', () => {
  test('B1', async () => {
    console.log('Test B1');
  });
});

test('Outside-1 describe', async () => {
  console.log('Test-1 Outside');
});
test('Outside-2 describe', async () => {
  console.log('Test-2 Outside');
});