"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  "aria-label": ariaLabel,
  thumbLabels,
  onPointerDown,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & {
  /** Accessible names for each thumb (falls back to aria-label). */
  thumbLabels?: string[];
}) {
  const values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min],
    [value, defaultValue, min],
  );

  // While the pointer holds a thumb it swells into a magnifying capsule.
  // The grabbed thumb is whichever one holds focus (focus follows the
  // grab), so multi-thumb sliders inflate only the one being dragged.
  const [dragging, setDragging] = React.useState(false);
  const [activeThumb, setActiveThumb] = React.useState(-1);

  React.useEffect(() => {
    if (!dragging) return;
    const end = () => setDragging(false);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    return () => {
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
  }, [dragging]);

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      aria-label={ariaLabel}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      onPointerDown={(event) => {
        if (event.pointerType !== "touch" || event.isPrimary) setDragging(true);
        onPointerDown?.(event);
      }}
      className={cn(
        "relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "vt-well relative grow overflow-hidden rounded-pill",
          "data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2",
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "absolute bg-gradient-to-r from-primary/80 to-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full data-[orientation=vertical]:bg-gradient-to-t",
          )}
        />
      </SliderPrimitive.Track>
      {values.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          aria-label={
            thumbLabels?.[index] ??
            (values.length > 1 && ariaLabel
              ? `${ariaLabel} ${index + 1}`
              : ariaLabel)
          }
          data-slot="slider-thumb"
          data-glass=""
          data-material="film"
          data-vt-optics-skip=""
          data-inflated={dragging && activeThumb === index ? "" : undefined}
          onFocus={() => setActiveThumb(index)}
          className={cn(
            "vt-liquify vt-ring block size-5 shrink-0 rounded-full shadow-glass-sm transition-[box-shadow,scale] duration-300 ease-[var(--ease-spring)]",
            "hover:shadow-glass-md data-[inflated]:shadow-glass-md disabled:pointer-events-none",
            "[--glass-tint-a:0.65] [--glass-tint-c:oklch(1_0_0)] [--vt-inflate:1.7]",
          )}
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
