import type { ApiDoc } from "@/lib/docs/types";

export function PropsTable({ api }: { api: ApiDoc }) {
  const entries = Object.entries(api.props);
  if (entries.length === 0) return null;

  return (
    <section
      aria-label={`${api.exportName} props`}
      className="flex flex-col gap-3"
    >
      <h3 className="font-mono text-sm font-medium">
        {"<"}
        {api.exportName}
        {" />"}
      </h3>
      {api.note ? (
        <p className="text-sm text-muted-foreground">{api.note}</p>
      ) : null}
      <div className="overflow-x-auto rounded-pane border border-border">
        <table className="w-full min-w-md border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-recessed/50">
              <th className="px-4 py-2.5 font-medium">Prop</th>
              <th className="px-4 py-2.5 font-medium">Type</th>
              <th className="px-4 py-2.5 font-medium">Default</th>
              <th className="px-4 py-2.5 font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([name, prop]) => (
              <tr
                key={name}
                className="border-b border-border align-top last:border-b-0"
              >
                <td className="px-4 py-2.5 font-mono text-[0.8125rem] whitespace-nowrap text-primary">
                  {name}
                  {prop.required ? (
                    <span aria-label="required" className="text-destructive">
                      *
                    </span>
                  ) : null}
                </td>
                <td className="px-4 py-2.5 font-mono text-[0.8125rem] text-muted-foreground">
                  {prop.type}
                </td>
                <td className="px-4 py-2.5 font-mono text-[0.8125rem] whitespace-nowrap text-muted-foreground">
                  {prop.default ?? "—"}
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  {prop.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
