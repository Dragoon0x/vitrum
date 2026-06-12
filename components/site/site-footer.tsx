import Link from "next/link";

import { SITE_LINKS } from "@/content/nav";
import { siteConfig } from "@/lib/site";

import { LogoMark } from "@/components/site/logo";

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-24 border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <LogoMark className="size-6 text-foreground" />
            <p className="text-sm text-muted-foreground">
              {siteConfig.name} — {siteConfig.tagline} MIT licensed.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            Builder, Designer and Maker:{" "}
            <a
              href="https://x.com/0xDragoonLab"
              target="_blank"
              rel="noreferrer"
              className="vt-ring rounded-control font-medium text-foreground transition-colors hover:text-glint"
            >
              0xDragoon
            </a>
          </p>
        </div>
        <nav aria-label="Footer" className="flex items-center gap-5">
          {SITE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="vt-ring rounded-control text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
