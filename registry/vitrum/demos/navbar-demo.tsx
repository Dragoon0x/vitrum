"use client";

import {
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarLink,
  NavbarNav,
} from "@/registry/vitrum/ui/navbar";
import { Button } from "@/registry/vitrum/ui/button";

export function NavbarDemo() {
  return (
    <div className="w-full max-w-2xl">
      <Navbar position="static" aria-label="Demo">
        <NavbarBrand>
          <span className="pl-2 font-display text-sm font-semibold">studio</span>
        </NavbarBrand>
        <NavbarNav className="max-sm:hidden">
          <NavbarLink href="#" active>
            Scenes
          </NavbarLink>
          <NavbarLink href="#">Assets</NavbarLink>
          <NavbarLink href="#">Render</NavbarLink>
        </NavbarNav>
        <NavbarActions>
          <Button size="sm" variant="accent">
            Publish
          </Button>
        </NavbarActions>
      </Navbar>
    </div>
  );
}
