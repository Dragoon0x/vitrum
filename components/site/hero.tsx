"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { installCommand } from "@/lib/site";
import { useGlassEngine } from "@/registry/vitrum/hooks/use-glass-engine";
import { Glass } from "@/registry/vitrum/ui/glass";
import {
  GlassScene,
  GlassSceneBackdrop,
  GlassSceneLens,
} from "@/registry/vitrum/ui/glass-scene";

import { CopyButton } from "@/components/docs/copy-button";

/**
 * The hero is the proof: an oversized headline sits behind a floating
 * slab of glass that visibly bends it. Pointer parallax moves slab and
 * type in opposition; an ambient float keeps the glass alive at rest.
 */
export function Hero() {
  const engine = useGlassEngine();
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const frame = React.useRef(0);

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const section = sectionRef.current;
    if (!section || event.pointerType !== "mouse") return;
    const rect = section.getBoundingClientRect();
    const hx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const hy = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    if (!frame.current) {
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        section.style.setProperty("--hx", hx.toFixed(3));
        section.style.setProperty("--hy", hy.toFixed(3));
      });
    }
  };

  const command = installCommand("button");

  return (
    <section
      ref={sectionRef}
      aria-label="Vitrum"
      onPointerMove={onPointerMove}
      className="relative flex min-h-svh flex-col items-center justify-center overflow-clip px-6"
    >
      <div className="relative flex w-full max-w-5xl flex-col items-center">
        {/* headline block — the slab lives here and refracts only the type.
            The scene bridge bends the type in engines without backdrop
            displacement; in the refract engine it stays inert. */}
        <GlassScene className="relative">
          <GlassSceneBackdrop>
            <h1
              className="text-center font-display text-[clamp(4rem,13vw,11rem)] leading-[0.92] font-bold tracking-tight text-balance motion-safe:[transform:translate(calc(var(--hx,0)*-8px),calc(var(--hy,0)*-6px))]"
              style={{ transitionDuration: "0s" }}
            >
              Designed
              <br />
              in&nbsp;glass.
            </h1>
          </GlassSceneBackdrop>

          <GlassSceneLens
            depth={26}
            bevel={36}
            radius={36}
            className="pointer-events-none absolute top-[62%] left-1/2 hidden -translate-x-1/2 -translate-y-1/2 motion-safe:animate-[vt-float_9s_ease-in-out_infinite_alternate] sm:block"
          >
            <Glass
              material="slab"
              className="h-40 w-[32rem] max-w-[78vw] shadow-glass-lg [--glass-blur:10px] motion-safe:[transform:translate(calc(var(--hx,0)*14px),calc(var(--hy,0)*10px))_rotate(-4deg)]"
              style={{ "--glass-radius": "2.25rem" } as React.CSSProperties}
            />
          </GlassSceneLens>
        </GlassScene>

        <p className="mt-8 max-w-xl text-center text-base leading-relaxed text-pretty text-muted-foreground sm:mt-10">
          Thirty React components cast in a refractive material — light
          bends at every edge, frost where the compositor says no, and
          solid surfaces the moment someone asks for them.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/docs"
            className="vt-ring inline-flex items-center gap-2 rounded-pill bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow-accent transition-transform hover:scale-[1.03]"
          >
            Browse the components <ArrowRightIcon className="size-4" />
          </Link>
          <Link
            href="/studio"
            className="vt-ring rounded-pill px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent/60"
          >
            Open the studio
          </Link>
        </div>

        <Glass
          material="film"
          className="mt-10 flex max-w-full items-center gap-2 rounded-pill py-2 pr-2 pl-4 shadow-glass-sm"
        >
          <code className="truncate font-mono text-xs text-muted-foreground">
            {command}
          </code>
          <CopyButton value={command} />
        </Glass>

        <p className="mt-6 font-mono text-[0.6875rem] tracking-wide text-muted-foreground">
          {engine} engine active
        </p>
      </div>
    </section>
  );
}
