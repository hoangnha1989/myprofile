# -*- coding: utf-8 -*-
"""vo_assemble.py — pick + assemble the master VO (render/final_vo.wav = THE clock) from Qwen3-TTS takes.
Per chunk (work/vo_chunks.json): DFN every take -> whisper -> word-perfect vs the spoken text -> trim trailing garbage ->
clarity harness (hnr/jitter/shimmer/tail) -> pick: fewest harness fails, f0 closest to the whole-set median (one consistent
voice), more emphasis. Chunks of a line join with a 0.32 s breath; lines are separated by GAP.
  CosyVoice venv:  python work/vo_assemble.py"""
import json, os, re, subprocess, sys
import numpy as np, soundfile as sf

P = "D:/MCP/output/nha_personal_brand"
SK = "C:/Users/hoang/.claude/skills/media-business-video/scripts"
sys.path.insert(0, f"{P}/work"); sys.path.insert(0, SK)
from vo_norm import norm
import voice_harness as VH

RULE = VH.RULE
# takes that are word-perfect alone but misheard in the running VO (vo_text_gate) are excluded here
EXCLUDE = set(filter(None, os.environ.get("EXCLUDE", "").split(",")))
PLAN = json.load(open(f"{P}/work/vo_chunks.json", encoding="utf-8"))
WTS = f"{SK}/word_timestamps.py"
JP = "D:/MCP/engine/tools/jp-qa/venv/Scripts/python.exe"
DFN = ["D:/MCP/engine/tools/voice-enhance/venv/Scripts/python.exe", "D:/MCP/sdk/audio/impl/df_enhance.py"]
MASTER = ("highpass=f=85,equalizer=f=250:t=q:w=1.1:g=-1.5,equalizer=f=2600:t=q:w=1.4:g=3,lowpass=f=14000,"
          "loudnorm=I=-18:TP=-1.5:LRA=13")
os.makedirs(f"{P}/voice/takes_dfn", exist_ok=True); os.makedirs(f"{P}/voice/master", exist_ok=True); os.makedirs(f"{P}/work/_w", exist_ok=True)


def dfn(src):
    out = f"{P}/voice/takes_dfn/{os.path.basename(src)}"
    if not os.path.exists(out):
        subprocess.run(DFN + ["--in", src, "--out", out], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return out


def whisper(path):
    out = f"{P}/work/_w/{os.path.basename(path)[:-4]}.json"
    if not os.path.exists(out):
        subprocess.run([JP, WTS, "--audio", path, "--lang", "en", "--out", out], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
                       env={**os.environ, "CUDA_VISIBLE_DEVICES": "", "PYTHONIOENCODING": "utf-8"})
    return json.load(open(out, encoding="utf-8"))["words"]


def wer(ref, hyp):
    a, b = norm(ref), norm(hyp)
    d = list(range(len(b) + 1))
    for i in range(1, len(a) + 1):
        prev, d[0] = d[0], i
        for j in range(1, len(b) + 1):
            prev, d[j] = d[j], min(d[j] + 1, d[j - 1] + 1, prev + (a[i - 1] != b[j - 1]))
    return d[len(b)] / max(1, len(a))


def trim(path, words, text, out):
    """cut at the first silence after the last scripted word, and the leading silence before the first word"""
    y, sr = sf.read(path, dtype="float32")
    if y.ndim > 1: y = y.mean(1)
    n_script = len(norm(text)); cnt = 0; end = words[-1]["end"]
    for w in words:
        cnt += len(norm(w["w"]))
        if cnt >= n_script: end = w["end"]; break
    h = int(0.01 * sr); i = int(max(0.0, end - 0.25) * sr)
    db = lambda a: 20 * np.log10(np.sqrt(np.mean(a.astype(np.float64) ** 2)) + 1e-12)
    while i + 6 * h < len(y) and not all(db(y[i + k * h:i + (k + 1) * h]) < -55 for k in range(6)):
        i += h
    cut = min(len(y), i + int(0.06 * sr))
    j = 0
    while j + h < cut and db(y[j:j + h]) < -50:
        j += h
    j = max(0, j - int(0.04 * sr))
    seg = y[j:cut].copy(); f = int(0.03 * sr); seg[-f:] *= np.linspace(1, 0, f); seg[:int(0.01 * sr)] *= np.linspace(0, 1, int(0.01 * sr))
    sf.write(out, seg, sr, subtype="PCM_16")
    return len(seg) / sr


cands = {}
for ch in PLAN:
    k = ch["chunk"]; cands[k] = []
    for t in range(1, 13):
        raw = f"{P}/voice/takes/{k}_q{t}.wav"
        if not os.path.exists(raw): continue
        try:
            p = dfn(raw); w = whisper(p); heard = " ".join(x["w"] for x in w)
            e = min(wer(ch["say"], heard), wer(ch["say"], " ".join(heard.split()[:len(ch["say"].split())])))
            tp = f"{P}/voice/takes_dfn/_trim_{k}_q{t}.wav"
            d = trim(p, w, ch["say"], tp)
            m = VH.clip_metrics(tp)
        except Exception as ex:
            print(f"{k}_q{t}: skip ({str(ex)[:80]})"); continue
        fails = [f for f, bad in (("hnr", m["hnr"] < RULE["hnr_min"]), ("jitter", m["jitter"] > RULE["jitter_max"]),
                                  ("shimmer", m["shimmer"] > RULE["shimmer_max"]), ("tail", m["tail"] is not None and m["tail"] > RULE["tail_max"])) if bad]
        cands[k].append({"take": f"{k}_q{t}", "trim": tp, "wer": round(e, 3), "fails": fails, "m": m, "dur": round(d, 2), "heard": heard})

ok_f0 = [c["m"]["f0"] for v in cands.values() for c in v if c["wer"] == 0 and c["m"]["f0"]]
F0 = float(np.median(ok_f0)) if ok_f0 else 148.0
report, pick = [], {}
for ch in PLAN:
    k = ch["chunk"]; cs = cands[k]
    ok = [c for c in cs if c["wer"] == 0 and c["take"] not in EXCLUDE]
    if not ok:
        report.append(f"{k}: NO word-perfect take -> " + " | ".join(f"{c['take']} wer {c['wer']} '{c['heard'][:80]}'" for c in cs)); continue
    # male voice: every Qwen3 take measures jitter > 1.8 % (gate calibrated on a female voice), so rank by the f0 band first
    # (one consistent voice), then the remaining hard fails (hnr/shimmer/tail), then a clarity score
    best = min(ok, key=lambda c: (abs(c["m"]["f0"] / F0 - 1) > RULE["band_f0"], len([f for f in c["fails"] if f != "jitter"]),
                                  -c["m"]["hnr"] + 2 * c["m"]["jitter"] + 0.3 * c["m"]["shimmer"] - 0.3 * c["m"]["emph"]))
    pick[k] = best
    m = best["m"]
    report.append(f"{k}: {best['take']} hnr {m['hnr']} jit {m['jitter']} shim {m['shimmer']} tail {m['tail']} f0 {m['f0']} emph {m['emph']} "
                  f"{best['dur']}s harness {'PASS' if not best['fails'] else 'FAIL ' + ','.join(best['fails'])} ({len(ok)}/{len(cs)} word-perfect)")
print(f"set median f0 {F0:.1f}")
print("\n".join(report))
missing = [c["chunk"] for c in PLAN if c["chunk"] not in pick]
json.dump({k: {kk: vv for kk, vv in c.items() if kk != "trim"} for k, c in pick.items()}, open(f"{P}/work/vo_pick.json", "w"), indent=1)
if missing:
    print("MISSING", missing); sys.exit(1)

sr = 48000
for k, c in pick.items():
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", c["trim"], "-af", MASTER, "-ar", str(sr), "-ac", "1", f"{P}/voice/master/{k}.wav"], check=True)
rd = lambda p: sf.read(p, dtype="float32")[0]
LEAD, GAP, BREATH, TAIL = 1.6, 2.6, 0.32, 4.0
lines = []
for ch in PLAN:
    if not lines or lines[-1]["line"] != ch["line"]:
        lines.append({"line": ch["line"], "chunks": []})
    lines[-1]["chunks"].append(ch)
buf, t, meta = [np.zeros(int(LEAD * sr), np.float32)], LEAD, []
for i, ln in enumerate(lines):
    seg = []
    for j, ch in enumerate(ln["chunks"]):
        if j: seg.append(np.zeros(int(BREATH * sr), np.float32))
        seg.append(rd(f"{P}/voice/master/{ch['chunk']}.wav"))
    y = np.concatenate(seg); d = len(y) / sr
    meta.append({"line": ln["line"], "t": round(t, 3), "dur": round(d, 3), "file": "render/final_vo.wav",
                 "takes": [pick[c["chunk"]]["take"] for c in ln["chunks"]], "text": " ".join(c["display"] for c in ln["chunks"])})
    pad = TAIL if i == len(lines) - 1 else GAP
    buf += [y, np.zeros(int(pad * sr), np.float32)]; t += d + pad
vo = np.concatenate(buf)
os.makedirs(f"{P}/render", exist_ok=True)
sf.write(f"{P}/render/final_vo.wav", vo, sr, subtype="PCM_16")
json.dump({"clock": "render/final_vo.wav", "duration": round(len(vo) / sr, 3), "lines": meta}, open(f"{P}/work/vo_meta.json", "w", encoding="utf-8"), indent=1, ensure_ascii=False)
print("final_vo", round(len(vo) / sr, 2), "s")
