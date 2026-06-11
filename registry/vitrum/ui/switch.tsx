"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * The thumb is a disc of glass riding a recessed track. While held —
 * pointer or Space key — it swells into a magnifying capsule that
 * refracts the track beneath, then springs back into place.
 */
function Switch({
  className,
  onPointerDown,
  onKeyDown,
  onKeyUp,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  const [held, setHeld] = React.useState(false);

  React.useEffect(() => {
    if (!held) return;
    const end = () => setHeld(false);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    return () => {
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
  }, [held]);

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      onPointerDown={(event) => {
        setHeld(true);
        onPointerDown?.(event);
      }}
      onKeyDown={(event) => {
        if (event.key === " " && !event.repeat) setHeld(true);
        onKeyDown?.(event);
      }}
      onKeyUp={(event) => {
        if (event.key === " ") setHeld(false);
        onKeyUp?.(event);
      }}
      className={cn(
        "vt-well vt-ring peer inline-flex h-6 w-10 shrink-0 items-center rounded-pill transition-[background-color,box-shadow] duration-200",
        "data-[state=checked]:bg-primary data-[state=checked]:shadow-[inset_0_1px_2px_oklch(0_0_0/0.2)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        data-glass=""
        data-material="film"
        data-vt-optics-skip=""
        data-inflated={held ? "" : undefined}
        className={cn(
          "vt-liquify pointer-events-none block size-5 rounded-full shadow-glass-sm transition-[translate,scale] duration-200 ease-[var(--ease-spring)]",
          "translate-x-0.5 data-[state=checked]:translate-x-[calc(100%-0.125rem)]",
          "[--glass-tint-a:0.6] [--glass-tint-c:oklch(1_0_0)] [--vt-inflate:1.45]",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
