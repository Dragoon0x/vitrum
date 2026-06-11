"use client";

import * as React from "react";
import { CodeIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useGlassEngine } from "@/registry/vitrum/hooks/use-glass-engine";
import { setGlassEngine } from "@/registry/vitrum/lib/glass-engine";
import { requestOpticsRefresh } from "@/registry/vitrum/lib/optics-manager";
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
import {
  GlassScene,
  GlassSceneBackdrop,
  GlassSceneLens,
} from "@/registry/vitrum/ui/glass-scene";
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
  depth: number;
  curvature: number;
  chroma: number;
  specular: number;
  radius: number;
  sheen: boolean;
}

const DEFAULTS: MaterialState = {
  material: "pane",
  blur: 10,
  tintAlpha: 0.14,
  tint: "neutral",
  depth: 24,
  curvature: 1.6,
  chroma: 0.3,
  specular: 0.4,
  radius: 20,
  sheen: true,
};

function tintValue(id: MaterialState["tint"]): string {
  return TINTS.find((tint) => tint.id === id)?.value ?? "var(--glass-tint)";
}

function exportCss(state: MaterialState): string {
  return [
    ".my-glass {",
    `  --glass-blur: ${state.blur}px;`,
    `  --glass-tint-c: ${tintValue(state.tint)};`,
    `  --glass-tint-a: ${state.tintAlpha};`,
    `  --glass-depth: ${state.depth};`,
    `  --glass-curve: ${state.curvature};`,
    `  --glass-chroma: ${state.chroma};`,
    `  --glass-spec: ${state.specular};`,
    `  --glass-radius: ${state.radius}px;`,
    "}",
    "",
    `<div data-glass data-material="${state.material}" class="my-glass">…</div>`,
  ].join("\n");
}

function exportJsx(state: MaterialState): string {
  const props = [`material="${state.material}"`, state.sheen ? "sheen" : null].filter(
    Boolean,
  );
  return [
    `<Glass`,
    `  ${props.join("\n  ")}`,
    `  className="[--glass-blur:${state.blur}px] [--glass-tint-a:${state.tintAlpha}] [--glass-depth:${state.depth}] [--glass-curve:${state.curvature}] [--glass-chroma:${state.chroma}] [--glass-spec:${state.specular}]"`,
    `  style={{ "--glass-radius": "${state.radius}px", "--glass-tint-c": "${tintValue(state.tint)}" } as React.CSSProperties}`,
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

function Knob({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (next: number) => void;
}) {
  return (
    <Field label={label} value={display}>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([next]) => onChange(next)}
        aria-label={label}
      />
    </Field>
  );
}

export function Studio() {
  const [state, setState] = React.useState<MaterialState>(DEFAULTS);
  const [scene, setScene] = React.useState<(typeof SCENES)[number]["id"]>("aurora");
  const engine = useGlassEngine();
  const subjectRef = React.useRef<HTMLDivElement | null>(null);

  const patch = (next: Partial<MaterialState>) =>
    setState((current) => ({ ...current, ...next }));

  // exact optics re-bake when any knob moves (refract engine)
  React.useEffect(() => {
    requestOpticsRefresh(subjectRef.current);
  }, [state]);

  const subjectStyle = {
    "--glass-blur": `${state.blur}px`,
    "--glass-tint-a": state.tintAlpha,
    "--glass-tint-c": tintValue(state.tint),
    "--glass-radius": `${state.radius}px`,
    "--glass-depth": state.depth,
    "--glass-curve": state.curvature,
    "--glass-chroma": state.chroma,
    "--glass-spec": state.specular,
    "--glass-soften": Math.round((state.blur / 12) * 100) / 100,
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

        <Knob
          label="Frost"
          value={state.blur}
          display={`${state.blur}px`}
          min={0}
          max={56}
          step={1}
          onChange={(blur) => patch({ blur })}
        />

        <Knob
          label="Tint strength"
          value={state.tintAlpha}
          display={state.tintAlpha.toFixed(2)}
          min={0}
          max={0.95}
          step={0.01}
          onChange={(tintAlpha) => patch({ tintAlpha })}
        />

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
                  "vt-ring size-8 rounded-full border border-border transition-transform",
                  state.tint === tint.id &&
                    "scale-110 ring-2 ring-ring ring-offset-2 ring-offset-background",
                )}
                style={{ background: tint.value }}
                onClick={() => patch({ tint: tint.id })}
              />
            ))}
          </div>
        </Field>

        <Knob
          label="Depth"
          value={state.depth}
          display={`${state.depth}px`}
          min={0}
          max={56}
          step={1}
          onChange={(depth) => patch({ depth })}
        />

        <Knob
          label="Curvature"
          value={state.curvature}
          display={state.curvature.toFixed(1)}
          min={0.4}
          max={3.2}
          step={0.1}
          onChange={(curvature) => patch({ curvature })}
        />

        <Knob
          label="Chroma"
          value={state.chroma}
          display={state.chroma.toFixed(2)}
          min={0}
          max={1}
          step={0.01}
          onChange={(chroma) => patch({ chroma })}
        />

        <Knob
          label="Glint"
          value={state.specular}
          display={state.specular.toFixed(2)}
          min={0}
          max={1}
          step={0.01}
          onChange={(specular) => patch({ specular })}
        />

        <Knob
          label="Radius"
          value={state.radius}
          display={`${state.radius}px`}
          min={0}
          max={48}
          step={1}
          onChange={(radius) => patch({ radius })}
        />

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
          <p className="text-xs leading-relaxed text-muted-foreground">
            {engine === "refract"
              ? "Backdrop displacement, baked per geometry."
              : engine === "frost"
                ? "The stage bends through the scene bridge here."
                : "Opaque surfaces; bending is off."}
          </p>
          <button
            type="button"
            className="vt-ring w-fit rounded-control text-xs text-glint hover:underline"
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
                The same surface, two ways to carry it home.
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
                "vt-ring rounded-pill px-3 py-1 text-xs transition-colors",
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

        <GlassScene
          className={cn(
            "min-h-130 overflow-clip rounded-sheet border border-border",
            scene === "dusk" && "vt-scene-dusk",
            scene === "reef" && "vt-scene-reef",
            scene === "grid" && "vt-scene-grid",
          )}
        >
          <GlassSceneBackdrop className="absolute inset-0">
            {scene === "aurora" ? <AuroraField /> : null}
            <p
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center font-display text-[clamp(3rem,9vw,7rem)] font-bold tracking-tight text-foreground/85 select-none"
            >
              light bends
            </p>
          </GlassSceneBackdrop>

          <div className="relative flex min-h-130 items-center justify-center p-8">
            <GlassSceneLens
              depth={state.depth}
              curvature={state.curvature}
              specular={state.specular}
              radius={state.radius}
              bevel={Math.max(12, Math.min(44, 16 + state.depth * 0.7))}
            >
              <Glass
                ref={subjectRef}
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
                    {state.depth}px · {state.curvature.toFixed(1)}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Drag the surface knobs and watch the backdrop bend, frost,
                  and tint through this pane.
                </p>
              </Glass>
            </GlassSceneLens>
          </div>
        </GlassScene>
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
