"use client";

import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { CheckIcon, MinusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "vt-well vt-ring peer flex size-5 shrink-0 items-center justify-center rounded-[0.4rem] transition-[background-color,box-shadow] duration-200",
        "data-[state=checked]:bg-primary data-[state=checked]:shadow-[inset_0_1px_0_oklch(1_0_0/0.35),0_2px_8px_-2px_var(--primary)] data-[state=indeterminate]:bg-primary",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:outline-2 aria-invalid:outline-destructive/70",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-primary-foreground transition-none [&_svg]:size-3.5 [&_svg]:stroke-[3]"
      >
        {props.checked === "indeterminate" ? <MinusIcon /> : <CheckIcon />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
