"use client";

import { RadioGroup, RadioGroupItem } from "@/registry/vitrum/ui/radio-group";

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <label className="flex items-center gap-2.5 text-sm">
        <RadioGroupItem value="compact" /> Compact
      </label>
      <label className="flex items-center gap-2.5 text-sm">
        <RadioGroupItem value="comfortable" /> Comfortable
      </label>
      <label className="flex items-center gap-2.5 text-sm">
        <RadioGroupItem value="spacious" /> Spacious
      </label>
    </RadioGroup>
  );
}
