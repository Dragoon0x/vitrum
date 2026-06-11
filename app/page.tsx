import { Logo } from "@/components/site/logo";
import { AuroraField } from "@/registry/vitrum/ui/aurora-field";
import { Glass } from "@/registry/vitrum/ui/glass";

/**
 * Phase-0 material proof page. Exercises every material, tint, engine
 * surface, and the laminate guard over a live aurora field. Replaced by
 * the real landing page in a later phase.
 */
export default function Home() {
  return (
    <main className="relative min-h-svh overflow-clip">
      <AuroraField className="fixed inset-0" />

      <div className="relative mx-auto flex max-w-5xl flex-col gap-16 px-6 py-20">
        <header className="flex items-center justify-between">
          <Logo />
          <Glass
            material="film"
            className="rounded-pill px-4 py-1.5 font-mono text-xs text-muted-foreground"
          >
            material proof
          </Glass>
        </header>

        {/* refraction proof: oversized headline passing behind a slab */}
        <section className="relative py-10">
          <h1 className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-[0.95] font-bold tracking-tight">
            Designed
            <br />
            in glass.
          </h1>
          <Glass
            material="slab"
            sheen
            className="absolute top-1/2 left-[8%] hidden h-44 w-[min(34rem,72%)] -translate-y-1/2 rotate-[-3deg] shadow-glass-lg sm:block"
            style={{ "--glass-radius": "2rem" } as React.CSSProperties}
          />
        </section>

        {/* material range */}
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {(["film", "pane", "slab", "veil"] as const).map((material) => (
            <Glass
              key={material}
              material={material}
              sheen
              className="flex h-36 flex-col justify-end p-4 shadow-glass-md"
            >
              <span className="font-display text-sm font-semibold capitalize">
                {material}
              </span>
              <span className="text-xs text-muted-foreground">
                {material === "veil" ? "frost only" : "refracts"}
              </span>
            </Glass>
          ))}
        </section>

        {/* tints + shapes + laminate nesting */}
        <section className="flex flex-wrap items-center gap-4">
          <Glass
            material="pane"
            refract="vt-rf-pill-2"
            sheen
            className="rounded-pill px-6 py-3 text-sm font-medium shadow-glass-sm"
          >
            Pill surface
          </Glass>
          <Glass
            material="pane"
            tint="accent"
            refract="vt-rf-pill-2"
            sheen
            className="rounded-pill px-6 py-3 text-sm font-medium shadow-glass-sm"
          >
            Accent tint
          </Glass>
          <Glass
            material="slab"
            refract="vt-rf-circle-3"
            className="flex size-24 items-center justify-center rounded-full shadow-glass-md"
          >
            <span className="font-mono text-xs">circle</span>
          </Glass>
          <Glass material="slab" className="p-5 shadow-glass-md">
            <p className="mb-3 text-sm">Outer slab</p>
            <Glass material="pane" className="px-4 py-2 text-xs">
              Nested pane → laminate (no double blur)
            </Glass>
          </Glass>
        </section>

        <footer className="pb-10 font-mono text-xs text-muted-foreground">
          engines: refract / frost (?glass=frost) / solid (?glass=solid) ·
          reset: ?glass=auto
        </footer>
      </div>
    </main>
  );
}
