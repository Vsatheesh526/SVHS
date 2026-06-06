import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import api from "../../api/client.js";

export default function AdmissionRequestsManager() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await api.get("/admission_requests");
    setRequests(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!confirm("Delete this admission request?")) return;
    await api.delete(`/admission_requests/${id}`);
    load();
  };

  const toggleStatus = async (request) => {
    const nextStatus = request.status === "finished" ? "pending" : "finished";
    await api.patch(`/admission_requests/${request.id}`, { status: nextStatus });
    load();
  };

  return (
    <div>
      <h2 className="mb-5 font-display text-xl font-bold text-navy">Admission Requests</h2>
      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : requests.length === 0 ? (
        <div className="flex flex-col items-center rounded-xl border border-dashed py-16 text-center text-slate-500">
          <p className="text-sm">No admission requests yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="rounded-xl border bg-white p-4 shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-semibold text-navy">{request.parent_name} &ndash; {request.child_name}</p>
                  <p className="text-sm text-slate-500">Class: {request.requested_class}</p>
                  <p className="text-sm text-slate-500">Email: <a href={`mailto:${request.parent_email}`} className="underline text-gold-dark">{request.parent_email}</a></p>
                  <p className="text-sm text-slate-500">Phone: {request.parent_phone}</p>
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={request.status === "finished"}
                      onChange={() => toggleStatus(request)}
                      className="h-4 w-4 rounded border-slate-300 text-navy focus:ring-navy"
                    />
                    Finished
                  </label>
                  <button onClick={() => remove(request.id)} className="rounded p-2 hover:bg-slate-100"><Trash2 className="h-4 w-4 text-red-500" /></button>
                </div>
              </div>
              {request.message && <p className="mt-3 whitespace-pre-line text-sm text-slate-600">{request.message}</p>}
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                <span className={`rounded-full px-2 py-1 ${request.status === "finished" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {request.status === "finished" ? "Finished" : "Pending"}
                </span>
                <span className="text-slate-400">Submitted: {new Date(request.created_at).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
