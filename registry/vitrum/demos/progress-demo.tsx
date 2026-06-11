"use client";

import * as React from "react";

import {
  Progress,
  ProgressRing,
  Spinner,
} from "@/registry/vitrum/ui/progress";

export function ProgressDemo() {
  const [value, setValue] = React.useState(15);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setValue((current) => (current >= 95 ? 15 : current + 20));
    }, 1600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-8">
      <Progress value={value} aria-label="Upload progress" />
      <div className="flex items-center gap-8">
        <ProgressRing value={value} />
        <Spinner />
      </div>
    </div>
  );
}
