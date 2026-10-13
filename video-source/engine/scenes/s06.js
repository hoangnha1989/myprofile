  /* ===== S06 MY OWN METHOD : "My 23-step recruitment workflow". Hero FX: a blueprint of 23 numbered nodes in four
     stages (Define · Search · Assess · Follow-up) drawn along one path as "I built a method of my own" is said; the headline counts 01 -> 23 inside "twenty-three"; below it a row
     of six even cards, each one arriving WITH its clay plate on its word (no empty slots): checklists / metrics /
     milestone reports light at every milestone, then the offer, the follow-up through probation (the pulse runs the
     follow-up stage to a tick on node 23) and "stays and grows" (a line rises off the end of the track).
     Gold design: clay plates, gradient-edge cards, SG uppercase headline. Exit: split doors (local, T_doors shape). ===== */
  {
    const [t0, t1] = W("s06");
    const S = scene("s06", { cam: [[t0, 1.0], [t1, 1.035]] });
    const c = S.cam;
    const tRep = C("s06", "repeatable"), tMeth = C("s06", "method"), tOwn = C("s06", "own"), tSteps = C("s06", "steps"),
      tChk = C("s06", "checklists"), tMet = C("s06", "metrics"), tRep2 = C("s06", "report"), tMile = C("s06", "milestone"),
      tOffer = C("s06", "offer"), tFol = C("s06", "follow"), tProb = C("s06", "probation"),
      tSucc = C("s06", "succeeds"), tStay = C("s06", "stays"), tBuilt = C("s06", "built"), tWork = C("s06", "workflow");

    // headline + blueprint share one group that sits centred in the frame (y +196) while it is alone, and lifts to the
    // top zone during "recruitment workflow", before the card row arrives on "checklists"
    const grp = add(c, `<div class="s06-grp"></div>`);
    const GY = 196;
    tl.fromTo(grp, { y: GY }, { y: 0, duration: 0.6, ease: "nx.inOut", fxNoScale: true }, tWork - 0.16);
    // headline A on "repeatable"; eyebrow on "method"; headline B "MY 23-STEP RECRUITMENT WORKFLOW" replaces A on
    // "twenty-three" and counts 01 -> 23 inside the word (no unspoken number is ever held on screen)
    const hlA = add(grp, `<div class="hl s06-hl" data-box="s06-hlA"><span class="line">To make this <em>repeatable</em></span></div>`);
    const inA = nx.lineRise(hlA.querySelectorAll(".line"), tRep - 0.4, { dur: 0.45 });
    const eb = add(grp, `<div class="eyebrow s06-eb" data-box="s06-eb">A method of my own</div>`);
    nx.clip(eb, tMeth - 0.5, { dir: "l", dur: 0.45 });
    const tSw = tSteps - 0.1;
    tl.to(inA, { yPercent: -110, duration: 0.09, ease: "power2.in", immediateRender: false, fxNoScale: true }, tSw - 0.09);
    tl.set(hlA, { autoAlpha: 0 }, tSw);
    const hl = add(grp, `<div class="hl s06-hl" data-box="s06-hl"><span class="line">My <em><span class="n23">01</span>-step</em> recruitment workflow</span></div>`);
    tl.fromTo(hl, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, fxNoScale: true }, tSw);
    nx.lineRise(hl.querySelectorAll(".line"), tSw, { dur: 0.4 });

    // blueprint card (local coordinates, 1680 x 214): stage labels above the track, numbers below
    const bp = add(grp, `<div class="hc s06-bp" data-box="s06-bp"><div class="grid"></div>
      <i class="cn a"></i><i class="cn b"></i><i class="cn c"></i><i class="cn d"></i></div>`);
    nx.clip(bp, t0 + 0.2, { dir: "t", dur: 0.9 });
    tl.fromTo(bp.querySelector(".grid"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2, ease: "sine.inOut" }, t0 + 0.9);

    const STAGES = [["01", "Define", 5], ["02", "Search", 6], ["03", "Assess", 7], ["04", "Follow-up", 5]];
    const PY = 124, GAP = 58, SGAP = 52, X0 = 124; // stage gap = GAP + SGAP; track centred in the card
    const xs = [], stageOf = [];
    let x = X0;
    STAGES.forEach(([, , n], si) => { for (let k = 0; k < n; k++) { xs.push(x); stageOf.push(si); x += GAP; } x += SGAP; });
    const XN = xs[xs.length - 1];
    const svg = add(bp, `<svg class="s06-svg" width="1680" height="214" viewBox="0 0 1680 214">
      <path class="track" d="M${X0} ${PY}H${XN}" /><path class="run" d="M${X0} ${PY}H${XN}" />
      <path class="grow" d="M${XN} ${PY} C ${XN + 30} ${PY - 6}, ${XN + 36} ${PY - 50}, ${XN + 56} ${PY - 64}" />
    </svg>`);
    tl.fromTo(svg.querySelector(".track"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.4, ease: "nx.inOut" }, t0 + 1.2);

    // stage labels + brackets: the repeatable frame appears first, on "repeatable"
    const stEls = STAGES.map(([no, nm], si) => {
      const ids = stageOf.map((s, i) => (s === si ? i : -1)).filter((i) => i >= 0);
      const a = xs[ids[0]], b = xs[ids[ids.length - 1]];
      return add(bp, `<div class="s06-st" data-box="s06-st${si}" style="left:${a - 14}px;top:${PY - 90}px;width:${b - a + 28}px"><span class="lbl"><b>${no}</b>${nm}</span><i class="br"></i></div>`);
    });
    nx.clip(stEls, tRep - 0.7, { dir: "l", dur: 0.5, stagger: 0.12 });
    sfx("whoosh-soft", tRep - 0.7);

    // 23 nodes: the path and its nodes are built on "I built a method of my own"; the step numbers 01..23 ripple in
    // under them with the headline count, inside the spoken "twenty-three" (one unscaled clock for both)
    const MS = [4, 10, 17, 22];
    const nodes = xs.map((nxp, i) => add(bp, `<div class="s06-nd${MS.includes(i) ? " ms" : ""}" style="left:${nxp - 13}px;top:${PY - 13}px"><i class="core"></i></div>`));
    const nums = xs.map((nxp, i) => add(bp, `<div class="s06-no num" style="left:${nxp - 20}px;top:${PY + 30}px">${String(i + 1).padStart(2, "0")}</div>`));
    const tD = tBuilt - 0.1, DD = Math.max(1.0, tOwn + 0.25 - tD);
    tl.fromTo(svg.querySelector(".run"), { drawSVG: "0%" }, { drawSVG: "100%", duration: DD, ease: "none", fxNoScale: true }, tD);
    tl.fromTo(nodes, { autoAlpha: 0, scale: 0.3 }, { autoAlpha: 1, scale: 1, duration: 0.35, stagger: DD / 22, ease: "back.out(2.4)", fxNoScale: true }, tD - 0.12);
    for (let k = 0; k < 6; k++) sfx("tick", tD + k * DD / 5, -8);
    const CD = 0.4; // count + numbers: 01 -> 23 from tSw, settled before "twenty-three" ends
    tl.fromTo(nums, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.22, stagger: CD / 22, ease: "nx.out", fxNoScale: true }, tSw);
    const n23 = hl.querySelector(".n23");
    const fmt2 = (v) => String(Math.round(v)).padStart(2, "0"); // always two tabular digits: no gap, no width jump
    tl.fromTo(n23, { nxCount: { from: 1, to: 1, fmt: fmt2 } }, { nxCount: { from: 1, to: 23, fmt: fmt2 }, duration: CD, ease: "none", immediateRender: false, fxNoScale: true }, tSw);

    // bottom row: six equal cards (252 wide, 32 px gap, group centred on x=960), each enters with its plate on its word
    const CW = 252, CG = 32, CL = 960 - (6 * CW + 5 * CG) / 2;
    const ITEMS = [
      ["checklist", "Checklists", tChk], ["report_chart", "Metrics", tMet], ["milestone_report", "Milestone reports", tRep2],
      ["handshake", "Offer", tOffer], ["shield_check", "Follow-up<br>through probation", tFol], ["rising_steps", "Stays and grows", tStay],
    ];
    const cards = [], plates = [], labels = [];
    ITEMS.forEach(([ic, txt, t], k) => {
      const card = add(c, `<div class="hc s06-card" data-box="s06-c${k}" style="left:${CL + k * (CW + CG)}px"></div>`);
      const p = nx.plate(card, ic, CW / 2 - 64, 40, "M", { id: `s06-p${k}`, tint: k === 5 ? "orange" : "blue" });
      const lb = add(card, `<div class="s06-pl${k === 5 ? " acc" : ""}" data-box="s06-l${k}">${txt}</div>`);
      nx.slide(card, t - (k === 3 ? 0.62 : 0.45), { x: 0, y: 24, dur: 0.6 }); // the card and its plate arrive together (the offer card opens on "stop")
      cards.push(card); plates.push(p); labels.push(lb);
    });
    // plate entrances vary by meaning: the toolkit rises in place, the offer pops, the follow-up settles, growth settles larger
    [0, 1, 2].forEach((k) => { nx.slide(plates[k], ITEMS[k][2] - 0.4, { x: 0, y: 22, dur: 0.5 }); nx.clip(labels[k], ITEMS[k][2] - 0.15, { dir: "l", dur: 0.5 }); sfx("pop", ITEMS[k][2] - 0.25, -4); });
    nx.pop(plates[3], tOffer - 0.62, { dur: 0.42 }); // pops with its card on "stop", settled (no overshoot left) by offer +0.6
    nx.clip(labels[3], tOffer - 0.5, { dir: "l", dur: 0.35 });
    sfx("pop", tOffer - 0.5, -4);
    nx.settle(plates[4], tFol - 0.42, { from: 0.7, dur: 0.55 });
    nx.clip(labels[4], tFol - 0.15, { dir: "l", dur: 0.5 });
    nx.settle(plates[5], tStay - 0.42, { from: 0.6, dur: 0.6 });
    nx.blurIn(labels[5], tStay - 0.3, { blur: 10, dur: 0.6 });

    // every milestone lights: the four stage-end nodes turn blue with a ping, the toolkit plates ping with them
    const ms = nodes.filter((n) => n.classList.contains("ms"));
    tl.to(ms.map((m) => m.querySelector(".core")), { backgroundColor: P.acc, borderColor: P.acc3, boxShadow: "0 0 0 5px rgba(37,161,219,.16)", scale: 1.25, duration: 0.4, stagger: 0.12, ease: "back.out(2)", immediateRender: false }, tMile - 0.2);
    // pings are short and tight: every ring is gone before the rest beat (word +0.6 s)
    const msR = ms.map((m, k) => { const r = add(m, `<i class="ring"></i>`); nx.ping(r, tMile - 0.35 + k * 0.06, { scale: 2.4, dur: 0.55 }); return r; });
    plates.slice(0, 3).forEach((p, k) => { const r = add(p, `<i class="s06-ring"></i>`); nx.ping(r, tMile - 0.35 + k * 0.06, { scale: 1.1, dur: 0.5 }); });
    sfx("shimmer", tMile - 0.1);

    // the pulse walks the method from step 01 and reaches the offer milestone (step 18) as "offer" is said,
    // then (it does not stop at the offer) runs the follow-up stage in orange to the probation tick
    const xo = xs[17];
    nx.ping(msR[2], tOffer - 0.15, { scale: 2.4, dur: 0.5 });
    const pulse = add(bp, `<i class="s06-pulse" style="left:${xo - 9}px;top:${PY - 9}px"></i>`);
    const tP0 = tFol - 0.2, tP1 = tProb - 0.25;
    const tA0 = tMile + 0.55, tA1 = tOffer - 0.1;
    tl.fromTo(pulse, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, ease: "none", fxNoScale: true }, tA0 - 0.2);
    tl.fromTo(pulse, { x: xs[0] - xo }, { x: 0, duration: tA1 - tA0, ease: "sine.inOut", fxNoScale: true }, tA0);
    tl.to(pulse, { backgroundColor: P.acc2, boxShadow: "0 0 0 5px rgba(224,110,32,.18), 0 2px 8px rgba(224,110,32,.35)", duration: 0.06, immediateRender: false, fxNoScale: true }, tP0 - 0.3);
    tl.to(pulse, { x: XN - xo, duration: tP1 - tP0, ease: "sine.inOut", immediateRender: false, fxNoScale: true }, tP0);
    tl.to(pulse, { autoAlpha: 0, duration: 0.2, immediateRender: false, fxNoScale: true }, tP1);
    for (let i = 18; i < 22; i++) {
      // time the pulse passes node i (invert the sine.inOut ease)
      const p = (xs[i] - xo) / (XN - xo);
      const u = Math.acos(1 - 2 * p) / Math.PI;
      tl.to(nodes[i].querySelector(".core"), { backgroundColor: P.acc2, borderColor: P.acc2, duration: 0.25, immediateRender: false, fxNoScale: true }, tP0 + u * (tP1 - tP0) - 0.05);
      tl.to(nums[i], { color: P.acc2, duration: 0.25, immediateRender: false, fxNoScale: true }, tP0 + u * (tP1 - tP0) - 0.05);
    }
    sfx("riser", tP0, -6);

    // probation: node 23 becomes a tick badge; its number stays on the baseline (the badge is sized to clear it)
    const prob = add(bp, `<div class="s06-pb" data-box="s06-pb" style="left:${XN - 22}px;top:${PY - 22}px">${icon("check", 22, "#FFFFFF", 2.6)}<i class="ring"></i></div>`);
    nx.pop(prob, tProb - 0.25, { dur: 0.55 });
    tl.to(nodes[22], { autoAlpha: 0, duration: 0.15, immediateRender: false }, tProb - 0.25);
    tl.to(nums[22], { color: P.acc2, duration: 0.3, ease: "nx.out", immediateRender: false }, tProb - 0.25);
    nx.ping(prob.querySelector(".ring"), tProb - 0.15, { scale: 2.0, dur: 0.65 });
    nx.ping(prob.querySelector(".ring"), tSucc - 0.2, { scale: 2.0, dur: 0.65 });
    const shr = add(plates[4], `<i class="s06-ring"></i>`);
    nx.ping(shr, tProb - 0.15, { scale: 1.1, dur: 0.5 });
    sfx("bloom", tProb - 0.1);

    // a hire succeeds when the person stays and grows: the line rises off the end of the track as the last card lands
    nx.draw(svg.querySelector(".grow"), tStay - 0.35, { dur: 1.1, ease: "nx.out" });
    const tip = add(bp, `<i class="s06-tip" style="left:${XN + 56 - 7}px;top:${PY - 64 - 7}px"></i>`);
    nx.pop(tip, tStay + 0.6);
    nx.float(tip, tStay + 1.0, t1, { amp: -5, per: 2.4 });
    const grr = add(plates[5], `<i class="s06-ring o"></i>`);
    nx.ping(grr, tStay - 0.1, { scale: 1.1, dur: 0.5 });
    sfx("shimmer", tStay);

    // OUT: split doors, local so the two scenes' text never shares the frame: the s06 doors close to the centre line and
    // s06 is gone before s07's first headline becomes visible (s07 shows it from its t0); s07's root fades/settles in behind
    out("s06", ({ cur, next }) => {
      const tb = cur.t1, d = 0.8;
      tl.fromTo(next.root, { autoAlpha: 0, scale: 1.06 }, { autoAlpha: 1, scale: 1, duration: d, ease: "nx.out", immediateRender: false, fxNoScale: true }, tb - 0.5);
      tl.fromTo(cur.root, { clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: "inset(0% 50% 0% 50%)", duration: d, ease: "nx.inOut", immediateRender: false, fxNoScale: true }, tb - 0.92);
      tl.set(cur.root, { autoAlpha: 0 }, tb - 0.1);
    });
  }
