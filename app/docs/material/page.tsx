import type { Metadata } from "next";

import { PageHeader } from "@/components/docs/page-header";
import { CodeBlock } from "@/components/docs/code-block";
import { Callout } from "@/components/docs/callout";

export const metadata: Metadata = {
  title: "Material & theming",
  description: "Engines, materials, tints, and every token.",
};

const ENGINES = [
  ["refract", "SVG displacement refraction + blur + saturation in one backdrop pass", "Detected compositor support"],
  ["frost", "Tuned blur, saturation, and brightness with the same specular details", "Everywhere else; also the no-JS baseline"],
  ["solid", "Opaque surfaces, ring intact, zero transparency", "prefers-reduced-transparency, or by choice"],
] as const;

const MATERIALS = [
  ["film", "8px", "Hairline chrome — badges, tooltips, dock icons"],
  ["pane", "16px", "Interactive chrome — buttons, alerts, panels"],
  ["slab", "28px", "Raised surfaces — cards, docks, toasts"],
  ["veil", "44px", "Overlay scale — dialogs, sheets, menus (frost-only by policy)"],
] as const;

const TOKENS = [
  ["--glass-blur", "Backdrop blur radius for the frost stack"],
  ["--glass-tint-c", "Tint color of the surface"],
  ["--glass-tint-a", "Tint opacity (0–1); transitions smoothly"],
  ["--glass-refract", "url(#…) of the refraction preset"],
  ["--glass-saturate", "Backdrop saturation boost"],
  ["--glass-edge / --glass-edge-soft", "Specular ring, lit and shaded ends"],
  ["--glass-sheen", "Pointer-following highlight color"],
  ["--glass-radius", "Surface corner radius"],
] as const;

export default function MaterialPage() {
  return (
    <article className="flex flex-col gap-10">
      <PageHeader
        title="Material & theming"
        description="One optical system drives every component. Three engines decide how the backdrop is treated; four materials set the weight; tokens make all of it yours."
      />

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          Engines
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          The engine is resolved before first paint and carried as{" "}
          <code className="font-mono">data-glass-engine</code> on{" "}
          <code className="font-mono">{"<html>"}</code>. All differences
          live in CSS — components never branch on it.
        </p>
        <div className="overflow-x-auto rounded-pane border border-border">
          <table className="w-full min-w-md border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-recessed/50">
                <th className="px-4 py-2.5 font-medium">Engine</th>
                <th className="px-4 py-2.5 font-medium">Backdrop treatment</th>
                <th className="px-4 py-2.5 font-medium">When</th>
              </tr>
            </thead>
            <tbody>
              {ENGINES.map(([name, treatment, when]) => (
                <tr key={name} className="border-b border-border align-top last:border-b-0">
                  <td className="px-4 py-2.5 font-mono text-[0.8125rem] text-primary">{name}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{treatment}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Force an engine for testing with{" "}
          <code className="font-mono">?glass=frost</code>,{" "}
          <code className="font-mono">?glass=solid</code>, or{" "}
          <code className="font-mono">?glass=refract</code>; the choice
          persists until <code className="font-mono">?glass=auto</code>{" "}
          clears it.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          Materials
        </h2>
        <div className="overflow-x-auto rounded-pane border border-border">
          <table className="w-full min-w-md border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-recessed/50">
                <th className="px-4 py-2.5 font-medium">Material</th>
                <th className="px-4 py-2.5 font-medium">Frost blur</th>
                <th className="px-4 py-2.5 font-medium">Used for</th>
              </tr>
            </thead>
            <tbody>
              {MATERIALS.map(([name, blur, used]) => (
                <tr key={name} className="border-b border-border align-top last:border-b-0">
                  <td className="px-4 py-2.5 font-mono text-[0.8125rem] text-primary">{name}</td>
                  <td className="px-4 py-2.5 font-mono text-[0.8125rem] text-muted-foreground">{blur}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{used}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout kind="info">
          Veil never refracts: SVG displacement over overlay-sized regions
          is where frame budgets go to die, so the heaviest material is
          frost-only by construction.
        </Callout>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          Per-instance overrides
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Every knob is a custom property. Override them with arbitrary
          properties in your class list or inline styles:
        </p>
        <CodeBlock
          lang="tsx"
          code={`<Glass\n  material="pane"\n  className="[--glass-tint-a:0.4] [--glass-tint-c:var(--success)]"\n>\n  Custom-tinted glass\n</Glass>`}
        />
        <div className="overflow-x-auto rounded-pane border border-border">
          <table className="w-full min-w-md border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-recessed/50">
                <th className="px-4 py-2.5 font-medium">Token</th>
                <th className="px-4 py-2.5 font-medium">Controls</th>
              </tr>
            </thead>
            <tbody>
              {TOKENS.map(([token, controls]) => (
                <tr key={token} className="border-b border-border align-top last:border-b-0">
                  <td className="px-4 py-2.5 font-mono text-[0.8125rem] whitespace-nowrap text-primary">{token}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{controls}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          Nesting
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Glass inside glass automatically laminates: the inner surface
          keeps its tint and specular ring but drops its backdrop filter.
          Stacked blur reads as mush and costs twice — the system simply
          does not allow it.
        </p>
      </section>
    </article>
  );
}
