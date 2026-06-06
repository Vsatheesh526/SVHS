import { useState } from "react";
import { FileText, Send } from "lucide-react";
import { useFetch } from "../hooks/useFetch.js";
import api from "../api/client.js";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import ResultCard from "../components/cards/ResultCard.jsx";

const classOptions = ["LKG", "UKG", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"];

export default function Admissions() {
  const [form, setForm] = useState({
    parent_name: "",
    parent_email: "",
    parent_phone: "",
    child_name: "",
    requested_class: "LKG",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);
  const { data, loading } = useFetch("/admissions");
  const { data: results } = useFetch("/results");
  const items = data || [];
  const toppers = (results || []).filter((r) => r.is_topper).slice(0, 3);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    try {
      await api.post("/admission_requests", form);
      setStatus({ ok: true, msg: "Your admission request has been submitted successfully." });
      setForm({ parent_name: "", parent_email: "", parent_phone: "", child_name: "", requested_class: "LKG", message: "" });
    } catch {
      setStatus({ ok: false, msg: "Unable to submit your request right now. Please try again." });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHero title="Admissions 2026-27" subtitle="Everything you need to know to join the Bright Future family." />
      <section className="container-page py-16">
        {loading ? (
          <p className="text-center text-slate-500">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-center text-slate-500">Admission details will be published soon.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {items.map((a) => (
              <div key={a.id} className="card p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy/5 text-navy">
                    <FileText className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-xl font-bold text-navy">{a.title}</h3>
                </div>
                {a.content && <p className="mt-4 whitespace-pre-line text-slate-600">{a.content}</p>}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-slate-100">
        <div className="container-page py-16">
          <SectionHeading
            eyebrow="Apply now"
            title="LKG to 10th class admissions"
            description="Submit your admission request and our admissions team will contact you with next steps."
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_420px]">
            <div className="space-y-6">
              <div className="rounded-3xl bg-white p-8 shadow-soft">
                <h3 className="font-display text-2xl font-bold text-navy">Why choose Bright Future?</h3>
                <ul className="mt-5 space-y-3 text-slate-600">
                  <li>• Friendly early years learning for LKG and UKG</li>
                  <li>• Strong academic foundation from Class 1 to 10</li>
                  <li>• Personalized attention and modern classrooms</li>
                  <li>• Full support for new applicants and transfer admissions</li>
                </ul>
              </div>
              <div className="rounded-3xl bg-white p-8 shadow-soft">
                <h3 className="font-display text-2xl font-bold text-navy">What happens next?</h3>
                <ol className="mt-5 space-y-3 text-slate-600">
                  <li>1. Submit your details using the form.</li>
                  <li>2. Admissions team reviews the request.</li>
                  <li>3. We contact you to schedule a campus visit or interview.</li>
                  <li>4. Complete enrollment when your child is accepted.</li>
                </ol>
              </div>
            </div>

            <form onSubmit={submit} className="rounded-3xl bg-white p-8 shadow-soft">
              <h3 className="font-display text-2xl font-bold text-navy">Admission request</h3>
              <div className="mt-6 space-y-4">
                <input
                  required
                  placeholder="Parent / guardian name"
                  value={form.parent_name}
                  onChange={(e) => setForm({ ...form, parent_name: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-navy focus:outline-none"
                />
                <input
                  required
                  type="email"
                  placeholder="Parent email"
                  value={form.parent_email}
                  onChange={(e) => setForm({ ...form, parent_email: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-navy focus:outline-none"
                />
                <input
                  required
                  placeholder="Parent phone"
                  value={form.parent_phone}
                  onChange={(e) => setForm({ ...form, parent_phone: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-navy focus:outline-none"
                />
                <input
                  required
                  placeholder="Child name"
                  value={form.child_name}
                  onChange={(e) => setForm({ ...form, child_name: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-navy focus:outline-none"
                />
                <label className="block text-sm font-medium text-slate-700">Applying for</label>
                <select
                  value={form.requested_class}
                  onChange={(e) => setForm({ ...form, requested_class: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 focus:border-navy focus:outline-none"
                >
                  {classOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <textarea
                  rows={4}
                  placeholder="Additional message (optional)"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-navy focus:outline-none"
                />
                <button disabled={sending} className="btn-primary w-full justify-center">
                  {sending ? "Sending…" : <>Submit Request <Send className="h-4 w-4" /></>}
                </button>
                {status && (
                  <p className={`text-sm ${status.ok ? "text-green-600" : "text-red-600"}`}>{status.msg}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {toppers.length > 0 && (
        <section className="bg-slate-100">
          <div className="container-page py-16">
            <SectionHeading
              eyebrow="Pride of the school"
              title="Our Star Performers"
              description="See our top achievers who inspire future applicants."
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {toppers.map((t) => <ResultCard key={t.id} student={t} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}