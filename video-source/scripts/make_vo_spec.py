# -*- coding: utf-8 -*-
"""Locked script (storyboard v2.4) -> sentence chunks -> Qwen3-TTS clone spec (NTAKES takes per chunk).
Chunks keep long scene lines short enough for a stable read; vo_assemble joins them with a short breath."""
import json, os, re, sys

P = "D:/MCP/output/nha_personal_brand"
SB = json.load(open(f"{P}/work/storyboard_v2.4.json", encoding="utf-8"))
NT = int(os.environ.get("NTAKES", "6"))
REF_TEXT = "Fifteen years in talent acquisition taught me that one right hire can change a whole team. Let me share how I find the people who truly fit."

# spoken forms only (display text stays as written)
SAY = [(r"\bCVs\b", "C Vs"), (r"\bCV\b", "C V"), (r"\bCTOs\b", "C T Os"), (r"\bHR\b", "H R"), (r"\bAI\b", "A I"),
       (r"face-to-face", "face to face"), (r"twenty-three-step", "twenty three step")]


def say(t):
    for a, b in SAY:
        t = re.sub(a, b, t)
    return t


def chunks(text, maxw=30):
    sents = re.findall(r"[^.?!]+[.?!]", text)
    out, cur = [], ""
    for s in sents:
        s = s.strip()
        if cur and len((cur + " " + s).split()) > maxw:
            out.append(cur); cur = s
        else:
            cur = (cur + " " + s).strip()
    if cur:
        out.append(cur)
    return out


plan, lines = [], []
for sc in SB["scenes"]:
    L = f"L{sc['n']}"
    for ci, c in enumerate(chunks(sc["vo"])):
        cid = f"{L}c{ci}"
        plan.append({"line": L, "chunk": cid, "display": c, "say": say(c)})
        for k in range(1, NT + 1):
            lines.append({"clip": f"{cid}_q{k}", "voice": "M6", "text": say(c)})
json.dump(plan, open(f"{P}/work/vo_chunks.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
spec = {"out_dir": f"{P}/voice/takes", "language": "English",
        "voices": {"M6": {"ref_audio": f"{P}/voice/design_dfn/_ref_M6.wav", "ref_text": REF_TEXT}},
        "lines": lines}
json.dump(spec, open(f"{P}/work/vo_spec.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(len(plan), "chunks,", len(lines), "takes; max words", max(len(p["display"].split()) for p in plan))
