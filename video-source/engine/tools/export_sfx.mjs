// node export_sfx.mjs [--html=index.html] [--port=8990]
// Loads the built page, reads window.__sfx_cues (registered by the scene files via sfx(kind, t, gain)), maps each kind to a
// file of the v4 SFX kit (work/v4/sfx, made by sfx_synth.py) and its default gain, and writes work/sfx_cues.json.
// build.py (ENGINE=v4) then declares them as timeline.json audio_tracks.sfx; mix.py mixes exactly that list.
import http from "http";
import fs from "fs";
import path from "path";
import { createRequire } from "module";
const require = createRequire("D:/MCP/apps/peram_video/package.json");
const puppeteer = require("puppeteer-core");
const P = "D:/MCP/output/nha_personal_brand", ROOT = `${P}/hf`;
const opt = Object.fromEntries(process.argv.slice(2).map((a) => { const [k, ...v] = a.replace(/^--/, "").split("="); return [k, v.join("=") || true]; }));
const html = opt.html || "index.html", port = +(opt.port || 8990);
const KIT = { // kind -> [file, default gain dB]
  "whoosh": ["work/sfx/whoosh_long.wav", -20], "whoosh-soft": ["work/sfx/whoosh_soft.wav", -22], "pop": ["work/sfx/pop.wav", -26],
  "tick": ["work/sfx/tick.wav", -27], "type": ["work/sfx/type.wav", -32], "riser": ["work/sfx/riser.wav", -22], "shimmer": ["work/sfx/shimmer.wav", -26],
  "impact": ["work/sfx/impact_soft.wav", -21], "bloom": ["work/sfx/bloom_swell.wav", -22],
  "idea": ["work/sfx/idea_ding.wav", -24],
};
const srv = http.createServer((q, r) => {
  const u = decodeURIComponent(q.url.split("?")[0]);
  const f = path.join(ROOT, u === "/" ? html : u);
  fs.readFile(f, (e, b) => { if (e) { r.writeHead(404); r.end(); return; } r.writeHead(200); r.end(b); });
}).listen(port);
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const p = await b.newPage();
await p.goto(`http://localhost:${port}/${html}`, { waitUntil: "load", timeout: 60000 });
const raw = await p.evaluate(() => window.__sfx_cues || null);
await b.close(); srv.close();
if (!raw) { console.error("window.__sfx_cues missing"); process.exit(1); }
const bad = raw.filter((c) => !KIT[c.kind]);
if (bad.length) { console.error("unknown sfx kinds:", JSON.stringify(bad)); process.exit(1); }
const cues = raw.map((c, i) => ({ id: `sfx${String(i + 1).padStart(3, "0")}`, kind: c.kind, file: KIT[c.kind][0], t: c.t,
  gain_db: KIT[c.kind][1] + (c.gain == null ? 0 : c.gain), ref: c.ref || "" })); // scene gain = offset from the kit level (dB)
fs.writeFileSync(`${P}/work/sfx_cues.json`, JSON.stringify({ note: "registered by scene files via sfx(); master clock render/final_vo.wav", cues }, null, 1));
const by = {}; cues.forEach((c) => { by[c.kind] = (by[c.kind] || 0) + 1; });
console.log(`sfx cues: ${cues.length}`, JSON.stringify(by));
