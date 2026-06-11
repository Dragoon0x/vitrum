"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

import { cn } from "@/lib/utils";

export interface LensProps extends React.ComponentProps<"div"> {
  /** Diameter of the lens, px. */
  size?: number;
}

/**
 * A disc of optical glass that trails the pointer across its parent and
 * magnifies whatever lies beneath — true backdrop magnification in the
 * refract engine, a soft glass disc elsewhere. Decorative by design:
 * hidden from assistive tech, absent on touch and reduced-motion.
 *
 * The parent must be `position: relative`.
 */
export function Lens({ size = 132, className, ...props }: LensProps) {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = React.useState(false);
  const [finePointer, setFinePointer] = React.useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 380, damping: 36, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 380, damping: 36, mass: 0.4 });

  React.useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const update = () => setFinePointer(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const enabled = finePointer && !reducedMotion;

  return (
    <div
      data-slot="lens"
      aria-hidden="true"
      className={cn("absolute inset-0 overflow-clip", className)}
      onPointerMove={(event) => {
        if (!enabled || event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left);
        y.set(event.clientY - rect.top);
        setActive(true);
      }}
      onPointerLeave={() => setActive(false)}
      {...props}
    >
      {enabled ? (
        <motion.div
          data-glass=""
          data-material="film"
          data-tint="none"
          className={cn(
            "vt-refract-lens pointer-events-none absolute top-0 left-0 rounded-full shadow-glass-md transition-opacity duration-200",
            active ? "opacity-100" : "opacity-0",
          )}
          style={{
            width: size,
            height: size,
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      ) : null}
    </div>
  );
}
