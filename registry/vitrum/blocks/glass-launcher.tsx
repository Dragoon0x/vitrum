"use client";

import * as React from "react";
import {
  CompassIcon,
  FolderIcon,
  ImageIcon,
  MailIcon,
  MusicIcon,
  PaletteIcon,
  RocketIcon,
  SettingsIcon,
  TerminalIcon,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/registry/vitrum/ui/command";
import { Dock, DockItem, DockSeparator } from "@/registry/vitrum/ui/dock";
import { Glass } from "@/registry/vitrum/ui/glass";
import {
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarLink,
  NavbarNav,
} from "@/registry/vitrum/ui/navbar";
import { Badge } from "@/registry/vitrum/ui/badge";

/**
 * A workspace shell made entirely of glass: bar above, palette in the
 * middle, dock below. Drop it over any scenery.
 */
export function GlassLauncher() {
  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-10">
      <Navbar position="static" aria-label="Launcher">
        <NavbarBrand>
          <CompassIcon className="size-4.5 text-primary" />
          <span className="font-display text-sm font-semibold">atrium</span>
        </NavbarBrand>
        <NavbarNav className="max-sm:hidden">
          <NavbarLink href="#" active>
            Overview
          </NavbarLink>
          <NavbarLink href="#">Library</NavbarLink>
          <NavbarLink href="#">Activity</NavbarLink>
        </NavbarNav>
        <NavbarActions>
          <Badge variant="accent">Pro</Badge>
        </NavbarActions>
      </Navbar>

      <Glass
        material="veil"
        className="w-full max-w-md rounded-pane shadow-glass-lg"
      >
        <Command className="bg-transparent">
          <CommandInput placeholder="Search the workspace…" />
          <CommandList>
            <CommandEmpty>Nothing matches.</CommandEmpty>
            <CommandGroup heading="Jump to">
              <CommandItem>
                <RocketIcon /> Launchpad
                <CommandShortcut>⌘1</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <PaletteIcon /> Theme studio
                <CommandShortcut>⌘2</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <SettingsIcon /> Preferences
                <CommandShortcut>⌘,</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </Glass>

      <Dock aria-label="Launcher dock">
        <DockItem label="Files">
          <FolderIcon />
        </DockItem>
        <DockItem label="Mail">
          <MailIcon />
        </DockItem>
        <DockItem label="Photos">
          <ImageIcon />
        </DockItem>
        <DockItem label="Music">
          <MusicIcon />
        </DockItem>
        <DockSeparator />
        <DockItem label="Terminal">
          <TerminalIcon />
        </DockItem>
      </Dock>
    </div>
  );
}
