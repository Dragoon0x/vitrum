"use client";

import {
  FolderIcon,
  ImageIcon,
  MailIcon,
  MusicIcon,
  TerminalIcon,
  Trash2Icon,
} from "lucide-react";

import { Dock, DockItem, DockSeparator } from "@/registry/vitrum/ui/dock";

export function DockDemo() {
  return (
    <Dock>
      <DockItem label="Files">
        <FolderIcon />
      </DockItem>
      <DockItem label="Mail">
        <MailIcon />
      </DockItem>
      <DockItem label="Photos">
        <ImageIcon />
      </DockItem>
      <DockItem label="Music">
        <MusicIcon />
      </DockItem>
      <DockItem label="Terminal">
        <TerminalIcon />
      </DockItem>
      <DockSeparator />
      <DockItem label="Trash">
        <Trash2Icon />
      </DockItem>
    </Dock>
  );
}
