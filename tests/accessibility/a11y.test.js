const { AxePuppeteer } = require('@axe-core/puppeteer');
const puppeteer = require('puppeteer');

describe('Accessibility Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000'); // Adjust URL as needed
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should pass axe-core accessibility tests', async () => {
    const results = await new AxePuppeteer(page).analyze();
    expect(results.violations.length).toBe(0);
  });

  it('should have proper keyboard navigation', async () => {
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement.textContent);
    expect(focusedElement).toBe('7'); // Assuming '7' is the first button

    // Test navigation through all calculator buttons
    for (let i = 0; i < 19; i++) { // 19 is the total number of buttons
      await page.keyboard.press('Tab');
    }

    const lastFocusedElement = await page.evaluate(() => document.activeElement.textContent);
    expect(lastFocusedElement).toBe('='); // Assuming '=' is the last button
  });

  it('should have proper color contrast', async () => {
    const contrastViolations = await page.evaluate(() => {
      return axe.run(document, { 
        runOnly: {
          type: 'rule',
          values: ['color-contrast']
        }
      });
    });

    expect(contrastViolations.violations.length).toBe(0);
  });

  it('should have proper ARIA labels', async () => {
    const ariaViolations = await page.evaluate(() => {
      return axe.run(document, {
        runOnly: {
          type: 'rule',
          values: ['aria-*']
        }
      });
    });

    expect(ariaViolations.violations.length).toBe(0);
  });

  it('should be screen reader friendly', async () => {
    const screenReaderViolations = await page.evaluate(() => {
      return axe.run(document, {
        runOnly: {
          type: 'rule',
          values: ['document-title', 'html-has-lang', 'landmark-one-main', 'page-has-heading-one']
        }
      });
    });

    expect(screenReaderViolations.violations.length).toBe(0);
  });
});
