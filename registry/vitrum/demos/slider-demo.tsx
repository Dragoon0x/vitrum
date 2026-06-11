"use client";

import { Slider } from "@/registry/vitrum/ui/slider";

export function SliderDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <Slider defaultValue={[40]} aria-label="Volume" />
      <Slider defaultValue={[25, 70]} aria-label="Range" />
    </div>
  );
}
