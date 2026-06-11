"use client";

import { CircleCheckIcon, InfoIcon, TriangleAlertIcon } from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/vitrum/ui/alert";

export function AlertDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Alert>
        <InfoIcon />
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>
          The registry rebuilds on every deploy.
        </AlertDescription>
      </Alert>
      <Alert variant="success">
        <CircleCheckIcon />
        <AlertTitle>All routes static</AlertTitle>
        <AlertDescription>47 of 47 pages prerendered.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <TriangleAlertIcon />
        <AlertTitle>Contrast floor reached</AlertTitle>
        <AlertDescription>
          Tint alpha was clamped to keep text readable.
        </AlertDescription>
      </Alert>
    </div>
  );
}
