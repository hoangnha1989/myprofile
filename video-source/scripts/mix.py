"""mix.py — music bed (ducked under the VO) + SFX from timeline.json -> render/final_mix.wav (-16 LUFS / -1.5 dBTP).
Bed = mus_biz_premium_cinematic (catalog: "Hồ sơ năng lực / tầm nhìn — sang, điềm"; whisper-clean; dyn 4.1 dB). It is
300 s, the film is longer: the bed is extended by a 6 s equal-power crossfade into a second pass from LOOP_FROM s."""
import json, os, subprocess, wave
import numpy as np

P = "D:/MCP/output/nha_personal_brand"
T = json.load(open(f"{P}/timeline.json", encoding="utf-8"))
DUR = T["duration"]
BED = os.environ.get("BED", "D:/MCP/library/music/Business music/mus_biz_modern_tech_saas.mp3")
LOOP_FROM = float(os.environ.get("LOOP_FROM", "40"))
run = lambda a: subprocess.run(["ffmpeg", "-y", "-v", "error"] + a, check=True)
blen = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", BED], capture_output=True, text=True, check=True).stdout)
if blen < DUR + 1:
    run(["-i", BED, "-ss", str(LOOP_FROM), "-i", BED, "-filter_complex",
         "[0:a]atrim=0:%.3f[a];[1:a]asetpts=PTS-STARTPTS[b];[a][b]acrossfade=d=6:c1=qsin:c2=qsin[o]" % (blen - 8), "-map", "[o]",
         "-ar", "48000", "-ac", "2", f"{P}/render/_bed_ext.wav"])
    src = f"{P}/render/_bed_ext.wav"
else:
    src = BED
run(["-i", src, "-af", f"atrim=0:{DUR},asetpts=N/SR/TB,afade=t=in:st=0:d=2.0,afade=t=out:st={DUR-5}:d=5,loudnorm=I=-26:TP=-6:LRA=5",
     "-ar", "48000", "-ac", "1", f"{P}/render/music_bed.wav"])
SFX = [(f"{P}/{c['file']}", c["t"], c["gain_db"]) for c in T["audio_tracks"].get("sfx", [])]
N = int(round(DUR * 48000)); acc = np.zeros(N)
for f, t, g in SFX:
    with wave.open(f) as w:
        assert w.getframerate() == 48000 and w.getnchannels() == 1, f
        x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16) / 32768.0
    s0 = max(0, int(round(t * 48000))); x = x[: max(0, N - s0)]
    acc[s0:s0 + len(x)] += x * 10 ** (g / 20)
print(f"sfx events {len(SFX)}; stem peak {20 * np.log10(max(1e-9, np.abs(acc).max())):.1f} dBFS")
with wave.open(f"{P}/render/sfx.wav", "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(48000)
    w.writeframes((np.clip(acc, -1, 1) * 32767).astype(np.int16).tobytes())
run(["-i", f"{P}/render/final_vo.wav" if T.get("warp", 1) == 1 else f"{P}/render/final_vo_fast.wav", "-i", f"{P}/render/music_bed.wav", "-i", f"{P}/render/sfx.wav", "-filter_complex",
     "[0:a]asplit=2[vo_mix][vo_key];"
     "[1:a][vo_key]sidechaincompress=threshold=0.02:ratio=8:attack=15:release=450:makeup=1[duck];"
     "[vo_mix][duck][2:a]amix=inputs=3:duration=first:dropout_transition=0:normalize=0[mixed];"
     "[mixed]loudnorm=I=-16:TP=-1.5:LRA=11[out]",
     "-map", "[out]", "-ar", "48000", "-ac", "2", f"{P}/render/final_mix.wav"])
print("final_mix ok")
