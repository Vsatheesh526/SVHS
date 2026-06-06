import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    email: "",
    password: "",
    resetCode: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      if (mode === "login") {
         await login(form.email, form.password);
      } else {
         if (form.newPassword !== form.confirmPassword) {
           throw new Error("Passwords do not match");
         }
         await resetPassword(form.email, form.resetCode, form.newPassword);
         setMessage("Password reset successful. Please login with your new password.");
         setMode("login");
         setForm({ email: "", password: "", resetCode: "", newPassword: "", confirmPassword: "" });
      }
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Authentication failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="container-page flex min-h-[70vh] items-center justify-center py-16">
      <div className="card w-full max-w-md p-8">
        <div className="flex flex-col items-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold">
            <GraduationCap className="h-6 w-6" />
          </span>
          <h1 className="mt-4 font-display text-2xl font-bold text-navy">
            {mode === "login" ? "Admin Login" : "Reset Admin Password"}
          </h1>
          <p className="mt-1 text-sm text-slate-500 text-center">
            {mode === "login"
              ? "Sign in to manage the website."
              : "Enter the admin email, reset code, and your new password. Ask the developer for the reset code."}
          </p>
        </div>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <input
            required
            type="email"
            placeholder="Admin email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-navy focus:outline-none"
          />
          {mode === "login" ? (
            <input
              required
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-navy focus:outline-none"
            />
          ) : (
            <>
              <input
                required
                type="text"
                placeholder="Reset code"
                value={form.resetCode}
                onChange={(e) => setForm({ ...form, resetCode: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-navy focus:outline-none"
              />
              <input
                required
                type="password"
                placeholder="New password"
                value={form.newPassword}
                onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-navy focus:outline-none"
              />
              <input
                required
                type="password"
                placeholder="Confirm new password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-navy focus:outline-none"
              />
            </>
          )}
          {error && <p className="text-sm text-red-600">{error}</p>}
          {message && <p className="text-sm text-green-600">{message}</p>}
          <button disabled={busy} className="w-full rounded-lg bg-navy px-4 py-2.5 font-semibold text-white hover:bg-navy-light">
            {busy ? "Please wait…" : mode === "login" ? "Login" : "Reset password"}
          </button>
        </form>
        <button
          onClick={() => { setMode(mode === "login" ? "forgot" : "login"); setError(null); setMessage(null); }}
          className="mt-4 w-full text-center text-sm text-navy hover:underline"
        >
          {mode === "login" ? "Forgot password?" : "Back to login"}
        </button>
      </div>
    </section>
  );
}