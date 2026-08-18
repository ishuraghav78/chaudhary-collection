export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <div className="border-b border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8 lg:py-20">
        {eyebrow && (
          <p className="text-xs font-light uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
        )}
        <h1 className="mt-3 text-balance text-4xl font-medium sm:text-5xl">{title}</h1>
        {description && (
          <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
