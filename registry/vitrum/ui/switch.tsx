"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * The thumb is a disc of glass riding a recessed track — it refracts
 * whatever passes beneath it as it slides.
 */
function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
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
        className={cn(
          "vt-refract-circle-2 pointer-events-none block size-5 rounded-full shadow-glass-sm transition-transform duration-200 ease-[var(--ease-spring)]",
          "translate-x-0.5 data-[state=checked]:translate-x-[calc(100%-0.125rem)]",
          "[--glass-tint-a:0.6] [--glass-tint-c:oklch(1_0_0)]",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
