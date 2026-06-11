"use client";

import { Button } from "@/registry/vitrum/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/vitrum/ui/card";
import { Badge } from "@/registry/vitrum/ui/badge";

export function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Night build</CardTitle>
        <CardDescription>
          Deploy preview finished 2 minutes ago.
        </CardDescription>
        <CardAction>
          <Badge variant="success">Passing</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          47 routes prerendered. No regressions against the visual
          baseline.
        </p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="ghost" size="sm">
          Dismiss
        </Button>
        <Button variant="accent" size="sm">
          Open preview
        </Button>
      </CardFooter>
    </Card>
  );
}
