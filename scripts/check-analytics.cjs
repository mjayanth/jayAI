// Optional browser smoke check. Supply Playwright through the normal Node module path.
// Local mode uses the actual Cloudflare beacon but intercepts collection requests.
// --live sends two real verification page views; run only after publishing.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const origin = 'https://mjayanth.github.io';
const sitePath = '/jayAI/';
const live = process.argv.includes('--live');
const expectedToken = 'e6f6eac50a1b4995bfe1cc2f482f67b0';

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const file of ['index.html', 'playbooks/ai-platform.html']) {
      const context = await browser.newContext();
      const records = [];
      const errors = [];
      if (!live) {
        await context.route(origin + sitePath + '**', async route => {
          const url = new URL(route.request().url());
          const relative = decodeURIComponent(url.pathname.slice(sitePath.length)) || 'index.html';
          const localPath = path.resolve(root, relative);
          if (!localPath.startsWith(root + path.sep) || !fs.existsSync(localPath)) {
            await route.fulfill({ status: 404 });
            return;
          }
          const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' };
          await route.fulfill({ status: 200, contentType: types[path.extname(localPath)] || 'application/octet-stream', body: fs.readFileSync(localPath) });
        });
        await context.route('**/cdn-cgi/rum*', route => route.fulfill({ status: 204, headers: { 'access-control-allow-origin': origin, 'access-control-allow-methods': 'POST, OPTIONS', 'access-control-allow-headers': 'content-type' } }));
      }
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(error.message));
      page.on('request', request => {
        if (request.method() === 'POST' && new URL(request.url()).pathname === '/cdn-cgi/rum') {
          records.push({ request, body: request.postDataJSON() });
        }
      });
      const url = origin + sitePath + file + (live ? '?analytics-check=1' : '');
      await page.goto(url, { waitUntil: 'networkidle' });
      const deadline = Date.now() + 7000;
      while (!records.length && Date.now() < deadline) await new Promise(resolve => setTimeout(resolve, 100));
      assert.ok(records.length, file + ': no Cloudflare collection request emitted');
      const record = records.find(item => item.body.siteToken === expectedToken);
      assert.ok(record, file + ': collection request does not identify the intended site');
      assert.equal(new URL(record.body.location).pathname, sitePath + file, 'Analytics reports the page being visited');
      if (live) {
        const response = await record.request.response();
        assert.ok(response && response.ok(), 'Cloudflare did not accept the collection request');
        console.log(JSON.stringify({ page: file, mode: 'live', collectorStatus: response.status(), tokenMatched: true }));
      } else {
        console.log(JSON.stringify({ page: file, mode: 'local', beaconExecuted: true, collectionIntercepted: true, tokenMatched: true }));
      }
      assert.equal(await page.locator('script[src*="static.cloudflareinsights.com/beacon.min.js"]').count(), 1, 'Only one analytics installation per page');
      assert.deepEqual(errors, [], 'No page execution errors');
      await context.close();
    }
    if (!live) {
      const context = await browser.newContext();
      const requests = [];
      await context.route('**/cdn-cgi/rum*', async route => {
        if (route.request().method() === 'POST') requests.push(route.request());
        await route.fulfill({ status: 204, headers: { 'access-control-allow-origin': '*' } });
      });
      const page = await context.newPage();
      for (const file of ['index.html', 'playbooks/ai-platform.html']) {
        await page.goto(pathToFileURL(path.join(root, file)).href, { waitUntil: 'networkidle' });
        await page.waitForTimeout(500);
        assert.equal(await page.locator('script[src*="static.cloudflareinsights.com/beacon.min.js"]').count(), 0, 'Local previews must not load analytics');
        assert.equal(requests.length, 0, 'Local previews must not send local file paths to analytics');
      }
      console.log('PASS: local HTML previews do not load or submit analytics');
      await context.close();
    }
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
