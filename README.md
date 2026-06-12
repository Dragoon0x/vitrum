# Vitrum

**Designed in glass.** Thirty React components cast in a refractive material — light bends at every edge, frost where the compositor says no, and solid surfaces the moment someone asks for them.

Vitrum is a component registry, not a package: components land in your project as source files you own, with the material system traveling alongside the first one you install.

## Quick start

```bash
# in a Tailwind v4 project initialized with the shadcn CLI
npx shadcn@latest add https://vitrumui.vercel.app/r/button.json
```

Then import the stylesheet once in your global CSS (after Tailwind):

```css
@import "tailwindcss";
@import "../vitrum.css";
```

And enable refraction by mounting the root once at the top of `<body>`:

```tsx
import { GlassRoot } from "@/components/ui/glass-root";

<body>
  <GlassRoot />
  {children}
</body>
```

Prefer a namespace? Add to `components.json`:

```json
{ "registries": { "@vitrum": "https://vitrumui.vercel.app/r/{name}.json" } }
```

then `shadcn add @vitrum/dialog` — works for you and for AI editors via `shadcn mcp`.

## The material

Every surface renders through one of three engines, resolved before first paint and carried as an attribute on `<html>`:

| Engine | What happens | Where |
| --- | --- | --- |
| `refract` | SVG displacement bends the backdrop at every rim, in one compositor pass | Chromium-family browsers |
| `frost` | Tuned blur + saturation with the same specular details | Safari, Firefox, no-JS |
| `solid` | Opaque surfaces, structure and focus intact | `prefers-reduced-transparency` |

Force an engine with `?glass=frost|solid|refract`; reset with `?glass=auto`.

Four material weights — `film`, `pane`, `slab`, `veil` — share the optical system. Veil (dialogs, sheets, menus) never refracts: overlay-scale displacement is where frame budgets die. Glass nested in glass automatically laminates to a single backdrop pass.

## Theming

Every knob is a custom property, overridable per instance:

| Token | Controls |
| --- | --- |
| `--glass-blur` | frost radius |
| `--glass-tint-c` / `--glass-tint-a` | tint color and strength |
| `--glass-refract` | refraction preset (`url(#…)`) |
| `--glass-radius` | corner radius |
| `--glass-edge` / `--glass-sheen` | specular ring and pointer light |

Tune them live in the [Material Studio](https://vitrumui.vercel.app/studio) and export CSS or component props.

## Accessibility

Two-layer focus indicators readable over any backdrop; contrast floors per material; `prefers-reduced-motion` pauses ambient drift and collapses springs to fades; `prefers-reduced-transparency` switches the whole system to solid surfaces; behavior comes from hardened headless primitives — focus trapping, roving tab stops, typeahead — never hand-rolled.

## Development

```bash
pnpm install
pnpm dev        # site + registry on :3000
pnpm verify     # typecheck + lint + registry build + validation + production build
```

The registry serves from `public/r` (built by `shadcn build`) and validates against nine gates — manifest shape, file integrity, export naming, dependency resolution, orphan detection, brand hygiene, and animation safety — before every build.

Deploying? Set `NEXT_PUBLIC_SITE_URL` to your origin; install commands, the sitemap, and `llms.txt` follow it.

## License

MIT — see [LICENSE](./LICENSE).
