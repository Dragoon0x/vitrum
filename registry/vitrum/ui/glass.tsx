"use client";

import * as React from "react";
import { Slot as SlotPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import type { GlassFilterId } from "@/registry/vitrum/lib/glass-filter";
import { chainHandlers, useSheen } from "@/registry/vitrum/hooks/use-sheen";

export type GlassMaterial = "film" | "pane" | "slab" | "veil";

export type GlassTint = "neutral" | "accent" | "none";

export interface GlassProps extends React.ComponentProps<"div"> {
  /** Optical weight of the surface. */
  material?: GlassMaterial;
  /** Color cast of the material. */
  tint?: GlassTint;
  /** Pin a specific refraction preset (defaults follow the material). */
  refract?: GlassFilterId;
  /** Soft light that follows the pointer. */
  sheen?: boolean;
  /** Merge the surface onto the child element instead of rendering a div. */
  asChild?: boolean;
}

/**
 * The material primitive. Renders a single element; the glass itself —
 * backdrop refraction or frost, tint, specular ring — lives in two
 * pseudo-elements, so children are ordinary content.
 */
export function Glass({
  material = "pane",
  tint = "neutral",
  refract,
  sheen = false,
  asChild = false,
  className,
  style,
  onPointerEnter,
  onPointerMove,
  onPointerLeave,
  ...props
}: GlassProps) {
  const sheenHandlers = useSheen(sheen);
  const Comp = asChild ? SlotPrimitive.Root : "div";

  const mergedStyle = refract
    ? ({ "--glass-refract": `url(#${refract})`, ...style } as React.CSSProperties)
    : style;

  return (
    <Comp
      data-glass=""
      data-material={material}
      data-tint={tint}
      className={cn(className)}
      style={mergedStyle}
      onPointerEnter={chainHandlers(sheenHandlers.onPointerEnter, onPointerEnter)}
      onPointerMove={chainHandlers(sheenHandlers.onPointerMove, onPointerMove)}
      onPointerLeave={chainHandlers(sheenHandlers.onPointerLeave, onPointerLeave)}
      {...props}
    />
  );
}
