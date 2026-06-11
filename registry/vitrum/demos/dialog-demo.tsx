"use client";

import { Button } from "@/registry/vitrum/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/vitrum/ui/dialog";
import { Input } from "@/registry/vitrum/ui/input";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Rename project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename project</DialogTitle>
          <DialogDescription>
            The new name appears everywhere the project is referenced.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <label htmlFor="project-name" className="text-sm font-medium">
            Name
          </label>
          <Input id="project-name" defaultValue="Meridian" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="accent">Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
