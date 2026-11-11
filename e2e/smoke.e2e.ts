import { expect, test } from '@playwright/test';

declare global {
  interface Window {
    __violations: string[];
  }
}

for (const path of ['/en/', '/es/']) {
  test(`${path} loads without console errors or policy violations`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));
    // Runs before any page script; Playwright injects it outside the page's CSP.
    await page.addInitScript(() => {
      window.__violations = [];
      document.addEventListener('securitypolicyviolation', (event) => {
        window.__violations.push(`${event.violatedDirective} blocked ${event.blockedURI || 'inline'}`);
      });
    });

    const response = await page.goto(path);
    expect(response?.status()).toBe(200);

    // Scroll to the end so lazy images and every scroll-driven script run.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForLoadState('networkidle');

    expect(await page.evaluate(() => window.__violations)).toEqual([]);
    expect(errors).toEqual([]);
  });
}
