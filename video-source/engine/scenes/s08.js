  /* ===== S08 MANY ACCOUNTS, ONE AI RECRUITER (gold pass) : hero: one clay laptop holding many accounts sits in the centre,
     8 account plates sign in around it on an even ellipse and grow a candidate network; the laptop becomes the clay AI
     agent, whose screening questions travel through an account to candidates in EN / VI / JA / KO while a 24 h ring
     sweeps; the contacted dots lock (never twice); every dot lights (no one missed); 1 recruiter plate becomes a whole team row.
     App showcase (round 3): four cropped app screens slam in big (1600 px wide), one at a time and spread over the scene
     (starting 0.6 s before "many", "AI", "trained", "contacted", so each is fully big and opaque about 0.15 s before its word), are big for 1.2 s, then dock into ONE right-hand
     strip (x 1528..1808, 4 x 124 px, 16 px gaps, y 240..784) and stay there. The sign-in, the morph, the network, the
     screening questions and the locks play bare between slams; the headline zone fades out under each big card.
     Layout: the stage content is centred on x 788 (zone 80..1496) to make room for that strip: headline y 132..264,
     hub y 280..736 around (788, 512), bottom row y 744..872 (cards only). Exit: zoom-through. ===== */
  {
    const [t0, t1] = W("s08");
    const S = scene("s08", { cam: [[t0, 1.0], [t1, 1.045]] });
    const c = S.cam;
    const k = (n) => C("s08", n);
    const tFirst = k("first"), tSigns = k("signs"), tMany = k("many"), tAcc = k("accounts"), tScreen = k("screen"),
      tAgent = k("agent"), tNet = k("network"), tAll = k("all"), tTrained = k("trained"), tReply = k("reply"), tReal = k("real"),
      tDay = k("day"), tAny = k("any"), tNoCand = k("nocand"), tContacted = k("contacted"), tTwice = k("twice"),
      tPurpose = k("purpose"), tMissed = k("missed"), tOne = k("one"), tTeam = k("team"),
      tApp = k("app"), tAgent2 = k("agent2"), tNo2 = k("no2"), tKept = k("kept"), tReaches = k("reaches"), tWhole = k("whole");
    const ev = (v) => Math.round(v / 2) * 2;        // 2 px grid for every computed left/top

    // app showcase schedule (computed first: the hub beats around each slam are timed from it). A slam is big for
    // 0.5 s + hold, flies at tFly and is docked at tFly + 0.7 (nx.showcase, real seconds). One slam at a time, spread over
    // the scene: "app" (the account manager), the pause after "screen" (the persona the agent runs), "network" (the
    // connect log), and the end of "twice" (the reply log, in the gap before "The purpose?").
    // Each slam starts LEAD s before its naming word: the 0.45 s opacity fade (below) and the 0.5 s scale settle are done
    // about 0.15 s before the word. It is big for 1.2 s; the next one waits >= 0.8 s after the dock.
    const HOLD = 1.2, LEAD = 0.6, SL = [];
    const slot = (at, hold) => { const p = SL.length ? SL[SL.length - 1].tDock + 0.8 : at; at = Math.max(at, p);
      const r = { at, hold, tFly: at + 0.5 + hold }; r.tDock = r.tFly + 0.7; SL.push(r); return r; };
    const tAI = k("ai");
    // "many recruiter accounts" (account manager) · "AI agent" (persona) · "trained to reply" (reply log) · "contacted" (connect log)
    const S1 = slot(tMany - LEAD, HOLD), S2 = slot(tAI - LEAD, HOLD), S3 = slot(tTrained - LEAD, HOLD), S4 = slot(tContacted - LEAD, HOLD);

    // visibility gate for masked containers (their inner lines are hidden by the mask, the box itself must be too)
    const gate = (el, tin, tout) => {
      tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, fxNoScale: true }, tin);
      if (tout != null) tl.to(el, { autoAlpha: 0, duration: 0.01, immediateRender: false, fxNoScale: true }, tout);
    };

    /* ---------------- hub (centre stage) ---------------- */
    const MX = 788, HX = 720, HY = 232;   // stage centre x (zone 80..1496); hub box = x 68..1508, y 280..736; centre (788, 512)
    const hub = add(c, `<div class="s08-hub" data-box="s08-hub" style="left:${MX - HX}px"></div>`);
    const svg = add(hub, `<svg class="s08-svg" width="1440" height="456" viewBox="0 0 1440 456"><g class="net"></g><g class="spk"></g><g class="ring"></g></svg>`);
    const gNet = svg.querySelector(".net"), gSpk = svg.querySelector(".spk"), gRing = svg.querySelector(".ring");
    const sv = (g, s) => { g.insertAdjacentHTML("beforeend", s); return g.lastElementChild; };

    // 8 account plates (one size, S) on an even ellipse, 45 deg apart, mirrored left / right
    const AV = [];
    for (let i = 0; i < 8; i++) {
      const a = (-90 + 22.5 + i * 45) * Math.PI / 180, x = HX + ev(330 * Math.cos(a)), y = HY + ev(172 * Math.sin(a));
      const sp = sv(gSpk, `<line x1="${HX}" y1="${HY}" x2="${x}" y2="${y}"/>`);
      AV.push({ x, y, sp });
    }
    // 4 reply targets (spoken order EN, VI, JA, KO), mirrored pairs 400 px either side of the agent and 100 px above / below
    // it, clear of the side plates (their outer edge is 348 px out); each gets a lock badge on "twice".
    // The popups are the screening questions the agent asks (two or three short lines, sized to the text, at most 300 px wide).
    const TG = [[1, -1, "en", ["Years of AI / LLM", "experience?"]], [1, 1, "vi", ["Anh/chị có bao nhiêu", "năm kinh nghiệm", "AI/LLM?"]],
      [-1, 1, "ja", ["AI・LLMのご経験は", "何年ですか？"]], [-1, -1, "ko", ["어떤 프로젝트에서", "어떤 역할을", "맡으셨나요?"]]]
      .map(([sx, sy, lg, txt]) => ({ x: HX + sx * 400, y: HY + sy * 100, lg, txt }));
    // popup footprint (outward of the dot, above for upper targets, below for lower ones; at most 330 x 108) kept free of dots:
    // the popup edge sits 22 px past the dot; keep >= 8 px air plus the largest dot radius (7) around it
    const BW = 330, BH = 108;
    TG.forEach((t) => {
      const right = t.x > HX, up = t.y < HY;
      t.bx0 = right ? t.x - 40 : t.x - BW - 16; t.bx1 = right ? t.x + BW + 16 : t.x + 40;
      t.by0 = up ? t.y - 20 - BH - 16 : t.y + 4; t.by1 = up ? t.y - 4 : t.y + 20 + BH + 16;
    });
    // candidate dots in an outer elliptical band (seeded), clear of plates, the ring and the bubbles
    const R = nx.rng(808), DOTS = [];
    for (let i = 0; i < 150 && DOTS.length < 64; i++) {
      const a = R() * Math.PI * 2, f = R();
      const x = HX + (392 + 168 * f) * Math.cos(a), y = HY + (176 + 50 * f) * Math.sin(a);
      if (y < 10 || y > 446 || x < 24 || x > 1416) continue;
      if (AV.some((v) => Math.abs(v.x - x) < 66 && Math.abs(v.y - y) < 66)) continue;
      if (TG.some((t) => Math.hypot(t.x - x, t.y - y) < 60 || (x > t.bx0 && x < t.bx1 && y > t.by0 && y < t.by1))) continue;
      if (DOTS.some((d) => Math.hypot(d.x - x, d.y - y) < 22)) continue;
      DOTS.push({ x, y, r: 4 + R() * 3 });
    }
    TG.forEach((t) => DOTS.push({ x: t.x, y: t.y, r: 8, tg: t }));
    DOTS.forEach((d) => {
      let best = AV[0], bd = 1e9;
      AV.forEach((v) => { const q = Math.hypot(v.x - d.x, v.y - d.y); if (q < bd) { bd = q; best = v; } });
      d.av = best;
      d.ln = sv(gNet, `<line x1="${best.x}" y1="${best.y}" x2="${d.x}" y2="${d.y}"/>`);
      d.el = add(hub, `<div class="s08-dot"${d.tg ? ' data-tg="1"' : ""} style="left:${d.x - d.r}px;top:${d.y - d.r}px;width:${2 * d.r}px;height:${2 * d.r}px"></div>`);
      d.dist = Math.hypot(d.x - HX, d.y - HY) + (d.tg ? 0 : R() * 40);
      if (d.tg) d.tg.dot = d;
    });
    AV.forEach((v, i) => { v.el = nx.plate(hub, "profile_stack", v.x, v.y, "S", { id: `s08-acc${i}`, anchor: "center" }); });

    // 24 h ring around the hero: ticks + an accent sweep + label
    const RR = 124;
    for (let i = 0; i < 24; i++) {
      const a = i * 15 * Math.PI / 180, r0 = i % 6 ? RR - 6 : RR - 12;
      sv(gRing, `<line class="tk" x1="${HX + r0 * Math.sin(a)}" y1="${HY - r0 * Math.cos(a)}" x2="${HX + RR * Math.sin(a)}" y2="${HY - RR * Math.cos(a)}"/>`);
    }
    const ringBase = sv(gRing, `<circle class="base" cx="${HX}" cy="${HY}" r="${RR}"/>`);
    const sweep = sv(gRing, `<circle class="sweep" cx="${HX}" cy="${HY}" r="${RR}" transform="rotate(-90 ${HX} ${HY})"/>`);
    const r24 = add(hub, `<div class="s08-24 num" data-box="s08-24" style="left:${HX - 50}px;top:${HY + RR + 10}px">24 h</div>`);

    // hero: the one screen with many accounts, which becomes the AI agent (same place, crossfade)
    const HP = 184;
    const heroL = nx.hero(hub, "laptop_accounts", HX, HY, HP, { id: "s08-heroL", anchor: "center" });
    const heroA = nx.hero(hub, "ai_agent", HX, HY, HP, { id: "s08-heroA", anchor: "center" });
    heroL.setAttribute("data-allow", "s08-heroA"); heroA.setAttribute("data-allow", "s08-heroL");
    const spulse = add(hub, `<i class="s08-pulse" style="left:${HX - 100}px;top:${HY - 100}px"></i>`);

    // reply bubbles at the 4 targets, tail corner on the dot side
    TG.forEach((t) => {
      const right = t.x > HX, up = t.y < HY;
      const b = add(hub, `<div class="s08-bub ${right ? "l" : "r"}${up ? "" : " dn"}" data-box="s08-bub-${t.lg}"><span class="lg">${t.lg.toUpperCase()}</span>` +
        `<span class="tx">${t.txt.map((s) => `<span>${s}</span>`).join("")}</span></div>`);
      // the popup grows away from its dot: upper popups are pinned by their bottom edge, lower ones by their top edge
      if (up) b.style.bottom = (456 - (t.y - 20)) + "px"; else b.style.top = (t.y + 20) + "px";
      if (right) b.style.left = (t.x - 22) + "px"; else b.style.right = (1440 - t.x - 22) + "px";
      t.b = b;
      t.p = add(hub, `<i class="s08-pls" style="left:${HX - 7}px;top:${HY - 7}px"></i>`);
    });
    const lockT = TG[0];
    // every contacted candidate is sealed by a small orange lock badge on its own dot (56 px, clearly not an account plate)
    const LK = 56;
    const lockRp = add(hub, `<i class="s08-lockrp" style="left:${lockT.x - 40}px;top:${lockT.y - 40}px"></i>`);
    TG.forEach((t) => {
      t.lk = add(hub, `<div class="s08-lk" data-box="s08-lock-${t.lg}" style="left:${t.x - LK / 2}px;top:${t.y - LK / 2}px">` +
        `<img alt="" decoding="sync" src="${nx.ICON("vault_lock")}"/></div>`);
    });
    const avB = AV[2];                              // a second account (right, lower) tries the same candidate
    const p2 = add(hub, `<i class="s08-pls" style="left:${avB.x - 7}px;top:${avB.y - 7}px"></i>`);
    // the attempt stops 52 px short of the lock centre (outside the 56 px badge)
    const lkD = Math.hypot(lockT.x - avB.x, lockT.y - avB.y), lkS = (lkD - 52) / lkD;

    /* ---------------- headline zone (centred) ---------------- */
    // one wrapper for the headlines: it fades out under every app slam (the 1600 px card top sits at y 146, below the
    // headline zone, so the dimmed glyph tops would peek out above it) and back in as the card flies to its slot
    const hlz = add(c, `<div class="s08-hlz"></div>`);
    const hO = add(hlz, `<div class="hl s08-hl s08-h1" data-box="s08-hO">The <em>first thing</em> I built</div>`);
    const hA = add(hlz, `<div class="hl s08-hl" data-box="s08-hA"><span class="line">Many accounts,</span><span class="line"><em>one screen.</em></span></div>`);
    const hB = add(hlz, `<div class="hl s08-hl" data-box="s08-hB"><span class="line">Replies like</span><span class="line">a <em>real recruiter.</em></span></div>`);
    // each line rises whole, so a line alone on screen is always centred
    const hC1 = add(hlz, `<div class="hl s08-hl" data-box="s08-hC1"><span class="line">No good candidate</span><span class="line">is missed or <em>kept waiting.</em></span></div>`);
    const hC2 = add(hlz, `<div class="hl s08-hl" data-box="s08-hC2"><span class="line">One recruiter</span><span class="line">reaches as far as <em>a whole team.</em></span></div>`);

    /* ---------------- bottom row (centred, y 744..872): cards only, the captions carry the spoken line ---------------- */
    const CW = 440, CG = 24, CX0 = MX - (3 * CW + 2 * CG) / 2, CT = 744, PI = 20;   // card 128 px, plate inset 20 px
    // the row wrapper slides so the cards that have landed are always centred (1 card, 2 cards, 3 cards)
    const rowW = add(c, `<div class="s08-roww"></div>`);
    const rows = [["clock_24", "Day and night", "24/7"], ["globe_languages", "EN · VI · JA · KO", "Any language"], ["vault_lock", "Contacted", "Never twice"]]
      .map(([ic, tag, tx], i) => {
        const card = add(rowW, `<div class="hc s08-card" data-box="s08-row${i}" style="left:${CX0 + i * (CW + CG)}px;top:${CT}px;width:${CW}px">` +
          `<div class="txt"><span class="tag">${tag}</span><span class="tx">${tx}</span></div></div>`);
        const pl = nx.plate(card, ic, PI, PI, "S", { id: `s08-row${i}-ic`, tint: i === 2 ? "orange" : "blue" });
        return { card, pl };
      });
    // kept waiting: one centred card holds the bottom row between the agent cards and the team row
    const kept = add(c, `<div class="hc s08-card" data-box="s08-kept" style="left:${MX - CW / 2}px;top:${CT}px;width:${CW}px">` +
      `<div class="txt"><span class="tag">Kept waiting</span><span class="tx">No candidate</span></div></div>`);
    const keptPl = nx.plate(kept, "stopwatch", PI, PI, "S", { id: "s08-kept-ic", tint: "orange" });
    // team row: 7 plates, the one recruiter (orange) holds the centre, the team fans out on both sides
    const TS = 116, TN = 7, TM = 3, TX0 = MX - (TN * 88 + (TN - 1) * 28) / 2;
    const figs = [];
    for (let i = 0; i < TN; i++) figs.push(nx.plate(c, i === TM ? "manager" : "person_bust", TX0 + i * TS, CT + PI, "S", { id: `s08-team${i}`, tint: i === TM ? "orange" : "blue" }));

    // headline hand-offs: the outgoing headline is gone (0.45 s exit) exactly when the incoming one rises
    const XO = 0.47;
    gate(hO, tFirst - 0.2, tMany - 0.21); gate(hA, tMany - 0.2, tReply - 0.31); gate(hB, tReply - 0.3, tNo2 - 0.21);
    gate(hC1, tNo2 - 0.2, tOne - 0.21); gate(hC2, tOne - 0.2);
    nx.clip(hO, tFirst - 0.2, { dir: "l", dur: 0.9 });     // clip, not chars: split chars would drop the em gradient text
    nx.out(hO, tMany - 0.2 - XO, { y: -20, blur: 6 });

    /* ---------------- beat A: accounts sign in to one screen ---------------- */
    nx.blurIn(heroL, t0 + 0.35, { blur: 16, scale: 1.3, dur: 1.0 });
    nx.ping(spulse, t0 + 0.55, { scale: 1.5, dur: 1.3 });
    nx.ping(spulse, tFirst + 0.2, { scale: 1.4 });
    nx.ping(spulse, tApp - 0.1, { scale: 1.5 });
    // mirrored pairs sign in together (top to bottom) so each row stays even while it pops; the slam on "many" covers
    // "recruiter accounts", so the plates pop the moment the first app card (the account manager) starts to fly
    const tSign = S1.tFly;
    nx.pop(AV.map((v) => v.el), tSign, { stagger: (i) => Math.min(i, 7 - i) * 0.08, dur: 0.42 });
    sfx("pop", tSign + 0.12);
    nx.draw(AV.map((v) => v.sp), tSign + 0.07, { dur: 0.7, stagger: 0.05 });
    tl.to(AV.map((v) => v.sp), { stroke: P.acc, duration: 0.4, stagger: 0.04, immediateRender: false }, tAcc - 0.2);
    sfx("tick", tAcc);
    const [l1, l2] = hA.querySelectorAll(".line");
    nx.lineRise([l1], S1.tFly + 0.35);
    nx.lineRise([l2], Math.max(tScreen - 0.3, S1.tFly + 0.75));
    nx.ping(spulse, tScreen + 0.1, { scale: 1.5 });

    // the screen becomes the agent, the network grows from every account
    // on "uses an", just before the second app card (the persona the agent runs) slams in on "AI"
    const tMorph = S2.at - 0.6;
    tl.to(heroL, { autoAlpha: 0, scale: 0.8, filter: "blur(6px)", duration: 0.35, ease: "power2.in", immediateRender: false }, tMorph);
    nx.settle(heroA, tMorph + 0.3, { from: 0.6 });
    sfx("bloom", tMorph + 0.3);
    const near = DOTS.slice().sort((a, b) => a.dist - b.dist);
    // the network grows "across all of them" as the persona card flies to its slot
    const tGrow = S2.tFly + 0.1;
    nx.draw(near.map((d) => d.ln), tGrow, { dur: 0.6, stagger: 0.004 });
    tl.fromTo(near.map((d) => d.el), { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.35, stagger: 0.004, ease: "back.out(2)" }, tGrow + 0.1);
    sfx("shimmer", tGrow + 0.1);
    tl.to(near.map((d) => d.el), { backgroundColor: "#94A3B8", duration: 0.3, stagger: 0.004, immediateRender: false }, tGrow + 0.9);
    nx.float(heroA, tAgent + 0.6, t1, { amp: 5, per: 3.8 });

    /* ---------------- beat B: replies like a real recruiter, 24/7, any language, never twice ---------------- */
    nx.out(hA, tReply - 0.3 - XO, { y: -24, blur: 6 });
    const [m1, m2] = hB.querySelectorAll(".line");
    // the third slam (the reply log, on "trained") is big until "real": the headline rises as it flies (up by "recruiter")
    const tRep = S3.tFly + 0.1;
    nx.lineRise([m1], tRep);
    nx.lineRise([m2], tRep + 0.4);
    tl.to(near.map((d) => d.el), { autoAlpha: 0.45, duration: 0.5, immediateRender: false }, tReply + 0.2);
    tl.to(gNet, { opacity: 0.45, duration: 0.5, immediateRender: false }, tReply + 0.2);
    // replies: a pulse leaves the agent, passes through an account, the bubble pops at the candidate
    const rep = (t, at) => {
      const v = t.dot.av;
      tl.fromTo(t.p, { x: 0, y: 0, autoAlpha: 0 }, { x: v.x - HX, y: v.y - HY, autoAlpha: 1, duration: 0.3, ease: "nx.inOut", fxNoScale: true }, at - 0.6);
      tl.to(t.p, { x: t.x - HX, y: t.y - HY, duration: 0.3, ease: "nx.inOut", immediateRender: false, fxNoScale: true }, at - 0.3);
      tl.to(t.p, { autoAlpha: 0, duration: 0.15, immediateRender: false, fxNoScale: true }, at);
      tl.to(t.dot.el, { backgroundColor: P.acc2, autoAlpha: 1, boxShadow: "0 0 0 5px rgba(224,110,32,.16)", duration: 0.3, immediateRender: false }, at);
      // slides out of its dot at full size (no scale: the question is readable from its first frame)
      nx.slide(t.b, at, { x: 0, y: t.y < HY ? 12 : -12, dur: 0.45 });
      sfx("pop", at);
    };
    // the four screening questions pop one after another (0.5 s apart) once the scrim has cleared the hub, each readable
    // >= 1.2 s; EN and VI have settled before the 24 h ring starts
    const tQ = S3.tFly + 0.3;
    TG.forEach((t, i) => rep(t, tQ + i * 0.5));
    // day and night: the 24 h ring sweeps once
    tl.fromTo([ringBase, ...gRing.querySelectorAll(".tk")], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, stagger: 0.01, immediateRender: true }, tDay - 0.1);
    tl.fromTo(sweep, { drawSVG: "0%" }, { drawSVG: "100%", duration: 2.6, ease: "none", fxNoScale: true }, tDay + 0.2);
    nx.blurIn(r24, tDay + 0.3, { blur: 8 });
    gsap.set(gRing, { svgOrigin: `${HX} ${HY}` });
    nx.spin(gRing, tDay + 3.0, t1, 30);
    // the three agent cards land left to right in spoken order
    nx.slide(rows[0].card, tDay - 0.15, { x: 0, y: 8 });
    nx.slide(rows[1].card, tAny - 0.15, { x: 0, y: 8 });
    // never twice: the lock beat plays on "no candidate is ever", before the fourth slam (the connect log, on "contacted"),
    // which then reads as its proof: the third card lands, a second account's attempt is stopped by the lock, the other
    // three locks follow, all settled before the slam starts
    const tLock = Math.min(tNoCand - 0.15, S4.at - 0.9);
    nx.slide(rows[2].card, tLock - 0.2, { x: 0, y: 8 });
    rows.forEach((r, i) => nx.settle(r.pl, [tDay, tAny, tLock][i], { from: 0.6 }));
    tl.fromTo(rowW, { x: CW + CG }, { x: (CW + CG) / 2, duration: 0.7, ease: "nx.inOut", fxNoScale: true }, tAny - 0.15);
    tl.to(rowW, { x: 0, duration: 0.7, ease: "nx.inOut", immediateRender: false, fxNoScale: true }, tLock - 0.2);
    sfx("whoosh-soft", tDay - 0.2);
    // each screening question has been asked when its candidate is sealed: it fades just before its own lock lands (the
    // 56 px badge would reach 8 px into the popup edge)
    TG.forEach((t, i) => tl.to(t.b, { autoAlpha: 0, y: t.y < HY ? -10 : 10, duration: 0.3, ease: "sine.inOut", immediateRender: false },
      (i ? tLock + 0.15 + (i - 1) * 0.1 : tLock) - 0.35));
    tl.fromTo(p2, { x: 0, y: 0, autoAlpha: 0 }, { x: (lockT.x - avB.x) * lkS, y: (lockT.y - avB.y) * lkS, autoAlpha: 1, duration: 0.7, ease: "nx.inOut", fxNoScale: true }, tLock - 0.1);
    nx.settle(lockT.lk, tLock, { from: 0.5, dur: 0.5 });
    nx.ping(lockRp, tLock + 0.55, { scale: 1.25 });
    tl.to(p2, { autoAlpha: 0, scale: 0.2, duration: 0.25, immediateRender: false, fxNoScale: true }, tLock + 0.6);
    // the other three contacted candidates lock as well, in spoken order
    nx.settle(TG.slice(1).map((t) => t.lk), tLock + 0.15, { from: 0.5, dur: 0.5, stagger: 0.1 });
    sfx("tick", tLock + 0.55);

    /* ---------------- beat C: nobody missed, one recruiter = a whole team ---------------- */
    // "real recruiter" leaves under the fourth slam (the headline zone is faded out then), so when the zone returns as the
    // card flies, "No good candidate" rises into an empty zone (an exit on tNo2 still ran under the rising line)
    nx.out(hB, Math.min(tNo2 - 0.2 - XO, S4.tFly - 0.5), { y: -24, blur: 6 });
    // the agent cards fade out with the headline zone under the fourth slam (its 1600 px card ends at y 854, the row
    // reaches 872), return with the third card, then sink (never into the hub) before "kept waiting" takes the centre slot
    nx.out(rows.map((r) => r.card), tMissed - 0.25, { y: 8, blur: 6, stagger: 0.04 });
    nx.slide(kept, tKept - 0.1, { x: 0, y: 8 });
    nx.settle(keptPl, tKept, { from: 0.6 });
    nx.out(kept, tOne - 0.2 - XO + 0.07, { y: 8, blur: 6 });
    const [c1, c2] = hC1.querySelectorAll(".line");
    nx.lineRise([c1], Math.max(tNo2 - 0.2, S4.tFly));
    nx.lineRise([c2], tMissed - 0.25);
    tl.to(gNet, { opacity: 1, duration: 0.6, immediateRender: false }, tMissed - 0.5);
    tl.to(gNet.querySelectorAll("line"), { stroke: "rgba(37,161,219,.5)", duration: 0.6, stagger: 0.006, immediateRender: false }, tMissed - 0.5);
    tl.to(near.map((d) => d.el), { autoAlpha: 1, backgroundColor: (i, el) => (el.dataset.tg ? P.acc2 : P.acc), duration: 0.4, stagger: 0.012, immediateRender: false }, tMissed - 0.4);
    sfx("shimmer", tMissed - 0.3);
    tl.to(hC1.querySelectorAll(".line"), { autoAlpha: 0, y: -30, filter: "blur(6px)", duration: 0.45, stagger: 0.04, ease: "power2.in", immediateRender: false }, tOne - 0.2 - XO - 0.04);
    const [d1, d2] = hC2.querySelectorAll(".line");
    nx.lineRise([d1], tOne - 0.2);
    nx.lineRise([d2], tReaches - 0.25);
    // the one recruiter plate lands in the centre and stays there; the team fans out from it on both sides
    nx.blurIn(figs[TM], tOne + 0.2, { blur: 10, scale: 1.2 });
    const mates = figs.filter((f, i) => i !== TM), mIdx = [0, 1, 2, 4, 5, 6];
    // each mate pops in its own final slot (no travel), outward from the centre: 2/4, then 1/5, then 0/6
    // (focus-in at full size, so the row keeps one plate size and one gap at every frame)
    tl.fromTo(mates, { autoAlpha: 0, filter: "blur(10px)" },
      { autoAlpha: 1, filter: "blur(0px)", duration: 0.45, stagger: (i) => (Math.abs(TM - mIdx[i]) - 1) * 0.12, ease: "nx.out" }, tTeam - 0.45);
    sfx("whoosh", tTeam - 0.45);
    nx.ping(spulse, tTeam, { scale: 1.6 });
    tl.to(heroA, { scale: 1.04, duration: 0.6, ease: "nx.out", immediateRender: false }, tTeam - 0.2);

    /* ---------------- app showcase: slam big on the naming word, hold, dock into the right strip (added last: the scrim
       of each slam dims everything built before it, including the thumbs already docked) ---------------- */
    // crops ([x, y, w] in image px; the height follows the 277 x 111 view) keep only the data tables: no sidebar, no product
    // name, no third-party name in frame
    // thumb 280 x 124 (3 px border + 10 px bar + 111 px view), 16 px gaps, strip centred on the hub mid-line (y 240..784);
    // the slam scales it 1600 / 280 = 5.71x: a 1600 x 709 card (y 146..854, clear of the caption band)
    const SW = 280, SVH = 111, SH = 124, SX = 1528, ST = 240, SG = 140;
    const shows = [];
    const showC = (file, iw, crop, S) => {
      const [cx, cy, cw, bg, mx] = crop, i = shows.length, sc = (SW - 3) / cw, at = S.at;
      const r = nx.showcase(c, file, at, { slot: { x: SX, y: ST + i * SG, w: SW }, ar: (SH - 22) / SW, big: 1600, hold: S.hold, id: `s08-app${i}` });
      const img = r.el.querySelector("img");
      const view = h(`<div style="position:relative;height:${SVH}px;overflow:hidden${bg ? `;background:${bg}` : ""}"></div>`);
      img.replaceWith(view); view.appendChild(img);
      img.setAttribute("style", `position:absolute;left:${-cx * sc}px;top:${-cy * sc}px;width:${iw * sc}px;max-width:none;height:auto` +
        (mx ? `;clip-path:inset(0 0 0 ${mx * sc}px)` : ""));
      // softer fade-in of the scrim and the card (the helper's power-out opacity made the first slam frame pop: a JUMP in the
      // frame-jerk scan); added after the helper's tweens on the same start, so these opacity values render last and win
      const scrim = r.el.previousElementSibling;
      if (scrim && scrim.classList.contains("nx-scrim"))
        tl.fromTo(scrim, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45, ease: "sine.inOut", immediateRender: false, fxNoScale: true }, at);
      tl.fromTo(r.el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45, ease: "sine.inOut", immediateRender: false, fxNoScale: true }, at);
      // while the card is big, the headline zone, the bottom row and the thumbs already docked (all partly outside the card:
      // y 132..146, y 854..872, x 1760..1808) fade out, and come back as the card flies to its slot
      const under = [hlz, rowW, ...shows.map((q) => q.el)];
      tl.to(under, { opacity: 0, duration: 0.35, ease: "sine.inOut", immediateRender: false, fxNoScale: true }, at);
      tl.to(under, { opacity: 1, duration: 0.5, ease: "sine.inOut", immediateRender: false, fxNoScale: true }, S.tFly + 0.3);
      shows.push(r);
      sfx("impact", at, -6);
      sfx("whoosh-soft", r.tFly);
      return r;
    };
    // crops: S06a keeps the reply table (dates and counts, every cell filled); its content spans image x 330..1352 (title
    // to the column button) and y 432..826 (text above ends at 411, the next row's text starts at 832), so the widest view
    // that fits is 1044 px: x 319..1363 leaves 11 image px (17 px in the big card) on both sides, y 413..831.
    // S06b starts at the type column, so the empty end-date cells ("-" glyphs) of the connect table stay out of frame
    showC("S06d_multi-nick-manager.png", 1400, [330, 240, 1036], S1);   // "many recruiter accounts": the account manager
    // S05 keeps the page title, the 3 stat cards and the whole persona table: content x 343..1512, y 68..546; the
    // pagination row (y 559..611) stays out. The 2.5:1 view is wider than the page column, so it reaches past the image
    // edge (x 313..1543) on the page's own flat background (#f6f7f9), and the sidebar and its collapse button (x < 343)
    // are masked with that same colour: 30 image px of margin on both sides, y 60..553 (8 px over the title row,
    // 7 px under the table's bottom border)
    showC("S05_multilogin-persona.png", 1533, [313, 60, 1230, "#f6f7f9", 343], S2);    // "AI agent": the persona the agent runs
    showC("S06a_reply-log.png", 1400, [319, 413, 1044], S3);            // "trained to reply": the reply log
    // S06b: x 480..1362 sits between the end-date text (ends at 474) and the panel edge (1367); y 452..805 runs from under
    // the section title (ends at 448) to just past the 4th row's bottom border (801); the 5th row is cut by the source
    // screenshot itself (its text starts at 809), so it stays out
    showC("S06b_connect-log.png", 1400, [480, 452, 882], S4);           // "contacted": the connect log of every contact

    out("s08", ({ cur, next }) => nx.T_zoom(cur, next, cur.t1, { dur: 0.9 }));
  }
