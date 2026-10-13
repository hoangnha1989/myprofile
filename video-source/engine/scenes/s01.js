  /* ===== S01 HOOK: "Judgment, not volume." (gold design) Hero FX: a field of candidate dots converges into ONE clay
     judgment icon (magnifier on a person); an orbit draws around it on "that led me to a question" and
     keeps circling through "driven my work ever since"; on "scale" the one
     icon replicates into an even row of five clay plates (centre = orange, the original). Exit: dip with a hairline. ===== */
  {
    const S = scene("s01", { cam: [[W("s01")[0], 1.0], [W("s01")[1], 1.04]] });
    const [t0, t1] = W("s01");
    const c = S.cam;
    const tYears = C("s01", "fifteen"), tJud = C("s01", "judgment"), tVol = C("s01", "volume"),
      tQ = C("s01", "question"), tWhat = C("s01", "whatif"), tScale = C("s01", "scale"),
      tOne = C("s01", "one"), tGreat = C("s01", "great"), tLed = C("s01", "led"), tDriven = C("s01", "driven"), tEver = C("s01", "ever"), tJud2 = C("s01", "judgment2");

    // the judgment point = centre of the hero icon (frame centre column)
    const FX = 960, FY = 580;

    // "More than eleven years in talent acquisition": the opening headline, later folded into the eyebrow
    const hl0 = add(c, `<div class="hl s01-hl0" data-box="s01-hl0"><span class="line"><span class="in"><em>11+ years</em> in talent acquisition</span></span></div>`);
    tl.fromTo(hl0, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, ease: "none" }, tYears - 0.15);
    nx.lineRise(hl0.querySelectorAll(".line"), tYears - 0.15);
    sfx("whoosh-soft", tYears - 0.2);
    nx.out(hl0, tJud - 0.6, { y: -24, blur: 6, dur: 0.4 });

    // dot field: 160 candidates in a calm centred band, converging on the judgment point
    const R = nx.rng(101);
    const field = add(c, `<div class="s01-field"></div>`);
    const dots = [];
    for (let i = 0; i < 160; i++) {
      const x = 300 + R() * 1320, y = 420 + R() * 380, r = 4 + R() * 4;
      const tone = R() < 0.18 ? " b" : "";
      const d = add(field, `<div class="dot${tone}" style="left:${(x - r).toFixed(1)}px;top:${(y - r).toFixed(1)}px;width:${(2 * r).toFixed(1)}px;height:${(2 * r).toFixed(1)}px;opacity:${(0.45 + R() * 0.4).toFixed(2)}"></div>`);
      dots.push({ d, x, y });
      nx.float(d, t0, tJud, { amp: 4 + R() * 6, per: 3 + R() * 3 });
    }
    tl.fromTo(dots.map((o) => o.d), { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.9, stagger: { each: 0.006, from: "random" }, ease: "nx.out" }, t0 + 0.1);
    dots.forEach((o, i) => {
      tl.to(o.d, { x: FX - o.x, y: FY - o.y, autoAlpha: 0, duration: 1.1, ease: "nx.inOut", immediateRender: false }, tJud - 0.35 + (i % 12) * 0.018);
    });
    sfx("whoosh-soft", tJud - 0.3);

    // "one thing": a single candidate in the field lights up orange, then becomes the judgment point
    const OX = 1240, OY = 700;
    const one = add(c, `<div class="s01-one" style="left:${OX - 14}px;top:${OY - 14}px"><div class="core"></div><div class="ring"></div></div>`);
    nx.pop(one, tOne - 0.15);
    nx.ping(one.querySelector(".ring"), tOne - 0.05, { scale: 3.2 });
    nx.ping(one.querySelector(".ring"), tGreat - 0.1, { scale: 3.2 });
    tl.to(one, { x: FX - OX, y: FY - OY, duration: 0.9, ease: "nx.inOut", immediateRender: false }, tJud - 0.3);
    tl.to(one, { autoAlpha: 0, duration: 0.25, ease: "none", immediateRender: false }, tJud + 0.3);
    sfx("pop", tOne - 0.15, -6);

    // the judgment hero: clay magnifier on a person, with a ring that pings on every beat about it
    const ring = add(c, `<div class="s01-ring" style="left:${FX - 140}px;top:${FY - 140}px"></div>`);
    const hero = nx.hero(c, "magnifier_person", FX, FY, 280, { id: "s01-hero", anchor: "center" });
    hero.setAttribute("data-allow", "s01-p1 s01-p2 s01-p3 s01-orbit");
    nx.settle(hero, tJud + 0.2, { from: 0.3, dur: 0.7 });
    nx.float(hero, tJud + 0.9, tScale - 0.1, { amp: 6, per: 3.6 });
    nx.ping(ring, tJud + 0.55, { scale: 1.45 });
    nx.ping(ring, tQ + 0.1, { scale: 1.45 });
    nx.ping(ring, tEver - 0.1, { scale: 1.45 });
    nx.ping(ring, tJud2 - 0.1, { scale: 1.45 });
    sfx("bloom", tJud + 0.2);

    // eyebrow + headline: "Judgment," (hero word) / "not volume." struck through
    const eb = add(c, `<div class="eyebrow s01-eb" data-box="s01-eb">11+ years in talent acquisition</div>`);
    nx.scramble(eb, tJud - 0.45, { dur: 0.7 });
    sfx("type", tJud - 0.3, -8);
    const hl = add(c, `<div class="hl s01-hl" data-box="s01-hl"><span class="line l1"><span class="in"><em>Judgment,</em></span></span><span class="line l2"><span class="in">not volume.<i class="strike"></i></span></span></div>`);
    const [l1, l2] = hl.querySelectorAll(".line");
    tl.fromTo(hl, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, ease: "none" }, tJud - 0.12);
    nx.lineRise([l1], tJud - 0.12);
    nx.lineRise([l2], tVol - 0.25);
    const strike = hl.querySelector(".strike");
    tl.fromTo(strike, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "nx.inOut" }, tVol + 0.3);
    tl.to(l2.querySelector(".in"), { color: "#94A3B8", duration: 0.5, immediateRender: false }, tVol + 0.4);
    sfx("tick", tVol + 0.3);

    // "that led me to a question that has driven my work ever since": the orbit draws from "led" to "driven",
    // its satellite lands on "driven" and the track keeps circling
    const orbit = add(c, `<svg class="s01-orbit" viewBox="0 0 340 340" data-box="s01-orbit" data-allow="s01-hero" style="left:${FX - 170}px;top:${FY - 170}px"><g class="spin"><circle class="trk" cx="170" cy="170" r="164"/><circle class="sat" cx="170" cy="6" r="7"/></g></svg>`);
    nx.draw(orbit.querySelector(".trk"), tLed - 0.05, { dur: tDriven - tLed });
    nx.pop(orbit.querySelector(".sat"), tDriven - 0.05);
    // spin the inner group, not the svg: a rotated svg would grow its layout box
    tl.fromTo(orbit.querySelector(".spin"), { rotation: 0 }, { rotation: 150, svgOrigin: "170 170", duration: tScale - tLed + 0.25, ease: "none", immediateRender: false }, tLed - 0.05);
    sfx("whoosh-soft", tLed - 0.1, -4);

    // the question replaces the statement at the top of the frame
    nx.out([eb, hl], tWhat - 0.5, { y: -24, blur: 6, dur: 0.4 });
    const q = add(c, `<div class="hl s01-q" data-box="s01-q">What if judgment could <em>scale</em>?</div>`);
    tl.fromTo(q, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, ease: "none" }, tWhat - 0.1);
    nx.chars(q, tWhat - 0.1, { stagger: 0.018 });
    sfx("type", tWhat);

    // "scale": the orbit lets go, the hero shrinks into the orange centre plate and four copies slide out evenly
    nx.out(orbit, tScale - 0.2, { dur: 0.3 });
    tl.to(hero, { scale: 0.6, autoAlpha: 0, duration: 0.45, ease: "nx.inOut", immediateRender: false }, tScale - 0.1);
    const PL = [428, 652, 876, 1100, 1324], PT = FY - 84;
    const plates = PL.map((x, i) => nx.plate(c, "magnifier_person", x, PT, "L", { id: `s01-p${i}`, tint: i === 2 ? "orange" : "blue" }));
    nx.settle(plates[2], tScale - 0.05, { from: 0.6, dur: 0.5 });
    const outer = [plates[1], plates[3], plates[0], plates[4]];
    tl.fromTo(outer, { autoAlpha: 0, scale: 0.6, x: (i) => 876 - PL[[1, 3, 0, 4][i]] },
      { autoAlpha: 1, scale: 1, x: 0, duration: 0.45, stagger: 0.04, ease: "nx.out" }, tScale - 0.05);
    nx.float(plates, tScale + 1.0, t1, { amp: 4, per: 3.2 });
    sfx("shimmer", tScale);

    out("s01", ({ cur, next }) => nx.T_dip(cur, next, cur.t1, TRANS, { dur: 1.2 }));
  }
