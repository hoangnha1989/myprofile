  /* ===== S07 THE BRIDGE (gold pass) : "Slow replies · Missed follow-ups · Judgment lost to routine -> software carries the
     routine, people make the decisions". Hero FX: three clay pain icons are dealt in one by one on their words and act out
     their pain (the hourglass keeps flipping while a reply bar crawls, the link snaps apart and a follow-up drops off the
     chain, routine tickets fill the strip under the judgment bulb until it dims); the row re-centres as each card joins.
     Then a split screen (code | hiring process) builds in spoken order (engineers first, HR second) and slides together
     into one system around a clay gears core; routine rows wipe in on the Software side while the judgment bulb
     comes back lit on the People side, over a Decisions row where one option is picked by hand. Layout: one centred headline zone (y 180..330), one card row (y 370..790) symmetric
     around x = 960. Every headline clears before the next one rises. Exit: T_leak. ===== */
  {
    const [t0, t1] = W("s07");
    const S = scene("s07", { cam: [[t0, 1.0], [t1, 1.04]] });
    const c = S.cam;
    const tProc = C("s07", "process"), tGood = C("s07", "good"), tWait = C("s07", "wait"),
      tReply = C("s07", "reply"), tFol = C("s07", "followups"), tSlip = C("s07", "slip"), tJud = C("s07", "judgment"),
      tHand = C("s07", "hand"), tRepet = C("s07", "repetitive"), tYears = C("s07", "years"), tEng = C("s07", "engineers"), tYears2 = C("s07", "years2"),
      tHR = C("s07", "hr"), tBuilt = C("s07", "built"), tMyself = C("s07", "myself"), tPurp = C("s07", "purpose"), tSoft = C("s07", "software"),
      tRout = C("s07", "routine"), tPeople = C("s07", "people"), tDec = C("s07", "decisions");
    const CARD_TOP = 370;
    // real end of a wiped entrance (n targets): tl runs dur and stagger SLOW (1.3x) longer, so a clipPath clear set any
    // earlier is written back to inset(0) by the still-running tween and the rim and shadow stay cut
    const wipeEnd = (at, dur, stagger = 0, n = 1) => at + (dur + stagger * (n - 1)) * SLOW + 0.02;

    // a text block is visible (box present for the probe) only between a and b
    const vis = (el, a, b) => { tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, a); if (b != null) tl.to(el, { autoAlpha: 0, duration: 0.05, immediateRender: false }, b); };
    // a clay glyph inside a small UI slot (ticket, row, strip): free hero icon of px inside a holder span
    const clay = (holder, name, px, id) => nx.hero(holder, name, 0, 0, px, { id });

    /* ---------- beat A: a process run by hand, and its three pains, each on its own words ---------- */
    const hlA = add(c, `<div class="hl s07-hl c" data-box="s07-hlA"><span class="line">A process run by hand</span><span class="line">can only grow <em>so far.</em></span></div>`);
    const la = hlA.querySelectorAll(".line");
    // s06's doors close on the centre line and s06 is hidden at t0 - 0.1: line 1 shows and rises the instant the doors have
    // cleared, while the s07 root is still settling in, so there is no blank paper frame between the scenes.
    // Line 2 is the punchline and waits for its own words: it rises with "can only grow" (just after "hand")
    vis(hlA, t0 - 0.08);
    nx.lineRise([la[0]], t0 - 0.11, { dur: 0.6 });
    nx.lineRise([la[1]], tHand + 0.15);
    sfx("whoosh-soft", t0 - 0.06);
    // the line sits in the middle of the frame while it is the only thing said, then lifts to the headline zone before "Good"
    tl.fromTo(hlA, { y: 230 }, { y: 0, duration: 0.55, ease: "nx.inOut" }, tGood - 0.9);

    // three equal cards 480 x 420, gap 60, centred: final lefts 180 / 720 / 1260. Shared inner grid:
    // hero 200 (y 24..224) / mini-UI strip 320 x 44 (y 244..288) / number 36 px (y 296) / label (y 346)
    const cardHTML = (k, txt) => `<div class="hc s07-pain p${k}" data-box="s07-pain${k}"><div class="strip"></div>
      <div class="no">0${k + 1}</div><div class="tx">${txt}</div></div>`;
    const pains = ["Slow replies", "Missed follow-ups", "Judgment lost to routine"].map((txt, k) => add(c, cardHTML(k, txt)));
    const HERO = 200, HX = 240 - HERO / 2, HY = 24;
    // the row stays centred while it grows: 1 card at x+540 (centre 960), 2 cards at x+270, 3 cards at x 0.
    // A card joins on its cue word: the newcomer slides in 270 px with the same ease and duration as the cards already there,
    // so the row moves as one (gap stays 60) and is never off-centre with nothing on the other side.
    const tIn = [tGood - 0.3, tFol - 0.2, tJud - 0.2];
    const tShift = [null, tIn[1] - 0.05, tIn[2] - 0.05];
    const off = [[540, 270, 0], [null, 270, 0], [null, null, 0]];
    pains.forEach((p, k) => {
      const x0 = off[k][k];
      tl.fromTo(p, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, tIn[k] - 0.02);
      if (k === 0) tl.set(p, { x: x0 }, 0);
      else tl.fromTo(p, { x: x0 + 270 }, { x: x0, duration: 0.7, ease: "nx.out" }, tShift[k]);
      tl.fromTo(p, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "nx.inOut" }, tIn[k]);
      // the wipe is only an entrance: drop the clip so the card's 3D shadow and soft drop shadow show in full
      tl.set(p, { clipPath: "none" }, wipeEnd(tIn[k], 0.6));
      for (let s = k + 1; s < 3; s++)
        tl.fromTo(p, { x: off[k][s - 1] }, { x: off[k][s], duration: 0.7, ease: "nx.out", immediateRender: false }, tShift[s]);
      sfx("whoosh-soft", tIn[k], -8);
    });

    // 1. slow replies: the clay hourglass flips again and again while the reply bar crawls
    const hg = nx.hero(pains[0], "bottleneck", HX, HY, HERO, { id: "s07-hg" });
    const hgImg = hg.querySelector(".fx-hero-ico");
    const st0 = pains[0].querySelector(".strip");
    // the strip's clock is a small UI glyph (line icon): a clay one would join the clay ticket row of card 3 at another size
    st0.innerHTML = `<div class="wait">${icon("clock", 28, P.acc3, 2)}<i class="trk"><i class="fill"></i></i><span class="dots"><i></i><i></i><i></i></span></div>`;
    nx.settle(hg, tIn[0] + 0.1, { from: 0.6, dur: 0.5 });
    [tWait - 0.1, tReply - 0.1].forEach((at, i) =>
      tl.fromTo(hgImg, { rotation: 180 * i }, { rotation: 180 * (i + 1), duration: 0.8, ease: "back.inOut(1.4)", immediateRender: false }, at));
    nx.clip(st0, tGood - 0.05, { dir: "l", dur: 0.5 });
    tl.set(st0, { clipPath: "none" }, wipeEnd(tGood - 0.05, 0.5));
    tl.fromTo(st0.querySelector(".fill"), { scaleX: 0.04 }, { scaleX: 0.86, duration: tRepet - tWait + 0.6, ease: "sine.out", fxNoScale: true }, tWait - 0.2);
    const dots = st0.querySelectorAll(".dots i");
    dots.forEach((d, i) => tl.fromTo(d, { autoAlpha: 0.25 }, { autoAlpha: 1, duration: 0.5, ease: "sine.inOut", repeat: 9, yoyo: true, immediateRender: false, fxNoScale: true }, tWait + i * 0.18));
    sfx("tick", tWait); sfx("tick", tReply);

    // 2. missed follow-ups: the clay link (drawn already broken, one uncut image with one shadow) jolts on "slip" while
    // sparks fly from the break; a follow-up drops off the chain
    const lk = nx.hero(pains[1], "broken_link", HX, HY, HERO, { id: "s07-link" });
    lk.classList.add("s07-link");
    add(lk, `<svg class="sp" width="200" height="200" viewBox="0 0 200 200"><path d="M92 74l-10-16M102 70V50M112 74l10-16"/></svg>`);
    const st1 = pains[1].querySelector(".strip");
    // same white pill as card 1's strip; the chain is solid up to the last kept follow-up (n1), the rest of it breaks off
    st1.innerHTML = `<div class="pill"><svg class="chain" width="320" height="44" viewBox="0 0 320 44">
      <path class="gap" d="M134 22H186M218 22H270"/><path class="ln la" d="M34 22H118"/><path class="ln lb" d="M118 22H286"/>
      ${[34, 118, 202, 286].map((x, i) => `<g class="nd n${i}"><circle cx="${x}" cy="22" r="12"/>${i < 2 ? `<path class="ck" d="M${x - 6} 22l4 4 8-8"/>` : ""}</g>`).join("")}</svg></div>`;
    const lkImg = lk.querySelector(".fx-hero-ico");
    nx.blurIn(lk, tIn[1] + 0.05, { blur: 10, scale: 1, dur: 0.5 });
    // the snap: a short jolt (tilt + kick) that springs back to a small resting tilt, never a spin
    tl.fromTo(lkImg, { rotation: 0, x: 0 }, { rotation: -8, x: -6, duration: 0.14, ease: "power2.out", transformOrigin: "50% 60%", immediateRender: false }, tSlip - 0.1);
    tl.to(lkImg, { rotation: -3, x: 0, duration: 0.6, ease: "back.out(2.2)", immediateRender: false }, tSlip + 0.04);
    nx.draw(lk.querySelectorAll(".sp path"), tSlip, { dur: 0.35, ease: "nx.out" });
    tl.to(lk.querySelector(".sp"), { autoAlpha: 0.45, duration: 0.5, immediateRender: false }, tSlip + 0.6);
    nx.clip(st1.querySelector(".pill"), tFol - 0.25, { dir: "l", dur: 0.4 });
    tl.set(st1.querySelector(".pill"), { clipPath: "none" }, wipeEnd(tFol - 0.25, 0.4));
    nx.draw(st1.querySelector(".la"), tFol - 0.1, { dur: 0.25, ease: "none" });
    nx.draw(st1.querySelector(".lb"), tFol + 0.15, { dur: 0.4, ease: "nx.out" });
    nx.pop(st1.querySelectorAll(".nd"), tFol - 0.1, { stagger: 0.06 });
    tl.set(st1.querySelector(".gap"), { autoAlpha: 0 }, 0);
    // on "slip" the chain breaks after n1: its tail retracts into n1, a dashed ghost marks the gap, and the two lost
    // follow-ups shrink and sink a little off the line (kept >= 8 px inside the pill edge)
    tl.fromTo(st1.querySelector(".lb"), { drawSVG: "0% 100%" }, { drawSVG: "0% 0%", duration: 0.35, ease: "power2.in", immediateRender: false }, tSlip + 0.05);
    tl.to(st1.querySelector(".gap"), { autoAlpha: 0.55, duration: 0.3, immediateRender: false }, tSlip + 0.3);
    tl.to(st1.querySelectorAll(".n2, .n3"), { y: 2, scale: 0.85, transformOrigin: "50% 50%", autoAlpha: 0.4, duration: 0.5, stagger: 0.12, ease: "power2.in", immediateRender: false }, tSlip + 0.1);
    sfx("impact", tSlip - 0.05, -6);

    // 3. judgment lost to routine: the clay judgment bulb dims while clay routine tickets fill its strip; the dim is done
    // well before the row leaves (tB + 0.05), so "judgment lost" holds in its dimmed state
    const bulb = nx.hero(pains[2], "lightbulb", HX, HY, HERO, { id: "s07-bulb" });
    const st2 = pains[2].querySelector(".strip");
    const TK = ["envelope", "calendar", "chat_bubbles", "timesheet", "jd_document"];
    st2.innerHTML = `<div class="tks">${TK.map(() => `<i class="tkt"></i>`).join("")}</div>`;
    st2.querySelectorAll(".tkt").forEach((tk, i) => nx.hero(tk, TK[i], 10, 4, 36, { id: "s07-tk" + i }));
    nx.blurIn(bulb, tIn[2] + 0.05, { blur: 10, scale: 1, dur: 0.5 });
    // the five tickets feed in left to right on "judgment" (a wipe, so every ticket is always at its one size) and are all in
    // by judgment + 0.6; the clip is cleared at each ticket's scaled end so its shadow shows in full
    const tks = st2.querySelectorAll(".tkt"), tTk = tJud + 0.04;
    nx.clip(tks, tTk, { dir: "l", dur: 0.2, stagger: 0.05 });
    tks.forEach((tk, i) => tl.set(tk, { clipPath: "none" }, wipeEnd(tTk + 0.05 * SLOW * i, 0.2)));
    // the bulb switches off but stays a solid object: desaturated, a touch darker, drooping a few degrees (never faded out)
    tl.fromTo(bulb.querySelector(".fx-hero-ico"), { filter: "drop-shadow(0 18px 22px rgba(27,127,176,.24)) drop-shadow(0 6px 8px rgba(244,126,42,.18)) grayscale(0) brightness(1)" }, { filter: "drop-shadow(0 18px 22px rgba(27,127,176,.24)) drop-shadow(0 6px 8px rgba(244,126,42,.18)) grayscale(0.85) brightness(0.92)", rotation: -9, y: 6, transformOrigin: "50% 85%", duration: 0.35, ease: "power2.inOut", immediateRender: false }, tRepet - 0.35);
    sfx("pop", tTk, -6); sfx("pop", tTk + 0.26, -6);
    // number + label of each card land on its own words, in spoken order
    pains.forEach((p, k) => {
      const tw = [tWait, tFol, tJud][k];
      nx.clip(p.querySelector(".no"), Math.max(tIn[k] + 0.05, tw - 0.3), { dir: "l", dur: 0.4 });
      nx.lineRise([p.querySelector(".tx")], Math.max(tIn[k] + 0.1, tw - 0.25));
    });

    /* ---------- beat B: years beside engineers, then years in HR -> I built the system myself ---------- */
    // the row and hlA hold whole through "work." (ends ~tYears - 0.54), so the dimmed bulb and the "repetitive" rest beat read in full
    const tB = tYears - 0.6;
    // hlA (0.25 s at the 1.3x pacing = 0.325 s) is gone by tB + 0.285, the row (0.3 s = 0.39 s, power2.in) is under 5 % by tB + 0.33;
    // beat B's headline and engineers half arrive at tB + 0.34 as the row clears (a clean hand-over, no overlap), so there is never an
    // empty paper frame (the headline zone is shared, so hlA is fully gone before hlB1 shows)
    const tBin = tB + 0.34;
    // all three cards leave together so the fading row keeps its mass centred on x = 960
    nx.out(pains, tB - 0.05, { y: 40, blur: 10, dur: 0.3 });
    nx.out(hlA, tB - 0.04, { y: -20, dur: 0.25 });
    sfx("whoosh", tB);

    // headline = the spoken words, one line per half, in spoken order
    const hlB1 = add(c, `<div class="hl s07-hl c" data-box="s07-hlB1"><span class="line">With years beside engineers</span><span class="line">and years in <em>HR</em></span></div>`);
    const lb1 = hlB1.querySelectorAll(".line");
    // the HR line holds whole through the HR + 0.6 beat, then cuts away fast (0.11 s, unscaled, no mask slice) and is gone
    // before "I built the system myself." becomes visible at tBuilt - 0.14
    const tB1x = tBuilt - 0.26;
    vis(hlB1, tBin, tB1x + 0.11);
    nx.lineRise([lb1[0]], tBin + 0.01);
    nx.lineRise([lb1[1]], tYears2 - 0.2);
    tl.to(hlB1, { y: -14, filter: "blur(4px)", opacity: 0, duration: 0.11, ease: "power2.in", immediateRender: false, fxNoScale: true }, tB1x);

    // two halves 800 x 420 at x 140 | 980 (gap 40). Each holds a header plate + label and one inner window panel 640 x 248.
    // The engineers half arrives centred on "years", fills with code on "engineers", and moves left on the 2nd "years" as the
    // HR half slides in; the 4 hiring steps land on "HR". They close the gap on "built".
    const ROWS = [[0, [[90, "a"], [150, ""], [110, "o"]], 1], [1, [[120, ""], [210, "a"]], 0], [1, [[80, "o"], [170, ""], [130, ""]], 1],
      [2, [[140, "a"], [200, ""]], 0], [1, [[100, ""], [160, "a"], [96, ""]], 1], [0, [[70, "o"], [130, ""], [80, "a"]], 0]];
    const L = add(c, `<div class="hc s07-half l" data-box="s07-L" data-allow="s07-R">
      <div class="hd"><span class="lbl t">Engineers</span></div>
      <div class="ed"><div class="bar"><i></i><i></i><i></i></div><div class="code">${ROWS.map(([ind, tks, ok]) =>
        `<div class="cl"><b></b><span class="tk" style="margin-left:${ind * 32}px">${tks.map(([w, k]) => `<i class="${k}" style="width:${w}px"></i>`).join("")}</span>${ok ? `<s>${icon("check", 18, P.acc3, 2.6)}</s>` : ""}</div>`).join("")}</div></div></div>`);
    const R = add(c, `<div class="hc s07-half r" data-box="s07-R" data-allow="s07-L">
      <div class="hd"><span class="lbl t">HR</span></div>
      <div class="ed"><div class="bar"><i></i><i></i><i></i></div>
      <div class="flow"><svg class="ln" width="568" height="88" viewBox="0 0 568 88"><path d="M44 44H524"/></svg></div></div></div>`);
    nx.plate(L, "code_window", 32, 28, "S", { id: "s07-pL" });
    nx.plate(R, "team_group", 32, 28, "S", { id: "s07-pR" });
    // hiring process left to right: search, contact, interview, offer (4 plates S, step 160, centred in the panel)
    const flow = R.querySelector(".flow");
    const fps = ["magnifier_person", "chat_bubbles", "interview", "handshake"].map((n, i) => nx.plate(flow, n, i * 160, 0, "S", { id: "s07-f" + i }));
    const LC = 420; // L's offset that centres it on x = 960
    tl.fromTo(L, { autoAlpha: 0, x: LC - 120 }, { autoAlpha: 1, x: LC, duration: 0.7, ease: "nx.out" }, tBin - 0.01);
    // the code writes in on "years beside" and is complete (tEng - 0.76 + (0.3 + 5 x 0.03) x SLOW) before the "engineers" rest beat
    nx.clip(L.querySelectorAll(".cl"), tEng - 0.76, { dir: "l", dur: 0.3, stagger: 0.03 });
    tl.fromTo(L, { x: LC }, { x: 0, duration: 0.8, ease: "nx.out", immediateRender: false }, tYears2 - 0.3);
    nx.slide(R, tYears2 + 0.05, { x: 100, dur: 0.7 });
    nx.draw(flow.querySelector(".ln path"), tHR - 0.3, { dur: 0.6 });
    nx.clip(fps, tHR - 0.3, { dir: "b", stagger: 0.08, dur: 0.4 });
    // the wipe is only an entrance: clear each plate at its own scaled end so it keeps its full rim and shadow, like the header plates
    fps.forEach((fp, i) => tl.set(fp, { clipPath: "none" }, wipeEnd(tHR - 0.3 + 0.08 * SLOW * i, 0.4)));
    sfx("whoosh-soft", tBin - 0.01); sfx("tick", tEng - 0.76, -6); sfx("whoosh-soft", tYears2 + 0.05); sfx("tick", tHR - 0.3, -6);

    const hlB = add(c, `<div class="hl s07-hl" data-box="s07-hlB"><span class="line">I built the system <em>myself.</em></span></div>`);
    vis(hlB, tBuilt - 0.14, tSoft - 0.3);
    const inB = nx.lineRise(hlB.querySelectorAll(".line"), tBuilt - 0.12);
    // merge: the halves slide together, a seam lights and the clay system core sits on it
    tl.to(L, { x: 20, duration: 0.8, ease: "nx.inOut", immediateRender: false }, tBuilt - 0.1);
    tl.to(R, { x: -20, duration: 0.8, ease: "nx.inOut", immediateRender: false }, tBuilt - 0.1);
    const seam = add(c, `<i class="s07-seam"></i>`);
    tl.fromTo(seam, { scaleY: 0, autoAlpha: 0 }, { scaleY: 1, autoAlpha: 1, duration: 0.7, ease: "nx.inOut" }, tBuilt + 0.5);
    const core = add(c, `<div class="s07-core" data-box="s07-core" data-allow="s07-L s07-R"><i class="ring"></i></div>`);
    const pCore = nx.plate(core, "workflow_gears", 0, 0, "M", { id: "s07-pCore", tint: "orange" });
    pCore.setAttribute("data-allow", "s07-L s07-R");
    nx.settle(core, tMyself - 0.2, { from: 0.4 });
    // ping kept to 1.3x so the ring stays >= 8 px clear of the half header plates
    nx.ping(core.querySelector(".ring"), tMyself, { scale: 1.3 });
    nx.ping(core.querySelector(".ring"), tPurp - 0.15, { scale: 1.3, dur: 1.0 });
    // a baked-light clay render never spins: it rocks a few degrees so its highlight stays where the light is
    const coreIco = pCore.querySelector(".fx-plate-ico"), ROCK = 1.6;
    tl.fromTo(coreIco, { rotation: 0 }, { rotation: 8, duration: ROCK / 2, ease: "sine.out", immediateRender: false, fxNoScale: true }, tMyself);
    tl.fromTo(coreIco, { rotation: 8 }, { rotation: -8, duration: ROCK, ease: "sine.inOut", repeat: Math.max(0, Math.floor((t1 - tMyself - ROCK / 2) / ROCK) - 1), yoyo: true, immediateRender: false, fxNoScale: true }, tMyself + ROCK / 2);
    sfx("tick", tPurp - 0.15, -6);
    sfx("impact", tBuilt + 0.6, -4); sfx("bloom", tMyself);

    /* ---------- beat C: software carries the routine, people make the decisions ---------- */
    // the old line is fully gone (tSoft - 0.3 + 0.065) before the new one becomes visible (tSoft - 0.22)
    tl.to(inB, { yPercent: -110, duration: 0.3, ease: "power2.in", immediateRender: false }, tSoft - 0.7);
    const hlC = add(c, `<div class="hl s07-hl c" data-box="s07-hlC"><span class="line">Software carries the routine.</span><span class="line"><em>People</em> make the decisions.</span></div>`);
    const lc = hlC.querySelectorAll(".line");
    vis(hlC, tSoft - 0.22);
    nx.lineRise([lc[0]], tSoft - 0.2);
    nx.lineRise([lc[1]], tPeople - 0.25);
    // the halves become Software | People
    const lT = L.querySelector(".t"), rT = R.querySelector(".t");
    const tPv = Math.max(tRout + 0.65, tPeople - 0.3);
    tl.to(lT, { autoAlpha: 0, filter: "blur(6px)", duration: 0.2, ease: "power1.in", immediateRender: false }, tSoft - 0.5); tl.set(lT, { textContent: "Software" }, tSoft - 0.3); tl.to(lT, { autoAlpha: 1, filter: "blur(0px)", duration: 0.3, ease: "nx.out", immediateRender: false }, tSoft - 0.3);
    tl.to(rT, { autoAlpha: 0, filter: "blur(6px)", duration: 0.2, ease: "power1.in", immediateRender: false }, tPv); tl.set(rT, { textContent: "People" }, tPv + 0.2); tl.to(rT, { autoAlpha: 1, filter: "blur(0px)", duration: 0.3, ease: "nx.out", immediateRender: false }, tPv + 0.2);
    nx.out(L.querySelector(".ed"), tSoft - 0.75, { blur: 6, dur: 0.35 });
    // the HR window leaves clean (opacity only, no blur ghost) with the HR label and cross-fades with the arriving person,
    // gone (tPv - 0.45 + 0.52) before the Decisions row wipes in over its old place (both are boxed, so they never overlap in view)
    nx.out(R.querySelector(".ed"), tPv - 0.45, { dur: 0.4 });
    // routine rows (3 x 560 x 64, gap 20) named after the routine just spoken; each carries its clay concept glyph, wipes in
    // inside its own slot (24 px nudge, never free flight), staggered top to bottom, then is auto-checked.
    const items = [["chat_bubbles", "Replies"], ["calendar", "Follow-ups"], ["loop_arrows", "Repetitive work"]];
    const its = items.map(([ic, tx], i) => add(L, `<div class="it" style="left:120px;top:${136 + i * 84}px"><span class="gl"></span><span class="nm">${tx}</span><i class="bar"><i class="fill"></i></i><span class="ok">${icon("check", 20, P.acc3, 2.6)}</span></div>`));
    its.forEach((it, i) => clay(it.querySelector(".gl"), items[i][0], 48, "s07-ig" + i));
    tl.fromTo(its, { x: -24, clipPath: "inset(0% 100% 0% 0%)", autoAlpha: 1 },
      { x: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, stagger: 0.12, ease: "nx.out" }, tSoft - 0.3);
    // clear the wipe once each row is in, so the row shadows are not cut at the row edge
    its.forEach((it, i) => tl.set(it, { clipPath: "none" }, wipeEnd(tSoft - 0.3 + i * 0.12 * SLOW, 0.5)));
    // each routine bar fills blue just before its check lands: the routine is done
    tl.fromTo(L.querySelectorAll(".it .fill"), { scaleX: 0 }, { scaleX: 1, duration: 0.5, stagger: 0.1, ease: "nx.out" }, tRout - 0.4);
    tl.fromTo(L.querySelectorAll(".ok"), { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 1, duration: 0.3, stagger: 0.1, ease: "back.out(2)" }, tRout - 0.2);
    sfx("whoosh-soft", tSoft - 0.3); sfx("tick", tRout - 0.2);
    // the people side mirrors the software rows (slot x 120..680, y 136..368 of the half). One idea per half: the People
    // plate is the team, and its hero is the judgment bulb of card 03 coming back lit (same clay bulb, now upright and in
    // full colour) over one orange Decisions row level with the third routine row. That row is a human choice, not a
    // processed task: no progress bar, no auto check; three options wait and one is picked (orange, ticked) on "decisions".
    // The row arrives with the bulb on "people" with its three neutral options, so the People half is complete (wipe and
    // option pops done) by the "people" rest beat; only the orange pick and its tick wait for "decisions".
    const lit = nx.hero(R, "lightbulb", 308, 104, 184, { id: "s07-lit" });
    const tDw = tPeople - 0.1;
    const dec = add(R, `<div class="it dec" data-box="s07-dec" style="left:120px;top:304px"><span class="gl"></span><span class="nm">Decisions</span>
      <span class="opts"><i class="op"></i><i class="op pick"><i class="ring"></i>${icon("check", 18, "#FFFFFF", 2.8)}</i><i class="op"></i></span></div>`);
    // a person decides: the row glyph is the person, not a second bulb under the lit hero bulb
    const decIc = clay(dec.querySelector(".gl"), "person_bust", 48, "s07-decgl");
    const ops = dec.querySelectorAll(".op"), pick = dec.querySelector(".pick");
    nx.blurIn(lit, tPv + 0.2, { blur: 10, dur: 0.6 });
    tl.fromTo(dec, { clipPath: "inset(0% 100% 0% 0%)", autoAlpha: 0 },
      { clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 1, duration: 0.45, ease: "nx.out" }, tDw);
    tl.set(dec, { clipPath: "none" }, wipeEnd(tDw, 0.45));
    nx.pop(decIc, tDw + 0.05, { dur: 0.35 });
    nx.pop(ops, tDw + 0.12, { stagger: 0.06, dur: 0.3 });
    // the pick: the chosen option fills orange and takes the tick, the other two step back (still solid, just quieter)
    tl.fromTo(pick, { backgroundColor: "#FFFFFF", borderColor: "#CBD5E1" }, { backgroundColor: "#F47E2A", borderColor: "#F47E2A", duration: 0.25, ease: "nx.out", immediateRender: false }, tDec - 0.05);
    tl.fromTo(pick.querySelector("svg"), { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, tDec + 0.05);
    tl.to([ops[0], ops[2]], { opacity: 0.55, duration: 0.3, immediateRender: false }, tDec + 0.05);
    // the lit bulb answers the pick: a small lift, never a spin
    tl.fromTo(lit.querySelector(".fx-hero-ico"), { y: 0 }, { y: -8, duration: 0.5, ease: "sine.out", repeat: 1, yoyo: true, immediateRender: false }, tDec - 0.1);
    // accent ping on the chosen option only (the ring has no fill and is invisible at rest), kept inside the 64 px row
    nx.ping(pick.querySelector(".ring"), tDec + 0.05, { scale: 1.25 });
    nx.ping(pick.querySelector(".ring"), tDec + 1.3, { scale: 1.25 });
    sfx("shimmer", tDec - 0.2);

    out("s07", ({ cur, next }) => nx.T_leak(cur, next, cur.t1, TRANS, { dur: 1.2 }));
  }
