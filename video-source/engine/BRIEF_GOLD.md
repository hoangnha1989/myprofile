# Gold design pass (user 2026-10-13): "sao icon và hình ảnh không chuyên nghiệp 3D shadow và được design như lúc đầu?"

The user wants the look of the approved GPRFLEXEYE company video (reference frames: D:/MCP/output/gprflexeye_intro/_qa_v4/*.png;
engine D:/MCP/output/gprflexeye_intro/work/v4/scenes/*.js). This brief OVERRIDES the icon/card/type rules of BRIEF.md and
BRIEF_LIGHT.md. Everything else stays (no company/app names, meaning first, timing on cue words, layout zones, determinism,
no em dash, no you/your, only edit your own scene files).

1. ICONS = 3D CLAY on white plates, not line icons. Replace every concept icon (nx.icon line SVGs used as the meaning of a
   beat) with a clay icon: `nx.plate(parent, name, x, y, "L"|"M"|"S", {id, tint:"orange" for the chosen/accent one})` (plate
   sizes 168/128/88 px) or `nx.hero(parent, name, x, y, px, {id})` for a big free-floating hero icon (180-320 px) with its
   contact shadow. Icon names: see work/icons/ICONS.md (the 34 approved GPRFLEXEYE icons + the new personal set). Small UI
   glyphs INSIDE a card row (a tick, a tiny bullet) may stay line icons, but anything that IS the idea of the line gets clay.
   Prefer clay icons in the 2-4 big hero beats of your scene; keep plates on a consistent grid and size per scene.
2. CARDS = gold material (already global): `.hc` and `.chip` now have the white face, orange-to-blue gradient edge and the
   layered 3D shadow. Put content in cards like the reference (mini-UI inside: rows, bars, ticks, numbers). Orange chip
   `.chip.acc` = the chosen item. Numbers big in Space Grotesk; key numbers may use the orange text gradient via `.hl em`.
3. TYPE = gold: headlines `.hl` are now Space Grotesk 700 UPPERCASE (global). Uppercase is wider: re-fit every headline
   (gold sizes: one line 64-72 px, two lines 60-64 px; hero words up to ~110 px), re-wrap with explicit lines, fix any
   overflow/overlap, keep emphasis words in `<em>` (orange gradient). Body/labels Manrope (`.bd`) and SG labels.
4. Look at the gold reference frames side by side with yours and match the density, plate grid, shadows and calm.
5. Verify as before (dev page with neighbours, shot.mjs --probe at every cue +0.6 s and in the pauses, contact sheets you
   actually LOOK at). Final probe ok at rest beats, ERRORS: none.

## Round 2 (user 2026-10-13): "ĐỀU VÀ CÂN ĐỐI HƠN TRONG CÁC ICON VÀ KHÔNG BỊ LỆCH LOGIC"
6. EVEN + BALANCED + LOGICAL (rules: C:/Users/hoang/.claude/skills/media-business-video/references/layout-standard.md, read it).
   - One plate size per row, equal gaps, centred group; cards in a row share height and gap; 2 px grid for every hand-set
     left/top; nothing closer than 8 px unless nested; frame visually balanced around x=960 (if a scene is a deliberate
     left/right composition, put data-balance="left|right" on the scene root AND balance it with the other side).
   - Logic: arrows/lines go from source to target through empty space; the order on screen = the order spoken; numbers
     drawn = numbers said; every icon matches its word (work/icons/ICONS.md, 51 clay icons).
   - BLOCKING machine gate, run on your dev page at the same rest-beat times as the probe:
     `node work/eng/tools/balance.mjs --html=_dev/<you>/index.html --port=<yours+100> t1 t2 ...` -> every line "ok".
7. Script changes already in work/storyboard_v2.4.json (read vo/ost again):
   - s03: the "HR · Japanese manufacturer" milestone is GONE. Milestones now: Banking · International settlement ->
     IT Branch Manager · 30 people (for a Japanese company, never name it) -> HR & Recruiting Manager · 5 years ->
     Executive Search · Senior tech. 4 milestones, evenly spaced, clay icons (bank, team_group, manager, code_window or
     magnifier_person).
   - s09: Nha HIMSELF calls to interview the candidate: "it books a call with me, so I can interview the candidate
     myself". The chip/label is "Interview with Nha" with the phone_call clay icon. No "hiring leader" / "Call proposed".
   - s10: 3 KPI tiles only (no messages tile): 190 CVs · 160 top-tier · 150 interview calls, chip "30-DAY AVERAGE"
     ("Every thirty days, on average"). Remove the S09_kpi-dashboard.png pop-in (it shows old numbers). Cue keys must
     match the new words (one hundred and ninety / sixty / fifty, "interview calls", "average").

## Round 3 (user 2026-10-13 PM)
8. s02 AVATAR: the user's own photo replaces the clay person_bust in the portrait ring: `assets/shots/avatar_round.png`
   (640x640, already circular with alpha). Keep the ring/arc design; add the gold 3D shadow (filter drop-shadow like
   plate.css .fx-hero-ico). It must read as a premium circular portrait, face fully visible, not cropped by the ring.
9. APP SHOWCASE (user: "fade in to đùng đập màn hình rồi thu nhỏ vào góc hợp lý, xếp từng hình ... ngăn nắp"): use
   `nx.showcase(parent, file, at, {slot:{x,y,w}, ar: imgH/imgW, hold, id})` (nx.js; read its header). Each screenshot
   slams in BIG at centre (scrim dims the scene), holds, then flies into its docked slot and STAYS there. Docked slots of
   one scene form ONE tidy, evenly spaced stack/row in a sensible zone (e.g. a right or bottom strip / corner column),
   same width, equal gaps, aligned to the 2 px grid, and the scene layout must make room for that strip (rebalance the
   rest of the scene; balance gate must pass, data-balance allowed if the strip makes a deliberate side layout).
   Time each slam on the word that names what the app shows; one at a time (next slam only after the previous docked).
   Keep the scene's meaning beats; remove old nx.shot/popShot pop-ins (replaced by showcase). Image sizes (w x h):
   S05 1533x728, S06a/b/c 1400x862, S06d 1400x665, S07 1393x549, S08a 1400x862, S08b 1400x360, S11 1909x950,
   S12a-e 1920x1080. NEVER use S09_kpi-dashboard.png (old numbers).
10. s08 LANGUAGE POPUPS (user 2026-10-13 PM): the greeting bubbles (Hello / Xin chào / こんにちは / 안녕하세요) are REPLACED by
    real screening questions the AI recruiter asks, one popup per language, popping in one after another around the agent
    (same chip style with the language tag). Exact texts (no "you/your" in English on screen):
    EN "Years of AI / LLM experience?" · VI "Anh/chị có bao nhiêu năm kinh nghiệm AI/LLM?" ·
    JA "AI・LLMのご経験は何年ですか？" · KO "어떤 프로젝트에서 어떤 역할을 맡으셨나요?" ·
    optional 5th/6th: EN "Which projects? Which role?" · VI "Anh/chị giữ vai trò gì trong dự án?".
    Keep them readable (>= 20 px, never clipped, chips sized to text, tidy positions that do not collide with nodes).
10. s08 LANGUAGE POPUPS (user 2026-10-13 PM): the greeting bubbles (Hello / Xin chào / こんにちは / 안녕하세요) are REPLACED by
    real screening questions the AI recruiter asks, one popup per language, popping in one after another around the agent
    (same chip style with the language tag). Exact texts (no "you/your" in English on screen):
    EN "Years of AI / LLM experience?" · VI "Anh/chị có bao nhiêu năm kinh nghiệm AI/LLM?" ·
    JA "AI・LLMのご経験は何年ですか？" · KO "어떤 프로젝트에서 어떤 역할을 맡으셨나요?" ·
    optional: EN "Which projects? Which role?" · VI "Anh/chị giữ vai trò gì trong dự án?".
    Readable (>= 20 px, never clipped, chips sized to text, tidy positions that do not collide with nodes).
11. s05 PROOF BEAT (new approved VO at the end of s05): "Over ten years, this approach has led to more than eight hundred
    offers, from junior and senior engineers to team leads and managers, backed by an IT talent database of nearly five
    thousand CVs." -> two big hero counters (SG, orange gradient): "800+" OFFERS · 10 YEARS, and "~5,000" IT CVs (database),
    plus a level ladder/chips Junior · Senior · Team lead · Manager lighting in spoken order; clay icons (star_award or
    handshake for offers, profile_stack or cv_resume for the database). Counts land on their spoken numbers.
