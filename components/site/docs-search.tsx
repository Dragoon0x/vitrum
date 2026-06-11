"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { FileTextIcon, SearchIcon } from "lucide-react";

import { DOCS_NAV, SITE_LINKS } from "@/content/nav";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/vitrum/ui/command";

export function DocsSearch() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <button
        type="button"
        aria-label="Search documentation"
        className="vt-ring inline-flex h-9 items-center gap-2 rounded-pill px-3 text-sm text-muted-foreground transition-colors duration-200 outline-none hover:bg-accent/60 hover:text-foreground"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="size-4" />
        <span className="hidden lg:inline">Search</span>
        <kbd className="hidden rounded-control border border-border px-1.5 py-0.5 font-mono text-[0.625rem] text-muted-foreground lg:inline">
          ⌘K
        </kbd>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search documentation"
        description="Jump to any page"
      >
        <CommandInput placeholder="Search documentation…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {SITE_LINKS.map((link) => (
              <CommandItem
                key={link.href}
                value={`${link.title} page`}
                onSelect={() => go(link.href)}
              >
                <FileTextIcon />
                {link.title}
              </CommandItem>
            ))}
          </CommandGroup>
          {DOCS_NAV.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.links.map((link) => (
                <CommandItem
                  key={link.href}
                  value={`${group.title} ${link.title}`}
                  onSelect={() => go(link.href)}
                >
                  <FileTextIcon />
                  {link.title}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
