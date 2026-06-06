import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import api from "../../api/client.js";
import ImageUpload from "./ImageUpload.jsx";

export default function CrudManager({ singular, endpoint, fields, renderRow }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [open, setOpen] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await api.get(endpoint);
    setRows(data);
    setLoading(false);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [endpoint]);

  const startCreate = () => {
    const initial = {};
    fields.forEach((f) => {
      if (f.type === "checkbox") initial[f.name] = false;
      else if (f.type === "select") initial[f.name] = f.options?.[0]?.value ?? "";
      else initial[f.name] = "";
    });
    setForm(initial);
    setEditing(null);
    setOpen(true);
  };

  const startEdit = (row) => {
    const initial = {};
    fields.forEach((f) => {
      if (f.type === "checkbox") initial[f.name] = row[f.name] ?? false;
      else if (f.type === "select") initial[f.name] = row[f.name] ?? f.options?.[0]?.value ?? "";
      else initial[f.name] = row[f.name] ?? "";
    });
    setForm(initial);
    setEditing(row);
    setOpen(true);
  };

  const save = async (e) => {
    e.preventDefault();
    const payload = { ...form };
    fields.forEach((f) => {
      if (f.type === "number") payload[f.name] = payload[f.name] === "" ? null : Number(payload[f.name]);
      if (f.type === "checkbox") payload[f.name] = payload[f.name] ? 1 : 0;
      if (f.type === "select") payload[f.name] = payload[f.name] ?? "";
    });
    if (editing) await api.put(`${endpoint}/${editing.id}`, payload);
    else await api.post(endpoint, payload);
    setOpen(false);
    load();
  };

  const remove = async (id) => {
    if (!confirm("Delete this item?")) return;
    await api.delete(`${endpoint}/${id}`);
    load();
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-navy">{singular}s</h2>
        <button onClick={startCreate} className="inline-flex items-center gap-1.5 rounded-lg bg-navy px-3 py-2 text-sm font-semibold text-white hover:bg-navy-light">
          <Plus className="h-4 w-4" /> Add {singular}
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="rounded-xl border border-dashed p-8 text-center text-sm text-slate-500">
          No {singular.toLowerCase()}s yet.
        </p>
      ) : (
        <div className="space-y-3">
          {rows.map((row) => {
            const r = renderRow(row);
            return (
              <div key={row.id} className="flex items-center gap-4 rounded-xl border bg-white p-3 shadow-soft">
                {r.image !== undefined && (
                  <img src={r.image || "https://placehold.co/80x80?text=—"} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-navy">{r.title}</p>
                  {r.subtitle && <p className="truncate text-sm text-slate-500">{r.subtitle}</p>}
                </div>
                <button onClick={() => startEdit(row)} className="rounded p-2 hover:bg-slate-100"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => remove(row.id)} className="rounded p-2 hover:bg-slate-100"><Trash2 className="h-4 w-4 text-red-500" /></button>
              </div>
            );
          })}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form onSubmit={save} className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6">
            <h3 className="font-display text-lg font-bold text-navy">{editing ? `Edit ${singular}` : `Add ${singular}`}</h3>
            <div className="mt-4 space-y-4">
              {fields.map((f) => (
                <div key={f.name}>
                  {f.type !== "checkbox" && <label className="mb-1 block text-sm font-medium text-slate-700">{f.label}</label>}
                  {f.type === "text" && (
                    <input value={form[f.name] ?? ""} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-navy focus:outline-none" />
                  )}
                  {f.type === "number" && (
                    <input type="number" value={form[f.name] ?? ""} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-navy focus:outline-none" />
                  )}
                  {f.type === "date" && (
                    <input type="date" value={(form[f.name] ?? "").slice(0, 10)} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-navy focus:outline-none" />
                  )}
                  {f.type === "textarea" && (
                    <textarea rows={4} value={form[f.name] ?? ""} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-navy focus:outline-none" />
                  )}
                  {f.type === "select" && (
                    <select value={form[f.name] ?? ""} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 focus:border-navy focus:outline-none">
                      {f.options?.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  )}
                  {f.type === "checkbox" && (
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <input type="checkbox" checked={!!form[f.name]} onChange={(e) => setForm({ ...form, [f.name]: e.target.checked })} />
                      {f.label}
                    </label>
                  )}
                  {f.type === "image" && (
                    <ImageUpload value={form[f.name]} onChange={(url) => setForm({ ...form, [f.name]: url })} />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => setOpen(false)} className="rounded-lg border px-4 py-2 text-sm font-medium">Cancel</button>
              <button type="submit" className="rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy-light">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}