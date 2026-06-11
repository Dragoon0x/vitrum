"use client";

import { AuroraField } from "@/registry/vitrum/ui/aurora-field";
import { Glass } from "@/registry/vitrum/ui/glass";

export function AuroraFieldDemo() {
  return (
    <div className="relative grid h-56 w-full max-w-md place-items-center overflow-clip rounded-pane border border-border">
      <AuroraField />
      <Glass material="slab" sheen className="rounded-pane px-8 py-5 shadow-glass-md">
        <span className="text-sm">Light to refract</span>
      </Glass>
    </div>
  );
}
