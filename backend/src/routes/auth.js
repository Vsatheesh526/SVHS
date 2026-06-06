import express from "express";
import bcrypt from "bcryptjs";
import { query } from "../db.js";
import { signToken, requireAuth } from "../middleware/auth.js";

const router = express.Router();
const PASSWORD_RESET_CODE = process.env.PASSWORD_RESET_CODE || "admin-reset-2026";

router.post("/register", (_req, res) => {
  res.status(403).json({ error: "Admin registration is disabled. Use the default credentials provided by the developer." });
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });
    const rows = await query("SELECT * FROM users WHERE email = ?", [email]);
    if (!rows.length) return res.status(401).json({ error: "Invalid credentials" });
    const ok = await bcrypt.compare(password, rows[0].password_hash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });
    const user = { id: rows[0].id, email: rows[0].email, role: rows[0].role };
    res.json({ token: signToken(user), user });
  } catch (e) { next(e); }
});

router.post("/forgot-password", async (req, res, next) => {
  try {
    const { email, resetCode, newPassword } = req.body;
    if (!email || !resetCode || !newPassword) {
      return res.status(400).json({ error: "Email, reset code, and new password are required" });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: "New password must be at least 6 characters" });
    }
    if (resetCode !== PASSWORD_RESET_CODE) {
      return res.status(403).json({ error: "Invalid password reset code" });
    }
    const rows = await query("SELECT id, role FROM users WHERE email = ?", [email]);
    if (!rows.length) return res.status(404).json({ error: "Email not found" });
    if (rows[0].role !== "admin") {
      return res.status(403).json({ error: "Password reset is only available for admin accounts" });
    }
    const hash = await bcrypt.hash(newPassword, 10);
    await query("UPDATE users SET password_hash = ? WHERE id = ?", [hash, rows[0].id]);
    res.json({ message: "Password updated successfully" });
  } catch (e) { next(e); }
});

router.post("/change-password", requireAuth, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Current and new password are required" });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: "New password must be at least 6 characters" });
    }
    const rows = await query("SELECT password_hash FROM users WHERE id = ?", [req.user.id]);
    if (!rows.length) return res.status(404).json({ error: "User not found" });
    const ok = await bcrypt.compare(currentPassword, rows[0].password_hash);
    if (!ok) return res.status(401).json({ error: "Invalid current password" });
    const hash = await bcrypt.hash(newPassword, 10);
    await query("UPDATE users SET password_hash = ? WHERE id = ?", [hash, req.user.id]);
    res.json({ message: "Password changed successfully" });
  } catch (e) { next(e); }
});

router.get("/me", requireAuth, async (req, res) => {
  res.json({ user: req.user });
});

export default router;