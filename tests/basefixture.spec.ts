// import — ES module syntax to bring something from another file/package.

// { test as base } — imports test from Playwright and renames it to base.

// Why rename?
// Because we want to create a new customized test object (with fixtures).
// Using base prevents overwriting the original.
//base is the original Playwright test.You extend it to add your custom fixtures.

import{test as base} from '@playwright/test';

type Myfixture = {

     user: { name : string};//user is the name that we adding to our fixture and type is compile time type (keyword of typescript)
};

const test = base.extend<Myfixture>({
//extend() -to add fixtures
//Myfixture-tells us what fixtures we are adding
//user-name of the fixture
//async-becuse fixtures can run any asynchronous code
//use-this gives the fixture valuse when user asks
  user: async ({}, use) => {
    await use({ name: "Alice" });
  },

});

test('fixture test', async({user})=>{
    console.log(user.name);
})


