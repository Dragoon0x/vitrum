"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

export interface SegmentedControlOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps
  extends Omit<
    React.ComponentProps<typeof TabsPrimitive.Root>,
    "orientation" | "children"
  > {
  options: SegmentedControlOption[];
  size?: "sm" | "default";
}

/**
 * Equal-width segments in a recessed track, selected by a pane of glass
 * that slides under the labels and refracts them as it passes. The thumb
 * moves on transform alone.
 */
export function SegmentedControl({
  options,
  value,
  defaultValue,
  onValueChange,
  size = "default",
  className,
  ...props
}: SegmentedControlProps) {
  const [internal, setInternal] = React.useState(
    defaultValue ?? options[0]?.value,
  );
  const current = value ?? internal;
  const activeIndex = Math.max(
    0,
    options.findIndex((option) => option.value === current),
  );

  const handleChange = React.useCallback(
    (next: string) => {
      setInternal(next);
      onValueChange?.(next);
    },
    [onValueChange],
  );

  return (
    <TabsPrimitive.Root
      data-slot="segmented-control"
      value={current}
      onValueChange={handleChange}
      activationMode="automatic"
      className={cn("w-fit", className)}
      {...props}
    >
      <TabsPrimitive.List
        data-slot="segmented-control-list"
        className={cn(
          "vt-well relative grid auto-cols-fr grid-flow-col items-stretch rounded-pill p-1",
          size === "sm" ? "h-8" : "h-10",
        )}
        style={{ "--vt-segments": options.length } as React.CSSProperties}
      >
        <span
          aria-hidden="true"
          data-glass=""
          data-material="pane"
          className={cn(
            "vt-refract-pill-2 pointer-events-none absolute inset-y-1 left-1 rounded-pill shadow-glass-sm transition-transform duration-300 ease-[var(--ease-spring)]",
            "[--glass-tint-a:0.5] [--glass-tint-c:oklch(1_0_0)] dark:[--glass-tint-a:0.18]",
          )}
          style={{
            width: `calc((100% - 0.5rem) / ${options.length})`,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />
        {options.map((option) => (
          <TabsPrimitive.Trigger
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            data-slot="segmented-control-trigger"
            className={cn(
              "vt-ring-inset relative z-10 inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-pill px-4 text-muted-foreground outline-none transition-colors duration-200",
              size === "sm" ? "text-xs" : "text-sm",
              "hover:text-foreground data-[state=active]:font-medium data-[state=active]:text-foreground",
              "disabled:pointer-events-none disabled:opacity-50",
              "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            )}
          >
            {option.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
    </TabsPrimitive.Root>
  );
}
