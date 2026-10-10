import { chromium } from 'playwright';
const b = await chromium.launchPersistentContext('', { headless: true, viewport: { width: 1440, height: 900 } });
const p = await b.newPage();
p.on('pageerror', e=>console.log('PAGEERR:', String(e).slice(0,300)));
await p.goto('file:///C:/Users/Sav-Dev/Documents/NEIOS/NEIOS-PROJECT-REVIEW/neios-workflow-prototype.html');
await p.waitForTimeout(1200);
const info = await p.evaluate(() => {
  const app = document.querySelector('#app');
  const main = app.querySelector('main') || app.children[1];
  return { len: app.innerHTML.length, kids: [...app.children].map(c=>c.tagName+'.'+c.className).join(' | '),
           mainText: (main?main.innerText:'').slice(0,200) };
});
console.log(JSON.stringify(info,null,1));
await p.screenshot({ path: 'v4.png', fullPage: true });
await b.close();
