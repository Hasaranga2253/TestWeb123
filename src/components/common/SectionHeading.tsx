type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <header className="max-w-3xl">
      {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-aims-royal">{eyebrow}</p> : null}
      <h1 className="text-4xl font-bold tracking-tight text-aims-navy sm:text-5xl">{title}</h1>
      {description ? <p className="mt-4 text-lg leading-8 text-slate-600">{description}</p> : null}
    </header>
  );
}
