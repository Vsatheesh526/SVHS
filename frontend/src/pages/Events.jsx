import { useFetch } from "../hooks/useFetch.js";
import PageHero from "../components/PageHero.jsx";
import EventCard from "../components/cards/EventCard.jsx";

export default function Events() {
  const { data, loading } = useFetch("/events");
  const items = data || [];

  return (
    <>
      <PageHero title="School Events" subtitle="Stay updated with our latest happenings and celebrations." />
      <section className="container-page py-16">
        {loading ? (
          <p className="text-center text-slate-500">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-center text-slate-500">No events scheduled yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        )}
      </section>
    </>
  );
}