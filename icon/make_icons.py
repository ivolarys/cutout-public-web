#!/usr/bin/env python3
"""Draws the three app icon proposals as SVG. Run: python3 make_icons.py (needs rsvg-convert for the PNG renders)."""
import math

PAPER, BLUE, RED, YELLOW, PLUM = '#f0e9da', '#2743b5', '#ff5533', '#ffc933', '#2a1638'

def rot(p, c, deg):
    a = math.radians(deg); x, y = p[0] - c[0], p[1] - c[1]
    return (c[0] + x * math.cos(a) - y * math.sin(a), c[1] + x * math.sin(a) + y * math.cos(a))

def capsule(a, b, w, fill, stroke=None, sw=0, opacity=1):
    """A paper strip from pin a to pin b, w wide, with round ends."""
    length = math.dist(a, b); ang = math.degrees(math.atan2(b[1] - a[1], b[0] - a[0]))
    s = f' stroke="{stroke}" stroke-width="{sw}"' if stroke else ''
    o = f' opacity="{opacity}"' if opacity != 1 else ''
    return (f'<rect x="{-w/2:.1f}" y="{-w/2:.1f}" width="{length + w:.1f}" height="{w}" rx="{w/2}" '
            f'transform="translate({a[0]:.1f} {a[1]:.1f}) rotate({ang:.2f})" fill="{fill}"{s}{o}/>')

def pin(p, r, ring, dot):
    return (f'<circle cx="{p[0]:.1f}" cy="{p[1]:.1f}" r="{r}" fill="{ring}"/>'
            f'<circle cx="{p[0]:.1f}" cy="{p[1]:.1f}" r="{r*0.56:.1f}" fill="{dot}"/>')

CUT = ('<filter id="cut" x="-10%" y="-10%" width="120%" height="120%">'
       '<feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="4" result="n"/>'
       '<feDisplacementMap in="SourceGraphic" in2="n" scale="16" xChannelSelector="R" yChannelSelector="G"/></filter>')

def wrap(body, bg, shape):
    """shape: 'mac' = rounded tile with the margin macOS expects, 'full' = full-bleed square."""
    if shape == 'mac':
        clip = '<clipPath id="tile"><rect x="100" y="100" width="824" height="824" rx="186"/></clipPath>'
        inner = f'<g clip-path="url(#tile)"><rect width="1024" height="1024" fill="{bg}"/>{body}</g>'
    else:
        clip = ''
        inner = f'<rect width="1024" height="1024" fill="{bg}"/><g transform="translate(512 512) scale(1.16) translate(-512 -512)">{body}</g>'
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024"><defs>{CUT}{clip}</defs>{inner}</svg>'

def pinned_c(paper, ground, ghost):
    """The letter C as a limb of three paper parts on two pins; the top part's last two poses show in red."""
    j1, j2 = (376, 455), (386, 735)
    top, bottom = (644, 417), (648, 781)
    w = 150
    g = [capsule(j1, rot(top, j1, -46), w, ghost, opacity=0.42),
         capsule(j1, rot(top, j1, -23), w, ghost)]
    parts = [capsule(j2, bottom, w, paper, ground, 14),
             capsule(j1, top, w, paper, ground, 14),
             capsule(j1, j2, w, paper, ground, 14)]
    pins = [pin(j1, 36, ground, RED), pin(j2, 36, ground, RED)]
    return f'<g filter="url(#cut)">{"".join(g)}{"".join(parts)}</g>{"".join(pins)}'

def sheet_and_part():
    """Today's icon redrawn in the three inks: a sheet, a strip of tape, one pinned part and its last pose."""
    sheet = ('<path d="M250 236 L716 214 L742 262 L722 312 L752 368 L728 428 L760 492 L734 560 L764 632 '
             'L738 700 L762 770 L276 800 Z" fill="%s"/>' % PAPER)
    tape = f'<rect x="196" y="196" width="250" height="74" transform="rotate(24 321 233)" fill="{YELLOW}"/>'
    a, b = (636, 404), (438, 664)
    ghost = capsule(a, rot(b, a, 34), 170, RED)
    part = capsule(a, b, 170, PAPER, BLUE, 14)
    return f'<g filter="url(#cut)">{sheet}{tape}{ghost}{part}</g>{pin(a, 42, BLUE, RED)}'

ICONS = {
    'a-pinned-c-blue': (pinned_c(PAPER, BLUE, RED), BLUE),
    'b-pinned-c-paper': (pinned_c(BLUE, PAPER, RED), PAPER),
    'c-sheet-and-part': (sheet_and_part(), BLUE),
}
for name, (body, bg) in ICONS.items():
    for shape in ('mac', 'full'):
        open(f'{name}-{shape}.svg', 'w').write(wrap(body, bg, shape))

# contact sheet: each proposal at 512, 128, 64, 32 and 16 px on a light and a dark desk
import base64, subprocess, tempfile, os
rows, tmp = [], tempfile.mkdtemp()
for i, name in enumerate(ICONS):
    y = 40 + i * 600
    for dx, desk in ((0, '#e9e9ec'), (980, '#1d1d22')):
        rows.append(f'<rect x="{dx}" y="{y - 40}" width="980" height="600" fill="{desk}"/>')
        x = dx + 30
        for size in (512, 128, 64, 32, 16):
            png = os.path.join(tmp, f'{name}-{size}.png')
            subprocess.run(['rsvg-convert', '-w', str(size), f'{name}-mac.svg', '-o', png], check=True)
            data = base64.b64encode(open(png, 'rb').read()).decode()
            rows.append(f'<image href="data:image/png;base64,{data}" x="{x}" y="{y + 520 - size}" width="{size}" height="{size}"/>')
            x += size + 34
open(os.path.join(tmp, 'sheet.svg'), 'w').write(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1960 1800" width="1960" height="1800">{"".join(rows)}</svg>')
subprocess.run(['rsvg-convert', os.path.join(tmp, 'sheet.svg'), '-o', 'contact-sheet.png'], check=True)
for name in ICONS:
    subprocess.run(['rsvg-convert', '-w', '1024', f'{name}-mac.svg', '-o', f'{name}-1024.png'], check=True)
