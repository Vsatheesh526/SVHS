import express from "express";
import { query } from "../db.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// ---- Contact info (single editable row) -------------------
router.get("/info", async (_req, res, next) => {
  try {
    const rows = await query("SELECT * FROM contact_info ORDER BY id ASC LIMIT 1");
    res.json(rows[0] || null);
  } catch (e) { next(e); }
});

router.put("/info", requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const { address, phone, email, map_embed_url } = req.body;
    const existing = await query("SELECT id FROM contact_info ORDER BY id ASC LIMIT 1");
    if (existing.length) {
      await query(
        "UPDATE contact_info SET address=?, phone=?, email=?, map_embed_url=? WHERE id=?",
        [address || null, phone || null, email || null, map_embed_url || null, existing[0].id]
      );
    } else {
      await query(
        "INSERT INTO contact_info (address, phone, email, map_embed_url) VALUES (?, ?, ?, ?)",
        [address || null, phone || null, email || null, map_embed_url || null]
      );
    }
    const rows = await query("SELECT * FROM contact_info ORDER BY id ASC LIMIT 1");
    res.json(rows[0]);
  } catch (e) { next(e); }
});

// ---- Messages ---------------------------------------------
// Public submit
router.post("/messages", async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email and message are required" });
    }
    await query(
      "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );
    res.status(201).json({ success: true });
  } catch (e) { next(e); }
});

// Admin read + delete
router.get("/messages", requireAuth, requireAdmin, async (_req, res, next) => {
  try {
    const rows = await query("SELECT * FROM contact_messages ORDER BY created_at DESC");
    res.json(rows);
  } catch (e) { next(e); }
});

router.delete("/messages/:id", requireAuth, requireAdmin, async (req, res, next) => {
  try {
    await query("DELETE FROM contact_messages WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (e) { next(e); }
});

export default router;