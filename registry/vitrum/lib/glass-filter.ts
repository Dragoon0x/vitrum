/**
 * Refraction filter builders.
 *
 * A displacement map is an image whose red channel moves backdrop pixels
 * along x and whose green channel moves them along y (128 = rest). The maps
 * built here keep the center of a surface at rest and bend only a bevel
 * band around the rim, so content behind the middle of a surface stays
 * legible while the edges bend light like thick glass.
 *
 * The map is two full-bleed gradients (one per axis) combined additively,
 * which keeps the field continuous — no seams at the corners.
 */

export type GlassShape = "pill" | "round" | "circle";

export type GlassIntensity = 1 | 2 | 3;

export interface GlassFilterSpec {
  /** id of the <filter> element, referenced as url(#id) */
  id: string;
  shape: GlassShape;
  /** displacement in px at the outermost rim */
  displace: number;
  /** blur folded into the same filter pass, px */
  blur: number;
  /** saturation boost folded into the same filter pass */
  saturate: number;
  /** split color channels for a prismatic fringe at the rim */
  aberration?: boolean;
}

/** Map canvas geometry per shape bucket. Stretched to fit via feImage. */
const SHAPE_CANVAS: Record<GlassShape, { w: number; h: number; bevel: number }> = {
  pill: { w: 320, h: 96, bevel: 30 },
  round: { w: 320, h: 200, bevel: 40 },
  circle: { w: 240, h: 240, bevel: 72 },
};

const DISPLACE_BY_INTENSITY: Record<GlassIntensity, number> = {
  1: 12,
  2: 22,
  3: 34,
};

/** Bevel profile: eased ramp from full deflection (rim) to rest (inner edge). */
function bevelStops(axis: "x" | "y", bevelFrac: number): string {
  // value = 128 + 127 * (1 - t)^2 across the bevel, mirrored on the far side
  const ease = (t: number) => Math.round(127 * (1 - t) * (1 - t));
  const at = (offset: number, deflect: number) => {
    const v = 128 + deflect;
    const rgb = axis === "x" ? `${v},0,0` : `0,${v},0`;
    return `<stop offset="${round(offset)}" stop-color="rgb(${rgb})"/>`;
  };
  return [
    at(0, ease(0)),
    at(bevelFrac * 0.35, ease(0.35)),
    at(bevelFrac * 0.7, ease(0.7)),
    at(bevelFrac, 0),
    at(1 - bevelFrac, 0),
    at(1 - bevelFrac * 0.7, -ease(0.7)),
    at(1 - bevelFrac * 0.35, -ease(0.35)),
    at(1, -ease(0)),
  ].join("");
}

function round(n: number): number {
  return Math.round(n * 1000) / 1000;
}

/**
 * Build the displacement map for a shape bucket as an SVG data URI.
 * Pure string work — safe to run on the server.
 */
export function buildDisplacementMap(shape: GlassShape): string {
  const { w, h, bevel } = SHAPE_CANVAS[shape];
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">` +
    `<linearGradient id="x" x1="0" y1="0" x2="1" y2="0">${bevelStops("x", bevel / w)}</linearGradient>` +
    `<linearGradient id="y" x1="0" y1="0" x2="0" y2="1">${bevelStops("y", bevel / h)}</linearGradient>` +
    `<rect width="${w}" height="${h}" fill="url(#x)"/>` +
    `<rect width="${w}" height="${h}" fill="url(#y)" style="mix-blend-mode:plus-lighter"/>` +
    `</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/** Isolate one color channel (keeping alpha) as an feColorMatrix values string. */
const CHANNEL_MATRIX = {
  r: "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0",
  g: "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0",
  b: "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0",
} as const;

/**
 * Build one <filter> definition string. The whole optical stack — bend,
 * soften, saturate — runs in a single backdrop-filter pass.
 */
export function buildRefractionFilter(spec: GlassFilterSpec): string {
  const map = buildDisplacementMap(spec.shape);
  const head =
    `<filter id="${spec.id}" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="sRGB">` +
    `<feImage href="${map}" x="0%" y="0%" width="100%" height="100%" preserveAspectRatio="none" result="map"/>`;

  const displaceStage = spec.aberration
    ? `<feDisplacementMap in="SourceGraphic" in2="map" scale="${round(spec.displace * 1.045)}" xChannelSelector="R" yChannelSelector="G" result="dr"/>` +
      `<feColorMatrix in="dr" type="matrix" values="${CHANNEL_MATRIX.r}" result="cr"/>` +
      `<feDisplacementMap in="SourceGraphic" in2="map" scale="${spec.displace}" xChannelSelector="R" yChannelSelector="G" result="dg"/>` +
      `<feColorMatrix in="dg" type="matrix" values="${CHANNEL_MATRIX.g}" result="cg"/>` +
      `<feDisplacementMap in="SourceGraphic" in2="map" scale="${round(spec.displace * 0.955)}" xChannelSelector="R" yChannelSelector="G" result="db"/>` +
      `<feColorMatrix in="db" type="matrix" values="${CHANNEL_MATRIX.b}" result="cb"/>` +
      `<feComposite in="cr" in2="cg" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="crg"/>` +
      `<feComposite in="crg" in2="cb" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="bent"/>`
    : `<feDisplacementMap in="SourceGraphic" in2="map" scale="${spec.displace}" xChannelSelector="R" yChannelSelector="G" result="bent"/>`;

  const finish =
    `<feGaussianBlur in="bent" stdDeviation="${spec.blur}" result="soft"/>` +
    `<feColorMatrix in="soft" type="saturate" values="${spec.saturate}"/>` +
    `</filter>`;

  return head + displaceStage + finish;
}

/**
 * The shipped preset matrix. Components reference these by id through the
 * --glass-refract custom property; <GlassDefs/> mounts them once.
 */
export const GLASS_FILTER_PRESETS: readonly GlassFilterSpec[] = [
  { id: "vt-rf-pill-1", shape: "pill", displace: DISPLACE_BY_INTENSITY[1], blur: 1.25, saturate: 1.5 },
  { id: "vt-rf-pill-2", shape: "pill", displace: DISPLACE_BY_INTENSITY[2], blur: 1.5, saturate: 1.55 },
  { id: "vt-rf-round-2", shape: "round", displace: DISPLACE_BY_INTENSITY[2], blur: 1.5, saturate: 1.55 },
  { id: "vt-rf-round-3", shape: "round", displace: DISPLACE_BY_INTENSITY[3], blur: 2, saturate: 1.6, aberration: true },
  { id: "vt-rf-circle-2", shape: "circle", displace: DISPLACE_BY_INTENSITY[2], blur: 1.5, saturate: 1.55 },
  { id: "vt-rf-circle-3", shape: "circle", displace: DISPLACE_BY_INTENSITY[3], blur: 2, saturate: 1.6, aberration: true },
];

export type GlassFilterId = (typeof GLASS_FILTER_PRESETS)[number]["id"];

/** All preset filter definitions, concatenated for <defs>. */
export function buildPresetDefs(): string {
  return GLASS_FILTER_PRESETS.map(buildRefractionFilter).join("");
}
