"""Build NHA_personal_brand_JA.srt from the current EN SRT + ja_map.json.

Timings and cue count are copied verbatim from the EN SRT. Every cue text is looked
up (whitespace-normalised) in ja_map.json; any cue without an entry is printed as
MISSING and the script exits 1 without writing the JA SRT. No machine translation.

Usage: python make_srt_ja.py [EN_SRT] [JA_MAP] [OUT_SRT]
"""
import json
import os
import re
import sys
import unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
P = os.path.abspath(os.path.join(HERE, "..", ".."))
EN = sys.argv[1] if len(sys.argv) > 1 else os.path.join(P, "NHA_personal_brand_EN.srt")
MAP = sys.argv[2] if len(sys.argv) > 2 else os.path.join(HERE, "ja_map.json")
OUT = sys.argv[3] if len(sys.argv) > 3 else os.path.join(P, "NHA_personal_brand_JA.srt")
MAX_LINE = 18.0  # full-width chars per subtitle line (half-width counts 0.5)


def norm(s):
    return " ".join(s.split())


def width(line):
    return sum(1.0 if unicodedata.east_asian_width(ch) in "WF" else 0.5 for ch in line)


def parse_srt(path):
    raw = open(path, encoding="utf-8-sig").read().replace("\r\n", "\n").replace("\r", "\n")
    cues = []
    for block in re.split(r"\n\s*\n", raw.strip()):
        lines = block.split("\n")
        if len(lines) < 2 or "-->" not in lines[1]:
            sys.exit(f"ERROR: malformed SRT block in {path}:\n{block}")
        cues.append({"idx": lines[0].strip(), "time": lines[1].strip(), "text": norm(" ".join(lines[2:]))})
    return cues


cues = parse_srt(EN)
ja = {norm(k): v for k, v in json.load(open(MAP, encoding="utf-8")).items()}

missing = [c for c in cues if c["text"] not in ja]
if missing:
    for c in missing:
        print(f"MISSING cue {c['idx']} [{c['time']}]: {c['text']}")
    print(f"{len(missing)} of {len(cues)} cues missing from {MAP}; JA SRT not written.")
    sys.exit(1)

warn = 0
for c in cues:
    tr = ja[c["text"]].strip()
    lines = tr.split("\n")
    if len(lines) > 2:
        print(f"WARN cue {c['idx']}: {len(lines)} lines (max 2): {tr!r}")
        warn += 1
    for ln in lines:
        if width(ln) > MAX_LINE + 1:
            print(f"WARN cue {c['idx']}: line width {width(ln):g} > {MAX_LINE:g}: {ln}")
            warn += 1
    if "—" in tr or "―" in tr:
        print(f"WARN cue {c['idx']}: em dash in {tr!r}")
        warn += 1

with open(OUT, "w", encoding="utf-8") as f:
    for i, c in enumerate(cues, 1):
        f.write(f"{i}\n{c['time']}\n{ja[c['text']].strip()}\n\n")

check = parse_srt(OUT)
assert len(check) == len(cues) and all(a["time"] == b["time"] for a, b in zip(check, cues)), "timing/count mismatch"
unused = sorted(set(ja) - {c["text"] for c in cues})
print(f"wrote {OUT}: {len(cues)} cues, timings identical to {os.path.basename(EN)}; warnings={warn}")
if unused:
    print(f"note: {len(unused)} map entries not used by the current EN SRT (spare/future cues)")
sys.exit(0)
