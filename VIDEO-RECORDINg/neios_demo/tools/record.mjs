// NEIOS demo recorder v2 — Playwright viewport capture, 1920x1080, with visible
// cursor overlay (?cursor=1 drives window.__neiosCursor).
// Usage: node record.mjs <chapter>   (ch1..ch9)
// Requires: dev server on :3000; ASR service for ch3; model tunnel for ch4/ch5.

import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const RAW = join(ROOT, "raw");
mkdirSync(RAW, { recursive: true });

const BASE = "http://localhost:3000";
const VOICE_CLIP = "C:/Users/Sav-Dev/Documents/NEIOS/services/natlas-asr/asr_test.mp3";
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

// ---- shared live-model run ---------------------------------------------------
async function runExample(label, dwellMs = 0) {
  await page.goto(`${BASE}/?cursor=1`, { waitUntil: "networkidle" });
  await zoom();
  await sleep(1200);
  await click(`button:has-text("${label}")`);
  await sleep(700);
  await click('button:has-text("Run governed pipeline")');
  await page.waitForSelector("text=/AUDIT.*record appended/", { timeout: 180000 });
  await sleep(1500);
  if (dwellMs) {
    await page.locator(".data-table").scrollIntoViewIfNeeded().catch(() => {});
    await sleep(dwellMs / 2);
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })).catch(() => {});
    await sleep(dwellMs / 2);
  }
}

// ---- chapters (v2 narration_script_v2.md) ------------------------------------
if (chapter === "ch2") {
  // product tour: nav sweep + intake controls
  await page.goto(`${BASE}/?cursor=1`, { waitUntil: "networkidle" });
  await zoom();
  await sleep(1500);
  for (const sel of ["a:has-text('Approvals')", "a:has-text('Audit')", "a:has-text('Intake')",
    ".voice-row", "button:has-text('Hausa')", "button:has-text('Igbo')",
    "text=Run governed pipeline"]) {
    await moveTo(sel);
    await sleep(1800);
  }
  await sleep(16000);
} else if (chapter === "ch3") {
  // voice intake: upload an audio clip -> ASR -> editable transcript
  await page.goto(`${BASE}/?cursor=1`, { waitUntil: "networkidle" });
  await zoom();
  await sleep(1500);
  await moveTo(".voice-row");
  await sleep(800);
  // cursor to the language select, then to Upload
  await moveTo("select.voice-lang");
  await sleep(700);
  await moveTo("label.voice-btn:has-text('Upload audio')");
  await cursorClickFx();
  await page.setInputFiles('input[type="file"]', VOICE_CLIP);
  await sleep(600);
  // wait for the transcript to land in the textarea
  await page.waitForFunction(
    () => (document.querySelector("textarea.intake")?.value ?? "").length > 40,
    { timeout: 120000 }
  );
  await sleep(2500);
  // visible edit: focus textarea and click into it (shows transcript is editable)
  await moveTo("textarea.intake");
  await cursorClickFx();
  await page.locator("textarea.intake").click();
  await sleep(22000);
} else if (chapter === "ch4") {
  await runExample("English (Pidgin)", 16000);
} else if (chapter === "ch5a") {
  await runExample("Hausa", 6000);
} else if (chapter === "ch5b") {
  await runExample("Yoruba", 5000);
} else if (chapter === "ch5c") {
  await runExample("Igbo", 5000);
} else if (chapter === "ch8") {
  // approvals queue -> approve -> audit
  await page.goto(`${BASE}/approvals?cursor=1`, { waitUntil: "networkidle" });
  await zoom();
  await sleep(2000);
  await moveTo("text=Approvals");
  await sleep(1200);
  await click('button:has-text("Approve")');
  await sleep(1500);
  await click('a:has-text("Audit")');
  await sleep(4000);
  await page.evaluate(() => window.scrollTo({ top: 320, behavior: "smooth" }));
  await sleep(5500);
} else if (["ch1", "ch6", "ch7", "ch9"].includes(chapter)) {
  // rendered pages: title, benchmark results, blocked-run terminal, outro
  const file = { ch1: "ch1_title.html", ch6: "ch6_benchmark.html", ch7: "ch7_terminal.html", ch9: "ch9_outro.html" }[chapter];
  const secs = { ch1: 28, ch6: 34, ch7: 23, ch9: 29 }[chapter];
  await page.goto("file:///" + join(RAW, "pages", file).replace(/\\/g, "/"));
  await sleep(secs * 1000);
}

await ctx.close(); // finalizes the .webm
await browser.close();
console.log(`recorded ${chapter} -> ${RAW}`);
