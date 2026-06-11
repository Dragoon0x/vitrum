"use client";

import { Button } from "@/registry/vitrum/ui/button";
import { Input } from "@/registry/vitrum/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/vitrum/ui/popover";

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="film">Dimensions</Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-64 flex-col gap-3">
        <p className="text-sm font-medium">Dimensions</p>
        {["Width", "Height"].map((label) => (
          <div key={label} className="grid grid-cols-2 items-center gap-3">
            <label htmlFor={`dim-${label}`} className="text-sm text-muted-foreground">
              {label}
            </label>
            <Input id={`dim-${label}`} defaultValue="100%" className="h-8" />
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
