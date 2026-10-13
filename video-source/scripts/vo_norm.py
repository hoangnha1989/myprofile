"""Shared text normaliser for whisper-vs-script checks (vo_assemble.py, vo_text_gate.py)."""
import re

NUM = {"2000": "two thousand", "1942": "one thousand nine hundred forty two", "194": "one hundred ninety four", "190": "one hundred ninety", "800": "eight hundred", "5000": "five thousand", "10": "ten", "11": "eleven", "160": "one hundred sixty", "150": "one hundred fifty", "59": "fifty nine", "21": "twenty one",
       "23": "twenty three", "30": "thirty", "20": "twenty", "40": "forty", "15": "fifteen", "24": "twenty four",
       "1": "one", "2": "two", "5": "five", "7": "seven", "8": "eight", "%": " percent"}
PH = [(r"\btime sheets\b", "timesheets"), (r"\bu\s+s\b", "us"), (r"\bc\s*v\s*s\b|\bcvs\b", "c v s"), (r"\bc\s*v\b|\bcv\b", "c v"), (r"\bc\s*t\s*os\b|\bctos\b", "c t os"),
      (r"\bh\s*r\b|\bhr\b", "h r"), (r"\ba\s*i\b|\bai\b", "a i"), (r"\bninety four\b", "ninety four"),
      (r"\bface to face\b", "face to face"), (r"\bone hundred and\b", "one hundred"), (r"\btwo thousand\b", "two thousand"),
      (r"\bthai\b|\btie\b|\btai\b", "thai"), (r"\bnha\b|\bnya\b|\bnyah\b|\bna\b|\bnah\b", "nha"),
      (r"\bhoang\b|\bhwang\b|\bhuang\b|\bwang\b|\bhoan\b", "hoang"), (r"\btran\b|\bchan\b|\bchun\b|\btrang\b", "tran")]


def norm(t):
    t = re.sub(r"(\d)\s*,\s*(\d{3})", r"\1\2", t)
    t = t.lower().replace("-", " ").replace("%", " percent").replace(",", " ")
    t = re.sub(r"[^a-z0-9 ]", " ", t)
    t = re.sub(r"\s+", " ", t).strip()
    out = []
    for w in t.split():
        out += NUM.get(w, w).split()
    t = " ".join(out)
    for a, b in PH:
        t = re.sub(a, b, t)
    return t.split()
