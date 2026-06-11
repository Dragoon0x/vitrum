"use client";

import { Textarea } from "@/registry/vitrum/ui/textarea";

export function TextareaDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <label htmlFor="demo-message" className="text-sm font-medium">
        Message
      </label>
      <Textarea id="demo-message" placeholder="Say something nice…" />
    </div>
  );
}
