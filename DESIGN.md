---
name: CutOut Studio
description: A three-ink risograph sheet for a paper cut-out stop-motion app.
colors:
  federal-blue: "#2743b5"
  fluorescent-red: "#ff5533"
  sunflower-yellow: "#ffc933"
  warm-paper: "#f0e9da"
  overprint-green: "#2f8f5e"
  overprint-plum: "#2a1638"
  red-tint-skin: "#f6b9a4"
typography:
  display:
    fontFamily: "'Big Shoulders Display', 'Arial Narrow', sans-serif"
    fontSize: "clamp(4rem, min(12.6vw, 19.5svh), 14.5rem)"
    fontWeight: 900
    lineHeight: 0.8
    letterSpacing: "0"
  headline:
    fontFamily: "'Big Shoulders Display', 'Arial Narrow', sans-serif"
    fontSize: "clamp(3rem, 8vw, 8rem)"
    fontWeight: 900
    lineHeight: 0.84
    letterSpacing: "0"
  title:
    fontFamily: "'Big Shoulders Display', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3.75rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "0"
  term:
    fontFamily: "'Big Shoulders Display', 'Arial Narrow', sans-serif"
    fontSize: "clamp(1.6rem, 2.6vw, 2.5rem)"
    fontWeight: 900
    lineHeight: 0.95
  numeral:
    fontFamily: "'Big Shoulders Display', 'Arial Narrow', sans-serif"
    fontSize: "clamp(5rem, 9vw, 9rem)"
    fontWeight: 900
    lineHeight: 0.8
  button:
    fontFamily: "'Big Shoulders Display', 'Arial Narrow', sans-serif"
    fontSize: "1.45rem"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "0.02em"
  lede:
    fontFamily: "'Familjen Grotesk Variable', system-ui, sans-serif"
    fontSize: "clamp(1.15rem, 1.5vw, 1.4rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "'Familjen Grotesk Variable', system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "'Familjen Grotesk Variable', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.25
  caption:
    fontFamily: "'Familjen Grotesk Variable', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  none: "0"
  full: "50%"
spacing:
  control-gap: "0.6rem"
  stack: "0.9rem"
  stack-lg: "1.25rem"
  gutter: "clamp(1rem, 4vw, 3.5rem)"
  column-gap: "clamp(1rem, 3vw, 3rem)"
  field: "clamp(4rem, 9vw, 8rem)"
components:
  button-primary:
    backgroundColor: "{colors.fluorescent-red}"
    textColor: "{colors.overprint-plum}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 1.4rem"
    height: "3.25rem"
  button-primary-small:
    backgroundColor: "{colors.fluorescent-red}"
    textColor: "{colors.overprint-plum}"
    rounded: "{rounded.none}"
    padding: "0 1rem"
    height: "2.75rem"
  button-on-red:
    backgroundColor: "{colors.overprint-plum}"
    textColor: "{colors.warm-paper}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 1.4rem"
    height: "3.25rem"
  input-email:
    backgroundColor: "{colors.warm-paper}"
    textColor: "{colors.federal-blue}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0 0.9rem"
    height: "3.25rem"
  input-email-on-red:
    backgroundColor: "{colors.warm-paper}"
    textColor: "{colors.overprint-plum}"
    rounded: "{rounded.none}"
    padding: "0 0.9rem"
    height: "3.25rem"
  tool:
    backgroundColor: "{colors.federal-blue}"
    textColor: "{colors.warm-paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 0.8rem"
    height: "2.75rem"
  tool-hover:
    backgroundColor: "{colors.warm-paper}"
    textColor: "{colors.federal-blue}"
  tool-pressed:
    backgroundColor: "{colors.sunflower-yellow}"
    textColor: "{colors.federal-blue}"
  capture:
    backgroundColor: "{colors.fluorescent-red}"
    rounded: "{rounded.full}"
    size: "4rem"
  frame-cell:
    backgroundColor: "{colors.warm-paper}"
    rounded: "{rounded.none}"
  tag-later:
    backgroundColor: "{colors.sunflower-yellow}"
    textColor: "{colors.federal-blue}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 0.45rem"
  field-blue:
    backgroundColor: "{colors.federal-blue}"
    textColor: "{colors.warm-paper}"
  field-yellow:
    backgroundColor: "{colors.sunflower-yellow}"
    textColor: "{colors.federal-blue}"
  field-red:
    backgroundColor: "{colors.fluorescent-red}"
    textColor: "{colors.overprint-plum}"
---

# Design System: CutOut Studio

## Overview

**Creative North Star: "The Three-Ink Sheet"**

The website is one risograph sheet: warm paper with tooth, and three spot inks laid on it. Federal blue, fluorescent red-orange and sunflower yellow are the only inks in the drum. Where two cross they multiply into a third colour (blue over yellow prints green, blue over red prints plum), and those overprints are the only other colours allowed. There is no black and no grey anywhere: reading text is blue ink on paper, paper knocked out of blue, or plum on red.

The system is loud and flat. Heavy condensed capitals carry a red ghost printed a hair out of register; whole sections are flooded with a single ink edge to edge; app screenshots are tipped onto the sheet with one ink plate showing behind them. Illustration is cut paper: rounded shapes with a wobbling scissor edge, multiplied onto whatever lies beneath, including the headline. The red ghost is also the product's onion skin, so the print fault and the feature are the same mark.

Motion is stop-motion. Everything moves in steps (`steps(3, end)` over 0.12s for controls, 12 frames a second for playback, a two-step flash on capture); nothing is eased. With `prefers-reduced-motion`, transitions, the capture flash and autoplay are off.

**Key Characteristics:**
- Three spot inks on warm paper; overprints by multiplication; no black, no grey.
- Section-wide single ink fields, changing ink from section to section.
- Condensed 900-weight capitals at poster scale with a misregistered red plate.
- Square corners everywhere; the only round thing is the Capture button.
- Depth comes from offset plates and overprint, never from soft shadows.
- Paper grain and ink speckle sit over the entire sheet.
- Stepped, 12 fps motion.

## Colors

Three inks, the paper, and what the inks make when they cross.

### Primary
- **Federal Blue** (`federal-blue`): the text ink. All reading text and display type on paper and on yellow; the flood of the "how it works" field and the frame strip; 2px rules and field borders; the plate behind a screenshot on yellow.

### Secondary
- **Fluorescent Red-Orange** (`fluorescent-red`): the action and ghost ink. Primary buttons, the Capture button, the misregistered plate behind display type, onion-skin ghosts of previous poses (multiplied at 0.38 and 0.8 opacity, shown during playback and at rest), the default plate behind screenshots, the flood of the closing field, the caret and link-hover underline.

### Tertiary
- **Sunflower Yellow** (`sunflower-yellow`): the highlight ink. The flood of the focus field, pressed toggles and the current frame cell, small tags and the hint note, step numerals on blue, text selection, focus rings on blue.

### Neutral
- **Warm Paper** (`warm-paper`): the sheet. Page ground, text and borders on blue, input ground on every field, frame cells.
- **Overprint Plum** (`overprint-plum`): blue over red. The text colour on red, the button on the red field, the darkest marks in illustration (hair, shoes, belt). It stands where black would.
- **Overprint Green** (`overprint-green`): blue screened over yellow. Illustration only (hill, legs).
- **Red Tint** (`red-tint-skin`): red screened to a tint. Illustration only (skin).

### Named Rules
**The Three Drums Rule.** Every colour on the sheet is one of the three inks, the paper, or a named overprint of two inks. A new colour has to be explainable as ink over ink; otherwise it does not print.

**The No Black Rule.** Nothing is black or grey. The darkest value is Overprint Plum, and it appears only where blue and red would physically cross or as text on red.

**The Ink Pairing Rule.** Text pairs are fixed: blue on paper (6.8:1), paper on blue (6.8:1), blue on yellow (5.3:1), yellow on blue for large or bold accents (5.3:1), plum on red (5.2:1), paper on plum. Red and yellow are never text inks on paper, and red is never text on blue.

**The Overprint Rule.** Illustration and the stage are set to `mix-blend-mode: multiply`, so shapes darken what they cross instead of covering it.

## Typography

**Display Font:** Big Shoulders Display 900 (with Arial Narrow, sans-serif)
**Body Font:** Familjen Grotesk Variable (with system-ui, sans-serif)

**Character:** A wood-type poster face shouting in capitals over a plain, slightly warm grotesk that just explains. Only two weights of the grotesk are used: 400 for reading, 600 for labels.

### Hierarchy
- **Display** (900, `clamp(4rem, min(12.6vw, 19.5svh), 14.5rem)`, 0.8; `clamp(3.5rem, 21vw, 9rem)` below 56rem): the page headline, one short word group per line, always uppercase, always misregistered.
- **Headline** (900, `clamp(3rem, 8vw, 8rem)`, 0.84, balanced wrap): section headings. Narrower columns step down to a 6.5vw/6.5rem cap; the closing statement steps up to 10vw/11rem.
- **Title** (900, `clamp(2.25rem, 4vw, 3.75rem)`, 0.9): step headings.
- **Term** (900, `clamp(1.6rem, 2.6vw, 2.5rem)`, 0.95): left-column terms of the spec sheet.
- **Numeral** (900, `clamp(5rem, 9vw, 9rem)`, 0.8): sequence numbers of real ordered steps, yellow on blue, hidden from assistive tech.
- **Button** (900, 1.45rem, 1, 0.02em, uppercase; 1.2rem small): button labels and the wordmark (1.6rem).
- **Lede** (400, `clamp(1.15rem, 1.5vw, 1.4rem)`, 1.5): the one paragraph under the headline; section intros sit at 1.2rem and spec values at `clamp(1.15rem, 1.7vw, 1.6rem)` / 1.35.
- **Body** (400, 1.125rem, 1.5, `text-wrap: pretty`): reading text, held to 34–36ch beside an image, 48ch in the spec sheet, 60ch when stacked.
- **Label** (600, 1rem): form labels, tool buttons, tags, nav links, status messages; tabular numerals for counters.
- **Caption** (400, 1rem): figure captions, notes, footer. Nothing is set below 1rem except the frame number in a cell (600, 0.75rem).

### Named Rules
**The Misregister Rule.** Blue display type on paper, and paper display type on blue, carries the red plate as a hard `text-shadow` offset by `-0.035em, 0.03em` with zero blur. Because the offset is in em it scales with the type. It is not applied on yellow or red fields, nor to body text.

**The Capitals Rule.** Big Shoulders is only ever 900 and uppercase, with letter-spacing 0 (0.02em on button labels). Familjen Grotesk is never uppercase.

## Layout

A 12-column grid (`repeat(12, minmax(0, 1fr))`) inside a wrapper with a fluid gutter (`clamp(1rem, 4vw, 3.5rem)`) and a 100rem cap. Ink fields are full-bleed; only their contents sit in the wrapper. Fields take `clamp(4rem, 9vw, 8rem)` of vertical padding, and the same value separates repeated blocks inside a field. Column gaps are `clamp(1rem, 3vw, 3rem)`.

Splits are asymmetric and alternate: text 4 columns against image 8, mirrored on every second step; image 7 against text 5 in the focus and closing sections, bottom-aligned. The spec sheet is a ruled two-column list (`minmax(8rem, 3fr) 9fr`) with 2px blue rules above and between rows.

In the first viewport the stage occupies columns 6–12 and spans both the headline and copy rows, so the illustration prints over the right half of the headline. The frame strip closes the viewport as a full-width blue band.

Two breakpoints. Below 56rem every split stacks to one column, the stage pulls up over the headline (`margin-top: -18vw`), and the strip wraps so the cells take their own row. Below 40rem text nav links disappear (brand and waitlist button stay) and spec rows stack term over value.

Inside components: 0.6rem between a field and its button, 0.9rem between stacked text blocks, 1.25rem in the larger text columns. Interactive targets are at least 2.75rem tall; primary controls 3.25rem.

## Elevation & Depth

There are no soft shadows and no blur. The sheet is flat; depth is what a print can do: one plate sitting off another, and inks overprinting.

### Shadow Vocabulary
- **Misregistered plate** (`text-shadow: -0.035em 0.03em 0 #ff5533`): the red ghost behind display type.
- **Slipped plate** (`box-shadow: 5px 5px 0 0` in blue, yellow on the red field, with `translate: -2px -2px`): button hover only; at rest and on press the plate sits exactly under the button (`0 0 0 0`). Steps in over 0.12s `steps(3, end)`.
- **Tipped-in plate** (a solid block the size of the image, offset `clamp(0.5rem, 1.2vw, 1rem)` right and down): behind every screenshot. Red by default, yellow as an alternate on blue, blue on yellow.
- **Grain** (two fixed full-viewport SVG noise layers above everything, `pointer-events: none`): dark tooth multiplied at 0.2, light speckle screened at 0.16.

### Named Rules
**The Plate Rule.** An offset is always a solid, hard-edged block of one of the three inks, displaced down and to the right. It is never blurred, never translucent, never black.

**The One Sheet Rule.** Nothing floats. No cards, no raised panels, no glass; a section is a field of ink and its contents are printed on it.

## Shapes

Square. Buttons, inputs, tools, tags, frame cells, screenshots and ink fields all have a radius of 0. The single circle in the interface is the Capture button (50%, 4px paper ring), taken from the app's record dot. The app icon keeps its own rounded corners as an identity asset.

Lines are 2px and solid: rules, input borders, tool outlines, screenshot frames. A dashed 2px outline means "empty slot" (unfilled frame cells). Focus is a 3px outline offset by 3px.

Illustration is the opposite of the interface: pill and ellipse paper parts, an SVG displacement filter that makes every edge look scissor-cut, round paper pins with a blue ring at each joint. Small notes may sit a few degrees off axis (the hint note is rotated 3deg); layout blocks never are.

## Components

### Buttons
Flat blocks of ink with poster lettering; the only flourish is the plate slipping on hover.
- **Shape:** square (0 radius), no border, 3.25rem tall, `0 1.4rem` padding; small variant 2.75rem, `0 1rem`, 1.2rem type.
- **Primary:** red ground, plum label, Big Shoulders 900 uppercase 1.45rem.
- **On red:** plum ground, paper label; the slipped plate is yellow.
- **Hover / Active:** hover shifts the button up-left 2px and shows a 5px hard plate; active snaps back flat. 0.12s, `steps(3, end)`.
- **Disabled / sending:** 0.6 opacity, progress cursor, label changes to "Sending".

### Tool buttons (frame strip)
- **Style:** on blue only. 2px paper outline, no fill, paper label (600, 1rem), 2.75rem tall, optional 1.1rem inline SVG icon in `currentColor`.
- **Hover:** fills paper, label turns blue.
- **Pressed (`aria-pressed="true"`):** fills yellow with a yellow border, label blue.

### Inputs / Fields
- **Style:** paper ground on every field, 2px border in the text ink of the surrounding field (blue on paper, plum on red), square, 3.25rem tall, body type. A visible 600-weight label always sits above; field and button share a row and wrap.
- **Focus:** the global 3px outline; caret is red.
- **Status line:** a reserved line (1rem, min-height 1.5em, `role="status"`) below the row. Success is 600 weight; an error is 600 weight and underlined in the accent ink (red on paper, plum on red). State is never carried by colour alone.

### Navigation
A single row: icon and wordmark (Big Shoulders 900, 1.6rem) left, text links (600) and a small primary button right. Links have no underline at rest and a red 2px underline on hover. Below 40rem the text links are removed.

### Ink fields
Full-bleed sections flooded with one ink: paper, blue, yellow, red. Each field sets its own text ink, heading treatment (misregister on paper and blue only), focus colour (yellow on blue, plum on red) and screenshot plate. Adjacent fields change ink.

### Tipped-in screenshot
A figure with the real app screenshot, a 2px frame (paper on blue, blue on yellow), one offset ink plate behind it, and a plain 1rem caption below the plate saying exactly what the screen shows.

### Frame strip
A blue band: tool buttons, a tabular frame-rate readout, twelve cells in an 8:7 ratio, and the Capture button at the end. Filled cells are paper with a tiny blue-backed frame number bottom-left; empty cells are dashed outlines; the current cell is ringed in yellow. Cells scroll horizontally without a visible scrollbar when they do not fit.

### Capture button
A 4rem red disc with a 4px paper ring. Scales to 1.08 on hover and 0.92 on press in steps. Capturing flashes the stage (opacity 0.15 to 1, 0.18s, two steps).

### Posable stage
An inline SVG drawn with the palette custom properties. Parts are draggable groups (`cursor: grab`, `touch-action: none`) that rotate around visible pins; the two previous poses print underneath as solid red, multiplied, at 0.38 and 0.8 opacity, during playback and at rest. Playback runs at 12 fps on a timer, never interpolated.

### Tags and notes
A yellow block with blue 600-weight 1rem text and tight padding (`0 0.45rem` inline tag, `0.3rem 0.6rem` note). Used to mark something as "later" or to give one instruction next to the stage.

### Spec sheet
A definition list between 2px blue rules: term in Big Shoulders left, value in enlarged body type right (max 48ch), an optional 1rem note beneath the value.

### Craft ledger
A two-column table on paper: "At the table" in Big Shoulders 900 (clamp 1.9–3.5rem, no red plate) and "In CutOut Studio" in body text, rows parted by 2px blue rules. Below 40rem each row stacks and the column heads are kept for screen readers only.

### Pen display section
On the yellow field. Display heading, one lede, then a plain list: each item is a bold lead-in and one sentence under a 2px blue rule. No cards, no icons. Beside it a cut-paper drawing of a pen display (blue slab, paper screen, the puppet, a plum pen with a red tip), drawn in SVG with the same `#cut` edge filter as the hero and no multiply.

### App icon
Proposal A in `icon/`: the letter C built as a limb of three paper parts on two red pins, the top part's last two poses behind it in red, on the blue ink. It keeps its own rounded tile; on the site it is shown at 2.25rem with a 22% radius.

## Do's and Don'ts

### Do:
- **Do** build every colour from the three inks, the paper, or a named overprint, and reference the `:root` custom properties (`--blue`, `--red`, `--yellow`, `--paper`, `--green`, `--plum`, `--skin`).
- **Do** flood a whole section with one ink and change ink at the next section.
- **Do** set display type in Big Shoulders Display 900, uppercase, line-height 0.8–0.9, and give it the red misregistered plate on paper and on blue.
- **Do** keep corners square and lines 2px solid; reserve the circle for Capture.
- **Do** show depth with a hard, solid ink plate offset down-right, and use `mix-blend-mode: multiply` for illustration over type.
- **Do** move in steps: `steps(3, end)` at 0.12s for controls, 12 fps for sequences, and switch motion off under `prefers-reduced-motion`.
- **Do** switch the focus ring to the ink that contrasts with the field: yellow on blue, plum on red.
- **Do** show real app screenshots, framed, plated and captioned with what is on screen.

### Don't:
- **Don't** use black, grey, or any colour that is not an ink, the paper, or an overprint.
- **Don't** use soft shadows, blur, gradients, glass or translucent panels.
- **Don't** round corners on interface elements or wrap content in cards.
- **Don't** ease, fade or tween; no smooth transitions between states or poses.
- **Don't** set body text in red or yellow on paper, or red on blue; the pairs in the Ink Pairing Rule are the only text pairs.
- **Don't** set Big Shoulders in lower case or lighter weights, or Familjen Grotesk in capitals.
- **Don't** put the misregistered ghost on body text, or on type printed on yellow or red.
- **Don't** blur or soften an offset plate, or offset it up or to the left.
