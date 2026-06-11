"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SITE_LINKS } from "@/content/nav";
import {
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarLink,
  NavbarNav,
} from "@/registry/vitrum/ui/navbar";

import { Logo } from "@/components/site/logo";
import { DocsSearch } from "@/components/site/docs-search";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { MobileNav } from "@/components/site/mobile-nav";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <Navbar aria-label="Main">
      <NavbarBrand>
        <Link
          href="/"
          aria-label="Vitrum home"
          className="vt-ring rounded-pill"
        >
          <Logo />
        </Link>
      </NavbarBrand>
      <NavbarNav className="max-sm:hidden">
        {SITE_LINKS.map((link) => (
          <NavbarLink
            key={link.href}
            asChild
            active={
              link.href === "/docs"
                ? pathname.startsWith("/docs") &&
                  !pathname.startsWith("/docs/components")
                : pathname.startsWith(link.href)
            }
          >
            <Link href={link.href}>{link.title}</Link>
          </NavbarLink>
        ))}
      </NavbarNav>
      <NavbarActions>
        <DocsSearch />
        <ThemeToggle />
        <MobileNav />
      </NavbarActions>
    </Navbar>
  );
}
