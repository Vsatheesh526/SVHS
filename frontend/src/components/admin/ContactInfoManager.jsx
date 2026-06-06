import { useEffect, useState } from "react";
import api from "../../api/client.js";

const empty = { address: "", phone: "", email: "", map_embed_url: "" };

export default function ContactInfoManager() {
  const [form, setForm] = useState(empty);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get("/contact/info").then(({ data }) => { if (data) setForm({ ...empty, ...data }); });
  }, []);

  const save = async (e) => {
    e.preventDefault();
    await api.put("/contact/info", form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2 className="mb-5 font-display text-xl font-bold text-navy">Contact Information</h2>
      <form onSubmit={save} className="max-w-lg space-y-4">
        {[
          { name: "address", label: "Address" },
          { name: "phone", label: "Phone" },
          { name: "email", label: "Email" },
          {
            name: "map_embed_url",
            label: "Google Maps embed URL",
            placeholder: "Example: https://www.google.com/maps/embed?...",
            helper: "Use an embeddable Google Maps URL, not a normal share or search link.",
          },
        ].map((f) => (
          <div key={f.name}>
            <label className="mb-1 block text-sm font-medium text-slate-700">{f.label}</label>
            <input
              placeholder={f.placeholder ?? ""}
              value={form[f.name] ?? ""}
              onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-navy focus:outline-none"
            />
            {f.helper && <p className="mt-1 text-xs text-slate-500">{f.helper}</p>}
          </div>
        ))}
        <button className="rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy-light">Save</button>
        {saved && <span className="ml-3 text-sm text-green-600">Saved!</span>}
      </form>
    </div>
  );
}