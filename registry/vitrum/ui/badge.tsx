import { Slot as SlotPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-pill px-2.5 py-0.5 text-xs font-medium [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        neutral: "text-foreground",
        accent: "text-primary-foreground [--glass-tint-a:0.85]",
        success:
          "text-success-foreground [--glass-tint-a:0.85] [--glass-tint-c:var(--success)]",
        warning:
          "text-warning-foreground [--glass-tint-a:0.85] [--glass-tint-c:var(--warning)]",
        destructive:
          "text-destructive-foreground [--glass-tint-a:0.85] [--glass-tint-c:var(--destructive)]",
        outline: "border border-border bg-transparent text-foreground",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

export function Badge({
  className,
  variant = "neutral",
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? SlotPrimitive.Root : "span";
  const glassy = variant !== "outline";

  return (
    <Comp
      data-slot="badge"
      {...(glassy
        ? {
            "data-glass": "",
            "data-material": "film",
            "data-tint": variant === "accent" ? "accent" : "neutral",
          }
        : {})}
      className={cn(
        badgeVariants({ variant }),
        glassy && "vt-refract-pill-1",
        className,
      )}
      {...props}
    />
  );
}

export { badgeVariants };
