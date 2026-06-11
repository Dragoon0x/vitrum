"use client";

import * as React from "react";
import Link from "next/link";
import type { Route } from "next";
import {
  FolderIcon,
  MailIcon,
  TerminalIcon,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/registry/vitrum/ui/avatar";
import { Badge } from "@/registry/vitrum/ui/badge";
import { Button } from "@/registry/vitrum/ui/button";
import { Checkbox } from "@/registry/vitrum/ui/checkbox";
import { Dock, DockItem } from "@/registry/vitrum/ui/dock";
import { Gauge } from "@/registry/vitrum/ui/gauge";
import { Input } from "@/registry/vitrum/ui/input";
import { ProgressRing } from "@/registry/vitrum/ui/progress";
import { SegmentedControl } from "@/registry/vitrum/ui/segmented-control";
import { Slider } from "@/registry/vitrum/ui/slider";
import { Switch } from "@/registry/vitrum/ui/switch";

interface GalleryCell {
  slug: string;
  title: string;
  span?: boolean;
  render: React.ReactNode;
}

const CELLS: GalleryCell[] = [
  {
    slug: "button",
    title: "Button",
    render: (
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button size="sm">Glass</Button>
        <Button size="sm" variant="accent">
          Accent
        </Button>
      </div>
    ),
  },
  {
    slug: "switch",
    title: "Switch",
    render: (
      <div className="flex items-center gap-3">
        <Switch defaultChecked aria-label="Example switch on" />
        <Switch aria-label="Example switch off" />
      </div>
    ),
  },
  {
    slug: "slider",
    title: "Slider",
    render: <Slider defaultValue={[60]} aria-label="Example slider" className="w-40" />,
  },
  {
    slug: "segmented-control",
    title: "Segmented Control",
    span: true,
    render: (
      <SegmentedControl
        size="sm"
        defaultValue="frost"
        options={[
          { value: "refract", label: "Refract" },
          { value: "frost", label: "Frost" },
          { value: "solid", label: "Solid" },
        ]}
      />
    ),
  },
  {
    slug: "gauge",
    title: "Gauge",
    render: <Gauge value={68} label="Level" className="size-24 rounded-[1rem]" />,
  },
  {
    slug: "badge",
    title: "Badge",
    render: (
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <Badge variant="accent">New</Badge>
        <Badge variant="success">Stable</Badge>
        <Badge>v1.0</Badge>
      </div>
    ),
  },
  {
    slug: "progress",
    title: "Progress",
    render: <ProgressRing value={70} size={64} thickness={6} />,
  },
  {
    slug: "checkbox",
    title: "Checkbox",
    render: (
      <label className="flex items-center gap-2.5 text-sm">
        <Checkbox defaultChecked /> Stay signed in
      </label>
    ),
  },
  {
    slug: "input",
    title: "Input",
    render: <Input placeholder="you@studio.glass" className="w-44" aria-label="Example input" />,
  },
  {
    slug: "avatar",
    title: "Avatar",
    render: (
      <div className="flex -space-x-2.5">
        {["AD", "NL", "RX"].map((label) => (
          <Avatar key={label} className="ring-2 ring-background">
            <AvatarFallback className="text-[0.625rem]">{label}</AvatarFallback>
          </Avatar>
        ))}
      </div>
    ),
  },
  {
    slug: "dock",
    title: "Dock",
    span: true,
    render: (
      <Dock aria-label="Example dock">
        <DockItem label="Files">
          <FolderIcon />
        </DockItem>
        <DockItem label="Mail">
          <MailIcon />
        </DockItem>
        <DockItem label="Terminal">
          <TerminalIcon />
        </DockItem>
      </Dock>
    ),
  },
];

export function GalleryWall() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {CELLS.map((cell) => (
        <Link
          key={cell.slug}
          href={`/docs/components/${cell.slug}` as Route}
          className={
            "vt-ring group relative flex min-h-36 flex-col items-center justify-center gap-3 rounded-pane border border-border p-5 transition-colors hover:border-primary/40" +
            (cell.span ? " col-span-2" : "")
          }
        >
          <div className="pointer-events-none flex flex-1 items-center justify-center">
            <div className="pointer-events-auto">{cell.render}</div>
          </div>
          <span className="font-mono text-[0.6875rem] text-muted-foreground transition-colors group-hover:text-glint">
            {cell.title}
          </span>
        </Link>
      ))}
    </div>
  );
}
