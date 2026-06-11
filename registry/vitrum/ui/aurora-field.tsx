import { cn } from "@/lib/utils";

const NOISE_TILE =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`,
  );

/**
 * Ambient gradient field — three drifting light blobs over the page
 * background, with a static noise tile to prevent banding. Zero
 * JavaScript; drift pauses under prefers-reduced-motion. Position it via
 * className (defaults to filling the nearest positioned ancestor).
 */
export function AuroraField({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div aria-hidden="true" className={cn("vt-aurora", className)} {...props}>
      <div className="vt-aurora-blob" />
      <div className="vt-aurora-blob" />
      <div className="vt-aurora-blob" />
      <div
        className="vt-aurora-noise"
        style={{ backgroundImage: `url("${NOISE_TILE}")` }}
      />
    </div>
  );
}
