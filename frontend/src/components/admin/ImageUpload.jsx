import { useState } from "react";
import { Upload, X } from "lucide-react";
import api from "../../api/client.js";

export default function ImageUpload({ value, onChange }) {
  const [uploading, setUploading] = useState(false);

  const handle = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { data } = await api.post("/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onChange(data.url);
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {value ? (
        <div className="relative">
          <img src={value} alt="" className="h-16 w-16 rounded-lg object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -right-2 -top-2 rounded-full bg-red-500 p-0.5 text-white"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <span className="flex h-16 w-16 items-center justify-center rounded-lg border border-dashed text-slate-400">
          <Upload className="h-5 w-5" />
        </span>
      )}
      <label className="cursor-pointer rounded-lg border px-3 py-2 text-sm font-medium text-navy hover:bg-navy/5">
        {uploading ? "Uploading…" : "Choose image"}
        <input type="file" accept="image/*" onChange={handle} className="hidden" />
      </label>
    </div>
  );
}