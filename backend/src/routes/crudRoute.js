import express from "express";
import { query } from "../db.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

// Builds a REST router for a table.
//  GET    /          -> public list (ordered)
//  GET    /:id       -> public single
//  POST   /          -> admin create
//  PUT    /:id       -> admin update
//  DELETE /:id       -> admin delete
export function crudRoute({ table, columns, orderBy = "created_at DESC" }) {
  const router = express.Router();

  const pick = (body) => {
    const values = {};
    for (const col of columns) {
      if (body[col] !== undefined) values[col] = body[col] === "" ? null : body[col];
    }
    return values;
  };

  router.get("/", async (_req, res, next) => {
    try {
      const rows = await query(`SELECT * FROM \`${table}\` ORDER BY ${orderBy}`);
      res.json(rows);
    } catch (e) { next(e); }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const rows = await query(`SELECT * FROM \`${table}\` WHERE id = ?`, [req.params.id]);
      if (!rows.length) return res.status(404).json({ error: "Not found" });
      res.json(rows[0]);
    } catch (e) { next(e); }
  });

  router.post("/", requireAuth, requireAdmin, async (req, res, next) => {
    try {
      const values = pick(req.body);
      const keys = Object.keys(values);
      if (!keys.length) return res.status(400).json({ error: "No valid fields" });
      const placeholders = keys.map(() => "?").join(", ");
      const sql = `INSERT INTO \`${table}\` (${keys.map((k) => `\`${k}\``).join(", ")}) VALUES (${placeholders})`;
      const result = await query(sql, Object.values(values));
      const rows = await query(`SELECT * FROM \`${table}\` WHERE id = ?`, [result.insertId]);
      res.status(201).json(rows[0]);
    } catch (e) { next(e); }
  });

  router.put("/:id", requireAuth, requireAdmin, async (req, res, next) => {
    try {
      const values = pick(req.body);
      const keys = Object.keys(values);
      if (!keys.length) return res.status(400).json({ error: "No valid fields" });
      const setClause = keys.map((k) => `\`${k}\` = ?`).join(", ");
      await query(`UPDATE \`${table}\` SET ${setClause} WHERE id = ?`, [
        ...Object.values(values),
        req.params.id,
      ]);
      const rows = await query(`SELECT * FROM \`${table}\` WHERE id = ?`, [req.params.id]);
      res.json(rows[0]);
    } catch (e) { next(e); }
  });

  router.delete("/:id", requireAuth, requireAdmin, async (req, res, next) => {
    try {
      await query(`DELETE FROM \`${table}\` WHERE id = ?`, [req.params.id]);
      res.json({ success: true });
    } catch (e) { next(e); }
  });

  return router;
}