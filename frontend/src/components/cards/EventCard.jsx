import { Calendar } from "lucide-react";

const FALLBACK = "https://placehold.co/600x400/0f1f3d/c8a24a?text=Event";

export default function EventCard({ event }) {
  return (
    <div className="card overflow-hidden">
      <img
        src={event.image_url || FALLBACK}
        alt={event.title}
        onError={(e) => { e.currentTarget.src = FALLBACK; }}
        className="h-44 w-full object-cover"
      />
      <div className="p-5">
        {event.event_date && (
          <p className="flex items-center gap-2 text-sm font-medium text-gold-dark">
            <Calendar className="h-4 w-4" />
            {new Date(event.event_date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        )}
        <h3 className="mt-2 font-display text-lg font-bold text-navy">{event.title}</h3>
        {event.description && <p className="mt-2 text-sm text-slate-600">{event.description}</p>}
      </div>
    </div>
  );
}