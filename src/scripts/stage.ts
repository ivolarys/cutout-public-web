// A miniature of the app's Stage: a paper puppet pinned at its joints, posed by dragging,
// captured frame by frame and played back at 12 fps. The previous pose shows through in red (onion skin).

const NS = 'http://www.w3.org/2000/svg';
const FPS = 12;
const MAX_FRAMES = 12;

type PartId = 'torso' | 'head' | 'ual' | 'fal' | 'uar' | 'far' | 'thl' | 'shl' | 'thr' | 'shr';
type Pose = { x: number; y: number } & Record<PartId, number>;

interface PartDef {
  id: PartId;
  parent?: PartId;
  pin: [number, number]; // where it is pinned, in its parent's coordinates
  label: string;
  shapes: (ghost: boolean) => string;
}

const ink = (colour: string, ghost: boolean) => `class="ink" fill="${ghost ? 'var(--red)' : colour}"`;

const PARTS: PartDef[] = [
  {
    id: 'thl',
    parent: 'torso',
    pin: [-24, 80],
    label: 'Left thigh',
    shapes: (g) => `<rect x="-23" y="-20" width="46" height="150" rx="23" ${ink('var(--green)', g)}/>`,
  },
  {
    id: 'shl',
    parent: 'thl',
    pin: [0, 116],
    label: 'Left shin',
    shapes: (g) =>
      `<rect x="-20" y="-16" width="40" height="140" rx="20" ${ink('var(--green)', g)}/>` +
      `<ellipse cx="12" cy="126" rx="34" ry="15" fill="${g ? 'var(--red)' : 'var(--plum)'}"/>`,
  },
  {
    id: 'thr',
    parent: 'torso',
    pin: [24, 80],
    label: 'Right thigh',
    shapes: (g) => `<rect x="-23" y="-20" width="46" height="150" rx="23" ${ink('var(--green)', g)}/>`,
  },
  {
    id: 'shr',
    parent: 'thr',
    pin: [0, 116],
    label: 'Right shin',
    shapes: (g) =>
      `<rect x="-20" y="-16" width="40" height="140" rx="20" ${ink('var(--green)', g)}/>` +
      `<ellipse cx="12" cy="126" rx="34" ry="15" fill="${g ? 'var(--red)' : 'var(--plum)'}"/>`,
  },
  {
    id: 'ual',
    parent: 'torso',
    pin: [-64, -68],
    label: 'Left upper arm',
    shapes: (g) => `<rect x="-19" y="-18" width="38" height="128" rx="19" ${ink('var(--red)', g)}/>`,
  },
  {
    id: 'fal',
    parent: 'ual',
    pin: [0, 96],
    label: 'Left forearm',
    shapes: (g) =>
      `<rect x="-16" y="-14" width="32" height="118" rx="16" ${ink('var(--yellow)', g)}/>` +
      `<circle cx="0" cy="108" r="19" ${ink('var(--skin)', g)}/>`,
  },
  {
    id: 'head',
    parent: 'torso',
    pin: [0, -90],
    label: 'Head',
    shapes: (g) =>
      `<rect x="-13" y="-22" width="26" height="32" ${ink('var(--skin)', g)}/>` +
      `<ellipse cx="0" cy="-62" rx="44" ry="50" ${ink('var(--skin)', g)}/>` +
      (g
        ? ''
        : `<path d="M-43 -76 Q-34 -122 6 -114 Q42 -108 43 -74 Q10 -96 -43 -76Z" fill="var(--plum)"/>` +
          `<circle cx="-14" cy="-62" r="5" fill="var(--blue)"/><circle cx="17" cy="-62" r="5" fill="var(--blue)"/>` +
          `<path d="M-6 -36 L12 -39" stroke="var(--red)" stroke-width="5" stroke-linecap="round" fill="none"/>`),
  },
  {
    id: 'uar',
    parent: 'torso',
    pin: [64, -68],
    label: 'Right upper arm',
    shapes: (g) => `<rect x="-19" y="-18" width="38" height="128" rx="19" ${ink('var(--red)', g)}/>`,
  },
  {
    id: 'far',
    parent: 'uar',
    pin: [0, 96],
    label: 'Right forearm',
    shapes: (g) =>
      `<rect x="-16" y="-14" width="32" height="118" rx="16" ${ink('var(--yellow)', g)}/>` +
      `<circle cx="0" cy="108" r="19" ${ink('var(--skin)', g)}/>`,
  },
];

const TORSO_SHAPES = (g: boolean) =>
  `<rect x="-58" y="-96" width="116" height="186" rx="26" ${ink('var(--blue)', g)}/>` +
  (g
    ? ''
    : `<rect x="-58" y="54" width="116" height="22" fill="var(--plum)"/>` +
      [-44, -6, 30].map((y) => `<circle cx="0" cy="${y}" r="6.5" fill="var(--paper)"/>`).join(''));

const PIN = `<circle class="pin" r="5.5" fill="var(--paper)" stroke="var(--blue)" stroke-width="3"/>`;

interface Puppet {
  root: SVGGElement;
  set(pose: Pose): void;
  group(id: PartId): SVGGElement;
}

function el<K extends keyof SVGElementTagNameMap>(name: K, attrs: Record<string, string> = {}) {
  const node = document.createElementNS(NS, name);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}

/** Builds one puppet. `live` adds pins and makes the parts focusable; `ghost` prints it in red only. */
function buildPuppet(opts: { ghost?: boolean; live?: boolean } = {}): Puppet {
  const ghost = !!opts.ghost;
  const groups = {} as Record<PartId, SVGGElement>;
  const root = el('g', { class: 'puppet' });
  const torso = el('g', { class: 'part', 'data-part': 'torso' });
  root.append(torso);
  groups.torso = torso;

  // Legs go behind the body, the head and arms in front of it.
  const behind: PartDef[] = PARTS.filter((p) => p.id.startsWith('th'));
  const front: PartDef[] = PARTS.filter((p) => !p.parent || (p.parent === 'torso' && !p.id.startsWith('th')));

  const add = (def: PartDef) => {
    const g = el('g', { class: 'part', 'data-part': def.id });
    g.innerHTML = def.shapes(ghost) + (opts.live ? PIN : '');
    groups[def.id] = g;
    groups[def.parent!].append(g);
    for (const child of PARTS.filter((p) => p.parent === def.id)) add(child);
  };

  for (const def of behind) add(def);
  const body = el('g', { class: 'body' });
  body.innerHTML = TORSO_SHAPES(ghost);
  torso.append(body);
  for (const def of front) add(def);

  if (opts.live) {
    for (const def of PARTS) {
      const g = groups[def.id];
      g.setAttribute('tabindex', '0');
      g.setAttribute('role', 'slider');
      g.setAttribute('aria-label', `${def.label}, angle`);
      g.setAttribute('aria-valuemin', '-180');
      g.setAttribute('aria-valuemax', '180');
    }
    body.setAttribute('tabindex', '0');
    body.setAttribute('role', 'button');
    body.setAttribute('aria-label', 'Body. Arrow keys move the puppet.');
  }

  return {
    root,
    group: (id) => groups[id],
    set(pose) {
      torso.setAttribute('transform', `translate(${pose.x} ${pose.y}) rotate(${pose.torso})`);
      for (const def of PARTS) {
        groups[def.id].setAttribute('transform', `translate(${def.pin[0]} ${def.pin[1]}) rotate(${pose[def.id]})`);
        if (opts.live) groups[def.id].setAttribute('aria-valuenow', String(Math.round(pose[def.id])));
      }
    },
  };
}

// On a narrow screen the stage is as wide as the page, so the walk starts further in.
const NARROW = matchMedia('(max-width: 56rem)').matches;

function walkFrame(i: number, n: number): Pose {
  const t = (i / n) * Math.PI * 2;
  const s = Math.sin(t);
  return {
    x: NARROW ? 250 + i * 20 : 20 + i * 12,
    y: 262 - Math.abs(Math.cos(t)) * 7,
    torso: 3,
    head: -4 + s * 2,
    thl: 26 * s,
    shl: 14 + 14 * Math.cos(t - 0.9),
    thr: -26 * s,
    shr: 14 - 14 * Math.cos(t - 0.9),
    ual: -24 * s,
    fal: -22 - 8 * s,
    uar: 24 * s,
    far: -22 + 8 * s,
  };
}

const norm = (a: number) => ((((a + 180) % 360) + 360) % 360) - 180;

export function initStage(host: HTMLElement) {
  const svg = host.querySelector<SVGSVGElement>('.stage')!;
  const layer = svg.querySelector<SVGGElement>('[data-layer]')!;
  const cells = host.querySelector<HTMLElement>('[data-cells]')!;
  const playBtn = host.querySelector<HTMLButtonElement>('[data-play]')!;
  const onionBtn = host.querySelector<HTMLButtonElement>('[data-onion]')!;
  const captureBtn = host.querySelector<HTMLButtonElement>('[data-capture]')!;
  const clearBtn = host.querySelector<HTMLButtonElement>('[data-clear]')!;
  const status = host.querySelector<HTMLElement>('[data-status]')!;
  const hint = host.querySelector<HTMLElement>('[data-hint]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ghosts = [buildPuppet({ ghost: true }), buildPuppet({ ghost: true })];
  ghosts[0].root.setAttribute('opacity', '0.38');
  ghosts[1].root.setAttribute('opacity', '0.8');
  const live = buildPuppet({ live: true });
  for (const g of ghosts) {
    g.root.classList.add('ink');
    layer.append(g.root);
  }
  live.root.style.isolation = 'isolate'; // its inks mix with each other, not with the ghosts under it
  layer.append(live.root);

  const seed = () => Array.from({ length: 8 }, (_, i) => walkFrame(i, 8));
  let frames: Pose[] = seed();
  let pose: Pose = { ...frames[frames.length - 1] };
  let onion = true;
  let playing = false;
  let timer = 0;
  let cursor = 0;

  const same = (a: Pose, b: Pose) => JSON.stringify(a) === JSON.stringify(b);

  // The red plate: the two frames before the one on show, the nearer one printed stronger.
  const draw = () => {
    live.set(pose);
    let before: Pose[];
    if (playing) {
      const at = (cursor - 1 + frames.length) % frames.length;
      before = frames.length > 2 ? [2, 1].map((k) => frames[(at - k + frames.length) % frames.length]) : [];
    } else {
      before = frames.filter((f) => !same(f, pose)).slice(-2);
    }
    ghosts.forEach((g, i) => {
      const f = before[before.length - 2 + i];
      const show = onion && !!f;
      g.root.style.display = show ? '' : 'none';
      if (show) g.set(f);
    });
  };

  const drawCells = () => {
    cells.replaceChildren();
    for (let i = 0; i < MAX_FRAMES; i++) {
      const li = document.createElement('li');
      li.className = 'cell' + (frames[i] ? '' : ' cell--empty');
      if (frames[i]) {
        const thumb = el('svg', { viewBox: `${frames[i].x - 330} 30 660 578`, 'aria-hidden': 'true' });
        const p = buildPuppet();
        p.set(frames[i]);
        thumb.append(p.root);
        const n = document.createElement('span');
        n.className = 'cell__n';
        n.textContent = String(i + 1);
        li.append(thumb, n);
      }
      cells.append(li);
    }
  };

  const mark = (i: number) => {
    cells.querySelectorAll('.cell').forEach((c, k) => c.classList.toggle('is-on', k === i));
  };

  const stop = () => {
    if (!playing) return;
    playing = false;
    clearInterval(timer);
    playBtn.setAttribute('aria-pressed', 'false');
    playBtn.classList.remove('is-playing');
    playBtn.querySelector('[data-label]')!.textContent = 'Play';
    mark(-1);
    pose = { ...frames[frames.length - 1] };
    draw();
  };

  const play = () => {
    if (playing || frames.length < 2) return;
    playing = true;
    cursor = 0;
    playBtn.setAttribute('aria-pressed', 'true');
    playBtn.classList.add('is-playing');
    playBtn.querySelector('[data-label]')!.textContent = 'Stop';
    const tick = () => {
      pose = { ...frames[cursor] };
      mark(cursor);
      cursor = (cursor + 1) % frames.length;
      draw();
    };
    tick();
    timer = window.setInterval(tick, 1000 / FPS);
  };

  const touched = () => {
    stop();
    hint?.remove();
  };

  const capture = () => {
    touched();
    frames.push({ ...pose });
    if (frames.length > MAX_FRAMES) frames.shift();
    drawCells();
    draw();
    status.textContent = `Frame ${frames.length} captured.`;
    if (!reduced) {
      svg.classList.remove('is-flash');
      void svg.getBoundingClientRect();
      svg.classList.add('is-flash');
    }
  };

  // --- pointer: drag a part to turn it around its pin, drag the body to move the puppet
  let drag: null | { id: PartId | 'body'; a0: number; start: number; px: number; py: number; x: number; y: number } = null;

  const toSvg = (e: PointerEvent) => {
    const m = svg.getScreenCTM()!.inverse();
    return new DOMPoint(e.clientX, e.clientY).matrixTransform(m);
  };

  svg.addEventListener('pointerdown', (e) => {
    const target = (e.target as Element).closest<SVGGElement>('.body, .part');
    if (!target || !live.root.contains(target)) return;
    e.preventDefault();
    touched();
    const isBody = target.classList.contains('body') || target.dataset.part === 'torso';
    const id = isBody ? 'body' : (target.dataset.part as PartId);
    const g = isBody ? live.group('torso') : live.group(id as PartId);
    const ctm = g.getScreenCTM()!;
    const pinX = ctm.e;
    const pinY = ctm.f;
    drag = {
      id,
      a0: Math.atan2(e.clientY - pinY, e.clientX - pinX),
      start: isBody ? 0 : pose[id as PartId],
      px: pinX,
      py: pinY,
      x: pose.x - toSvg(e).x,
      y: pose.y - toSvg(e).y,
    };
    svg.setPointerCapture(e.pointerId);
  });

  svg.addEventListener('pointermove', (e) => {
    if (!drag) return;
    if (drag.id === 'body') {
      const p = toSvg(e);
      pose.x = Math.min(700, Math.max(-60, p.x + drag.x));
      pose.y = Math.min(330, Math.max(210, p.y + drag.y));
    } else {
      const a = Math.atan2(e.clientY - drag.py, e.clientX - drag.px);
      pose[drag.id] = norm(drag.start + ((a - drag.a0) * 180) / Math.PI);
    }
    draw();
  });

  const end = () => {
    drag = null;
  };
  svg.addEventListener('pointerup', end);
  svg.addEventListener('pointercancel', end);

  // --- keyboard: arrows turn the focused part or move the body, Enter captures
  svg.addEventListener('keydown', (e) => {
    const target = (e.target as Element).closest<SVGGElement>('.body, .part');
    if (!target) return;
    const stepBy = e.shiftKey ? 15 : 5;
    const dir = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
    if (e.key === 'Enter') {
      e.preventDefault();
      capture();
      return;
    }
    if (!dir) return;
    e.preventDefault();
    touched();
    if (target.classList.contains('body')) {
      pose.x = Math.min(700, Math.max(-60, pose.x + dir[0] * stepBy * 2));
      pose.y = Math.min(330, Math.max(210, pose.y + dir[1] * stepBy * 2));
    } else {
      const id = target.dataset.part as PartId;
      pose[id] = norm(pose[id] + (dir[0] || dir[1]) * stepBy);
    }
    draw();
  });

  playBtn.addEventListener('click', () => {
    hint?.remove();
    playing ? stop() : play();
  });
  onionBtn.addEventListener('click', () => {
    onion = !onion;
    onionBtn.setAttribute('aria-pressed', String(onion));
    draw();
  });
  captureBtn.addEventListener('click', capture);
  clearBtn.addEventListener('click', () => {
    touched();
    frames = [{ ...pose }];
    drawCells();
    draw();
    status.textContent = 'Frames cleared. This pose is frame 1.';
  });

  drawCells();
  draw();
  if (!reduced) play();
}

for (const host of document.querySelectorAll<HTMLElement>('[data-stage]')) initStage(host);

// Still puppets elsewhere on the page: a group with a pose in data-pose gets the same paper parts, unposable.
for (const g of document.querySelectorAll<SVGGElement>('g[data-pose]')) {
  const still = buildPuppet();
  still.set(JSON.parse(g.dataset.pose!) as Pose);
  g.append(still.root);
}
