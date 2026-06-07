import { useState } from "react";
import { User, Sparkles } from "lucide-react";

const FALLBACK = "https://placehold.co/600x400/0f1f3d/c8a24a?text=Profile";

export default function StaffCard({ person }) {
  const [expanded, setExpanded] = useState(false);
  const subtitle = person.subject ? `${person.role} • ${person.subject}` : person.role;

  return (
    <div className="card overflow-hidden  ">
      <div className="relative h-56 overflow-hidden ">
        <img
          src={person.image_url || FALLBACK}
          alt={person.name}
          onError={(e) => { e.currentTarget.src = FALLBACK; }}
          className="h-full w-full object-cover"
        />
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase ${person.type === "founder" ? "bg-gold/90 text-navy" : "bg-navy text-white"}`}>
          {person.type === "founder" ? "Founder" : "Teacher"}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Sparkles className="h-4 w-4" />
          <span>{person.type === "founder" ? "School leadership" : "Subject expert"}</span>
        </div>
        <h3 className="mt-3 font-display text-xl font-bold text-navy">{person.name}</h3>
        <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
        {person.bio && (
          <p className={`mt-4 text-sm text-slate-600 ${expanded ? "" : "line-clamp-3"}`}>
            {person.bio}
          </p>
        )}
        {person.bio && person.bio.length > 140 && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="mt-4 text-sm font-semibold text-navy hover:text-gold"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
}
