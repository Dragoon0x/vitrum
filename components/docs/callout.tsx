import { InfoIcon, LightbulbIcon, TriangleAlertIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const ICONS = {
  info: InfoIcon,
  tip: LightbulbIcon,
  warning: TriangleAlertIcon,
} as const;

export function Callout({
  kind = "info",
  children,
  className,
}: {
  kind?: keyof typeof ICONS;
  children: React.ReactNode;
  className?: string;
}) {
  const Icon = ICONS[kind];
  return (
    <aside
      data-glass=""
      data-material="film"
      className={cn(
        "flex items-start gap-3 rounded-pane px-4 py-3.5 text-sm leading-relaxed text-muted-foreground [&_code]:font-mono [&_code]:text-[0.8125rem] [&_code]:text-foreground",
        kind === "warning" &&
          "[--glass-tint-a:0.18] [--glass-tint-c:var(--warning)]",
        className,
      )}
    >
      <Icon
        className={cn(
          "mt-0.5 size-4 shrink-0",
          kind === "warning" ? "text-warning" : "text-primary",
        )}
      />
      <div>{children}</div>
    </aside>
  );
}
