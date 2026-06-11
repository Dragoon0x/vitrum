"use client";

import {
  CalendarIcon,
  LayersIcon,
  PaletteIcon,
  RocketIcon,
  SettingsIcon,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/registry/vitrum/ui/command";
import { Glass } from "@/registry/vitrum/ui/glass";

export function CommandDemo() {
  return (
    <Glass material="veil" className="w-full max-w-md rounded-pane shadow-glass-lg">
      <Command className="bg-transparent">
        <CommandInput placeholder="Type a command or search…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <RocketIcon /> Deploy preview
            </CommandItem>
            <CommandItem>
              <PaletteIcon /> Open Material Studio
            </CommandItem>
            <CommandItem>
              <CalendarIcon /> Schedule release
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <LayersIcon /> Switch engine
              <CommandShortcut>⌘E</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <SettingsIcon /> Preferences
              <CommandShortcut>⌘,</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </Glass>
  );
}
