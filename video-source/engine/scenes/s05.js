  /* ===== S05 THE SEARCH (gold design): "Direct approach · Hiring manager's criteria · 20–40 SCREENED -> 1–2 PRESENTED".
     Gold layout: centred SG uppercase headline on top, one centred content group below (like the approved company video).
     Hero FX: a grid of candidate busts scanned by the clay magnifier (busts swell as the glass passes) that lights the
     "not yet looking" trio; the hiring manager's criteria card is handed on to the interview (left to right); a funnel
     20–40 -> 1–2 whose two survivors flow out of the neck into the two reason cards; the picks connect to the leaders'
     time ring. Horizontal pushes between beats, each beat rests >= 0.6 s after its last cue word. Exit: T_grid. ===== */
  {
    const [t0, t1] = W("s05");
    const S = scene("s05", { cam: [[t0, 1.0], [t1, 1.04]] });
    const c = S.cam;
    const tSearch = C("s05", "search"), tAppr = C("s05", "approach"), tNot = C("s05", "notyet"), tLook = C("s05", "looking"),
      // criteria = the word "criteria" when it resolves between "manager's" and "twenty"; otherwise "manager's" + 0.42
      // (older takes dropped "own criteria"). Out = "twenty" - 0.42 (the spoken "Out of" sits just before "twenty").
      // Clamped to "twenty" - 1.18, so a mis-resolved cue can never push the criteria beat past "Out of"
      tInt = C("s05", "interview"), tHire = C("s05", "hiring"), tMgr = C("s05", "manager"), tCritW = C("s05", "criteria"),
      tTw = C("s05", "twenty"), tOut = tTw - 0.42,
      tCrit = Math.min(tCritW > tMgr + 0.2 && tCritW < tTw ? tCritW : tMgr + 0.42, tTw - 1.18),
      tFor = C("s05", "forty"), tOne = C("s05", "onetwo"), tPres = C("s05", "presented"),
      tReason = C("s05", "reason"), tFit = C("s05", "fit"), tLead = C("s05", "leaders"), tTime = C("s05", "time"),
      tWorth = C("s05", "worth");
    const ICO = nx.ICON;
    const beat = (p) => add(p || c, `<div class="s05-beat"></div>`);
    // clip reveal whose end state is an inset EXPANDED past the box (negative %), so the finished card keeps its whole soft
    // 3D shadow (nx.clip ends at inset(0) and cuts it); a "none" set after it was seek-direction dependent, so no set here
    const M = "-30%", MB = "-40%";
    const clipS = (el, at, o) => {
      o = o || {};
      const d = o.dir || "l";
      // the hidden state must also cover the margin, or the shadow strip outside the box would show before the reveal
      const from = { l: `inset(${M} 130% ${MB} ${M})`, r: `inset(${M} ${M} ${MB} 130%)`, t: `inset(${M} ${M} 140% ${M})`, b: `inset(140% ${M} 0% ${M})` }[d];
      // "b" also starts with the bottom margin closed (0%): opening it from 140% revealed the soft shadow under the card as a
      // floating bar before the card body
      // hidden (not only clipped away) until its own reveal starts: a fully clipped box still sits in the layout
      const els = el.length == null ? [el] : [...el];
      els.forEach((e, i) => {
        const ti = at + i * (o.stagger || 0) * SLOW;
        tl.fromTo(e, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, ti);
        tl.fromTo(e, { clipPath: from }, { clipPath: `inset(${M} ${M} ${MB} ${M})`, duration: o.dur || 0.8, ease: "nx.inOut" }, ti);
      });
      return el;
    };
    // horizontal push between beats: the old beat leaves left (blurred), the new one arrives from the right. The old beat's
    // alpha is gone after only HO s (0.13 x SLOW) while it keeps sliding; the new beat turns visible right then (quick
    // fade), and its content already started revealing at `at + PRE` inside the still hidden beat, so the stage is never
    // empty and the two beats' boxes are never both visible
    const HO = 0.17, PRE = 0.06;
    // `soft` = a slower cross-fade (fade-out fo, hand-over ho, fade-in fi) for a push between two still frames, where the
    // quick one reads as a one-frame jump in the motion scan
    const push = (from, to, at, dOut, dIn, soft) => {
      const o = soft || { fo: 0.13, ho: HO, fi: 0.12 };
      tl.to(from, { x: -220, filter: "blur(10px)", duration: dOut, ease: "power2.in", immediateRender: false }, at);
      tl.to(from, { autoAlpha: 0, duration: o.fo, ease: soft ? "sine.inOut" : "power1.in", immediateRender: false }, at);
      tl.fromTo(to, { x: 260 }, { x: 0, duration: dIn, ease: "nx.out" }, at + o.ho);
      tl.fromTo(to, { autoAlpha: 0 }, { autoAlpha: 1, duration: o.fi, ease: soft ? "sine.inOut" : "power1.out" }, at + o.ho);
      sfx("whoosh-soft", at);
    };
    // centred eyebrow + one-line uppercase headline; `parts` = inline pieces of the line (each masked for lineRise)
    const head = (b, id, eb, parts) => {
      const ew = add(b, `<div class="s05-ew"><span class="eyebrow s05-eb" data-box="s05-eb${id}">${eb}</span></div>`);
      const hw = add(b, `<div class="s05-hw"><div class="hl s05-hl" data-box="s05-hl${id}">${parts.map((l) => `<span class="line" style="display:inline-block">${l}</span>`).join(" ")}</div></div>`);
      return { e: ew.firstElementChild, hl: hw.firstElementChild, lines: hw.querySelectorAll(".line") };
    };

    /* ---------- beat 1: the search, direct approach, "not yet looking" ---------- */
    const B1 = beat();
    const L1 = head(B1, "1", "The search begins", ["Direct <em>approach</em>"]);
    // the eyebrow comes on "search" (the grid carries "once the role is clear"); the headline waits for "approach"
    const tE1 = tSearch - 0.3;
    nx.clip(L1.e, tE1, { dir: "l" });
    const in1 = nx.lineRise(L1.lines, tAppr - 0.3);
    sfx("whoosh-soft", tE1 + 0.05);

    // candidate grid: 17 x 5 clay busts (58 px) on an even pitch (field 1296 x 464, centred on x = 960)
    const field = add(B1, `<div class="s05-field" data-box="s05-field"></div>`);
    const COLS = 17, ROWS = 5, PX = 76, PY = 92, DS = 58, REST = 0.9, DIM = 0.42, dots = [];
    for (let r = 0; r < ROWS; r++) for (let k = 0; k < COLS; k++) {
      const x = 40 + k * PX, y = 48 + r * PY;
      const d = add(field, `<img class="s05-cd" alt="" decoding="sync" src="${ICO("person_bust")}" style="left:${x - DS / 2}px;top:${y - DS / 2}px"/>`);
      dots.push({ d, x, y });
    }
    // the field starts right after the incoming transition with a tight stagger, so the first frames are never empty
    const ER = nx.rng(505), delay = dots.map(() => ER() * 0.35);
    tl.fromTo(dots.map((o) => o.d), { autoAlpha: 0, scale: 0.4 }, { autoAlpha: REST, scale: 1, duration: 0.6, stagger: (i) => delay[i], ease: "nx.out" }, t0 + 0.2);

    // clay magnifier: waypoints = glass centre in field coordinates; the glass sits at (134, 90) of the 220 px hero.
    // It scans, passes over the trio (columns 9-11 of row 2, lighting it), then parks left of the trio. The lens and the trio
    // sit in ONE rectangular pocket (columns 4-12, rows 1-3: 4 bust columns left and 4 right, so the hole is centred on
    // column 8 = x 960). Visible extents (alpha bbox of the PNGs): bust +-19 px, lens 104 px left of the glass centre.
    // The park point gives the lens the same air to column 3 as the trio chip has to column 13 (about 95 px), so the
    // lens + trio + chip group is centred on x 960.
    const LS = 220, GX = 134, GY = 90, BV = 19, LV = 104;
    const cx = (k) => 40 + k * PX, cy = (r) => 48 + r * PY;
    const AIR = cx(13) - BV - (cx(10) + 114); // 114 = half the chip width (CH.w below)
    const path = [[cx(2), cy(1), 0], [cx(5), cy(3), 0], [cx(8), cy(1), 0], [cx(10), cy(2), 0], [cx(3) + BV + AIR + LV, cy(2), 0]];
    // the glass reaches the trio on "people" (tNot - 0.8) and parks 0.4 s later, so the chip can reveal on a clear pocket and
    // be complete on "not", resting >= 0.6 s before the beat-2 push
    path[0][2] = tAppr - 0.35; path[3][2] = Math.max(path[0][2] + 1.6, tNot - 0.8);
    path[1][2] = path[0][2] + (path[3][2] - path[0][2]) * 0.42; path[2][2] = path[0][2] + (path[3][2] - path[0][2]) * 0.78;
    path[4][2] = path[3][2] + 0.4;
    const T3 = path[3][2], TP = path[4][2];
    const lens = nx.hero(field, "magnifier", path[0][0] - GX, path[0][1] - GY, LS, { id: "s05-lens" });
    lens.style.zIndex = 2;
    nx.settle(lens, tSearch - 0.1, { from: 0.5 });
    const sine = (p) => -(Math.cos(Math.PI * p) - 1) / 2;
    for (let s = 0; s + 1 < path.length; s++) {
      const [ax, ay, ta] = path[s], [bx, by, tb] = path[s + 1];
      tl.fromTo(lens, { x: ax - path[0][0], y: ay - path[0][1] }, { x: bx - path[0][0], y: by - path[0][1], duration: tb - ta, ease: "sine.inOut", immediateRender: false, fxNoScale: true }, ta);
    }
    const lensAt = (t) => {
      for (let s = 0; s + 1 < path.length; s++) {
        const [ax, ay, ta] = path[s], [bx, by, tb] = path[s + 1];
        if (t <= tb) { const p = sine(Math.max(0, (t - ta) / (tb - ta))); return [ax + (bx - ax) * p, ay + (by - ay) * p]; }
      }
      return [path[path.length - 1][0], path[path.length - 1][1]];
    };
    // the "not yet looking" trio: the bust under the glass at T3 and its two row neighbours
    const [rx, ry] = [path[3][0], path[3][1]];
    const lit = dots.map((o, i) => i).filter((i) => dots[i].y === ry && Math.abs(dots[i].x - rx) <= PX);
    // the callout chip sits centred under the trio (row 3, inside the pocket)
    const CH = { w: 228, h: 44 }; CH.l = rx - CH.w / 2; CH.t = cy(3) - CH.h / 2;
    const pocket = dots.map((o, i) => i).filter((i) => !lit.includes(i) && dots[i].x >= cx(4) && dots[i].x <= cx(12) && dots[i].y >= cy(1) && dots[i].y <= cy(3));
    const under = pocket.filter((i) => dots[i].x > rx - 2 * PX), parked = pocket.filter((i) => !under.includes(i));
    dots.forEach((o, i) => {
      if (lit.includes(i) || under.includes(i) || parked.includes(i)) return;
      let best = 1e9, bt = 0;
      for (let t = path[0][2]; t <= T3; t += 0.04) { const [lx, ly] = lensAt(t); const dd = Math.hypot(o.x - lx, o.y - ly); if (dd < best) { best = dd; bt = t; } }
      if (best > 70) return;
      tl.to(o.d, { scale: 1.32, autoAlpha: 1, duration: 0.22, ease: "power2.out", immediateRender: false, fxNoScale: true }, bt - 0.16);
      tl.to(o.d, { scale: 1, autoAlpha: REST, duration: 0.5, ease: "power2.inOut", immediateRender: false, fxNoScale: true }, bt + 0.08);
    });
    // halo 68 px (8 px gap at the 76 px pitch), centred on the bust's alpha centre (+2, -2 at the lit scale): the smallest
    // circle around the bust PNG has r = 0.453 x size, so at scale 1.12 (r 29.4) the whole bust sits inside the ring
    const LIT = 1.12;
    const halos = lit.map((i) => add(field, `<i class="s05-halo" style="left:${dots[i].x - 32}px;top:${dots[i].y - 36}px"></i>`));
    lit.forEach((i, k) => {
      const d = dots[i].d;
      d.style.zIndex = 3; // above the glass: the lit bust reads in full colour, not through the lens
      tl.to(d, { scale: LIT,autoAlpha: 1, filter: "grayscale(0) brightness(1)", duration: 0.45, ease: "back.out(2)", immediateRender: false }, T3 - 0.15 + k * 0.07);
    });
    nx.pop(halos, T3 - 0.15, { stagger: 0.07 });
    tl.to(dots.filter((o, i) => !lit.includes(i) && !under.includes(i) && !parked.includes(i)).map((o) => o.d), { autoAlpha: DIM, duration: 0.5, ease: "sine.inOut", immediateRender: false }, Math.max(T3 + 0.1, tNot + 0.05));
    tl.to(under.map((i) => dots[i].d), { autoAlpha: 0, scale: 0.6, duration: 0.3, ease: "power2.in", immediateRender: false }, T3 - 0.25);
    tl.to(parked.map((i) => dots[i].d), { autoAlpha: 0, scale: 0.6, duration: 0.3, ease: "power2.in", immediateRender: false }, T3 + 0.05);
    // wrapper hidden until the reveal: a clipped-away chip still has a layout box the lens would sweep across
    const nylW = add(field, `<div class="s05-nylw"></div>`);
    const nyl = add(nylW, `<div class="chip acc s05-nyl" data-box="s05-nyl" style="left:${CH.l}px;top:${CH.t}px;width:${CH.w}px">Not yet looking</div>`);
    // revealed once the glass has left the trio (TP - 0.1), complete on "not"
    const tNy = Math.max(TP - 0.1, tNot - 0.52);
    tl.fromTo(nylW, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, tNy);
    clipS(nyl, tNy, { dir: "l", dur: 0.4 });
    nx.float(nyl, TP + 0.1, tInt, { amp: 3, per: 2.2 });
    sfx("shimmer", T3 - 0.1); sfx("tick", tNy + 0.2);

    /* ---------- beat 2: interview each candidate with the hiring manager's own criteria ---------- */
    // "interview": the Interview card arrives centred; "hiring": it moves to the right slot, the manager takes the left one
    // and his criteria card is handed on between them. Left to right: Hiring manager -> Criteria -> Interview
    // (three equal cards 400 x 400, gap 80, group 280..1640 centred on 960).
    const B2 = beat();
    // B1 stays visible until "looking" has been said (tP2 + HO >= its end); the Interview card rides in WITH B2 and reads
    // complete about 0.1 s before its word
    const tP2 = Math.max(tInt - 0.49, tNy + 0.52 + 0.6);
    // same hand-over as the beat-3 push: B1's eyebrow + headline leave up through the line mask; B1 is invisible at
    // tP2 + HO, where B2 turns visible with its text and cards already revealing since tP2 + PRE (never sharing the band)
    tl.to(in1, { yPercent: -110, duration: 0.13, ease: "power2.in", immediateRender: false }, tP2);
    tl.to(L1.e, { y: -12, autoAlpha: 0, duration: 0.13, ease: "power2.in", immediateRender: false }, tP2);
    tl.to(L1.hl, { autoAlpha: 0, duration: 0.01, immediateRender: false }, tP2 + HO);
    push(B1, B2, tP2, 0.22, 0.4);
    const tT2 = tP2 + PRE;
    // the headline follows the voice: "interview each candidate" first (only the Interview card is on stage), then it
    // rises out and "hiring manager's criteria" rises in just before "hiring" (same swap as beats 3 and 4)
    const L2 = head(B2, "2", "The search continues", ["Interview <em>each candidate</em>"]);
    const hl2b = add(L2.hl.parentElement, `<div class="hl s05-hl s05-hlb" data-box="s05-hl2b"><span class="line" style="display:inline-block">Hiring manager’s <em>criteria</em></span></div>`);
    tl.fromTo(L2.hl, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, tT2);
    clipS(L2.e, tT2, { dir: "l", dur: 0.45 });
    const in2a = nx.lineRise(L2.lines, tT2 + 0.02, { dur: 0.5 });
    const tSw2 = tHire - 0.3 - 0.33;
    tl.to(in2a, { yPercent: -110, duration: 0.25, ease: "power2.in", immediateRender: false }, tSw2);
    tl.to(L2.hl, { autoAlpha: 0, duration: 0.01, immediateRender: false }, tSw2 + 0.33);
    tl.fromTo(hl2b, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, tSw2 + 0.33);
    const in2 = nx.lineRise(hl2b.querySelectorAll(".line"), tSw2 + 0.33, { dur: 0.5 });
    const CY = 350, CW = 400, CHT = 400;
    const card = (id, x, cls, inner) => add(B2, `<div class="hc ${cls} s05-c2 s05-${id}" data-box="s05-${id}" style="left:${x}px;top:${CY}px;width:${CW}px;height:${CHT}px">${inner}</div>`);
    // his own criteria as a short bar list on the same row (y 332) as the Interview ticks; lit when he hands them on
    const mg = card("mg", 280, "", `<div class="lbl ttl">Hiring manager</div><div class="bd sub">Own criteria</div>
      <div class="mgb">${[96, 64, 80].map((w) => `<span class="bar" style="width:${w}px"></span>`).join("")}</div>`);
    const mgPl = nx.plate(mg, "manager", 116, 44, "L", { id: "s05-mg-pl" });
    // same header pattern as the outer cards (L plate centred, centred title), the criteria as a 2 x 2 tick list below
    const ck = card("ck", 760, "acc", `<div class="lbl ttl">Criteria</div>
      <div class="rows">${[104, 84, 92, 110].map((w) => `<div class="row"><span class="box">${icon("check", 22, P.acc3, 2.6)}</span><span class="bar" style="width:${w}px"></span></div>`).join("")}</div>`);
    const ckPl = nx.plate(ck, "checklist", 116, 44, "L", { id: "s05-ck-pl" });
    const iv = card("iv", 760, "", `<div class="lbl ttl">Interview</div><div class="bd sub">Each candidate</div>
      <div class="tks">${[0, 1, 2, 3].map(() => `<span class="box">${icon("check", 22, P.acc3, 2.6)}</span>`).join("")}</div>`);
    const ivPl = nx.plate(iv, "interview", 116, 44, "L", { id: "s05-iv-pl" });
    const arr = add(B2, `<svg class="s05-arr" width="1920" height="1080" viewBox="0 0 1920 1080">
      <g class="a1"><path d="M694 550H746"/><path d="M732 538L746 550L732 562"/></g>
      <g class="a2"><path d="M1174 550H1226"/><path d="M1212 538L1226 550L1212 562"/></g></svg>`);
    // rides in with the push: complete at about tInt - 0.05
    clipS(iv, tT2, { dir: "b", dur: 0.25 });
    nx.pop(ivPl, tT2 + 0.05, {});
    tl.to(iv, { x: 480, duration: 0.65, ease: "nx.inOut", immediateRender: false }, tHire - 0.45);
    // fade + rise (no wipe): a bottom wipe showed the shadow first and a cropped plate top
    tl.fromTo(mg, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "nx.out" }, tHire - 0.25);
    // settled (0.45 x SLOW) before the a1 arrow starts
    nx.settle(mgPl, tHire - 0.2, { from: 0.6, dur: 0.45 });
    nx.slide(ck, tHire + 0.05, { x: -120, dur: 0.45 });
    tl.to(mg.querySelectorAll(".bar"), { backgroundColor: "rgba(244,126,42,.8)", duration: 0.18, stagger: 0.07, immediateRender: false }, tHire + 0.05);
    nx.blurIn(ckPl, tHire + 0.12, { blur: 10, dur: 0.4 });
    // each arrow: shaft first, then its head (drawn together they read as two loose dashes mid-draw)
    const arrow = (g, at) => { const [sh, hd] = arr.querySelectorAll("." + g + " path"); nx.draw(sh, at, { dur: 0.2 }); nx.draw(hd, at + 0.26, { dur: 0.12 }); };
    arrow("a1", tHire + 0.5);
    sfx("whoosh-soft", tHire - 0.4);
    // drawSVG must target the <path>, not the <svg> wrapper (on the wrapper only the last tick survived the seek)
    tl.fromTo(ck.querySelectorAll(".box svg path"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.18, stagger: 0.07, ease: "nx.out" }, tCrit - 0.55);
    tl.to(ck.querySelectorAll(".bar"), { backgroundColor: "rgba(37,161,219,.75)", duration: 0.18, stagger: 0.07, immediateRender: false }, tCrit - 0.5);
    arrow("a2", tCrit - 0.3);
    tl.fromTo(iv.querySelectorAll(".box svg path"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.16, stagger: 0.04, ease: "nx.out" }, tCrit - 0.15);
    sfx("tick", tCrit - 0.55); sfx("tick", tCrit - 0.15);

    /* ---------- beat 3: 20–40 screened -> 1–2 presented, each with a clear reason ---------- */
    // final row: Screened card (280..580) | funnel (620..1160) | connectors | picks (1260..1640), centred on y = 586.
    // Before the picks arrive, the Screened + funnel group sits centred (shifted +210) and slides into place on "only".
    const B3 = beat();
    const tP3 = tCrit + 0.6; // the criteria beat rests on its payoff (all ticks done) before the push
    // B2's eyebrow + headline leave first (up through the line mask); B2 is invisible at tP3 + HO3, where B3 turns visible
    // with its cards and funnel already revealing since tP3 + PRE, riding in with the push (the stage is never empty, the two beats never both visible)
    // the criteria payoff and the "Out of" frame are both still (silent pause between them): soft cross-fade, B2 gone at
    // tP3 + 0.32 (0.24 x SLOW), B3 visible from there
    const HO3 = 0.33;
    tl.to(in2, { yPercent: -110, duration: 0.2, ease: "power2.in", immediateRender: false }, tP3);
    tl.to(L2.e, { y: -12, autoAlpha: 0, duration: 0.2, ease: "power2.in", immediateRender: false }, tP3);
    tl.to(hl2b, { autoAlpha: 0, duration: 0.01, immediateRender: false }, tP3 + HO3);
    push(B2, B3, tP3, 0.3, 0.42, { fo: 0.24, ho: HO3, fi: 0.22 });
    // the Screened card + funnel reveals (ease-in-out, slow to show) start with the push, inside the still hidden B3
    const tT3 = tP3 + PRE, tC3 = tP3;
    const ew3 = add(B3, `<div class="s05-ew"><span class="eyebrow s05-eb" data-box="s05-eb3">Screened, then presented</span></div>`).firstElementChild;
    const hw3 = add(B3, `<div class="s05-hw">
      <div class="hl s05-hl" data-box="s05-hl3a"><span class="line" style="display:inline-block">Out of <em class="na">20</em><em class="nb">–40</em> candidates</span></div>
      <div class="hl s05-hl s05-hlb" data-box="s05-hl3b"><span class="line" style="display:inline-block">Only <em>one or two</em> presented</span></div></div>`);
    const [hlA, hlB] = hw3.querySelectorAll(".hl");
    const tA = Math.max(tP3 + HO3, tOut - 0.25);
    tl.fromTo(hlA, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, tA);
    clipS(ew3, tT3, { dir: "l", dur: 0.4 });
    // the whole centred line rises on "out" (never a lone fragment off centre); "20" and "–40" get an accent on their words
    const inA = nx.lineRise(hlA.querySelectorAll(".line"), tA, { dur: 0.5 });
    [[hlA.querySelector(".na"), tTw], [hlA.querySelector(".nb"), tFor]].forEach(([e, tw]) => {
      tl.to(e, { scale: 1.08, duration: 0.16, ease: "power2.out", immediateRender: false }, tw - 0.1);
      tl.to(e, { scale: 1, duration: 0.3, ease: "power2.inOut", immediateRender: false }, tw + 0.12);
    });
    // headline swap before "only": A rises out and is hidden, THEN B rises in (never both in the band)
    const tSw = Math.max(tFor + 0.6, tOne - 0.7);
    tl.to(inA, { yPercent: -110, duration: 0.25, ease: "power2.in", immediateRender: false }, tSw);
    tl.to(hlA, { autoAlpha: 0, duration: 0.01, immediateRender: false }, tSw + 0.33);
    tl.fromTo(hlB, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, tSw + 0.33);
    const inB = nx.lineRise(hlB.querySelectorAll(".line"), tSw + 0.33, { dur: 0.55 });

    const row = add(B3, `<div class="s05-row"></div>`);
    // the row slides home before the picks appear: done at tRow + 0.59 (0.45 x SLOW); the "1-2 presented" header comes on
    // "one or two" (tPk), each candidate card only when its survivor has left the neck and reaches it (tArr[k])
    const tRow = Math.max(tFor + 0.6, tOne - 0.9), tPk = Math.max(tRow + 0.6, tOne - 0.1);
    const SV = 1.05, tSv = [0, 1].map((k) => tOne - 0.6 + k * 0.12), tArr = tSv.map((t) => t + SV);
    tl.fromTo(row, { x: 210 }, { x: 0, duration: 0.45, ease: "nx.inOut" }, tRow);
    const scr = add(row, `<div class="hc s05-scr" data-box="s05-scr" style="left:280px;top:436px;width:300px;height:300px">
      <div class="num n"><span class="a">20</span><span class="b">–40</span></div><div class="lbl">Screened</div></div>`);
    const scrPl = nx.plate(scr, "profile_stack", 86, 34, "M", { id: "s05-scr-pl" });
    clipS(scr, tC3, { dir: "b", dur: 0.4 });
    nx.pop(scrPl, tC3 + 0.04, { dur: 0.38 });
    // the number is revealed as it is said: "twenty" ... "forty"
    nx.settle(scr.querySelector(".a"), tTw - 0.15, { from: 0.6, dur: 0.4 });
    // the hidden "–40" takes no width until "forty" (max-width 0, glyphs overflow right while it opens), so the visible
    // "20" stays centred and then eases left as the range grows
    tl.fromTo(scr.querySelector(".b"), { maxWidth: 0 }, { maxWidth: 150, duration: 0.4, ease: "power2.out" }, tFor - 0.15);
    nx.settle(scr.querySelector(".b"), tFor - 0.15, { from: 0.6, dur: 0.4 });

    const fun = add(row, `<div class="s05-fun" data-box="s05-fun" style="left:620px;top:376px">
      <svg width="540" height="420" viewBox="0 0 540 420">
        <defs><linearGradient id="s05g" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#25A1DB" stop-opacity=".05"/><stop offset="1" stop-color="#25A1DB" stop-opacity=".20"/></linearGradient>
        <linearGradient id="s05w" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#5CC4F0"/><stop offset="1" stop-color="#1B7FB0"/></linearGradient></defs>
        <path class="fill" d="M2 4 C 236 14, 296 164, 430 165 L 538 165 L 538 255 L 430 255 C 296 256, 236 406, 2 416 Z" />
        <path class="w" d="M2 4 C 236 14, 296 164, 430 165 L 538 165" />
        <path class="w" d="M2 416 C 236 406, 296 256, 430 255 L 538 255" />
      </svg></div>`);
    tl.fromTo(fun, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, tC3);
    nx.draw(fun.querySelectorAll("path.w"), tC3, { dur: 0.42 });
    clipS(fun.querySelector(".fill"), tC3 + 0.02, { dir: "l", dur: 0.4 });
    // the neck flows on into the two picks: connectors from the outlet (1160) to the cards' left edges (1260)
    const conn = add(row, `<svg class="s05-conn" width="1920" height="1080" viewBox="0 0 1920 1080">
      <path d="M1160 566 C 1214 566, 1206 491, 1256 491" /><path d="M1160 606 C 1214 606, 1206 681, 1256 681" /></svg>`);
    nx.draw(conn.querySelectorAll("path"), tOne - 0.1, { dur: 0.5, stagger: 0.08 });
    const FR = nx.rng(55), fdots = [];
    for (let i = 0; i < 34; i++) {
      const x = 36 + FR() * 150, y = 80 + FR() * 260;
      fdots.push(add(fun, `<div class="s05-fd" style="left:${x - 9}px;top:${y - 9}px"></div>`));
    }
    nx.pop(fdots, tTw - 0.35, { stagger: 0.01 });
    // filtering: the rejects are pushed to the neck and jam against the closing walls (packed columns, x 270..410), then
    // grey out; only the two orange survivors pass the outlet and flow on to the picks
    const keep = [7, 21];
    const bz = (u, p0, p1, p2, p3) => { const v = 1 - u; return v * v * v * p0 + 3 * v * v * u * p1 + 3 * v * u * u * p2 + u * u * u * p3; };
    const wallY = (x) => { let lo = 0, hi = 1; for (let n = 0; n < 30; n++) { const m = (lo + hi) / 2; if (bz(m, 2, 236, 296, 430) < x) lo = m; else hi = m; } return bz(lo, 4, 14, 164, 165); };
    const slots = [];
    for (let col = 0; slots.length < 32; col++) {
      // half-height inset 21 = dot radius 9 + wall half-stroke 2 + 10 px air; a part-filled last column is centred on y 210
      const x = 404 - col * 21, half = 210 - wallY(x) - 21, n = Math.min(32 - slots.length, Math.max(1, Math.floor((2 * half) / 21) + 1));
      for (let j = 0; j < n; j++) slots.push([x, 210 - ((n - 1) * 21) / 2 + j * 21]);
    }
    let si = 0;
    fdots.forEach((d, i) => {
      if (keep.includes(i)) return;
      const [sx, sy] = slots[si++];
      const x0 = parseFloat(d.style.left) + 9, y0 = parseFloat(d.style.top) + 9;
      tl.to(d, { x: sx - x0, y: sy - y0, duration: 1.0, ease: "nx.inOut", immediateRender: false }, tOne - 0.6 + (i % 8) * 0.04);
      tl.to(d, { autoAlpha: 0.62, scale: 0.85, duration: 0.5, ease: "sine.inOut", immediateRender: false }, tOne + 0.5 + (i % 8) * 0.04);
    });
    keep.forEach((i, k) => {
      const d = fdots[i];
      const bx = parseFloat(d.style.left) + 9, by = parseFloat(d.style.top) + 9;
      const ey = k ? 230 : 190, cy = k ? 305 : 115; // neck lane, then the card's left-edge centre (fun coordinates)
      tl.to(d, { backgroundImage: "radial-gradient(circle at 35% 30%, #FFD2AE, #F47E2A 60%, #D9631A)", duration: 0.3, immediateRender: false }, tOne - 0.7);
      tl.to(d, { motionPath: { path: [{ x: 0, y: 0 }, { x: 430 - bx, y: ey - by }, { x: 540 - bx, y: ey - by }, { x: 590 - bx, y: (ey + cy) / 2 - by }, { x: 626 - bx, y: cy - by }], curviness: 0.8 },
        duration: SV, ease: "nx.inOut", immediateRender: false, fxNoScale: true }, tSv[k]); // real length: lands at tArr[k]
      tl.to(d, { autoAlpha: 0, scale: 0.5, duration: 0.25, ease: "power2.in", immediateRender: false }, tArr[k] - 0.05);
    });
    sfx("whoosh-soft", tOne - 0.6);

    // the picks: header + two candidate cards with their reason chips
    const pick = add(B3, `<div class="s05-pick"></div>`);
    tl.fromTo(pick, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, tPk);
    const ph = add(pick, `<div class="s05-ph" data-box="s05-ph"><span class="num">1–2</span><span class="lbl">Presented</span></div>`);
    clipS(ph, tPk + 0.05, { dir: "l", dur: 0.5 });
    // "each with a clear reason why they fit": BOTH picks carry the same reason chip (on "reason") and their fit bar
    // fills on "fit", so each candidate holds the whole claim
    const cards = ["cand_woman", "cand_man"].map((ic, k) => {
      const cd = add(pick, `<div class="hc s05-pc" data-box="s05-pc${k}" style="left:1260px;top:${k ? 596 : 406}px;width:380px;height:170px">
        <div class="chip acc rs">Clear reason</div><div class="fit"><span class="lbl">Fit</span><span class="trk"><i style="width:${k ? 84 : 92}%"></i></span></div></div>`);
      const pl = nx.plate(cd, ic, 20, 20, "M", { id: `s05-pc${k}-pl` });
      // the card opens from its left edge as the survivor lands there, then its candidate plate pops in
      clipS(cd, tArr[k] - 0.05, { dir: "l", dur: 0.5 });
      nx.pop(pl, tArr[k] + 0.12, { dur: 0.4 });
      return cd;
    });
    cards.forEach((cd, k) => {
      nx.slide(cd.querySelector(".rs"), tReason - 0.3 + k * 0.12, { x: 30, dur: 0.6 });
      // filled (0.6 x SLOW) before the beat-4 move starts at tFit + 0.6
      tl.fromTo(cd.querySelector(".fit i"), { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "nx.out" }, tFit - 0.3 + k * 0.08);
    });
    sfx("pop", tArr[0] + 0.1); sfx("pop", tArr[1] + 0.1); sfx("tick", tReason - 0.2); sfx("tick", tFit - 0.2);

    /* ---------- beat 4: leaders spend their time only on people worth meeting ---------- */
    // the picks slide left (1260 -> 500); the leaders' time ring takes the right side: group 500..1420, centred
    const tB4 = Math.max(tLead - 0.6, tFit + 0.6), DX = -760;
    // the row travels left WITH the picks (same tween, so the funnel never runs through them) and fades on the way;
    // the ring only appears once the picks have cleared its slot (right edge < 1132 at about tB4 + 0.65)
    tl.to([row, pick], { x: DX, duration: 0.6, ease: "nx.inOut", immediateRender: false }, tB4 + 0.05);
    tl.to(row, { autoAlpha: 0, filter: "blur(10px)", duration: 0.25, ease: "power2.in", immediateRender: false }, tB4 + 0.05);
    const tLd = tB4 + 0.7;
    tl.to(inB, { yPercent: -110, duration: 0.2, ease: "power2.in", immediateRender: false }, tB4);
    nx.out(ew3, tB4, { y: -10, dur: 0.2 });
    tl.to(hlB, { autoAlpha: 0, duration: 0.01, immediateRender: false }, tB4 + 0.27);
    const B4 = beat(B3);
    tl.fromTo(B4, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, tB4 + 0.3);
    // a headline anchors the top from the beat's start: "Leaders spend their time" as it is said, then (between "time"
    // and "only") it rises out and the whole centred line "Only on people worth meeting" rises in; the orange "worth
    // meeting" gets an accent pulse on "worth" (same pattern as "–40" on "forty")
    const tOnly = C("s05", "only2");
    const L4 = head(B4, "4", "That way", ["Leaders spend their time"]);
    const hl4b = add(L4.hl.parentElement, `<div class="hl s05-hl s05-hlb" data-box="s05-hl4b">${["Only on people", "<em>worth meeting</em>"].map((l, k) => `<span class="line${k ? " s05-pls" : ""}" style="display:inline-block">${l}</span>`).join(" ")}</div>`);
    const l4b = hl4b.querySelectorAll(".line");
    clipS(L4.e, tB4 + 0.32, { dir: "l", dur: 0.5 });
    const in4 = nx.lineRise(L4.lines, tB4 + 0.3, { dur: 0.55 });
    const tSw4 = Math.max(tOnly - 0.32, tB4 + 1.2);
    tl.to(in4, { yPercent: -110, duration: 0.2, ease: "power2.in", immediateRender: false }, tSw4);
    tl.to(L4.hl, { autoAlpha: 0, duration: 0.01, immediateRender: false }, tSw4 + 0.27);
    tl.fromTo(hl4b, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, tSw4 + 0.27);
    const in4b = nx.lineRise(l4b, tSw4 + 0.27, { dur: 0.55, stagger: 0.06 });
    // the pulse scales the em, not the masked .in: its line carries side/top room (s05-pls) so the mask never cuts it
    const wm = in4b[1].querySelector("em");
    tl.to(wm, { scale: 1.06, duration: 0.16, ease: "power2.out", immediateRender: false }, tWorth - 0.1);
    tl.to(wm, { scale: 1, duration: 0.3, ease: "power2.inOut", immediateRender: false }, tWorth + 0.12);
    const ld = add(B4, `<div class="s05-ld" data-box="s05-ld" style="left:1140px;top:446px">
      <svg class="clk" width="280" height="280" viewBox="0 0 280 280"><circle class="trk" cx="140" cy="140" r="128"/>
        ${[0, 90, 180, 270].map((a) => `<path class="tick" d="M140 6V22" transform="rotate(${a} 140 140)"/>`).join("")}
        <circle class="prg" cx="140" cy="140" r="128" transform="rotate(-90 140 140)"/></svg><i class="ring"></i></div>`);
    // "leaders" (plural) = team_group plate (M: 34 px clear of the ring stroke); "their time" = stopwatch badge above
    // 12 o'clock, its plate kept clear of the ping ring at its widest (scale 1.10 = r 154)
    const ldPl = nx.plate(ld, "team_group", 76, 76, "M", { id: "s05-ld-pl" });
    const sw = nx.plate(ld, "stopwatch", 96, -114, "S", { id: "s05-ld-sw", tint: "orange" });
    const ldl = add(B4, `<div class="s05-ldl" data-box="s05-ldl"><span class="lbl">Leaders</span></div>`);
    tl.fromTo([ld, ldl], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, tLd);
    nx.blurIn(ld.querySelector(".clk"), tLd, { blur: 8, dur: 0.6 });
    nx.settle(ldPl, tLd + 0.1, { from: 0.5 });
    // the label starts with the ring (the picks have cleared its row by tLd) and is complete by about tLead + 0.45
    clipS(ldl.firstElementChild, tLd, { dir: "l", dur: 0.25 });
    nx.pop(sw, tTime - 0.15, {});
    nx.draw(ld.querySelector(".prg"), tTime - 0.2, { dur: 1.4 });
    const links = add(B4, `<svg class="s05-links" width="1920" height="1080" viewBox="0 0 1920 1080">
      <path d="M888 491 C 1010 491, 1030 586, 1150 586" /><path d="M888 681 C 1010 681, 1030 586, 1150 586" /></svg>`);
    nx.draw(links.querySelectorAll("path"), tTime - 0.3, { dur: 0.6, stagger: 0.1 });
    tl.to(links.querySelectorAll("path"), { stroke: "#F47E2A", duration: 0.4, immediateRender: false }, tWorth - 0.1);
    // ping scale 1.10 (r 154) stays clear of the stopwatch badge plate (bottom edge 166 px above the centre)
    nx.ping(ld.querySelector(".ring"), tWorth + 0.1, { scale: 1.1 });
    sfx("bloom", tWorth);

    /* ---------- beat 5: the proof. "Over ten years ... more than 800 offers, from junior and senior engineers to team
       leads and managers, backed by an IT talent database of nearly 5,000 CVs" ---------- */
    // three equal cards in spoken order, left to right: OFFERS (800+, a 10-segment years track) | the level staircase
    // Junior -> Senior -> Team lead -> Manager | IT CVs (~5,000, the database bar). 480 x 470, gap 56: 184..1736, centred.
    // The cards stand from the push with their REAL content ghosted (greyscale plates at 0.35, the labels grey, the level
    // chips as faint outlines) and the number slots EMPTY (a ghost "0+" read as "zero offers"); each part lights on its word.
    // the proof cues are read in spoken order and each is held at least 0.2 s after the previous one: a cue that misses
    // whisper falls back to a char-fraction estimate that can land before the scene, and must never fire a count early
    const P5K = ["over", "ten", "eight", "offers", "junior", "senior", "team", "managers", "backed", "it", "database", "five", "cvs"];
    const P5 = {};
    P5K.reduce((prev, k) => (P5[k] = Math.max(C("s05", k), prev + 0.2)), C("s05", "meeting"));
    const tMeet = C("s05", "meeting"), tOver = P5.over, tTen = P5.ten, tEight = P5.eight,
      tOffers = P5.offers, tLv = ["junior", "senior", "team", "managers"].map((k) => P5[k]),
      tBack = P5.backed, tIT = P5.it, tDb = P5.database, tFive = Math.max(P5.five, tDb + 0.6), tCVs = Math.max(P5.cvs, tFive + 0.2);
    const B5 = beat();
    const tP5 = Math.max(tMeet + 0.62, tOver - 0.5);
    tl.to(in4b, { yPercent: -110, duration: 0.13, ease: "power2.in", immediateRender: false }, tP5);
    tl.to(L4.e, { y: -12, autoAlpha: 0, duration: 0.13, ease: "power2.in", immediateRender: false }, tP5);
    tl.to(hl4b, { autoAlpha: 0, duration: 0.01, immediateRender: false }, tP5 + HO);
    push(B3, B5, tP5, 0.22, 0.4);
    const tT5 = tP5 + PRE;
    // the headline follows the voice: "over ten years" first, then on "backed" it rises out and "backed by a database" rises in
    // (the card under it carries "IT talent database", so the line does not repeat it)
    const L5 = head(B5, "5", "This approach", ["Over <em class=\"s05-ten\">ten years</em>"]);
    const hl5b = add(L5.hl.parentElement, `<div class="hl s05-hl s05-hlb" data-box="s05-hl5b"><span class="line" style="display:inline-block">Backed by a <em>database</em></span></div>`);
    tl.fromTo(L5.hl, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, tT5);
    clipS(L5.e, tT5, { dir: "l", dur: 0.45 });
    const in5 = nx.lineRise(L5.lines, Math.max(tP5 + HO, tOver - 0.25), { dur: 0.5 });
    const tem = L5.hl.querySelector(".s05-ten");
    tl.to(tem, { scale: 1.06, duration: 0.16, ease: "power2.out", immediateRender: false }, tTen - 0.1);
    tl.to(tem, { scale: 1, duration: 0.3, ease: "power2.inOut", immediateRender: false }, tTen + 0.12);
    const tSw5 = Math.max(tLv[3] + 0.2, tBack - 0.4);
    tl.to(in5, { yPercent: -110, duration: 0.25, ease: "power2.in", immediateRender: false }, tSw5);
    tl.to(L5.hl, { autoAlpha: 0, duration: 0.01, immediateRender: false }, tSw5 + 0.33);
    tl.fromTo(hl5b, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, tSw5 + 0.33);
    nx.lineRise(hl5b.querySelectorAll(".line"), tSw5 + 0.33, { dur: 0.5 });
    const PW = 480, PH = 470, PT = 330, PX5 = [184, 720, 1256];
    const GREY = "#CBD5E1", INK = "#1E293B", ACC3 = "#1B7FB0";
    const pcard = (k, inner) => add(B5, `<div class="hc s05-p5" data-box="s05-p5${k}" style="left:${PX5[k]}px;top:${PT}px;width:${PW}px;height:${PH}px">${inner}</div>`);
    // number card: plate, number, label, the track below with its label
    const ncard = (k, lb, tlb, segs) => pcard(k, `<div class="num pn">0</div><div class="lbl pl">${lb}</div>` +
      `<div class="trk">${segs ? Array.from({ length: segs }, () => `<i class="sg"></i>`).join("") : `<i class="bar"></i>`}</div><div class="lbl tl">${tlb}</div>`);
    const p1 = ncard(0, "Offers", "10 years", 10);
    const p3 = ncard(2, "IT CVs", "IT talent database", 0);
    // the staircase card: four 40 px level chips (Manager on top, 14 px apart) from y 172 (the numbers' top) to 374 (the
    // tracks' bottom), its label on the same row as the outer cards' track labels (vo: "... engineers to team leads and managers")
    const LVN = ["Junior", "Senior", "Team lead", "Manager"], SW = 216, SDX = 52, SDY = 54, SL = (PW - SW - 3 * SDX) / 2, ST = 334;
    const p2 = pcard(1, `<div class="lbl tl">Engineers to managers</div>`);
    const chips = LVN.map((n, i) => add(p2, `<div class="s05-lv${i === 3 ? " m" : ""}" data-box="s05-lv${i}" style="left:${SL + i * SDX}px;top:${ST - i * SDY}px;width:${SW}px"><i class="gh"></i><i class="fc"></i><i class="d"></i><span class="tx">${n}</span></div>`));
    const PL5 = ["star_award", "rising_steps", "profile_stack"].map((ic, k) => nx.plate([p1, p2, p3][k], ic, (PW - 128) / 2, 28, "M", { id: `s05-p5${k}-pl`, tint: k === 0 ? "orange" : "blue" }));
    // ghost states are the from-states of these entrances (immediateRender), so every seek shows the right state
    // plates keep their size (the three plates are one row of equal icons), only colour and alpha light up
    const lightPlate = (pl, at) => tl.fromTo(pl, { autoAlpha: 0.35, filter: "grayscale(1)" }, { autoAlpha: 1, filter: "grayscale(0)", duration: 0.5, ease: "sine.inOut" }, at);
    const lightText = (el, at, to) => tl.fromTo(el, { color: GREY }, { color: to, duration: 0.35, ease: "sine.inOut" }, at);
    // shells ride in with the push (bottom wipe, staggered left to right)
    // they start inside the still hidden beat (like the other pushes) so the stage is never empty when it turns visible
    [p1, p2, p3].forEach((p, k) => clipS(p, tP5 - 0.04 + k * 0.06, { dir: "b", dur: 0.42 }));
    // the number slot stays empty until its word, then the orange gradient number pops in as it counts
    const fill = (p, at, to, fmt, tLbl) => {
      const n = p.querySelector(".pn");
      tl.fromTo(n, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: "back.out(1.6)" }, at - 0.2);
      nx.count(n, at - 0.15, to, { dur: 0.65, fmt });
      lightText(p.querySelector(".pl"), tLbl - 0.15, INK);
    };
    // "over ten years": the label lights, then the ten year segments fill left to right
    lightText(p1.querySelector(".tl"), tTen - 0.2, ACC3);
    tl.fromTo(p1.querySelectorAll(".sg"), { backgroundColor: "#E2E8F0" }, { backgroundColor: "#F47E2A", duration: 0.12, stagger: 0.045, ease: "none" }, tTen - 0.1);
    sfx("tick", tTen - 0.1, -4);
    // "more than eight hundred offers": the plate lights, 0+ counts to 800+
    lightPlate(PL5[0], tEight - 0.4);
    fill(p1, tEight, 800, (v) => Math.round(v) + "+", tOffers);
    sfx("impact", tEight - 0.1, -4);
    // the levels in spoken order: the outline chip fills, its text and dot light
    lightPlate(PL5[1], tLv[0] - 0.45);
    chips.forEach((ch, i) => {
      const at = tLv[i] - 0.15, m = i === 3;
      tl.fromTo(ch, { scale: 0.92 }, { scale: 1, duration: 0.45, ease: "back.out(1.6)" }, at);
      tl.fromTo(ch.querySelector(".fc"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: "sine.inOut" }, at);
      tl.to(ch.querySelector(".gh"), { autoAlpha: 0, duration: 0.3, ease: "sine.inOut", immediateRender: false }, at);
      tl.fromTo(ch.querySelector(".tx"), { color: "rgba(30,41,59,.4)", textShadow: "0px 1px 1px rgba(110,40,0,0)" },
        { color: m ? "#FFFFFF" : INK, textShadow: `0px 1px 1px rgba(110,40,0,${m ? 0.35 : 0})`, duration: 0.3, ease: "sine.inOut" }, at);
      tl.fromTo(ch.querySelector(".d"), { backgroundColor: GREY }, { backgroundColor: m ? "#FFFFFF" : "#25A1DB", duration: 0.25, ease: "none" }, at + 0.2);
      sfx("tick", at, -4);
    });
    lightText(p2.querySelector(".tl"), tLv[3] + 0.15, ACC3);
    // "backed by an IT talent database": the label, the plate and the bar, then "nearly five thousand CVs"
    lightText(p3.querySelector(".tl"), tIT - 0.15, ACC3);
    lightPlate(PL5[2], tDb - 0.3);
    tl.fromTo(p3.querySelector(".trk .bar"), { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "nx.out" }, tDb - 0.2);
    fill(p3, tFive, 5000, (v) => "~" + Math.round(v).toLocaleString("en-US"), tCVs);
    sfx("impact", tFive - 0.1, -4);
    // keep the finished frame alive until the OUT transition
    nx.float(PL5, tCVs + 0.6, t1, { amp: 5, per: 2.8 });

    out("s05", ({ cur, next }) => nx.T_grid(cur, next, cur.t1, TRANS, { n: 8, dur: 1.1 }));
  }
