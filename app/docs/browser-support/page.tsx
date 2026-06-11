import type { Metadata } from "next";

import { PageHeader } from "@/components/docs/page-header";
import { Callout } from "@/components/docs/callout";

export const metadata: Metadata = {
  title: "Browser support",
  description: "Exactly what renders where, and why.",
};

const MATRIX = [
  ["Chrome, Edge, Arc, Brave (Chromium)", "refract", "Full displacement refraction, prismatic edges, lens magnification"],
  ["Safari 16.4+", "frost", "Tuned blur + saturation, specular ring, sheen — no displacement"],
  ["Firefox 128+", "frost", "Same frost rendering as Safari"],
  ["Any browser, reduced transparency on", "solid", "Opaque surfaces, structure and focus intact"],
  ["JavaScript disabled", "frost", "The no-JS default is the frost engine"],
] as const;

export default function BrowserSupportPage() {
  return (
    <article className="flex flex-col gap-10">
      <PageHeader
        title="Browser support"
        description="Real refraction needs SVG filters inside backdrop-filter, which only Chromium's compositor implements today. Vitrum treats that as a tiering decision, not a bug to hide."
      />

      <section className="flex flex-col gap-4">
        <div className="overflow-x-auto rounded-pane border border-border">
          <table className="w-full min-w-lg border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-recessed/50">
                <th className="px-4 py-2.5 font-medium">Environment</th>
                <th className="px-4 py-2.5 font-medium">Engine</th>
                <th className="px-4 py-2.5 font-medium">What you see</th>
              </tr>
            </thead>
            <tbody>
              {MATRIX.map(([env, engine, result]) => (
                <tr key={env} className="border-b border-border align-top last:border-b-0">
                  <td className="px-4 py-2.5 text-foreground">{env}</td>
                  <td className="px-4 py-2.5 font-mono text-[0.8125rem] text-primary">{engine}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          Why detection is not a CSS query
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          <code className="font-mono">
            CSS.supports(&quot;backdrop-filter&quot;, &quot;url(#f)&quot;)
          </code>{" "}
          returns true in browsers that parse the value but never render
          it — a false positive with no behavioral probe to correct it.
          The engine script therefore reads the user-agent client hints
          brand list, which only Chromium-family browsers populate, and
          falls back to frost on any doubt. The decision runs in a
          pre-paint inline script, so no surface ever flashes from one
          engine to another.
        </p>
        <Callout kind="info">
          The frost engine is not an apology. It is tuned independently —
          denser tint, stronger edge light — and several of the docs
          screenshots in this site&apos;s own test suite are taken in it
          on purpose.
        </Callout>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          Performance posture
        </h2>
        <ul className="flex max-w-2xl list-disc flex-col gap-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            Refraction filters are shared, quantized presets mounted once —
            not per-element filter trees.
          </li>
          <li>
            The veil material (dialogs, sheets, menus) never refracts;
            overlay-scale displacement is the jank source.
          </li>
          <li>
            Nested glass laminates automatically: one backdrop pass per
            stack, ever.
          </li>
          <li>
            Everything animated is transform or opacity; blur values never
            animate.
          </li>
        </ul>
      </section>
    </article>
  );
}
