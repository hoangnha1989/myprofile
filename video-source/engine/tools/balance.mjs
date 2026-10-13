// node balance.mjs --html=<path under hf> --port=<p> t1 t2 ...  — BALANCE / EVENNESS gate (layout-standard L0-BIS, L1)
// At each time, over the visible layout units of the stage (data-box, and every .fx-plate / .fx-hero / .hc / .chip):
//  B1 same-row plates/heroes (centre y within 6 px) must share one size (±2 px) and one gap (spread ≤ 6 px)
//  B2 same-row cards (.hc, top within 6 px) must share height (±4 px) and gap (spread ≤ 6 px)
//  B3 cramped: two solid units closer than 8 px without being nested or declared data-allow ("cấn")
//  B4 frame balance: visual mass centre (area-weighted, content zone only) within 14 % of frame width from the centre,
//     unless the scene declares a deliberate side layout with data-balance="left|right" on its root
//  B5 off-grid: plate/hero/card left/top not on the 2 px grid (UNIT = 2)
// Prints per time "ok" or the findings. Exit 1 if any finding.
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
const html = opt.html || "index.html", port = +(opt.port || 8960);
const MIME = { ".html": "text/html", ".js": "text/javascript", ".png": "image/png", ".woff2": "font/woff2", ".css": "text/css", ".svg": "image/svg+xml", ".json": "application/json" };
const srv = http.createServer((q, r) => {
  const u = decodeURIComponent(q.url.split("?")[0]); const f = path.join(ROOT, u === "/" ? html : u);
  fs.readFile(f, (e, b) => { if (e) { r.writeHead(404); r.end(); return; } r.writeHead(200, { "Content-Type": MIME[path.extname(f)] || "application/octet-stream" }); r.end(b); });
}).listen(port);
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", protocolTimeout: 600000, args: ["--force-device-scale-factor=1"] });
const p = await b.newPage(); await p.setViewport({ width: 1920, height: 1080 });
await p.goto(`http://localhost:${port}/${html}`, { waitUntil: "load", timeout: 60000 });
await p.evaluate(() => document.fonts.ready);
let bad = 0;
for (const t of ts) {
  await p.evaluate((t) => { window.__timelines["nha-personal-brand"].seek(+t, false); }, t);
  const r = await p.evaluate(() => {
    const vis = (e) => { let n = e; while (n && n !== document.body) { const cs = getComputedStyle(n); if (cs.visibility === "hidden" || +cs.opacity < 0.5 || cs.display === "none") return false; n = n.parentElement; } return true; };
    const stage = document.getElementById("stage");
    const scene = [...stage.children].find((s) => vis(s));
    if (!scene) return ["no visible scene"];
    const units = [...scene.querySelectorAll(".fx-plate, .fx-hero, .hc, .chip, [data-box]")].slice(0, 400).filter(vis)
      .map((e) => ({ e, r: e.getBoundingClientRect(), id: e.getAttribute("data-box") || e.className, cls: e.className || "", allow: (e.getAttribute("data-allow") || "").split(/\s+/) }))
      .filter((u) => u.r.width > 4 && u.r.height > 4 && u.r.bottom < 880 && u.r.top > 100);
    const out = [];
    const rows = (list, key, tol) => { const g = []; list.forEach((u) => { const k = key(u); const row = g.find((x) => Math.abs(x.k - k) <= tol); row ? row.items.push(u) : g.push({ k, items: [u] }); }); return g.filter((x) => x.items.length >= 2); };
    const gaps = (items) => { const s = items.slice().sort((a, b) => a.r.left - b.r.left); return s.slice(1).map((u, i) => u.r.left - s[i].r.right); };
    const icons = units.filter((u) => /fx-plate|fx-hero/.test(u.cls));
    rows(icons, (u) => (u.r.top + u.r.bottom) / 2, 6).forEach((row) => {
      const ws = row.items.map((u) => u.r.width); if (Math.max(...ws) - Math.min(...ws) > 2) out.push(`B1 icon sizes differ in a row: ${row.items.map((u) => u.id + ":" + Math.round(u.r.width)).join(", ")}`);
      const g = gaps(row.items); if (g.length >= 2 && Math.max(...g) - Math.min(...g) > 6) out.push(`B1 uneven icon gaps ${g.map(Math.round).join("/")} in row ${row.items.map((u) => u.id).join(",")}`);
    });
    const cards = units.filter((u) => /\bhc\b/.test(u.cls));
    rows(cards, (u) => u.r.top, 6).forEach((row) => {
      const hs = row.items.map((u) => u.r.height); if (Math.max(...hs) - Math.min(...hs) > 4) out.push(`B2 card heights differ: ${row.items.map((u) => u.id + ":" + Math.round(u.r.height)).join(", ")}`);
      const g = gaps(row.items); if (g.length >= 2 && Math.max(...g) - Math.min(...g) > 6) out.push(`B2 uneven card gaps ${g.map(Math.round).join("/")}`);
    });
    for (let i = 0; i < units.length; i++) for (let j = i + 1; j < units.length; j++) {
      const A = units[i], B = units[j];
      if (A.e.contains(B.e) || B.e.contains(A.e) || A.allow.includes(B.id) || B.allow.includes(A.id) || A.allow.includes("*") || B.allow.includes("*")) continue;
      const dx = Math.max(A.r.left - B.r.right, B.r.left - A.r.right), dy = Math.max(A.r.top - B.r.bottom, B.r.top - A.r.bottom);
      const d = Math.max(dx, dy);
      if (d >= 0 && d < 8 && (dx < 8 && dy < 8)) out.push(`B3 cramped ${A.id} / ${B.id} (${Math.round(d)} px)`);
    }
    const side = scene.getAttribute("data-balance");
    if (!side) {
      let m = 0, mx = 0; units.filter((u) => !units.some((v) => v !== u && v.e.contains(u.e))).forEach((u) => { const a = u.r.width * u.r.height; m += a; mx += a * (u.r.left + u.r.right) / 2; });
      if (m > 0) { const c = mx / m; if (Math.abs(c - 960) > 0.14 * 1920) out.push(`B4 frame unbalanced: mass centre x=${Math.round(c)} (set data-balance on the scene root if deliberate)`); }
    }
    units.filter((u) => /fx-plate|fx-hero|\bhc\b/.test(u.cls)).forEach((u) => { const st = u.e.style; const l = parseFloat(st.left), tp = parseFloat(st.top); if ((!isNaN(l) && l % 2) || (!isNaN(tp) && tp % 2)) out.push(`B5 off-grid ${u.id} (${st.left}, ${st.top})`); });
    return [...new Set(out)];
  });
  if (r.length) bad++;
  console.log(`t=${t}: ${r.length ? r.join(" | ") : "ok"}`);
}
await b.close(); srv.close();
process.exit(bad ? 1 : 0);
