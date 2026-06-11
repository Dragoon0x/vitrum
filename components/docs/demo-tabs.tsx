"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Client shell for a demo: Preview / Code tabs. Both panes arrive
 * pre-rendered from the server (the live demo and the highlighted
 * source), so this component only switches between them.
 */
export function DemoTabs({
  preview,
  code,
  tall = false,
}: {
  preview: React.ReactNode;
  code: React.ReactNode;
  tall?: boolean;
}) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview");

  return (
    <div data-slot="demo" className="flex flex-col gap-3">
      <div
        role="tablist"
        aria-label="Demo view"
        className="vt-well flex w-fit items-center gap-1 rounded-pill p-1"
      >
        {(["preview", "code"] as const).map((value) => (
          <button
            key={value}
            role="tab"
            type="button"
            aria-selected={tab === value}
            data-state={tab === value ? "active" : "inactive"}
            className={cn(
              "vt-ring-inset rounded-pill px-3.5 py-1 text-xs font-medium capitalize outline-none transition-colors duration-200",
              tab === value
                ? "bg-surface text-foreground shadow-glass-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
            onClick={() => setTab(value)}
          >
            {value}
          </button>
        ))}
      </div>

      <div hidden={tab !== "preview"}>
        <div
          className={cn(
            "vt-demo-scene relative flex w-full items-center justify-center overflow-clip rounded-pane border border-border px-6 py-10",
            tall ? "min-h-104" : "min-h-64",
          )}
        >
          {preview}
        </div>
      </div>
      <div hidden={tab !== "code"}>{code}</div>
    </div>
  );
}
