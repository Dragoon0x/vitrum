"use client";

import { SegmentedControl } from "@/registry/vitrum/ui/segmented-control";

export function SegmentedControlDemo() {
  return (
    <SegmentedControl
      defaultValue="day"
      options={[
        { value: "day", label: "Day" },
        { value: "week", label: "Week" },
        { value: "month", label: "Month" },
        { value: "year", label: "Year" },
      ]}
    />
  );
}
