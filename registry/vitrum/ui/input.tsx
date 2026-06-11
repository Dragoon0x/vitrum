import { cn } from "@/lib/utils";

/**
 * Fields are recessed, not raised: a well sunk into the surface rather
 * than a slab floating above it. Light enters from above, so the well
 * shades its top edge.
 */
export function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "vt-well vt-ring flex h-10 w-full min-w-0 rounded-field px-3.5 py-1 text-sm text-foreground transition-[box-shadow,background-color] duration-200 outline-none",
        "placeholder:text-muted-foreground selection:bg-primary/30",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:outline-2 aria-invalid:outline-destructive/70",
        className,
      )}
      {...props}
    />
  );
}
