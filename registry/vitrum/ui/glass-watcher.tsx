"use client";

import * as React from "react";

import {
  getStoredGlassEngine,
  setGlassEngine,
} from "@/registry/vitrum/lib/glass-engine";

/**
 * Keeps the engine attribute live after first paint: if the user's
 * reduced-transparency preference flips and no explicit override is
 * stored, the engine re-resolves.
 */
export function GlassWatcher() {
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-transparency: reduce)");
    const onChange = () => {
      if (!getStoredGlassEngine()) setGlassEngine(null);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return null;
}
