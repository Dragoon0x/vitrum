"use client";

import { Switch } from "@/registry/vitrum/ui/switch";

export function SwitchDemo() {
  return (
    <div className="flex flex-col gap-4">
      <label className="flex items-center gap-3 text-sm">
        <Switch defaultChecked /> Ambient drift
      </label>
      <label className="flex items-center gap-3 text-sm">
        <Switch /> Reduced transparency
      </label>
    </div>
  );
}
