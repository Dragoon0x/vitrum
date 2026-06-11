"use client";

import * as React from "react";

import {
  getStoredGlassEngine,
  setGlassEngine,
} from "@/registry/vitrum/lib/glass-engine";
import {
  startOpticsManager,
  stopOpticsManager,
} from "@/registry/vitrum/lib/optics-manager";

/**
 * Keeps the engine attribute live after first paint, and runs the
 * exact-optics manager: while the refract engine is active, every glass
 * surface gets a displacement filter baked for its precise geometry
 * instead of the shipped preset.
 */
export function GlassWatcher() {
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-transparency: reduce)");
    const onChange = () => {
      if (!getStoredGlassEngine()) setGlassEngine(null);
    };
    query.addEventListener("change", onChange);

    startOpticsManager();

    return () => {
      query.removeEventListener("change", onChange);
      stopOpticsManager();
    };
  }, []);

  return null;
}
