import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, ArrowRight, Sparkles, Users, GraduationCap, Trophy, BookOpen, X } from "lucide-react";
import { useFetch } from "../hooks/useFetch.js";
import SectionHeading from "../components/SectionHeading.jsx";
import ResultCard from "../components/cards/ResultCard.jsx";
import AutoScroller from "../components/AutoScroller.jsx";
import ResultBanner from "../components/ResultBanner.jsx";

const HERO = "https://png.pngtree.com/thumb_back/fh260/background/20250909/pngtree-group-of-children-reading-books-on-grass-outside-modern-school-building-image_19017971.webp";
const ABOUT = "https://www.genesisglobalschool.edu.in/boarding-life/wp-content/uploads/sites/5/2025/01/Library-scaled.jpg";

export default function Home() {
  const [selectedResult, setSelectedResult] = useState(null);
  const { data: notifications } = useFetch("/notifications");
  const { data: results } = useFetch("/results");

  const topResults = (results || []).slice(0, 8);
  const recentNotifs = (notifications || []).slice(0, 4);

  const leaders = [
    {
      id: "correspondent",
      name: "Dr. A. Jayachandra Reddy",
      role: "Correspondent",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
      summary: "Provides strategic direction for the school while supporting academic excellence and community engagement.",
      details: "Dr. Reddy leads the school with a strong focus on values, community progress and overall student success.",
      phone: "9441595469",
    },
    {
      id: "headmaster",
      name: "K. Giridhar",
      role: "Headmaster",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
      summary: "Oversees daily academic operations and ensures all students receive guidance, discipline and holistic support.",
      details: "Mr. Giridhar manages academics, mentors staff and fosters an environment where every student can thrive.",
      phone: "9490946911",
    },
    {
      id: "academic-incharge",
      name: "Sri C. Venkatesulu",
      role: "Academic Incharge",
      photo: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      summary: "Drives academic planning, curriculum delivery and student learning outcomes across the school.",
      details: "Sri Venkatesulu leads the academic team to strengthen teaching quality, student performance and classroom excellence.",
      phone: "7975444068",
    },
  ];

  const [selectedLeaderId, setSelectedLeaderId] = useState(leaders[0].id);
  const selectedLeader = leaders.find((leader) => leader.id === selectedLeaderId) || leaders[0];

  const galleryImages = [
    "https://glendaleschool.org/ae/wp-content/uploads/2024/07/schools-in-uae1-1024x682.jpg",
    "https://www.schooldekho.org/assets/images/school_dekho_banner2.webp",
    "https://shreeniketanschool.edu.in/frontend/images/foundation-class.jpg",
    "https://shreeniketanschool.edu.in/frontend/images/handwriting.jpg",
    "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=1200&q=80",
    "https://samsidhhoramavu.in/wp-content/uploads/2024/02/calss.jpg",
  ];

  return (
    <>
      <section className="bg-gold py-2 top-12 z-50 ">
        <div className="container-page">
          <marquee behavior="scroll" direction="left" scrollamount="6" className="text-sm font-semibold uppercase tracking-[0.2em] text-navy">
            Admissions open for 2026-27 — Apply now for limited seats at our school. Contact admissions today!
          </marquee>
        </div>
      </section>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <img src={HERO} alt="School campus" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/85 to-navy/60" />
        <div className="container-page relative flex flex-col items-start py-24 lg:py-36">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-4 py-1.5 text-sm font-medium text-gold-light">
            <Sparkles className="h-4 w-4" /> Admissions open for 2026-27
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Shaping bright futures through <span className="text-gold-light">knowledge &amp; values</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-200">
            A nurturing environment where every student is inspired to achieve academic excellence,
            build character and lead with confidence.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/admissions" className="btn-primary">Apply for Admission <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/achievements" className="btn-outline">Our Achievements</Link>
          </div>
          <div className="mt-12 grid w-full max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { icon: Users, value: "500+", label: "Students" },
              { icon: GraduationCap, value: "98.4%", label: "Top Score" },
              { icon: Trophy, value: "120+", label: "Awards" },
              { icon: BookOpen, value: "25 yrs", label: "Legacy" },
            ].map((s) => (
              <div key={s.label} className="text-white">
                <s.icon className="h-6 w-6 text-gold" />
                <p className="mt-2 font-display text-2xl font-bold">{s.value}</p>
                <p className="text-sm text-slate-300">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notifications */}
      {recentNotifs.length > 0 && (
        <section className="bg-navy/5">
          <div className="container-page py-12">
            <div className="mb-6 flex items-center gap-2">
              <Bell className="h-5 w-5 text-gold-dark" />
              <h2 className="font-display text-2xl font-bold text-navy">Latest Notifications</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {recentNotifs.map((n) => (
                <div key={n.id} className="card p-5">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" />
                    <div>
                      <h3 className="font-semibold text-navy">{n.title}</h3>
                      {n.content && <p className="mt-1 text-sm text-slate-600">{n.content}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      <ResultBanner topResults={topResults} onOpenResult={setSelectedResult} />
      {topResults.length > 0 && (
        <section className="bg-slate-100">
          <div className="container-page py-16">
            <SectionHeading
              eyebrow="Class X results 2025-26"
              title="Result gallery"
              description="Explore the latest student results in an interactive gallery format."
            />
            <div className="mt-10">
              <AutoScroller speed={0.45} pauseOnHover>
                {topResults.map((r) => (
                  <div key={r.id} className="shrink-0 min-w-[260px] sm:min-w-[300px] inline-block align-top">
                    <ResultCard student={r} onClick={() => setSelectedResult(r)} />
                  </div>
                ))}
              </AutoScroller>
            </div>
          </div>
        </section>
      )}
      {selectedResult && (
        <div onClick={() => setSelectedResult(null)} className="fixed inset-0 z-50 flex items-center justify-center bg-navy/70 px-4 py-8">
          <div onClick={(event) => event.stopPropagation()} className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedResult(null)}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
              aria-label="Close result details"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="grid gap-6 p-8 lg:grid-cols-[280px_1fr] lg:items-start">
              <img
                src={selectedResult.photo_url || "https://placehold.co/280x280/0f1f3d/c8a24a?text=Student"}
                alt={selectedResult.name}
                className="h-full w-full rounded-3xl object-cover"
              />
              <div>
                <span className="inline-flex rounded-full bg-gold/10 px-3 py-1 text-sm font-semibold text-gold-dark">
                  {selectedResult.is_topper ? "Topper" : "Student result"}
                </span>
                <h2 className="mt-5 text-3xl font-bold text-navy">{selectedResult.name}</h2>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
                  {selectedResult.marks && <span className="rounded-full bg-slate-100 px-3 py-2">Marks: {selectedResult.marks}</span>}
                  {selectedResult.grade && <span className="rounded-full bg-slate-100 px-3 py-2">Grade: {selectedResult.grade}</span>}
                  {selectedResult.rank ? <span className="rounded-full bg-slate-100 px-3 py-2">Rank #{selectedResult.rank}</span> : null}
                </div>
                <p className="mt-6 whitespace-pre-line text-slate-600">{selectedResult.details || "No additional details provided."}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedResult(null)}
                    className="inline-flex items-center justify-center rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy/90"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About */}
      <section className="container-page py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl shadow-elegant">
            <img src={ABOUT} alt="School library" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div>
            <SectionHeading align="left" eyebrow="Why Bright Future" title="A place where learning comes alive" />
            <p className="mt-4 text-slate-600">
              For over 25 years we have combined rigorous academics with a vibrant co-curricular life.
              Our experienced faculty, modern infrastructure and student-first approach create the
              perfect environment for every child to thrive.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Experienced and caring faculty",
                "State-of-the-art science and computer labs",
                "Focus on sports, arts and life skills",
                "Consistently outstanding board results",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm font-medium">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-navy-dark">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-slate-100">
        <div className="container-page py-16">
          <SectionHeading
            eyebrow="School leaders"
            title="Meet our Correspondent and Headmaster"
            description="Get to know the leaders who guide the school with care, character and academic vision."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <div className="grid gap-4 sm:grid-cols-2">
              {leaders.map((leader) => (
                <button
                  key={leader.id}
                  type="button"
                  onClick={() => setSelectedLeaderId(leader.id)}
                  className={`group rounded-3xl border p-5 text-left transition-all ${selectedLeaderId === leader.id ? "border-gold bg-white shadow-soft" : "border-slate-200 bg-slate-50 hover:border-gold hover:bg-white"}`}
                >
                  <div className="overflow-hidden rounded-3xl">
                    {/* <img src={leader.photo} alt={leader.name} className="h-56 w-full object-cover transition duration-500 group-hover:scale-105" /> */}
                  </div>
                  <div className="mt-5">
                    <h3 className="text-2xl font-bold text-navy">{leader.name}</h3>
                    <p className="mt-3 text-slate-600">{leader.summary}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-soft">
              <div className="overflow-hidden rounded-3xl">
                <img src={selectedLeader.photo} alt={selectedLeader.name} className="h-72 w-full object-cover" />
              </div>
              <div className="mt-6">
                <span className="inline-flex rounded-full bg-gold/10 px-3 py-1 text-sm font-semibold text-gold-dark">{selectedLeader.role}</span>
                <h3 className="mt-4 text-3xl font-bold text-navy">{selectedLeader.name}</h3>
                <p className="mt-4 text-slate-600">{selectedLeader.details}</p>
                <p className="mt-4 text-sm font-semibold text-navy">Contact</p>
                <p className="text-sm text-slate-600">📞 {selectedLeader.phone}</p>
                <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-500">
                  <span className="rounded-full bg-slate-100 px-3 py-2">Visionary leadership</span>
                  <span className="rounded-full bg-slate-100 px-3 py-2">Student-first culture</span>
                  <span className="rounded-full bg-slate-100 px-3 py-2">Academic excellence</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14">
            <SectionHeading
              title="School life gallery"
              description="Explore our campus through an interactive photo gallery of classrooms, events and daily school moments."
              align="left"
            />
            <div className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
              <div className="grid gap-4">
                <img
                  src={galleryImages[0]}
                  alt="School campus life"
                  className="h-[420px] w-full rounded-3xl object-cover"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <img
                    src={galleryImages[1]}
                    alt="School activity"
                    className="h-48 w-full rounded-3xl object-cover"
                  />
                  <img
                    src={galleryImages[2]}
                    alt="School activity"
                    className="h-48 w-full rounded-3xl object-cover"
                  />
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <img
                    src={galleryImages[3]}
                    alt="School event"
                    className="h-52 w-full rounded-3xl object-cover"
                  />
                  <img
                    src={galleryImages[4]}
                    alt="School event"
                    className="h-52 w-full rounded-3xl object-cover"
                  />
                </div>
                <img
                  src={galleryImages[5]}
                  alt="School community"
                  className="h-64 w-full rounded-3xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy">
        <div className="container-page py-16 text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Give your child the gift of a bright future
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Admissions for the 2026-27 session are now open. Join a community dedicated to nurturing
            tomorrow's leaders.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/admissions" className="btn-primary">Start Application</Link>
            <Link to="/contact" className="btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}