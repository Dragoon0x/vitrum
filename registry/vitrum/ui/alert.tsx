import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-pane px-4 py-3.5 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5",
  {
    variants: {
      variant: {
        neutral: "text-foreground [&>svg]:text-muted-foreground",
        accent: "text-foreground [&>svg]:text-primary",
        success:
          "text-foreground [--glass-tint-a:0.22] [--glass-tint-c:var(--success)] [&>svg]:text-success",
        warning:
          "text-foreground [--glass-tint-a:0.22] [--glass-tint-c:var(--warning)] [&>svg]:text-warning",
        destructive:
          "text-foreground [--glass-tint-a:0.22] [--glass-tint-c:var(--destructive)] [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

function Alert({
  className,
  variant = "neutral",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role={variant === "destructive" ? "alert" : "status"}
      data-glass=""
      data-material="pane"
      data-tint={variant === "accent" ? "accent" : "neutral"}
      className={cn(
        "vt-refract-round-2 shadow-glass-sm",
        alertVariants({ variant }),
        className,
      )}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "col-start-2 grid justify-items-start gap-1 text-sm text-muted-foreground [&_p]:leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription, alertVariants };
