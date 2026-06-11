import { getRegistryItem } from "@/lib/docs/registry-data";
import { registryItemUrl } from "@/lib/site";

import { ComponentSource } from "@/components/docs/component-source";
import { InstallTabsClient } from "@/components/docs/install-tabs-client";

export function InstallTabs({ item }: { item: string }) {
  const data = getRegistryItem(item);

  return (
    <InstallTabsClient
      url={registryItemUrl(item)}
      dependencies={data.dependencies ?? []}
      docsNote={data.docs}
      manual={<ComponentSource item={item} />}
    />
  );
}
