// test-config.js
// Configuration file for testing environment

module.exports = {
  // Base URL of the application to be tested
  baseUrl: 'http://localhost:3000', // Adjust this to your actual application URL

  // Credentials for authenticated tests (if needed)
  credentials: {
    username: 'testuser',
    password: 'testpass123'
  },

  // Browser configurations
  browsers: [
    { name: 'chrome', version: 'latest' },
    { name: 'firefox', version: 'latest' },
    { name: 'safari', version: 'latest' },
    { name: 'edge', version: 'latest' }
  ],

  // Device configurations for responsive testing
  devices: [
    { name: 'Desktop', width: 1920, height: 1080 },
    { name: 'Laptop', width: 1366, height: 768 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Mobile', width: 375, height: 667 }
  ],

  // Timeouts
  timeouts: {
    implicit: 5000, // 5 seconds
    pageLoad: 10000, // 10 seconds
    script: 60000 // 1 minute
  },

  // Test data
  testData: {
    validInputs: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'],
    operators: ['+', '-', '*', '/'],
    specialKeys: ['C', 'AC', '=']
  },

  // Accessibility testing configuration
  accessibility: {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa']
    }
  },

  // Cross-browser testing service configuration (e.g., BrowserStack, Sauce Labs)
  crossBrowserTesting: {
    service: 'browserstack',
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY
  }
};
