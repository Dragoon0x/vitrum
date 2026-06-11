"use client";

import { Button } from "@/registry/vitrum/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/vitrum/ui/tooltip";

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="film">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>A film of glass naming things.</TooltipContent>
    </Tooltip>
  );
}
