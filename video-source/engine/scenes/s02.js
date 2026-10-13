  /* ===== S02 WHO I AM: gold editorial name card. Top row: a portrait ring (the user's circular photo)
     beside the name, which builds in big chars, then the role line clip-reveals. Bottom row, in spoken order: a city
     card whose thin-line map draws in and takes a clay pin with a ping, and a languages card whose VI / EN / JP rows settle.
     OUT: push. ===== */
  {
    const [t0, t1] = W("s02");
    const S = scene("s02", { cam: [[t0, 1.0], [t1, 1.04]] });
    const c = S.cam;
    const q = (k) => C("s02", k);
    // the name is shown, never spoken: the eyebrow lands on "who", the name chars on "am", the role on "lead"
    const tStart = q("start"), tWho = q("who"), tAm = q("am"), tLead = q("lead"),
      tHo = q("ho"), tCity = q("city"), tVi = q("vi"), tEn = q("en"), tJp = q("jp");
    // name beats sit ~0.6 s apart, so each reveal is short and starts as the previous one is settling
    const tEb = tWho - 0.12, ebDur = 0.45, tChars = tAm - 0.3, tUl = tAm + 0.22;

    /* ---- top row (portrait + name). The ring is alone first, so it starts centred on x=960 (+308 px) and slides to its
       place beside the name just before the name enters; the row also sits 140 px low while the cards are not there yet,
       then glides up once the role line has finished revealing ---- */
    const top = add(c, `<div class="s02-top"></div>`);
    // tl tweens of 0.02-2.5 s run SLOW (1.3x) longer, so every "ends at" below uses the scaled length
    const SL = 1.3, tRole = tLead - 0.12, roleDur = 0.55;
    // the ring is never parked at the left with an empty right side: its last ~0.2 s of ease-out overlaps the start of
    // the eyebrow wipe that fills that side
    const shiftDur = 0.5, tShift = tEb - shiftDur * SL + 0.2;
    tl.fromTo(top, { x: 308 }, { x: 0, duration: shiftDur, ease: "nx.inOut" }, tShift);
    // glide starts after the role clip ends (one motion at a time) and has landed when the city card starts, so the
    // card never crosses the ring or the role line
    const tGlide = tRole + roleDur * SL + 0.03, glideDur = 0.6, tCard = Math.max(tHo - 0.15, tGlide + glideDur * SL);
    tl.fromTo(top, { y: 140 }, { y: 0, duration: glideDur, ease: "nx.inOut" }, tGlide);

    // portrait ring around the user's circular photo
    const por = add(top, `<div class="s02-por" data-box="s02-portrait">
      <div class="dash"></div>
      <svg viewBox="0 0 344 344" width="344" height="344">
        <circle class="disc" cx="172" cy="172" r="164"/>
        <circle class="ring" cx="172" cy="172" r="164"/>
        <path class="arc" d="M 41.5 270.7 A 164 164 0 0 1 106.6 21.6"/>
      </svg>
    </div>`);
    // the user's own circular photo (640 px, alpha) sits inside the ring with a thin white gap, gold 3D shadow
    const av = add(por, `<div class="s02-av" data-box="s02-avatar"><img alt="" decoding="sync" src="assets/shots/avatar_round.png"/></div>`);
    // ring closed and portrait in place before "Let me" (no dead air after the dip from s01)
    const tRing = Math.min(tStart - 0.55, t0 + 0.25);
    nx.draw(por.querySelector(".ring"), tRing, { dur: 0.65 });
    nx.draw(por.querySelector(".arc"), tRing + 0.35, { dur: 0.6 });
    tl.fromTo(por.querySelector(".disc"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, ease: "sine.out" }, tRing);
    const dash = por.querySelector(".dash");
    nx.blurIn(dash, tRing + 0.3, { blur: 10, scale: 0.96, dur: 0.8 });
    nx.spin(dash, tRing + 0.3, t1, 36);
    // the portrait settles into the ring while the ring closes (no float: it must stay concentric with the ring)
    // and has settled before the row starts its shift
    nx.settle(av, Math.min(tRing + 0.15, tShift - 0.8 * SL), { from: 0.8, dur: 0.8 });

    // name block. Each text group sits in a layer that stays hidden until its reveal starts, so nothing invisible
    // (a fully clipped line, chars at alpha 0) counts as content while the ring is alone
    const nb = add(top, `<div class="s02-lay"></div>`);
    tl.fromTo(nb, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.02 }, tEb);
    const eb = add(nb, `<div class="eyebrow s02-eb" data-box="s02-eb">My name is</div>`);
    nx.clip(eb, tEb, { dir: "l", dur: ebDur });
    const nm = add(nb, `<div class="hl s02-name" data-box="s02-name"><div class="r">Thai Tran</div><div class="r">Hoang <span class="nk">Nha</span></div></div>`);
    nx.chars(nm, tChars, { stagger: 0.02, y: 44, dur: 0.5 });
    sfx("type", tChars);
    // the short name turns orange and gets underlined once the chars have landed; done before the role clip starts
    const nk = nm.querySelector(".nk");
    tl.to(nk, { color: P.acc2, duration: 0.12, ease: "none", immediateRender: false, fxNoScale: true }, tUl);  // short: the ink->orange midpoint reads brown
    nx.underline(nk, tUl, { dur: Math.min(0.3, (tRole - tUl) / SL) });
    sfx("tick", tUl + 0.1);

    const rb = add(top, `<div class="s02-lay"></div>`);
    tl.fromTo(rb, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.02 }, tRole);
    const role = add(rb, `<div class="s02-role" data-box="s02-role">Talent Acquisition <em>&amp; AI Systems</em></div>`);
    nx.clip(role, tRole, { dir: "l", dur: roleDur });
    sfx("whoosh-soft", tLead - 0.2);

    /* ---- bottom row: city card (left) then languages card (right), in spoken order ---- */
    const roads = ["M-10 52 L246 92", "M34 210 L150 -10", "M-10 140 L246 120", "M86 210 L246 58", "M52 -10 L102 210", "M14 176 Q96 136 200 34"];
    const city = add(c, `<div class="hc s02-card s02-city" data-box="s02-city">
      <div class="map" data-box="s02-map">
        <svg viewBox="0 0 236 184" width="236" height="184">
          ${roads.map((d) => `<path class="road" d="${d}"/>`).join("")}
          <path class="river" d="M-10 26 C40 40 70 84 62 116 S92 172 138 160 S196 120 212 164 S226 196 250 206"/>
        </svg>
        <div class="pring"></div>
      </div>
      <div class="hl s02-ct" data-box="s02-ct"><div>Ho Chi Minh</div><div><em>City</em></div></div>
    </div>`);
    nx.slide(city, tCard, { x: -40, dur: 0.7 });
    const map = city.querySelector(".map");
    // the map and title start just ahead of the slide, so the card never shows as an empty shell
    nx.draw(map.querySelectorAll(".road"), tCard - 0.1, { dur: 0.9, stagger: 0.05, ease: "nx.out" });
    nx.draw(map.querySelector(".river"), tCard - 0.05, { dur: 1.2 });
    sfx("whoosh-soft", tCard);
    const pin = nx.hero(map, "map_pin", 72, 14, 92, { id: "s02-pin" });
    tl.fromTo(pin, { autoAlpha: 0, y: -60 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "back.out(2)" }, tCard);
    const pring = map.querySelector(".pring");
    nx.ping(pring, tCity + 0.1, { scale: 3.0 });
    nx.ping(pring, tJp + 0.9, { scale: 3.0 });
    nx.float(pin, tHo + 0.9, t1, { amp: -6, per: 2.6 });
    sfx("bloom", tHo);
    nx.clip(city.querySelector(".s02-ct"), tCard - 0.05, { dir: "l", dur: 0.55 });

    const lang = add(c, `<div class="hc s02-card s02-langs" data-box="s02-langs"></div>`);
    const globe = nx.plate(lang, "globe_languages", 32, 40, "L", { id: "s02-globe" });
    // card, globe and the VI row land together, so the card is never a shell with only the globe
    nx.blurIn(lang, tVi - 0.35, { blur: 10, scale: 1.03, dur: 0.7 });
    nx.pop(globe, tVi - 0.33, { dur: 0.6 });
    [["VI", "Vietnamese", tVi], ["EN", "English", tEn], ["JP", "Japanese", tJp]].forEach(([code, name, t], i) => {
      const el = add(lang, `<div class="chip s02-lang" data-box="s02-lang${i}" style="top:${32 + i * 66}px"><b>${code}</b><span>${name}</span>${code === "JP" ? `<i>JLPT N2</i>` : ""}</div>`);
      nx.settle(el, i ? t - 0.2 : t - 0.3, { from: 0.94 });
      sfx("pop", t - 0.1, -6);
    });

    out("s02", ({ cur, next }) => nx.T_push(cur, next, cur.t1, { dur: 1.0 }));
  }
