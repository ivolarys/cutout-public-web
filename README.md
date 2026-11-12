# CutOut Studio — public website

One-page site for CutOut Studio, built with [Astro](https://astro.build). Static output, no client framework.

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

The build lands in `dist/` and can be hosted anywhere that serves static files.

## Waitlist

The two forms post `{"email": "..."}` as JSON to the address in `PUBLIC_WAITLIST_ENDPOINT` (copy `.env.example` to `.env`). Any 2xx answer counts as signed up. While the variable is empty the form sends nothing and says so.

## Where things are

- `src/pages/index.astro` — the page and all its copy.
- `src/styles/global.css` — the three inks, type and layout.
- `src/scripts/stage.ts` — the posable puppet in the hero (drag, capture, onion skin, 12 fps playback).
- `src/assets/shots/` — screenshots made by the app's own test scripts (`ui_shots`, `stage_ui_demo` in the app repository). Re-run those and copy the files over to refresh them.
- `icon/` — the app icon proposals. `python3 make_icons.py` redraws the SVGs, the 1024 px PNGs and `contact-sheet.png` (needs `rsvg-convert`). Proposal A is what `public/icon.png` and `public/favicon.png` are made from.
- `PRODUCT.md` — what the product is and what the site may claim. `DESIGN.md` — the visual system.

Set `site` in `astro.config.mjs` once the domain is known.
