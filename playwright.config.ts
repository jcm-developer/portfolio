import { defineConfig, devices } from '@playwright/test';

const PORT = 8788;

/**
 * Browser smoke tests (`npm run test:smoke`). They run against the last build served by
 * `wrangler dev`, the only local server that applies `public/_headers`, so a Content Security
 * Policy violation shows up here and not under `npm run dev`. Run `npm run build` first.
 */
export default defineConfig({
  testDir: 'e2e',
  testMatch: '*.e2e.ts',
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: `http://localhost:${PORT}` },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `npx wrangler dev --port ${PORT}`,
    url: `http://localhost:${PORT}/en/`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
    env: { WRANGLER_SEND_METRICS: 'false' },
  },
});
