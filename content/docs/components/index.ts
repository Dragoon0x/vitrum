import type { ComponentDoc } from "@/lib/docs/types";

import { glassDoc } from "@/content/docs/components/glass";
import { glassSceneDoc } from "@/content/docs/components/glass-scene";
import { auroraFieldDoc } from "@/content/docs/components/aurora-field";
import { lensDoc } from "@/content/docs/components/lens";
import { buttonDoc } from "@/content/docs/components/button";
import { segmentedControlDoc } from "@/content/docs/components/segmented-control";
import { inputDoc } from "@/content/docs/components/input";
import { textareaDoc } from "@/content/docs/components/textarea";
import { selectDoc } from "@/content/docs/components/select";
import { checkboxDoc } from "@/content/docs/components/checkbox";
import { radioGroupDoc } from "@/content/docs/components/radio-group";
import { switchDoc } from "@/content/docs/components/switch";
import { sliderDoc } from "@/content/docs/components/slider";
import { badgeDoc } from "@/content/docs/components/badge";
import { cardDoc } from "@/content/docs/components/card";
import { avatarDoc } from "@/content/docs/components/avatar";
import { progressDoc } from "@/content/docs/components/progress";
import { gaugeDoc } from "@/content/docs/components/gauge";
import { skeletonDoc } from "@/content/docs/components/skeleton";
import { accordionDoc } from "@/content/docs/components/accordion";
import { alertDoc } from "@/content/docs/components/alert";
import { dialogDoc } from "@/content/docs/components/dialog";
import { sheetDoc } from "@/content/docs/components/sheet";
import { popoverDoc } from "@/content/docs/components/popover";
import { tooltipDoc } from "@/content/docs/components/tooltip";
import { dropdownMenuDoc } from "@/content/docs/components/dropdown-menu";
import { commandDoc } from "@/content/docs/components/command";
import { toasterDoc } from "@/content/docs/components/toaster";
import { navbarDoc } from "@/content/docs/components/navbar";
import { tabsDoc } from "@/content/docs/components/tabs";
import { dockDoc } from "@/content/docs/components/dock";

export const docsMap: Record<string, ComponentDoc> = {
  [glassDoc.slug]: glassDoc,
  [glassSceneDoc.slug]: glassSceneDoc,
  [auroraFieldDoc.slug]: auroraFieldDoc,
  [lensDoc.slug]: lensDoc,
  [buttonDoc.slug]: buttonDoc,
  [segmentedControlDoc.slug]: segmentedControlDoc,
  [inputDoc.slug]: inputDoc,
  [textareaDoc.slug]: textareaDoc,
  [selectDoc.slug]: selectDoc,
  [checkboxDoc.slug]: checkboxDoc,
  [radioGroupDoc.slug]: radioGroupDoc,
  [switchDoc.slug]: switchDoc,
  [sliderDoc.slug]: sliderDoc,
  [badgeDoc.slug]: badgeDoc,
  [cardDoc.slug]: cardDoc,
  [avatarDoc.slug]: avatarDoc,
  [progressDoc.slug]: progressDoc,
  [gaugeDoc.slug]: gaugeDoc,
  [skeletonDoc.slug]: skeletonDoc,
  [accordionDoc.slug]: accordionDoc,
  [alertDoc.slug]: alertDoc,
  [dialogDoc.slug]: dialogDoc,
  [sheetDoc.slug]: sheetDoc,
  [popoverDoc.slug]: popoverDoc,
  [tooltipDoc.slug]: tooltipDoc,
  [dropdownMenuDoc.slug]: dropdownMenuDoc,
  [commandDoc.slug]: commandDoc,
  [toasterDoc.slug]: toasterDoc,
  [navbarDoc.slug]: navbarDoc,
  [tabsDoc.slug]: tabsDoc,
  [dockDoc.slug]: dockDoc,
};
