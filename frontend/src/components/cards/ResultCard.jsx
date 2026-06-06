import { Trophy, Star } from "lucide-react";

const FALLBACK = "https://placehold.co/200x200/0f1f3d/c8a24a?text=Student";

export default function ResultCard({ student, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`card relative overflow-hidden p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group ${onClick ? "cursor-pointer" : ""}`}
    >
      {student.is_topper ? (
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-1 text-xs font-semibold text-gold-dark">
          <Trophy className="h-3 w-3" /> Topper
        </span>
      ) : null}
      <img
        src={student.photo_url || FALLBACK}
        alt={student.name}
        onError={(e) => { e.currentTarget.src = FALLBACK; }}
        className="mx-auto h-24 w-24 rounded-full object-cover ring-4 ring-navy/5"
      />
      <h3 className="mt-4 font-display text-lg font-bold text-navy">{student.name}</h3>
      <div className="mt-1 flex items-center justify-center gap-2 text-sm">
        {student.marks && <span className="font-semibold text-gold-dark">{student.marks}</span>}
        {student.grade && <span className="rounded bg-navy/5 px-2 py-0.5 text-navy">{student.grade}</span>}
      </div>
      {student.rank ? (
        <p className="mt-1 flex items-center justify-center gap-1 text-xs text-slate-500">
          <Star className="h-3 w-3 text-gold" /> Rank #{student.rank}
        </p>
      ) : null}
      {student.details && <p className="mt-3 text-sm text-slate-600">{student.details}</p>}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-gold via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}