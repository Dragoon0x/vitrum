/**
 * Glass engine detection.
 *
 * Every surface renders through one of three engines, carried as an
 * attribute on <html> so all differences stay in CSS:
 *
 *  - "refract" — SVG displacement refraction via backdrop-filter: url().
 *                Requires a Chromium compositor; detected via UA client
 *                hints because CSS.supports() reports false positives for
 *                SVG filter functions in backdrop-filter.
 *  - "frost"   — blur + saturation backdrop. Default everywhere else and
 *                the no-JS baseline.
 *  - "solid"   — opaque surfaces for prefers-reduced-transparency.
 *
 * Resolution order: explicit override (?glass= query or stored choice)
 * → reduced-transparency → capability detection.
 */

export type GlassEngine = "refract" | "frost" | "solid";

export const GLASS_ENGINE_ATTR = "data-glass-engine";

export const GLASS_ENGINE_STORAGE_KEY = "vitrum-glass";

export const GLASS_ENGINES: readonly GlassEngine[] = ["refract", "frost", "solid"];

/**
 * Pre-paint engine resolution, inlined into <head> by <GlassRoot/> so the
 * attribute exists before first paint. Keep this dependency-free and inert
 * on failure (falls back to "frost").
 */
export const glassEngineScript = `(function(){var d=document.documentElement;try{var q=null;try{q=new URLSearchParams(location.search).get("glass")}catch(e){}var s=null;try{s=localStorage.getItem("${GLASS_ENGINE_STORAGE_KEY}")}catch(e){}var ok=function(v){return v==="refract"||v==="frost"||v==="solid"};var v=null;if(q==="auto"){try{localStorage.removeItem("${GLASS_ENGINE_STORAGE_KEY}")}catch(e){}}else if(ok(q)){v=q;try{localStorage.setItem("${GLASS_ENGINE_STORAGE_KEY}",q)}catch(e){}}else if(ok(s)){v=s}if(!v){if(matchMedia("(prefers-reduced-transparency: reduce)").matches){v="solid"}else{var b=navigator.userAgentData&&navigator.userAgentData.brands;var c=false;if(b){for(var i=0;i<b.length;i++){if(b[i].brand==="Chromium"){c=true;break}}}v=c?"refract":"frost"}}d.setAttribute("${GLASS_ENGINE_ATTR}",v)}catch(e){d.setAttribute("${GLASS_ENGINE_ATTR}","frost")}})()`;

function isGlassEngine(value: unknown): value is GlassEngine {
  return value === "refract" || value === "frost" || value === "solid";
}

/** Detection only — ignores overrides. Safe to call in any environment. */
export function detectGlassEngine(): GlassEngine {
  if (typeof window === "undefined") return "frost";
  try {
    if (window.matchMedia("(prefers-reduced-transparency: reduce)").matches) {
      return "solid";
    }
    const data = (navigator as Navigator & {
      userAgentData?: { brands?: { brand: string }[] };
    }).userAgentData;
    return data?.brands?.some((b) => b.brand === "Chromium") ? "refract" : "frost";
  } catch {
    return "frost";
  }
}

/** Read the explicit override, if one is stored. */
export function getStoredGlassEngine(): GlassEngine | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(GLASS_ENGINE_STORAGE_KEY);
    return isGlassEngine(stored) ? stored : null;
  } catch {
    return null;
  }
}

/** Current engine as rendered (reads the <html> attribute). */
export function getGlassEngine(): GlassEngine {
  if (typeof document === "undefined") return "frost";
  const attr = document.documentElement.getAttribute(GLASS_ENGINE_ATTR);
  return isGlassEngine(attr) ? attr : "frost";
}

/**
 * Apply an engine choice. Pass an engine to pin it, or null to clear the
 * override and fall back to detection.
 */
export function setGlassEngine(engine: GlassEngine | null): void {
  if (typeof document === "undefined") return;
  try {
    if (engine) {
      window.localStorage.setItem(GLASS_ENGINE_STORAGE_KEY, engine);
    } else {
      window.localStorage.removeItem(GLASS_ENGINE_STORAGE_KEY);
    }
  } catch {
    // storage may be unavailable; the attribute below still applies
  }
  document.documentElement.setAttribute(GLASS_ENGINE_ATTR, engine ?? detectGlassEngine());
}
