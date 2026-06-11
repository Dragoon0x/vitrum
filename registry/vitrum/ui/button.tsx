"use client";

import * as React from "react";
import { Slot as SlotPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { chainHandlers, useSheen } from "@/registry/vitrum/hooks/use-sheen";

const buttonVariants = cva(
  "vt-ring inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap font-medium transition-[transform,box-shadow,background-color,opacity] duration-200 ease-[var(--ease-out-soft)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        glass: "rounded-pill text-foreground shadow-glass-sm hover:shadow-glass-md",
        accent:
          "rounded-pill text-primary-foreground shadow-glass-sm hover:shadow-glass-md [--glass-tint-a:0.85] hover:[--glass-tint-a:0.92]",
        film: "rounded-pill text-foreground shadow-glass-sm hover:shadow-glass-md",
        destructive:
          "rounded-pill text-destructive-foreground shadow-glass-sm hover:shadow-glass-md [--glass-tint-a:0.82] [--glass-tint-c:var(--destructive)] hover:[--glass-tint-a:0.9]",
        ghost: "rounded-pill text-foreground hover:bg-accent/60",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 gap-1.5 px-3.5 text-xs",
        default: "h-10 px-5 text-sm",
        lg: "h-12 px-7 text-base",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "glass",
      size: "default",
    },
  },
);

const GLASS_MATERIAL: Partial<
  Record<NonNullable<VariantProps<typeof buttonVariants>["variant"]>, string>
> = {
  glass: "pane",
  accent: "pane",
  film: "film",
  destructive: "pane",
};

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant = "glass",
  size = "default",
  asChild = false,
  onPointerEnter,
  onPointerMove,
  onPointerLeave,
  ...props
}: ButtonProps) {
  const material = variant ? GLASS_MATERIAL[variant] : undefined;
  const sheenHandlers = useSheen(Boolean(material));
  const Comp = asChild ? SlotPrimitive.Root : "button";

  return (
    <Comp
      data-slot="button"
      {...(material
        ? {
            "data-glass": "",
            "data-material": material,
            "data-tint": variant === "accent" ? "accent" : "neutral",
          }
        : {})}
      className={cn(
        buttonVariants({ variant, size }),
        material && "vt-refract-pill-2",
        className,
      )}
      onPointerEnter={chainHandlers(sheenHandlers.onPointerEnter, onPointerEnter)}
      onPointerMove={chainHandlers(sheenHandlers.onPointerMove, onPointerMove)}
      onPointerLeave={chainHandlers(sheenHandlers.onPointerLeave, onPointerLeave)}
      {...props}
    />
  );
}

export { buttonVariants };
