"use client";

import { Glass } from "@/registry/vitrum/ui/glass";
import {
  GlassScene,
  GlassSceneBackdrop,
  GlassSceneLens,
} from "@/registry/vitrum/ui/glass-scene";

export function GlassSceneDemo() {
  return (
    <GlassScene className="w-full max-w-md">
      <GlassSceneBackdrop className="flex flex-col gap-1 rounded-pane border border-border p-10 text-center">
        <p className="font-display text-4xl font-bold tracking-tight">
          content you own
        </p>
        <p className="font-display text-4xl font-bold tracking-tight text-muted-foreground">
          bends in any engine
        </p>
      </GlassSceneBackdrop>
      <GlassSceneLens
        depth={30}
        bevel={32}
        radius={28}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 motion-safe:animate-[vt-float_8s_ease-in-out_infinite_alternate]"
      >
        <Glass
          material="slab"
          className="h-32 w-64 rounded-[1.75rem] shadow-glass-lg [--glass-blur:8px]"
        />
      </GlassSceneLens>
    </GlassScene>
  );
}
