"use client";

import * as React from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function CopyButton({
  value,
  className,
  ...props
}: React.ComponentProps<"button"> & { value: string }) {
  const [copied, setCopied] = React.useState(false);
  const timeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      className={cn(
        "vt-ring inline-flex size-7 shrink-0 items-center justify-center rounded-control text-muted-foreground transition-colors duration-200 hover:bg-accent/70 hover:text-foreground",
        className,
      )}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          if (timeout.current) clearTimeout(timeout.current);
          timeout.current = setTimeout(() => setCopied(false), 1600);
        } catch {
          // clipboard unavailable (permissions/insecure context) — no-op
        }
      }}
      {...props}
    >
      {copied ? (
        <CheckIcon className="size-3.5 text-success" />
      ) : (
        <CopyIcon className="size-3.5" />
      )}
    </button>
  );
}
