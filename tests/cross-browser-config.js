// tests/cross-browser-config.js

const browserstack = require('browserstack-local');
const webdriver = require('selenium-webdriver');
const { By, until } = webdriver;

// BrowserStack credentials - replace with your own
const BROWSERSTACK_USERNAME = 'BROWSERSTACK_USERNAME';
const BROWSERSTACK_ACCESS_KEY = 'BROWSERSTACK_ACCESS_KEY';

// BrowserStack capabilities
const capabilities = {
  'bstack:options': {
    userName: BROWSERSTACK_USERNAME,
    accessKey: BROWSERSTACK_ACCESS_KEY,
    projectName: 'Basic Numeric Calculator',
    buildName: 'Cross Browser Tests'
  }
};

// Browser configurations to test
const browserConfigs = [
  { browserName: 'Chrome', browserVersion: 'latest', 'bstack:options': { os: 'Windows', osVersion: '10' } },
  { browserName: 'Firefox', browserVersion: 'latest', 'bstack:options': { os: 'Windows', osVersion: '10' } },
  { browserName: 'Safari', browserVersion: 'latest', 'bstack:options': { os: 'OS X', osVersion: 'Big Sur' } },
  { browserName: 'Edge', browserVersion: 'latest', 'bstack:options': { os: 'Windows', osVersion: '10' } }
];

// Function to create a new WebDriver instance
function createDriver(config) {
  return new webdriver.Builder()
    .usingServer('https://hub-cloud.browserstack.com/wd/hub')
    .withCapabilities({ ...capabilities, ...config })
    .build();
}

// Function to run a test across all browser configurations
async function runTestAcrossBrowsers(testFunction) {
  for (const config of browserConfigs) {
    const driver = createDriver(config);
    try {
      console.log(`Running test on ${config.browserName} ${config.browserVersion}`);
      await testFunction(driver);
      console.log(`Test passed on ${config.browserName} ${config.browserVersion}`);
    } catch (error) {
      console.error(`Test failed on ${config.browserName} ${config.browserVersion}:`, error);
    } finally {
      await driver.quit();
    }
  }
}

// Example test function
async function exampleTest(driver) {
  await driver.get('http://localhost:3000'); // Replace with your app's URL
  await driver.wait(until.elementLocated(By.id('display')), 10000);
  const display = await driver.findElement(By.id('display'));
  const initialValue = await display.getText();
  if (initialValue !== '0') {
    throw new Error('Initial display value is not 0');
  }
  // Add more test steps here...
}

// Export the configuration and helper functions
module.exports = {
  capabilities,
  browserConfigs,
  createDriver,
  runTestAcrossBrowsers,
  exampleTest
};

// If running this file directly, run the example test
if (require.main === module) {
  (async () => {
    await runTestAcrossBrowsers(exampleTest);
  })();
}
