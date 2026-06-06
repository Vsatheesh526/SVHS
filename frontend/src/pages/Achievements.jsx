import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFetch } from "../hooks/useFetch.js";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import AchievementCard from "../components/cards/AchievementCard.jsx";
import StaffCard from "../components/cards/StaffCard.jsx";

export default function Achievements() {
  const { data, loading } = useFetch("/achievements");
  const { data: staffProfiles, loading: staffLoading } = useFetch("/staff_profiles");
  const [filter, setFilter] = useState("all");
  const [staffFilter, setStaffFilter] = useState("all");
  const teacherCarouselRef = useRef(null);
  const achievementCarouselRef = useRef(null);
  const items = data || [];
  const staffItems = staffProfiles || [];
  const categories = ["all", ...new Set(items.map((a) => a.category))];
  const shown = filter === "all" ? items : items.filter((a) => a.category === filter);
  const staffTypes = ["all", "founder", "teacher"];
  const shownStaff = staffFilter === "all" ? staffItems : staffItems.filter((p) => p.type === staffFilter);

  const scrollCarousel = (carousel, direction = 1) => {
    if (!carousel) return;
    const width = carousel.clientWidth || 320;
    const nextLeft = carousel.scrollLeft + direction * width * 0.85;

    if (direction > 0 && nextLeft >= carousel.scrollWidth - carousel.clientWidth - 1) {
      carousel.scrollTo({ left: 0, behavior: "smooth" });
    } else if (direction < 0 && nextLeft <= 0) {
      carousel.scrollTo({ left: carousel.scrollWidth, behavior: "smooth" });
    } else {
      carousel.scrollTo({ left: nextLeft, behavior: "smooth" });
    }
  };

  const scrollNext = () => scrollCarousel(teacherCarouselRef.current, 1);
  const scrollPrev = () => scrollCarousel(teacherCarouselRef.current, -1);
  const scrollAchievementNext = () => scrollCarousel(achievementCarouselRef.current, 1);
  const scrollAchievementPrev = () => scrollCarousel(achievementCarouselRef.current, -1);

  useEffect(() => {
    if (!teacherCarouselRef.current || staffLoading) return;
    const interval = window.setInterval(() => {
      if (staffFilter === "all" || staffFilter === "teacher") {
        scrollNext();
      }
    }, 5000);
    return () => window.clearInterval(interval);
  }, [staffFilter, staffLoading]);

  useEffect(() => {
    if (!achievementCarouselRef.current || loading) return;
    const interval = window.setInterval(() => {
      scrollAchievementNext();
    }, 5000);
    return () => window.clearInterval(interval);
  }, [loading, shown.length]);

  return (
    <>
      <PageHero title="Achievements" subtitle="Certifications, awards and recognitions we are proud of." />
      <section className="container-page py-16">
        {categories.length > 1 && (
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            
          </div>
        )}
        {loading ? (
          <p className="text-center text-slate-500">Loading…</p>
        ) : shown.length === 0 ? (
          <p className="text-center text-slate-500">No achievements yet.</p>
        ) : (
          <div className="relative">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Achievement carousel</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={scrollAchievementPrev}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-navy transition hover:border-navy hover:text-navy"
                  aria-label="Scroll previous achievements"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={scrollAchievementNext}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-navy transition hover:border-navy hover:text-navy"
                  aria-label="Scroll next achievements"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div
              ref={achievementCarouselRef}
              className="overflow-x-auto pb-4 px-2 sm:px-0 scroll-smooth hide-scrollbar"
            >
              <div className="flex gap-6 min-w-[100%] md:min-w-[80%] lg:min-w-full">
                {shown.map((a) => (
                  <div key={a.id} className="min-w-[280px] max-w-[320px] shrink-0">
                    <AchievementCard item={a} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="bg-slate-100">
        <div className="container-page py-16">
          <SectionHeading
            eyebrow="People"
            title="Founders & Teachers"
            description="Meet the school founders and teachers who bring our mission to life."
          />

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {staffTypes.map((type) => (
              <button
                key={type}
                onClick={() => setStaffFilter(type)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                  staffFilter === type ? "bg-navy text-white" : "bg-navy/5 text-navy hover:bg-navy/10"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {staffLoading ? (
            <p className="text-center text-slate-500 mt-8">Loading…</p>
          ) : shownStaff.length === 0 ? (
            <p className="text-center text-slate-500 mt-8">No founders or teachers have been added yet.</p>
          ) : (
            <>
              {(staffFilter === "all" || staffFilter === "founder") && (
                <div className="mt-10 rounded-3xl bg-white p-8 shadow-soft">
                  <h3 className="font-display text-3xl font-bold text-navy">Founder profile</h3>
                  {shownStaff.find((person) => person.type === "founder") ? (
                    (() => {
                      const founder = shownStaff.find((person) => person.type === "founder");
                      return (
                        <div className="mt-8 grid gap-8 lg:grid-cols-[360px_1fr] lg:items-center">
                          <div className="overflow-hidden rounded-3xl bg-slate-100">
                            <img
                              src={founder.image_url || "https://placehold.co/600x600/0f1f3d/c8a24a?text=Founder"}
                              alt={founder.name}
                              onError={(e) => { e.currentTarget.src = "https://placehold.co/600x600/0f1f3d/c8a24a?text=Founder"; }}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <span className="inline-flex rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
                              Founder
                            </span>
                            <h4 className="mt-4 font-display text-3xl font-bold text-navy">{founder.name}</h4>
                            <p className="mt-3 text-lg font-semibold text-slate-700">{founder.role}</p>
                            {founder.subject && (
                              <p className="mt-2 text-sm text-slate-500">Expertise: {founder.subject}</p>
                            )}
                            {founder.bio && (
                              <p className="mt-6 text-slate-600 whitespace-pre-line">{founder.bio}</p>
                            )}
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    <p className="mt-6 text-slate-500">No founder profile has been added yet.</p>
                  )}
                </div>
              )}

              {(staffFilter === "all" || staffFilter === "teacher") && (
                <div className="mt-12">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-display text-3xl font-bold text-navy">Teacher spotlight</h3>
                      <p className="mt-2 text-slate-600">Browse our teachers and their subject expertise.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={scrollPrev}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-navy transition hover:border-navy hover:text-navy"
                        aria-label="Scroll previous teachers"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={scrollNext}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-navy transition hover:border-navy hover:text-navy"
                        aria-label="Scroll next teachers"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="relative mt-8">
                    <div
                      ref={teacherCarouselRef}
                      className="overflow-x-auto pb-4 px-2 sm:px-0 scroll-smooth hide-scrollbar"
                    >
                      <div className="flex gap-6 min-w-[100%] md:min-w-[80%] lg:min-w-full">
                        {shownStaff.filter((person) => person.type === "teacher").map((person) => (
                          <div key={person.id} className="min-w-[280px] max-w-[280px] shrink-0">
                            <StaffCard person={person} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-white/100 via-white/0 sm:block" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-16 bg-gradient-to-l from-white/100 via-white/0 sm:block" />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}