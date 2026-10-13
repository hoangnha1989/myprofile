  /* ===== S03 CAREER PATH (gold). Hero FX: a timeline drawn as hops over a wide dashed baseline ("a wide view", drawn from the centre out to both edges, with
   People and Business plates hanging from its two ends until Banking lands);
     four milestone cards hang from it in spoken order, each with a clay plate, and the track slides left as each one is read
     so the cards already said always sit centred on x=960. A "Talent acquisition" bracket lands with the first role it groups
     and grows as each one joins; the IT branch card fills a 30-dot team grid, the HR card five year segments.
     Event strip (BRIEF_GOLD 9): on "presented" the talk photo slams in big; during its hold the scene makes room behind the
     scrim (the track scales to 0.86 about its bottom centre, the heading moves to the left of the header band), then the
     photo docks in the left slot of a two-photo strip at the top right and the Speaker chip lands next to it on "AI"; on
     "HR" the conference photo slams in and docks in the right slot (x 1076..1676, level with the right edge of the scaled
     cards). OUT: wipe to the left. ===== */
  {
    const [t0, t1] = W("s03");
    const S = scene("s03", { cam: [[t0, 1.0], [t1, 1.025]] });
    const c = S.cam;
    const q = (k) => C("s03", k);
    const tPath = q("path"), tWide = q("wide"), tPeople0 = q("people0"), tBusiness = q("business"), tBank = q("banking"), tSettle = q("settlement"),
      tBuilt = q("built"), tTalent = q("talent"), tRan = q("ran"), tBranch = q("branch"), tThirty = q("thirty"),
      tJap = q("japanese"), tSpent = q("spent"), tFive = q("five"), tHr = q("hr"), tToday = q("today"), tSenior = q("senior"),
      tExec = q("executive"), tFirm = q("firm"),
      tTech = q("technology"), tTalent2 = q("talent2"), tPresented = q("presented"), tAI = q("ai");

    /* ---- heading: centred on x=960 while the path is told (left edge at x 244 + a translate of 716 px - 50 % of its width);
       when the talk photo takes the right of the header band it moves to the left edge of the scaled cards ---- */
    const eb = add(c, `<div class="eyebrow s03-eb" data-box="s03-eb">My path</div>`);
    nx.clip(eb, Math.min(tPath - 0.55, t0 + 0.25), { dir: "l", dur: 0.6 });
    const hl = add(c, `<div class="hl s03-hl" data-box="s03-hl"><span class="line">A <em>wide view</em> of people and business</span></div>`);
    tl.set([eb, hl], { x: 716, xPercent: -50, transformOrigin: "0% 0%" }, 0);
    // the headline rises with the eyebrow as soon as s02 has gone, so the frame is never left with only the eyebrow
    nx.lineRise(hl.querySelectorAll(".line"), Math.max(t0 + 0.4, tPath - 0.9));

    /* ---- track: 4 slots of 392 px, gap 32 (pitch 424), group 128..1792 centred on 960 when all are in.
       Node of each card sits above its plate centre (card left + 92). Offset with n cards in = (4 - n) * 212. ---- */
    const PITCH = 424, X = (i) => 128 + PITCH * i, NX_ = (i) => X(i) + 92, LY = 100; // svg-local line y (global 430)
    const OFF = (n) => (4 - n) * (PITCH / 2);
    const view = add(c, `<div class="s03-view"></div>`);
    const track = add(view, `<div class="s03-track"></div>`);
    tl.set(track, { x: OFF(1) }, 0);
    // "a wide view": the dashed base opens from the frame centre out to both edges (screen x 80..1840 under the mask) while
    // the track still rests at OFF(1); base spans track x -700..2100 so it covers the whole width at every slide and at 0.86.
    // It reaches both ends (33.3) before the People node pops on "people", so no node ever floats off the line.
    // The clip is lifted before the first slide (the masked edges already hide anything outside 170..1750).
    const base = add(track, `<div class="s03-base"></div>`);
    tl.fromTo(base, { clipPath: "inset(0px 1776px 0px 1024px)" }, { clipPath: "inset(0px 896px 0px 144px)", duration: 0.8, ease: "nx.inOut" }, tWide - 0.25);
    tl.set(base, { clipPath: "inset(0px 0px 0px 0px)" }, tRan - 1.3);
    // "of people and business": the two ends of that wide line each get a clay plate, People on the left and Business on the
    // right (960 -/+ 620), hanging from the line like the milestone cards; as Banking lands they fold in towards it and go
    const END_Y = 476, ends = [
      { x: 340, ic: "team_group", t: "People", at: tPeople0, id: "s03-pp", dx: 60 },
      { x: 1580, ic: "briefcase", t: "Business", at: tBusiness, id: "s03-bz", dx: -60 }
    ].map((e) => {
      const g = add(c, `<div class="s03-end"></div>`);
      const node = add(g, `<div class="s03-node" style="left:${e.x - 10}px"></div>`);
      const stem = add(g, `<div class="s03-stem" style="left:${e.x - 1}px"></div>`);
      const pl = nx.plate(g, e.ic, e.x - 84, END_Y, "L", { id: e.id });
      const lb = add(g, `<div class="s03-end-lb" data-box="${e.id}-lb" style="left:${e.x - 150}px">${e.t}</div>`);
      nx.pop(node, e.at - 0.15);
      tl.fromTo(stem, { scaleY: 0 }, { scaleY: 1, duration: 0.35, ease: "nx.out" }, e.at - 0.15);
      tl.fromTo(pl, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "nx.out" }, e.at - 0.1);
      tl.fromTo(lb, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "nx.out" }, e.at + 0.05);
      sfx("pop", e.at - 0.05, -8);
      tl.to(g, { x: e.dx, autoAlpha: 0, duration: 0.5, ease: "nx.inOut", immediateRender: false }, tBank - 0.6);
      return g;
    });
    const hop = (a, b) => `M${a} ${LY} C${a + 140} 8 ${b - 140} 8 ${b} ${LY}`;
    const svg = add(track, `<svg class="s03-svg" width="2000" height="140" viewBox="0 0 2000 140">
      <path class="seg" d="M${NX_(0) - 210} ${LY} L${NX_(0)} ${LY}"/>
      ${[0, 1, 2].map((i) => `<path class="seg" d="${hop(NX_(i), NX_(i + 1))}"/>`).join("")}
    </svg>`);
    const segs = svg.querySelectorAll(".seg");
    nx.draw(segs[0], tBusiness - 0.3, { dur: 0.9 });

    // "built my career in talent acquisition": the track makes room, the path hops on to the next stop (node 1) and the chip
    // lands on "talent" right above that node, so it labels the hop it sits on; its bracket stays at zero width and grows
    // with each role that joins it, so it never spans an empty slot
    const brk = add(track, `<div class="s03-brk"><div class="chip s03-brk-chip" data-box="s03-brk">Talent acquisition</div><i class="ln"></i><i class="tk"></i></div>`);
    const brkLn = brk.querySelector(".ln"), brkTk = brk.querySelector(".tk");
    const LN_L = 302, LN_W = 938; // bracket-local line span (track x 854..1792)
    const brkTo = (i) => X(i) + 392 - 552; // bracket-local right edge of card i
    tl.set(brkLn, { scaleX: 0 }, 0);
    tl.set(brkTk, { x: brkTo(1) - (LN_L + LN_W) }, 0);
    // the chip lands on "talent" centred over the Banking-to-IT hop (track x 432) while Banking is still centred, so it labels
    // the move it names; it then rides the slide to its rest place over the roles it groups
    const BRK_LAND = 432 - 141 - 552; // chip centre (282 px wide) on the hop midpoint, relative to its rest left
    tl.set(brk, { x: BRK_LAND }, 0);
    nx.slide(brk.querySelector(".chip"), tTalent - 0.2, { x: -30, dur: 0.6 });
    sfx("whoosh-soft", tTalent - 0.2, -6);
    const grow = (i, t) => {
      const w = brkTo(i) - LN_L;
      tl.to(brkLn, { scaleX: w / LN_W, duration: 0.7, ease: "nx.inOut", immediateRender: false }, t);
      if (i > 1) tl.to(brkTk, { x: brkTo(i) - (LN_L + LN_W), duration: 0.7, ease: "nx.inOut", immediateRender: false }, t);
    };

    const M = [
      { ic: "bank", t: "Banking", row2: `<div class="sub">International settlement</div>`,
        row3: `<div class="desk"><span class="ep">${icon("globe", 26, P.acc3, 2)}</span><svg class="fl" width="240" height="20" viewBox="0 0 240 20"><path class="fl-ln" d="M4 10 H226"/><path class="fl-hd" d="M218 3 L228 10 L218 17"/></svg><span class="ep ok">${icon("check", 20, "#FFFFFF", 2.6)}</span></div>` },
      { ic: "team_group", t: "IT Branch Manager", row2: `<span class="num n">30</span><span class="u">people</span>`,
        row3: `<div class="grid30">${Array.from({ length: 30 }, (_, k) => `<i style="left:${(k % 15) * 22}px;top:${Math.floor(k / 15) * 20}px"></i>`).join("")}</div>`,
        chip: `<span class="chip s03-co" data-box="s03-co"><b>Japanese</b><b>company</b></span>` },
      { ic: "manager", t: "HR &amp; Recruiting<br>Manager", row2: `<span class="num n">5</span><span class="u">years</span>`,
        row3: `<div class="yrs">${"<i><b></b></i>".repeat(5)}</div>` },
      { ic: "magnifier_person", t: "Executive Search", row2: `<div class="sub">Senior tech</div>`, tint: "orange",
        row3: `<div class="short">${Array.from({ length: 5 }, (_, k) => `<span class="av${k === 3 ? " pick" : ""}">${icon("user", 20, P.acc3, 2.2)}${k === 3 ? `<span class="on">${icon("user", 20, "#FFFFFF", 2.2)}</span>` : ""}</span>`).join("")}<span class="ok">${icon("check", 18, "#FFFFFF", 2.6)}</span></div>`,
        chip: `<span class="chip acc s03-tag" data-box="s03-tag">Today</span>` }
    ];
    const cards = M.map((m, i) => {
      const node = add(track, `<div class="s03-node${i === 3 ? " now" : ""}" style="left:${NX_(i) - 10}px"></div>`);
      const stem = add(track, `<div class="s03-stem" style="left:${NX_(i) - 1}px"></div>`);
      const card = add(track, `<div class="hc s03-card${i === 3 ? " now" : ""}" data-box="s03-card${i}" style="left:${X(i)}px">
        <i class="glow"></i>
        <div class="ttl">${m.t}</div>
        <div class="r2">${m.row2}</div>
        <div class="r3">${m.row3}</div>
        ${m.chip || ""}
      </div>`);
      const plate = nx.plate(card, m.ic, 28, 28, "M", { id: `s03-plate${i}`, tint: m.tint });
      return { node, stem, card, plate, m, ttl: card.querySelector(".ttl"), r2: card.querySelector(".r2"), r3: card.querySelector(".r3"),
        glow: card.querySelector(".glow"), chip: card.querySelector(".chip") };
    });

    // a card enters with its node, stem and plate; its glow marks the milestone being read
    const enter = (i, t, nodeIn = true) => {
      const o = cards[i];
      if (nodeIn) nx.pop(o.node, t - 0.1);
      tl.fromTo(o.stem, { scaleY: 0 }, { scaleY: 1, duration: 0.35, ease: "nx.out" }, t);
      nx.blurIn(o.card, t + 0.05, { blur: 10, scale: 1.015, dur: 0.7 });
      // the plate fades in at full size (no scale, no overshoot), so the plate row keeps one size even mid-entrance
      tl.fromTo(o.plate, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: "sine.out" }, t + 0.1);
      tl.fromTo(o.glow, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "sine.out", immediateRender: false }, t + 0.4);
      // the previous milestone lets go of its glow before the new one lights, so only one card is ever highlighted
      if (i) tl.to(cards[i - 1].glow, { autoAlpha: 0, duration: 0.4, ease: "sine.inOut", immediateRender: false }, t - 0.35);
      sfx("whoosh-soft", t, -4);
    };
    // every card is labelled as it lands, so no milestone ever reads as an empty box
    const title = (i, t) => nx.clip(cards[i].ttl, t, { dir: "l", dur: 0.55 });
    // the track slides left so the cards already said stay centred
    const slide = (n, t) => {
      tl.to(track, { x: OFF(n), duration: 1.0, ease: "nx.inOut", immediateRender: false }, t);
      sfx("whoosh", t, -8);
    };

    // 1 Banking, international settlement
    // the headline owns its line: the card waits for "banking" and lands already labelled
    enter(0, tBank - 0.35);
    title(0, tBank - 0.25);
    const c0 = cards[0];
    nx.clip(c0.r2, tSettle - 0.25, { dir: "l", dur: 0.6 });
    // settlement desk: a cross-border transfer runs from the globe to the settled tick
    nx.pop(c0.r3.querySelector(".ep"), tSettle - 0.1);
    nx.draw(c0.r3.querySelectorAll(".fl path"), tSettle, { dur: 0.6, stagger: 0.3 });
    nx.pop(c0.r3.querySelector(".ok"), tSettle + 0.55);
    sfx("tick", tSettle + 0.6, -8);

    // "talent acquisition": Banking stays centred under the chip through the pause; just before "ran" the hop starts under
    // the chip and the track slides, so the hop, its stop and the IT card arrive together (no bare node, no empty half frame)
    nx.draw(segs[1], tRan - 1.2, { dur: 0.9 });
    slide(2, tRan - 1.0);
    tl.to(brk, { x: 0, duration: 1.0, ease: "nx.inOut", immediateRender: false }, tRan - 1.0);

    // 2 IT branch of thirty people, for a Japanese company
    enter(1, tRan - 0.2);
    grow(1, tRan - 0.1);
    tl.fromTo(brkTk, { scaleY: 0 }, { scaleY: 1, duration: 0.3, ease: "nx.out" }, tRan + 0.5);
    title(1, tBranch - 0.55);
    const c1 = cards[1];
    nx.clip(c1.r2, tThirty - 0.25, { dir: "l", dur: 0.5 });
    // count and grid both land on 30 by tThirty + 0.5, before the rest beat
    nx.count(c1.r2.querySelector(".n"), tThirty - 0.25, 30, { dur: 0.7 });
    tl.fromTo(c1.r3.querySelectorAll(".grid30 i"), { autoAlpha: 0, scale: 0 },
      { autoAlpha: 1, scale: 1, duration: 0.3, stagger: 0.012, ease: "back.out(2)" }, tThirty - 0.25);
    sfx("shimmer", tThirty);
    nx.clip(c1.chip, tJap - 0.2, { dir: "t", dur: 0.5 });
    sfx("pop", tJap - 0.1, -6);

    // 3 five years as HR and Recruiting Manager
    slide(3, tSpent - 0.85);
    nx.draw(segs[2], tSpent - 0.4, { dur: 0.7 });
    enter(2, tSpent - 0.1);
    grow(2, tSpent);
    const c2 = cards[2];
    nx.clip(c2.r2, tFive - 0.2, { dir: "l", dur: 0.5 });
    nx.count(c2.r2.querySelector(".n"), tFive - 0.15, 5, { dur: 0.5 });
    tl.fromTo(c2.r3.querySelectorAll(".yrs b"), { scaleX: 0 }, { scaleX: 1, duration: 0.22, stagger: 0.09, ease: "nx.out" }, tFive - 0.1);
    title(2, tHr - 0.25);
    sfx("tick", tHr, -6);

    // 4 Today: executive search, senior tech
    slide(4, tToday - 0.85);
    nx.draw(segs[3], tToday - 0.45, { dur: 0.7 });
    enter(3, tToday - 0.15);
    grow(3, tToday - 0.05);
    // spoken order: "Today, I recruit senior technology talent for a US executive search firm"
    const c3 = cards[3];
    title(3, tToday + 0.2);
    nx.settle(c3.chip, tToday + 0.3, { from: 0.7 });
    nx.clip(c3.r2, tSenior - 0.2, { dir: "l", dur: 0.5 });
    // shortlist: the technology candidates line up, then one senior hire is picked on "talent"
    const avs = c3.r3.querySelectorAll(".av"), pick = c3.r3.querySelector(".pick");
    tl.fromTo(avs, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.07, ease: "nx.out" }, tTech - 0.2);
    tl.fromTo(pick, { backgroundColor: "#EEF6FB", borderColor: "rgba(37,161,219,.35)" },
      { backgroundColor: "#F47E2A", borderColor: "#DD6417", duration: 0.35, ease: "sine.out", immediateRender: false }, tTalent2 - 0.2);
    tl.fromTo(pick.querySelector(".on"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: "sine.out", immediateRender: false }, tTalent2 - 0.2);
    nx.pop(c3.r3.querySelector(".ok"), tTalent2 - 0.05);
    sfx("tick", tTalent2, -8);
    // "Executive search" is labelled as the card lands on "Today" (like the other three); "executive" then accents it
    tl.fromTo(c3.ttl, { scale: 1 }, { scale: 1.04, duration: 0.25, ease: "sine.inOut", yoyo: true, repeat: 1, immediateRender: false }, tExec - 0.15);
    const ringN = add(track, `<div class="s03-nring" style="left:${NX_(3) - 22}px"></div>`);
    nx.ping(ringN, tToday + 0.1, { scale: 2.6 });
    nx.ping(ringN, tFirm - 0.15, { scale: 2.6 });
    nx.ping(ringN, tFirm + 0.9, { scale: 2.6 });
    nx.float(c3.plate, tFirm, t1, { amp: -4, per: 2.4 });

    /* ---- event strip: the talk photo slams in on "presented", holds, docks in the left slot of a two-photo strip at the
       top right; the Speaker chip lands next to it on "AI"; once it has docked the conference photo slams in on "HR",
       holds, and docks in the right slot. Both slots are 288 x 162 (both photos cropped to 16:9), gap 24, top 150,
       the strip's right edge on the right edge of the scaled cards (1676): x 1076..1364 and 1388..1676 ---- */
    const EV_W = 288, EV_G = 24, EV_Y = 150, EV_AR = 162 / 288, EV_X = (i) => 1676 - EV_W - (1 - i) * (EV_W + EV_G), SC_S = 0.86;
    const tSlam = tPresented - 0.15;
    // making room happens behind the scrim while the talk photo is big: the track scales about its bottom centre so cards
    // keep their bottom line (856) and centre (960); the heading takes the left of the header band, its left edge on the
    // scaled card row (960 - 832 * 0.86 = 244), its right end 32 px short of the strip (HL_K fits the 1183 px line in 800 px)
    const HL_K = 0.67, tRoom = tSlam + 0.45;
    tl.set(track, { transformOrigin: "960px 856px" }, 0);
    tl.to(track, { scale: SC_S, duration: 0.8, ease: "nx.inOut", immediateRender: false }, tRoom);
    tl.to(hl, { x: 0, xPercent: 0, scale: HL_K, duration: 0.8, ease: "nx.inOut", immediateRender: false }, tRoom);
    tl.to(eb, { x: 0, xPercent: 0, duration: 0.8, ease: "nx.inOut", immediateRender: false }, tRoom);
    const spk = add(c, `<div class="chip s03-spk" data-box="s03-spk"><b>Speaker</b><i></i>AI in HR &amp; recruitment</div>`);
    const sc = nx.showcase(c, "talk_ai_hr.png", tSlam, { slot: { x: EV_X(0), y: EV_Y, w: EV_W }, ar: EV_AR, hold: 0.8, id: "s03-talk" });
    sc.el.classList.add("s03-ev");
    sfx("impact", tSlam, -6);
    sfx("whoosh-soft", sc.tFly, -6);
    // the chip slides out from the docked photo's side as the photo settles
    nx.slide(spk, Math.max(sc.tDock - 0.05, tAI - 0.15), { x: 40, dur: 0.6 });
    sfx("pop", tAI - 0.05, -6);
    // the conference photo: only after the talk photo has docked, big for 0.5 s of slam + 0.9 s of hold
    const tSlam2 = Math.max(sc.tDock + 0.1, q("hr2") - 0.15);
    const sc2 = nx.showcase(c, "event_asean_hr_2024.png", tSlam2, { slot: { x: EV_X(1), y: EV_Y, w: EV_W }, ar: EV_AR, hold: 0.9, id: "s03-conf" });
    sc2.el.classList.add("s03-ev", "s03-conf");
    sfx("impact", tSlam2, -8);
    sfx("whoosh-soft", sc2.tFly, -6);

    out("s03", ({ cur, next }) => nx.T_wipe(cur, next, cur.t1, { dir: "l", dur: 0.8 }));
  }
