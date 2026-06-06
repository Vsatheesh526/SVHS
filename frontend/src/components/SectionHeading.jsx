export default function SectionHeading({ eyebrow, title, description, align = "center" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-wide text-gold-dark">{eyebrow}</span>
      )}
      <h2 className="mt-2 font-display text-3xl font-bold text-navy">{title}</h2>
      {description && <p className="mt-3 text-slate-600">{description}</p>}
    </div>
  );
}