"use client";

import * as React from "react";

/**
 * Pointer sheen: a soft light that follows the pointer across a glass
 * surface. Writes --vt-px / --vt-py / --vt-sheen-o straight to the
 * element's inline style through one shared animation frame — no React
 * re-renders, one rAF for any number of surfaces.
 */

type SheenWrite = { px?: number; py?: number; o: number };

const queue = new Map<HTMLElement, SheenWrite>();
let frame = 0;

function flush(): void {
  frame = 0;
  queue.forEach((write, el) => {
    if (write.px !== undefined) el.style.setProperty("--vt-px", String(write.px));
    if (write.py !== undefined) el.style.setProperty("--vt-py", String(write.py));
    el.style.setProperty("--vt-sheen-o", String(write.o));
  });
  queue.clear();
}

function schedule(el: HTMLElement, write: SheenWrite): void {
  const prev = queue.get(el);
  queue.set(el, prev ? { ...prev, ...write } : write);
  if (!frame) frame = requestAnimationFrame(flush);
}

let fineQuery: MediaQueryList | null = null;
let calmQuery: MediaQueryList | null = null;

function sheenAllowed(): boolean {
  if (typeof window === "undefined") return false;
  fineQuery ??= window.matchMedia("(pointer: fine)");
  calmQuery ??= window.matchMedia("(prefers-reduced-motion: reduce)");
  return fineQuery.matches && !calmQuery.matches;
}

export interface SheenHandlers {
  onPointerEnter?: React.PointerEventHandler<HTMLElement>;
  onPointerMove?: React.PointerEventHandler<HTMLElement>;
  onPointerLeave?: React.PointerEventHandler<HTMLElement>;
}

/**
 * Returns pointer handlers to spread onto a glass element. Pass
 * `enabled: false` (or render on a touch / reduced-motion device) and the
 * handlers become no-ops.
 */
export function useSheen(enabled = true): SheenHandlers {
  return React.useMemo<SheenHandlers>(() => {
    if (!enabled) return {};

    const track = (event: React.PointerEvent<HTMLElement>) => {
      if (!sheenAllowed()) return;
      const el = event.currentTarget;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      schedule(el, {
        px: Math.round(((event.clientX - rect.left) / rect.width) * 1000) / 10,
        py: Math.round(((event.clientY - rect.top) / rect.height) * 1000) / 10,
        o: 1,
      });
    };

    return {
      onPointerEnter: track,
      onPointerMove: track,
      onPointerLeave: (event) => {
        schedule(event.currentTarget, { o: 0 });
      },
    };
  }, [enabled]);
}

/** Chain a sheen handler with a consumer-supplied one. */
export function chainHandlers<E extends React.SyntheticEvent>(
  ours?: (event: E) => void,
  theirs?: (event: E) => void,
): ((event: E) => void) | undefined {
  if (!ours) return theirs;
  if (!theirs) return ours;
  return (event) => {
    ours(event);
    theirs(event);
  };
}
