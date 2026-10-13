  /* ===== S11 DIGITIZING THE REST OF HR (gold): a numbered rail (01 virtual office · 02 candidate chat · 03 CV / JD scoring)
     drives three beats pushed across one stage: clay desks pulse while a gold timesheet card fills itself, chat bubbles are
     sealed inside the company card while the person moves on, CV and JD cards are matched into a clay score gauge.
     End line "HR that runs on data". App showcase (BRIEF_GOLD rule 9): four real screenshots slam in big on the words that name
     them (virtual office, chat platform, applicant tracking system, scores each CV) and dock one by one into a 2 x 2 grid under
     the rail, where they stay. Exit: T_dip. ===== */
  {
    const [t0, t1] = W("s11");
    const S = scene("s11", { cam: [[t0, 1.0], [t1, 1.015]] });
    const c = S.cam;
    const k = (n) => C("s11", n);
    const tRest = k("rest"), tVirt = k("virtual"), tRec = k("records"), tTs = k("timesheets"), tMgr = k("managers"),
      tPaper = k("paperwork"), tChat = k("chat"), tKeeps = k("keeps"), tInside = k("inside"), tKnow = k("knowledge"),
      tMove = k("move"), tApp = k("applicant"), tScores = k("scores"), tAgainst = k("against"), tFast = k("faster"),
      tFair = k("fairer"), tGoal = k("goal"), tData = k("data"), tHuman = k("human");
    const R = nx.rng(1101);
    const IMG = (n, px, cls) => `<img class="${cls || ""}" alt="" decoding="sync" src="${nx.ICON(n)}" width="${px}" height="${px}"/>`;
    // app showcase schedule (real seconds: slam 0.5 + hold + dock 0.7), one at a time, each on the words that name it; the
    // beats behind a slam keep running, so the beat moments that would be hidden (chat seal, CV / JD scoring) wait for its dock
    // the dashboard starts on "And an" (not "applicant") so the dense screen holds sharp for 0.8 s before "scores" pulls it
    // away; the CV / JD card waits for that dock, then holds 0.7 so the scoring can start right after "against the job"
    const SC = [["S11_remote-virtual-office.png", tVirt - 0.1, 1.0], ["S12a_zalo-chat-window.png", tChat - 0.1, 1.0],
      ["S12d_ats-dashboard.png", WT("And", tMove), 0.8]];
    SC.push(["S12c_ats-matching-jd-cv.png", Math.max(WT("CV", tScores) - 0.45, SC[2][1] + 0.5 + SC[2][2] + 0.7), 0.7]);
    const scFly = SC.map(([, at, hold]) => at + 0.5 + hold), scDock = scFly.map((t) => t + 0.7);

    /* ---- rail: eyebrow + three numbered rows on a spine (gold discs) ---- */
    // the intro owns the title (a centred headline); the rail eyebrow takes it over when the rail is built on beat 1
    const eb = add(c, `<div class="eyebrow s11-eb" data-box="s11-eb">The rest of HR</div>`);
    const ROWS = [["Virtual office", "Auto timesheet", "No paperwork"], ["Candidate chat", "In-house", "Knowledge stays"],
      ["CV ↔ JD scoring", "Scores each CV", "Faster, fairer"]];
    // row pitch 120 (rows 240..572): the dock grid of the showcase sits under the rail
    const RP = 120;
    const rail = add(c, `<div class="s11-rail"></div>`);
    const spine = add(rail, `<svg class="spine" width="4" height="${2 * RP}" viewBox="0 0 4 ${2 * RP}"><path d="M2 0V${2 * RP}" stroke="${P.line2}" stroke-width="2"/><path class="lit" d="M2 0V${2 * RP}" stroke="${P.acc}" stroke-width="3"/></svg>`);
    const rows = ROWS.map((r, i) => add(rail, `<div class="row" style="top:${i * RP}px" data-box="s11-row${i + 1}">
      <div class="node"><i class="soft"></i><i class="fill"></i><span>0${i + 1}</span></div><div class="tt line"><span class="in">${r[0]}</span></div>
      <div class="rs"><span class="sub">${r[1]}</span><span class="res">${icon("arrowR", 22, P.acc2, 2.2)}<b>${r[2]}</b></span></div></div>`));
    const nodes = rows.map((r) => r.querySelector(".node"));
    // the rail belongs to the three beats: it is built when beat 1 starts (the intro owns the whole frame)
    // handover = a short crossfade around tCut (a one-frame cut read as a jump in the render): the intro steps back from tIO (scale + blur, alpha down to ~0.6) and is removed at tCut,
    // the same instant the rail and the office card appear. Both are built from tIO while still hidden (discs, numbers,
    // spine, row 01 title, desks), so the first frame after the cut is already a full beat-1 frame: never an empty or
    // one-sided frame (frame balance), never the intro and the beat-1 units on screen together (overlap)
    const tIO = Math.max(tRest + 0.62, tVirt - 1.3), tCut = tIO + 0.2, tRail = tIO, tNodes = tIO - 0.05;
    tl.fromTo(rail, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "sine.inOut", fxNoScale: true }, tCut - 0.2);
    nx.draw(spine.querySelector("path"), tNodes, { dur: 0.7 });
    nx.pop(nodes, tNodes, { stagger: 0.03, dur: 0.4 });
    // a row exists on screen only from its own disc on (no empty row boxes ahead of their content)
    // (the pop stagger 0.03 runs 1.3x: 0.039 s real)
    rows.forEach((r, i) => tl.fromTo(r, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, fxNoScale: true }, tNodes + i * 0.039));
    // the disc number starts once its disc is past ~85 % of its scale (back.out, ~0.09 s real), all three numbers read by
    // tNodes + 0.33 (inside the hidden rail: on the cut the discs are grown and numbered)
    nodes.forEach((n, i) => tl.fromTo(n.querySelector("span"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.12, ease: "none", fxNoScale: true }, tNodes + 0.09 + i * 0.039));
    nx.blurIn(eb, tCut, { blur: 8, dur: 0.3 });
    sfx("tick", tCut + 0.03, -8);
    tl.fromTo(spine.querySelector(".lit"), { drawSVG: "0%" }, { drawSVG: "0%", duration: 0.01 }, t0);
    // node states: lit = blue gradient disc + white number; done = pale blue disc + deep-blue number
    // the number never sits white on a still-pale disc: it first darkens to ink (reads on pale and on mid blue), and turns
    // white only once the fill is near solid (default power1.out: alpha ~0.9 at 0.68 of its run = d * 0.84 real, SLOW 1.3x)
    const lit = (i, at, d) => {
      d = d || 0.5;
      tl.to(nodes[i].querySelector(".fill"), { autoAlpha: 1, duration: d, immediateRender: false }, at);
      tl.to(nodes[i].querySelector("span"), { color: P.ink, duration: d * 0.3, immediateRender: false }, at);
      tl.to(nodes[i].querySelector("span"), { color: "#FFFFFF", duration: d * 0.16, immediateRender: false }, at + d * 0.84);
    };
    // the sub-line is its own spoken word (timesheets / inside / scores), so it waits for that word, not the row title
    const lightRow = (i, at, subAt) => {
      const r = rows[i];
      nx.lineRise([r.querySelector(".tt")], at);
      nx.slide(r.querySelector(".sub"), subAt, { x: -24 });
      lit(i, at);
      if (i) {
        tl.to(nodes[i - 1].querySelector(".fill"), { autoAlpha: 0, duration: 0.5, immediateRender: false }, at);
        tl.to(nodes[i - 1].querySelector(".soft"), { autoAlpha: 1, duration: 0.5, immediateRender: false }, at);
        // done: white holds while the fill is still mostly solid, then turns deep blue fast as the pale disc takes over
        tl.to(nodes[i - 1].querySelector("span"), { color: P.acc3, duration: 0.08, immediateRender: false }, at + 0.15);
        tl.to(rows[i - 1].querySelector(".tt .in"), { color: P.body, duration: 0.5, immediateRender: false }, at);
        tl.to(spine.querySelector(".lit"), { drawSVG: i === 1 ? "0% 50%" : "0% 100%", duration: 0.8, ease: "nx.inOut", immediateRender: false }, at - 0.2);
      }
    };
    // payoff wipe 0.45 -> 0.59 s: callers start it so it is complete before the cue word +0.6 s rest frame
    const payoff = (i, at) => { nx.clip(rows[i].querySelector(".res"), at, { dir: "l", dur: 0.45 }); sfx("tick", at + 0.1); };

    /* ---- stage: five panels pushed across (no overflow clip: the gold card shadows must stay whole) ---- */
    const stage = add(c, `<div class="s11-stage"></div>`);
    const pan = [0, 1, 2, 3, 4].map((i) => add(stage, `<div class="pnl p${i + 1}"></div>`));
    // handoff push: the outgoing panel only steps back (24 px, never into the rail column: rail rows end 24 px left of the
    // stage) and blurs, its alpha easing down to ~0.6; at 90 % of that step (tc) it is cut out and the incoming panel cut in
    // at alpha 0.6 in the same instant (then up to 1), so no frame has an empty stage next to the rail (frame balance) and
    // no frame shows the two panels together (overlap).
    // The intro panel (full width) exits in place on its own (below). Start offsets use real seconds: durations run 1.3x (core SLOW).
    const PX = 220, XO = 24, HO = 0.45, SL = 1.3;
    // o.px: shorter travel for a panel whose full-width
    // rows must stay inside the frame while it fades up.
    const push = (i, at, d, o) => {
      d = d || 0.8; o = o || {};
      const tc = at + d * HO * SL * 0.9;
      if (i > 1) {
        tl.to(pan[i - 1], { x: -XO, filter: "blur(8px)", duration: d * HO, ease: "power4.in", immediateRender: false }, at);
        tl.to(pan[i - 1], { autoAlpha: 0, duration: d * HO * SL, ease: "power1.in", immediateRender: false, fxNoScale: true }, at);
      }
      tl.fromTo(pan[i], { x: o.px || PX }, { x: 0, duration: d, ease: "nx.inOut" }, at);
      if (i > 1) {
        tl.fromTo(pan[i], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.32, ease: "power1.inOut", fxNoScale: true }, tc - 0.14);
      } else tl.fromTo(pan[i], { autoAlpha: 0 }, { autoAlpha: 1, duration: d * 0.3, ease: "power4.out" }, at);
      sfx("whoosh-soft", at);
    };
    // card header: S plate + SG label (one header pattern for every card in the scene)
    const head = (card, name, label, id, tint) => {
      const p = nx.plate(card, name, 24, 24, "S", { id, tint });
      const l = add(card, `<div class="lbl s11-hd">${label}</div>`);
      return [p, l];
    };

    // spark: fades in, travels the thread, fades out on arrival (never parks on the last plate)
    const sparkRun = (el, at, dist, d) => {
      tl.fromTo(el, { x: 0 }, { x: dist, duration: d, ease: "nx.inOut", fxNoScale: true }, at);
      tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: "none", fxNoScale: true }, at);
      tl.to(el, { autoAlpha: 0, duration: 0.3, ease: "sine.in", immediateRender: false, fxNoScale: true }, at + d - 0.3);
    };

    /* ---- intro: one idea runs through three areas of HR (three L plates on one thread, equal pitch) ---- */
    // the intro panel spans the whole frame (no rail yet): the group is centred on x = 960
    const p0 = pan[0];
    p0.classList.add("full");
    push(0, t0 + 0.05, 0.6);
    // one icon per concept: office_building = virtual office (the beat-1 card), timesheet stays for "Auto timesheet" only
    const ICO = ["office_building", "chat_bubbles", "cv_resume"], PL = 168, PG = 140, TW = 3 * PL + 2 * PG, PL0 = 960 - TW / 2, PT = 236;
    // title anchor: centred headline over the group (frame y 290..365), plates 426..594, labels 624..692
    const ihl = add(p0, `<div class="hl s11-ihl" data-box="s11-ihl"><span class="line"><span class="in">The rest of <em>HR</em></span></span></div>`);
    // it rises with the first words of the line ("the same idea ... the rest of HR"), the title the three plates belong to
    nx.lineRise([ihl.querySelector(".line")], WT("same", t0) - 0.45);
    const thread = add(p0, `<svg class="s11-thread" width="${TW}" height="8" viewBox="0 0 ${TW} 8" fill="none" stroke="${P.acc}" stroke-width="3" stroke-linecap="round"><path d="M4 4H${TW - 4}"/></svg>`);
    Object.assign(thread.style, { left: PL0 + "px", top: PT + PL / 2 - 4 + "px" });
    const spark = add(p0, `<i class="s11-spark" style="left:${PL0 + 4}px;top:${PT + PL / 2 - 4}px"></i>`);
    const tiles = ICO.map((n, i) => nx.plate(p0, n, PL0 + i * (PL + PG), PT, "L", { id: "s11-tile" + (i + 1) }));
    // one caption unit per plate: number over its word
    const tlab = ICO.map((_, i) => add(p0, `<div class="s11-tlab" style="left:${PL0 + i * (PL + PG) - 46}px" data-box="s11-tlab${i + 1}"><span class="in"><b class="tn">0${i + 1}</b>${ROWS[i][0]}</span></div>`));
    const nums = tlab.map((e) => e.querySelector(".tn"));
    nx.pop(tiles, t0 + 0.15);
    nx.lineRise(tlab, t0 + 0.3, { dur: 0.6, stagger: 0.06 });
    const tRuns = WT("runs", t0);
    nx.draw(thread.querySelector("path"), tRuns - 0.3, { dur: 1.2 });
    sparkRun(spark, tRuns - 0.3, TW - 8, 1.56);
    tiles.forEach((tt, i) => {
      const at = tRuns - 0.3 + 0.3 + i * 0.28;
      tl.fromTo(tt, { y: 0 }, { y: -12, duration: 0.22, ease: "sine.out", yoyo: true, repeat: 1, immediateRender: false }, at);
      tl.to(nums[i], { color: P.acc3, duration: 0.4, immediateRender: false }, at);
      sfx("tick", at, -10);
    });
    // the intro leaves in place (no x travel), fast, after the "rest" +0.6 s frame; the rail and the office card replace it on the cut
    tl.to(p0, { scale: 0.97, filter: "blur(6px)", duration: 0.2, ease: "expo.in", immediateRender: false, fxNoScale: true }, tIO);
    tl.to(p0, { autoAlpha: 0, duration: 0.5, ease: "sine.inOut", immediateRender: false, fxNoScale: true }, tIO);

    /* ---- beat 1: virtual office (clay desks) -> auto timesheet card fills itself -> no paperwork ---- */
    // row 01 title rises inside the hidden rail from tIO, so on the cut the rail column is never bare discs next to a built card
    lightRow(0, tRail, tTs - 0.25);
    // panel 1 starts while the intro fades, so the rail never stands alone
    push(1, tRail - 0.25);
    const p1 = pan[1];
    const ACT = [0, 2, 4, 5, 7], DW = 136, DH = 108, DG = 12;
    const office = add(p1, `<div class="hc s11-office" data-box="s11-office"></div>`);
    head(office, "office_building", "Virtual office", "s11-p-office");
    const desks = [];
    for (let i = 0; i < 9; i++) {
      const on = ACT.includes(i), x = 22 + (i % 3) * (DW + DG), y = 128 + Math.floor(i / 3) * (DH + DG);
      const d = add(office, `<div class="desk${on ? " on" : ""}" style="left:${x}px;top:${y}px">${IMG("person_bust", 76, "av")}<i class="st"></i><i class="pr"></i></div>`);
      desks.push({ d, on });
    }
    // the office card arrives with the rail and its desks inside it (never an empty card): all nine desks pop together inside
    // the still hidden card from tIO - 0.1 (0.39 s real), which appears on the cut (tCut) with the desks grown in; the live
    // desks pulse on "virtual".
    // Alone on the stage it stands centred (stage x 280..760); it slides to its slot (x 0) after the "virtual" +0.6 s frame,
    // clear of the timesheet card, which only starts once the office edge has passed it
    const OXC = 280, tOff = Math.max(tVirt + 0.62, tRec - 0.4);
    tl.fromTo(office, { x: OXC - 30 }, { x: OXC, duration: 0.5, ease: "nx.out" }, tRail);
    tl.to(office, { x: 0, duration: 0.42, ease: "power3.out", immediateRender: false }, tOff);
    tl.fromTo(office, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "sine.inOut", fxNoScale: true }, tCut - 0.2);
    nx.pop(desks.map((o) => o.d), tIO - 0.1, { dur: 0.3 });
    const live = desks.filter((o) => o.on);
    live.forEach((o, i) => nx.ping(o.d.querySelector(".pr"), tVirt - 0.15 + i * 0.08, { scale: 2.2 }));
    live.forEach((o, i) => {
      nx.ping(o.d.querySelector(".pr"), tRec - 0.25 + i * 0.08, { scale: 2.2 });
      nx.ping(o.d.querySelector(".pr"), tMgr - 0.2 + i * 0.08, { scale: 2.2 });
      nx.ping(o.d.querySelector(".pr"), tPaper + 0.4 + i * 0.08, { scale: 2.2 });
    });
    sfx("pop", tRec - 0.2, -8);
    // the records flow from the office card into the timesheet card: a dashed arrow in the gap between them
    const flow = add(p1, `<svg class="s11-flow" width="56" height="24" viewBox="0 0 56 24" fill="none" stroke="${P.acc}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path class="ln" d="M2 12H50" stroke-dasharray="6 7"/><path class="hd" d="M42 4l9 8-9 8"/></svg>`);
    nx.draw(flow.querySelectorAll("path"), tOff + 0.36, { dur: 0.5, stagger: 0.2 });
    tl.fromTo(flow.querySelector(".ln"), { strokeDashoffset: 0 }, { strokeDashoffset: -52, duration: 4, ease: "none", immediateRender: false, fxNoScale: true }, tRec + 0.6);

    const ts = add(p1, `<div class="hc s11-ts" data-box="s11-ts"></div>`);
    // the card arrives with the records, header included (plate + label in muted ink); the label takes ink on "timesheets"
    const [tsP, tsL] = head(ts, "timesheet", "Auto timesheet", "s11-p-ts");
    tsL.style.color = P.muted;
    tl.to(tsL, { color: P.ink, duration: 0.4, immediateRender: false }, tTs - 0.25);
    const tRows = ACT.map((_, i) => add(ts, `<div class="tr" style="top:${136 + i * 72}px">${IMG("person_bust", 40, "av")}<div class="trk"><i></i></div><div class="ok">${icon("check", 26, P.acc, 2.4)}</div></div>`));
    nx.slide(ts, tOff + 0.17, { x: 40 });
    nx.slide(tRows, tOff + 0.3, { x: 16, stagger: 0.06 });
    const fills = tRows.map((r) => r.querySelector(".trk i"));
    const target = fills.map(() => 0.72 + R() * 0.26);
    // "calculates timesheets automatically": the rows fill from "calculates", the ticks land on "automatically"
    const tCalc = WT("calculates", tRec), tAuto = WT("automatically", tTs - 0.2);
    fills.forEach((f, i) => tl.fromTo(f, { scaleX: 0 }, { scaleX: target[i], duration: 1.0, ease: "nx.out" }, tCalc - 0.1 + i * 0.07));
    nx.pop(tRows.map((r) => r.querySelector(".ok")), tAuto - 0.1, { stagger: 0.08 });
    sfx("tick", tAuto);
    // spoken order, left to right: "managers see real working time" (manager plate + chip under the office card),
    // then "without paperwork" (clipboard plate + struck chip under the timesheet card that replaces it).
    // both groups: S plate 88 + 16 gap + chip 300 x 52, centred under their own card, 28 px under the cards (bottom 524)
    const mgrP = nx.plate(p1, "manager", 38, 552, "S", { id: "s11-p-mgr", tint: "orange" });
    const mgr = add(p1, `<div class="chip acc s11-mgr" data-box="s11-mgr"><span>Real working time</span></div>`);
    // "managers see real working time" is one unit: plate and chip arrive together and are settled by the "managers" +0.6 s frame
    nx.pop(mgrP, tMgr - 0.25);
    nx.settle(mgr, tMgr - 0.2, { from: 0.6, dur: 0.55 });
    const paperP = nx.plate(p1, "survey_clipboard", 598, 552, "S", { id: "s11-p-paper" });
    const paper = add(p1, `<div class="chip s11-paper" data-box="s11-paper"><span>Paperwork<i class="strike"></i></span></div>`);
    const tWo = WT("without", tMgr);
    // the plate fades in at full size with its chip (no scale pop), so the plate row never reads uneven next to the manager plate
    tl.fromTo(paperP, { autoAlpha: 0, filter: "blur(10px)" }, { autoAlpha: 1, filter: "blur(0px)", duration: 0.45, ease: "nx.out" }, tWo - 0.3);
    nx.blurIn(paper, tWo - 0.25, { blur: 10 });
    tl.fromTo(paper.querySelector(".strike"), { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: "nx.inOut" }, tPaper - 0.2);
    // struck = the old way: the plate steps back, the word stays readable (body colour, not a pale fade)
    nx.dim(paperP, tPaper + 0.05, 0.55, { dur: 0.3 });
    tl.to(paper.querySelector("span"), { color: P.body, duration: 0.3, immediateRender: false }, tPaper + 0.05);
    payoff(0, tPaper - 0.35);

    /* ---- beat 2: chat bubbles sealed inside the company card; the person moves on, the knowledge stays ---- */
    // beat 2 waits for the "paperwork" +0.6 s rest frame (row 01 payoff clean), then pushes a little faster
    const b2 = Math.max(tChat - 0.5, tPaper + 0.62);
    lightRow(1, b2, tInside - 0.25);
    // shorter travel: the vault card (right edge stage 1000) stays inside the frame when the panel is cut in
    push(2, b2, 0.7, { px: 140 });
    const p2 = pan[2];
    const person = nx.hero(p2, "person_bust", 24, 172, 240, { id: "s11-person" });
    // the tie spans the gap from the visible figure edge (~226) to the card edge (400), 8 px clear of both
    const tie = add(p2, `<svg class="s11-tie" width="158" height="8" viewBox="0 0 158 8" fill="none" stroke="${P.acc}" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round"><path d="M2 4H156"/></svg>`);
    // ONE card (gold reference calm): the card edge itself becomes the sealed vault, no inner frame
    const vault = add(p2, `<div class="hc s11-vault" data-box="s11-vault"><div class="chat"></div><div class="vseal"></div><div class="vring"></div></div>`);
    head(vault, "chat_bubbles", "Candidate chat", "s11-p-chat");
    const lock = nx.plate(vault, "vault_lock", 488, 24, "S", { id: "s11-p-lock", tint: "orange" });
    const chat = vault.querySelector(".chat");
    const BW = [300, 236, 320, 220, 280];
    const bub = BW.map((w, i) => add(chat, `<div class="bub${i % 2 ? " me" : ""}" style="top:${i * 76}px;${i % 2 ? "right:0" : "left:0"};width:${w}px"><i style="width:${w - 56}px"></i><i style="width:${Math.round((w - 56) * 0.6)}px"></i></div>`));
    const vlbl = add(p2, `<div class="chip s11-vlbl" data-box="s11-vlbl">${IMG("office_building", 32, "")}Inside the company</div>`);
    nx.blurIn(person, b2 + 0.3, { blur: 10 });
    nx.slide(vault, b2 + 0.2, { x: 36 });
    nx.draw(tie.querySelector("path"), tChat - 0.3, { dur: 0.6 });
    // all five bubbles are seated by the "chat" +0.6 s rest frame (the card is never half empty there)
    nx.pop(bub, tChat - 0.2, { stagger: 0.09, dur: 0.38 });
    sfx("pop", tChat - 0.1, -8);
    // sealed once the chat screenshot has left the centre ("keeps ... inside the company")
    const tSeal = Math.max(tKeeps - 0.15, scFly[1] + 0.1);
    tl.fromTo(vault.querySelector(".vseal"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8, ease: "nx.out" }, tSeal);
    sfx("whoosh-soft", tSeal + 0.15, -4);
    // the lock fades in at full size on "inside" (no scale pop), so the header row (chat plate + lock plate) is always even
    tl.fromTo(lock, { autoAlpha: 0, filter: "blur(8px)" }, { autoAlpha: 1, filter: "blur(0px)", duration: 0.5, ease: "nx.out" }, tInside - 0.15);
    sfx("tick", tInside + 0.3);
    nx.slide(vlbl, tInside - 0.15, { x: 0, y: 16 });
    const vring = vault.querySelector(".vring");
    // ring pulses (0.5 -> 0.65 s real) start ahead of their word and are gone well before its +0.6 s rest frame (no doubled edge)
    tl.fromTo(vring, { scale: 1, autoAlpha: 0.9 }, { scale: 1.04, autoAlpha: 0, duration: 0.5, ease: "power2.out", immediateRender: false }, tKnow - 0.45);
    // the person moves on; the conversation stays inside (only 12 px: with the 24 px push step-back it stays at stage x >= 0,
    // never in the rail column)
    tl.to(tie, { autoAlpha: 0, duration: 0.4, immediateRender: false }, tMove - 0.4);
    tl.to(person, { x: -12, autoAlpha: 0.3, duration: 0.9, ease: "nx.inOut", immediateRender: false }, tMove - 0.35);
    tl.to(bub.filter((_, i) => i % 2 === 0), { borderColor: "rgba(37,161,219,.55)", duration: 0.6, stagger: 0.08, immediateRender: false }, tMove + 0.2);
    tl.fromTo(vring, { scale: 1, autoAlpha: 0.9 }, { scale: 1.04, autoAlpha: 0, duration: 0.5, ease: "power2.out", immediateRender: false }, tMove - 0.45);
    payoff(1, tKnow - 0.3);

    /* ---- beat 3: CV and JD cards side by side, skills matched, clay score gauge ---- */
    const b3 = tApp - 0.5;
    lightRow(2, b3, tScores - 0.25);
    push(3, b3);
    const p3 = pan[3];
    const CVW = [210, 150, 230, 120, 180], JDW = [170, 220, 140, 200, 110], RY = (i) => 156 + i * 58;
    const doc = (x, name, ic, widths, side) => {
      const d = add(p3, `<div class="hc s11-doc" style="left:${x}px" data-box="s11-${name.toLowerCase()}"></div>`);
      head(d, ic, name, "s11-p-" + name.toLowerCase());
      add(d, `<div class="hr"></div>`);
      const rowsEl = widths.map((w, i) => {
        const cy = RY(i);
        const bar = add(d, `<i class="bar" style="top:${cy - 5}px;left:${side === "l" ? 28 : 64}px;width:${w}px"></i>`);
        const ad = add(d, `<i class="ad" style="top:${cy - 7}px;left:${side === "l" ? 298 : 28}px"></i>`);
        return { bar, ad };
      });
      return { d, rowsEl };
    };
    // the pair sits in from the stage edges (80..420 and 620..960, centred on the gauge), the 200 px gap is the link track
    const CVX = 80, JDX = 620;
    const cv = doc(CVX, "CV", "cv_resume", CVW, "l"), jd = doc(JDX, "JD", "jd_document", JDW, "r");
    // both cards are in and filled by the "applicant" +0.6 s rest frame; each card's bars draw with its own slide (never an
    // empty ghost card); both start inside the still hidden panel, so they are well in on the push cut (tApp - 0.08)
    nx.slide(cv.d, tApp - 0.3, { x: -30, dur: 0.7 });
    nx.slide(jd.d, tApp - 0.25, { x: 30, dur: 0.6 });
    tl.fromTo(cv.rowsEl.map((r) => r.bar), { scaleX: 0 }, { scaleX: 1, duration: 0.4, stagger: 0.03, ease: "nx.out" }, tApp - 0.3);
    tl.fromTo(jd.rowsEl.map((r) => r.bar), { scaleX: 0 }, { scaleX: 1, duration: 0.4, stagger: 0.03, ease: "nx.out" }, tApp - 0.25);
    // links run dot to dot through the empty gap between the two cards
    // monotone pairs (never crossing): each CV skill meets the JD requirement at the same or the next row
    const MATCH = [[0, 0], [1, 2], [2, 3], [4, 4]], LX0 = CVX + 305, LX1 = JDX + 35, LW = LX1 - LX0;
    const links = add(p3, `<svg class="s11-links" width="${LW}" height="420" viewBox="0 0 ${LW} 420" fill="none" stroke="${P.acc}" stroke-width="2.5" stroke-linecap="round">${MATCH.map(([a, b]) => {
      const ya = RY(a), yb = RY(b);
      return `<path d="M0 ${ya}C${LW / 2} ${ya} ${LW / 2} ${yb} ${LW} ${yb}"/>`;
    }).join("")}</svg>`);
    links.style.left = LX0 + "px";
    // the scoring (links, lit skills, gauge) plays once the CV / JD screenshot has docked, so it is seen, not hidden by the slam
    const tSc = Math.max(tScores, scDock[3] + 0.15);
    nx.draw(links.querySelectorAll("path"), tSc - 0.3, { dur: 0.45, stagger: 0.06 });
    MATCH.forEach(([a, b], i) => {
      const at = tSc + 0.45 + i * 0.29;
      tl.to([cv.rowsEl[a].ad, jd.rowsEl[b].ad], { borderColor: P.acc, backgroundColor: P.acc, duration: 0.3, immediateRender: false }, at);
      tl.to([cv.rowsEl[a].bar, jd.rowsEl[b].bar], { backgroundColor: P.acc, duration: 0.4, immediateRender: false }, at);
    });
    sfx("shimmer", tSc, -6);
    // the score: clay gauge plate + an arc gauge with a "Score" label; no number (the voice says none), the fill is the idea
    const FILL = 82;
    const gauge = add(p3, `<div class="s11-gauge" data-box="s11-gauge"><svg width="240" height="150" viewBox="0 0 240 150" fill="none" stroke-linecap="round">
      <path class="trk" d="M16 136A104 104 0 0 1 224 136" stroke="${P.line2}" stroke-width="12"/>
      <path class="fil" d="M16 136A104 104 0 0 1 224 136" stroke="url(#s11-gg)" stroke-width="12"/>
      <defs><linearGradient id="s11-gg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1B7FB0"/><stop offset="1" stop-color="#5CC4F0"/></linearGradient></defs></svg>
      <div class="lbl s11-glbl" data-box="s11-glbl">Score</div></div>`);
    const gp = nx.plate(gauge, "gauge_meter", 0, 12, "M", { id: "s11-p-gauge", tint: "orange" });
    const glbl = gauge.querySelector(".s11-glbl");
    // the gauge is built with the links (track first), then the arc fills
    nx.settle(gp, tSc - 0.35, { from: 0.5 });
    nx.draw(gauge.querySelector(".trk"), tSc - 0.3, { dur: 0.35 });
    nx.blurIn(glbl, tSc - 0.2, { blur: 6, dur: 0.4 });
    // settled before the "faster" +0.6 s frame
    nx.draw(gauge.querySelector(".fil"), tSc - 0.1, { to: FILL + "%", dur: 0.8, ease: "power2.out" });
    tl.fromTo(gp, { y: 0 }, { y: -10, duration: 0.25, ease: "sine.out", yoyo: true, repeat: 1, immediateRender: false }, tFair - 0.25);
    sfx("bloom", tFair - 0.2, -6);
    payoff(2, tFast - 0.25);

    /* ---- end: HR that runs on data, people free for the human work ---- */
    // the push waits until "fairer" has had its settled frame (+0.6 s), then lands fast so "the goal" has its anchor
    const b4 = Math.max(tGoal - 0.1, tFair + 0.62);
    push(4, b4, 0.5, { px: 120 });
    const p4 = pan[4];
    // centred in the stage: eyebrow, the three beats again as one row ("all of it"), headline, rule, payoff row
    // the eyebrow sits on the rail eyebrow's line (stage -40 = frame 150): one eyebrow baseline in the frame
    const GPL = 168, GPG = 72, GTW = 3 * GPL + 2 * GPG, GX0 = (1040 - GTW) / 2, GPT = 20;
    const geb = add(p4, `<div class="eyebrow s11-geb" data-box="s11-geb">The goal</div>`);
    const gtrk = add(p4, `<svg class="s11-gthread" width="${GTW}" height="8" viewBox="0 0 ${GTW} 8" fill="none" stroke-width="3" stroke-linecap="round"><path class="b" d="M4 4H${GTW - 4}" stroke="${P.line2}"/><path class="f" d="M4 4H${GTW - 4}" stroke="${P.acc}"/></svg>`);
    Object.assign(gtrk.style, { left: GX0 + "px", top: GPT + GPL / 2 - 4 + "px" });
    const gspark = add(p4, `<i class="s11-spark" style="left:${GX0 + 4}px;top:${GPT + GPL / 2 - 4}px"></i>`);
    const gall = ICO.map((n, i) => nx.plate(p4, n, GX0 + i * (GPL + GPG), GPT, "L", { id: "s11-g" + (i + 1) }));
    const ghl = add(p4, `<div class="hl s11-ghl" data-box="s11-ghl"><span class="line"><span class="in">HR that runs</span></span><span class="line"><span class="in">on <em>data</em></span></span></div>`);
    const grule = add(p4, `<div class="s11-grule"></div>`);
    const grow = add(p4, `<div class="s11-grow"><div class="bd s11-gsub" data-box="s11-gsub">People free for the <b>human work</b></div></div>`);
    const gp2 = nx.plate(grow, "team_group", 0, 0, "S", { id: "s11-p-team", tint: "orange" });
    grow.insertBefore(gp2, grow.firstChild);
    const gsub = grow.querySelector(".s11-gsub");
    nx.scramble(geb, b4, { dur: 0.4 });
    nx.pop(gall, b4, { dur: 0.35 });
    const tHR = WT("HR", tGoal), tRunsD = WT("runs", tHR);
    nx.lineRise([ghl.querySelectorAll(".line")[0]], tHR - 0.25);
    nx.lineRise([ghl.querySelectorAll(".line")[1]], WT("on", tHR) - 0.25);
    // "runs on data": the data line runs through all three areas
    nx.draw(gtrk.querySelector(".f"), tRunsD - 0.1, { dur: 0.8 });
    sparkRun(gspark, tRunsD - 0.1, GTW - 8, 1.04);
    tl.fromTo(grule, { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: "nx.inOut" }, tData - 0.05);
    gall.forEach((g, i) => tl.fromTo(g, { y: 0 }, { y: -10, duration: 0.2, ease: "sine.out", yoyo: true, repeat: 1, immediateRender: false }, tRunsD + 0.1 + i * 0.22));
    // the team plate means "people": it pops with its line (the flex row reserves its slot, so the two arrive as one unit),
    // both after the "data" +0.6 s frame
    const tPeople = WT("people", tData), tGrow = Math.max(tPeople - 0.15, tData + 0.62);
    nx.pop(gp2, tGrow);
    nx.chars(gsub, tGrow + 0.03, { stagger: 0.016 });
    sfx("impact", tData - 0.05, -6);
    // "all of it": the three rail discs light together while the end panel lands, then ping when it "runs on data"
    nodes.forEach((n, i) => lit(i, b4, 0.35));
    tl.to(rows.map((r) => r.querySelector(".tt .in")), { color: P.ink, duration: 0.35, immediateRender: false }, b4);
    tl.to(spine.querySelector(".lit"), { drawSVG: "0% 100%", duration: 0.35, immediateRender: false }, b4);
    sfx("tick", b4 + 0.05, -8);
    nodes.forEach((n, i) => {
      const ring = add(rows[i], `<i class="nring"></i>`);
      nx.ping(ring, tData + 0.1 + i * 0.12, { scale: 1.9 });
      nx.ping(ring, tHuman + 0.6 + i * 0.12, { scale: 1.9 });
    });
    nx.float(p4, tHuman, t1, { amp: 5, per: 3.2 });

    /* ---- app showcase: each screenshot slams in big over a scrim, holds, then docks into a 2 x 2 grid under the rail
       (frame x 160 / 376, y 600 / 742; card 200 x 126: a slim 11 px bar + 112 px image, zoomed onto its own content) and stays.
       The big card scales the whole docked card (bar included) by big / 200: big 1120 keeps it 706 px tall (147..853), above
       the caption band; ar is the docked height minus the helper's 22 px bar allowance, so its centre lands on y 500.
       Built last so each scrim and big card sits over the rail and the stage. Brand marks / app names and a "your" line in
       the sources are painted out in the surface's own colour (source px [x, y, w, h, colour]). ===== */
    const GW = 200, GH = 112, GX = [160, 376], GY = [600, 742];
    const SRC = { "S11_remote-virtual-office.png": [1909, 950], "S12a_zalo-chat-window.png": [1920, 1080],
      "S12d_ats-dashboard.png": [1920, 1080], "S12c_ats-matching-jd-cv.png": [1920, 1080] };
    const MASK = {
      "S11_remote-virtual-office.png": [[1370, 36, 160, 24, "#F6F7F9"], [1806, 858, 66, 16, "#EFE3CC"]],
      "S12a_zalo-chat-window.png": [[10, 88, 44, 22, "linear-gradient(90deg, #572C82, #47236C)"], [348, 82, 34, 32, "#EFF6FF"], [466, 82, 34, 32, "#FFFFFF"],
        [348, 126, 34, 34, "#FFFFFF"], [344, 222, 52, 22, "#FFFFFF"], [80, 272, 134, 26, "linear-gradient(90deg, #3A1A5D, #31134F)"]]
    };
    // dock crop: the big card shows the whole screen; while it flies to its slot the image (and its masks) zooms x DZ onto
    // the part that tells the apps apart (source px [left, top]), so the four thumbs are not four purple sidebars
    const DZ = 1.6;
    const FOCUS = { "S11_remote-virtual-office.png": [350, 200], "S12a_zalo-chat-window.png": [330, 60],
      "S12d_ats-dashboard.png": [300, 300], "S12c_ats-matching-jd-cv.png": [250, 110] };
    SC.forEach(([file, at, hold], i) => {
      const { el } = nx.showcase(c, file, at, { slot: { x: GX[i % 2], y: GY[i >> 1], w: GW }, ar: (126 - 22) / GW, big: 1120, hold, id: "s11-sc" + (i + 1) });
      const [sw, sh] = SRC[file], q = Math.max(GW / sw, GH / sh);
      // the image moves into a clipped 200 x 112 box (in flow, so the card keeps its height) with its masks on one zoom layer
      const m = add(el, `<div class="msk"><div class="zm"></div></div>`), zm = m.firstChild;
      zm.appendChild(el.querySelector("img"));
      (MASK[file] || []).forEach(([x, y, w, h, col]) => add(zm, `<i style="left:${(x * q).toFixed(2)}px;top:${(y * q).toFixed(2)}px;width:${(w * q).toFixed(2)}px;height:${(h * q).toFixed(2)}px;background:${col}"></i>`));
      const [fx, fy] = FOCUS[file];
      tl.set(zm, { transformOrigin: "0 0" }, 0);
      tl.fromTo(zm, { x: 0, y: 0, scale: 1 }, { x: -fx * q * DZ, y: -fy * q * DZ, scale: DZ, duration: 0.7, ease: "nx.inOut", immediateRender: false, fxNoScale: true }, scFly[i]);
      sfx("impact", at, -10);
      sfx("whoosh-soft", scFly[i], -8);
    });

    out("s11", ({ cur, next }) => nx.T_dip(cur, next, cur.t1, TRANS, { dur: 1.2 }));
  }
