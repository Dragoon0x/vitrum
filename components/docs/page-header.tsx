export function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="flex flex-col gap-3 pb-2">
      <h1 className="font-display text-3xl font-bold tracking-tight text-balance">
        {title}
      </h1>
      <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
        {description}
      </p>
      {children}
    </header>
  );
}
