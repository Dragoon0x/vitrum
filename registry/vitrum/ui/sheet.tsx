"use client";

import * as React from "react";
import { Dialog as SheetPrimitive } from "radix-ui";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Sheet(props: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger(
  props: React.ComponentProps<typeof SheetPrimitive.Trigger>,
) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose(
  props: React.ComponentProps<typeof SheetPrimitive.Close>,
) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal(
  props: React.ComponentProps<typeof SheetPrimitive.Portal>,
) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn("vt-scrim fixed inset-0 z-50 bg-[var(--scrim)]", className)}
      {...props}
    />
  );
}

const SIDE_CLASSES = {
  right:
    "vt-sheet-right inset-y-2 right-2 h-auto w-3/4 max-w-sm rounded-sheet",
  left: "vt-sheet-left inset-y-2 left-2 h-auto w-3/4 max-w-sm rounded-sheet",
  top: "vt-sheet-top inset-x-2 top-2 h-auto max-h-[80svh] rounded-sheet",
  bottom:
    "vt-sheet-bottom inset-x-2 bottom-2 h-auto max-h-[80svh] rounded-sheet",
} as const;

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: keyof typeof SIDE_CLASSES;
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        data-glass=""
        data-material="veil"
        className={cn(
          "fixed z-50 flex flex-col gap-4 overflow-y-auto p-6 text-foreground shadow-glass-lg",
          SIDE_CLASSES[side],
          className,
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="vt-ring absolute top-4 right-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent/70 hover:text-foreground">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "font-display text-lg font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
