"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Glass } from "@/registry/vitrum/ui/glass";
import { Slider } from "@/registry/vitrum/ui/slider";

export function StudioTeaser() {
  const [blur, setBlur] = React.useState(18);
  const [alpha, setAlpha] = React.useState(0.16);
  const [radius, setRadius] = React.useState(24);

  return (
    <div className="grid items-center gap-8 lg:grid-cols-2">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2.5">
          <span className="flex items-baseline justify-between text-sm">
            Frost
            <span className="font-mono text-xs text-muted-foreground">
              {blur}px
            </span>
          </span>
          <Slider
            value={[blur]}
            min={0}
            max={48}
            onValueChange={([next]) => setBlur(next)}
            aria-label="Frost"
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <span className="flex items-baseline justify-between text-sm">
            Tint
            <span className="font-mono text-xs text-muted-foreground">
              {alpha.toFixed(2)}
            </span>
          </span>
          <Slider
            value={[alpha]}
            min={0}
            max={0.9}
            step={0.01}
            onValueChange={([next]) => setAlpha(next)}
            aria-label="Tint strength"
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <span className="flex items-baseline justify-between text-sm">
            Radius
            <span className="font-mono text-xs text-muted-foreground">
              {radius}px
            </span>
          </span>
          <Slider
            value={[radius]}
            min={0}
            max={44}
            onValueChange={([next]) => setRadius(next)}
            aria-label="Radius"
          />
        </div>
        <Link
          href="/studio"
          className="vt-ring mt-2 inline-flex w-fit items-center gap-2 rounded-pill px-5 py-2.5 text-sm font-medium text-primary outline-none transition-colors hover:bg-accent/60"
        >
          Open the full studio <ArrowRightIcon className="size-4" />
        </Link>
      </div>

      <div className="vt-scene-dusk flex min-h-72 items-center justify-center rounded-sheet border border-border p-8">
        <Glass
          material="pane"
          sheen
          style={
            {
              "--glass-blur": `${blur}px`,
              "--glass-tint-a": alpha,
              "--glass-radius": `${radius}px`,
            } as React.CSSProperties
          }
          className="flex h-44 w-72 max-w-full flex-col justify-between p-5 shadow-glass-lg"
        >
          <span className="text-sm font-medium">Your material</span>
          <span className="font-mono text-xs text-muted-foreground">
            {blur}px · {alpha.toFixed(2)} · {radius}px
          </span>
        </Glass>
      </div>
    </div>
  );
}
