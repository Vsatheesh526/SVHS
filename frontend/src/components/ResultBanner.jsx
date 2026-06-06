import { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

export default function ResultBanner({ topResults = [], onOpenResult }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-white">
      <div className="container-page py-6">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-navy to-navy-dark p-6 sm:pr-40 text-white">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center justify-center rounded-2xl bg-white/10 px-6 py-4 text-center">
                <div className="text-5xl font-extrabold">Class X</div>
                <div className="text-sm">Results 2025-26</div>
              </div>

              <div>
                <h3 className="text-3xl font-bold">Outstanding Results</h3>
                
                <p className="mt-1 text-sm text-slate-200">Celebrating our students' success — click to view toppers and gallery.</p>
              </div>
            </div>
<div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setOpen(true)}
  className="rounded-full bg-gold px-5 py-1 text-xs font-semibold text-navy shadow-md transition hover:brightness-95"
              >
                View Gallery
              </button>
            </div>
            
          </div>
           
          {/* Decorative badge */}
          <div className="pointer-events-none absolute right-6 top-6 hidden items-center gap-2 rounded-full bg-green-500/10 px-4 py-3 text-sm font-semibold text-green-600 sm:flex">
  <div className="rounded-full bg-green-500/20 px-3 py-1">100% pass</div>
</div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/70 px-4 py-8">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
              aria-label="Close gallery"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-navy">Class X Results — Gallery</h3>
              <p className="mt-2 text-sm text-slate-600">Click a student to view details.</p>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {(topResults || []).map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      onOpenResult && onOpenResult(r);
                    }}
                    className="group overflow-hidden rounded-2xl border bg-slate-50 text-left transition hover:scale-[1.02]"
                  >
                    <img
                      src={r.photo_url || "https://placehold.co/360x240/0f172a/c8a24a?text=Student"}
                      alt={r.name}
                      className="h-36 w-full object-cover"
                    />
                    <div className="p-3">
                      <div className="font-semibold text-navy">{r.name}</div>
                      <div className="mt-1 text-xs text-slate-500">Marks: {r.marks ?? "-"}</div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <Link to="/results" className="btn-outline">View full results</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
