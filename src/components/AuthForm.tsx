"use client";
import React, { useState } from "react";
import { useAuth } from "../lib/auth";

export default function AuthForm() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "login") {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-slate-800/60 rounded-xl p-6 shadow-lg text-white">
      <h3 className="text-xl font-semibold mb-4">{mode === "login" ? "Login" : "Register"}</h3>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input
          className="px-3 py-2 rounded bg-white/10 outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <input
          className="px-3 py-2 rounded bg-white/10 outline-none"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
        {error && <div className="text-sm text-red-300">{error}</div>}
        <div className="flex gap-2">
          <button disabled={loading} className="px-3 py-2 bg-blue-600 rounded text-white">
            {mode === "login" ? "Login" : "Create account"}
          </button>
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="px-3 py-2 bg-slate-700 rounded text-white/90"
          >
            {mode === "login" ? "Need an account?" : "Have an account?"}
          </button>
        </div>
      </form>
    </div>
  );
}
