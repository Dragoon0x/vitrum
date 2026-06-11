"use client";

import { Glass } from "@/registry/vitrum/ui/glass";

export function GlassDemo() {
  return (
    <div className="grid w-full max-w-md grid-cols-2 gap-4">
      {(["film", "pane", "slab", "veil"] as const).map((material) => (
        <Glass
          key={material}
          material={material}
          sheen
          className="flex h-28 flex-col justify-end p-4 shadow-glass-md"
        >
          <span className="text-sm font-medium capitalize">{material}</span>
          <span className="text-xs text-muted-foreground">
            {material === "veil" ? "frost only" : "refracts"}
          </span>
        </Glass>
      ))}
    </div>
  );
}
