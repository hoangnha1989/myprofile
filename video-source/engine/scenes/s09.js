  /* ===== S09 A REPORT ON EVERY CANDIDATE (gold pass) : hero: a clay conversation opens the scene, then a clay report on
     "reports"; its message bubbles fly
     into three candidate cards (clay candidate plates) and move their fit bars up and down; the centre card crosses the
     fit threshold and glows; the outcome row reads Strong fit + Salary match -> phone plate "Interview with Nha"; then a
     wall of messages collapses into ONE clear report card, and on "report" the real report email (S07) slams in big,
     then docks right of the report card, which slides left to make room (group 960 + 64 + 560, centred). Layout (centred, even): eyebrow y 140, headline y 180..250,
     bubble band y 316..368 (4 x 280, gap 28), cards y 432..752 (3 x 440, gap 40), so the opening group sits centred
     in the content zone; once the band is empty the cards rise 118 px (y 314..634) so headline -> cards -> outcome row
     (y 698..786) gaps are an even 64 px, wall y 348..796, report y 356..836 (stays inside y 860 under the 1.04 zoom).
     Clip wipes use px insets with a shadow margin and are cleared after the wipe (clay and card shadows are never cut).
     Exit: focus pull. ===== */
  {
    const [t0, t1] = W("s09");
    const S = scene("s09", { cam: [[t0, 1.0], [t1, 1.04]] });
    const c = S.cam;
    const k = (n) => C("s09", n);
    const tBehind = k("behind"), tReports = k("reports"), tCand = k("candidate"), tPot = k("potential"),
      tFit = k("fit"), tRole = k("role"), tScore = k("score"), tChanges = k("changes"), tShare = k("share"), tStrong = k("strong"),
      tSalary = k("salary"), tBooks = k("books"), tInterview = k("interview"), tInstead = k("instead"), tThousands = k("thousands"),
      tOneR = k("one"), tReport = k("report"), tMatter = k("matter");

    const gate = (el, tin, tout) => {
      tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, fxNoScale: true }, tin);
      if (tout != null) tl.to(el, { autoAlpha: 0, duration: 0.01, immediateRender: false, fxNoScale: true }, tout);
    };
    const fmt0 = (v) => String(Math.round(v));

    /* ---------------- phase 1: the conversation ---------------- */
    const eb = add(c, `<div class="eyebrow s09-eb" data-box="s09-eb">A report on every candidate</div>`);
    const hl = add(c, `<div class="hl s09-hl" data-box="s09-hl"><span class="line lb">Behind every <em>conversation.</em></span><span class="line l0">It reports <em>back.</em></span><span class="line l1">Candidate by <em>candidate.</em></span></div>`);
    const hero = nx.hero(c, "chat_bubbles", 960, 592, 280, { id: "s09-hero", anchor: "center" });
    // bubble band: 4 equal bubbles (280 wide), equal 28 px gaps, centred on x 960 (358..1562); it stays on y 316 all scene
    const BWID = 280, BG = 28, BX0 = 960 - (4 * BWID + 3 * BG) / 2, BY = 316;
    const conv = add(c, `<div class="s09-conv" data-box="s09-conv" style="left:${BX0}px;top:${BY}px"></div>`);
    const BL = [[216, 120], [180, 132], [200, 104], [172, 124]];
    const BUB = BL.map(([l1, l2], i) => {
      const me = i % 2 === 1, bx = i * (BWID + BG);
      const el = add(conv, `<div class="s09-msg ${me ? "me" : "them"}" style="left:${bx}px;width:${BWID}px"><i style="width:${l1}px"></i><i style="width:${l2}px"></i></div>`);
      return { el, cx: BX0 + bx + BWID / 2, ox: 0 };
    });

    // three candidate cards, the strong one (B) in the centre: [name, icon, potential, fit]
    const CW = 440, CG = 40, CX0 = 960 - (3 * CW + 2 * CG) / 2, CT = 432, RISE = 118;
    const grp = add(c, `<div class="s09-grp"></div>`);
    const CARD = [["Candidate A", "cand_man", 62, 48], ["Candidate B", "cand_woman", 74, 66], ["Candidate C", "cand_man", 55, 58]].map(([nm, ic, pot, fit], i) => {
      const x = CX0 + i * (CW + CG);
      const el = add(grp, `<div class="hc s09-card" data-box="s09-card${i}" style="left:${x}px;top:${CT}px;width:${CW}px">` +
        `<i class="ring"></i><span class="nm">${nm}</span>` +
        `<div class="row r1"><span class="lb">Potential</span><span class="v num">0</span><div class="tr"><b></b></div></div>` +
        `<div class="row r2"><span class="lb">Fit per role</span><span class="v num">0</span><div class="tr"><b><s></s></b><u></u></div><span class="lbl fl">Fit line</span></div>` +
        `</div>`);
      nx.plate(el, ic, 28, 24, "S", { id: `s09-cand${i}`, tint: i === 1 ? "orange" : "blue" });
      const [b1, b2] = el.querySelectorAll(".tr b"), [v1, v2] = el.querySelectorAll(".v");
      return { el, x, pot, fit, b1, b2, v1, v2, cur: fit, ring: el.querySelector(".ring") };
    });
    const B = CARD[1];
    // the band draws ABOVE the cards, so a flying bubble is never cut by a card it passes
    c.appendChild(conv);

    // outcome row (ost): Strong fit + Salary match -> [phone] Interview with Nha
    const row = add(c, `<div class="s09-out" data-box="s09-out">` +
      `<div class="chip s09-o" data-box="s09-o-fit">${icon("check", 24, P.acc3, 2.4)}Strong fit</div>` +
      `<span class="s09-plus num">+</span>` +
      `<div class="chip s09-o" data-box="s09-o-sal">${icon("check", 24, P.acc3, 2.4)}Salary match</div>` +
      `<svg class="s09-arr" width="72" height="24" viewBox="0 0 72 24"><path class="sh" d="M2 12H64"/><path class="hd" d="M56 4l10 8-10 8"/></svg>` +
      `<span class="s09-ph"><i class="rp"></i></span>` +
      `<div class="chip acc s09-o" data-box="s09-o-int">Interview with Nha</div></div>`);
    const [oFit, oSal, oInt] = row.querySelectorAll(".chip"), plus = row.querySelector(".s09-plus"), arr = row.querySelector(".s09-arr"), ph = row.querySelector(".s09-ph");
    const phone = nx.plate(ph, "phone_call", 0, 0, "S", { id: "s09-phone", tint: "orange" });

    // opening: the bubble band on its final row (y 292), the clay conversation centred under it
    nx.settle(hero, t0 + 0.3, { from: 0.8 });
    nx.scramble(eb, t0 + 0.5, { dur: 1.0 });
    sfx("type", t0 + 0.5);
    // the band leaves the frame the moment its last bubble has landed (tStrong - 0.45), before the cards rise into it
    gate(conv, t0 + 0.6, tStrong - 0.45);
    const els = BUB.map((b) => b.el);
    tl.fromTo(els, { autoAlpha: 0, y: 18, scale: 0.9 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.4, ease: "back.out(1.8)" }, tBehind - 0.6);
    BUB.forEach((b, i) => sfx("pop", tBehind - 0.6 + i * 0.4, -6));
    nx.float(hero, t0 + 1.2, tReports - 0.45, { amp: 6, per: 2.8 });
    // the conversation has fully left before the report settles in the same spot (no crossfade double image)
    nx.out(hero, tReports - 0.45, { y: -24, blur: 8, dur: 0.25 });
    // the band floats as ONE row (one offset for all four bubbles, so their tops stay level)
    nx.float(conv, tBehind + 1.2, tScore - 0.7, { amp: 4, per: 2.6 });
    // "reports": the conversation gives way to a clay report in the same spot; it is gone before the cards clip in
    const hero2 = nx.hero(c, "report_chart", 960, 592, 280, { id: "s09-hero2", anchor: "center" });
    nx.settle(hero2, tReports - 0.15, { from: 0.8, dur: 0.5 });
    sfx("pop", tReports - 0.15, -4);
    nx.out(hero2, tCand - 0.95, { y: -24, blur: 8, dur: 0.35 });
    // it has fully faded just as card B's wipe starts (no overlap); the wipe eases OUT, so the cards fill that spot at
    // once and the frame is never empty between the two beats
    // the headline carries the spoken line: "Behind every conversation." (0.3 s early), swapped to "It reports back."
    // on its words, then to "Candidate by candidate." Each old line has fully left its mask before the next rises
    // (no two lines in the band at once)
    const [hlB, hl0, hl1] = hl.querySelectorAll(".line");
    gate(hl, tBehind - 0.3);
    const [hlInB] = nx.lineRise([hlB], tBehind - 0.3, { dur: 0.6 });
    tl.to(hlInB, { yPercent: -110, duration: 0.3, ease: "power2.in", immediateRender: false }, tReports - 0.62);
    const [hlIn0] = nx.lineRise([hl0], tReports - 0.3, { dur: 0.6 });
    tl.to(hlIn0, { yPercent: -110, duration: 0.35, ease: "power2.in", immediateRender: false }, tCand - 0.9);
    nx.lineRise([hl1], tCand - 0.4);
    CARD.forEach((o, i) => gate(o.el, tCand - 0.55 + i * 0.08));
    // top-down wipe in px with a margin for the layered card shadow, then the clip is cleared
    tl.fromTo(CARD.map((o) => o.el), { clipPath: "inset(0px -80px 320px -80px)" }, { clipPath: "inset(-60px -80px -130px -80px)", duration: 0.5, stagger: 0.08, ease: "nx.out" }, tCand - 0.55);
    // cleared only after the last (staggered, 1.3x paced) wipe has finished
    tl.set(CARD.map((o) => o.el), { clipPath: "none" }, tCand + 0.35);
    sfx("whoosh-soft", tCand - 0.55);
    nx.pop(CARD.map((o) => o.el.querySelector(".fx-plate")), tCand - 0.45, { stagger: 0.08, dur: 0.4 });
    nx.chars(CARD.map((o) => o.el.querySelector(".nm")), tCand - 0.35, { stagger: 0.008, y: 14, dur: 0.45 });
    // potential, then fit per role (bar and number on the SAME ease, so they agree at every frame)
    const setBar = (o, which, from, to, at, dur) => {
      const bar = which === 1 ? o.b1 : o.b2, val = which === 1 ? o.v1 : o.v2;
      if (from === 0) tl.fromTo(val, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, at);
      tl.fromTo(bar, { scaleX: from / 100 }, { scaleX: to / 100, duration: dur || 0.6, ease: "nx.inOut", immediateRender: from === 0 }, at);
      tl.fromTo(val, { nxCount: { from, to: from, fmt: fmt0 } }, { nxCount: { from, to, fmt: fmt0 }, duration: dur || 0.6, ease: "nx.inOut", immediateRender: false }, at);
    };
    CARD.forEach((o, i) => { o.v1.textContent = "0"; o.v2.textContent = "0"; setBar(o, 1, 0, o.pot, tPot - 0.4 + i * 0.08, 0.55); });
    CARD.forEach((o, i) => setBar(o, 2, 0, o.fit, tFit - 0.4 + i * 0.08, 0.55));
    tl.fromTo(CARD.map((o) => o.el.querySelector(".tr u")), { autoAlpha: 0, scaleY: 0 }, { autoAlpha: 1, scaleY: 1, duration: 0.4, stagger: 0.08, ease: "nx.out" }, tRole - 0.1);
    // first appearance of the threshold: a "Fit line" label under each tick, gone once B has crossed it
    const FL = CARD.map((o) => o.el.querySelector(".fl"));
    tl.fromTo(FL, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.08, ease: "nx.out" }, tRole);
    tl.to(FL, { autoAlpha: 0, duration: 0.4, immediateRender: false }, tSalary + 0.3);
    sfx("tick", tPot); sfx("tick", tFit);

    // every message moves the score: a bubble leaves the band and shrinks into the top edge of its card (it never
    // crosses the card's text); the ring pulse is the landing and the fit bar moves at that moment
    // nextAt: the next flight landing on the same card; its delta takes the same spot, so this one has fully left
    // before it enters
    const fly = (b, o, to, at, nextAt) => {
      const ox = b.ox, dx = o.x + CW / 2 - (b.cx + ox), dy = CT - 10 - (BY + 26);
      tl.to(b.el, { motionPath: { path: [{ x: ox, y: 0 }, { x: ox + dx * 0.6, y: dy * 0.35 }, { x: ox + dx, y: dy }], curviness: 1.2 }, scale: 0.2, autoAlpha: 0,
        duration: 0.6, ease: "power2.in", immediateRender: false, fxNoScale: true }, at - 0.6);
      tl.fromTo(o.ring, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.18, yoyo: true, repeat: 1, immediateRender: false, fxNoScale: true }, at);
      setBar(o, 2, o.cur, to, at, 0.6);
      const dl = add(o.el, `<span class="dl num${to > o.cur ? "" : " neg"}">${to > o.cur ? "+" : "−"}${Math.abs(to - o.cur)}</span>`);
      tl.fromTo(dl, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: "nx.out" }, at);
      const early = nextAt != null && nextAt - 0.3 < at + 1.1;
      tl.to(dl, { autoAlpha: 0, y: -12, duration: early ? 0.25 : 0.4, immediateRender: false }, early ? nextAt - 0.3 : at + 1.1);
      o.cur = to;
      sfx("pop", at, -4);
    };
    // the two OUTER bubbles go first (left one to A, right one to C), so the band left behind stays centred on x 960
    const tB1 = tShare - 0.2, tB2 = tStrong - 0.45;
    fly(BUB[0], CARD[0], 59, tScore);
    fly(BUB[3], CARD[2], 50, tChanges - 0.1);
    fly(BUB[2], CARD[1], 71, tB1, tB2);
    // the last bubble glides to the centre of the row before it goes to B
    BUB[1].ox = 960 - BUB[1].cx;
    tl.to(BUB[1].el, { x: BUB[1].ox, duration: 0.45, ease: "nx.inOut", immediateRender: false }, tShare - 0.2 + 0.1);
    fly(BUB[1], CARD[1], 84, tB2);
    // the band is empty: the card row rises so headline, cards and outcome row sit on even 64 px gaps
    tl.to(grp, { y: -RISE, duration: 0.5, ease: "nx.inOut", immediateRender: false }, tStrong - 0.45);
    // strong fit: the centre card glows orange, the others step back
    tl.to(B.ring, { autoAlpha: 1, borderColor: "rgba(244,126,42,.85)", duration: 0.5, immediateRender: false }, tStrong - 0.15);
    tl.to(B.el, { boxShadow: "inset 0 1px 0 rgba(255,255,255,.95), 0 2px 4px rgba(15,23,42,.08), 0 16px 30px -10px rgba(15,23,42,.18), 0 40px 80px -28px rgba(27,127,176,.45), 0 30px 60px -30px rgba(244,126,42,.60)", duration: 0.5, immediateRender: false }, tStrong - 0.15);
    // blue -> orange is a left-to-right wipe at full opacity (a fade would mix them into khaki), then a short glow pulse
    const Bs = B.b2.querySelector("s");
    tl.set(Bs, { autoAlpha: 1 }, tStrong - 0.15);
    tl.fromTo(Bs, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.45, ease: "nx.inOut", immediateRender: false }, tStrong - 0.15);
    tl.fromTo(Bs, { boxShadow: "0 0 0px 0px rgba(244,126,42,0)" }, { boxShadow: "0 0 14px 2px rgba(244,126,42,.55)", duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, tStrong + 0.3);
    tl.to([CARD[0].el, CARD[2].el], { autoAlpha: 0.55, duration: 0.6, immediateRender: false }, tStrong);
    // the row container only exists once its first chip arrives (its box spans the full width and would sit on the cards)
    gate(row, tStrong - 0.15);
    // the row has fixed item widths (css), so its final layout is known: 216+24+260+72+88+292 + 5 x 20 gaps = 1052,
    // starting at x 434. "Strong fit" first lands alone under card B (centre x 960) and stays there until "Salary match"
    // arrives; then "+" and "Salary match" enter to its right and the three slide left together as one group into
    // their slots (it never reads as belonging to candidate A, and nothing crosses the moving chip)
    const FIT_SHIFT = 960 - (960 - 1052 / 2 + 216 / 2);
    tl.set(oFit, { left: FIT_SHIFT }, tStrong - 0.15);
    nx.slide(oFit, tStrong - 0.15, { x: 0, y: 16 });
    tl.to(oFit, { left: 0, duration: 0.4, ease: "nx.inOut", immediateRender: false }, tSalary - 0.1);
    nx.pop(plus, tSalary - 0.1);
    tl.fromTo(plus, { x: FIT_SHIFT }, { x: 0, duration: 0.4, ease: "nx.inOut" }, tSalary - 0.1);
    tl.fromTo(oSal, { autoAlpha: 0, x: FIT_SHIFT }, { autoAlpha: 1, x: 0, duration: 0.4, ease: "nx.inOut" }, tSalary - 0.1);
    sfx("bloom", tStrong - 0.15); sfx("tick", tSalary - 0.1);
    // "it books a call with me": arrow, phone plate, the interview chip; "interview": the phone rings
    nx.draw(arr.querySelectorAll("path"), tBooks - 0.3, { dur: 0.4 });
    nx.pop(phone, tBooks - 0.15);
    // a slide, not a scale-up: the 22 px label never renders below 20 px during the entrance
    nx.slide(oInt, tBooks, { x: 0, y: 16 });
    sfx("pop", tBooks - 0.1);
    nx.ping(ph.querySelector(".rp"), tInterview - 0.1, { scale: 1.25, dur: 1.0 });
    tl.fromTo(phone, { rotation: 0 }, { rotation: 6, duration: 0.08, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, tInterview - 0.1);
    sfx("shimmer", tInterview - 0.1, -4);

    /* ---------------- phase 2: thousands of messages -> one clear report ---------------- */
    // phase 1 has fully left (exits run 1.3x: done by tInstead - 0.11) before the new eyebrow scrambles in the same
    // band and before the message wall gates in (tThousands - 0.75)
    nx.out([eb, hl, ...CARD.map((o) => o.el), row], tInstead - 0.85, { y: -16, blur: 10, stagger: 0.03 });
    const eb2 = add(c, `<div class="eyebrow s09-eb" data-box="s09-eb2">Instead of reading</div>`);
    const h2 = add(c, `<div class="hl s09-h2" data-box="s09-h2" data-allow="s10-loop s10-rad"><span class="line a"><span class="in">Thousands of messages.<i class="strike"></i></span></span><span class="line b">One clear <em>report.</em></span></div>`);
    const la = h2.querySelector(".line.a"), lb = h2.querySelector(".line.b");
    nx.scramble(eb2, tInstead - 0.05, { dur: 0.6 });
    gate(h2, tThousands - 0.5);
    nx.lineRise([la], tThousands - 0.5);
    // message wall: an even grid of small chat bubbles (6 rows of 8, centred on x 960) around a clay conversation
    // plate; x 362..1558, y 348..796. The hole is 2 cells x 4 rows, so the plate has 78 px clear on the sides and
    // 92 px above and below (even, not squeezed)
    const WX = 360, WY = 348, MW = 132, MH = 48, MSX = 152, MSY = 80;
    const wall = add(c, `<div class="s09-wall" data-box="s09-wall" data-allow="s09-rep" style="left:${WX}px;top:${WY}px"></div>`);
    gate(wall, tThousands - 0.75, tOneR - 0.3);
    // the clay plate sits in the middle of the wall (wall coords 516..684 x 140..308)
    const wpl = nx.plate(wall, "chat_bubbles", 600, 224, "L", { id: "s09-wpl", anchor: "center" });
    const R = nx.rng(909), WM = [];
    for (let r = 0; r < 6; r++) {
      const n = 8, x0 = (1200 - (n * MW + (n - 1) * (MSX - MW))) / 2;
      for (let q = 0; q < n; q++) {
        const x = x0 + q * MSX, y = r * MSY;
        if (x < 684 + 12 && x + MW > 516 - 12 && y < 308 + 80 && y + MH > 140 - 80) continue;
        const me = (r + q) % 3 === 1, l1 = 64 + 2 * Math.round(R() * 18), l2 = 32 + 2 * Math.round(R() * 14);
        WM.push(add(wall, `<i class="${me ? "me" : ""}" style="left:${x}px;top:${y}px"><b style="width:${l1}px"></b><b style="width:${l2}px"></b></i>`));
      }
    }
    nx.settle(wpl, tThousands - 0.75, { from: 0.7, dur: 0.5 });
    tl.fromTo(WM, { autoAlpha: 0, scale: 0.3 }, { autoAlpha: 1, scale: 1, duration: 0.3, stagger: { each: 0.005, from: "center" }, ease: "back.out(2)" }, tThousands - 0.7);
    nx.float(wall, tThousands, tOneR - 1.05, { amp: -8, per: 3 });
    sfx("riser", tThousands - 0.4);
    // collapse into the plate in the middle (960, 572), then the plate gives way to the report card
    const RX = 600, RY = 224;
    tl.to(WM, { x: (i) => RX - (parseFloat(WM[i].style.left) + MW / 2), y: (i) => RY - (parseFloat(WM[i].style.top) + MH / 2), scale: 0.15, autoAlpha: 0,
      duration: 0.5, stagger: { each: 0.004, from: "edges" }, ease: "power3.in", immediateRender: false, fxNoScale: true }, tOneR - 1.05);
    // the plate is gone (out runs 1.3x: done by tOneR - 0.31) as the wall gates out and the report starts to focus in
    // there (tOneR - 0.3): no empty beat, no double image
    nx.out(wpl, tOneR - 0.7, { blur: 6, dur: 0.3 });
    tl.to(la.querySelector(".in"), { color: P.muted, duration: 0.4, immediateRender: false }, tOneR - 0.1);
    tl.fromTo(h2.querySelector(".strike"), { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: "nx.inOut" }, tOneR - 0.1);
    // report card 960 x 480 (x 480..1440, y 356..836, inside y 860 under the 1.04 zoom), 44 px under the headline;
    // header plate 20 px from the top, rows 920 x 104 on a 104 px step from y 156, last plate 20 px from the bottom; columns: plate | name |
    // potential bar | fit bar | fit number | star column (empty until the clay star pops on B at "matter")
    const rep = add(c, `<div class="hc s09-rep" data-box="s09-rep" data-allow="s10-loop s10-rad" style="left:480px;top:356px"><span class="t">Report</span>` +
      `<span class="lbl s09-rl">Candidate by candidate</span><i class="dv"></i><span class="lbl s09-c1">Potential</span><span class="lbl s09-c2">Fit per role</span></div>`);
    nx.plate(rep, "report_chart", 32, 20, "S", { id: "s09-repic" });
    const RROW = [["Candidate A", "cand_man", 62, 59], ["Candidate B", "cand_woman", 74, 84], ["Candidate C", "cand_man", 55, 50]].map(([nm, ic, p, f], i) => {
      const r = add(rep, `<div class="rr${i === 1 ? " hi" : ""}" style="top:${156 + i * 104}px"><span class="nm">${nm}</span>` +
        `<span class="tr a"><b style="transform:scaleX(${p / 100})"></b></span><span class="tr b"><b style="transform:scaleX(${f / 100})"></b><u></u></span>` +
        `<span class="sc num">${f}</span></div>`);
      nx.plate(r, ic, 8, 8, "S", { id: `s09-rr${i}`, tint: i === 1 ? "orange" : "blue" });
      return r;
    });
    const star = nx.plate(RROW[1], "star_award", 820, 8, "S", { id: "s09-star", tint: "orange" });
    // the focus-pull OUT crossfades these with the next scene on purpose
    rep.querySelectorAll(".fx-plate").forEach((pl) => pl.setAttribute("data-allow", "s10-loop s10-rad"));
    // focus-in from 1.04 (a scale-up entrance would render its 20 px labels below 20 px); it starts as the plate
    // finishes fading (tOneR - 0.3), so the frame never sits on the headline alone
    nx.blurIn(rep, tOneR - 0.3, { blur: 10, dur: 0.6 });
    // left-to-right wipe in px with a margin for the clay contact shadows, then the clip is cleared
    tl.fromTo(RROW, { clipPath: "inset(-30px 950px -60px -30px)" }, { clipPath: "inset(-30px -30px -60px -30px)", duration: 0.5, stagger: 0.08, ease: "nx.inOut" }, tOneR - 0.1);
    tl.set(RROW, { clipPath: "none" }, tOneR + 0.6);
    sfx("impact", tOneR - 0.05);
    // showcase (BRIEF_GOLD 9): on "report" the real report email slams in over the scene, holds, then docks in the
    // right slot; the report card slides left on the same ease and length, so card 168..1128 + 64 + shot 1192..1752
    // sit as one centred row, the shot vertically centred on the card (y 596)
    const SH_W = 560, SH_AR = 549 / 1393, SH_X = 1192, SH_Y = 596 - Math.round((22 + 3 + SH_W * SH_AR) / 2 / 2) * 2;
    const sc = nx.showcase(c, "S07_email-candidate-update.png", k("report") - 0.15, { slot: { x: SH_X, y: SH_Y, w: SH_W }, ar: SH_AR, hold: 0.9, id: "s09-sc" });
    sfx("impact", k("report") - 0.15, -2);
    sfx("whoosh-soft", sc.tFly);
    tl.to(rep, { x: 168 - 480, duration: 0.7, ease: "nx.inOut", immediateRender: false, fxNoScale: true }, sc.tFly);
    // while the shot is big: the headline band steps out (the big card would slice its glyphs) and the report card
    // dims and blurs (its last row would read as a half-row ghost under the card's bottom edge); both come back on
    // the dock, and "One clear report." rises with it. The rep dim starts after its focus-in has finished.
    const tSlam = k("report") - 0.15, tRepDim = Math.max(tSlam, tOneR - 0.3 + 0.6 * 1.3 + 0.02);
    tl.fromTo([eb2, h2], { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.3, ease: "power2.in", immediateRender: false, fxNoScale: true }, tSlam);
    tl.fromTo(rep, { autoAlpha: 1, filter: "blur(0px)" }, { autoAlpha: 0.25, filter: "blur(6px)", duration: 0.3, ease: "power2.in", immediateRender: false, fxNoScale: true }, tRepDim);
    tl.fromTo(rep, { autoAlpha: 0.25, filter: "blur(6px)" }, { autoAlpha: 1, filter: "blur(0px)", duration: 0.7, ease: "nx.inOut", immediateRender: false, fxNoScale: true }, sc.tFly);
    // the headline returns once the flying card's top edge has dropped below line a (about 0.15 s into the dock), and
    // line b rises behind it once the card has cleared line b's band too
    tl.fromTo([eb2, h2], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "nx.out", immediateRender: false, fxNoScale: true }, sc.tFly + 0.15);
    nx.lineRise([lb], sc.tFly + 0.3);
    nx.pop(star, tMatter - 0.15);
    tl.to([RROW[0], RROW[2]], { autoAlpha: 0.55, duration: 0.5, immediateRender: false }, tMatter - 0.3);
    tl.to(RROW[1], { borderColor: "rgba(244,126,42,.55)", backgroundColor: "rgba(244,126,42,.06)", duration: 0.5, immediateRender: false }, tMatter - 0.3);
    sfx("shimmer", tMatter - 0.1);
    nx.float(rep, tMatter + 0.6, t1, { amp: 5, per: 3.2 });

    // the headline band hands over cleanly: the s09 headline has left (out runs 1.3x: done by t1 - 0.11) before the
    // s10 headline focuses into the same band (t1 - 0.3); the report card crossfades in the focus pull
    nx.out([eb2, h2], t1 - 0.5, { y: -12, blur: 8, dur: 0.3 });
    out("s09", ({ cur, next }) => nx.T_focus(cur, next, cur.t1, { dur: 1.0 }));
  }
