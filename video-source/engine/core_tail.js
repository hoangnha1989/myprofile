
  /* ===== boundaries: registered OUT transitions, else a crossfade; camera = slow zoom only ===== */
  const entered = new Set(), exited = new Set();
  SCENES.forEach((s, i) => {
    const nxs = SCENES[i + 1];
    if (!nxs || nxs.t0 !== s.t1) return;
    if (OUTS[s.id]) { OUTS[s.id]({ cur: s, next: nxs }); entered.add(nxs.id); exited.add(s.id); }
  });
  SCENES.forEach((s, i) => {
    if (!entered.has(s.id)) tl.fromTo(s.root, { autoAlpha: 0 }, { autoAlpha: 1, duration: i ? 0.45 : 1.2, ease: "power2.out", immediateRender: true, fxNoScale: true }, s.t0);
    if (!exited.has(s.id) && !s.last) tl.fromTo(s.root, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.45, ease: "power2.in", immediateRender: false, fxNoScale: true }, s.t1 - 0.45);
    const K = s.camKeys || [[s.t0, 1], [s.t1, 1.04]];
    gsap.set(s.cam, { scale: K[0][1], force3D: false });
    for (let k = 0; k + 1 < K.length; k++)
      TL.fromTo(s.cam, { scale: K[k][1] }, { scale: K[k + 1][1], duration: K[k + 1][0] - K[k][0], ease: "none", force3D: false, immediateRender: false }, K[k][0]);
  });
  // ambient: two slow glows + a drifting grid for the whole film (never a tween before 0)
  TL.fromTo("#glowA", { x: 0, y: 0 }, { x: 420, y: 160, duration: D.dur, ease: "sine.inOut", immediateRender: false }, 0);
  TL.fromTo("#glowB", { x: 0, y: 0 }, { x: -380, y: -120, duration: D.dur, ease: "sine.inOut", immediateRender: false }, 0);
  TL.fromTo("#grid", { backgroundPosition: "0px 0px" }, { backgroundPosition: "160px 320px", duration: D.dur, ease: "none", immediateRender: false }, 0);
  // progress hairline + chapter marker (hidden in the opening hook and on the end card)
  TL.fromTo("#prog", { scaleX: 0 }, { scaleX: 1, duration: D.dur, ease: "none", immediateRender: true }, 0);
  const chapEl = document.getElementById("chap");
  const [ck, cn, , ci] = chapEl.children;
  TL.set(chapEl, { autoAlpha: 0 }, 0);
  let prevChap = null;
  SCENES.forEach((s, i) => {
    const c = D.chap[s.id];
    if (!c) return;
    if (c.show && !prevChap) TL.to(chapEl, { autoAlpha: 1, duration: 0.6 }, s.t0 + 0.4);
    if (!c.show && prevChap) TL.to(chapEl, { autoAlpha: 0, duration: 0.5 }, s.t0 - 0.2);
    TL.set(ck, { textContent: c.k }, s.t0);
    TL.set(cn, { textContent: c.name }, s.t0);
    TL.set(ci, { textContent: c.idx }, s.t0);
    if (c.show && prevChap && prevChap.k !== c.k) TL.fromTo(chapEl, { autoAlpha: 0.2, x: -14 }, { autoAlpha: 1, x: 0, duration: 0.6, ease: "power3.out", immediateRender: false }, s.t0 + 0.1);
    prevChap = c.show ? c : null;
  });

  /* ===== captions (karaoke, seek-safe sets) ===== */
  const capsBox = document.getElementById("caps");
  D.caps.forEach((cp) => {
    const e = add(capsBox, `<div class="cap"></div>`);
    const spans = cp.words.map((w, i) => { if (i) e.appendChild(document.createTextNode(" ")); const s = document.createElement("span"); s.className = "w"; s.textContent = w.w; e.appendChild(s); return s; });
    TL.fromTo(e, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.2, ease: "power1.out" }, cp.t0);
    TL.to(e, { autoAlpha: 0, duration: 0.09 }, cp.t1);
    cp.words.forEach((w, i) => {  // gold karaoke: the spoken word is orange, then settles to ink
      TL.set(spans[i], { color: "#E06E20" }, w.t);
      const nxt = i + 1 < cp.words.length ? cp.words[i + 1].t : cp.t1;
      TL.set(spans[i], { color: "#1E293B" }, Math.max(w.t + 0.05, nxt));
    });
  });

  // brand mark: in with the film, out with the final fade
  const brand = document.getElementById("brand");
  TL.fromTo(brand, { autoAlpha: 0, y: -8 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out", immediateRender: true }, 0.6);
  TL.to(brand, { autoAlpha: 0, duration: 1.2, ease: "power1.in", immediateRender: false }, D.dur - 1.6);
  TL.set({}, {}, D.dur);
  /* global tempo (user 2026-10-13: "nhanh hơn 20% cả animation, script và video cho khớp"): the whole film is built on the
     voice clock, then played WARP times faster as one unit (DATA.warp; the voice file is time-stretched by the same
     factor), so every tween, caption and SFX keeps its exact relation to the words. */
  const WARP = D.warp || 1;
  window.__sfx_cues = SFX.slice().sort((a, b) => a.t - b.t).map((x) => ({ ...x, t: Math.round((x.t / WARP) * 1000) / 1000 }));
  window.__timelines = window.__timelines || {};
  if (WARP === 1) window.__timelines["nha-personal-brand"] = TL;
  else {
    const M = gsap.timeline({ paused: true });
    TL.paused(false); TL.timeScale(WARP); M.add(TL, 0);
    window.__timelines["nha-personal-brand"] = M;
  }
})();
