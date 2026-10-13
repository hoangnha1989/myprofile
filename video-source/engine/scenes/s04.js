  /* ===== S04 MY PHILOSOPHY (gold): Hero FX: the four roles of s03 merge into one lesson (lightbulb); a CV card blurs back
     to the left ("records the past") while a person bust sharpens on the right ("the whole person"); "MORE THAN A JD":
     the role profile plate (large while alone) is fed by I + the client, three equal cards (must-have skills / the team /
     the manager) are dealt in; "saves weeks" = its own frame, a calendar plate and a row of unnumbered week cells whose
     "searching" days fill and then get one clean strike on "wrong direction". OUT: iris.
     Layout: one centred column per beat (eyebrow 132, headline 172, content centred below).
     Rest-beat rule: every entrance has settled by its cue +0.6 s (no half-revealed text at a rest frame); core runs
     entrance durations x1.3 (SLOW), the times below are set with that factor. ===== */
  {
    const [t0, t1] = W("s04");
    const S = scene("s04", { cam: [[t0, 1.0], [t1, 1.04]] });
    const c = S.cam;
    const q = (k) => C("s04", k);
    const tLesson = q("lesson"), tBack = q("back"), tPast = q("past"), tNever = q("never"),
      tWhole = q("whole"), tBefore = q("before"), tSearch = q("search"), tDefine = q("define"), tRole = q("role"), tClient = q("client"),
      tSkills = q("skills"), tTeam = q("team"), tMgr = q("manager"), tWork = q("work"), tGet = q("getting"), tSaves = q("saves"),
      tWeeks = q("weeks"), tSearching = q("searching"), tWrong = q("wrong"), tDir = q("direction");
    // beat gates: whole beats are hidden (autoAlpha 0) until their first entrance, then removed after their exit
    const gate = (on, off) => { const g = add(c, `<div class="s04-gate"></div>`); tl.fromTo(g, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, fxNoScale: true }, on);
      if (off) tl.to(g, { autoAlpha: 0, duration: 0.01, immediateRender: false, fxNoScale: true }, off); return g; };
    // a full-width centred row; the data-box sits on the inline-block that hugs the text
    const row = (top, cls, box, html, par) => add(par || c, `<div class="s04-row ${cls}" style="top:${top}px"><span class="in2" data-box="${box}">${html}</span></div>`).firstElementChild;
    const lab = (par, x, box, txt, acc) => add(par, `<div class="s04-lbw" style="left:${x}px"><span class="lbl s04-lb${acc ? " acc" : ""}" data-box="${box}">${txt}</span></div>`).firstElementChild;
    const TICK = `<svg width="26" height="26" viewBox="0 0 26 26"><circle cx="13" cy="13" r="13" fill="url(#s04-gTick)"/><path d="M7.6 13.4 L11.2 17 L18.4 9.4" fill="none" stroke="#FFFFFF" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    add(c, `<svg class="s04-defs" width="0" height="0" aria-hidden="true"><defs><linearGradient id="s04-gTick" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#FBA65A"/><stop offset="1" stop-color="#DD6417"/></linearGradient></defs></svg>`);

    /* ---- beat A: the four roles of s03 -> one lesson ---- */
    // same icons and order as the s03 milestones: banking, IT branch manager, HR & recruiting manager, executive search.
    // One L row (168, gap 48, step 216) centred on x 960, centre y 480 = the bulb centre; the label sits 32 px under it.
    const RN = ["bank", "team_group", "manager", "magnifier_person"];
    const roles = RN.map((n, i) => nx.plate(c, n, 552 + i * 216, 396, "L", { id: `s04-r${i}` }));
    roles.forEach((p) => p.setAttribute("data-allow", "s04-bulb"));
    const rl = row(596, "lbl s04-rl", "s04-rl", "All of those roles");
    nx.pop(roles, t0 + 0.05, { stagger: 0.05, dur: 0.3 });
    sfx("pop", t0 + 0.05, -8);
    nx.clip(rl, t0 + 0.05, { dir: "l", dur: 0.4 });
    const eb1 = row(132, "eyebrow", "s04-eb1", "One lesson");
    nx.scramble(eb1, tLesson - 0.45, { dur: 0.55 });
    sfx("type", tLesson - 0.4, -6);
    nx.out(rl, tLesson - 0.45, { y: 10, dur: 0.28 });
    // the plates shrink and fade where they stand (no sliding into each other); the bulb only rises once they are faint
    tl.to(roles, { scale: 0.78, autoAlpha: 0, duration: 0.24, ease: "power2.out", immediateRender: false }, tLesson - 0.45);
    const bring = add(c, `<i class="s04-bring"></i>`);
    const bulb = nx.hero(c, "lightbulb", 960, 480, 240, { id: "s04-bulb", anchor: "center" });
    bulb.setAttribute("data-allow", RN.map((n, i) => `s04-r${i}`).join(" ") + " s04-cv");
    nx.settle(bulb, tLesson - 0.1, { from: 0.5, dur: 0.45 });
    sfx("idea", tLesson, 0);
    // "kept coming back": the lesson pings twice
    nx.ping(bring, tBack - 0.6, { scale: 1.9 });
    nx.ping(bring, tBack - 0.05, { scale: 1.9 });
    nx.float(bulb.querySelector("img"), tLesson + 0.6, tBack + 0.6, { amp: -6, per: 2.4 });
    tl.to(bulb, { autoAlpha: 0, scale: 0.7, y: -30, duration: 0.3, ease: "power2.in", immediateRender: false }, tBack + 0.63);

    /* ---- beat B: a CV records the past, never the whole person (two sides, mirrored around x 960) ---- */
    // CV enters centred (x 790..1130), then recedes to centre x 700; the person bust is centred on x 1220.
    const tB = tBack + 0.66, tBout = tBefore - 0.45;
    const gB = gate(tB, tBout + 0.4);
    const hlB1 = row(172, "hl s04-h72", "s04-hlb1", `<span class="line">A CV records the past.</span>`, gB);
    nx.lineRise(hlB1.querySelectorAll(".line"), tB, { dur: 0.6 });
    const hlB2 = row(266, "hl s04-h60", "s04-hlb2", `<span class="line">Never the <em>whole person.</em></span>`, gB);
    // "never" lands only ~0.56 s after "past": beat B2 starts on "never" but not before the "past" rest frame, and its
    // entrances are short enough to have settled by "never" +0.6
    const tB2 = Math.max(tNever - 0.25, tPast + 0.62);
    nx.lineRise(hlB2.querySelectorAll(".line"), tB2, { dur: 0.4 });

    const cv = add(gB, `<div class="hc s04-cv" data-box="s04-cv" data-allow="s04-bulb" style="left:790px;top:372px"></div>`);
    const cvp = nx.plate(cv, "cv_resume", 28, 28, "S", { id: "s04-cv-plate" });
    add(cv, `<div class="s04-cvt">CV</div>`);
    const CVR = [["calendar", [200, 150]], ["briefcase", [220, 170]], ["building", [190, 130]]];
    CVR.forEach(([ic, ws], i) => add(cv, `<div class="s04-cvr" style="top:${150 + i * 92}px"><b>${icon(ic, 30, P.acc3, 1.8)}</b>
      ${ws.map((w, j) => `<i style="top:${j * 30 + 6}px;width:${w}px"></i>`).join("")}</div>`));
    // the card rises and settles whole (a clip wipe would cut its layered shadow with a straight edge)
    tl.fromTo(cv, { autoAlpha: 0, y: 24, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: "nx.out" }, tB);
    nx.settle(cvp, tB + 0.05, { from: 0.6, dur: 0.5 });
    tl.fromTo(cv.querySelectorAll(".s04-cvr i"), { scaleX: 0 }, { scaleX: 1, duration: 0.3, stagger: 0.04, ease: "nx.out" }, tB + 0.15);
    sfx("whoosh", tB, -8);
    // "records the past": the document recedes to the left, out of focus, while the person sharpens on the right (one move)
    tl.to(cv, { x: -260, scale: 0.88, filter: "blur(5px)", autoAlpha: 0.56, duration: 0.55, ease: "nx.inOut", immediateRender: false }, tPast - 0.45);
    sfx("whoosh-soft", tPast - 0.45, -4);

    // "the whole person": a sharp candidate figure with a thin halo (cand_man; person_bust is kept for "I" in beat C)
    const halo = add(gB, `<svg class="s04-halo" width="420" height="420" viewBox="0 0 420 420"><circle cx="210" cy="210" r="196" transform="rotate(-90 210 210)"/></svg>`);
    const pring = add(gB, `<i class="s04-pring"></i>`);
    const person = nx.hero(gB, "cand_man", 1220, 600, 300, { id: "s04-person", anchor: "center" });
    // the person only sharpens on "never" (after the CV has receded on "past"); the halo draws from the top of the circle
    nx.blurIn(person, tB2, { blur: 24, scale: 1.08, dur: 0.4 });
    tl.fromTo(halo, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: "power1.out" }, tB2 + 0.02);
    nx.draw(halo.querySelector("circle"), tB2 + 0.02, { dur: 0.38 });
    // "whole": the person is lit by one orange pulse
    nx.ping(pring, tWhole - 0.1, { scale: 1.45, dur: 1.0 });
    sfx("shimmer", tWhole - 0.1, -4);
    nx.float(person.querySelector("img"), tWhole + 0.2, tBout, { amp: -5, per: 2.6 });

    // "So before any search": eyebrow and headline turn together, the whole of beat B leaves on "before"
    const eb2 = row(132, "eyebrow", "s04-eb2", "Before any search");
    nx.out(eb1, tBout, { dur: 0.2 });
    nx.scramble(eb2, tBefore - 0.35, { dur: 0.6 });
    sfx("type", tBefore - 0.3, -6);
    tl.to([hlB1, hlB2, cv, person, halo], { autoAlpha: 0, filter: "blur(12px)", y: -18, duration: 0.2, ease: "power2.in", immediateRender: false }, tBout);

    /* ---- beat C: more than a JD, the role profile ---- */
    const tC = tBefore - 0.2;
    const gC = gate(tC), gC1 = add(gC, `<div class="s04-gate"></div>`);
    const hlC = row(172, "hl s04-h72", "s04-hlc", `<span class="line">More than a <em>JD</em></span>`, gC);
    nx.lineRise(hlC.querySelectorAll(".line"), tC, { dur: 0.38 });
    // plate row (L, centres 600 / 960 / 1320): I define -> role profile <- with the client. While it is the only content
    // it sits 120 px lower (centred in the frame) and the role profile is shown at 1.7x; it shrinks to the row size
    // as "I" arrives, and the row rises to make room for the three cards after "client".
    const me = nx.plate(gC1, "person_bust", 516, 266, "L", { id: "s04-me" });
    const jd = nx.plate(gC1, "jd_document", 876, 266, "L", { id: "s04-jd", tint: "orange" });
    const cl = nx.plate(gC1, "office_building", 1236, 266, "L", { id: "s04-client" });
    const ar = add(gC1, `<svg class="s04-ar" width="1920" height="440" viewBox="0 0 1920 440">
      <path class="ln" d="M702 350 H854"/><path class="hd" d="M844 340 L856 350 L844 360"/>
      <path class="ln" d="M1218 350 H1066"/><path class="hd" d="M1076 340 L1064 350 L1076 360"/></svg>`);
    const lns = ar.querySelectorAll(".ln"), hds = ar.querySelectorAll(".hd");
    const lbMe = lab(gC1, 420, "s04-lb-me", "I define the role");
    const lbJd = lab(gC1, 780, "s04-lb-jd", "Role profile", true);
    const lbCl = lab(gC1, 1140, "s04-lb-cl", "With the client");
    // shrink after the "search" rest frame and before "I define"
    const tShrink = tSearch + 0.62;
    tl.fromTo(jd, { autoAlpha: 0, scale: 1.05 }, { autoAlpha: 1, scale: 1.7, duration: 0.4, ease: "back.out(1.6)" }, tC + 0.05);
    tl.to(jd, { scale: 1, duration: 0.4, ease: "nx.inOut", immediateRender: false }, tShrink);
    // the label hangs under the large plate, then follows it up
    tl.fromTo(lbJd, { y: 68 }, { y: 0, duration: 0.4, ease: "nx.inOut" }, tShrink);
    nx.clip(lbJd, tC + 0.1, { dir: "b", dur: 0.35 });
    sfx("pop", tC + 0.1, -8);
    const jring = add(gC1, `<i class="s04-jring"></i>`);
    nx.pop(me, Math.max(tDefine - 0.3, tShrink + 0.2), { dur: 0.4 });
    nx.clip(lbMe, tDefine - 0.15, { dir: "l", dur: 0.45 });
    nx.draw([lns[0], hds[0]], tDefine - 0.05, { dur: 0.28, stagger: 0.12 });
    nx.ping(jring, tRole - 0.1, { scale: 1.5 });
    nx.pop(cl, tClient - 0.49, { dur: 0.35 });
    nx.clip(lbCl, tClient - 0.47, { dir: "r", dur: 0.33 });
    nx.draw([lns[1], hds[1]], tClient - 0.47, { dur: 0.25, stagger: 0.08 });
    sfx("pop", tClient - 0.45, -6);
    nx.ping(jring, tClient + 0.3, { scale: 1.25 });
    const tRise = tClient + 0.62;
    // the row rises to y 28 (not 0) so headline / plate row / cards each keep >= 56 px of air (cards at 556..846)
    tl.fromTo(gC1, { y: 120 }, { y: 28, duration: 0.3, ease: "nx.inOut" }, tRise);

    // three equal cards (496 x 290, gap 40, x 176 / 712 / 1248, y 556), each with an S plate, a title and a centred mini-UI;
    // people in the mini-UIs are small clay heads (UI detail), the clay S plate carries the concept
    const head = (n, cls) => `<img class="hd ${cls || ""}" alt="" decoding="sync" src="${nx.ICON(n)}"/>`;
    const K = [
      { ic: "checklist", t: "Must-have skills", at: tSkills, vis: `<div class="v chk">${[360, 300, 240].map((w, i) => `<div class="r" style="top:${i * 40}px"><span class="tk">${TICK}</span><i style="width:${w}px"></i></div>`).join("")}</div>` },
      { ic: "team_group", t: "The team", at: tTeam, vis: `<div class="v ppl">${["cand_man", "cand_woman", "cand_man", "cand_woman", "cand_man"].map((n) => head(n)).join("")}</div>` },
      { ic: "manager", t: "The manager", at: tMgr, tint: "orange", vis: `<div class="v pair">${head("cand_woman")}<span class="lk"></span>${head("cand_man")}</div>` }
    ];
    const kc = K.map((k, i) => {
      const el = add(gC, `<div class="hc s04-k" data-box="s04-k${i}" style="left:${176 + i * 536}px;top:556px"><div class="kt">${k.t}</div>${k.vis}</div>`);
      nx.plate(el, k.ic, 28, 28, "S", { id: `s04-k${i}-plate`, tint: k.tint });
      // cards rise + settle in whole (no clip edge can ever cut the layered shadow). Card 0 waits for the plate row to
      // rise; team and manager are only ~0.64 s apart, so the team card enters early and the manager card starts after
      // the team rest frame (team +0.62) with a short entrance that has settled before manager +0.6
      const at = [Math.max(k.at - 0.25, tRise + 0.07), k.at - 0.3, Math.max(k.at - 0.2, tTeam + 0.62)][i];
      tl.fromTo(el, { autoAlpha: 0, y: 24, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: [0.45, 0.45, 0.3][i], ease: "nx.out" }, at);
      sfx("tick", k.at, -6);
      return el;
    });
    nx.pop(kc[0].querySelectorAll(".tk"), tSkills - 0.03, { stagger: 0.06, dur: 0.3 });
    tl.fromTo(kc[0].querySelectorAll(".r i"), { scaleX: 0 }, { scaleX: 1, duration: 0.3, stagger: 0.06, ease: "nx.out" }, tSkills - 0.03);
    nx.pop(kc[1].querySelectorAll(".ppl .hd"), tTeam - 0.2, { stagger: 0.04, dur: 0.35 });
    const pr = kc[2].querySelectorAll(".pair .hd");
    nx.pop(pr[0], Math.max(tMgr - 0.05, tTeam + 0.65), { dur: 0.33 });
    nx.pop(pr[1], tWork - 0.55);
    tl.fromTo(kc[2].querySelector(".lk"), { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "nx.inOut" }, tWork - 0.35);
    // "getting this right first": every card gets its tick, the role profile pings
    const badges = kc.map((el) => add(el, `<span class="bdg">${TICK}</span>`));
    nx.pop(badges, tGet - 0.1, { stagger: 0.08, dur: 0.35 });
    nx.ping(jring, tGet - 0.1, { scale: 1.25 });
    sfx("bloom", tGet, -6);
    nx.float(kc[2].querySelector(".fx-plate-ico"), tWork, tSaves - 0.5, { amp: -4, per: 2.6 });
    // the role-profile frame leaves as "saves" begins: beat D gets the whole frame (one idea per frame)
    const tCout = tSaves - 0.5;
    tl.to(gC, { autoAlpha: 0, filter: "blur(10px)", y: -14, duration: 0.3, ease: "power2.in", immediateRender: false }, tCout);

    /* ---- beat D: saves weeks of searching in the wrong direction ---- */
    // eyebrow "Right first" over "SAVES WEEKS"; one L row: calendar plate + 5 unnumbered week cells (168, gap 48, step 216,
    // x 336..1584 centred on 960, y 448..616, the block centred in the content zone); label 48 px under the row.
    const gD = gate(tSaves - 0.2);
    const eb3 = row(132, "eyebrow", "s04-eb3", "Right first");
    nx.out(eb2, tCout, { dur: 0.25 });
    nx.scramble(eb3, tSaves - 0.25, { dur: 0.5 });
    const hlD = row(172, "hl s04-h72", "s04-hld", `<span class="line">Saves <em>weeks</em></span>`, gD);
    nx.lineRise(hlD.querySelectorAll(".line"), tSaves - 0.2, { dur: 0.42 });
    const calp = nx.plate(gD, "calendar", 336, 448, "L", { id: "s04-cal" });
    const cells = [0, 1, 2, 3, 4].map((i) => add(gD, `<div class="s04-wk" data-box="s04-wk${i}" style="left:${552 + i * 216}px"><div class="hd2"></div>
      <div class="dots">${"<i></i>".repeat(7)}</div>
      <svg class="x" width="168" height="168" viewBox="0 0 168 168"><path d="M40 136L128 52"/></svg></div>`));
    const lbW = row(664, "lbl s04-lbd", "s04-lb-wk", `Searching in the <b>wrong direction</b>`, gD);
    nx.settle(calp, tSaves - 0.2, { from: 0.6, dur: 0.45 });
    sfx("pop", tSaves - 0.15, -8);
    nx.pop(cells, tSaves - 0.1, { stagger: 0.04, dur: 0.28 });
    // "weeks of searching": the days of each week fill, one week after the other
    const tFill = Math.max(tSearching - 0.1, tWeeks + 0.64);
    tl.fromTo(gD.querySelectorAll(".s04-wk .dots i"), { backgroundColor: "#D7E3EE" }, { backgroundColor: "#25A1DB", duration: 0.06, stagger: 0.012, ease: "none" }, tFill);
    nx.clip(lbW, Math.max(tSearching - 0.3, tWeeks + 0.62), { dir: "l", dur: 0.42 });
    // "wrong direction": each week dims and gets one clean strike
    tl.to(gD.querySelectorAll(".s04-wk .dots"), { autoAlpha: 0.3, duration: 0.2, stagger: 0.05, immediateRender: false }, tWrong - 0.03);
    nx.draw(gD.querySelectorAll(".s04-wk .x path"), tWrong - 0.03, { dur: 0.22, stagger: 0.05 });
    sfx("tick", tWrong, -6);
    const ul = nx.underline(lbW.querySelector("b"), tDir - 0.31, { dur: 0.45 });
    ul.classList.add("s04-ul");
    nx.float(calp.querySelector(".fx-plate-ico"), tDir, t1, { amp: -5, per: 2.6 });

    out("s04", ({ cur, next }) => nx.T_iris(cur, next, cur.t1, { dur: 1.1, cx: 960, cy: 600 }));
  }
