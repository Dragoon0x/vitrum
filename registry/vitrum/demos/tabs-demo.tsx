"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/vitrum/ui/tabs";

export function TabsDemo() {
  return (
    <Tabs defaultValue="material" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="material">Material</TabsTrigger>
        <TabsTrigger value="motion">Motion</TabsTrigger>
        <TabsTrigger value="tokens">Tokens</TabsTrigger>
      </TabsList>
      <TabsContent value="material" className="text-sm text-muted-foreground">
        Four weights of glass — film, pane, slab, veil — share one optical
        system.
      </TabsContent>
      <TabsContent value="motion" className="text-sm text-muted-foreground">
        Ambient drift stays slow and transform-only; micro-interactions are
        sprung.
      </TabsContent>
      <TabsContent value="tokens" className="text-sm text-muted-foreground">
        Every knob is a custom property, themable per instance.
      </TabsContent>
    </Tabs>
  );
}
