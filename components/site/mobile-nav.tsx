"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { DOCS_NAV, SITE_LINKS } from "@/content/nav";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/vitrum/ui/sheet";

import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open navigation"
        className="vt-ring inline-flex size-9 items-center justify-center rounded-pill text-muted-foreground transition-colors duration-200 hover:bg-accent/60 hover:text-foreground md:hidden"
      >
        <MenuIcon className="size-4.5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle>Navigate</SheetTitle>
          <SheetDescription className="sr-only">
            Site and documentation navigation
          </SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile" className="flex flex-col gap-6 overflow-y-auto pb-8">
          <div className="flex flex-col gap-1">
            {SITE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "vt-ring rounded-control px-2.5 py-1.5 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.title}
              </Link>
            ))}
          </div>
          {DOCS_NAV.map((group) => (
            <div key={group.title} className="flex flex-col gap-1">
              <p className="px-2.5 pb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {group.title}
              </p>
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "vt-ring rounded-control px-2.5 py-1.5 text-sm transition-colors",
                    pathname === link.href
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
