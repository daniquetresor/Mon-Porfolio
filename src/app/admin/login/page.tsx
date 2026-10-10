"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setError(data.error || "Mot de passe incorrect.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setStatus("error");
      setError("Une erreur est survenue. Réessayez.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="flex size-12 items-center justify-center rounded-full border border-border text-accent">
            <Lock className="size-5" />
          </span>
          <h1 className="mt-4 font-display text-2xl font-medium text-fg">Espace admin</h1>
          <p className="mt-1 text-sm text-fg-muted">Trésor Ossohou — Portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="password" className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-subtle">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className="mt-2 w-full rounded-xl border border-border bg-bg-elevated px-4 py-3 text-fg outline-none transition-colors focus:border-accent"
            />
          </div>

          {error && <p className="text-sm text-accent">{error}</p>}

          <button
            type="submit"
            disabled={status === "submitting" || !password}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent disabled:opacity-60"
          >
            {status === "submitting" && <Loader2 className="size-4 animate-spin" />}
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
