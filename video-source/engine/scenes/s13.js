  /* ===== S13 CLOSING: the balance (gold design). A level beam carries the AI agent and the person; it tilts and levels on
     "balance". Then two equal gold cards: left "AI handles the volume" (a dot network a scan lights completely, "No one
     missed"); right "I bring the judgment" (a face-to-face interview, three candidates, the right one turns orange).
     Both cards converge into one point that blooms: "Senior people who stay and grow" (rising steps), then the name
     lockup, role line and symbolic contact plates (no address). Hold, then fade out over the final 1.5 s. Last scene. ===== */
  {
    const [t0, t1] = W("s13");
    const S = scene("s13", { last: true, cam: [[t0, 1.0], [t1, 1.035]] });
    const c = S.cam;
    const k = (n) => C("s13", n);
    const tBal = k("balance"), tAI = k("ai"), tVol = k("volume"), tMiss = k("missed"), tJud = k("judgment"), tFace = k("face"),
      tRight = k("right"), tTog = k("together"), tSen = k("senior"), tStay = k("stay"), tGrow = k("grow"), tGlad = k("glad"),
      tTalk = k("talk"), tNext = k("next");
    const R = nx.rng(1313);
    // a container whose children animate in stays hidden (and out of layout checks) until its entrance
    const gate = (el, at) => tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, fxNoScale: true }, at);

    // opaque ambient plate so the incoming iris (s12 OUT) reveals this scene, then dissolves into the shared ambient
    const amb = S.root.insertBefore(h(`<div class="s13-amb"></div>`), S.cam);
    tl.fromTo(amb, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.9, ease: "sine.inOut", immediateRender: false, fxNoScale: true }, t0 + 0.65);
    // the headline of the whole balance section: it stays over the scale and over the two cards until they converge.
    // 0.9 s x 1.3 from t0 + 0.25: risen by about tBal - 0.29, before "balance"
    const hl = add(c, `<div class="hl s13-hl" data-box="s13-hl"><span class="line"><span class="in">The <em>balance</em> I bring</span></span></div>`);
    nx.lineRise(hl.querySelectorAll(".line"), t0 + 0.25, { dur: 0.9 });

    /* ---- "That is the balance I bring": a gold card holding a scale. AI agent and person on one beam over an orange
       pivot; the beam starts tilted and levels on "balance" (damped, settled before the rest beat) ---- */
    const bc = add(c, `<div class="hc s13-bcard" data-box="s13-bcard"></div>`);
    const ful = add(bc, `<div class="s13-ful" data-box="s13-ful" data-allow="s13-beam">
      <svg class="pv" width="240" height="160" viewBox="0 0 240 160" fill="none"><defs>
        <linearGradient id="s13pvg" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0" stop-color="#FFB27A"/><stop offset="0.55" stop-color="#F47E2A"/><stop offset="1" stop-color="#DD6417"/></linearGradient>
        <linearGradient id="s13pbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#E2E8F0"/></linearGradient></defs>
        <path d="M120 12 L186 136 Q188 140 184 140 L56 140 Q52 140 54 136 Z" fill="url(#s13pvg)"/>
        <path d="M120 12 L100 140 L56 140 Q52 140 54 136 Z" fill="#FFFFFF" opacity=".18"/>
        <rect x="20" y="138" width="200" height="18" rx="9" fill="url(#s13pbg)" stroke="#CBD5E1" stroke-width="1.5"/></svg>
      <i class="d"></i><i class="pr"></i></div>`);
    const beam = add(bc, `<div class="s13-beam" data-box="s13-beam" data-allow="s13-ful"><i class="bl"></i></div>`);
    const bL = nx.plate(beam, "ai_agent", 0, 0, "L", { id: "s13-bAI" });
    const bR = nx.plate(beam, "person_bust", 712, 0, "L", { id: "s13-bMe" });
    // the pivot, the beam and the plates arrive with the card, so it never reads as an empty box; they start at t0 + 0.1,
    // so the incoming iris opens onto a card already forming
    nx.blurIn(bc, t0 + 0.1, { blur: 12, dur: 0.7 });
    nx.clip(ful.querySelector(".pv"), t0 + 0.1, { dir: "b", dur: 0.6 });
    nx.pop(ful.querySelector(".d"), t0 + 0.35);
    gate(beam, t0 + 0.09);
    tl.fromTo(beam.querySelector(".bl"), { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "nx.inOut" }, t0 + 0.1);
    nx.settle([bL, bR], t0 + 0.2, { stagger: 0.16, from: 0.6 });
    // 0.6 s x 1.3 = 0.78 s from tBal - 0.3: level by tBal + 0.48, before the rest beat at tBal + 0.6
    tl.fromTo(beam, { rotation: -6 }, { rotation: 0, duration: 0.6, ease: "back.out(1.3)" }, tBal - 0.3);
    sfx("whoosh-soft", tBal - 0.3, -10);
    nx.ping(ful.querySelector(".pr"), tBal + 0.15, { scale: 2.4, dur: 1.2 });
    // the balance card becomes the AI card: the card reshapes to the AI card's frame (0.35 s x 1.3, tAI - 1.1 ..
    // tAI - 0.64, on "every search") while its scale fades late (0.2 s x 1.3, tAI - 0.9 .. tAI - 0.64), so it is still
    // readable while the card reshapes, and the AI content has entered well before "AI". The scale shrinks and shifts with the
    // card (x -220 = the left edge shift, scale 0.6 ~ 680 / 1120), so it stays centred inside the frame and never
    // crosses its edge. At tSwap, the moment the scale is gone, the AI card replaces it on the same pixels and its
    // content starts entering: the frame is never empty and two cards are never stacked
    const tSwap = tAI - 0.64;
    tl.to([ful, beam], { autoAlpha: 0, filter: "blur(8px)", duration: 0.2, ease: "power3.in", immediateRender: false }, tAI - 0.9);
    tl.to([ful, beam], { x: -220, y: 50, scale: 0.6, duration: 0.35, ease: "nx.inOut", immediateRender: false }, tAI - 1.1);
    // snapped so the moving frame stays on the 2 px layout grid
    tl.to(bc, { left: 620, top: 220, width: 680, height: 560, snap: { left: 2, top: 2, width: 2, height: 2 }, duration: 0.35, ease: "nx.inOut", immediateRender: false }, tAI - 1.1);
    tl.to(bc, { autoAlpha: 0, duration: 0.01, immediateRender: false, fxNoScale: true }, tSwap);
    const div = add(c, `<div class="s13-div"></div>`);
    tl.fromTo(div, { scaleY: 0 }, { scaleY: 1, duration: 1.0, ease: "nx.inOut" }, tJud - 0.5);

    /* ---- left card: AI handles the volume, no one missed ---- */
    const cL = add(c, `<div class="hc s13-card l" data-box="s13-cardL">
      <div class="s13-ct hl" data-box="s13-ctl"><span class="line"><span class="in">AI handles the <em>volume</em></span></span></div></div>`);
    const pL = nx.plate(cL, "ai_agent", 40, 36, "S", { id: "s13-pAI" });
    const pts = [];
    while (pts.length < 52) {
      const p = [20 + R() * 560, 18 + R() * 264];
      if (pts.every((q) => Math.hypot(q[0] - p[0], q[1] - p[1]) > 46)) pts.push(p);
    }
    const edges = new Set();
    pts.forEach((p, i) => {
      pts.map((q, j) => [j, Math.hypot(q[0] - p[0], q[1] - p[1])]).filter(([j]) => j !== i).sort((a, b) => a[1] - b[1]).slice(0, 2)
        .forEach(([j]) => edges.add(i < j ? i + "-" + j : j + "-" + i));
    });
    const net = add(cL, `<svg class="s13-net" data-box="s13-net" width="600" height="300" viewBox="0 0 600 300" fill="none">
      <g class="ed" stroke="${P.line2}" stroke-width="1.8">${[...edges].map((e) => { const [a, b] = e.split("-").map(Number); return `<path d="M${pts[a][0].toFixed(1)} ${pts[a][1].toFixed(1)}L${pts[b][0].toFixed(1)} ${pts[b][1].toFixed(1)}"/>`; }).join("")}</g>
      <g class="nd">${pts.map((p) => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="7" stroke="#FFFFFF" stroke-width="2.5" style="fill:#94A3B8"/>`).join("")}</g></svg>`);
    const scan = add(cL, `<i class="s13-scan"></i>`);
    const chL = add(cL, `<div class="s13-chw"><span class="chip acc" data-box="s13-chl">${icon("check", 22, "#FFFFFF", 2.6)}No one missed</span></div>`);
    const dots = [...net.querySelectorAll(".nd circle")];
    gate(cL, tSwap);
    // a quick plate and headline entrance, so the swap shows content within a few frames
    nx.settle(pL, tSwap, { from: 0.6, dur: 0.45 });
    nx.lineRise(cL.querySelectorAll(".s13-ct .line"), tSwap, { dur: 0.7 });
    sfx("shimmer", tSwap, -8);
    // the volume: many candidates appear at once. The dots start with the headline at tSwap, so the card body is
    // never hollow; the random stagger (52 x 0.02 x 1.3 = 1.35 s) runs through "AI handles"
    gate(net, tSwap);
    tl.fromTo(dots, { autoAlpha: 0, scale: 0, transformOrigin: "50% 50%" }, { autoAlpha: 1, scale: 1, duration: 0.4, stagger: { each: 0.02, from: "random" }, ease: "nx.out" }, tSwap);
    nx.draw(net.querySelectorAll(".ed path"), tVol - 0.4, { dur: 0.9, stagger: 0.006 });
    sfx("pop", tVol - 0.4, -10);
    // the scan passes and every dot lights: nobody is skipped
    const tScan = tMiss - 1.1;
    tl.fromTo(scan, { x: 0, autoAlpha: 0 }, { x: 600, autoAlpha: 1, duration: 1.3, ease: "sine.inOut" }, tScan);
    tl.to(scan, { autoAlpha: 0, duration: 0.3, immediateRender: false }, tScan + 1.3);
    dots.forEach((d) => tl.to(d, { fill: P.acc, duration: 0.25, immediateRender: false }, tScan + (parseFloat(d.getAttribute("cx")) / 600) * 1.3));
    gate(chL, tMiss - 0.21);
    nx.clip(chL.querySelector(".chip"), tMiss - 0.2, { dir: "l", dur: 0.6 });
    sfx("tick", tMiss - 0.1);

    /* ---- right card: I bring the judgment, face to face, the right person ---- */
    const cR = add(c, `<div class="hc s13-card r" data-box="s13-cardR">
      <div class="s13-ct hl" data-box="s13-ctr"><span class="line"><span class="in">I bring the <em>judgment</em></span></span></div></div>`);
    const pR = nx.plate(cR, "person_bust", 40, 36, "S", { id: "s13-pMe" });
    const iv = nx.hero(cR, "interview", 248, 144, 184, { id: "s13-iv" });
    const cands = ["cand_woman", "manager", "cand_man"].map((n, i) => nx.plate(cR, n, 176 + i * 120, 360, "S", { id: "s13-cd" + i }));
    // the chosen one: an orange plate that replaces the middle candidate on "right"
    const pick = nx.plate(cR, "manager", 296, 360, "S", { id: "s13-pick", tint: "orange" });
    pick.setAttribute("data-allow", "s13-cd1");
    const ring = add(cR, `<i class="s13-ring"></i>`);
    const chR = add(cR, `<div class="s13-chw"><span class="chip acc" data-box="s13-chr">${icon("user", 22, "#FFFFFF", 2.2)}The right person</span></div>`);
    // the AI card starts alone in the centre, then makes room on the left while the judgment card slides and fades in
    // from the right on the same clock and ease (0.55 s x 1.3, tJud - 0.95 .. tJud - 0.23, from "I bring"), so both
    // land together. With slide progress p the gap between the cards is 280 p - 80 (left card right edge 1300 - 440 p,
    // right card left edge 1220 + 160 (1 - p), right edge at most 1900): the right card stays hidden until p = 0.33
    // (12 px gap, tJud - 0.675) and is past half opacity by p = 0.6, while the left card alone is still within the
    // balance band. The judgment card has no scale, so the two rows match from the first frame (its header plate
    // rides on the card, no separate settle)
    tl.fromTo(cL, { x: 440 }, { x: 0, duration: 0.55, ease: "nx.inOut" }, tJud - 0.95);
    tl.fromTo(cR, { x: 160 }, { x: 0, duration: 0.55, ease: "nx.inOut" }, tJud - 0.95);
    tl.fromTo(cR, { autoAlpha: 0, filter: "blur(12px)" }, { autoAlpha: 1, filter: "blur(0px)", duration: 0.23, ease: "sine.out" }, tJud - 0.675);
    nx.lineRise(cR.querySelectorAll(".s13-ct .line"), tJud - 0.6, { dur: 0.9 });
    sfx("whoosh-soft", tJud - 0.95, -6);
    nx.settle(iv, tJud - 0.3, { from: 0.75, dur: 0.7 });
    sfx("pop", tJud - 0.25, -10);
    // the people met face to face arrive together on "face" (one row, one size at every frame): 0.5 s x 1.3 -> the
    // row is complete by tFace + 0.35
    nx.pop(cands, tFace - 0.3);
    sfx("pop", tFace - 0.3, -12);
    tl.fromTo(pick, { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }, tRight - 0.2);
    tl.to(cands[1], { autoAlpha: 0, duration: 0.3, immediateRender: false }, tRight - 0.15);
    tl.to([cands[0], cands[2]], { autoAlpha: 0.35, duration: 0.5, immediateRender: false }, tRight - 0.15);
    nx.ping(ring, tRight - 0.1, { scale: 1.15, dur: 1.3 });
    gate(chR, tRight + 0.04);
    nx.blurIn(chR.querySelector(".chip"), tRight + 0.05, { blur: 10, dur: 0.7 });
    sfx("tick", tRight);

    /* ---- together: both cards converge into one point ---- */
    const tC = tTog - 0.7;
    // the labels clear first (gone by tC + 0.27), so no text shrinks below the minimum size
    nx.out([chL, chR], tC - 0.15, { dur: 0.2 });
    nx.out([cL.querySelector(".s13-ct"), cR.querySelector(".s13-ct")], tC - 0.05, { dur: 0.25 });
    // the move is the main motion: 0.42 s x 1.3 = 0.55 s, tC + 0.15 .. tC + 0.7. Each card contracts early (power3.out)
    // and flies at full opacity for about 60 % of the travel; it fades over tC + 0.44 .. tC + 0.52, just before the
    // two would touch (about 87 % of the travel, measured), so they read as two tokens converging into the point
    tl.to([cL, cR], { scale: 0.15, duration: 0.55, ease: "sine.inOut", immediateRender: false }, tC + 0.05);
    tl.to(cL, { x: 440, duration: 0.55, ease: "sine.inOut", immediateRender: false }, tC + 0.05);
    tl.to(cR, { x: -440, duration: 0.55, ease: "sine.inOut", immediateRender: false }, tC + 0.05);
    // below about a third of full size the card contents would crowd together: they clear by tC + 0.4 and the gold
    // cards fly on as two clean tokens
    tl.to([...cL.children, ...cR.children], { autoAlpha: 0, duration: 0.07, ease: "power1.in", immediateRender: false }, tC + 0.31);
    tl.to([cL, cR], { autoAlpha: 0, duration: 0.06, ease: "power1.in", immediateRender: false }, tC + 0.44);
    tl.to([hl, div], { autoAlpha: 0, duration: 0.6, immediateRender: false }, tC);
    sfx("whoosh", tC, -4);
    const core = add(c, `<div class="s13-core"><i class="halo"></i><i class="dot"></i><i class="rg r1"></i><i class="rg r2"></i></div>`);
    const dot = core.querySelector(".dot");
    // the point settles while the cards are still arriving, so the frame is never empty
    nx.settle(dot, tC + 0.35, { from: 0.1, dur: 0.6 });
    nx.blurIn(core.querySelector(".halo"), tC + 0.35, { blur: 20, dur: 1.0 });
    sfx("bloom", tC + 0.4);
    // two become one: the AI agent and the person (L plates) join on a beam through the point, at rest through "together"
    const link = c.insertBefore(h(`<i class="s13-link"></i>`), core);
    const mAI = nx.plate(c, "ai_agent", 676, 326, "L", { id: "s13-mAI" });
    const mMe = nx.plate(c, "person_bust", 1076, 326, "L", { id: "s13-mMe" });
    tl.fromTo(mAI, { autoAlpha: 0, x: -180, scale: 0.6 }, { autoAlpha: 1, x: 0, scale: 1, duration: 0.5, ease: "nx.out" }, tC + 0.6);
    tl.fromTo(mMe, { autoAlpha: 0, x: 180, scale: 0.6 }, { autoAlpha: 1, x: 0, scale: 1, duration: 0.5, ease: "nx.out" }, tC + 0.6);
    // the link draws once the plates have (nearly) landed, and is level before they merge at tM
    tl.fromTo(link, { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: "nx.inOut" }, tC + 1.0);
    sfx("pop", tC + 1.05, -10);
    const tog = add(c, `<div class="hl s13-sen" data-box="s13-tog"><span class="line"><span class="in"><em>Together</em></span></span></div>`);
    // the beat leads the word: rising from tTog - 0.24, mostly up when "Together" is spoken
    gate(tog, tC + 0.45);
    nx.lineRise(tog.querySelectorAll(".line"), tC + 0.46, { dur: 0.7 });
    // they merge into the point, which grows into the result: rising steps, senior people who stay and grow
    // 0.3 s x 1.3: the plates have merged into the point by tSen - 0.56, before the stairs grow out of it
    const tM = tSen - 0.95;
    tl.to(mAI, { x: 200, scale: 0.4, autoAlpha: 0, duration: 0.3, ease: "power2.in", immediateRender: false }, tM);
    tl.to(mMe, { x: -200, scale: 0.4, autoAlpha: 0, duration: 0.3, ease: "power2.in", immediateRender: false }, tM);
    tl.to(link, { autoAlpha: 0, duration: 0.3, immediateRender: false }, tM);
    // "Together" stays until the stairs are well formed: out over tSen - 0.6 .. tSen - 0.28, before the next headline
    // rises on the same line at tSen - 0.25, so a readable element is on screen through the whole merge
    nx.out(tog, tSen - 0.6, { dur: 0.25, y: -16 });
    const grow = nx.hero(c, "rising_steps", 850, 300, 220, { id: "s13-grow" });
    tl.to(dot, { scale: 3, autoAlpha: 0, duration: 0.45, ease: "power2.in", immediateRender: false }, tSen - 0.7);
    nx.settle(grow, tSen - 0.55, { from: 0.5, dur: 0.8 });
    const rg = core.querySelectorAll(".rg");
    nx.ping(rg[0], tStay - 0.1, { scale: 1.8, dur: 1.6 });
    // 0.95 s x 1.3: the ring has faded out before the name lockup starts
    nx.ping(rg[1], tGrow - 0.05, { scale: 2.0, dur: 0.95 });
    const sen = add(c, `<div class="hl s13-sen" data-box="s13-sen"><span class="line"><span class="in">Senior people who <em>stay and grow</em></span></span></div>`);
    gate(sen, tSen - 0.26);
    nx.lineRise(sen.querySelectorAll(".line"), tSen - 0.25, { dur: 0.9 });
    nx.float(grow, tSen + 0.6, tGlad - 1.1, { amp: 6, per: 3.2 });

    /* ---- the name lockup: lands on "I would be glad" (the name is shown, never spoken) ---- */
    const tN = tGlad - 0.45;
    // 0.4 s x 1.3 = 0.52 s from tN - 0.65: headline and stairs are gone by tN - 0.13, before the first letter
    tl.to([sen, grow], { autoAlpha: 0, y: -20, filter: "blur(8px)", duration: 0.4, ease: "power2.in", immediateRender: false }, tN - 0.65);
    tl.to(core.querySelector(".halo"), { scale: 1.9, autoAlpha: 0.7, duration: 1.6, ease: "nx.out", immediateRender: false }, tN);
    sfx("impact", tN + 0.05, -6);
    const name = add(c, `<div class="hl s13-name" data-box="s13-name">Thai Tran Hoang Nha</div>`);
    gate(name, tN - 0.01);
    // 0.5 s x 1.3 + 15 x 0.015 x 1.3 = 0.94 s: every letter is crisp by tGlad + 0.49, before the rest beat
    nx.chars(name, tN, { stagger: 0.015, dur: 0.5, y: 30 });
    const rule = add(c, `<div class="s13-rule"></div>`);
    // hidden until its own tween (scaleX 0 alone still leaves a dot); level by tGlad + 0.45
    tl.fromTo(rule, { scaleX: 0, autoAlpha: 0 }, { scaleX: 1, autoAlpha: 1, duration: 0.5, ease: "nx.inOut" }, tN + 0.25);
    const role = add(c, `<div class="s13-role" data-box="s13-role"><span>Talent Acquisition &amp; AI Systems</span></div>`);
    gate(role, tN + 0.34);
    nx.clip(role.querySelector("span"), tN + 0.35, { dir: "l", dur: 0.5 });
    // symbolic contact channels (no address): mail and network, part of the lockup on "glad".
    // (0.38 + 0.08) s x 1.3 = 0.6 s from tN + 0.4: both plates are full size by tGlad + 0.55, before the rest beat
    const ctc = add(c, `<div class="s13-ctc" data-box="s13-contact"><i class="pr p0"></i><i class="pr p1"></i></div>`);
    const cps = [nx.plate(ctc, "envelope", 0, 0, "S", { id: "s13-mail" }), nx.plate(ctc, "network_nodes", 128, 0, "S", { id: "s13-net2" })];
    gate(ctc, tN + 0.39);
    nx.pop(cps, tN + 0.4, { stagger: 0.08, dur: 0.38 });
    sfx("pop", tN + 0.45, -8);
    ctc.querySelectorAll(".pr").forEach((pr, i) => nx.ping(pr, tTalk + 0.1 + i * 0.15, { scale: 1.5, dur: 1.3 }));

    /* ---- hold, then fade out over the final 1.5 s: onto WHITE paper, not black (deliberate: the user's light palette,
       BRIEF_LIGHT.md, replaces the storyboard's dark-theme "fade-to-black") ---- */
    const black = add(TRANS, `<div class="s13-end"></div>`);
    gsap.set(black, { autoAlpha: 0 });
    tl.to(S.root, { autoAlpha: 0, duration: 1.5, ease: "power1.inOut", immediateRender: false, fxNoScale: true }, t1 - 1.5);
    tl.fromTo(black, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.5, ease: "power1.inOut", immediateRender: false, fxNoScale: true }, t1 - 1.5);
    tl.to("#prog", { autoAlpha: 0, duration: 1.2, ease: "power1.in", immediateRender: false, fxNoScale: true }, t1 - 1.5);
  }
