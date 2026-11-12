# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro (chosen by Ivo, 11 Nov 2026). Static output, no client framework. This repository holds only the public website; the app lives in `~/_Projects/2_AI_Projects/stop-motion-app/godot-rust` (Godot 4.7 + Rust).

## Users

Independent animators and illustrators, and animation students, who make paper cut-out animation: they draw and cut puppet parts by hand, scan them, and want to animate them frame by frame with a pen tablet (Wacom Cintiq / Intuos) on macOS or Windows. Confirmed by Ivo as the primary audience. The website is in English only.

## Product Purpose

CutOut Studio is a desktop authoring tool for paper cut-out stop-motion. One app carries the whole flow: import scans, remove the background while keeping the paper edge, pin parts into a puppet, pose it frame by frame, export a film.

The public website's job today: present the app and collect waitlist sign-ups. Downloads are not public yet.

## Positioning

Direction set by Ivo on 12 Nov 2026: CutOut Studio takes the traditional cut-out / 2D animation technique and carries it into digital, so an animator brings every habit and all their experience along. Two things make that possible and both are part of the message: touch-ready professional pen displays, and an interface thought through for working on them.

The website tells it in that order: same hands, new table; each habit from the table and where it lives in the app; the pen display and the interface built for it; then the three pages and what comes out.

Real hand-cut paper, animated the stop-motion way (pose, capture, next frame), without a camera stand. Not tweened vector rigging: there are no keyframe curves, every frame is a captured pose. Rigging works like paper: lay parts over each other and put a pin through them.

Limits on the tablet claims (app docs, 12 Nov 2026): the Wacom hardware checklist is not filled in yet; XP-Pen on macOS was tried and gives pressure and tilt. Say "in testing on Wacom and XP-Pen pen displays", never "certified" or "supports every tablet". Touch that exists today: pinch to zoom in the editors, double-tap to hold a part, menu and list rows sized for pen and finger.

## Operating Context

- Three pages in the app, in working order: **Library** (scans, image editor), **Rig** (build a puppet), **Stage** (animate, timeline, export). Sound is planned, not built.
- Pen-first: pressure, large targets, tablet gestures, a Pen test screen.
- Projects are plain folders on disk.

## Capabilities and Constraints

Confirmed in the app at version 0.4.1 (README, 11 Nov 2026):

- Import PNG, JPG, TIFF scans whole; an A4 600 dpi scan imports in 0.13–0.25 s (measured, spike report).
- Image editor with Photoshop-style tools: magic wand, marquee, lasso, mask, crop, brush, eraser, clone, restore original; pen pressure drives brush size and opacity.
- Rig: pin parts where they overlap; which part holds which is worked out automatically; variants (several pictures for one part, e.g. open and closed hand); Edit / Test switch; see-through parts and outlines to find where a pin goes.
- Stage: drag to rotate a part around its pin; hold a part in place and pull another so everything between bends; onion skin (0–3 frames before, 0–2 after); frame holds ×1–×3; scenes that make up a film; layers per frame; Focus (depth of field: layers placed near to far, blur by distance from the focus line).
- Export: PNG sequence, H.264 MP4, ProRes 4444 MOV with alpha; 1080p and 4K; 12, 24, 25, 30 fps; formats 16:9, 4:3, 1:1, 9:16.
- Built-in MCP server so an AI assistant can operate the app (off by default, local only).
- Runs on macOS (Apple Silicon) and Windows x64; a Linux build exists but has not been run on real hardware.
- Dark and light theme.

Not decided / must not be claimed: price, licence, release date, signed builds, sound. Builds are unsigned test pre-releases.

Open: which service stores waitlist e-mails (the form posts to a configurable endpoint).

## Brand Commitments

- Name: **CutOut Studio** (capital O).
- App icon (chosen by Ivo, 12 Nov 2026): the letter C as a limb of three paper parts on two red pins, with the top part's last two poses in red, on riso blue. Sources and the two rejected alternatives are in `icon/`; the app repo has it as `scripts/icon.svg` with `app/icon.png`, `icon_macos.png`, `icon.ico` and `splash.png` rendered from it.
- App palette (from `ui_theme.gd`): ink `#141317`, paper `#f2eee6`, canvas `#efe8da`, record red `#ff5533`, tape blue `#6fa8ff`, wax yellow `#ffc65c`.
- Sample puppet "Walker" (blue torso, red upper arms, yellow forearms, green legs) and the green-hill background.

## Evidence on Hand

- Real screenshots of the app in both themes, produced by the app's own test scripts (`ui_shots`, `stage_ui_demo`), copied to `src/assets/shots/`.
- Sample scans of the Walker's parts and the landscape background (`app/samples`).
- Measurements from `docs/REPORT.md` in the app repo.
- No testimonials, no user films, no press, no customers. Do not fabricate any.

## Product Principles

1. Paper stays paper: edges, texture and the pin are the product, not a style applied afterwards.
2. Frame by frame is the point; never present it as a limitation to be automated away.
3. Pen first: anything shown or said should hold for someone working on a tablet.
4. Say only what the build does today; "later" is labelled as later.

## Accessibility & Inclusion

WCAG 2.2 AA for the website; motion respects `prefers-reduced-motion`.
