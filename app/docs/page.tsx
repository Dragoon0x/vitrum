import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { PageHeader } from "@/components/docs/page-header";
import { Callout } from "@/components/docs/callout";
import { Glass } from "@/registry/vitrum/ui/glass";

export const metadata: Metadata = {
  title: "Introduction",
  description:
    "What Vitrum is, how the material thinks, and where to start.",
};

const PRINCIPLES = [
  {
    title: "The center stays at rest",
    body: "Refraction lives in a bevel band around each surface's rim. Content behind the middle of a pane stays legible — the bend is at the edges, where glass actually bends light.",
  },
  {
    title: "Fields are wells, chrome is glass",
    body: "Things you read float as glass above the page. Things you type into are recessed wells sunk beneath it. The two never compete for the same depth.",
  },
  {
    title: "Light is a dependency",
    body: "Glass over a void is invisible. Vitrum ships the light too — the aurora field — and every demo renders over it.",
  },
  {
    title: "Degradation is a design target",
    body: "Three engines render every surface: refraction where the compositor allows it, a tuned frost everywhere else, and solid surfaces when the system asks for reduced transparency. Each is styled on purpose.",
  },
] as const;

export default function IntroductionPage() {
  return (
    <article className="flex flex-col gap-10">
      <PageHeader
        title="Vitrum"
        description="A component library cast in glass. Thirty React components rendered in a refractive material — installed with one command, themed with custom properties, accessible by construction."
      />

      <section className="grid gap-4 sm:grid-cols-2">
        {PRINCIPLES.map((principle) => (
          <Glass
            key={principle.title}
            material="pane"
            sheen
            className="flex flex-col gap-2 rounded-pane p-5 shadow-glass-sm"
          >
            <h2 className="font-display text-base font-semibold tracking-tight">
              {principle.title}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {principle.body}
            </p>
          </Glass>
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          How it is built
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Every component is a thin layer over a single primitive — the
          glass surface. One element, two pseudo-layers: a backdrop layer
          that bends and frosts what lies behind it, and a specular ring
          that catches the light. Behavior comes from battle-tested
          headless primitives; the optics are pure CSS driven by custom
          properties, so every knob is themable per instance.
        </p>
        <Callout kind="tip">
          Components arrive as source files in your project, not as a
          package. Change anything. The material system travels with the
          first component you install.
        </Callout>
      </section>

      <nav aria-label="Start here" className="flex flex-wrap gap-3">
        <Link
          href="/docs/installation"
          className="vt-ring inline-flex items-center gap-2 rounded-pill bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground outline-none transition-transform hover:scale-[1.02]"
        >
          Install Vitrum <ArrowRightIcon className="size-4" />
        </Link>
        <Link
          href="/docs/components/glass"
          className="vt-ring inline-flex items-center gap-2 rounded-pill px-5 py-2.5 text-sm font-medium text-foreground outline-none transition-colors hover:bg-accent/60"
        >
          Meet the material
        </Link>
      </nav>
    </article>
  );
}
