"use client";

import { Input } from "@/registry/vitrum/ui/input";

export function InputDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <label htmlFor="demo-email" className="text-sm font-medium">
        Email
      </label>
      <Input id="demo-email" type="email" placeholder="you@studio.glass" />
    </div>
  );
}
