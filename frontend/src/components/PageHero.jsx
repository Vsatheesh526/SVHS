export default function PageHero({ title, subtitle }) {
  return (
    <section className="bg-navy text-white">
      <div className="container-page py-16 text-center">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-slate-300">{subtitle}</p>}
      </div>
    </section>
  );
}