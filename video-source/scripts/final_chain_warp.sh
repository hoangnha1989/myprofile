set -e
cd /d/MCP/output/nha_personal_brand
export PYTHONIOENCODING=utf-8
W=1.2
WARP=$W python work/build.py > /dev/null
node work/eng/tools/export_sfx.mjs --port=8992 | tail -1
WARP=$W python work/build.py | grep built
ffmpeg -y -v error -i render/final_vo.wav -af "atempo=$W" -ar 48000 -ac 1 render/final_vo_fast.wav
python -c "import soundfile" 2>/dev/null || true
python work/mix.py | tail -1
python work/make_youtube.py | tail -1
python work/ja/make_srt_ja.py | tail -2
(cd hf && npx --yes hyperframes@0.8.144 lint 2>&1 | tail -1)
cd hf && rm -rf renders/.hf-segments && export FFMPEG_ENCODE_TIMEOUT_MS=43200000 PRODUCER_ENABLE_CHUNKED_ENCODE=true HF_SEGMENTED_CAPTURE=true
npx --yes hyperframes@0.8.144 render --fps 60 --quality delivery --resolution 4k --workers 10 -o ../render/video.mp4 --strict > ../work/render.log 2>&1 || { echo RENDER_FAIL; tail -5 ../work/render.log; exit 1; }
cd .. && bash work/mux.sh
T=$(python - <<'PY'
import json
c=json.load(open("work/cues_video.json")); T=json.load(open("timeline.json"))
B=[s["t"][0] for s in T["video_segments"]][1:]
ts=sorted({round(v+0.5,2) for k,v in c.items() if k not in ("note","warp")})
ts=[t for t in ts if all(abs(t-b)>0.8 for b in B) and t<T["duration"]-0.5]
out=[]
for t in ts:
    if not out or t-out[-1]>=1.0: out.append(t)
print(" ".join(f"{t:.2f}" for t in out))
PY
)
rm -rf _qa_gold && node work/eng/tools/shot.mjs --html=index.html --out=D:/MCP/output/nha_personal_brand/_qa_gold --port=10700 $T > /dev/null 2>&1
/d/MCP/engine/tts/CosyVoice/venv/Scripts/python.exe work/verify_render.py render/NHA_personal_brand_4K.mp4 D:/MCP/output/nha_personal_brand/_qa_gold > work/verify.txt 2>&1 && echo "VERIFY PASS" || echo "VERIFY FAIL"
/d/MCP/engine/tts/CosyVoice/venv/Scripts/python.exe C:/Users/hoang/.claude/skills/media-business-video/scripts/frame_jerk_scan.py render/video.mp4 > work/frame_jerk.json 2>&1
echo CHAIN_DONE
