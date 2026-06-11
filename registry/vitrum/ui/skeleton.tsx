import { cn } from "@/lib/utils";

/**
 * Loading placeholder with a specular sweep — light gliding across the
 * surface, the way a reflection moves over tilted glass.
 */
export function Skeleton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn(
        "animate-[vt-shimmer_2.2s_var(--ease-out-soft)_infinite] rounded-control bg-muted/70 bg-[linear-gradient(105deg,transparent_38%,var(--glass-sheen)_50%,transparent_62%)] bg-[length:200%_100%] motion-reduce:animate-none",
        className,
      )}
      {...props}
    />
  );
}
