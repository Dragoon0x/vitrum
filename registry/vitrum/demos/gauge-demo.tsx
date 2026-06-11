"use client";

import * as React from "react";

import { Gauge } from "@/registry/vitrum/ui/gauge";
import { Slider } from "@/registry/vitrum/ui/slider";

export function GaugeDemo() {
  const [value, setValue] = React.useState(64);

  return (
    <div className="flex flex-col items-center gap-8">
      <Gauge value={value} label="Reservoir" className="size-36" />
      <Slider
        value={[value]}
        onValueChange={([next]) => setValue(next)}
        aria-label="Set reservoir level"
        className="w-56"
      />
    </div>
  );
}
