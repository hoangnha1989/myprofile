"""END-TO-END text gate on the master clock: whisper of render/final_vo.wav (work/words.json) vs the locked script, line by
line inside each vo_meta window. Exit 1 on any extra / missing / replaced word. VO_ALLOW="L02:nha>na;..." for reviewed names."""
import json, sys, difflib, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from vo_norm import norm
P = "D:/MCP/output/nha_personal_brand"
meta = json.load(open(f"{P}/work/vo_meta.json", encoding="utf-8"))
words = json.load(open(f"{P}/work/words.json", encoding="utf-8"))["words"]
script = {f"L{s['n']}": s["vo"] for s in json.load(open(f"{P}/work/storyboard_v2.4.json", encoding="utf-8"))["scenes"]}
allow = set(filter(None, os.environ.get("VO_ALLOW", "").split(";")))
L = meta["lines"]; bad = []
for i, ln in enumerate(L):
    t0 = 0.0 if i == 0 else (L[i - 1]["t"] + L[i - 1]["dur"] + ln["t"]) / 2
    t1 = (ln["t"] + ln["dur"] + L[i + 1]["t"]) / 2 if i + 1 < len(L) else meta["duration"]
    heard = " ".join(w["w"] for w in words if t0 <= w["start"] < t1)
    a, b = norm(script[ln["line"]]), norm(heard)
    ops = [(op, " ".join(a[i1:i2]), " ".join(b[j1:j2])) for op, i1, i2, j1, j2 in difflib.SequenceMatcher(a=a, b=b, autojunk=False).get_opcodes() if op != "equal"]
    ops = [o for o in ops if f"{ln['line']}:{o[1]}>{o[2]}" not in allow]
    print(f"{ln['line']} {'OK  ' if not ops else 'FAIL'} {heard}")
    for o in ops:
        print(f"     {o[0]}: script '{o[1]}' -> heard '{o[2]}'"); bad.append((ln["line"], o))
print(f"\nVO TEXT GATE: {len(L) - len({b[0] for b in bad})}/{len(L)} lines clean")
sys.exit(1 if bad else 0)
