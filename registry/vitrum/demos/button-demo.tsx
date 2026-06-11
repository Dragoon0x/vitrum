"use client";

import { Button } from "@/registry/vitrum/ui/button";

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>Glass</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="film">Film</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}
