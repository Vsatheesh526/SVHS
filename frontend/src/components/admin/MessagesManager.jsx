import { useEffect, useState } from "react";
import { Trash2, Mail } from "lucide-react";
import api from "../../api/client.js";

export default function MessagesManager() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await api.get("/contact/messages");
    setRows(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!confirm("Delete this message?")) return;
    await api.delete(`/contact/messages/${id}`);
    load();
  };

  return (
    <div>
      <h2 className="mb-5 font-display text-xl font-bold text-navy">Contact Messages</h2>
      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : rows.length === 0 ? (
        <div className="flex flex-col items-center rounded-xl border border-dashed py-16 text-center text-slate-500">
          <Mail className="h-8 w-8" />
          <p className="mt-2 text-sm">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {rows.map((m) => (
            <div key={m.id} className="rounded-xl border bg-white p-4 shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-navy">{m.name}</p>
                  <a href={`mailto:${m.email}`} className="text-sm text-gold-dark underline">{m.email}</a>
                </div>
                <button onClick={() => remove(m.id)} className="rounded p-2 hover:bg-slate-100"><Trash2 className="h-4 w-4 text-red-500" /></button>
              </div>
              <p className="mt-2 whitespace-pre-line text-sm text-slate-600">{m.message}</p>
              <p className="mt-2 text-xs text-slate-400">{new Date(m.created_at).toLocaleString("en-IN")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}