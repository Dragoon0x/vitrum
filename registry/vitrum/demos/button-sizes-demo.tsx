"use client";

import { ArrowRightIcon, PlusIcon } from "lucide-react";

import { Button } from "@/registry/vitrum/ui/button";

export function ButtonSizesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Add">
        <PlusIcon />
      </Button>
      <Button variant="accent" size="lg">
        Continue <ArrowRightIcon />
      </Button>
    </div>
  );
}
