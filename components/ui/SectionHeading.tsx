interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : '';

  return (
    <div className={alignment}>
      {eyebrow ? (
        <p className="text-sm uppercase tracking-[0.24em] text-text-muted">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 text-3xl font-semibold text-text-primary md:text-4xl">{title}</h2>
      {description ? (
        <p className={`mt-4 max-w-3xl text-base leading-8 text-text-secondary ${alignment}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
