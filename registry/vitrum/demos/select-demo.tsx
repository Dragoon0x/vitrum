"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/registry/vitrum/ui/select";

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-52">
        <SelectValue placeholder="Pick a finish" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Finishes</SelectLabel>
          <SelectItem value="polished">Polished</SelectItem>
          <SelectItem value="frosted">Frosted</SelectItem>
          <SelectItem value="etched">Etched</SelectItem>
          <SelectItem value="smoked">Smoked</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
