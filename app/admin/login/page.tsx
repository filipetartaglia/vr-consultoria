"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError("E-mail ou senha inválidos.");
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Supabase ainda não está configurado neste ambiente.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-sm border border-line w-full max-w-sm">
        <div className="font-display font-medium text-lg text-navy mb-6">VR · Admin</div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-navy-2 mb-1.5">E-mail</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-line rounded-sm px-4 py-3 text-sm outline-none focus:border-navy-2"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-navy-2 mb-1.5">Senha</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-line rounded-sm px-4 py-3 text-sm outline-none focus:border-navy-2"
          />
        </div>
        {error && <p className="text-sm text-red-700 mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-navy text-white font-semibold text-sm py-3 rounded-sm hover:bg-navy-2 transition-colors disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
