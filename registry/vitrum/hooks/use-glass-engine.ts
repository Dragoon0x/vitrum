"use client";

import { useSyncExternalStore } from "react";

import {
  GLASS_ENGINE_ATTR,
  getGlassEngine,
  type GlassEngine,
} from "@/registry/vitrum/lib/glass-engine";

function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: [GLASS_ENGINE_ATTR],
  });
  return () => observer.disconnect();
}

function getServerSnapshot(): GlassEngine {
  return "frost";
}

/**
 * The active glass engine, kept in sync with the <html> attribute.
 * Server-rendered markup must never branch on this — reserve it for
 * client-only refinements (the lens, engine pickers, diagnostics).
 */
export function useGlassEngine(): GlassEngine {
  return useSyncExternalStore(subscribe, getGlassEngine, getServerSnapshot);
}
