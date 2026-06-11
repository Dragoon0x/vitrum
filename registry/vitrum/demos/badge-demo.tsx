"use client";

import { Badge } from "@/registry/vitrum/ui/badge";

export function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <Badge>Neutral</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="success">Stable</Badge>
      <Badge variant="warning">Beta</Badge>
      <Badge variant="destructive">Deprecated</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}
