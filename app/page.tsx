import Link from "next/link";
import { ArrowRightIcon, SparklesIcon } from "lucide-react";

import { installCommand, siteConfig } from "@/lib/site";
import { GlassAuth } from "@/registry/vitrum/blocks/glass-auth";
import { GlassPlayer } from "@/registry/vitrum/blocks/glass-player";
import { AuroraField } from "@/registry/vitrum/ui/aurora-field";
import { Glass } from "@/registry/vitrum/ui/glass";

import { CopyButton } from "@/components/docs/copy-button";
import { GalleryWall } from "@/components/site/gallery-wall";
import { Hero } from "@/components/site/hero";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { StudioTeaser } from "@/components/site/studio-teaser";

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="mb-10 flex max-w-2xl flex-col gap-3">
      <span className="font-mono text-xs tracking-widest text-glint uppercase">
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      <p className="text-base leading-relaxed text-muted-foreground">
        {description}
      </p>
    </header>
  );
}

const MATERIAL_STRIP = [
  {
    title: "Frost",
    body: "Blur and saturation tuned per material weight — film to veil.",
    className: "vt-scene-reef",
    glass: <Glass material="veil" className="h-24 w-40 shadow-glass-md" />,
  },
  {
    title: "Refraction",
    body: "A bevel of displacement bends the backdrop at every rim.",
    className: "vt-scene-dusk",
    glass: (
      <Glass
        material="slab"
        className="h-24 w-40 shadow-glass-md"
        refract="vt-rf-round-3"
      />
    ),
  },
  {
    title: "Specular",
    body: "A lit ring and a pointer-following sheen sell the surface.",
    className: "vt-scene-grid",
    glass: <Glass material="pane" sheen className="h-24 w-40 shadow-glass-md" />,
  },
] as const;

export default function Home() {
  const initCommand = installCommand("glass");

  return (
    <div className="relative overflow-clip">
      <AuroraField className="fixed inset-0 -z-10" />
      <SiteHeader />

      <Hero />

      <main id="content" className="mx-auto flex max-w-6xl flex-col gap-32 px-6 pb-10">
        {/* material strip */}
        <section aria-label="The material">
          <SectionHeading
            eyebrow="The material"
            title="One optical system, three behaviors"
            description="Every surface is frost, bend, and light in a single backdrop pass — engineered to degrade beautifully when the compositor can't bend."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {MATERIAL_STRIP.map((entry) => (
              <div
                key={entry.title}
                className={`flex flex-col items-center gap-5 rounded-sheet border border-border p-8 ${entry.className}`}
              >
                {entry.glass}
                <div className="text-center">
                  <h3 className="font-display text-base font-semibold tracking-tight">
                    {entry.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {entry.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* gallery wall */}
        <section aria-label="Components">
          <SectionHeading
            eyebrow="Thirty components"
            title="Real, live, and yours to keep"
            description="No screenshots. Everything below is the shipping component, rendering over the same light you're looking through."
          />
          <GalleryWall />
        </section>

        {/* studio teaser */}
        <section aria-label="Material Studio">
          <SectionHeading
            eyebrow="Material Studio"
            title="Tune the glass yourself"
            description="Frost, tint, refraction, radius — every knob is a custom property. Set them live, then export the surface you made."
          />
          <StudioTeaser />
        </section>

        {/* blocks teaser */}
        <section aria-label="Blocks">
          <SectionHeading
            eyebrow="Blocks"
            title="Whole sections, pre-composed"
            description="Auth panes, dashboards, players, launch shells — install a finished section and reshape it from the inside."
          />
          <div className="grid items-start justify-items-center gap-8 lg:grid-cols-2">
            <GlassAuth />
            <GlassPlayer />
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              href="/blocks"
              className="vt-ring inline-flex items-center gap-2 rounded-pill px-5 py-2.5 text-sm font-medium text-glint transition-colors hover:bg-accent/60"
            >
              All blocks <ArrowRightIcon className="size-4" />
            </Link>
          </div>
        </section>

        {/* install CTA */}
        <section aria-label="Install">
          <Glass
            material="slab"
            sheen
            className="mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-sheet p-8 shadow-glass-lg sm:p-10"
          >
            <div className="flex flex-col gap-2">
              <h2 className="font-display text-2xl font-bold tracking-tight">
                Pour it into your project
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                One command brings the component, the material system, and
                the tokens. Works by URL or as the{" "}
                <code className="font-mono text-foreground">@vitrum</code>{" "}
                namespace — for you and for your AI editor.
              </p>
            </div>
            <div className="flex items-center justify-between gap-3 overflow-x-auto rounded-pane border border-border bg-surface-recessed/70 px-4 py-3">
              <code className="font-mono text-[0.8125rem] whitespace-nowrap">
                <span className="select-none text-muted-foreground">$ </span>
                {initCommand}
              </code>
              <CopyButton value={initCommand} />
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/docs/installation"
                className="vt-ring inline-flex items-center gap-2 rounded-pill bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                Installation guide <ArrowRightIcon className="size-4" />
              </Link>
              <Link
                href="/docs/mcp"
                className="vt-ring inline-flex items-center gap-2 rounded-pill px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent/60"
              >
                <SparklesIcon className="size-4" /> Use with AI
              </Link>
            </div>
          </Glass>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

export const metadata = {
  description: siteConfig.description,
};
