import Link from "next/link";

import { AuroraField } from "@/registry/vitrum/ui/aurora-field";
import { Glass } from "@/registry/vitrum/ui/glass";

export default function NotFound() {
  return (
    <main className="relative grid min-h-svh place-items-center overflow-clip px-6">
      <AuroraField className="fixed inset-0 -z-10" />
      <Glass
        material="slab"
        sheen
        className="flex max-w-md flex-col items-center gap-4 rounded-sheet p-10 text-center shadow-glass-lg"
      >
        <p className="font-display text-6xl font-bold tracking-tight">404</p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          This pane of the site doesn&apos;t exist. The light passed
          straight through.
        </p>
        <Link
          href="/"
          className="vt-ring mt-2 inline-flex items-center rounded-pill bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          Back to the surface
        </Link>
      </Glass>
    </main>
  );
}
