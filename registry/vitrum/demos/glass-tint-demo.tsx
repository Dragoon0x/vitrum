"use client";

import { Glass } from "@/registry/vitrum/ui/glass";

export function GlassTintDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Glass material="pane" tint="neutral" className="rounded-pill px-6 py-3 text-sm">
        Neutral
      </Glass>
      <Glass material="pane" tint="accent" className="rounded-pill px-6 py-3 text-sm">
        Accent
      </Glass>
      <Glass
        material="pane"
        className="rounded-pill px-6 py-3 text-sm [--glass-tint-a:0.4] [--glass-tint-c:var(--success)]"
      >
        Custom
      </Glass>
    </div>
  );
}
