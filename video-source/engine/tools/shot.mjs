// node shot.mjs --html=<path under P/hf, e.g. index.html or _dev/s5/index.html> --out=<dir> [--port=8950] [--tl=nha-personal-brand] [--probe] t1 t2 ...
// Serves P/hf as the web root (so assets/... resolve from any html under it), seeks the paused GSAP timeline
// window.__timelines[tl] to each time and screenshots 1920x1080. --probe also prints text-box overlaps / off-screen boxes.
// Several agents can run this at once: give each a different --port.
import http from "http";
import fs from "fs";
import path from "path";
import { createRequire } from "module";
const require = createRequire("D:/MCP/apps/peram_video/package.json");
const puppeteer = require("puppeteer-core");
const ROOT = "D:/MCP/output/nha_personal_brand/hf";
const args = process.argv.slice(2);
const opt = Object.fromEntries(args.filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.length ? v.join("=") : true]; }));
const ts = args.filter((a) => !a.startsWith("--"));
const html = opt.html || "index.html", out = opt.out || "D:/MCP/output/nha_personal_brand/_shots", port = +(opt.port || 8950), TL = opt.tl || "nha-personal-brand";
fs.mkdirSync(out, { recursive: true });
const MIME = { ".html": "text/html", ".js": "text/javascript", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".css": "text/css", ".svg": "image/svg+xml", ".json": "application/json", ".jpg": "image/jpeg" };
const srv = http.createServer((q, r) => {
  const u = decodeURIComponent(q.url.split("?")[0]);
  const f = path.join(ROOT, u === "/" ? html : u);
  fs.readFile(f, (e, b) => { if (e) { r.writeHead(404); r.end(); return; } r.writeHead(200, { "Content-Type": MIME[path.extname(f)] || "application/octet-stream" }); r.end(b); });
}).listen(port);
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--force-device-scale-factor=1", "--disable-web-security"] });
const p = await b.newPage();
await p.setViewport({ width: 1920, height: 1080 });
const errs = [];
p.on("pageerror", (e) => errs.push(String(e)));
p.on("console", (m) => { if ((m.type() === "error" || m.type() === "warning") && !/favicon|status of 404/.test(m.text())) errs.push(m.type() + ": " + m.text()); });
p.on("response", (r) => { if (r.status() >= 400 && !r.url().endsWith("favicon.ico")) errs.push(`HTTP ${r.status()} ${r.url()}`); });
await p.goto(`http://localhost:${port}/${html}`, { waitUntil: "load", timeout: 60000 });
await p.evaluate(() => document.fonts.ready);
const has = await p.evaluate((TL) => !!(window.__timelines && window.__timelines[TL]), TL);
if (!has) errs.push(`timeline window.__timelines["${TL}"] missing`);
for (const t of ts) {
  if (has) await p.evaluate((t, TL) => { window.__timelines[TL].seek(+t, false); }, t, TL);
  await new Promise((r) => setTimeout(r, 60));
  await p.screenshot({ path: `${out}/t${(+t).toFixed(2).padStart(6, "0")}.png` });
}
if (opt.probe && has) {
  for (const t of ts) {
    await p.evaluate((t, TL) => { window.__timelines[TL].seek(+t, false); }, t, TL);
    const r = await p.evaluate(() => {
      const vis = (e) => { let n = e; while (n && n !== document.body) { const cs = getComputedStyle(n); if (cs.visibility === "hidden" || +cs.opacity < 0.05 || cs.display === "none") return false; n = n.parentElement; } return true; };
      // every element that is a layout unit declares data-box (id or role). Overlap between two data-box elements that are not
      // nested and not declared data-allow="<other id>" is reported. Off-screen and caption-band intrusions are reported too.
      const els = [...document.querySelectorAll("[data-box]")].filter(vis);
      const bx = els.map((e) => ({ e, r: e.getBoundingClientRect(), id: e.getAttribute("data-box"), allow: (e.getAttribute("data-allow") || "").split(/\s+/) }));
      const out = [];
      for (let i = 0; i < bx.length; i++) for (let j = i + 1; j < bx.length; j++) {
        const A = bx[i], B = bx[j];
        if (A.e.contains(B.e) || B.e.contains(A.e) || A.allow.includes(B.id) || B.allow.includes(A.id) || A.allow.includes("*") || B.allow.includes("*")) continue;
        const w = Math.min(A.r.right, B.r.right) - Math.max(A.r.left, B.r.left), h = Math.min(A.r.bottom, B.r.bottom) - Math.max(A.r.top, B.r.top);
        if (w > 2 && h > 2) out.push(`OVERLAP ${A.id} x ${B.id} (${Math.round(w)}x${Math.round(h)})`);
      }
      bx.forEach((b) => {
        if (b.r.right > 1920 || b.r.left < 0 || b.r.bottom > 1080 || b.r.top < 0) out.push("OFFSCREEN " + b.id);
        if (!b.e.closest("#caps") && b.r.bottom > 902 && b.r.top < 1022 && b.r.width > 0) out.push("CAPTION-BAND " + b.id);
      });
      // minimum text size: any visible text node rendered smaller than 20 px
      const small = [];
      const walker = document.createTreeWalker(document.getElementById("stage") || document.body, NodeFilter.SHOW_TEXT);
      let n; while ((n = walker.nextNode())) { const el = n.parentElement; if (!n.textContent.trim() || !vis(el)) continue; const fs = parseFloat(getComputedStyle(el).fontSize); const sc = el.getBoundingClientRect().height / Math.max(1, el.offsetHeight || 1); if (fs * (sc || 1) < 19.5) small.push(`${n.textContent.trim().slice(0, 24)}@${(fs * (sc || 1)).toFixed(1)}px`); }
      if (small.length) out.push("SMALL-TEXT " + small.slice(0, 12).join(" | "));
      return out;
    });
    console.log(`t=${t}: ${r.length ? r.join(" | ") : "ok"}`);
  }
}
console.log("ERRORS:", errs.length ? errs.join("\n") : "none");
await b.close();
srv.close();
