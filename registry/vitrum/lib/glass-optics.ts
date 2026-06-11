/**
 * Exact glass optics.
 *
 * The shipped SVG presets approximate a bevel with stretched gradients —
 * good enough for first paint, wrong at sharp corners and odd aspect
 * ratios. This module bakes the real thing on the client: a signed
 * distance field of the actual rounded-rect gives the bevel band and its
 * direction at every pixel, a height profile turns distance into slope,
 * and the slope becomes a refraction offset encoded into a PNG
 * displacement map (R = x, G = y, 128 = rest). The blue channel carries
 * a directional specular weight so the filter can paint a real glint.
 *
 * Geometry is symmetric, so only the top-left quadrant is computed; the
 * other three are written by flipping offsets. Maps are cached by
 * quantized geometry, so a thousand same-sized buttons share one filter.
 */

export interface OpticsParams {
  /** Element size in CSS px. */
  width: number;
  height: number;
  /** Corner radius in CSS px (uniform). */
  radius: number;
  /** How far the bevel reaches inward, px. */
  bevel: number;
  /** Maximum refraction displacement, px (feDisplacementMap scale). */
  depth: number;
  /** Bevel profile exponent: low = soft shoulder, high = hard rim. */
  curvature: number;
  /** 0..1 — RGB split at the rim. */
  aberration: number;
  /** Post-displacement blur, px. */
  blur: number;
  /** Saturation boost. */
  saturate: number;
  /** 0..1 — strength of the in-filter glint. */
  specular: number;
  /** Direction light arrives from, degrees (0 = +x, CCW, screen space). */
  lightAngle: number;
}

export const OPTICS_DEFAULTS: Omit<OpticsParams, "width" | "height" | "radius"> = {
  bevel: 24,
  depth: 22,
  curvature: 1.6,
  aberration: 0,
  blur: 1.5,
  saturate: 1.55,
  specular: 0.3,
  lightAngle: 135,
};

/** Longest map side, px — displacement fields stay smooth well below 1:1. */
const MAP_CAP = 288;

/** Pixel buffer backed by a plain ArrayBuffer (what ImageData accepts). */
export type PixelField = Uint8ClampedArray<ArrayBuffer>;

export function allocateField(mapW: number, mapH: number): PixelField {
  return new Uint8ClampedArray(new ArrayBuffer(mapW * mapH * 4));
}

/**
 * Signed distance from point (px,py) — relative to center — to a rounded
 * rectangle with half extents (hx,hy) and corner radius r. Negative
 * inside.
 */
function roundedRectSdf(
  px: number,
  py: number,
  hx: number,
  hy: number,
  r: number,
): number {
  const qx = Math.abs(px) - hx + r;
  const qy = Math.abs(py) - hy + r;
  const ox = Math.max(qx, 0);
  const oy = Math.max(qy, 0);
  return Math.hypot(ox, oy) + Math.min(Math.max(qx, qy), 0) - r;
}

/**
 * Compute the raw RGBA displacement field at an explicit pixel size.
 * R/G encode x/y offsets (128 = rest), B carries the specular weight.
 */
export function bakeDisplacementField(
  params: Pick<OpticsParams, "radius" | "bevel" | "curvature" | "lightAngle">,
  mapW: number,
  mapH: number,
  geometryScale: number,
): PixelField {
  const hx = mapW / 2;
  const hy = mapH / 2;
  const r = Math.min(params.radius * geometryScale, hx, hy);
  const bevel = Math.max(2, params.bevel * geometryScale);
  const curvature = Math.max(0.2, params.curvature);

  const lightRad = (params.lightAngle * Math.PI) / 180;
  const lx = Math.cos(lightRad);
  const ly = -Math.sin(lightRad); // screen y points down

  const qw = Math.ceil(mapW / 2);
  const qh = Math.ceil(mapH / 2);

  // Quadrant fields: inward offset (dx, dy in -1..1) and band strength.
  const fdx = new Float32Array(qw * qh);
  const fdy = new Float32Array(qw * qh);
  const fband = new Float32Array(qw * qh);

  const eps = 0.75;
  for (let y = 0; y < qh; y++) {
    const py = y + 0.5 - hy;
    for (let x = 0; x < qw; x++) {
      const px = x + 0.5 - hx;
      const sd = roundedRectSdf(px, py, hx, hy, r);
      if (sd >= 0 || sd < -bevel) continue; // outside, or flat interior

      const t = -sd / bevel; // 0 at rim → 1 at interior edge of band
      const slope = Math.pow(1 - t, curvature);

      // outward direction from the SDF gradient (central differences)
      const gx =
        roundedRectSdf(px + eps, py, hx, hy, r) -
        roundedRectSdf(px - eps, py, hx, hy, r);
      const gy =
        roundedRectSdf(px, py + eps, hx, hy, r) -
        roundedRectSdf(px, py - eps, hx, hy, r);
      const glen = Math.hypot(gx, gy) || 1;

      const i = y * qw + x;
      // refraction pulls the sample toward the interior
      fdx[i] = (-gx / glen) * slope;
      fdy[i] = (-gy / glen) * slope;
      fband[i] = slope;
    }
  }

  const data = allocateField(mapW, mapH);
  for (let y = 0; y < mapH; y++) {
    const qy = y < hy ? y : mapH - 1 - y;
    const flipY = y < hy ? 1 : -1;
    for (let x = 0; x < mapW; x++) {
      const qx = x < hx ? x : mapW - 1 - x;
      const flipX = x < hx ? 1 : -1;
      const qi = Math.min(qy, qh - 1) * qw + Math.min(qx, qw - 1);

      const dx = fdx[qi] * flipX;
      const dy = fdy[qi] * flipY;
      const band = fband[qi];

      // specular: outward-facing normal against the light direction,
      // tightened so the glint reads as one continuous rim streak
      let spec = 0;
      if (band > 0.02) {
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dx / len;
        const ny = -dy / len;
        const facing = Math.max(0, nx * lx + ny * ly);
        spec = facing * facing * facing * Math.pow(band, 1.5);
      }

      const o = (y * mapW + x) * 4;
      data[o] = Math.round(128 + dx * 127);
      data[o + 1] = Math.round(128 + dy * 127);
      data[o + 2] = Math.round(spec * 255);
      data[o + 3] = 255;
    }
  }

  return data;
}

export function fieldToDataUri(
  data: PixelField,
  mapW: number,
  mapH: number,
): string {
  const canvas = document.createElement("canvas");
  canvas.width = mapW;
  canvas.height = mapH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2d canvas unavailable");
  ctx.putImageData(new ImageData(data, mapW, mapH), 0, 0);
  return canvas.toDataURL("image/png");
}

/**
 * Bake the displacement map for one element. Returns a PNG data URI
 * sized (mapW × mapH), meant to be stretched over the element with
 * preserveAspectRatio="none".
 */
export function bakeDisplacementMap(params: OpticsParams): {
  href: string;
  mapW: number;
  mapH: number;
} {
  const { width, height } = params;
  const scale = Math.min(1, MAP_CAP / Math.max(width, height));
  const mapW = Math.max(8, Math.round(width * scale));
  const mapH = Math.max(8, Math.round(height * scale));
  const data = bakeDisplacementField(params, mapW, mapH, scale);
  return { href: fieldToDataUri(data, mapW, mapH), mapW, mapH };
}

const CHANNEL_KEEP = {
  r: "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0",
  g: "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0",
  b: "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0",
} as const;

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Assemble the full filter definition around a baked map. The chain is:
 * displace (optionally per channel) → soften → saturate → glint.
 */
export function buildExactFilter(
  id: string,
  mapHref: string,
  params: OpticsParams,
): string {
  const { depth, aberration, blur, saturate, specular } = params;

  const head =
    `<filter id="${id}" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="sRGB">` +
    `<feImage href="${mapHref}" x="0%" y="0%" width="100%" height="100%" preserveAspectRatio="none" result="map"/>`;

  const displace =
    aberration > 0.01
      ? `<feDisplacementMap in="SourceGraphic" in2="map" scale="${round2(depth * (1 + aberration * 0.08))}" xChannelSelector="R" yChannelSelector="G" result="dr"/>` +
        `<feColorMatrix in="dr" type="matrix" values="${CHANNEL_KEEP.r}" result="cr"/>` +
        `<feDisplacementMap in="SourceGraphic" in2="map" scale="${round2(depth)}" xChannelSelector="R" yChannelSelector="G" result="dg"/>` +
        `<feColorMatrix in="dg" type="matrix" values="${CHANNEL_KEEP.g}" result="cg"/>` +
        `<feDisplacementMap in="SourceGraphic" in2="map" scale="${round2(depth * (1 - aberration * 0.08))}" xChannelSelector="R" yChannelSelector="G" result="db"/>` +
        `<feColorMatrix in="db" type="matrix" values="${CHANNEL_KEEP.b}" result="cb"/>` +
        `<feComposite in="cr" in2="cg" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="crg"/>` +
        `<feComposite in="crg" in2="cb" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="bent"/>`
      : `<feDisplacementMap in="SourceGraphic" in2="map" scale="${round2(depth)}" xChannelSelector="R" yChannelSelector="G" result="bent"/>`;

  const finish =
    `<feGaussianBlur in="bent" stdDeviation="${round2(blur)}" result="soft"/>` +
    `<feColorMatrix in="soft" type="saturate" values="${round2(saturate)}" result="toned"/>`;

  const glint =
    specular > 0.01
      ? `<feColorMatrix in="map" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 ${round2(specular)} 0 0" result="glint"/>` +
        `<feComposite in="glint" in2="toned" operator="over"/>`
      : `<feMerge><feMergeNode in="toned"/></feMerge>`;

  return head + displace + finish + glint + `</filter>`;
}

/** Quantize geometry so near-identical elements share one filter. */
export function opticsKey(params: OpticsParams): string {
  const q = (n: number, step: number) => Math.round(n / step) * step;
  return [
    q(params.width, 8),
    q(params.height, 8),
    q(params.radius, 2),
    q(params.bevel, 2),
    q(params.depth, 2),
    round2(params.curvature),
    round2(params.aberration),
    round2(params.blur),
    round2(params.saturate),
    round2(params.specular),
    Math.round(params.lightAngle),
  ].join("_");
}
