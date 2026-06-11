"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

import { cn } from "@/lib/utils";

const REST_SIZE = 44;
const PEAK_SIZE = 68;
const REACH = 110;

const DockContext = React.createContext<{
  pointerX: MotionValue<number>;
  magnify: boolean;
} | null>(null);

function useDockContext(): NonNullable<React.ContextType<typeof DockContext>> {
  const context = React.useContext(DockContext);
  if (!context) throw new Error("DockItem must be used inside <Dock>");
  return context;
}

/**
 * A shelf of glass whose icons swell toward the pointer, falling off
 * with distance. Keyboard focus magnifies too; with reduced motion the
 * shelf stays flat.
 */
function Dock({
  className,
  children,
  "aria-label": ariaLabel = "Dock",
  ...props
}: React.ComponentProps<"nav">) {
  const pointerX = useMotionValue(Number.POSITIVE_INFINITY);
  const reducedMotion = useReducedMotion();
  const magnify = !reducedMotion;

  const context = React.useMemo(
    () => ({ pointerX, magnify }),
    [pointerX, magnify],
  );

  return (
    <nav
      data-slot="dock"
      aria-label={ariaLabel}
      data-glass=""
      data-material="slab"
      onPointerMove={(event) => {
        if (magnify && event.pointerType === "mouse") {
          pointerX.set(event.clientX);
        }
      }}
      onPointerLeave={() => pointerX.set(Number.POSITIVE_INFINITY)}
      className={cn(
        "vt-refract-pill-2 flex w-fit items-end gap-2 rounded-pill px-3 py-2.5 shadow-glass-lg",
        className,
      )}
      {...props}
    >
      <DockContext.Provider value={context}>{children}</DockContext.Provider>
    </nav>
  );
}

function DockItem({
  className,
  label,
  children,
  ...props
}: Omit<React.ComponentProps<typeof motion.button>, "children"> & {
  label: string;
  children?: React.ReactNode;
}) {
  const { pointerX, magnify } = useDockContext();
  const ref = React.useRef<HTMLButtonElement>(null);
  const [focused, setFocused] = React.useState(false);

  const distance = useTransform(pointerX, (x) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return Number.POSITIVE_INFINITY;
    return x - rect.left - rect.width / 2;
  });

  const targetSize = useTransform(distance, (d) => {
    if (!magnify) return REST_SIZE;
    if (focused) return PEAK_SIZE - 8;
    const proximity = Math.max(0, 1 - Math.abs(d) / REACH);
    return REST_SIZE + (PEAK_SIZE - REST_SIZE) * proximity * proximity;
  });

  const size = useSpring(targetSize, {
    mass: 0.1,
    stiffness: 360,
    damping: 24,
  });

  return (
    <motion.button
      ref={ref}
      data-slot="dock-item"
      data-glass=""
      data-material="film"
      style={{ width: size, height: size }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={cn(
        "vt-refract-circle-2 vt-ring relative grid shrink-0 place-items-center rounded-[32%] text-foreground shadow-glass-sm outline-none",
        "[&_svg]:size-[52%] [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {children}
      <span className="sr-only">{label}</span>
    </motion.button>
  );
}

function DockSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dock-separator"
      aria-hidden="true"
      className={cn("mx-1 h-9 w-px self-center bg-border", className)}
      {...props}
    />
  );
}

export { Dock, DockItem, DockSeparator };
