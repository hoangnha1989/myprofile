  /* ===== S12 WHAT CANNOT BE AUTOMATED (gold design): the emotional pivot: slower, softer light. A row of clay machine
     plates from chapter C dims and blurs behind "Not everything should be automated"; the statement shrinks into the
     title. A centred gold card builds the meeting: coffee for a face-to-face talk, the interview table, and three things
     only a meeting reveals (Motivations · Doubts · Leadership) tagged "cannot be automated". On "face to face" the card
     slides left and a twin card (same header system) climbs the ladder Team lead -> Head -> CTO; a handshake settles on "negotiate".
     Exit: T_iris. ===== */
  {
    const [t0, t1] = W("s12");
    const S = scene("s12", { cam: [[t0, 1.0], [t1, 1.03]] });
    const c = S.cam;
    const k = (n) => C("s12", n);
    const tStill = k("still"), tAuto = k("automate"), tHiring = k("hiring"), tSenior = k("senior"), tMeet = k("meeting"),
      tUnder = k("understanding"), tMot = k("motivations"), tDoubt = k("doubts"), tLead = k("lead"), tSoft = k("software"),
      tInt = k("interview"), tFace = k("face"), tTeam = k("team"), tCto = k("ctos"), tListen = k("listen"), tNeg = k("negotiate"),
      tOffer = k("offer");
    const tGo = WT("meet", tCto);
    // a container whose children animate in stays hidden (and out of layout checks) until its entrance
    const gate = (el, at) => tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, fxNoScale: true }, at);

    // warm light: a soft glow that slowly opens behind the whole scene
    const warm = add(c, `<div class="s12-warm"></div>`);
    tl.fromTo(warm, { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 6, ease: "sine.inOut", fxNoScale: true }, t0 + 0.2);

    /* ---- the machines of chapter C step back: one row of equal M plates, centred ---- */
    const MAC = ["ai_agent", "workflow_gears", "loop_arrows", "timesheet", "clock_24", "report_chart"];
    const mac = add(c, `<div class="s12-mac"></div>`);
    const mts = MAC.map((n, i) => nx.plate(mac, n, i * 168, 0, "M", { id: "s12-m" + i }));
    nx.pop(mts, t0 + 0.25, { stagger: 0.06 }); // the whole row has landed before "still"
    // the row keeps humming as one (equal gaps at every frame) until the line turns against automating everything
    nx.float(mac, t0 + 1.2, tSenior, { amp: -6, per: 3.2 });
    tl.to(mts, { autoAlpha: 0.14, filter: "blur(3px)", duration: 1.2, ease: "sine.inOut", immediateRender: false }, tAuto - 0.2);
    // the stage is clear (row gone, title settled) by "senior", when card A opens in the same space
    tl.to(mac, { autoAlpha: 0, duration: 0.6, ease: "sine.inOut", immediateRender: false }, tSenior - 0.8);

    /* ---- the statement ---- */
    const eb = add(c, `<div class="s12-ebw"><span class="eyebrow" data-box="s12-eb">Still, in HR</span></div>`);
    // resolves by tStill + 0.1 so the rest beat after "still" reads clean
    nx.scramble(eb.firstChild, tStill - 0.6, { dur: 0.7 });
    // while "Still, in HR, the most important thing is" plays, the eyebrow sits just above the machine row (no dead band
    // through the middle of the frame), then rises to its title slot before the headline lines come up on "not"
    tl.fromTo(eb, { y: 280 }, { y: 0, duration: 0.55, ease: "nx.inOut" }, tAuto - 1.07);
    sfx("type", tStill - 0.55, -6);
    const hl = add(c, `<div class="hl s12-hl" data-box="s12-hl"><span class="line"><span class="in">Not everything</span></span><span class="line"><span class="in">should be <em>automated.</em></span></span></div>`);
    gate(hl, tAuto - 0.56);
    nx.lineRise(hl.querySelectorAll(".line"), tAuto - 0.55, { dur: 1.1, stagger: 0.3 });
    sfx("whoosh-soft", tAuto - 0.5, -4);
    const sub = add(c, `<div class="s12-subw"><span class="s12-sub" data-box="s12-sub">Hiring is about <em>people.</em></span></div>`);
    gate(sub, tHiring - 0.16);
    nx.chars(sub.firstChild, tHiring - 0.15, { stagger: 0.03, dur: 0.8 });
    // the statement becomes the scene's title (eyebrow and sub clear first)
    tl.to(eb, { autoAlpha: 0, y: -16, filter: "blur(6px)", duration: 0.45, ease: "nx.inOut", immediateRender: false }, tSenior - 0.9);
    tl.to(sub, { autoAlpha: 0, y: -16, filter: "blur(6px)", duration: 0.4, ease: "nx.inOut", immediateRender: false }, tSenior - 0.5);
    tl.to(hl, { scale: 0.6, y: -166, duration: 0.8, ease: "nx.inOut", immediateRender: false }, tSenior - 0.8);

    /* ---- card A: the meeting (centred until "face to face", then slides left) ---- */
    const DX = 430;
    const cA = add(c, `<div class="hc s12-card a" data-box="s12-cardA">
      <div class="s12-hd"><div class="eyebrow">For senior roles</div><div class="bd">Meeting candidates in person</div></div>
      <i class="s12-rule"></i>
      <svg class="s12-lnk" width="740" height="580" viewBox="0 0 740 580" fill="none" stroke="${P.acc}" stroke-width="2.5" stroke-linecap="round">
        <path d="M332 346C364 346 366 220 396 220"/><path d="M332 346C364 346 366 334 396 334"/><path d="M332 346C364 346 366 448 396 448"/></svg>
      <i class="s12-ring"></i></div>`);
    gsap.set(cA, { x: DX });
    // "senior" opens the card with its header plate, eyebrow and rule, so the beat never lands on an empty frame
    nx.blurIn(cA, tSenior, { blur: 16, dur: 0.8 });
    const hd = cA.querySelector(".s12-hd");
    nx.clip(hd.firstElementChild, tSenior, { dir: "l", dur: 0.5 });
    sfx("tick", tSenior, -8);
    tl.fromTo(cA.querySelector(".s12-rule"), { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "nx.inOut" }, tSenior + 0.1);
    const pCof = nx.plate(cA, "coffee_cups", 32, 28, "S", { id: "s12-pCof" });
    nx.settle(pCof, tSenior + 0.1, { from: 0.6, dur: 0.6 }); // the header plate arrives with its card, as on card B
    // the body line arrives with "meeting candidates in person"
    nx.slide(hd.lastElementChild, tMeet - 0.2, { x: -24 });
    // hero centre y 346: it fills the card's lower left and sits clear of every S-plate row (its float only lifts it) the left column balances the row block and tag
    const hero = nx.hero(cA, "interview", 52, 218, 256, { id: "s12-hInt" });
    // the hero rides in with the card on "senior", so card A is never a near-empty shell before "meeting"
    tl.fromTo(hero, { autoAlpha: 0, scale: 0.9, y: 18 }, { autoAlpha: 1, scale: 1, y: 0, duration: 1.1, ease: "nx.out" }, tSenior + 0.2);
    sfx("shimmer", tMeet, -10);
    nx.float(hero, tMeet + 2.0, t1, { amp: -5, per: 4.2 });
    // "truly understanding them": the interview is held in a soft ring
    const ring = cA.querySelector(".s12-ring");
    // while the hero is card A's only content it (and its ring) sits on the card's centre line (card-x 370), then returns to
    // the left column before the first link draws (tMot - 0.35), so the rows never meet it
    tl.fromTo([hero, ring], { x: 190 }, { x: 0, duration: 0.8, ease: "nx.inOut" }, tMot - 1.15);
    nx.ping(ring, tUnder - 0.1, { scale: 1, dur: 1.6 });
    nx.ping(ring, tUnder + 0.9, { scale: 1, dur: 1.6 });

    /* ---- what only a meeting reveals: three equal rows, in spoken order ---- */
    const LB = [["Motivations", "lightbulb", tMot], ["Doubts", "chat_bubbles", tDoubt], ["Leadership", "team_group", tLead]];
    const lnk = cA.querySelectorAll(".s12-lnk path");
    const rows = LB.map(([txt, ico, at], i) => {
      const y = 176 + i * 114;
      const pl = nx.plate(cA, ico, 404, y, "S", { id: "s12-pl" + i });
      const lb = add(cA, `<div class="s12-lb" style="top:${y + 26}px" data-box="s12-lb${i}">${txt}</div>`);
      const pr = add(cA, `<i class="s12-pr" style="top:${y}px"></i>`);
      nx.draw(lnk[i], at - 0.35, { dur: 0.6 });
      nx.settle(pl, at - 0.2, { from: 0.6, dur: 0.7 });
      nx.blurIn(lb, at - 0.1, { blur: 10, dur: 0.8 });
      sfx("pop", at - 0.15, -10);
      return { pl, lb, pr };
    });
    const tag = add(cA, `<div class="s12-tag" data-box="s12-tag">Cannot be automated</div>`);
    nx.settle(tag, tSoft - 0.2, { from: 0.6, dur: 0.8 });
    sfx("tick", tSoft - 0.1);

    /* ---- face to face, from team leads to CTOs: card A makes room for card B ---- */
    tl.to(cA, { x: 0, duration: 1.2, ease: "nx.inOut", immediateRender: false }, tInt);
    sfx("whoosh-soft", tInt, -4);
    // twin header: S plate + eyebrow + body + rule, the same system as card A
    const cB = add(c, `<div class="hc s12-card b" data-box="s12-cardB">
      <div class="s12-hd"><div class="eyebrow">Face to face</div><div class="bd">From team leads to CTOs</div></div>
      <i class="s12-rule"></i>
      <svg class="s12-lad" width="740" height="580" viewBox="0 0 740 580" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path class="base" d="M46 432H262V376H478V320H694" stroke="${P.line2}" stroke-width="3"/>
        <path class="lit" d="M46 432H262V376H478V320H694" stroke="${P.acc}" stroke-width="3"/></svg></div>`);
    // card B travels in with card A's move so the right half is never empty; its header builds on "face"
    // card B rides card A's move (same ease and clock, from x 160 so its right edge stays in frame) and fades in once card A
    // has cleared it, so the right half is never empty and the 120 px gap never closes
    tl.fromTo(cB, { x: 160 }, { x: 0, duration: 1.2, ease: "nx.inOut" }, tInt);
    // it shows at tB with its header plate settled and its rule + base tread already drawing (never an empty ghost), early
    // enough to balance card A as it lands on the left
    const tB = tInt + 0.8;
    tl.fromTo(cB, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: "sine.out" }, tB);
    const hdB = cB.querySelector(".s12-hd");
    const pStep = nx.plate(cB, "rising_steps", 32, 28, "S", { id: "s12-pStep" });
    nx.settle(pStep, tB - 0.4, { from: 0.6, dur: 0.6 }); // settled (inside the still-hidden card) by the time card B shows
    // the beat's own title builds as the card lands, so card B is never an empty ghost
    // eyebrow leads the spoken "face" by 0.25 s; base ladder draws with the header
    nx.clip(hdB.firstElementChild, Math.max(tB, tFace - 0.25), { dir: "l", dur: 0.5 });
    tl.fromTo(cB.querySelector(".s12-rule"), { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "nx.inOut" }, tB);
    nx.draw(cB.querySelector(".base"), tB, { dur: 1.0 });
    nx.slide(hdB.lastElementChild, tTeam - 0.3, { x: -24 });
    // three equal treads (216 px), each plate centred on its tread, its label 16 px above it
    // the ladder climbs with the spoken "team leads ... CTOs": during "face to face" only the eyebrow, rule and base tread build
    const tMid = (tTeam + tCto) / 2;
    const STEP = [["Team lead", "person_bust", 154, 432, tTeam - 0.1], ["Head", "manager", 370, 376, tMid], ["CTO", "star_award", 586, 320, tCto - 0.15]];
    STEP.forEach(([txt, ico, cx, ty, at], i) => {
      const pl = nx.plate(cB, ico, cx - 44, ty - 100, "S", { id: "s12-st" + i, tint: i === 2 ? "orange" : "blue" });
      const lb = add(cB, `<div class="s12-stl${i === 2 ? " top" : ""}" style="left:${cx - 100}px;top:${ty - 152}px" data-box="s12-stl${i}">${txt}</div>`);
      nx.pop(pl, at, { dur: 0.6 });
      nx.slide(lb, at + 0.1, { y: 14, x: 0 });
      sfx("tick", at + 0.15, -6);
    });
    // the lit line climbs tread by tread with its step (tread ends at 216/760, 488/760 and 760/760 of the path)
    const lit = cB.querySelector(".lit");
    tl.fromTo(lit, { drawSVG: "0%" }, { drawSVG: "28.4%", duration: 0.45, ease: "sine.inOut", fxNoScale: true }, STEP[0][4]);
    tl.to(lit, { drawSVG: "64.2%", duration: 0.3, ease: "sine.inOut", fxNoScale: true, immediateRender: false }, STEP[1][4] - 0.05);
    tl.to(lit, { drawSVG: "100%", duration: 0.35, ease: "sine.inOut", fxNoScale: true, immediateRender: false }, STEP[2][4] - 0.05);

    /* ---- go to meet them, listen to what drives them, negotiate in person ---- */
    nx.ping(ring, tGo - 0.1, { scale: 1, dur: 1.6 });
    nx.ping(rows[0].pr, tListen - 0.1, { scale: 1.5, dur: 1.4 });
    nx.ping(rows[0].pr, tListen + 0.8, { scale: 1.5, dur: 1.4 });
    tl.to(rows[0].lb, { color: P.acc2, duration: 0.6, immediateRender: false }, tListen - 0.1);
    // handshake + chip: one centred row along the card's foot
    const ngr = add(cB, `<div class="s12-ngr"></div>`);
    const pShake = nx.plate(ngr, "handshake", 0, 0, "S", { id: "s12-pShake", tint: "orange" });
    const shr = add(pShake, `<i class="s12-shr"></i>`);
    nx.settle(pShake, tNeg - 0.2, { from: 0.5, dur: 0.9 });
    nx.ping(shr, tNeg + 0.3, { scale: 1.6, dur: 1.4 });
    sfx("bloom", tNeg - 0.1, -4);
    const neg = add(ngr, `<div class="chip acc s12-neg" data-box="s12-neg">In-person negotiation</div>`);
    nx.clip(neg, tOffer - 0.4, { dir: "l", dur: 0.8 });

    out("s12", ({ cur, next }) => nx.T_iris(cur, next, cur.t1, { dur: 1.1, cx: 960, cy: 470 }));
  }
