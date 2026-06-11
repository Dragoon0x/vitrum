"use client";

import { Button } from "@/registry/vitrum/ui/button";
import { Toaster, toast } from "@/registry/vitrum/ui/toaster";

export function ToasterDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Toaster />
      <Button
        variant="film"
        onClick={() =>
          toast("Draft saved", { description: "Synced to the workspace." })
        }
      >
        Default
      </Button>
      <Button
        variant="film"
        onClick={() => toast.success("Build passing", { description: "47 routes prerendered." })}
      >
        Success
      </Button>
      <Button
        variant="film"
        onClick={() =>
          toast.error("Contrast floor reached", {
            description: "Tint alpha was clamped.",
            action: { label: "Review", onClick: () => {} },
          })
        }
      >
        Error
      </Button>
    </div>
  );
}
