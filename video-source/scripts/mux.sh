# mux.sh: picture from the HyperFrames render + the master mix (audio patch = rerun mix.py then this, -c:v copy)
cd /d/MCP/output/nha_personal_brand
OUT=${OUT:-render/NHA_personal_brand_4K.mp4}
ffmpeg -y -v error -i "${VIDEO:-render/video.mp4}" -i render/final_mix.wav -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 320k -ar 48000 \
  -movflags +faststart -metadata title="Thai Tran Hoang Nha | Talent Acquisition & AI Systems" "$OUT" && echo "mux ok -> $OUT"
