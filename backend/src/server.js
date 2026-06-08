import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contact.js";
import uploadRoutes from "./routes/upload.js";
import admissionRequestsRoutes from "./routes/admissionRequests.js";
import { crudRoute } from "./routes/crudRoute.js";
import { initializeDatabase } from "./db.js";


dotenv.config({ path: "./.env" });


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// const origins = (process.env.CORS_ORIGIN || "http://localhost:5173")
//   .split(",")
//   .map((s) => s.trim());

app.use(cors({ 
 origin: [
    "http://localhost:5173",
    "https://svhs-g6ak8n68d-vsatheesh526s-projects.vercel.app/"
  ]

 }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/upload", uploadRoutes);

app.use("/api/notifications", crudRoute({
  table: "notifications",
  columns: ["title", "content"],
}));

app.use("/api/achievements", crudRoute({
  table: "achievements",
  columns: ["title", "description", "category", "image_url", "achieved_on"],
  orderBy: "achieved_on DESC, created_at DESC",
}));

app.use("/api/events", crudRoute({
  table: "events",
  columns: ["title", "description", "event_date", "image_url"],
  orderBy: "event_date DESC, created_at DESC",
}));

app.use("/api/results", crudRoute({
  table: "student_results",
  columns: ["name", "marks", "grade", "rank", "details", "photo_url", "is_topper"],
  orderBy: "`rank` ASC, created_at DESC",
}));

app.use("/api/admissions", crudRoute({
  table: "admissions",
  columns: ["title", "content", "category", "sort_order"],
  orderBy: "sort_order ASC, created_at DESC",
}));

app.use("/api/staff_profiles", crudRoute({
  table: "staff_profiles",
  columns: ["name", "role", "type", "subject", "bio", "image_url"],
  orderBy: "FIELD(type, 'founder', 'teacher'), created_at DESC",
}));

app.use("/api/admission_requests", admissionRequestsRoutes);

// 404
app.use((_req, res) => res.status(404).json({ error: "Route not found" }));

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;

async function start() {
  await initializeDatabase();
  app.listen(PORT, () => console.log(`✅ API running on http://localhost:${PORT}`));
}

start().catch((error) => {
  console.error("Failed to start API:", error);
  process.exit(1);
});