"""verify_render.py — post-render proof on the delivered mp4 (CosyVoice venv: numpy/scipy/soundfile).
1 frame count == round(duration*fps) · 2 audio/video durations · 3 cross-correlation lag mp4 audio vs render/final_mix.wav
4 loudness (ebur128 I / true peak) · 5 frame probes: render frames at cue words vs the seek-preview stills (SSIM)."""
import json, re, subprocess, sys, os
import numpy as np, soundfile as sf

P = "D:/MCP/output/nha_personal_brand"
MP4 = sys.argv[1] if len(sys.argv) > 1 else f"{P}/render/NHA_personal_brand_4K.mp4"
PREV = sys.argv[2] if len(sys.argv) > 2 else f"{P}/_qa_v3r3"
T = json.load(open(f"{P}/timeline.json", encoding="utf-8")); FPS, DUR = T["fps"], T["duration"]
out, bad = {}, []
pr = lambda *a: subprocess.run(list(a), capture_output=True, text=True)
# 1-2
r = pr("ffprobe", "-v", "error", "-count_frames", "-select_streams", "v:0", "-show_entries", "stream=nb_read_frames,r_frame_rate,width,height,duration", "-of", "json", MP4)
v = json.loads(r.stdout)["streams"][0]; nf = int(v["nb_read_frames"]); exp = round(DUR * FPS)
out["video"] = {"frames": nf, "expected": exp, "fps": v["r_frame_rate"], "size": f'{v["width"]}x{v["height"]}', "dur": float(v["duration"])}
if abs(nf - exp) > 1: bad.append(f"frame count {nf} != {exp}")
a = json.loads(pr("ffprobe", "-v", "error", "-select_streams", "a:0", "-show_entries", "stream=duration,sample_rate,channels,codec_name", "-of", "json", MP4).stdout)["streams"][0]
out["audio"] = a
if abs(float(a["duration"]) - DUR) > 0.05: bad.append(f"audio duration {a['duration']} vs {DUR}")
# 3 xcorr
tmp = f"{P}/render/_mp4_audio.wav"
subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", MP4, "-vn", "-ac", "1", "-ar", "8000", tmp], check=True)
x, _ = sf.read(tmp); ref = f"{P}/render/_mix8k.wav"
subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", f"{P}/render/final_mix.wav", "-ac", "1", "-ar", "8000", ref], check=True)
y, _ = sf.read(ref); n = min(len(x), len(y), 8000 * 40)
X = np.fft.rfft(x[:n], 2 * n); Y = np.fft.rfft(y[:n], 2 * n); cc = np.fft.irfft(X * np.conj(Y)); lag = int(np.argmax(np.abs(cc)))
lag = lag - 2 * n if lag > n else lag
out["xcorr_lag_ms"] = round(lag / 8.0, 3)
if abs(lag) > 8: bad.append(f"av lag {lag / 8.0} ms")
# 4 loudness
e = pr("ffmpeg", "-hide_banner", "-i", MP4, "-vn", "-af", "ebur128=peak=true", "-f", "null", "-").stderr
out["lufs_I"] = float(re.findall(r"I:\s+(-?[\d.]+) LUFS", e)[-1]); out["true_peak"] = float(re.findall(r"Peak:\s+(-?[\d.]+) dBFS", e)[-1])
if abs(out["lufs_I"] + 16) > 1.0 or out["true_peak"] > -1.0: bad.append(f"loudness {out['lufs_I']} LUFS / TP {out['true_peak']}")
# 5 frame probes vs the seek preview (same master-clock times)
# On a white frame SSIM stays high even 0.5 s out of sync (0.91-0.98, measured 2026-10-10), so an absolute floor alone
# cannot see a desync. The test is relative: the render frame at the nominal time must match the preview better than the
# frames 0.2 s before/after it (ties within 0.002 = a still frame, which is fine).
OFF = float(os.environ.get("PROBE_OFFSET", "0"))  # attack switch: shift the render times to prove the gate fails


def ssim_at(t, png):
    fr = f"{P}/render/_probe.png"
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-ss", f"{max(0, t):.3f}", "-i", MP4, "-frames:v", "1", "-vf", "scale=1920:1080:flags=area", fr], check=True)  # 4K master vs 1080p QA stills
    m = re.findall(r"All:([\d.]+)", pr("ffmpeg", "-hide_banner", "-i", fr, "-i", png, "-lavfi", "ssim", "-f", "null", "-").stderr)
    return float(m[-1]) if m else 0.0


probes, offpeak = [], []
for f in sorted(os.listdir(PREV)):
    if not re.match(r"t\d+\.\d+\.png$", f): continue
    t = float(f[1:-4]); png = f"{PREV}/{f}"
    s0, sm, sp = ssim_at(t + OFF, png), ssim_at(t + OFF - 0.2, png), ssim_at(t + OFF + 0.2, png)
    probes.append((t, s0))
    if s0 + 0.002 < max(sm, sp): offpeak.append((t, round(s0, 4), round(max(sm, sp), 4)))
ss = [p[1] for p in probes]
out["probes"] = {"n": len(probes), "ssim_min": round(min(ss), 4), "ssim_median": round(float(np.median(ss)), 4), "worst": sorted(probes, key=lambda p: p[1])[:5],
                 "off_peak": offpeak}
if min(ss) < 0.95: bad.append(f"frame probe ssim min {min(ss):.3f} at {sorted(probes, key=lambda p: p[1])[0][0]}")
if len(offpeak) > 0.1 * len(probes): bad.append(f"{len(offpeak)}/{len(probes)} probes match a neighbouring time better than their own (desync)")
out["pass"] = not bad; out["fails"] = bad
json.dump(out, open(f"{P}/render/verify.json", "w", encoding="utf-8"), indent=1)
print(json.dumps(out, indent=1))
for b in bad: print("FAIL", b)
print("VERIFY", "PASS" if not bad else "FAIL")
sys.exit(1 if bad else 0)
