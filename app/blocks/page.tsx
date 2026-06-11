import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blocks",
  description: "Composed sections built from Vitrum components.",
};

export default function BlocksPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-32">
      <h1 className="font-display text-3xl font-bold tracking-tight">
        Blocks
      </h1>
      <p className="mt-3 text-muted-foreground">
        Composed sections are being assembled.
      </p>
    </main>
  );
}
