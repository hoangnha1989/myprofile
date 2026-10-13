/* NX — "dark editorial" motion helpers for the personal-brand film (Thai Tran Hoang Nha).
   const nx = window.makeNX(tl, { slow }) — every helper ONLY schedules tweens on the given paused timeline at ABSOLUTE
   times and returns what it created.

   Seek-safety contract (same as the GPRFLEXEYE gold engine):
   - entrances use fromTo with immediateRender:true (their from-state IS the pre-entrance state);
     accents, loops, exits and transitions use immediateRender:false.
   - text/number writes go through GSAP plugin render() (never onUpdate).
   - no Math.random / Date / requestAnimationFrame / CSS animations or transitions; randomness = seeded mulberry32.
   - loops = ONE tween with a closed-form periodic ease, value 0 at both ends.

   Design system (storyboard v2.4 "bớt giống AI"): graphite background, ONE accent (violet #25A1DB), Inter for type,
   Space Grotesk for numbers/labels, hairline borders instead of shadow cards, line icons (1.75 px strokes), masks/wipes
   instead of fade+scale, one easing family ("nx.out" / "nx.inOut"). */
(function () {
  "use strict";
  var C = {
    bg: "#FFFFFF", bg2: "#F8FAFC", surf: "#FFFFFF", surf2: "#F6F9FC", line: "#E2E8F0", line2: "#CBD5E1",
    ink: "#1E293B", body: "#475569", muted: "#64748B", acc: "#25A1DB", acc2: "#E06E20", acc3: "#1B7FB0", accDim: "rgba(37,161,219,.16)"
  };
  var SVGNS = "http://www.w3.org/2000/svg";
  var registered = false;
  function reg() {
    if (registered) return; registered = true;
    var list = ["SplitText", "DrawSVGPlugin", "MorphSVGPlugin", "MotionPathPlugin", "CustomEase", "ScrambleTextPlugin"]
      .map(function (n) { return window[n]; }).filter(Boolean);
    gsap.registerPlugin.apply(gsap, list);
    CustomEase.create("nx.out", "M0,0 C0.16,1 0.3,1 1,1");
    CustomEase.create("nx.inOut", "M0,0 C0.65,0 0.35,1 1,1");
    CustomEase.create("nx.snap", "M0,0 C0.2,0 0.05,1 1,1");
    gsap.registerPlugin({
      name: "nxScr", rawVars: 1,
      init: function (target, v) { this.t = target; this.s = v.text; },
      render: function (r, d) {
        var s = d.s, n = s.length, k = Math.floor(r * n * 1.15), f = Math.floor(r * 40), A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", out = "";
        for (var i = 0; i < n; i++) {
          var c = s.charAt(i);
          if (i < k || r >= 1 || c === " ") out += c;
          else if (i < k + 6) out += A.charAt(((i * 7919 + f * 104729) >>> 0) % A.length);
        }
        d.t.textContent = out;
      }
    });
    gsap.registerPlugin({
      name: "nxCount", rawVars: 1,
      init: function (target, v) { this.t = target; this.a = +v.from; this.b = +v.to; this.f = v.fmt; },
      render: function (r, d) { d.t.textContent = d.f(d.a + (d.b - d.a) * r); }
    });
  }
  function mulberry(seed) {
    var s = seed | 0;
    return function () {
      s = (s + 0x6d2b79f5) | 0;
      var t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function h(html) { var d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstElementChild; }
  function add(parent, html) { var e = h(html); parent.appendChild(e); return e; }
  // periodic ease with soft envelope (0 at both ends) -> seek-safe loop in ONE tween
  function wave(D, per, ramp) {
    return function (p) {
      var t = p * D, env = Math.min(1, t / ramp, (D - t) / ramp);
      env = env < 0 ? 0 : env * env * (3 - 2 * env);
      return Math.sin((t / per) * Math.PI * 2) * env;
    };
  }

  /* ---------------- line icons (24-unit grid, stroke 1.75, round caps) ---------------- */
  var I = {
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
    users: '<circle cx="9" cy="8" r="3.6"/><path d="M2.5 20c0-3.9 3-6.2 6.5-6.2s6.5 2.3 6.5 6.2"/><circle cx="17" cy="9" r="2.8"/><path d="M16.5 13.9c3 .2 5 2.2 5 5.6"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.6 3.8 5.6 3.8 9s-1.2 6.4-3.8 9c-2.6-2.6-3.8-5.6-3.8-9S9.4 5.6 12 3z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/><path d="M12 14.5v2.5"/>',
    mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/>',
    phone: '<path d="M6.5 3.5h3l1.5 4.5-2 1.5c1 2.2 2.8 4 5 5l1.5-2 4.5 1.5v3c0 1.1-.9 2-2 2C10.8 19 5 13.2 4.5 6c0-1.1.9-2.5 2-2.5z"/>',
    chart: '<path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 15.5h6M9 9h3"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    loop: '<path d="M20 11a8 8 0 0 0-14.3-4.6M4 13a8 8 0 0 0 14.3 4.6"/><path d="M5 3v4h4M19 21v-4h-4"/>',
    building: '<path d="M4 21V5l8-2v18M12 8h8v13"/><path d="M7 8h2M7 12h2M7 16h2M15 12h2M15 16h2M2.5 21h19"/>',
    bank: '<path d="M3 9l9-5 9 5z"/><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20.5h18"/>',
    coffee: '<path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z"/><path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16M8 3.5v2.5M11 3.5v2.5M14 3.5v2.5"/>',
    handshake: '<path d="M2.5 11.5l4-4 4 1.5 3-1.5 4 1 4 3"/><path d="M6.5 7.5l-2 7 4 4 2-1.5 2 1.5 1.5-1.5 2 1 3.5-4.5-3-6"/><path d="M10.5 9l-2.5 3 2 1.5 3-2.5"/>',
    star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.9z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 12.5l9 5 9-5M3 16.5l9 5 9-5"/>',
    code: '<path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5M13.5 4.5l-3 15"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2M3 12.5h18"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>',
    shield: '<path d="M12 3l8 3v6c0 4.6-3.4 8-8 9-4.6-1-8-4.4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    send: '<path d="M21 3L10 14M21 3l-7 18-4-7-7-4z"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>',
    monitor: '<rect x="2.5" y="4" width="19" height="13" rx="1.8"/><path d="M8 21h8M12 17v4"/>',
    flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    pin: '<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5"/>',
    timesheet: '<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M3.5 8.5h17M9 8.5v12M3.5 13h17M3.5 17h17"/>',
    vault: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="12" cy="12" r="4"/><path d="M12 8v1.5M12 14.5V16M8 12h1.5M14.5 12H16M3 8H1.8M3 16H1.8"/>',
    arrowR: '<path d="M4 12h15M13 6l6 6-6 6"/>',
    heart: '<path d="M12 20s-7.5-4.5-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.5-7.5 10-7.5 10z"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>'
  };
  function icon(name, size, color, sw) {
    var s = size || 48, c = color || C.ink, w = sw || 1.75;
    return '<svg class="nxi" width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="' + c + '" stroke-width="' + w +
      '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (I[name] || I.spark) + "</svg>";
  }

  window.makeNX = function (tl, opt) {
    reg();
    opt = opt || {};
    var NX = { C: C, icon: icon, I: I, rng: mulberry, add: add, h: h };

    /* ---------- entrances (E*) : immediateRender true ---------- */
    // E1 line rise: each element (a line wrapper) is masked; its inner .in rises from below the mask
    NX.lineRise = function (lines, at, o) {
      o = o || {};
      var inners = [].map.call(lines, function (l) {
        l.style.overflow = "hidden"; l.style.display = l.style.display || "block";
        var inn = l.querySelector(".in");
        if (!inn) { inn = document.createElement("span"); inn.className = "in"; inn.style.display = "inline-block";
          while (l.firstChild) inn.appendChild(l.firstChild); l.appendChild(inn); }
        return inn;
      });
      tl.fromTo(inners, { yPercent: 110 }, { yPercent: 0, duration: o.dur || 0.8, stagger: o.stagger == null ? 0.09 : o.stagger, ease: "nx.out" }, at);
      return inners;
    };
    // E2 char stagger (SplitText chars) with slight blur
    NX.chars = function (node, at, o) {
      o = o || {};
      var st = new SplitText(node, { type: "chars,words", charsClass: "nxc" });
      tl.fromTo(st.chars, { autoAlpha: 0, y: o.y == null ? 28 : o.y, filter: "blur(8px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: o.dur || 0.6, stagger: o.stagger || 0.022, ease: "nx.out" }, at);
      return st.chars;
    };
    // E3 blur-in (focus) for any block
    NX.blurIn = function (el, at, o) {
      o = o || {};
      tl.fromTo(el, { autoAlpha: 0, filter: "blur(" + (o.blur || 14) + "px)", scale: o.scale || 1.04 },
        { autoAlpha: 1, filter: "blur(0px)", scale: 1, duration: o.dur || 0.8, ease: "nx.out" }, at);
      return el;
    };
    // E4 slide-fade from a side
    NX.slide = function (el, at, o) {
      o = o || {};
      tl.fromTo(el, { autoAlpha: 0, x: o.x == null ? -40 : o.x, y: o.y || 0 },
        { autoAlpha: 1, x: 0, y: 0, duration: o.dur || 0.7, stagger: o.stagger || 0, ease: "nx.out" }, at);
      return el;
    };
    // E5 clip reveal (inset wipe) — dir: "l" | "r" | "t" | "b"
    NX.clip = function (el, at, o) {
      o = o || {};
      var d = o.dir || "l";
      var from = { l: "inset(0% 100% 0% 0%)", r: "inset(0% 0% 0% 100%)", t: "inset(0% 0% 100% 0%)", b: "inset(100% 0% 0% 0%)" }[d];
      tl.fromTo(el, { clipPath: from, autoAlpha: 1 }, { clipPath: "inset(0% 0% 0% 0%)", duration: o.dur || 0.8, stagger: o.stagger || 0, ease: "nx.inOut" }, at);
      return el;
    };
    // E6 scale-settle (small overshoot, for badges/numbers)
    NX.settle = function (el, at, o) {
      o = o || {};
      tl.fromTo(el, { autoAlpha: 0, scale: o.from || 0.7 }, { autoAlpha: 1, scale: 1, duration: o.dur || 0.6, stagger: o.stagger || 0, ease: "back.out(1.6)" }, at);
      return el;
    };
    // E7 draw an SVG stroke (path/line/circle/rect/polyline)
    NX.draw = function (el, at, o) {
      o = o || {};
      tl.fromTo(el, { drawSVG: o.from || "0%" }, { drawSVG: o.to || "100%", duration: o.dur || 1.0, stagger: o.stagger || 0, ease: o.ease || "nx.inOut" }, at);
      return el;
    };
    // E8 count-up number (fmt default: thousands separator)
    NX.count = function (el, at, to, o) {
      o = o || {};
      var fmt = o.fmt || function (v) { return Math.round(v).toLocaleString("en-US"); };
      el.textContent = fmt(o.from || 0);
      tl.fromTo(el, { nxCount: { from: o.from || 0, to: o.from || 0, fmt: fmt } }, { nxCount: { from: o.from || 0, to: to, fmt: fmt }, duration: o.dur || 1.6, ease: "power2.out", immediateRender: false }, at);
      return el;
    };
    // E9 typewriter by chars (instant per char, caret optional)
    NX.type = function (node, at, o) {
      o = o || {};
      var st = new SplitText(node, { type: "chars" });
      tl.fromTo(st.chars, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, stagger: o.cps ? 1 / o.cps : 0.035, ease: "none" }, at);
      return st.chars;
    };
    // E10 pop (icons, dots)
    NX.pop = function (el, at, o) {
      o = o || {};
      tl.fromTo(el, { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 1, duration: o.dur || 0.5, stagger: o.stagger || 0, ease: "back.out(2.2)" }, at);
      return el;
    };
    // E11 tilt-in: a 2.5D card (screenshot) swings in from a perspective tilt
    NX.tilt = function (el, at, o) {
      o = o || {};
      tl.fromTo(el, { autoAlpha: 0, rotationY: o.ry == null ? -22 : o.ry, rotationX: o.rx == null ? 8 : o.rx, z: -160, y: 30, transformPerspective: 1600 },
        { autoAlpha: 1, rotationY: o.ry2 || 0, rotationX: o.rx2 || 0, z: 0, y: 0, duration: o.dur || 1.0, ease: "nx.out" }, at);
      return el;
    };
    // E12 scramble text into its final string
    NX.scramble = function (el, at, o) {
      o = o || {};
      // deterministic scramble (ScrambleTextPlugin picks random glyphs -> frames differ between renders)
      var txt = el.textContent;
      tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15, ease: "none" }, at);
      tl.fromTo(el, { nxScr: { text: txt, r: 0 } }, { nxScr: { text: txt, r: 1 }, duration: o.dur || 1.0, ease: "none" }, at);
      return el;
    };

    /* ---------- exits (X*) : immediateRender false ---------- */
    NX.out = function (el, at, o) {
      o = o || {};
      tl.to(el, { autoAlpha: 0, y: o.y || 0, x: o.x || 0, filter: o.blur ? "blur(" + o.blur + "px)" : undefined, duration: o.dur || 0.45, stagger: o.stagger || 0, ease: "power2.in", immediateRender: false }, at);
      return el;
    };
    NX.dim = function (el, at, to, o) {
      o = o || {};
      tl.to(el, { autoAlpha: to, duration: o.dur || 0.5, ease: "sine.inOut", immediateRender: false }, at);
      return el;
    };
    // accent: a violet hairline sweep under a word/block
    NX.underline = function (parent, at, o) {
      o = o || {};
      var u = add(parent, '<div class="nx-ul"></div>');
      tl.fromTo(u, { scaleX: 0 }, { scaleX: 1, duration: o.dur || 0.7, ease: "nx.inOut" }, at);
      return u;
    };
    // loop: gentle float of an element between t0 and t1 (ONE tween)
    NX.float = function (el, t0, t1, o) {
      o = o || {};
      var D = Math.max(0.5, t1 - t0);
      tl.fromTo(el, { y: 0 }, { y: o.amp || 8, duration: D, ease: wave(D, o.per || 3.6, Math.min(1, D / 3)), immediateRender: false }, t0);
      return el;
    };
    // loop: a slow rotation of a ring (deg over the window)
    NX.spin = function (el, t0, t1, deg) {
      tl.fromTo(el, { rotation: 0 }, { rotation: deg || 90, duration: Math.max(0.5, t1 - t0), ease: "none", immediateRender: false }, t0);
      return el;
    };
    // pulse ring at time t (a ring element that expands + fades)
    NX.ping = function (el, at, o) {
      o = o || {};
      tl.fromTo(el, { scale: 0.6, autoAlpha: 0.9 }, { scale: o.scale || 2.2, autoAlpha: 0, duration: o.dur || 1.1, ease: "power2.out", immediateRender: false }, at);
      return el;
    };

    /* ---------- screenshot pop-in (real app image as a generic illustration) ----------
       shot(parent, file, at, {x, y, w, rot, hold}) -> small device card, tilts in, holds `hold` s, then leaves. */
    NX.shot = function (parent, file, at, o) {
      o = o || {};
      var w = o.w || 420, rot = o.rot || 0;
      var el = add(parent, '<div class="nx-shot" data-box="shot-' + file.replace(/\W/g, "") + '" data-allow="*" style="left:' + (o.x || 0) + "px;top:" + (o.y || 0) + "px;width:" + w + 'px">' +
        '<div class="bar"><i></i><i></i><i></i></div><img src="assets/shots/' + file + '" alt=""/></div>');
      // blur/opacity on a non-overshooting ease (back.out drove blur() below 0 -> seek-direction dependent frames)
      tl.fromTo(el, { autoAlpha: 0, filter: "blur(6px)" }, { autoAlpha: 1, filter: "blur(0px)", duration: 0.45, ease: "nx.out" }, at);
      tl.fromTo(el, { y: 40, rotation: rot - 4, scale: 0.86 }, { y: 0, rotation: rot, scale: 1, duration: 0.55, ease: "back.out(1.5)" }, at);
      tl.to(el, { autoAlpha: 0, y: -24, scale: 0.96, duration: 0.4, ease: "power2.in", immediateRender: false }, at + 0.55 + (o.hold || 0.8));
      return el;
    };

    /* ---------- screenshot SHOWCASE (user 2026-10-13: "fade in to đùng đập màn hình rồi thu nhỏ vào góc, xếp ngăn nắp") ----------
       showcase(parent, file, at, {slot: {x, y, w}, ar: imgH/imgW, big: 1240, hold: 1.0, id, scrim: true}) -> the card's layout box IS its
       docked slot (what probe/balance measure at rest); before docking a transform maps it onto a big centred card
       (width `big`, centre 960,500 in parent space) that slams in, holds, then flies into the slot and stays there.
       Real seconds (fxNoScale): slam 0.5, hold `hold`, dock 0.7. Returns {el, tDock} (tDock = docked and at rest). */
    NX.showcase = function (parent, file, at, o) {
      o = o || {};
      var s = o.slot, ar = o.ar || 0.6, hold = o.hold == null ? 1.0 : o.hold;
      // big card: up to 1240 wide, never taller than 720 (stays above the caption band)
      var big = Math.min(o.big || 1240, (720 - 22) / ar);
      var id = o.id || "sc-" + file.replace(/\W/g, "");
      var scrim = o.scrim === false ? null : add(parent, '<div class="nx-scrim" style="position:absolute;left:-200px;top:-200px;width:2320px;height:1480px;background:rgba(248,250,252,.78);opacity:0;visibility:hidden"></div>');
      var el = add(parent, '<div class="nx-shot nx-sc" data-box="' + id + '" data-allow="*" style="left:' + s.x + "px;top:" + s.y + "px;width:" + s.w + 'px">' +
        '<div class="bar"><i></i><i></i><i></i></div><img src="assets/shots/' + file + '" alt=""/></div>');
      var k = big / s.w, cx = s.x + s.w / 2, cy = s.y + (22 + s.w * ar) / 2;
      var bx = 960 - cx, by = 500 - cy;
      tl.set(el, { transformOrigin: "50% 50%" }, 0);
      // slam: from slightly larger + blurred to the big centred card, a tiny settle bounce reads as the impact
      tl.fromTo(el, { x: bx, y: by, scale: k * 1.14, filter: "blur(10px)" },
        { scale: k, filter: "blur(0px)", duration: 0.5, ease: "power3.out", fxNoScale: true }, at);
      // opacity on its own even ease: power3.out put ~12 % of a dark photo on screen in one frame (jerk scan flag)
      tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "sine.inOut", fxNoScale: true }, at);
      if (scrim) {
        tl.fromTo(scrim, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: "power1.out", fxNoScale: true }, at);
        tl.to(scrim, { autoAlpha: 0, duration: 0.5, ease: "power1.inOut", immediateRender: false, fxNoScale: true }, at + 0.5 + hold);
      }
      var tFly = at + 0.5 + hold;
      tl.to(el, { x: 0, y: 0, scale: 1, duration: 0.7, ease: "nx.inOut", immediateRender: false, fxNoScale: true }, tFly);
      return { el: el, tDock: tFly + 0.7, tFly: tFly };
    };

    /* ---------- scene transitions (T*) ----------
       Each makes both roots' visibility right. cur/next are scene objects {root}. tb = boundary time. */
    function swap(cur, next, tIn, tOut) {
      tl.fromTo(next.root, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, immediateRender: false, fxNoScale: true }, tIn);
      // from the CURRENT value: a transition that already faded cur (iris, leak) must not be forced back to alpha 1 on the
      // frame that lands exactly on tOut (warp 1.2 sampling hit it: one frame of the old scene flashed back)
      tl.to(cur.root, { autoAlpha: 0, duration: 0.01, immediateRender: false, fxNoScale: true }, tOut);
    }
    // T1 mask wipe: next scene is revealed by an inset clip sweeping across (direction l|r|t|b)
    NX.T_wipe = function (cur, next, tb, o) {
      o = o || {}; var d = o.dur || 0.9, dir = o.dir || "l";
      var from = { l: "inset(0% 100% 0% 0%)", r: "inset(0% 0% 0% 100%)", t: "inset(0% 0% 100% 0%)", b: "inset(100% 0% 0% 0%)" }[dir];
      swap(cur, next, tb - d / 2, tb + d / 2);
      tl.fromTo(next.root, { clipPath: from }, { clipPath: "inset(0% 0% 0% 0%)", duration: d, ease: "nx.inOut", immediateRender: false, fxNoScale: true }, tb - d / 2);
      var away = { l: "inset(0% 0% 0% 100%)", r: "inset(0% 100% 0% 0%)", t: "inset(100% 0% 0% 0%)", b: "inset(0% 0% 100% 0%)" }[dir];
      // the current scene is clipped away behind the same moving edge (scene roots are transparent: without this the old
      // scene stayed fully visible under the reveal and vanished in one frame at the swap)
      tl.fromTo(cur.root, { clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: away, duration: d, ease: "nx.inOut", immediateRender: false, fxNoScale: true }, tb - d / 2);
      tl.set(next.root, { clipPath: "none" }, tb + d / 2 + 0.01);
      tl.set(cur.root, { clipPath: "none" }, tb + d / 2 + 0.02);
    };
    // T2 grid wipe: N vertical violet bars sweep in, then out to reveal the next scene
    NX.T_grid = function (cur, next, tb, layer, o) {
      o = o || {}; var n = o.n || 8, d = o.dur || 1.1;
      var bars = [];
      for (var i = 0; i < n; i++) bars.push(add(layer, '<div class="nx-gbar" style="left:' + (i * 1920 / n) + "px;width:" + (1920 / n + 1) + 'px"></div>'));
      tl.fromTo(bars, { scaleY: 0, transformOrigin: "50% 100%" }, { scaleY: 1, duration: d * 0.45, stagger: 0.035, ease: "nx.inOut", immediateRender: false, fxNoScale: true }, tb - d * 0.5);
      swap(cur, next, tb, tb);
      tl.fromTo(bars, { scaleY: 1, transformOrigin: "50% 0%" }, { scaleY: 0, duration: d * 0.45, stagger: 0.035, ease: "nx.inOut", immediateRender: false, fxNoScale: true }, tb + 0.02);
      tl.set(bars, { autoAlpha: 0 }, tb + d);
      tl.set(bars, { autoAlpha: 1, scaleY: 0, transformOrigin: "50% 100%" }, Math.max(0, tb - d * 0.5 - 0.01));
      gsap.set(bars, { autoAlpha: 0, scaleY: 0 });
    };
    // T3 split doors: the current scene splits at the centre and opens
    NX.T_doors = function (cur, next, tb, o) {
      o = o || {}; var d = o.dur || 1.0;
      tl.fromTo(next.root, { autoAlpha: 0, scale: 1.06 }, { autoAlpha: 1, scale: 1, duration: d, ease: "nx.out", immediateRender: false, fxNoScale: true }, tb - d * 0.4);
      tl.fromTo(cur.root, { clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: "inset(0% 50% 0% 50%)", duration: d, ease: "nx.inOut", immediateRender: false, fxNoScale: true }, tb - d * 0.4);
      tl.set(cur.root, { autoAlpha: 0 }, tb + d * 0.6);
    };
    // T4 focus pull: current blurs out, next sharpens in
    NX.T_focus = function (cur, next, tb, o) {
      o = o || {}; var d = o.dur || 1.0;
      tl.fromTo(cur.root, { filter: "blur(0px)", autoAlpha: 1 }, { filter: "blur(18px)", autoAlpha: 0, duration: d, ease: "power2.in", immediateRender: false, fxNoScale: true }, tb - d * 0.6);
      tl.fromTo(next.root, { filter: "blur(18px)", autoAlpha: 0 }, { filter: "blur(0px)", autoAlpha: 1, duration: d, ease: "nx.out", immediateRender: false, fxNoScale: true }, tb - d * 0.3);
    };
    // T5 push: next pushes current out sideways
    NX.T_push = function (cur, next, tb, o) {
      o = o || {}; var d = o.dur || 0.9, s = o.dir === "r" ? -1 : 1;
      tl.fromTo(cur.root, { x: 0, autoAlpha: 1 }, { x: -1920 * s * 0.35, autoAlpha: 0, duration: d, ease: "nx.inOut", immediateRender: false, fxNoScale: true }, tb - d / 2);
      tl.fromTo(next.root, { x: 1920 * s * 0.35, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: d, ease: "nx.inOut", immediateRender: false, fxNoScale: true }, tb - d / 2);
    };
    // T6 iris: next opens from a circle at (cx, cy)
    NX.T_iris = function (cur, next, tb, o) {
      o = o || {}; var d = o.dur || 1.0, cx = o.cx || 960, cy = o.cy || 540;
      swap(cur, next, tb - d / 2, tb + d / 2);
      tl.fromTo(next.root, { clipPath: "circle(0px at " + cx + "px " + cy + "px)" }, { clipPath: "circle(1300px at " + cx + "px " + cy + "px)", duration: d, ease: "nx.inOut", immediateRender: false, fxNoScale: true }, tb - d / 2);
      tl.fromTo(cur.root, { scale: 1, opacity: 1 }, { scale: 0.94, opacity: 0, duration: d, ease: "nx.inOut", immediateRender: false, fxNoScale: true }, tb - d / 2);
      tl.set(next.root, { clipPath: "none" }, tb + d / 2 + 0.01);
      tl.set(cur.root, { opacity: 1, scale: 1 }, tb + d / 2 + 0.02);
    };
    // T7 light leak: a violet glow sweeps over the cut
    NX.T_leak = function (cur, next, tb, layer, o) {
      o = o || {}; var d = o.dur || 1.2;
      var g = add(layer, '<div class="nx-leak"></div>');
      gsap.set(g, { autoAlpha: 0 });
      tl.fromTo(g, { autoAlpha: 0, xPercent: -60 }, { autoAlpha: 0.95, xPercent: 0, duration: d / 2, ease: "sine.in", immediateRender: false, fxNoScale: true }, tb - d / 2);
      tl.to(g, { autoAlpha: 0, xPercent: 60, duration: d / 2, ease: "sine.out", immediateRender: false, fxNoScale: true }, tb);
      tl.fromTo(cur.root, { autoAlpha: 1 }, { autoAlpha: 0, duration: d / 2, ease: "power1.in", immediateRender: false, fxNoScale: true }, tb - d / 2);
      tl.fromTo(next.root, { autoAlpha: 0 }, { autoAlpha: 1, duration: d / 2, ease: "power1.out", immediateRender: false, fxNoScale: true }, tb);
    };
    // T8 dip: fade through graphite with a hairline that crosses the frame
    NX.T_dip = function (cur, next, tb, layer, o) {
      o = o || {}; var d = o.dur || 1.0;
      var ln = add(layer, '<div class="nx-dipline"></div>');
      gsap.set(ln, { autoAlpha: 0 });
      tl.fromTo(cur.root, { autoAlpha: 1 }, { autoAlpha: 0, duration: d / 2, ease: "power2.in", immediateRender: false, fxNoScale: true }, tb - d / 2);
      tl.fromTo(ln, { autoAlpha: 1, scaleX: 0 }, { scaleX: 1, duration: d * 0.6, ease: "nx.inOut", immediateRender: false, fxNoScale: true }, tb - d * 0.3);
      tl.to(ln, { autoAlpha: 0, duration: 0.3, immediateRender: false, fxNoScale: true }, tb + d * 0.3);
      tl.fromTo(next.root, { autoAlpha: 0 }, { autoAlpha: 1, duration: d / 2, ease: "power2.out", immediateRender: false, fxNoScale: true }, tb);
    };
    // T9 zoom-through: current zooms past camera, next settles from slightly small
    NX.T_zoom = function (cur, next, tb, o) {
      o = o || {}; var d = o.dur || 0.9;
      tl.fromTo(cur.root, { scale: 1, autoAlpha: 1 }, { scale: 1.35, autoAlpha: 0, duration: d, ease: "power2.in", immediateRender: false, fxNoScale: true }, tb - d * 0.6);
      tl.fromTo(next.root, { scale: 0.88, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: d, ease: "nx.out", immediateRender: false, fxNoScale: true }, tb - d * 0.25);
    };
    /* ---------- gold-standard 3D clay icons ----------
       NX.plate(parent, name, x, y, size "L"|"M"|"S", {id, tint:"blue"|"orange", anchor:"center"}) -> white plate with lip + 3D shadow
       NX.hero(parent, name, x, y, px, {id, anchor}) -> free-floating clay icon with a contact shadow.
       Icons: hf/assets/img/icons/512/<name>.png (list: work/icons/ICONS.md). Entrance: use nx.settle / nx.pop / nx.blurIn. */
    var PS = { L: 168, M: 128, S: 88 };
    NX.ICON = function (name) { return "assets/img/icons/512/" + name + ".png"; };
    NX.plate = function (parent, name, x, y, size, o) {
      o = o || {}; var s = PS[size] || PS.M, c = o.anchor === "center";
      var p = add(parent, '<div class="fx-plate fx-plate-' + (PS[size] ? size : "M") + " fx-tint-" + (o.tint === "orange" ? "orange" : "blue") +
        '" data-box="' + (o.id || "plate-" + name) + '"' + (o.id ? ' id="' + o.id + '"' : "") + ' style="left:' + (c ? x - s / 2 : x) + "px;top:" + (c ? y - s / 2 : y) +
        'px"><i class="fx-plate-lip"></i><i class="fx-plate-face"></i><img class="fx-plate-ico" alt="" decoding="sync" src="' + NX.ICON(name) + '"/></div>');
      return p;
    };
    NX.hero = function (parent, name, x, y, px, o) {
      o = o || {}; var c = o.anchor === "center";
      return add(parent, '<div class="fx-hero" data-box="' + (o.id || "hero-" + name) + '"' + (o.id ? ' id="' + o.id + '"' : "") + ' style="left:' + (c ? x - px / 2 : x) +
        "px;top:" + (c ? y - px / 2 : y) + "px;width:" + px + "px;height:" + px + 'px"><i class="fx-hero-shadow"></i><img class="fx-hero-ico" alt="" decoding="sync" src="' + NX.ICON(name) + '"/></div>');
    };
    NX.swap = swap;
    return NX;
  };
})();
