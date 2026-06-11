"use client";

import * as React from "react";
import { Progress as ProgressPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "vt-well relative h-2 w-full overflow-hidden rounded-pill",
        className,
      )}
      value={value}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="size-full rounded-pill bg-gradient-to-r from-primary/80 to-primary transition-transform duration-500 ease-[var(--ease-out-soft)]"
        style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

interface ProgressRingProps extends React.ComponentProps<"svg"> {
  /** 0–100 */
  value: number;
  /** Outer diameter in px. */
  size?: number;
  /** Stroke thickness in px. */
  thickness?: number;
}

function ProgressRing({
  value,
  size = 48,
  thickness = 5,
  className,
  ...props
}: ProgressRingProps) {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <svg
      data-slot="progress-ring"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn("-rotate-90", className)}
      {...props}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--glass-well)"
        strokeWidth={thickness}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--primary)"
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - clamped / 100)}
        className="transition-[stroke-dashoffset] duration-500 ease-[var(--ease-out-soft)]"
      />
    </svg>
  );
}

function Spinner({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-block size-5 animate-[vt-spin_0.8s_linear_infinite] rounded-full border-2 border-foreground/15 border-t-primary motion-reduce:animate-[vt-spin_1.6s_linear_infinite]",
        className,
      )}
      {...props}
    />
  );
}

export { Progress, ProgressRing, Spinner };
