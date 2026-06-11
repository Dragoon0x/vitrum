import { GlassAuth } from "@/registry/vitrum/blocks/glass-auth";
import { GlassDashboard } from "@/registry/vitrum/blocks/glass-dashboard";
import { GlassLauncher } from "@/registry/vitrum/blocks/glass-launcher";
import { GlassPlayer } from "@/registry/vitrum/blocks/glass-player";

export interface BlockDef {
  slug: string;
  title: string;
  description: string;
  registryItem: string;
  file: `registry/vitrum/blocks/${string}.tsx`;
  component: React.ComponentType;
}

export const BLOCKS: BlockDef[] = [
  {
    slug: "glass-launcher",
    title: "Launcher",
    description:
      "A workspace shell made entirely of glass — bar, palette, and dock over any scenery.",
    registryItem: "glass-launcher",
    file: "registry/vitrum/blocks/glass-launcher.tsx",
    component: GlassLauncher,
  },
  {
    slug: "glass-dashboard",
    title: "Dashboard",
    description:
      "Operations panel with liquid meters, a sliding period control, and an activity feed.",
    registryItem: "glass-dashboard",
    file: "registry/vitrum/blocks/glass-dashboard.tsx",
    component: GlassDashboard,
  },
  {
    slug: "glass-player",
    title: "Player",
    description:
      "A media player with artwork under a magnifying lens and a glass-thumbed scrubber.",
    registryItem: "glass-player",
    file: "registry/vitrum/blocks/glass-player.tsx",
    component: GlassPlayer,
  },
  {
    slug: "glass-auth",
    title: "Auth",
    description:
      "Sign-in pane — recessed fields, an accent action, and a passkey alternative.",
    registryItem: "glass-auth",
    file: "registry/vitrum/blocks/glass-auth.tsx",
    component: GlassAuth,
  },
];

export function getBlock(slug: string): BlockDef | undefined {
  return BLOCKS.find((block) => block.slug === slug);
}
