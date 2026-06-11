"use client";

import * as React from "react";
import {
  PauseIcon,
  PlayIcon,
  Repeat2Icon,
  ShuffleIcon,
  SkipBackIcon,
  SkipForwardIcon,
  Volume2Icon,
} from "lucide-react";

import { Button } from "@/registry/vitrum/ui/button";
import { Glass } from "@/registry/vitrum/ui/glass";
import { Lens } from "@/registry/vitrum/ui/lens";
import { Slider } from "@/registry/vitrum/ui/slider";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

const TRACK_LENGTH = 254;

/**
 * Media player: artwork under a magnifying lens, a glass-thumbed
 * scrubber, and a pill transport.
 */
export function GlassPlayer() {
  const [playing, setPlaying] = React.useState(true);
  const [position, setPosition] = React.useState(96);

  return (
    <Glass
      material="slab"
      className="w-full max-w-sm rounded-sheet p-6 shadow-glass-lg"
    >
      <div className="flex flex-col gap-5">
        <div className="relative aspect-square w-full overflow-clip rounded-pane bg-[radial-gradient(80%_80%_at_25%_20%,var(--aurora-1),transparent_60%),radial-gradient(70%_70%_at_80%_35%,var(--aurora-2),transparent_65%),radial-gradient(90%_80%_at_50%_100%,var(--aurora-3),transparent_70%)]">
          <div className="absolute inset-0 grid place-items-center">
            <p className="font-display text-5xl font-bold tracking-tight text-background/80 select-none">
              IX
            </p>
          </div>
          <Lens size={120} />
        </div>

        <div className="flex flex-col gap-0.5">
          <p className="font-display text-base font-semibold tracking-tight">
            Meridian Nine
          </p>
          <p className="text-sm text-muted-foreground">Low Tide Collective</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <Slider
            value={[position]}
            max={TRACK_LENGTH}
            onValueChange={([next]) => setPosition(next)}
            aria-label="Seek"
          />
          <div className="flex justify-between font-mono text-[0.6875rem] text-muted-foreground">
            <span>{formatTime(position)}</span>
            <span>−{formatTime(TRACK_LENGTH - position)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" size="icon-sm" aria-label="Shuffle">
            <ShuffleIcon />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Previous track">
            <SkipBackIcon />
          </Button>
          <Button
            variant="accent"
            size="icon-lg"
            aria-label={playing ? "Pause" : "Play"}
            aria-pressed={playing}
            onClick={() => setPlaying((value) => !value)}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </Button>
          <Button variant="ghost" size="icon" aria-label="Next track">
            <SkipForwardIcon />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Repeat">
            <Repeat2Icon />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Volume2Icon className="size-4 shrink-0 text-muted-foreground" />
          <Slider defaultValue={[65]} aria-label="Volume" />
        </div>
      </div>
    </Glass>
  );
}
