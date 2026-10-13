"""build.py — derive EVERYTHING timed from the master clock (render/final_vo.wav):
vo_meta.json + words.json -> scene windows, cue-word times, karaoke captions, hf/index.html (DATA injected),
timeline.json, work/cues.json, NHA_personal_brand_EN.srt. Re-run after ANY VO change (atomic rebase).
DEV_SCENES=s05,s06 OUT_HTML=hf/_dev/x/index.html builds a page with only those scenes."""
import json, re, difflib, os, sys

P = "D:/MCP/output/nha_personal_brand"
E = f"{P}/work/eng"
FPS = 60
meta = json.load(open(f"{P}/work/vo_meta.json", encoding="utf-8"))
words = json.load(open(f"{P}/work/words.json", encoding="utf-8"))["words"]
SB = json.load(open(f"{P}/work/storyboard_v2.4.json", encoding="utf-8"))
CUES = {os.path.basename(f)[:-5]: json.load(open(f, encoding="utf-8")) for f in __import__("glob").glob(f"{E}/cues/s*.json")}
L = meta["lines"]; DUR = meta["duration"]
SID = [f"s{l['line'][1:]}" for l in L]                     # L01 -> s01
DISPLAY = {f"L{s['n']}": s["vo"] for s in SB["scenes"]}
CH = {}
for c in SB["chapters"]:
    for n in c["scenes"]:
        CH[f"s{n}"] = {"k": c["id"], "name": c["name"], "idx": f"{n} / {len(SB['scenes']):02}", "show": n not in ("01", "13")}

nz = lambda w: re.sub(r"[^a-z0-9]", "", w.lower())


def line_words(ln):
    t0, t1 = ln["t"] - 0.3, ln["t"] + ln["dur"] + 0.3
    return [w for w in words if t0 <= w["start"] <= t1]


report, CUE = [], {}
for sid, ln in zip(SID, L):
    lw = line_words(ln)
    CUE[sid] = {}
    for k, spec in CUES.get(sid, {}).items():
        alts, nth = (spec["w"], spec.get("nth", 0)) if isinstance(spec, dict) else (spec, 0)
        hits = [w for w in lw if nz(w["w"]) in alts or any(nz(w["w"]).startswith(a) and len(a) > 3 for a in alts)]
        if len(hits) > nth:
            CUE[sid][k] = round(hits[nth]["start"], 3)
        else:
            sp = DISPLAY[ln["line"]]; idx = sp.lower().find(alts[0].lower())
            CUE[sid][k] = round(ln["t"] + max(0, idx) / max(1, len(sp)) * ln["dur"], 3)
            report.append(f"cue {sid}.{k}: no whisper match for {alts} -> char-fraction {CUE[sid][k]}")

LEAD_IN = float(os.environ.get("SCENE_LEAD", "1.1"))
starts = [0.0] + [round(L[i]["t"] - LEAD_IN, 3) for i in range(1, len(L))]
WIN = {sid: [starts[i], starts[i + 1] if i + 1 < len(L) else DUR] for i, sid in enumerate(SID)}


def tok(s):
    return re.findall(r"\S+", s)


CAPS = []
for ln in L:
    disp = tok(DISPLAY[ln["line"]])
    lw = line_words(ln)
    a = [nz(w) for w in disp]; b = [nz(w["w"]) for w in lw]
    anchors = {}
    for blk in difflib.SequenceMatcher(a=a, b=b, autojunk=False).get_matching_blocks():
        for j in range(blk.size):
            if a[blk.a + j]:
                anchors[blk.a + j] = lw[blk.b + j]["start"]
    t_end = (lw[-1]["end"] if lw else ln["t"] + ln["dur"])
    anchors.setdefault(0, lw[0]["start"] if lw else ln["t"])
    pos = []; c = 0
    for w in disp:
        pos.append(c); c += len(w) + 1
    known = sorted(anchors)
    times = []
    for i in range(len(disp)):
        if i in anchors:
            times.append(anchors[i]); continue
        lo = max([k for k in known if k < i], default=0)
        hi = min([k for k in known if k > i], default=None)
        tl0 = anchors[lo]
        th, ph = (t_end, c) if hi is None else (anchors[hi], pos[hi])
        times.append(tl0 + (th - tl0) * (pos[i] - pos[lo]) / max(1, ph - pos[lo]))
    for i in range(1, len(times)):  # monotone
        times[i] = max(times[i], times[i - 1])
    clauses, cur = [], []
    for i, w in enumerate(disp):
        cur.append(i)
        txt = " ".join(disp[j] for j in cur)
        if (re.search(r"[.?:,!]$", w) and len(txt) >= 22) or i == len(disp) - 1:
            clauses.append(cur); cur = []
    chunks = []
    for cl in clauses:
        n = max(1, -(-len(" ".join(disp[j] for j in cl)) // int(os.environ.get("CAP_MAX", "60"))))
        if n == 1:
            chunks.append(cl); continue
        lens = [len(disp[j]) + 1 for j in cl]; total = sum(lens)
        OPEN = {"with", "and", "or", "to", "of", "through", "at", "in", "on", "for", "but", "as", "into", "from", "who", "which", "that", "so"}
        cuts, prev = [], 0
        for q in range(1, n):
            want = total * q / n
            pos2 = list(range(prev + 1, len(cl)))
            runs = {k: sum(lens[:k]) for k in pos2}
            phr = [k for k in pos2 if re.sub(r"[^a-z]", "", disp[cl[k]].lower()) in OPEN and abs(runs[k] - want) <= total * 0.22]
            k = min(phr or pos2, key=lambda k: abs(runs[k] - want))
            cuts.append(k); prev = k
        bounds = [0] + cuts + [len(cl)]
        chunks += [cl[bounds[q]:bounds[q + 1]] for q in range(len(bounds) - 1)]
    for ch in chunks:
        t0 = times[ch[0]] - 0.08
        last = ch[-1]
        wend = next((w["end"] for w in lw if w["start"] >= times[last] - 0.05), times[last] + 0.4)
        t1 = max(wend, times[last] + 0.25) + 0.25
        CAPS.append({"t0": round(t0, 3), "t1": round(t1, 3), "words": [{"w": disp[j], "t": round(times[j], 3)} for j in ch], "line": ln["line"]})
for i, c in enumerate(CAPS):
    prev = CAPS[i - 1]["t1"] + 0.10 if i else 0.0
    c["t0"] = round(max(c["t0"] - 0.25, min(c["t0"], prev), 0.0), 3)
for i, c in enumerate(CAPS):
    nxt = CAPS[i + 1]["t0"] - 0.10 if i + 1 < len(CAPS) else DUR - 0.2
    want = c["t0"] + max(1.2, len(" ".join(w["w"] for w in c["words"])) / 15.0)
    c["t1"] = round(min(max(c["t1"], min(want, c["t1"] + 1.2)), nxt), 3)
cps_bad = []
for c in CAPS:
    txt = " ".join(w["w"] for w in c["words"]); d = c["t1"] - c["t0"]
    c["cps"] = round(len(txt) / d, 1)
    if c["cps"] > 17 or d < 1.0 or d > 7.0:
        cps_bad.append(f"caption '{txt[:40]}' cps={c['cps']} dur={d:.2f}")

WARP = float(os.environ.get("WARP", "1"))  # global tempo: film plays WARP x faster (voice stretched to match)
DATA = {"warp": WARP, "dur": DUR, "fps": FPS, "win": WIN, "cue": CUE, "caps": CAPS, "chap": CH,
        "words": [{"w": w["w"], "t": round(w["start"], 3), "e": round(w["end"], 3)} for w in words]}
DEV = [s for s in os.environ.get("DEV_SCENES", "").split(",") if s]
OUT_HTML = os.environ.get("OUT_HTML", f"{P}/hf/index.html")
html = open(f"{E}/template.html", encoding="utf-8").read()
css = [f"{E}/plate.css", f"{E}/gold_layer.css"] + [f"{E}/scenes/{s}.css" for s in SID]
html = html.replace("</style>", "\n".join(open(c, encoding="utf-8").read() for c in css if os.path.exists(c)) + "\n</style>", 1)
engine = open(f"{E}/core_head.js", encoding="utf-8").read()
engine += "".join(open(f"{E}/scenes/{s}.js", encoding="utf-8").read() for s in SID
                  if os.path.exists(f"{E}/scenes/{s}.js") and (not DEV or s in DEV))
engine += open(f"{E}/core_tail.js", encoding="utf-8").read()
html = html.replace('<script src="nx.js"></script>', "<script>\n" + open(f"{E}/nx.js", encoding="utf-8").read() + "\n</script>")
html = html.replace("/*__DATA__*/", "window.DATA = " + json.dumps(DATA) + ";").replace("__DUR__", str(round(DUR / WARP, 3))).replace('<script src="engine.js"></script>', "<script>\n" + engine + "\n</script>")
if OUT_HTML != f"{P}/hf/index.html":
    html = html.replace("<head>", '<head>\n<base href="/" />', 1)
os.makedirs(os.path.dirname(OUT_HTML), exist_ok=True)
open(OUT_HTML, "w", encoding="utf-8").write(html)
if OUT_HTML != f"{P}/hf/index.html":
    print(f"dev page: {OUT_HTML} scenes={DEV or SID}")
    sys.exit(0)

segs = []
VW = lambda t: round(t / WARP, 3)  # master-clock time -> time in the delivered (warped) video
for sid, ln in zip(SID, L):
    t0, t1 = VW(WIN[sid][0]), VW(WIN[sid][1])
    segs.append({"id": sid, "t": [t0, t1], "frames": [round(t0 * FPS), round(t1 * FPS) - 1], "vo_line": ln["line"],
                 "source": {"kind": "hyperframes", "composition": "hf/index.html", "scene": sid, "range": [t0, t1]}})
vo = [{"id": ln["line"], "line": ln["line"], "t": VW(ln["t"]), "dur": VW(ln["dur"]), "file": ln["file"] if WARP == 1 else "render/final_vo_fast.wav",
       "gen": {"engine": "Qwen3-TTS clone", "spec": "work/vo_spec.json", "takes": ln.get("takes"), "ref": "voice/design_dfn/_ref_M6.wav"}} for ln in L]
T = {"project": "nha_personal_brand", "version": 1, "fps": FPS, "duration": VW(DUR), "warp": WARP, "clock": meta["clock"],
     "video_segments": segs,
     "audio_tracks": {"vo": vo, "music": [{"id": "bed", "t": 0, "dur": VW(DUR), "file": "render/music_bed.wav", "src": "library/music/Business music/mus_biz_modern_tech_saas.mp3"}],
                      "sfx": (json.load(open(f"{P}/work/sfx_cues.json", encoding="utf-8"))["cues"] if os.path.exists(f"{P}/work/sfx_cues.json") else [])},
     "title_track": {"titles": []},
     "mix": {"master": "render/final_mix.wav", "recipe": "python work/mix.py; remux -c:v copy"},
     "changelog": [{"v": 1, "note": "first build from locked storyboard v2.4"}]}
json.dump(T, open(f"{P}/timeline.json", "w", encoding="utf-8"), indent=1, ensure_ascii=False)
json.dump({"note": "cue-word times on master clock render/final_vo.wav", **{f"{s}.{k}": v for s in CUE for k, v in CUE[s].items()}},
          open(f"{P}/work/cues.json", "w"), indent=1)
# cues.json stays on the master clock (scene work and probes seek unwarped dev pages); cues_video.json = times in the video
json.dump({"note": f"cue-word times in the delivered video (master clock / {WARP})", "warp": WARP, **{f"{s}.{k}": VW(v) for s in CUE for k, v in CUE[s].items()}},
          open(f"{P}/work/cues_video.json", "w"), indent=1)


def ts(t):
    ms = int(round(t * 1000)); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"


with open(f"{P}/NHA_personal_brand_EN.srt", "w", encoding="utf-8") as f:
    for i, c in enumerate(CAPS, 1):
        f.write(f"{i}\n{ts(c['t0'] / WARP)} --> {ts(c['t1'] / WARP)}\n{' '.join(w['w'] for w in c['words'])}\n\n")
for r in report: print("WARN", r)
for r in cps_bad: print("CAP", r)
print(f"built: warp={WARP} video dur={VW(DUR)}s (master {DUR}s) scenes={len(segs)} captions={len(CAPS)}")
print(json.dumps(WIN))
