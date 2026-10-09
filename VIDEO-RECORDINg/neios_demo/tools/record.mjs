// NEIOS demo recorder — Playwright viewport capture, 1920x1080, with visible
// cursor overlay (?cursor=1 drives window.__neiosCursor).
// Usage: node record.mjs <chapter>   (ch1|ch2|ch3|ch4|ch5|ch6|ch7|ch8)
// Requires: dev server on :3000; model tunnel for live-model chapters.

import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const RAW = join(ROOT, "raw");
mkdirSync(RAW, { recursive: true });

const BASE = "http://localhost:3000";
const chapter = process.argv[2];
if (!chapter) { console.error("usage: node record.mjs <chapter>"); process.exit(1); }

const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  recordVideo: { dir: RAW, size: { width: 1920, height: 1080 } },
});
const page = await ctx.newPage();
const sleep = (ms) => page.waitForTimeout(ms);
const zoom = () => page.evaluate(() => { document.body.style.zoom = "1.55"; });

// ---- visible cursor helpers -------------------------------------------------
const cursorMove = (x, y) => page.evaluate(([cx, cy]) => window.__neiosCursor?.moveTo(cx, cy), [x, y]);
const cursorClickFx = () => page.evaluate(() => window.__neiosCursor?.click());

async function moveTo(sel) {
  const box = await page.locator(sel).first().boundingBox();
  if (!box) return;
  await cursorMove(box.x + box.width / 2, box.y + box.height / 2);
  await sleep(700); // let the animated cursor visibly travel
}
async function click(sel) {
  await moveTo(sel);
  await cursorClickFx();
  await sleep(350);
  await page.locator(sel).first().click();
}

// ---- chapters ----------------------------------------------------------------
async function runExample(label, dwellMs = 0) {
  await page.goto(`${BASE}/?cursor=1`, { waitUntil: "networkidle" });
  await zoom();
  await sleep(1200);
  await click(`button:has-text("${label}")`);
  await sleep(700);
  await click('button:has-text("Run governed pipeline")');
  await page.waitForSelector("text=/AUDIT.*record appended/", { timeout: 120000 });
  await sleep(1500);
  // dwell on the result: scroll through invoice + provenance
  if (dwellMs) {
    await page.locator(".data-table").scrollIntoViewIfNeeded().catch(() => {});
    await sleep(dwellMs / 2);
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })).catch(() => {});
    await sleep(dwellMs / 2);
  }
}

if (chapter === "ch2") {
  await page.goto(`${BASE}/?cursor=1`, { waitUntil: "networkidle" });
  await zoom();
  await sleep(1500);
  for (const sel of ["a:has-text('Approvals')", "a:has-text('Audit')", "a:has-text('Intake')",
    "text=WORK REQUEST", "button:has-text('Hausa')", "button:has-text('Igbo')",
    "text=Run governed pipeline"]) {
    await moveTo(sel);
    await sleep(900);
  }
  await sleep(2500);
} else if (chapter === "ch3") {
  await runExample("English (Pidgin)", 22000);
} else if (chapter === "ch4") {
  await runExample("Hausa", 8000);
} else if (chapter === "ch4b") {
  await runExample("Yoruba", 6000);
} else if (chapter === "ch4c") {
  await runExample("Igbo", 6000);
} else if (chapter === "ch6") {
  await page.goto(`${BASE}/approvals?cursor=1`, { waitUntil: "networkidle" });
  await zoom();
  await sleep(2000);
  await moveTo("text=Approvals");
  await sleep(1200);
  await click('button:has-text("Approve")');
  await sleep(1500);
  await click('a:has-text("Audit")');
  await sleep(4000);
} else if (chapter === "ch7") {
  await page.goto(`${BASE}/audit?cursor=1`, { waitUntil: "networkidle" });
  await zoom();
  await sleep(2000);
  await moveTo("text=Audit Log");
  await page.evaluate(() => window.scrollTo({ top: 350, behavior: "smooth" }));
  await sleep(5000);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  await sleep(3000);
} else if (["ch1", "ch5", "ch8"].includes(chapter)) {
  const file = { ch1: "ch1_title.html", ch5: "ch5_terminal.html", ch8: "ch8_outro.html" }[chapter];
  const secs = { ch1: 26, ch5: 15, ch8: 17 }[chapter];
  await page.goto("file:///" + join(RAW, "pages", file).replace(/\\/g, "/"));
  await sleep(secs * 1000);
}

await ctx.close(); // finalizes the .webm
await browser.close();
console.log(`recorded ${chapter} -> ${RAW}`);
