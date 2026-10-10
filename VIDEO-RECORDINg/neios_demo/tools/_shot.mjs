import { chromium } from 'playwright';
const b = await chromium.launchPersistentContext('', { headless: true, viewport: { width: 1440, height: 1000 } });
const p = await b.newPage();
const errs=[]; p.on('pageerror', e=>errs.push(String(e).slice(0,200)));
for (const [name, url] of [['g1_intake','http://localhost:3000/'],['g1_audit','http://localhost:3000/audit'],['g1_approvals','http://localhost:3000/approvals']]) {
  await p.goto(url); await p.waitForTimeout(1600);
  await p.screenshot({ path: name + '.png' });
}
console.log('errors:', errs.length?errs:'none');
await b.close();
