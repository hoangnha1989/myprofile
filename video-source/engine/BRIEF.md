# Scene brief — personal-brand film "Thai Tran Hoang Nha" (4K, dark editorial)

Project root `D:/MCP/output/nha_personal_brand`. Locked script = `work/storyboard_v2.4.json` (scenes 01..13, field `vo` is
the spoken text, `ost` the on-screen text inventory, `visual`/`fx`/`why` the art direction — read YOUR scenes there).
Exemplar scene (the style bar, copy its patterns): `work/eng/scenes/s01.js` + `s01.css`. Helper library: `work/eng/nx.js`
(read the header + every helper you call). Core: `work/eng/core_head.js` (what is in scope) and `core_tail.js`.

## Files you own
`work/eng/scenes/sNN.js`, `work/eng/scenes/sNN.css`, `work/eng/cues/sNN.json` for YOUR scenes only. Never edit nx.js,
core_*.js, template.html, build.py or another scene's files. Need a helper? Write it locally inside your scene block.

## In scope inside a scene block `{ ... }`
- `scene(id, {cam: [[t, scale], ...]})` -> `{root, cam, t0, t1}`; put everything inside `S.cam`. Camera = slow zoom only.
- `tl.fromTo/to/set` — the ONE paused timeline, absolute times. `nx.*` helpers (entrances lineRise, chars, blurIn, slide,
  clip, settle, draw, count, type, pop, tilt, scramble; exits out, dim; accents underline, float, spin, ping; `nx.shot`;
  transitions T_wipe, T_grid, T_doors, T_focus, T_push, T_iris, T_leak, T_dip, T_zoom).
- `C(sid, key)` cue word time from your `cues/sNN.json` (`{"key": ["word", "alt"]}` or `{"key": {"w": ["word"], "nth": 1}}`
  for the 2nd occurrence inside the line); `WT(word, after)`; `W(sid)` window; `add`, `h`, `icon(name, size, color, sw)`
  (line icons, names in nx.js `I`), `P` palette, `sfx(kind, t, gainDbOffset)` (offset from the kit level, 0 = default; kinds: idea, whoosh-soft, pop, tick, type, riser,
  shimmer, impact, bloom), `out(sid, fn)` to register YOUR scene's OUT transition, `TRANS` layer for T_grid/T_leak/T_dip.

## Timing
The clock is PROVISIONAL now (estimated words); the real voice will replace it and every cue moves automatically. So:
time EVERYTHING from cue words (`C`/`WT`) and `W(sid)`, never from hard-coded seconds. Visual beats land 0.1-0.3 s before
their word. Each scene window opens ~1.1 s before its first word and the next scene starts ~1.1 s before ITS first word,
so there are ~2.6 s of breathing between lines: keep the frame alive (a float/spin/ping), never dead or empty.
Content should be fully built by the last words and leave ~0.6 s before `t1` for the OUT transition.

## Style law (user mandates — violations are rejected)
1. Graphite background, ONE accent (violet `--acc #8B7CF6`, light `--acc2 #B9AEFF`), neutrals `--ink/--body/--muted`.
   No other hues. No shadows-on-cards look: hairline borders (`.hc`, `.chip`), glows only on accent.
2. Type: Inter (`.hl` headline 64-132 px, sentence case, tight tracking; `.bd` body 26-30 px), Space Grotesk for
   numbers/labels (`.num`, `.lbl`, `.eyebrow`). Minimum text 20 px. No em dash anywhere, no "you/your".
3. NO company names, NO company logos, NO app names (MultiLogin, Peram, HEART must never appear). The user said:
   app scenes = SYMBOLIC animation first; real screenshots (`nx.shot(parent, "S05_multilogin-persona.png", t, {x,y,w,rot,hold})`,
   files in `hf/assets/shots/`) only pop in briefly as generic illustration (0.8-1.2 s, small, at the side, max 3 per scene).
4. Meaning first: every element illustrates the words being spoken at that moment. No empty boxes, no decoration for its
   own sake. Icons: the line icon set (nx `icon()`), never emoji, never 3D. No real-person photos; people = simple
   geometric line figures (circle head + shoulders) or the `user`/`users` icons.
5. Layout: content zone x 120..1800, y 130..860. The caption band y 880..1080 belongs to the captions; the chapter marker
   sits top-left (x 72..700, y 56..92) from scene 02 on — keep that corner clear. No element may overlap another
   (declare intended overlaps with `data-allow`), every layout unit carries `data-box="sNN-name"`.
6. Variety: each scene has its OWN hero effect (listed below); do not reuse another scene's hero. Use at least 4 different
   entrance helpers per scene. Mask/wipe/clip/blur entrances, not plain fades.
7. Determinism: no Math.random/Date/rAF/CSS animations or transitions; seeded `nx.rng(seed)`; entrances fromTo
   (immediateRender default true), accents/loops/exits `immediateRender:false`. Never a tween before time 0.
8. Every on-screen string must come from the scene's `ost` inventory or be a short literal phrase of its `vo`.

## Verify (required before you report)
Dev page: `cd D:/MCP/output/nha_personal_brand && DEV_SCENES=sNN,sMM OUT_HTML=D:/MCP/output/nha_personal_brand/hf/_dev/<you>/index.html python work/build.py`
Shots: `node work/eng/tools/shot.mjs --html=_dev/<you>/index.html --out=D:/MCP/output/nha_personal_brand/_shots/<you> --port=<yours> --probe t1 t2 ...`
(pick times at every beat: each cue word +0.6 s, and mid-pause). `--probe` must print `ok` for your boxes (no OVERLAP,
OFFSCREEN, CAPTION-BAND, SMALL-TEXT) and `ERRORS: none`. LOOK at the PNGs (make a contact sheet with PIL, downscaled) and
fix anything ugly, cramped, unbalanced, or unreadable. Report: files written, cue keys, hero FX, the OUT transition, and the
probe output.

## Scene assignments (hero FX + OUT transition)
| scene | hero FX | OUT |
|---|---|---|
| s02 Who I am | editorial name card: name in big chars, role line clip-reveal, VI / EN / JP chips settle, thin-line map pin "Ho Chi Minh City" with ping | T_push |
| s03 Career path | horizontal timeline drawn (draw path) with 5 milestone cards in a track that slides left as each is read; IT branch card shows a 30-dot team grid | T_wipe dir l |
| s04 Philosophy | a CV document (line art) blurs back ("records the past") while a person silhouette sharpens; a "Role profile" panel builds 3 cards (Must-have skills / The team / The manager); "weeks" = a calendar strip whose wrong-direction weeks get struck | T_iris |
| s05 The search | candidate dot field; a magnifier ring scans and lights "not yet looking" dots; the hiring manager's checklist slides onto the interview; funnel 20-40 -> 1-2 with two reason chips; "worth meeting" | T_grid |
| s06 My own method | blueprint: 23 numbered nodes on a grid in 4 stages (Define · Search · Assess · Follow-up) drawn along a path, count 1 -> 23, checklist / metrics / report icons, probation tick, "stays and grows" rising line | T_doors |
| s07 The bridge | three pain icons (clock "slow replies", broken link "missed follow-ups", person under a stack "judgment lost to routine"); split screen code / hiring process merges; routine items flow to a "Software" side, a decision star lights on the "People" side | T_leak |
| s08 Many accounts, one AI recruiter | hub screen with 8 account avatars in a ring, connection lines to a network of candidate dots; an agent node answering bubbles in EN / VI / JA / KO ("Hello", "Xin chào", "こんにちは", "안녕하세요"); a 24 h ring; a contacted dot gets a lock (never twice); "one recruiter reaches as far as a whole team" = 1 figure -> row of figures. Pop-ins: S05, S06a, S06d | T_zoom |
| s09 A report on every candidate | chat bubbles fly into candidate cards whose score bars move with each bubble; a card passes the threshold, glows, "Call proposed" phone chip; a flood of message lines collapses into ONE report document. Pop-in: S07 | T_focus |
| s10 It learns, and it is measured | 4-step loop Learn -> Correct -> Propose -> Approve (approve = a person tick), a 5-axis radar growing; split into 4 KPI tiles counting up 1,942 / 194 / 59 / 21 ("30 DAYS"); tagline "in numbers, not feelings". Pop-ins: S08a, S09 | T_wipe dir t |
| s11 Digitizing the rest of HR | three pushed beats: virtual office desk grid with activity pulses + timesheet filling itself; chat bubbles locking into a vault ("knowledge stays"); CV and JD side by side with skill match lines and a % gauge; end line "HR that runs on data". Pop-ins: S11, S12a, S12c | T_dip |
| s12 What cannot be automated | warm, slower: "Not everything should be automated" big; a meeting table with two chairs and two coffee cups (line art); labels Motivations · Doubts · Leadership float around the candidate with a small "cannot be automated" tag; ladder Team lead -> Head -> CTO; handshake icon on "negotiate" | T_iris |
| s13 Closing | two columns: left a dot network (AI · volume · "no one missed"), right the meeting table (judgment · "the right person"); both converge into one point that blooms into the name lockup THAI TRAN HOANG NHA + "Talent Acquisition & AI Systems" + symbolic contact icons (mail, link) WITHOUT any address; hold, then fade to black (last scene: `scene("s13", {last: true})` and fade the root out over the final 1.5 s yourself) | — |
