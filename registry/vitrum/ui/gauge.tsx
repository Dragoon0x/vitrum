"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface GaugeProps extends React.ComponentProps<"div"> {
  /** Current reading. */
  value: number;
  min?: number;
  max?: number;
  /** Accessible name for the meter. */
  label: string;
  /** Format the readout (defaults to a percentage). */
  format?: (value: number, pct: number) => React.ReactNode;
}

/**
 * A vessel of glass holding liquid light. The fill rises on a transform
 * (no layout work) and carries a bright meniscus line where it meets the
 * glass.
 */
export function Gauge({
  value,
  min = 0,
  max = 100,
  label,
  format,
  className,
  children,
  ...props
}: GaugeProps) {
  const ratio = max > min ? (value - min) / (max - min) : 0;
  const pct = Math.min(1, Math.max(0, ratio));

  return (
    <div
      data-slot="gauge"
      role="meter"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={Math.round(value)}
      aria-label={label}
      data-glass=""
      data-material="slab"
      className={cn(
        "vt-refract-round-3 relative size-32 overflow-clip rounded-pane shadow-glass-md",
        className,
      )}
      {...props}
    >
      <div
        data-slot="gauge-fill"
        aria-hidden="true"
        className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-spring)]"
        style={{ transform: `translateY(${(1 - pct) * 100}%)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/55 to-primary/35" />
        <div className="absolute inset-x-0 top-0 h-px bg-[oklch(1_0_0/0.65)] shadow-[0_0_8px_1px_oklch(1_0_0/0.4)]" />
        <div className="absolute inset-x-0 top-px h-3 bg-gradient-to-b from-[oklch(1_0_0/0.2)] to-transparent" />
      </div>
      <div
        data-slot="gauge-readout"
        className="relative z-10 flex size-full flex-col items-center justify-center gap-0.5"
      >
        {children ?? (
          <>
            <span className="font-display text-2xl font-semibold tabular-nums">
              {format ? format(value, pct) : `${Math.round(pct * 100)}%`}
            </span>
            <span className="text-xs text-muted-foreground">{label}</span>
          </>
        )}
      </div>
    </div>
  );
}
