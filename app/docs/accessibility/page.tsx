import type { Metadata } from "next";

import { PageHeader } from "@/components/docs/page-header";
import { Callout } from "@/components/docs/callout";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Focus, contrast, and motion commitments.",
};

const COMMITMENTS = [
  {
    title: "Focus is never just the rim",
    body: "Every interactive component carries a two-layer focus indicator: a 2px accent outline offset from the control, designed to read against any backdrop the glass floats over. The glass rim alone is never the focus signal.",
  },
  {
    title: "Contrast has floors",
    body: "Each material sets a minimum tint opacity so text never sits on raw backdrop. Semantic variants (accent, destructive, success) raise the tint to near-opaque before placing light text on it.",
  },
  {
    title: "Motion asks permission",
    body: "prefers-reduced-motion pauses the aurora drift, collapses overlay springs to opacity fades, flattens the dock, and removes the lens entirely. Nothing essential is conveyed by motion alone.",
  },
  {
    title: "Transparency asks permission",
    body: "prefers-reduced-transparency switches the whole system to the solid engine: opaque surfaces, no backdrop filters, structure intact.",
  },
  {
    title: "Behavior is borrowed, not improvised",
    body: "Dialogs trap and return focus. Menus, selects, tabs, sliders, and accordions follow established keyboard patterns — arrow-key roving, typeahead, Escape, Home and End — provided by hardened headless primitives rather than hand-rolled event handlers.",
  },
  {
    title: "Decoration is hidden",
    body: "The aurora field, the lens, sheens, and filter definitions are aria-hidden. Meters and progress announce real values; toasts are polite live regions.",
  },
] as const;

export default function AccessibilityPage() {
  return (
    <article className="flex flex-col gap-10">
      <PageHeader
        title="Accessibility"
        description="Translucency is a rendering choice, not an excuse. These are the commitments every component is built against."
      />

      <section className="grid gap-4 sm:grid-cols-2">
        {COMMITMENTS.map((commitment) => (
          <div
            key={commitment.title}
            className="flex flex-col gap-2 rounded-pane border border-border p-5"
          >
            <h2 className="font-display text-base font-semibold tracking-tight">
              {commitment.title}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {commitment.body}
            </p>
          </div>
        ))}
      </section>

      <Callout kind="tip">
        Testing an engine? Append <code>?glass=solid</code> to any URL to
        preview the reduced-transparency rendering without changing system
        settings.
      </Callout>
    </article>
  );
}
