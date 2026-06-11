import { cn } from "@/lib/utils";

/**
 * The mark is a lens: a squircle of glass over a V, with the portion seen
 * through the lens refracted — shifted and re-colored.
 */
export function LogoMark({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={cn("size-7", className)}
      {...props}
    >
      <defs>
        <linearGradient id="vt-logo-rim" x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--aurora-1)" />
          <stop offset="1" stopColor="var(--aurora-2)" />
        </linearGradient>
        <linearGradient id="vt-logo-bend" x1="22" y1="22" x2="46" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--aurora-1)" />
          <stop offset="1" stopColor="var(--aurora-3)" />
        </linearGradient>
        <radialGradient id="vt-logo-fill" cx="0.32" cy="0.22" r="1">
          <stop stopColor="var(--aurora-1)" stopOpacity="0.14" />
          <stop offset="1" stopColor="var(--aurora-1)" stopOpacity="0.02" />
        </radialGradient>
        <clipPath id="vt-logo-lens">
          <circle cx="32" cy="32" r="13" />
        </clipPath>
      </defs>

      <rect x="4" y="4" width="56" height="56" rx="18" fill="url(#vt-logo-fill)" stroke="url(#vt-logo-rim)" strokeWidth="3" />

      <path
        d="M20 20 L32 46 L44 20"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g clipPath="url(#vt-logo-lens)">
        <rect x="19" y="19" width="26" height="26" fill="var(--background)" fillOpacity="0.55" />
        <path
          d="M22.5 22.5 L34.5 48.5 L46.5 22.5"
          stroke="url(#vt-logo-bend)"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <circle cx="32" cy="32" r="13" stroke="oklch(1 0 0 / 0.35)" strokeWidth="1" />
      <path
        d="M22.6 26.4 A 11 11 0 0 1 27.2 21.6"
        stroke="oklch(1 0 0 / 0.6)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("inline-flex items-center gap-2.5 text-foreground", className)}
      {...props}
    >
      <LogoMark />
      <span className="font-display text-lg font-semibold tracking-tight">
        vitrum
      </span>
    </span>
  );
}
