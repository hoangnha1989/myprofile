# Introduction video: source

Source of the 4K introduction video on this site (`introduction.mp4` is a 1080p web copy; the 4K master is kept off GitHub because of the 100 MB file limit).

- `engine/`: the HTML/GSAP motion engine (one deterministic timeline), 13 scene files, cue maps and QA tools (probe, balance gate, frame shots).
- `scripts/`: build (storyboard -> timeline), voice assembly and text gate, mix, mux, render verification, the 1.2x tempo chain, and the Japanese subtitle builder (`ja/`).
- `subtitles/`: SRT in English, Japanese and Vietnamese (the site plays the WebVTT copies in `/subtitles`).
- `NHA_storyboard_package.pdf`: script and storyboard with frames of the final film.

Rendered locally with HyperFrames 0.8.144 (`npx hyperframes render --resolution 4k --fps 60`).
