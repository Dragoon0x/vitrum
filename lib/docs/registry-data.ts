import registry from "@/registry.json";

export interface RegistryFileRef {
  path: string;
  type: string;
  target?: string;
}

export interface RegistryItemData {
  name: string;
  type: string;
  title?: string;
  description?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files?: RegistryFileRef[];
  docs?: string;
}

const items = registry.items as RegistryItemData[];

export function getRegistryItem(name: string): RegistryItemData {
  const item = items.find((entry) => entry.name === name);
  if (!item) throw new Error(`Unknown registry item: ${name}`);
  return item;
}

export function getAllRegistryItems(): RegistryItemData[] {
  return items;
}
