import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import CrudManager from "../components/admin/CrudManager.jsx";
import MessagesManager from "../components/admin/MessagesManager.jsx";
import AdmissionRequestsManager from "../components/admin/AdmissionRequestsManager.jsx";
import ContactInfoManager from "../components/admin/ContactInfoManager.jsx";

const tabs = [
  { key: "notifications", label: "Notifications" },
  { key: "results", label: "Results" },
  { key: "achievements", label: "Achievements" },
  { key: "events", label: "Events" },
  { key: "admissions", label: "Admissions" },
  { key: "staff_profiles", label: "Staff Profiles" },
  { key: "admission_requests", label: "Admission Requests" },
  { key: "contact", label: "Contact Info" },
  { key: "messages", label: "Messages" },
];

export default function Admin() {
  const [tab, setTab] = useState("notifications");
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <section className="container-page py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-navy">Admin Dashboard</h1>
          <p className="mt-1 text-slate-500">Manage all website content from here.</p>
        </div>
        <button
          type="button"
          onClick={() => { logout(); navigate("/"); }}
          className="inline-flex items-center justify-center rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-light"
        >
          Logout
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              tab === t.key ? "bg-navy text-white" : "bg-navy/5 text-navy hover:bg-navy/10"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === "notifications" && (
          <CrudManager
            singular="Notification"
            endpoint="/notifications"
            fields={[
              { name: "title", label: "Title", type: "text" },
              { name: "content", label: "Content", type: "textarea" },
            ]}
            renderRow={(r) => ({ title: r.title, subtitle: r.content })}
          />
        )}
        {tab === "results" && (
          <CrudManager
            singular="Result"
            endpoint="/results"
            fields={[
              { name: "name", label: "Student name", type: "text" },
              { name: "photo_url", label: "Photo", type: "image" },
              { name: "marks", label: "Marks / Percentage", type: "text" },
              { name: "grade", label: "Grade", type: "text" },
              { name: "rank", label: "Rank", type: "number" },
              { name: "details", label: "Short details", type: "textarea" },
              { name: "is_topper", label: "Mark as topper", type: "checkbox" },
            ]}
            renderRow={(r) => ({ title: r.name, subtitle: `${r.marks || ""} ${r.grade || ""}`, image: r.photo_url })}
          />
        )}
        {tab === "achievements" && (
          <CrudManager
            singular="Achievement"
            endpoint="/achievements"
            fields={[
              { name: "title", label: "Title", type: "text" },
              { name: "image_url", label: "Image", type: "image" },
              { name: "category", label: "Category (award / certification)", type: "text" },
              { name: "description", label: "Description", type: "textarea" },
              { name: "achieved_on", label: "Achieved on", type: "date" },
            ]}
            renderRow={(r) => ({ title: r.title, subtitle: r.category, image: r.image_url })}
          />
        )}
        {tab === "events" && (
          <CrudManager
            singular="Event"
            endpoint="/events"
            fields={[
              { name: "title", label: "Title", type: "text" },
              { name: "image_url", label: "Image", type: "image" },
              { name: "event_date", label: "Event date", type: "date" },
              { name: "description", label: "Description", type: "textarea" },
            ]}
            renderRow={(r) => ({ title: r.title, subtitle: r.event_date, image: r.image_url })}
          />
        )}
        {tab === "admissions" && (
          <CrudManager
            singular="Admission section"
            endpoint="/admissions"
            fields={[
              { name: "title", label: "Title", type: "text" },
              { name: "content", label: "Content", type: "textarea" },
              { name: "category", label: "Category", type: "text" },
              { name: "sort_order", label: "Sort order", type: "number" },
            ]}
            renderRow={(r) => ({ title: r.title, subtitle: r.category })}
          />
        )}
        {tab === "staff_profiles" && (
          <CrudManager
            singular="Staff profile"
            endpoint="/staff_profiles"
            fields={[
              { name: "name", label: "Name", type: "text" },
              { name: "role", label: "Role / Title", type: "text" },
              {
                name: "type",
                label: "Type",
                type: "select",
                options: [
                  { label: "Founder", value: "founder" },
                  { label: "Teacher", value: "teacher" },
                ],
              },
              { name: "subject", label: "Subject expertise", type: "text" },
              { name: "bio", label: "Bio", type: "textarea" },
              { name: "image_url", label: "Image", type: "image" },
            ]}
            renderRow={(r) => ({
              title: r.name,
              subtitle: `${r.role}${r.subject ? ` • ${r.subject}` : ""}`,
              image: r.image_url,
            })}
          />
        )}
        {tab === "admission_requests" && <AdmissionRequestsManager />}
        {tab === "contact" && <ContactInfoManager />}
        {tab === "messages" && <MessagesManager />}
      </div>
    </section>
  );
}