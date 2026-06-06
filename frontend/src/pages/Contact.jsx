import { useState } from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { useFetch } from "../hooks/useFetch.js";
import api from "../api/client.js";
import PageHero from "../components/PageHero.jsx";

const buildMapEmbedUrl = (mapEmbedUrl, address) => {
  const defaultAddress = address || "Sri Vidya E.M & T.M High School, Vidyanagar, Penumuru, Andhra Pradesh";
  if (!mapEmbedUrl) {
    return `https://www.google.com/maps?q=${encodeURIComponent(defaultAddress)}&output=embed`;
  }

  try {
    const url = new URL(mapEmbedUrl);
    const pathname = url.pathname;
    const params = url.searchParams;

    if (pathname.includes("/embed") || params.get("output") === "embed") {
      return mapEmbedUrl;
    }

    const q = params.get("q");
    if (q) {
      return `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
    }

    const atMatch = pathname.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
    if (atMatch) {
      return `https://www.google.com/maps?q=${encodeURIComponent(`${atMatch[1]},${atMatch[2]}`)}&output=embed`;
    }

    if (url.hostname.includes("maps.app.goo.gl") || url.hostname.includes("goo.gl")) {
      return `https://www.google.com/maps?q=${encodeURIComponent(defaultAddress)}&output=embed`;
    }
  } catch {
    // invalid URL, fallback to address search
  }

  return `https://www.google.com/maps?q=${encodeURIComponent(defaultAddress)}&output=embed`;
};

export default function Contact() {
  const { data: info } = useFetch("/contact/info");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      await api.post("/contact/messages", form);
      setStatus({ ok: true, msg: "Thank you! Your message has been sent." });
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus({ ok: false, msg: "Something went wrong. Please try again." });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHero title="Contact Us" subtitle="We'd love to hear from you. Reach out with any questions." />
      <section className="container-page grid gap-10 py-16 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-bold text-navy">Get in touch</h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy/5 text-navy"><MapPin className="h-5 w-5" /></span>
              <span className="text-slate-600">{info?.address || "Sri Vidya E.M & T.M High School, Vidyanagar, Penumuru, Andhra Pradesh"}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy/5 text-navy"><Phone className="h-5 w-5" /></span>
              <span className="text-slate-600">{info?.phone || "+91 98765 43210"}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy/5 text-navy"><Mail className="h-5 w-5" /></span>
              <span className="text-slate-600">{info?.email || "info@school.com"}</span>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="card p-6">
          <h2 className="font-display text-2xl font-bold text-navy">Send a message</h2>
          <div className="mt-4 space-y-4">
            <input
              required
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-navy focus:outline-none"
            />
            <input
              required
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-navy focus:outline-none"
            />
            <textarea
              required
              rows={5}
              placeholder="Your message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-navy focus:outline-none"
            />
            <button disabled={sending} className="btn-primary w-full justify-center">
              {sending ? "Sending…" : <>Send Message <Send className="h-4 w-4" /></>}
            </button>
            {status && (
              <p className={`text-sm ${status.ok ? "text-green-600" : "text-red-600"}`}>{status.msg}</p>
            )}
          </div>
        </form>
      </section>

      <section className="bg-slate-50 py-12">
        <div className="container-page">
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <h2 className="font-display text-3xl font-bold text-navy">Find Us on the Map</h2>
            <p className="mt-3 text-slate-600">See our school location in Vidyanagar, Penumuru. This map is shown above the footer for easy access.</p>
            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
              <iframe
                title="school location"
                src={buildMapEmbedUrl(info?.map_embed_url, info?.address)}
                className="h-80 w-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}