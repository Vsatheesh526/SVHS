import { Award } from "lucide-react";

const FALLBACK = "https://placehold.co/600x400/0f1f3d/c8a24a?text=Achievement";

export default function AchievementCard({ item }) {
  return (
    <div className="card overflow-hidden">
      <img
        src={item.image_url || FALLBACK}
        alt={item.title}
        onError={(e) => { e.currentTarget.src = FALLBACK; }}
        className="h-44 w-full object-cover"
      />
      <div className="p-5">
        <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-1 text-xs font-semibold uppercase text-gold-dark">
          <Award className="h-3 w-3" /> {item.category}
        </span>
        <h3 className="mt-3 font-display text-lg font-bold text-navy">{item.title}</h3>
        {item.description && <p className="mt-2 text-sm text-slate-600">{item.description}</p>}
        {item.achieved_on && (
          <p className="mt-3 text-xs text-slate-400">
            {new Date(item.achieved_on).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        )}
      </div>
    </div>
  );
}