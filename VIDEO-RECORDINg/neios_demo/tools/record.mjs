// NEIOS demo recorder — Playwright viewport capture, 1920x1080.
// Usage: node record.mjs <chapter>   (ch2|ch3|ch4|ch5|ch6|ch7)
// Requires: dev server on :3000 (ch2-4,6,7), model tunnel for ch3/ch4.

import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const RAW = join(ROOT, "raw");
mkdirSync(RAW, { recursive: true });

const BASE = "http://localhost:3000";
const chapter = process.argv[2];
if (!chapter) { console.error("usage: node record.mjs <ch2|ch3|ch4|ch5|ch6|ch7>"); process.exit(1); }

const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  recordVideo: { dir: RAW, size: { width: 1920, height: 1080 } },
});
const page = await ctx.newPage();
const sleep = (ms) => page.waitForTimeout(ms);
// The app is compact (~860px wide); zoom so it fills the 1080p frame.
const zoom = () => page.evaluate(() => { document.body.style.zoom = "1.55"; });

async function runExample(label) {
  await page.goto(BASE, { waitUntil: "networkidle" });
  await zoom();
  await page.getByRole("button", { name: label }).click();
  await sleep(800);
  await page.getByRole("button", { name: /^Run$/ }).click();
  // wait for AUDIT stage = pipeline finished (max 120 s incl. retry)
  await page.waitForSelector("text=/AUDIT.*record appended/", { timeout: 120000 });
  await sleep(1200);
}

if (chapter === "ch2") {
  await page.goto(BASE, { waitUntil: "networkidle" });
  await zoom();
  await sleep(2000);
  // slow tour: hover each panel
  for (const sel of ["text=WORK REQUEST", "text=English (Pidgin)", "text=NEIOS"]) {
    await page.locator(sel).first().hover().catch(() => {});
    await sleep(1500);
  }
  await sleep(2000);
} else if (chapter === "ch3") {
  await runExample("English (Pidgin)");
  await page.locator("pre").scrollIntoViewIfNeeded().catch(() => {});
  await sleep(4000);
} else if (chapter === "ch4") {
  await runExample("Hausa");
  await page.locator("pre").scrollIntoViewIfNeeded().catch(() => {});
  await sleep(4000);
} else if (chapter === "ch6") {
  // assumes a pending_approval run just happened in this same context
  await page.goto(BASE, { waitUntil: "networkidle" });
  await runExample("English (Pidgin)");
  await page.getByRole("button", { name: "Approve" }).click();
  await sleep(2500);
} else if (chapter === "ch1" || chapter === "ch5" || chapter === "ch7" || chapter === "ch8") {
  // rendered pages built by build_pages.py from real evidence/audit data
  const file = { ch1: "ch1_title.html", ch5: "ch5_terminal.html", ch7: "ch7_audit.html", ch8: "ch8_outro.html" }[chapter];
  const secs = { ch1: 6, ch5: 14, ch7: 16, ch8: 6 }[chapter];
  await page.goto("file:///" + join(RAW, "pages", file).replace(/\\/g, "/"));
  if (chapter === "ch7") await page.locator("table").evaluate((el) => el.scrollIntoView());
  await sleep(secs * 1000);
}

await ctx.close(); // finalizes the .webm
await browser.close();
console.log(`recorded ${chapter} -> ${RAW}`);
