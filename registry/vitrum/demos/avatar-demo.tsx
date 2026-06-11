"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/vitrum/ui/avatar";

export function AvatarDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/72?img=12" alt="Ada" />
        <AvatarFallback>AD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>VK</AvatarFallback>
      </Avatar>
      <div className="flex -space-x-2.5">
        {["NL", "RX", "+4"].map((label) => (
          <Avatar key={label} className="ring-2 ring-background">
            <AvatarFallback>{label}</AvatarFallback>
          </Avatar>
        ))}
      </div>
    </div>
  );
}
