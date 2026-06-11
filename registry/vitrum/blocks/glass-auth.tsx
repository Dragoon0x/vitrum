"use client";

import * as React from "react";
import { FingerprintIcon } from "lucide-react";

import { Button } from "@/registry/vitrum/ui/button";
import { Checkbox } from "@/registry/vitrum/ui/checkbox";
import { Glass } from "@/registry/vitrum/ui/glass";
import { Input } from "@/registry/vitrum/ui/input";

/**
 * Sign-in pane: one slab of glass holding recessed fields, an accent
 * action, and a passkey alternative.
 */
export function GlassAuth() {
  return (
    <Glass
      material="slab"
      sheen
      className="w-full max-w-sm rounded-sheet p-8 shadow-glass-lg"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Welcome back
          </h2>
          <p className="text-sm text-muted-foreground">
            Sign in to your workspace to continue.
          </p>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="auth-email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="auth-email"
              type="email"
              autoComplete="email"
              placeholder="you@studio.glass"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="auth-password" className="text-sm font-medium">
                Password
              </label>
              <a
                href="#"
                className="vt-ring rounded-control text-xs text-primary outline-none hover:underline"
              >
                Forgot?
              </a>
            </div>
            <Input
              id="auth-password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••••"
            />
          </div>
          <label className="flex items-center gap-2.5 text-sm text-muted-foreground">
            <Checkbox defaultChecked /> Keep me signed in
          </label>
          <div className="mt-1 flex flex-col gap-2.5">
            <Button type="submit" variant="accent" className="w-full">
              Sign in
            </Button>
            <Button type="button" variant="film" className="w-full">
              <FingerprintIcon /> Use a passkey
            </Button>
          </div>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          No account?{" "}
          <a
            href="#"
            className="vt-ring rounded-control text-primary outline-none hover:underline"
          >
            Request access
          </a>
        </p>
      </div>
    </Glass>
  );
}
