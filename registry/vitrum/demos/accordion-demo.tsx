"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/vitrum/ui/accordion";

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-md" defaultValue="refraction">
      <AccordionItem value="refraction">
        <AccordionTrigger>How does refraction work?</AccordionTrigger>
        <AccordionContent>
          A displacement map bends the backdrop around each surface&apos;s
          bevel in a single compositor pass. The center stays at rest so
          content behind it remains legible.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="fallback">
        <AccordionTrigger>What about other browsers?</AccordionTrigger>
        <AccordionContent>
          Engines without backdrop displacement get the frost engine — a
          tuned blur-and-saturate stack with the same specular details.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="motion">
        <AccordionTrigger>Does it respect reduced motion?</AccordionTrigger>
        <AccordionContent>
          Yes. Ambient drift pauses, overlays collapse to fades, and the
          pointer optics disappear entirely.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
