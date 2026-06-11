import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "vt-well vt-ring flex field-sizing-content min-h-20 w-full rounded-field px-3.5 py-2.5 text-sm text-foreground transition-[box-shadow,background-color] duration-200",
        "placeholder:text-muted-foreground selection:bg-primary/30",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:outline-2 aria-invalid:outline-destructive/70",
        className,
      )}
      {...props}
    />
  );
}
