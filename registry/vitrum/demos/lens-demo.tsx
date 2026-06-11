"use client";

import { Lens } from "@/registry/vitrum/ui/lens";

export function LensDemo() {
  return (
    <div className="relative w-full max-w-md cursor-none overflow-clip rounded-pane border border-border bg-gradient-to-br from-aurora-1/30 via-background to-aurora-3/25 p-10">
      <p className="font-display text-2xl font-bold tracking-tight">
        Move the pointer across this panel — the lens magnifies whatever
        passes beneath it.
      </p>
      <p className="mt-3 text-sm text-muted-foreground">
        True optical magnification in the refract engine; a soft disc of
        glass elsewhere. Hidden on touch and reduced motion.
      </p>
      <Lens size={140} />
    </div>
  );
}
