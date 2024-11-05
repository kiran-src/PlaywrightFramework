// @ts-check
require('@dotenvx/dotenvx').config()
require('dotenv').config()
const { defineConfig, devices } = require('@playwright/test');
const selectedUrl = process.env["BASE_URL_"+process.env.PROJECT]
const selectedDirectory = process.env["DIRECTORY_"+process.env.PROJECT]
const automationType=process.env.AUTOMATION_TYPE
const envType='qa'


if(process.env.AUTOMATION_TYPE=="API"){

module.exports = defineConfig({
  timeout:6000,
  
  testDir: selectedDirectory,
  
  fullyParallel: true,/* Run tests in files in parallel */
  
  forbidOnly: !!process.env.CI,/* Fail the build on CI if you accidentally left test.only in the source code. */
  
  retries: process.env.CI ? 2 : 0,/* Retry on CI only */
  
  workers: process.env.CI ? 1 : undefined,/* Opt out of parallel tests on CI. */
  
  reporter: [['line'],['allure-playwright']],/* Reporter to use. See https://playwright.dev/docs/test-reporters */
  
  globalTeardown: require.resolve('./global-teardown.js'),

  use: {
    
    baseURL: selectedUrl,

    trace: 'on-first-retry',/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    actionTimeout:15000,
    ignoreHTTPSErrors: true,
  },

});} else {
  module.exports = defineConfig({
    timeout:6000,
    
    testDir: './tests/ui',
    
    fullyParallel: true,/* Run tests in files in parallel */
    
    forbidOnly: !!process.env.CI,/* Fail the build on CI if you accidentally left test.only in the source code. */
    
    retries: process.env.CI ? 2 : 0,/* Retry on CI only */
    
    workers: process.env.CI ? 1 : undefined,/* Opt out of parallel tests on CI. */
    
    reporter: [['line'],['allure-playwright']],/* Reporter to use. See https://playwright.dev/docs/test-reporters */
    
    globalTeardown: require.resolve('./global-teardown.js'),

    use: {
      baseURL: process.env.BASE_URL_1,/* Base URL to use in actions like `await page.goto('/')`. */
      trace: 'on-first-retry',/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
      headless:false,
      viewport: {
          width:1280,
          height:720
      },
      actionTimeout:15000,
      ignoreHTTPSErrors: true,
      video: 'off',
      screenshots: 'off',
    },
  
    projects: [/* Configure projects for major browsers */
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
      },
      // {
      //   name: 'firefox',
      //   use: { ...devices['Desktop Firefox'] },
      // },
      // {
      //   name: 'webkit',
      //   use: { ...devices['Desktop Safari'] },
      // },
      /* Test against mobile viewports. */
      // {
      //   name: 'Mobile Chrome',
      //   use: { ...devices['Pixel 5'] },
      // },
      // {
      //   name: 'Mobile Safari',
      //   use: { ...devices['iPhone 12'] },
      // },
      /* Test against branded browsers. */
      // {
      //   name: 'Microsoft Edge',
      //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
      // },
      // {
      //   name: 'Google Chrome',
      //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
      // },
    ],
  });
}

