"use client";

import * as React from "react";

import { Button } from "@/registry/vitrum/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/registry/vitrum/ui/dropdown-menu";

export function DropdownMenuDemo() {
  const [grid, setGrid] = React.useState(true);
  const [density, setDensity] = React.useState("cozy");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="film">Workspace</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuLabel>View</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            New window <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Duplicate <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={grid} onCheckedChange={setGrid}>
          Show grid
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Density</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={density} onValueChange={setDensity}>
          <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="cozy">Cozy</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Delete board</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
