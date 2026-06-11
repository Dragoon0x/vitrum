"use client";

import * as React from "react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "vt-well vt-ring flex aspect-square size-5 shrink-0 items-center justify-center rounded-full outline-none transition-[background-color,box-shadow] duration-200",
        "data-[state=checked]:bg-primary data-[state=checked]:shadow-[inset_0_1px_0_oklch(1_0_0/0.35),0_2px_8px_-2px_var(--primary)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:outline-2 aria-invalid:outline-destructive/70",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <span className="block size-2 rounded-full bg-primary-foreground shadow-[0_1px_2px_oklch(0_0_0/0.3)]" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
