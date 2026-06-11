"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  GLASS_ENGINE_ATTR,
  getGlassEngine,
} from "@/registry/vitrum/lib/glass-engine";
import {
  allocateField,
  bakeDisplacementField,
  fieldToDataUri,
  OPTICS_DEFAULTS,
} from "@/registry/vitrum/lib/glass-optics";

/**
 * Scene refraction.
 *
 * backdrop-filter can only bend in one compositor family, but a plain
 * SVG filter on ordinary content works everywhere. A GlassScene owns a
 * patch of content (the backdrop) and any number of lenses above it;
 * while the frost engine is active it bakes one displacement map —
 * neutral everywhere, bending under each lens — and applies it to the
 * backdrop with a regular filter. Lens chrome stays a normal glass
 * surface whose frost blur samples the already-bent content beneath,
 * so the two effects compose.
 *
 * In the refract engine the scene goes inert (backdrop-filter already
 * bends); in the solid engine it stays inert for accessibility.
 */

interface LensOptics {
  depth: number;
  bevel: number;
  curvature: number;
  radius?: number;
  specular: number;
  lightAngle: number;
}

interface LensRecord {
  el: HTMLElement;
  optics: LensOptics;
}

const SCENE_CAP = 1024;

class SceneManager {
  private backdrop: HTMLElement | null = null;
  private lenses = new Map<HTMLElement, LensRecord>();
  private resizeObserver: ResizeObserver;
  private engineObserver: MutationObserver | null = null;
  private frame: number | null = null;
  private filterNode: SVGFilterElement | null = null;
  private defs: SVGSVGElement | null = null;
  private seq = 0;
  private destroyed = false;

  constructor() {
    this.resizeObserver = new ResizeObserver(() => this.schedule());
    if (typeof document !== "undefined") {
      this.engineObserver = new MutationObserver(() => this.schedule());
      this.engineObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: [GLASS_ENGINE_ATTR],
      });
    }
  }

  setBackdrop(el: HTMLElement | null): void {
    if (this.backdrop) this.resizeObserver.unobserve(this.backdrop);
    this.backdrop = el;
    if (el) this.resizeObserver.observe(el);
    this.schedule();
  }

  setLens(el: HTMLElement, optics: LensOptics): void {
    const known = this.lenses.has(el);
    this.lenses.set(el, { el, optics });
    if (!known) this.resizeObserver.observe(el);
    this.schedule();
  }

  removeLens(el: HTMLElement): void {
    if (this.lenses.delete(el)) {
      this.resizeObserver.unobserve(el);
      this.schedule();
    }
  }

  schedule(): void {
    if (this.destroyed || this.frame !== null) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = null;
      this.rebuild();
    });
  }

  destroy(): void {
    this.destroyed = true;
    if (this.frame !== null) cancelAnimationFrame(this.frame);
    this.resizeObserver.disconnect();
    this.engineObserver?.disconnect();
    this.clearFilter();
    this.defs?.remove();
  }

  private clearFilter(): void {
    if (this.backdrop) this.backdrop.style.removeProperty("filter");
    this.filterNode?.remove();
    this.filterNode = null;
  }

  private ensureDefs(): SVGSVGElement {
    if (this.defs?.isConnected) return this.defs;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("aria-hidden", "true");
    svg.style.position = "absolute";
    svg.style.width = "0";
    svg.style.height = "0";
    svg.style.overflow = "hidden";
    document.body.appendChild(svg);
    this.defs = svg;
    return svg;
  }

  private rebuild(): void {
    if (this.destroyed || !this.backdrop?.isConnected) return;

    if (getGlassEngine() !== "frost" || this.lenses.size === 0) {
      this.clearFilter();
      return;
    }

    const backRect = this.backdrop.getBoundingClientRect();
    if (backRect.width < 24 || backRect.height < 24) {
      this.clearFilter();
      return;
    }

    const scale = Math.min(1, SCENE_CAP / Math.max(backRect.width, backRect.height));
    const mapW = Math.max(8, Math.round(backRect.width * scale));
    const mapH = Math.max(8, Math.round(backRect.height * scale));

    // neutral field: no displacement, no glint
    const composite = allocateField(mapW, mapH);
    for (let i = 0; i < composite.length; i += 4) {
      composite[i] = 128;
      composite[i + 1] = 128;
      composite[i + 2] = 0;
      composite[i + 3] = 255;
    }

    let maxDepth = 0;
    for (const { optics } of this.lenses.values()) {
      maxDepth = Math.max(maxDepth, optics.depth);
    }
    if (maxDepth <= 0) {
      this.clearFilter();
      return;
    }

    let specular = 0;
    for (const { el, optics } of this.lenses.values()) {
      if (!el.isConnected) continue;
      const rect = el.getBoundingClientRect();
      const w = Math.round(rect.width * scale);
      const h = Math.round(rect.height * scale);
      if (w < 4 || h < 4) continue;

      const radius =
        optics.radius ??
        (() => {
          const target = el.querySelector("[data-glass]") ?? el;
          const parsed = Number.parseFloat(getComputedStyle(target).borderTopLeftRadius);
          return Number.isFinite(parsed) ? parsed : Math.min(rect.width, rect.height) / 2;
        })();

      const field = bakeDisplacementField(
        {
          radius: Math.min(radius, rect.width / 2, rect.height / 2),
          bevel: optics.bevel,
          curvature: optics.curvature,
          lightAngle: optics.lightAngle,
        },
        w,
        h,
        scale,
      );

      const ratio = optics.depth / maxDepth;
      const ox = Math.round((rect.left - backRect.left) * scale);
      const oy = Math.round((rect.top - backRect.top) * scale);
      specular = Math.max(specular, optics.specular);

      for (let y = 0; y < h; y++) {
        const ty = oy + y;
        if (ty < 0 || ty >= mapH) continue;
        for (let x = 0; x < w; x++) {
          const tx = ox + x;
          if (tx < 0 || tx >= mapW) continue;
          const s = (y * w + x) * 4;
          const d = (ty * mapW + tx) * 4;
          composite[d] = Math.round(128 + (field[s] - 128) * ratio);
          composite[d + 1] = Math.round(128 + (field[s + 1] - 128) * ratio);
          composite[d + 2] = field[s + 2];
        }
      }
    }

    const href = fieldToDataUri(composite, mapW, mapH);
    const id = `vt-scene-${(this.seq++).toString(36)}`;
    const glint =
      specular > 0.01
        ? `<feColorMatrix in="map" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 ${Math.round(specular * 100) / 100} 0 0" result="glint"/>` +
          `<feComposite in="glint" in2="bent" operator="over"/>`
        : `<feMerge><feMergeNode in="bent"/></feMerge>`;

    const markup =
      `<filter id="${id}" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="sRGB">` +
      `<feImage href="${href}" x="0%" y="0%" width="100%" height="100%" preserveAspectRatio="none" result="map"/>` +
      `<feDisplacementMap in="SourceGraphic" in2="map" scale="${Math.round(maxDepth * 100) / 100}" xChannelSelector="R" yChannelSelector="G" result="bent"/>` +
      glint +
      `</filter>`;

    const host = this.ensureDefs();
    host.insertAdjacentHTML("beforeend", markup);
    const fresh = host.lastElementChild as SVGFilterElement | null;

    this.backdrop.style.filter = `url(#${id})`;
    this.filterNode?.remove();
    this.filterNode = fresh;
  }
}

const SceneContext = React.createContext<SceneManager | null>(null);

function useSceneManager(): SceneManager | null {
  return React.useContext(SceneContext);
}

function GlassScene({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const [manager] = React.useState(() =>
    typeof window === "undefined" ? null : new SceneManager(),
  );

  React.useEffect(() => {
    return () => manager?.destroy();
  }, [manager]);

  return (
    <SceneContext.Provider value={manager}>
      <div
        data-slot="glass-scene"
        className={cn("relative", className)}
        {...props}
      >
        {children}
      </div>
    </SceneContext.Provider>
  );
}

function GlassSceneBackdrop({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const manager = useSceneManager();
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    manager?.setBackdrop(ref.current);
    return () => manager?.setBackdrop(null);
  }, [manager]);

  return (
    <div
      ref={ref}
      data-slot="glass-scene-backdrop"
      data-vt-scene-backdrop=""
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}

interface GlassSceneLensProps extends React.ComponentProps<"div"> {
  /** Maximum bend at the rim, px. */
  depth?: number;
  /** Bevel reach, px. */
  bevel?: number;
  /** Bevel profile exponent. */
  curvature?: number;
  /** Override the corner radius (defaults to the lens chrome's). */
  radius?: number;
  /** In-filter glint strength, 0..1. */
  specular?: number;
  lightAngle?: number;
}

function GlassSceneLens({
  className,
  children,
  depth = 26,
  bevel = 30,
  curvature = OPTICS_DEFAULTS.curvature,
  radius,
  specular = 0.26,
  lightAngle = OPTICS_DEFAULTS.lightAngle,
  ...props
}: GlassSceneLensProps) {
  const manager = useSceneManager();
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || !manager) return;
    manager.setLens(el, { depth, bevel, curvature, radius, specular, lightAngle });
    return () => manager.removeLens(el);
  }, [manager, depth, bevel, curvature, radius, specular, lightAngle]);

  return (
    <div
      ref={ref}
      data-slot="glass-scene-lens"
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}

export { GlassScene, GlassSceneBackdrop, GlassSceneLens };
