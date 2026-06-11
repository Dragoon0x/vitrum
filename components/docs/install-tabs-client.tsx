"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { CopyButton } from "@/components/docs/copy-button";

const PACKAGE_MANAGERS = ["pnpm", "npm", "bun"] as const;

type PackageManager = (typeof PACKAGE_MANAGERS)[number];

const RUNNERS: Record<PackageManager, string> = {
  pnpm: "pnpm dlx",
  npm: "npx",
  bun: "bunx --bun",
};

const PM_STORAGE_KEY = "vitrum-pm";

function commandFor(pm: PackageManager, url: string): string {
  return `${RUNNERS[pm]} shadcn@latest add ${url}`;
}

function isPackageManager(value: unknown): value is PackageManager {
  return (PACKAGE_MANAGERS as readonly unknown[]).includes(value);
}

const pmListeners = new Set<() => void>();

function subscribePm(listener: () => void): () => void {
  pmListeners.add(listener);
  return () => pmListeners.delete(listener);
}

function readStoredPm(): PackageManager {
  try {
    const stored = window.localStorage.getItem(PM_STORAGE_KEY);
    return isPackageManager(stored) ? stored : "pnpm";
  } catch {
    return "pnpm";
  }
}

function writeStoredPm(next: PackageManager): void {
  try {
    window.localStorage.setItem(PM_STORAGE_KEY, next);
  } catch {
    // storage unavailable — selection is per-page only
  }
  pmListeners.forEach((listener) => listener());
}

export function InstallTabsClient({
  url,
  dependencies,
  docsNote,
  manual,
}: {
  url: string;
  dependencies: string[];
  docsNote?: string;
  manual: React.ReactNode;
}) {
  const [mode, setMode] = React.useState<"cli" | "manual">("cli");
  const pm = React.useSyncExternalStore(subscribePm, readStoredPm, () => "pnpm" as const);

  const selectPm = (next: PackageManager) => {
    writeStoredPm(next);
  };

  return (
    <section aria-label="Installation" className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div
          role="tablist"
          aria-label="Install method"
          className="vt-well flex w-fit items-center gap-1 rounded-pill p-1"
        >
          {(["cli", "manual"] as const).map((value) => (
            <button
              key={value}
              role="tab"
              type="button"
              aria-selected={mode === value}
              className={cn(
                "vt-ring-inset rounded-pill px-3.5 py-1 text-xs font-medium transition-colors duration-200",
                mode === value
                  ? "bg-surface text-foreground shadow-glass-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
              onClick={() => setMode(value)}
            >
              {value === "cli" ? "CLI" : "Manual"}
            </button>
          ))}
        </div>

        {mode === "cli" ? (
          <div
            role="tablist"
            aria-label="Package manager"
            className="flex items-center gap-0.5"
          >
            {PACKAGE_MANAGERS.map((value) => (
              <button
                key={value}
                role="tab"
                type="button"
                aria-selected={pm === value}
                className={cn(
                  "vt-ring rounded-pill px-2.5 py-1 font-mono text-xs transition-colors duration-200",
                  pm === value
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
                onClick={() => selectPm(value)}
              >
                {value}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {mode === "cli" ? (
        <div className="flex items-center justify-between gap-3 overflow-x-auto rounded-pane border border-border bg-surface-recessed/60 px-4 py-3">
          <code className="font-mono text-[0.8125rem] whitespace-nowrap">
            <span className="select-none text-muted-foreground">$ </span>
            {commandFor(pm, url)}
          </code>
          <CopyButton value={commandFor(pm, url)} />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {dependencies.length > 0 ? (
            <div className="flex items-center justify-between gap-3 overflow-x-auto rounded-pane border border-border bg-surface-recessed/60 px-4 py-3">
              <code className="font-mono text-[0.8125rem] whitespace-nowrap">
                <span className="select-none text-muted-foreground">$ </span>
                {pm === "npm" ? "npm install" : `${pm} add`}{" "}
                {dependencies.join(" ")}
              </code>
              <CopyButton
                value={`${pm === "npm" ? "npm install" : `${pm} add`} ${dependencies.join(" ")}`}
              />
            </div>
          ) : null}
          {manual}
        </div>
      )}

      {docsNote ? (
        <p className="text-sm leading-relaxed text-muted-foreground">
          {docsNote}
        </p>
      ) : null}
    </section>
  );
}
