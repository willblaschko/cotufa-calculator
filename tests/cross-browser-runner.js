const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs').promises;
const path = require('path');
const config = require('../test-config');
const { performOperation } = require('../src/js/calculator');

async function runTest(driver) {
  try {
    await driver.get(config.baseUrl);
    await driver.wait(until.elementLocated(By.id('display')), 10000);

    const testCases = [
      { a: 5, b: 3, op: '+', expected: 8 },
      { a: 10, b: 4, op: '-', expected: 6 },
      { a: 6, b: 7, op: '*', expected: 42 },
      { a: 15, b: 3, op: '/', expected: 5 }
    ];

    for (const testCase of testCases) {
      const { a, b, op, expected } = testCase;
      const result = await performOperation(driver, a, b, op);
      if (result !== expected) {
        throw new Error(`Test failed: ${a} ${op} ${b} = ${result}, expected ${expected}`);
      }
    }

    return { success: true, message: 'All tests passed' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

async function performOperation(driver, a, b, op) {
  const buttonMap = {
    '+': 'add',
    '-': 'subtract',
    '*': 'multiply',
    '/': 'divide'
  };

  await driver.findElement(By.id('clear')).click();
  await driver.findElement(By.id(a.toString())).click();
  await driver.findElement(By.id(buttonMap[op])).click();
  await driver.findElement(By.id(b.toString())).click();
  await driver.findElement(By.id('equals')).click();

  const display = await driver.findElement(By.id('display'));
  return parseFloat(await display.getText());
}

async function runCrossBrowserTests() {
  const results = [];

  for (const browserConfig of config.browsers) {
    const driver = await new Builder()
      .forBrowser(browserConfig.name)
      .usingServer(config.seleniumServerUrl)
      .build();

    try {
      console.log(`Running tests on ${browserConfig.name}...`);
      const result = await runTest(driver);
      results.push({ browser: browserConfig.name, ...result });
    } finally {
      await driver.quit();
    }
  }

  return results;
}

async function generateReport(results) {
  const report = results.map(result => 
    `${result.browser}: ${result.success ? 'PASSED' : 'FAILED'} - ${result.message}`
  ).join('
');

  await fs.writeFile(path.join(__dirname, 'cross-browser-test-results.txt'), report);
  console.log('Test results saved to cross-browser-test-results.txt');
}

async function main() {
  try {
    const results = await runCrossBrowserTests();
    await generateReport(results);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
