"use client";

import { Checkbox } from "@/registry/vitrum/ui/checkbox";

export function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-3">
      <label className="flex items-center gap-2.5 text-sm">
        <Checkbox defaultChecked /> Accept terms and conditions
      </label>
      <label className="flex items-center gap-2.5 text-sm">
        <Checkbox /> Subscribe to release notes
      </label>
      <label className="flex items-center gap-2.5 text-sm text-muted-foreground">
        <Checkbox disabled /> Disabled option
      </label>
    </div>
  );
}
