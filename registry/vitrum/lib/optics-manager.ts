/**
 * Exact-optics manager.
 *
 * Watches the document for glass surfaces and, while the refract engine
 * is active, swaps their preset refraction for a filter baked to their
 * exact geometry. Elements that share quantized geometry share one
 * filter; baking happens in idle slices; everything reverts cleanly
 * when the engine changes.
 *
 * Pure DOM module — no React. <GlassWatcher/> drives start/stop.
 */

import {
  GLASS_ENGINE_ATTR,
  getGlassEngine,
} from "@/registry/vitrum/lib/glass-engine";
import {
  bakeDisplacementMap,
  buildExactFilter,
  opticsKey,
  OPTICS_DEFAULTS,
  type OpticsParams,
} from "@/registry/vitrum/lib/glass-optics";

const DEFS_ID = "vt-optics-defs";
const CACHE_LIMIT = 48;
const BAKES_PER_SLICE = 4;

interface FilterEntry {
  id: string;
  refs: Set<Element>;
  node: SVGFilterElement | null;
}

interface MaterialOptics {
  depth: number;
  blur: number;
  aberration: number;
  specular: number;
  bevelRatio: number;
  bevelMin: number;
  bevelMax: number;
}

const MATERIAL_OPTICS: Record<string, MaterialOptics> = {
  film: { depth: 12, blur: 1.25, aberration: 0, specular: 0.14, bevelRatio: 0.4, bevelMin: 6, bevelMax: 16 },
  pane: { depth: 20, blur: 1.5, aberration: 0, specular: 0.18, bevelRatio: 0.38, bevelMin: 8, bevelMax: 26 },
  slab: { depth: 30, blur: 2, aberration: 0.35, specular: 0.28, bevelRatio: 0.34, bevelMin: 12, bevelMax: 40 },
};

let started = false;
let active = false;
let filterSeq = 0;

const cache = new Map<string, FilterEntry>();
const tracked = new Map<Element, string | null>();
const queue = new Set<Element>();

let defsHost: SVGSVGElement | null = null;
let resizeObserver: ResizeObserver | null = null;
let domObserver: MutationObserver | null = null;
let engineObserver: MutationObserver | null = null;
let flushHandle: number | null = null;

function ensureDefsHost(): SVGSVGElement {
  if (defsHost?.isConnected) return defsHost;
  const existing = document.getElementById(DEFS_ID);
  if (existing instanceof SVGSVGElement) {
    defsHost = existing;
    return existing;
  }
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.id = DEFS_ID;
  svg.setAttribute("aria-hidden", "true");
  svg.style.position = "absolute";
  svg.style.width = "0";
  svg.style.height = "0";
  svg.style.overflow = "hidden";
  document.body.appendChild(svg);
  defsHost = svg;
  return svg;
}

function readVar(style: CSSStyleDeclaration, name: string): number | null {
  const raw = style.getPropertyValue(name).trim();
  if (!raw) return null;
  const value = Number.parseFloat(raw);
  return Number.isFinite(value) ? value : null;
}

function eligible(el: Element): el is HTMLElement {
  if (!(el instanceof HTMLElement)) return false;
  if (!el.hasAttribute("data-glass")) return false;
  if (el.dataset.material === "veil") return false;
  // laminated (nested) glass never refracts
  if (el.parentElement?.closest("[data-glass]")) return false;
  return true;
}

function paramsFor(el: HTMLElement): OpticsParams | null {
  const rect = el.getBoundingClientRect();
  if (rect.width < 12 || rect.height < 12) return null;

  const style = getComputedStyle(el);
  const material = MATERIAL_OPTICS[el.dataset.material ?? "pane"] ?? MATERIAL_OPTICS.pane;

  const radiusRaw = Number.parseFloat(style.borderTopLeftRadius);
  const radius = Number.isFinite(radiusRaw)
    ? Math.min(radiusRaw, rect.width / 2, rect.height / 2)
    : Math.min(rect.width, rect.height) / 2;

  const short = Math.min(rect.width, rect.height);
  const bevel =
    readVar(style, "--glass-bevel") ??
    Math.min(material.bevelMax, Math.max(material.bevelMin, short * material.bevelRatio));

  return {
    width: rect.width,
    height: rect.height,
    radius,
    bevel,
    depth: readVar(style, "--glass-depth") ?? material.depth,
    curvature: readVar(style, "--glass-curve") ?? OPTICS_DEFAULTS.curvature,
    aberration: readVar(style, "--glass-chroma") ?? material.aberration,
    blur: readVar(style, "--glass-soften") ?? material.blur,
    saturate: OPTICS_DEFAULTS.saturate,
    specular: readVar(style, "--glass-spec") ?? material.specular,
    lightAngle: readVar(style, "--glass-light") ?? OPTICS_DEFAULTS.lightAngle,
  };
}

function acquireFilter(params: OpticsParams): FilterEntry {
  const key = opticsKey(params);
  const hit = cache.get(key);
  if (hit) return hit;

  const id = `vt-ox-${(filterSeq++).toString(36)}`;
  const { href } = bakeDisplacementMap(params);
  const host = ensureDefsHost();
  host.insertAdjacentHTML("beforeend", buildExactFilter(id, href, params));
  const node = host.lastElementChild as SVGFilterElement | null;

  const entry: FilterEntry = { id, refs: new Set(), node };
  cache.set(key, entry);
  evictIfNeeded();
  return entry;
}

function evictIfNeeded(): void {
  if (cache.size <= CACHE_LIMIT) return;
  for (const [key, entry] of cache) {
    if (cache.size <= CACHE_LIMIT) break;
    if (entry.refs.size === 0) {
      entry.node?.remove();
      cache.delete(key);
    }
  }
}

function releaseKey(el: Element, key: string | null): void {
  if (!key) return;
  const entry = cache.get(key);
  entry?.refs.delete(el);
}

function applyExact(el: HTMLElement): void {
  const params = paramsFor(el);
  if (!params) return;

  const key = opticsKey(params);
  const previous = tracked.get(el) ?? null;
  if (previous === key) return;

  const entry = acquireFilter(params);
  releaseKey(el, previous);
  entry.refs.add(el);
  tracked.set(el, key);
  el.style.setProperty("--glass-refract", `url(#${entry.id})`);
  el.dataset.vtOptics = "exact";
}

function clearExact(el: Element): void {
  releaseKey(el, tracked.get(el) ?? null);
  tracked.set(el, null);
  if (el instanceof HTMLElement) {
    el.style.removeProperty("--glass-refract");
    delete el.dataset.vtOptics;
  }
}

function scheduleFlush(): void {
  if (flushHandle !== null || !active) return;
  const run = () => {
    flushHandle = null;
    let budget = BAKES_PER_SLICE;
    for (const el of queue) {
      queue.delete(el);
      if (!el.isConnected) {
        clearExact(el);
        tracked.delete(el);
        continue;
      }
      if (!eligible(el)) continue;
      applyExact(el);
      if (--budget <= 0) break;
    }
    if (queue.size > 0) scheduleFlush();
  };
  flushHandle =
    typeof requestIdleCallback === "function"
      ? requestIdleCallback(run, { timeout: 120 })
      : (setTimeout(run, 32) as unknown as number);
}

function enqueue(el: Element): void {
  if (!eligible(el)) return;
  if (!tracked.has(el)) {
    tracked.set(el, null);
    resizeObserver?.observe(el);
  }
  queue.add(el);
  scheduleFlush();
}

function scan(root: ParentNode): void {
  if (root instanceof Element && root.hasAttribute("data-glass")) enqueue(root);
  root.querySelectorAll?.("[data-glass]").forEach(enqueue);
}

function activate(): void {
  if (active) return;
  active = true;

  resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) enqueue(entry.target);
  });

  domObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof Element) scan(node);
      });
      mutation.removedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        for (const el of tracked.keys()) {
          if (node === el || node.contains(el)) {
            clearExact(el);
            tracked.delete(el);
            queue.delete(el);
          }
        }
      });
    }
  });
  domObserver.observe(document.body, { childList: true, subtree: true });

  scan(document.body);
}

function deactivate(): void {
  if (!active) return;
  active = false;

  resizeObserver?.disconnect();
  resizeObserver = null;
  domObserver?.disconnect();
  domObserver = null;

  if (flushHandle !== null) {
    if (typeof cancelIdleCallback === "function") cancelIdleCallback(flushHandle);
    else clearTimeout(flushHandle);
    flushHandle = null;
  }

  queue.clear();
  for (const el of tracked.keys()) clearExact(el);
  tracked.clear();
}

/** Re-measure one element now (e.g. after changing optics variables). */
export function requestOpticsRefresh(el: Element | null): void {
  if (!active || !el) return;
  tracked.set(el, null); // force a re-key even if geometry is unchanged
  enqueue(el);
}

/** Start watching; safe to call more than once. */
export function startOpticsManager(): void {
  if (started || typeof document === "undefined") return;
  started = true;

  const sync = () => {
    if (getGlassEngine() === "refract") activate();
    else deactivate();
  };

  engineObserver = new MutationObserver(sync);
  engineObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: [GLASS_ENGINE_ATTR],
  });
  sync();
}

/** Stop watching and restore preset refraction everywhere. */
export function stopOpticsManager(): void {
  if (!started) return;
  started = false;
  engineObserver?.disconnect();
  engineObserver = null;
  deactivate();
}
