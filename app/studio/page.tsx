import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Material Studio",
  description: "Tune the glass material and export the result.",
};

export default function StudioPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-32">
      <h1 className="font-display text-3xl font-bold tracking-tight">
        Material Studio
      </h1>
      <p className="mt-3 text-muted-foreground">
        The studio is being calibrated.
      </p>
    </main>
  );
}
