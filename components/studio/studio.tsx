"use client";

import * as React from "react";
import { CodeIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useGlassEngine } from "@/registry/vitrum/hooks/use-glass-engine";
import { setGlassEngine } from "@/registry/vitrum/lib/glass-engine";
import { AuroraField } from "@/registry/vitrum/ui/aurora-field";
import { Button } from "@/registry/vitrum/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/vitrum/ui/dialog";
import { Glass, type GlassMaterial } from "@/registry/vitrum/ui/glass";
import { SegmentedControl } from "@/registry/vitrum/ui/segmented-control";
import { Slider } from "@/registry/vitrum/ui/slider";
import { Switch } from "@/registry/vitrum/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/vitrum/ui/tabs";

import { CopyButton } from "@/components/docs/copy-button";

const TINTS = [
  { id: "neutral", label: "Neutral", value: "var(--glass-tint)" },
  { id: "ion", label: "Ion", value: "var(--aurora-1)" },
  { id: "glacier", label: "Glacier", value: "var(--aurora-2)" },
  { id: "nova", label: "Nova", value: "var(--aurora-3)" },
  { id: "moss", label: "Moss", value: "var(--success)" },
] as const;

const REFRACTIONS = [
  { id: "none", label: "None" },
  { id: "vt-rf-pill-1", label: "Pill · subtle" },
  { id: "vt-rf-pill-2", label: "Pill · medium" },
  { id: "vt-rf-round-2", label: "Rounded · medium" },
  { id: "vt-rf-round-3", label: "Rounded · deep" },
  { id: "vt-rf-circle-2", label: "Circle · medium" },
  { id: "vt-rf-circle-3", label: "Circle · deep" },
  { id: "vt-rf-lens", label: "Lens · magnify" },
] as const;

const SCENES = [
  { id: "aurora", label: "Aurora" },
  { id: "dusk", label: "Dusk" },
  { id: "reef", label: "Reef" },
  { id: "grid", label: "Grid" },
] as const;

interface MaterialState {
  material: GlassMaterial;
  blur: number;
  tintAlpha: number;
  tint: (typeof TINTS)[number]["id"];
  refraction: (typeof REFRACTIONS)[number]["id"];
  radius: number;
  sheen: boolean;
}

const DEFAULTS: MaterialState = {
  material: "pane",
  blur: 16,
  tintAlpha: 0.14,
  tint: "neutral",
  refraction: "vt-rf-round-2",
  radius: 20,
  sheen: true,
};

function tintValue(id: MaterialState["tint"]): string {
  return TINTS.find((tint) => tint.id === id)?.value ?? "var(--glass-tint)";
}

function exportCss(state: MaterialState): string {
  const lines = [
    ".my-glass {",
    `  --glass-blur: ${state.blur}px;`,
    `  --glass-tint-c: ${tintValue(state.tint)};`,
    `  --glass-tint-a: ${state.tintAlpha};`,
  ];
  if (state.refraction !== "none") {
    lines.push(`  --glass-refract: url(#${state.refraction});`);
  }
  lines.push(`  --glass-radius: ${state.radius}px;`, "}");
  lines.push(
    "",
    `<div data-glass data-material="${state.material}" class="my-glass">…</div>`,
  );
  return lines.join("\n");
}

function exportJsx(state: MaterialState): string {
  const props = [
    `material="${state.material}"`,
    state.refraction !== "none" ? `refract="${state.refraction}"` : null,
    state.sheen ? "sheen" : null,
  ].filter(Boolean);
  return [
    `<Glass`,
    `  ${props.join("\n  ")}`,
    `  className="[--glass-blur:${state.blur}px] [--glass-tint-a:${state.tintAlpha}] [--glass-tint-c:${tintValue(state.tint).replaceAll(" ", "_")}]"`,
    `  style={{ "--glass-radius": "${state.radius}px" } as React.CSSProperties}`,
    `>`,
    `  …`,
    `</Glass>`,
  ].join("\n");
}

function Field({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium">{label}</span>
        {value ? (
          <span className="font-mono text-xs text-muted-foreground">
            {value}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

export function Studio() {
  const [state, setState] = React.useState<MaterialState>(DEFAULTS);
  const [scene, setScene] = React.useState<(typeof SCENES)[number]["id"]>("aurora");
  const engine = useGlassEngine();

  const patch = (next: Partial<MaterialState>) =>
    setState((current) => ({ ...current, ...next }));

  const subjectStyle = {
    "--glass-blur": `${state.blur}px`,
    "--glass-tint-a": state.tintAlpha,
    "--glass-tint-c": tintValue(state.tint),
    "--glass-radius": `${state.radius}px`,
    ...(state.refraction !== "none"
      ? { "--glass-refract": `url(#${state.refraction})` }
      : { "--glass-refract": "none" }),
  } as React.CSSProperties;

  return (
    <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
      {/* controls */}
      <Glass
        material="pane"
        className="flex h-fit flex-col gap-6 rounded-pane p-5 shadow-glass-md"
      >
        <Field label="Material">
          <SegmentedControl
            size="sm"
            value={state.material}
            onValueChange={(value) => patch({ material: value as GlassMaterial })}
            options={[
              { value: "film", label: "Film" },
              { value: "pane", label: "Pane" },
              { value: "slab", label: "Slab" },
              { value: "veil", label: "Veil" },
            ]}
            className="w-full"
          />
        </Field>

        <Field label="Frost" value={`${state.blur}px`}>
          <Slider
            value={[state.blur]}
            min={0}
            max={56}
            step={1}
            onValueChange={([blur]) => patch({ blur })}
            aria-label="Frost blur"
          />
        </Field>

        <Field label="Tint strength" value={state.tintAlpha.toFixed(2)}>
          <Slider
            value={[state.tintAlpha]}
            min={0}
            max={0.95}
            step={0.01}
            onValueChange={([tintAlpha]) => patch({ tintAlpha })}
            aria-label="Tint strength"
          />
        </Field>

        <Field label="Tint">
          <div role="radiogroup" aria-label="Tint color" className="flex gap-2.5">
            {TINTS.map((tint) => (
              <button
                key={tint.id}
                type="button"
                role="radio"
                aria-checked={state.tint === tint.id}
                aria-label={tint.label}
                title={tint.label}
                className={cn(
                  "vt-ring size-8 rounded-full border border-border outline-none transition-transform",
                  state.tint === tint.id && "scale-110 ring-2 ring-ring ring-offset-2 ring-offset-background",
                )}
                style={{ background: tint.value }}
                onClick={() => patch({ tint: tint.id })}
              />
            ))}
          </div>
        </Field>

        <Field label="Refraction">
          <div className="grid grid-cols-2 gap-1.5">
            {REFRACTIONS.map((refraction) => (
              <button
                key={refraction.id}
                type="button"
                aria-pressed={state.refraction === refraction.id}
                className={cn(
                  "vt-ring rounded-control px-2.5 py-1.5 text-left text-xs outline-none transition-colors",
                  state.refraction === refraction.id
                    ? "bg-primary/15 font-medium text-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                )}
                onClick={() => patch({ refraction: refraction.id })}
              >
                {refraction.label}
              </button>
            ))}
          </div>
          {engine !== "refract" ? (
            <p className="text-xs leading-relaxed text-muted-foreground">
              The {engine} engine is active — refraction presets apply only
              in the refract engine.
            </p>
          ) : null}
        </Field>

        <Field label="Radius" value={`${state.radius}px`}>
          <Slider
            value={[state.radius]}
            min={0}
            max={48}
            step={1}
            onValueChange={([radius]) => patch({ radius })}
            aria-label="Corner radius"
          />
        </Field>

        <Field label="Pointer sheen">
          <label className="flex items-center gap-3 text-sm text-muted-foreground">
            <Switch
              checked={state.sheen}
              onCheckedChange={(sheen) => patch({ sheen })}
            />
            light follows the pointer
          </label>
        </Field>

        <Field label="Engine">
          <SegmentedControl
            size="sm"
            value={engine}
            onValueChange={(value) =>
              setGlassEngine(value as "refract" | "frost" | "solid")
            }
            options={[
              { value: "refract", label: "Refract" },
              { value: "frost", label: "Frost" },
              { value: "solid", label: "Solid" },
            ]}
            className="w-full"
          />
          <button
            type="button"
            className="vt-ring w-fit rounded-control text-xs text-primary outline-none hover:underline"
            onClick={() => setGlassEngine(null)}
          >
            Reset to detection
          </button>
        </Field>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="accent" className="w-full">
              <CodeIcon /> Export
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Export material</DialogTitle>
              <DialogDescription>
                The same surface, three ways to carry it home.
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="css">
              <TabsList>
                <TabsTrigger value="css">CSS</TabsTrigger>
                <TabsTrigger value="jsx">Glass props</TabsTrigger>
              </TabsList>
              <TabsContent value="css">
                <ExportPane value={exportCss(state)} />
              </TabsContent>
              <TabsContent value="jsx">
                <ExportPane value={exportJsx(state)} />
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </Glass>

      {/* stage */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-end gap-1">
          {SCENES.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={scene === option.id}
              className={cn(
                "vt-ring rounded-pill px-3 py-1 text-xs outline-none transition-colors",
                scene === option.id
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              onClick={() => setScene(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div
          className={cn(
            "relative flex min-h-130 items-center justify-center overflow-clip rounded-sheet border border-border p-8",
            scene === "dusk" && "vt-scene-dusk",
            scene === "reef" && "vt-scene-reef",
            scene === "grid" && "vt-scene-grid",
          )}
        >
          {scene === "aurora" ? <AuroraField /> : null}
          <p
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center font-display text-[clamp(3rem,9vw,7rem)] font-bold tracking-tight text-foreground/85 select-none"
          >
            light bends
          </p>

          <Glass
            material={state.material}
            sheen={state.sheen}
            style={subjectStyle}
            className="relative flex h-52 w-80 max-w-full flex-col justify-between p-5 shadow-glass-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium capitalize">
                {state.material}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {state.blur}px · {state.tintAlpha.toFixed(2)}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Drag the surface knobs and watch the backdrop bend, frost,
              and tint through this pane.
            </p>
          </Glass>
        </div>
      </div>
    </div>
  );
}

function ExportPane({ value }: { value: string }) {
  return (
    <div className="relative mt-2 overflow-x-auto rounded-pane border border-border bg-surface-recessed/60 p-4">
      <div className="absolute top-2 right-2">
        <CopyButton value={value} />
      </div>
      <pre className="font-mono text-[0.8125rem] leading-relaxed whitespace-pre">
        {value}
      </pre>
    </div>
  );
}
