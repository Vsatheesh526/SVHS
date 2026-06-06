import express from "express";
import { query } from "../db.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { parent_name, parent_email, child_name, requested_class, parent_phone, message } = req.body;
    if (!parent_name || !parent_email || !child_name || !requested_class || !parent_phone) {
      return res.status(400).json({ error: "Please provide all required fields." });
    }
    const result = await query(
      "INSERT INTO `admission_requests` (parent_name, parent_email, child_name, requested_class, parent_phone, message, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [parent_name, parent_email, child_name, requested_class, parent_phone, message || null, "pending"]
    );
    const rows = await query("SELECT * FROM `admission_requests` WHERE id = ?", [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status || !["pending", "finished"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value." });
    }
    await query("UPDATE `admission_requests` SET status = ? WHERE id = ?", [status, req.params.id]);
    const rows = await query("SELECT * FROM `admission_requests` WHERE id = ?", [req.params.id]);
    res.json(rows[0]);
  } catch (e) {
    next(e);
  }
});

router.get("/", requireAuth, requireAdmin, async (_req, res, next) => {
  try {
    const rows = await query("SELECT * FROM `admission_requests` ORDER BY created_at DESC");
    res.json(rows);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", requireAuth, requireAdmin, async (req, res, next) => {
  try {
    await query("DELETE FROM `admission_requests` WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
});

export default router;
