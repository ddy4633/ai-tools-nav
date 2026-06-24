import fs from 'node:fs/promises';
import path from 'node:path';
import { test, expect, type Page, type Request } from '@playwright/test';

const baseUrl = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:3003';
const outDir = path.resolve(process.cwd(), 'research', 'site-audit');

function extractUrls(xml: string) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
}

function slugifyRoute(route: string) {
  return route
    .replace(/^https?:\/\//, '')
    .replace(/[^\w/-]+/g, '-')
    .replace(/\//g, '__');
}

async function scrollThroughPage(page: Page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 800;
      const timer = window.setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= document.body.scrollHeight) {
          window.clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 100);
    });
  });
}

test('audit sitemap pages', async ({ page }) => {
  test.setTimeout(15 * 60 * 1000);
  await fs.mkdir(outDir, { recursive: true });

  const sitemapResponse = await page.goto(`${baseUrl}/sitemap.xml`, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForLoadState('networkidle', { timeout: 1500 }).catch(() => undefined);
  expect(sitemapResponse?.ok()).toBeTruthy();

  const sitemapXml = await page.content();
  const urls = extractUrls(sitemapXml).map((url) => url.replace('https://ai.poph163.com', baseUrl));
  const report = [];

  for (const url of urls) {
    const failedRequests: Array<{ url: string; method: string; failure: string }> = [];
    const handler = (request: Request) => {
      const url = request.url();
      const failure = request.failure()?.errorText || 'unknown';

      if (failure === 'net::ERR_ABORTED' && (url.includes('_rsc=') || url.includes('/_next/static/'))) {
        return;
      }

      failedRequests.push({
        url,
        method: request.method(),
        failure,
      });
    };

    page.on('requestfailed', handler);

    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForLoadState('networkidle', { timeout: 1500 }).catch(() => undefined);
    await scrollThroughPage(page);
    await page.waitForTimeout(200);

    const title = await page.title();
    const h1 = await page.locator('h1').allTextContents();
    const imageStats = await page.evaluate(() => {
      const images = Array.from(document.images);
      const broken = images
        .filter((image) => image.complete && image.naturalWidth === 0)
        .map((image) => image.currentSrc || image.src || image.alt || 'unknown');

      return {
        total: images.length,
        broken,
      };
    });

    const routePath = new URL(url).pathname === '/' ? 'home' : new URL(url).pathname.slice(1);
    const screenshotPath = path.join(outDir, `${slugifyRoute(routePath)}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    report.push({
      url,
      status: response?.status() ?? 0,
      title,
      h1,
      failedRequests,
      imageTotal: imageStats.total,
      brokenImages: imageStats.broken,
      screenshot: screenshotPath,
    });

    page.off('requestfailed', handler);
  }

  await fs.writeFile(
    path.join(outDir, 'report.json'),
    JSON.stringify(
      {
        baseUrl,
        auditedAt: new Date().toISOString(),
        total: report.length,
        pages: report,
      },
      null,
      2
    )
  );
});
