"use client";

import * as React from "react";
import { ArrowUpRightIcon } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
} from "@/registry/vitrum/ui/avatar";
import { Badge } from "@/registry/vitrum/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/vitrum/ui/card";
import { Gauge } from "@/registry/vitrum/ui/gauge";
import { Progress, ProgressRing } from "@/registry/vitrum/ui/progress";
import { SegmentedControl } from "@/registry/vitrum/ui/segmented-control";

const ACTIVITY = [
  { who: "NL", what: "Shipped the onboarding flow", status: "Deployed", variant: "success" as const },
  { who: "RX", what: "Rotated the access tokens", status: "Security", variant: "accent" as const },
  { who: "AD", what: "Raised the contrast floors", status: "Review", variant: "warning" as const },
];

/**
 * Operations panel: liquid meters, a sliding period control, and an
 * activity feed — all floating over whatever the page provides.
 */
export function GlassDashboard() {
  const [period, setPeriod] = React.useState("week");

  return (
    <div className="flex w-full max-w-3xl flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-lg font-semibold tracking-tight">
          Operations
        </h2>
        <SegmentedControl
          size="sm"
          value={period}
          onValueChange={setPeriod}
          options={[
            { value: "day", label: "Day" },
            { value: "week", label: "Week" },
            { value: "month", label: "Month" },
          ]}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="items-center gap-3 py-5">
          <CardHeader className="items-center px-5">
            <CardTitle className="text-sm">Reservoir</CardTitle>
          </CardHeader>
          <CardContent className="px-5">
            <Gauge value={72} label="Capacity" className="size-28" />
          </CardContent>
        </Card>

        <Card className="gap-3 py-5">
          <CardHeader className="px-5">
            <CardTitle className="text-sm">Build minutes</CardTitle>
            <CardDescription>418 of 600 used</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 items-center justify-center px-5">
            <ProgressRing value={70} size={88} thickness={8} />
          </CardContent>
        </Card>

        <Card className="gap-3 py-5">
          <CardHeader className="px-5">
            <CardTitle className="text-sm">Rollout</CardTitle>
            <CardDescription>Canary at 35%</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-center gap-4 px-5">
            <Progress value={35} aria-label="Rollout progress" />
            <p className="text-xs text-muted-foreground">
              Holding for error budget · auto-resumes 14:00
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Activity</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3.5">
          {ACTIVITY.map((entry) => (
            <div key={entry.what} className="flex items-center gap-3">
              <Avatar className="size-8">
                <AvatarFallback className="text-[0.625rem]">
                  {entry.who}
                </AvatarFallback>
              </Avatar>
              <p className="min-w-0 flex-1 truncate text-sm">{entry.what}</p>
              <Badge variant={entry.variant}>{entry.status}</Badge>
              <ArrowUpRightIcon className="size-3.5 text-muted-foreground" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
