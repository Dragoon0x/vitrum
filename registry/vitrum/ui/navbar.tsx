"use client";

import * as React from "react";
import { Slot as SlotPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * A floating bar of glass that condenses as the page scrolls: the tint
 * deepens and the shadow grows, so chrome stays legible over content
 * without ever going opaque.
 */
function Navbar({
  className,
  children,
  position = "fixed",
  ...props
}: React.ComponentProps<"nav"> & { position?: "fixed" | "static" }) {
  const [scrolled, setScrolled] = React.useState(false);
  const fixed = position === "fixed";

  React.useEffect(() => {
    if (!fixed) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 12);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [fixed]);

  return (
    <header
      className={
        fixed
          ? "fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-3"
          : "relative flex w-full justify-center"
      }
    >
      <nav
        data-slot="navbar"
        data-glass=""
        data-material="film"
        data-scrolled={scrolled || undefined}
        className={cn(
          "vt-refract-pill-2 flex h-13 w-full max-w-5xl items-center gap-3 rounded-pill px-3 transition-shadow duration-300",
          "data-[scrolled]:shadow-glass-md data-[scrolled]:[--glass-tint-a:calc(var(--glass-a-pane)+0.04)]",
          className,
        )}
        {...props}
      >
        {children}
      </nav>
    </header>
  );
}

function NavbarBrand({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="navbar-brand"
      className={cn("flex shrink-0 items-center gap-2 pl-1.5", className)}
      {...props}
    />
  );
}

function NavbarNav({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="navbar-nav"
      className={cn(
        "flex min-w-0 flex-1 items-center justify-center gap-1",
        className,
      )}
      {...props}
    />
  );
}

function NavbarLink({
  className,
  active,
  asChild = false,
  ...props
}: React.ComponentProps<"a"> & { active?: boolean; asChild?: boolean }) {
  const Comp = asChild ? SlotPrimitive.Root : "a";
  return (
    <Comp
      data-slot="navbar-link"
      data-active={active || undefined}
      className={cn(
        "vt-ring rounded-pill px-3.5 py-1.5 text-sm text-muted-foreground transition-colors duration-200",
        "hover:text-foreground data-[active]:font-medium data-[active]:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function NavbarActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="navbar-actions"
      className={cn("flex shrink-0 items-center gap-2 pr-1", className)}
      {...props}
    />
  );
}

export { Navbar, NavbarBrand, NavbarNav, NavbarLink, NavbarActions };
