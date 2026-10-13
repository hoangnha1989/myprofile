# Palette change (user 2026-10-13): LIGHT paper + blue + orange, like the approved GPRFLEXEYE company video

This REPLACES rule 1 of BRIEF.md (graphite + violet). Everything else in BRIEF.md still holds (no names, meaning first,
layout zones, determinism, no em dash, no "you/your", only edit your own scene files).

- Background: white / paper (`--bg #FFFFFF`, `--bg2 #F8FAFC`), soft blue + orange glows behind (core, do not touch).
- Text: `--ink #1E293B` headlines, `--body #475569`, `--muted #64748B`. Never light text on white.
- Accent colours: blue `--acc #25A1DB` (primary: lines, nodes, rings, bars, icons in focus), deep blue `--acc3 #1B7FB0`,
  orange `--acc2 #E06E20` (emphasis words in headlines, key numbers, highlight dots; `#F47E2A` for fills).
  Orange and blue never blend into each other (no gradient between them: khaki midpoint).
- Cards: white with hairline `--line #E2E8F0` and the soft shadow `var(--shadow)`; chips white with border `--line2 #CBD5E1`.
- Glows that were violet are now blue: keep them subtle on white (a glow that reads as a smudge or a pale square = fix it).
- An automatic colour mapping already ran (work/retheme_light.py). Your job: make YOUR scene look right and premium on white:
  contrast of every text and line (thin 1-1.5 px light strokes may vanish: darken or thicken), no pale rectangles or
  muddy blurs, dark-theme leftovers (dark panels, white text, screen-blend glows, black fades) converted, balance of blue
  vs orange (blue dominant, orange for emphasis), and the SAME sync/beat timing as now (do not retime).
