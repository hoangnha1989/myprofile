  /* ===== S10 IT LEARNS, AND IT IS MEASURED (gold): two even cards under a centred headline. Left, the daily loop of four
     clay plates Learn -> Correct -> Propose -> Approve (approve = orange shield tick) drawn arc by arc around a loop hero
     that turns into the person who stays in control; on "quality" the loop card steps left and an unlabelled 5-axis quality radar grows a ring per week on the right. Then
     a 30-day activity card (dashed AVG line) and 3 KPI shells stand on "measured"; each tile counts up on its own number
     (190 CVs, 160 top-tier, 150 interview calls) over a never-stopping pulse line; tagline "in numbers, not feelings". Exit: wipe from the top (feathered on the s10 side).
     App showcase (BRIEF_GOLD rule 9): the proposals screen slams in on "proposing improvements", the dashboard on "every action
     is measured"; both live in ONE right column (x 1356, width 436, gap 24). Phase 1: proposals shot (252..386) over the radar
     card (410..848) next to the loop card (x 128..1324, gap 32 to the column, as the act card in phase 2). Phase 2: the radar leaves, the proposals shot restacks to
     296..430 and the dashboard docks under it (454..744), level with the act card + 3 tiles of 376 (gap 34) on the left. ===== */
  {
    const [t0, t1] = W("s10");
    const S = scene("s10", { cam: [[t0, 1.0], [t1, 1.03]] });
    const c = S.cam;
    const k = (n) => C("s10", n);
    const tReviews = k("reviews"), tEvery = k("every"), tLearning = k("learning"), tCorrecting = k("correcting"), tProposing = k("proposing"),
      tApprove = k("approve"), tQuality = k("quality"), tGrows = k("grows"), tWeek = k("week"), tPerson = k("person"), tControl = k("control"),
      tAnd = k("and"), tMeasured = k("measured"), tEvery2 = k("every2"), tThirty = k("thirty"), tAverage = k("average"),
      tNinety = k("ninety"), tSixty = k("sixty"), tFifty = k("fifty"), tCalls = k("calls"), tSourcing = k("sourcing"),
      tNumbers = k("numbers"), tFeelings = k("feelings"), tReports = k("reports");
    const R = nx.rng(1010);

    const gate = (el, tin, tout) => {
      tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, fxNoScale: true }, tin);
      if (tout != null) tl.to(el, { autoAlpha: 0, duration: 0.01, immediateRender: false, fxNoScale: true }, tout);
    };

    /* ---------------- phase 1: centred header ---------------- */
    const eb = add(c, `<div class="eyebrow s10-eb" data-box="s10-eb">Every day</div>`);
    const hl = add(c, `<div class="hl s10-hl" data-box="s10-hl"><span class="line">It reviews its <em>own work</em></span></div>`);
    // the s10 root focuses in from t0 - 0.3 to t0 + 0.7 and the voice starts only at "It also" (about tReviews - 0.5): headline,
    // loop card, dashed track and loop hero all open together at t0 + 0.25, so the focus pull lands on content, never an empty shell
    const tOpen = Math.min(tReviews - 0.6, t0 + 0.25);
    nx.lineRise(hl.querySelectorAll(".line"), tOpen);
    nx.scramble(eb, tEvery - 0.2, { dur: 0.7 });
    sfx("whoosh-soft", tOpen);

    /* ---------------- left card: the daily loop ---------------- */
    // card 1196 x 596 (the act card's footprint), centred alone at (362, 252) while the loop is told; before the proposals slam
    // it steps left to (128, 252), so it sits 32 px from the showcase column exactly as the act card does in phase 2;
    // loop centre (598, 298), radius 160
    const lc = add(c, `<div class="hc s10-card" data-box="s10-loop" style="left:362px;top:252px"></div>`);
    const LX = 598, LY = 298, LR = 160, GAP = 33;
    const pt = (deg, r) => [LX + r * Math.cos(deg * Math.PI / 180), LY + r * Math.sin(deg * Math.PI / 180)];
    const lsvg = add(lc, `<svg class="s10-lsvg" width="1196" height="596" viewBox="0 0 1196 596"><circle class="trk" cx="${LX}" cy="${LY}" r="${LR}"/></svg>`);
    const arcs = [];
    for (let i = 0; i < 4; i++) {
      const a0 = -90 + i * 90 + GAP, a1 = -90 + (i + 1) * 90 - GAP;
      const [x0, y0] = pt(a0, LR), [x1, y1] = pt(a1, LR);
      // arrow head: two strokes back along the clockwise tangent at the arc end
      const tg = (a1 + 90) * Math.PI / 180, hd = 13;
      const hA = [x1 - hd * Math.cos(tg - 0.5), y1 - hd * Math.sin(tg - 0.5)], hB = [x1 - hd * Math.cos(tg + 0.5), y1 - hd * Math.sin(tg + 0.5)];
      lsvg.insertAdjacentHTML("beforeend", `<path class="arc" d="M${x0.toFixed(1)} ${y0.toFixed(1)} A${LR} ${LR} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}"/>`);
      const a = lsvg.lastElementChild;
      lsvg.insertAdjacentHTML("beforeend", `<path class="arc" d="M${hA[0].toFixed(1)} ${hA[1].toFixed(1)} L${x1.toFixed(1)} ${y1.toFixed(1)} L${hB[0].toFixed(1)} ${hB[1].toFixed(1)}"/>`);
      a.hd = lsvg.lastElementChild;
      arcs.push(a);
    }
    // the traveler sits under the plates: it circles the closed loop (the work never stops improving)
    const trav = add(lc, `<div class="s10-trav" style="left:${LX - 8}px;top:${LY - LR - 8}px"></div>`);
    const NODE = [["Learn", "chat_bubbles", "t"], ["Correct", "checklist", "r"], ["Propose", "lightbulb", "b"], ["Approve", "shield_check", "l"]]
      .map(([nm, ico, side], i) => {
        const [x, y] = pt(-90 + i * 90, LR);
        const n = nx.plate(lc, ico, Math.round(x), Math.round(y), "M", { id: "s10-n" + i, anchor: "center", tint: i === 3 ? "orange" : "blue" });
        const rp = add(lc, `<i class="s10-rp${i === 3 ? " o" : ""}" style="left:${Math.round(x) - 64}px;top:${Math.round(y) - 64}px"></i>`);
        const lb = add(lc, `<div class="s10-nl ${side}">${nm}</div>`);
        if (side === "t") Object.assign(lb.style, { left: (x - 100) + "px", top: (y - 64 - 14 - 32) + "px" });
        if (side === "b") Object.assign(lb.style, { left: (x - 100) + "px", top: (y + 64 + 14) + "px" });
        if (side === "r") Object.assign(lb.style, { left: (x + 64 + 16) + "px", top: (y - 16) + "px" });
        if (side === "l") Object.assign(lb.style, { left: (x - 64 - 16 - 200) + "px", top: (y - 16) + "px" });
        return { n, rp, lb };
      });
    const hLoop = nx.hero(lc, "loop_arrows", LX, LY, 128, { id: "s10-hloop", anchor: "center" });
    const hPers = nx.hero(lc, "person_bust", LX, LY, 128, { id: "s10-hpers", anchor: "center" });
    hLoop.setAttribute("data-allow", "s10-hpers");
    hPers.setAttribute("data-allow", "s10-hloop");

    // the card never shows as an empty shell: it fades up as one piece while the loop hero focuses in and the track draws
    nx.slide(lc, tOpen, { x: 0, y: 24, dur: 0.7 });
    nx.blurIn(hLoop, tOpen + 0.05, { blur: 10, scale: 1.0001, dur: 0.6 });
    nx.draw(lsvg.querySelector(".trk"), tOpen + 0.05, { dur: 0.9 });
    // plates in a row enter without any scale change (a pop overshoot made one plate read larger than its row); the ping carries the beat
    const rise = (el, at) => nx.slide(el, at, { x: 0, y: 16, dur: 0.45 });
    const lit = (i, at) => {
      rise(NODE[i].n, at - 0.25);
      nx.clip(NODE[i].lb, at - 0.1, { dir: i === 3 ? "r" : "l", dur: 0.6 });
      nx.ping(NODE[i].rp, at + 0.1, { scale: 1.35 });
      sfx("pop", at - 0.2, -3);
    };
    // arc i runs from plate i into plate i+1: it starts only once its target plate has popped (pop at cue - 0.25)
    lit(0, tLearning);
    lit(1, tCorrecting);
    nx.draw([arcs[0], arcs[0].hd], tCorrecting - 0.2, { dur: 0.6 });
    // the loop card makes room for the showcase column after the Correct beat, before the proposals slam
    const tStep = tCorrecting + 0.45;
    tl.fromTo(lc, { x: 0 }, { x: -234, duration: 0.6, ease: "nx.inOut", immediateRender: false }, tStep);
    lit(2, tProposing - 0.15);
    nx.draw([arcs[1], arcs[1].hd], tProposing - 0.35, { dur: 0.6 });
    // the Approve plate rises only once the proposals shot has docked (SC1.tDock = tApprove - 0.05): the key beat lands on a still card
    lit(3, tApprove + 0.2);
    nx.draw([arcs[2], arcs[2].hd], tApprove, { dur: 0.5 });
    nx.draw([arcs[3], arcs[3].hd], tApprove + 0.4, { dur: 0.5 });
    sfx("tick", tApprove + 0.25);
    gsap.set(trav, { transformOrigin: `8px ${LR + 8}px` });
    tl.fromTo(trav, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, tApprove + 0.6);
    tl.fromTo(trav, { rotation: 0 }, { rotation: 540, duration: tAnd - tApprove - 0.6, ease: "none", immediateRender: false }, tApprove + 0.6);
    // a person stays in control: the loop hero gives its place to the person, the Approve plate rings (sizes stay on the row size)
    tl.to(hLoop, { autoAlpha: 0, filter: "blur(6px)", duration: 0.45, ease: "power2.in", immediateRender: false }, tPerson - 0.35);
    nx.blurIn(hPers, tPerson - 0.15, { blur: 10, scale: 1.0001 });
    nx.ping(NODE[3].rp, tControl - 0.05, { scale: 1.35 });
    sfx("bloom", tPerson - 0.1);

    /* ---------------- right card: quality grows every week ---------------- */
    // docked under the proposals shot in the showcase column (same width 436, gap 24), its bottom level with the loop card (848)
    const rc = add(c, `<div class="hc s10-rcard" data-box="s10-rad" style="left:1356px;top:410px"></div>`);
    const rT = add(rc, `<div class="s10-rt">Quality grows<br>every week</div>`);
    const rsvg = add(rc, `<svg class="s10-rsvg" width="436" height="438" viewBox="0 0 436 438"></svg>`);
    const QX = 218, QY = 262, QR = 130;
    const qp = (i, f) => { const a = (-90 + i * 72) * Math.PI / 180; return [QX + QR * f * Math.cos(a), QY + QR * f * Math.sin(a)]; };
    const poly = (vals) => vals.map((f, i) => qp(i, f).map((v) => v.toFixed(1)).join(",")).join(" ");
    [1, 0.66, 0.33].forEach((f) => rsvg.insertAdjacentHTML("beforeend", `<polygon class="g" points="${poly([f, f, f, f, f])}"/>`));
    for (let i = 0; i < 5; i++) { const [x, y] = qp(i, 1); rsvg.insertAdjacentHTML("beforeend", `<line class="ax" x1="${QX}" y1="${QY}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`); }
    // unlabelled 5-axis radar: axis names are not in the ost/vo inventory, the title and the weekly ghost rings carry the meaning
    const WK = [[0.34, 0.4, 0.3, 0.36, 0.32], [0.6, 0.68, 0.55, 0.62, 0.58], [0.86, 0.94, 0.8, 0.9, 0.84]];
    const ghosts = WK.slice(0, 2).map((v) => { rsvg.insertAdjacentHTML("beforeend", `<polygon class="gh" points="${poly(v)}"/>`); return rsvg.lastElementChild; });
    rsvg.insertAdjacentHTML("beforeend", `<polygon class="d" points="${poly(WK[0])}"/>`);
    const dpol = rsvg.lastElementChild;
    const vtx = WK[0].map((f, i) => { const [x, y] = qp(i, f); rsvg.insertAdjacentHTML("beforeend", `<circle class="vx" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7"/>`); return rsvg.lastElementChild; });
    /* ---------------- showcase 1: the improvement proposals, on "proposing improvements" ---------------- */
    // top of the right column; slam 0.5 + hold 0.35 + dock 0.7 ends at tProposing + 1.35 (just before "approve")
    const SC1 = nx.showcase(c, "S08b_improvement-proposals.png", tProposing - 0.2, { slot: { x: 1356, y: 252, w: 436 }, ar: 360 / 1400, hold: 0.35, id: "s10-sc1" });
    sfx("impact", tProposing - 0.2, -4);
    sfx("whoosh-soft", SC1.tFly);
    // the radar belongs to "quality grows every week": it enters on "quality" in the column slot under the docked shot
    gate(rc, tQuality - 0.25);
    tl.fromTo(rc, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "nx.inOut" }, tQuality - 0.25);
    nx.clip(rT, tQuality - 0.2, { dir: "l", dur: 0.5 });
    nx.draw(rsvg.querySelectorAll(".g, .ax"), tQuality - 0.1, { dur: 0.6, stagger: 0.03 });
    tl.fromTo(dpol, { autoAlpha: 0, scale: 0.2, svgOrigin: `${QX} ${QY}` }, { autoAlpha: 1, scale: 1, svgOrigin: `${QX} ${QY}`, duration: 0.35, ease: "nx.out" }, tQuality + 0.05);
    tl.fromTo(vtx, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, stagger: 0.02 }, tQuality + 0.2);
    const grow = (w, at, d) => {
      tl.set(ghosts[w - 1], { autoAlpha: 1 }, at);
      tl.to(dpol, { attr: { points: poly(WK[w]) }, duration: d, ease: "nx.inOut", immediateRender: false }, at);
      vtx.forEach((v, i) => { const [x1, y1] = qp(i, WK[w][i]);
        tl.to(v, { attr: { cx: x1, cy: y1 }, duration: d, ease: "nx.inOut", immediateRender: false }, at); });
      sfx("tick", at, -6);
    };
    gsap.set(ghosts, { autoAlpha: 0 });
    tl.set(ghosts, { autoAlpha: 0 }, t0);
    grow(1, tGrows - 0.05, Math.min(0.6, tWeek - tGrows - 0.05));
    grow(2, tWeek - 0.05, 0.7);
    sfx("shimmer", tGrows);

    /* ---------------- phase 2: every action is measured (30-day average) ---------------- */
    // both phase-1 cards leave after the "control" ping and are gone (0.55 x 1.3 pacing = 0.715 s) by tAnd + 0.12, before the
    // dashboard slam (no earlier than tAnd + 0.15), so nothing is still fading behind its scrim
    tl.to(lc, { x: -394, autoAlpha: 0, filter: "blur(8px)", duration: 0.55, ease: "power2.in", immediateRender: false }, tAnd - 0.6);
    tl.to(rc, { y: 40, autoAlpha: 0, filter: "blur(8px)", duration: 0.55, ease: "power2.in", immediateRender: false }, tAnd - 0.6);
    // the column restacks for phase 2: proposals shot 252 -> 296 so the shot pair (296..744) sits level with the act card + tiles
    tl.fromTo(SC1.el, { top: 252 }, { top: 296, duration: 0.6, ease: "nx.inOut", immediateRender: false }, tAnd - 0.65);
    // the eyebrow leaves first, so the headline never lifts through a visible eyebrow band
    nx.out(eb, tAnd - 0.8, { y: -10, dur: 0.3 });
    tl.to(hl.querySelector(".in"), { yPercent: -110, autoAlpha: 0, duration: 0.45, ease: "power2.in", immediateRender: false }, tAnd - 0.45);
    sfx("whoosh", tAnd - 0.3);
    const h2 = add(c, `<div class="hl s10-hl" data-box="s10-h2"><span class="line">Every action is <em>measured</em></span></div>`);
    gate(hl, tOpen, tEvery2 - 0.27);
    gate(h2, tEvery2 - 0.25);
    nx.lineRise(h2.querySelectorAll(".line"), tEvery2 - 0.25);

    // the last thirty days, inside one wide card: one activity bar per day, then their average (dashed, tagged AVG) across
    const act = add(c, `<div class="hc s10-act" data-box="s10-act"></div>`);
    const dms = [];
    // bars stand on the card floor (y 108) and vary 16..80 px, so the average line cuts through them instead of capping them
    const DH = Array.from({ length: 30 }, () => 16 + 2 * Math.round(R() * 32));
    DH.forEach((hgt, i) => dms.push(add(act, `<i class="bar" style="left:${40 + i * 34}px;height:${hgt}px"></i>`)));
    const mean = DH.reduce((a, b) => a + b, 0) / DH.length, avgY = 2 * Math.round((108 - mean) / 2);
    const avg = add(act, `<svg class="s10-avg" width="1024" height="20" viewBox="0 0 1024 20" style="left:28px;top:${avgY - 10}px"><path d="M2 10H1022"/></svg>`);
    const avgT = add(act, `<div class="s10-avgt" style="top:${avgY - 16}px">AVG</div>`);
    /* ---------------- showcase 2: the measuring dashboard, on "every action is measured" ---------------- */
    // slams on "every action", docks under the restacked proposals shot (same width, gap 24) before "thirty",
    // the column ending level with the KPI tiles (y 744); the act card and tiles open as its scrim lifts
    // big 900: the slam's start frame (scale x 1.14, card 22 + 900 * 862/1400 = 576 -> 657 tall centred on y 500) ends at
    // y 829, so even its blurred edge stays out of the caption band (y > 880)
    const tSlam2 = Math.max(tEvery2 - 0.1, tAnd + 0.15);
    const SC2 = nx.showcase(c, "S08a_heart-dashboard.png", tSlam2, { slot: { x: 1356, y: 454, w: 436 }, ar: 862 / 1400, big: 900, hold: 0.5, id: "s10-sc2" });
    sfx("impact", tSlam2, -4);
    sfx("whoosh-soft", SC2.tFly);
    const tCards = SC2.tFly, tUp = Math.max(tThirty - 0.3, SC2.tDock);
    const KPI = [["cv_resume", 190, "CVs", tNinety], ["star_award", 160, "top-tier", tSixty], ["phone_call", 150, "interview calls", tFifty]];
    // the three KPI tiles stand as waiting shells from "measured" (skeleton rows), each fills on its own number word
    const tiles = KPI.map(([ico, n, lb, at], i) => {
      const el = add(c, `<div class="hc s10-tile" data-box="s10-tile${i}" style="left:${128 + i * 410}px"><i class="sk p"></i><i class="sk n1"></i><i class="sk n2"></i>` +
        `<div class="n num">0</div><div class="lb">${lb}</div></div>`);
      el.pl = nx.plate(el, ico, 28, 52, "M", { id: "s10-kp" + i, tint: i === 1 ? "orange" : "blue" });
      return el;
    });
    gate(act, tCards);
    tl.fromTo(act, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "nx.inOut" }, tCards);
    tiles.forEach((el, i) => gate(el, tCards + 0.1 + i * 0.08));
    tl.fromTo(tiles, { clipPath: "inset(100% 0% 0% 0%)", y: 30 }, { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 0.7, stagger: 0.08, ease: "nx.out" }, tCards + 0.1);
    tl.fromTo(dms, { scaleY: 0, backgroundColor: P.line2 }, { scaleY: 1, backgroundColor: P.line2, duration: 0.35, stagger: 0.012, ease: "nx.out" }, tCards + 0.3);
    // "thirty": the chip and the bars colouring up wait for the dashboard to be docked, so the beat plays on a still frame
    tl.to(dms, { backgroundColor: P.acc, duration: 0.25, stagger: 0.025, ease: "nx.out", immediateRender: false }, tUp);
    sfx("riser", tUp, -6);
    const days = add(c, `<div class="chip acc s10-days" data-box="s10-days">${icon("calendar", 22, "#FFFFFF", 2)}30-day average</div>`);
    nx.settle(days, tUp, { from: 0.6 });
    // clip reveal keeps the CSS dashes (drawSVG would replace the dasharray)
    nx.clip(avg, tAverage - 0.2, { dir: "l", dur: 0.6 });
    nx.settle(avgT, tAverage + 0.3, { from: 0.6 });
    sfx("tick", tAverage - 0.1, -4);

    KPI.forEach(([, n, , at], i) => {
      const el = tiles[i];
      tl.to(el.querySelectorAll(".sk"), { autoAlpha: 0, duration: 0.25, immediateRender: false }, at - 0.3);
      rise(el.pl, at - 0.25);
      nx.blurIn(el.querySelector(".n"), at - 0.2, { blur: 6, scale: 1.0001, dur: 0.4 });
      // value lands about 0.5 s after its word, label complete by cue + 0.35
      nx.count(el.querySelector(".n"), at - 0.15, n, { dur: 0.65 });
      nx.clip(el.querySelector(".lb"), at - 0.15, { dir: "l", dur: 0.5 });
      sfx("tick", at - 0.1, -2);
    });
    // "interview calls": the call tile answers on its own word
    tl.to(tiles[2].pl, { y: -8, duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false, fxNoScale: true }, tCalls - 0.1);

    // a sourcing team that never stops: an activity pulse runs under the three tiles, one beat under each
    const pls = add(c, `<div class="s10-pulse" data-box="s10-pulse"><svg width="1196" height="48" viewBox="0 0 1196 48"><path d="M0 24 H167 l14 -18 l14 36 l14 -18 H577 l14 -18 l14 36 l14 -18 H987 l14 -18 l14 36 l14 -18 H1196"/></svg><i class="hd"></i></div>`);
    gate(pls, tSourcing - 0.3);
    nx.draw(pls.querySelector("path"), tSourcing - 0.3, { dur: 2.0, ease: "none" });
    tl.fromTo(pls.querySelector(".hd"), { x: 0, autoAlpha: 1 }, { x: 1196, duration: 2.6, ease: "none", fxNoScale: true }, tSourcing - 0.3);
    tl.to(pls.querySelector(".hd"), { autoAlpha: 0, duration: 0.3, immediateRender: false }, tSourcing + 2.3);
    sfx("whoosh-soft", tSourcing - 0.3);
    const tag = add(c, `<div class="s10-tag" data-box="s10-tag">Reports in <em>numbers</em>, <span class="nf">not <span class="fl">feelings<i class="strike"></i></span></span>.</div>`);
    gate(tag, tReports - 0.25);
    nx.chars(tag, tReports - 0.25, { stagger: 0.016, y: 20 });
    tl.fromTo(tag.querySelector(".strike"), { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "nx.inOut" }, tFeelings + 0.25);
    tl.to(tag.querySelectorAll(".nf .nxc"), { color: P.muted, duration: 0.4, immediateRender: false }, tFeelings + 0.3);
    sfx("impact", tNumbers - 0.1);
    // keep the finished frame alive in the closing pause
    nx.float(tiles, tFeelings + 0.8, t1, { amp: 4, per: 3.2 });

    out("s10", ({ cur, next }) => {
      // wipe from the top. s11 is revealed behind a hard edge as in T_wipe "t", but this scene does not leave behind that
      // hard edge: a 260 px feathered mask on the s10 root runs ahead of it on a gentle sine (starts 0.7 s earlier, lands
      // 0.15 s earlier, so it is never behind the reveal edge), and dense rows (headline, numbers) fade over several frames
      const d = 0.9, tb = cur.t1, F = 260, tm0 = tb - d / 2 - 0.7, dm = d + 0.7 - 0.15;
      tl.fromTo(next.root, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, immediateRender: false, fxNoScale: true }, tb - d / 2);
      tl.fromTo(cur.root, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.01, immediateRender: false, fxNoScale: true }, tb + d / 2);
      tl.fromTo(next.root, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: d, ease: "nx.inOut", immediateRender: false, fxNoScale: true }, tb - d / 2);
      tl.set(next.root, { clipPath: "none" }, tb + d / 2 + 0.01);
      const m = { e: -F };
      const paint = () => {
        const g = `linear-gradient(to bottom, transparent ${m.e.toFixed(1)}px, #000 ${(m.e + F).toFixed(1)}px)`;
        cur.root.style.maskImage = g;
        cur.root.style.webkitMaskImage = g;
      };
      tl.fromTo(m, { e: -F }, { e: 1080, duration: dm, ease: "sine.inOut", immediateRender: false, fxNoScale: true, onUpdate: paint }, tm0);
      // each box is hidden once the mask is fully transparent at its bottom, so faded-out boxes stop registering under s11
      const wE = gsap.parseEase("sine.inOut");
      const passT = (yb) => { let lo = 0, hi = 1; for (let q = 0; q < 24; q++) { const md = (lo + hi) / 2; if (-F + (1080 + F) * wE(md) < yb) lo = md; else hi = md; } return hi; };
      // the two shots are measured from their slot geometry, never the DOM: out() runs before the screenshots load, so their
      // offsetHeight is only the 22 px title bar (proposals restacked at 296, 22 + 436 * 360/1400; dashboard 454, 22 + 436 * 862/1400)
      const SLOT = new Map([[SC1.el, [296, 22 + 436 * 360 / 1400]], [SC2.el, [454, 22 + 436 * 862 / 1400]]]);
      [...c.children].filter((el) => el.hasAttribute("data-box")).forEach((el) => {
        const [top, h] = SLOT.get(el) || [el.offsetTop, el.offsetHeight];
        const yb = Math.min(1080, (top + h) * 1.03 + 16);
        tl.set(el, { autoAlpha: 0 }, tm0 + dm * passT(yb));
      });
    });
  }
