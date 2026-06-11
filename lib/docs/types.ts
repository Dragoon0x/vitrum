export interface PropDoc {
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

export interface DemoDef {
  id: string;
  title: string;
  /** Path (from repo root) of the demo source — rendered AND displayed. */
  file: `registry/vitrum/demos/${string}.tsx`;
  component: React.ComponentType;
  /** Extra height for demos that open floating content. */
  tall?: boolean;
}

export interface ApiDoc {
  exportName: string;
  /** One-line note shown above the table. */
  note?: string;
  props: Record<string, PropDoc>;
}

export interface ComponentDoc {
  slug: string;
  title: string;
  description: string;
  /** Key into registry.json items. */
  registryItem: string;
  demos: DemoDef[];
  api: ApiDoc[];
}

/**
 * Compile-checked prop documentation: keys must be real props of T, so a
 * renamed or removed prop turns into a type error here instead of a
 * stale docs table.
 */
export function definePropDocs<T>() {
  return <D extends Partial<Record<keyof T & string, PropDoc>>>(docs: D): D =>
    docs;
}
