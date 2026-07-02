import { test, expect } from '@playwright/test';

const baseUrl = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:3003';
const freshLaunches = [
  { id: 'modelence', name: 'Modelence App Builder' },
  { id: 'tabstack', name: 'Tabstack' },
  { id: 'acti', name: 'Acti' },
  { id: 'adam-cad-copilot', name: 'Adam CAD Copilot' },
  { id: 'mailadept', name: 'MailAdept' },
  { id: 'humalike', name: 'Humalike' },
];

test('homepage and featured api surface the fresh launches', async ({ page, request }) => {
  const homepage = await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded', timeout: 20000 });
  expect(homepage?.ok()).toBeTruthy();
  await page.waitForLoadState('networkidle', { timeout: 3000 }).catch(() => undefined);

  const homepageText = await page.locator('body').innerText();
  const homepageHits = freshLaunches.filter((tool) => homepageText.includes(tool.name));
  expect(homepageHits.length).toBeGreaterThanOrEqual(3);

  const featuredResponse = await request.get(`${baseUrl}/api/tools?type=featured&limit=8`);
  expect(featuredResponse.ok()).toBeTruthy();
  const featuredPayload = await featuredResponse.json();
  const featuredIds = new Set((featuredPayload.data ?? []).map((tool: { id: string }) => tool.id));

  for (const tool of ['modelence', 'tabstack', 'acti']) {
    expect(featuredIds.has(tool)).toBeTruthy();
  }
});

test('fresh launch detail pages render', async ({ page }) => {
  for (const tool of freshLaunches) {
    const response = await page.goto(`${baseUrl}/tools/${tool.id}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator('h1')).toContainText(tool.name);
  }
});
