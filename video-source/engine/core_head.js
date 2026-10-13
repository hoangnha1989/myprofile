/* Personal-brand film engine — ONE deterministic GSAP timeline. All times come from window.DATA (build.py, master clock
   render/final_vo.wav): DATA.win[sid] = [t0,t1] · DATA.cue[sid][key] = word time · DATA.words = whisper words {w,t,e} ·
   DATA.caps = captions · DATA.chap = chapter per scene. Scene files (work/eng/scenes/sNN.js) are concatenated between this
   head and core_tail.js inside ONE closure. */
(function () {
  const D = window.DATA;
  const TL = gsap.timeline({ paused: true });
  /* gold-standard pacing: entrance/accent/exit tweens of 0.02-2.5 s run 1.3x longer (staggers too); start times stay on
     their VO words. Loops, camera and transitions keep their own lengths (> 2.5 s, or flagged fxNoScale). */
  const SLOW = 1.3;
  const scl = (v) => {
    if (!v) return v;
    if (v.fxNoScale) { const o = { ...v }; delete o.fxNoScale; return o; }
    const d = v.duration == null ? 0.5 : v.duration;
    if (!(d > 0.02 && d <= 2.5)) return v;
    const o = { ...v, duration: d * SLOW };
    if (typeof o.stagger === "number") o.stagger *= SLOW;
    return o;
  };
  const tl = { fromTo: (t, a, b, p) => TL.fromTo(t, a, scl(b), p), to: (t, v, p) => TL.to(t, scl(v), p), set: (t, v, p) => TL.set(t, v, p) };
  const stage = document.getElementById("stage");
  const XFER = document.getElementById("xfer");
  const TRANS = document.getElementById("trans");
  const nx = window.makeNX(tl, { slow: SLOW });
  const W = (s) => D.win[s];
  const C = (s, k) => {
    const v = D.cue[s] && D.cue[s][k];
    if (typeof v !== "number") throw new Error("missing cue " + s + "." + k);
    return v;
  };
  const nzw = (w) => String(w).toLowerCase().replace(/[^a-z0-9]/g, "");
  // WT("judgment", 3) = start of the first whisper word "judgment" at or after 3 s
  const WT = (word, after = 0) => {
    const k = nzw(word), hit = D.words.find((x) => x.t >= after - 1e-6 && (nzw(x.w) === k || (k.length > 3 && nzw(x.w).startsWith(k))));
    if (!hit) throw new Error("missing word " + word + " after " + after);
    return hit.t;
  };
  const add = nx.add, h = nx.h, icon = nx.icon, P = nx.C;
  const SFX = [];
  // sfx(kind, t, gainDb): gainDb is an OFFSET from the kit level in tools/export_sfx.mjs (0 = kit level, -8 = 8 dB quieter)
  const sfx = (kind, t, gain) => { SFX.push({ kind, t: Math.round(t * 1000) / 1000, gain: gain == null ? null : gain }); };
  const SCENES = [], OUTS = {};
  /* scene(id, {cam: [[t, scale], ...], last}) -> {id, root, cam, t0, t1} */
  function scene(id, opts = {}) {
    const [t0, t1] = W(id);
    const root = add(stage, `<div class="scene" id="${id}"></div>`);
    const cam = add(root, `<div class="cam"></div>`);
    const s = { id, root, cam, t0, t1, last: !!opts.last, camKeys: opts.cam || null };
    SCENES.push(s);
    return s;
  }
  const out = (sid, fn) => { OUTS[sid] = fn; };
