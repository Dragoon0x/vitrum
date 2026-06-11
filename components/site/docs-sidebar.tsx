"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { DOCS_NAV } from "@/content/nav";
import { cn } from "@/lib/utils";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Documentation"
      className="flex flex-col gap-7 pr-4 pb-16 text-sm"
    >
      {DOCS_NAV.map((group) => (
        <div key={group.title} className="flex flex-col gap-1">
          <p className="px-3 pb-1.5 text-xs font-semibold tracking-wide text-foreground/80 uppercase">
            {group.title}
          </p>
          {group.links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                {...(active
                  ? { "data-glass": "", "data-material": "film" }
                  : {})}
                className={cn(
                  "vt-ring rounded-pill px-3 py-1.5 transition-colors duration-150",
                  active
                    ? "font-medium text-foreground shadow-glass-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.title}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
