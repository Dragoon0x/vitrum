"use client";

import * as React from "react";
import { Toaster as SonnerToaster, toast } from "sonner";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Spinner } from "@/registry/vitrum/ui/progress";

type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

/**
 * Notification slabs. Mount <Toaster/> once, then call toast(…) from
 * anywhere. Stacked toasts collapse to three; the material is slab glass
 * with a raised tint so text stays legible over any backdrop.
 */
function Toaster({ toastOptions, ...props }: ToasterProps) {
  return (
    <SonnerToaster
      position="bottom-right"
      visibleToasts={3}
      gap={10}
      icons={{
        success: <CircleCheckIcon className="size-4 text-success" />,
        info: <InfoIcon className="size-4 text-primary" />,
        warning: <TriangleAlertIcon className="size-4 text-warning" />,
        error: <CircleAlertIcon className="size-4 text-destructive" />,
        loading: <Spinner className="size-4" />,
      }}
      toastOptions={{
        unstyled: true,
        ...toastOptions,
        classNames: {
          toast: cn(
            "vt-toast group/toast flex w-89 max-w-[calc(100vw-2rem)] items-center gap-3 rounded-pane p-4 text-sm text-foreground shadow-glass-lg",
          ),
          content: "flex min-w-0 flex-1 flex-col gap-0.5",
          title: "font-medium leading-snug",
          description: "text-muted-foreground",
          icon: "flex size-4 shrink-0 items-center justify-center",
          actionButton:
            "vt-ring inline-flex h-7 shrink-0 items-center justify-center rounded-pill bg-primary px-3 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          cancelButton:
            "vt-ring inline-flex h-7 shrink-0 items-center justify-center rounded-pill px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent/70 hover:text-foreground",
          closeButton:
            "vt-ring absolute -top-1.5 -left-1.5 rounded-full border border-border bg-surface p-1 text-muted-foreground transition-colors hover:text-foreground",
          ...toastOptions?.classNames,
        },
      }}
      {...props}
    />
  );
}

export { Toaster, toast };
