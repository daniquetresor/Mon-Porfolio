"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, Star, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Testimonial, TestimonialSubmission } from "@/types";

export default function AdminTestimonialsPage() {
  const [pending, setPending] = useState<TestimonialSubmission[]>([]);
  const [published, setPublished] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/testimonials", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur de chargement.");
      setPending(data.pending);
      setPublished(data.published);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur de chargement.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial async data fetch on mount
    load();
  }, []);

  async function approve(id: string) {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/testimonials/${id}/approve`, { method: "POST" });
      if (!res.ok) throw new Error();
      await load();
    } catch {
      setError("Échec de l'approbation. Réessaie.");
    } finally {
      setBusyId(null);
    }
  }

  async function reject(id: string) {
    if (!confirm("Rejeter et supprimer ce témoignage ?")) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/testimonials/${id}?from=pending`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      await load();
    } catch {
      setError("Échec de la suppression. Réessaie.");
    } finally {
      setBusyId(null);
    }
  }

  async function removePublished(index: number) {
    if (!confirm("Retirer ce témoignage du site ?")) return;
    const key = `pub-${index}`;
    setBusyId(key);
    try {
      const res = await fetch(`/api/admin/testimonials/${index}?from=published`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      await load();
    } catch {
      setError("Échec de la suppression. Réessaie.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-medium text-fg">Témoignages</h1>
      <p className="mt-2 text-fg-muted">Approuve ou rejette les témoignages soumis depuis le site.</p>

      {error && <p className="mt-4 text-sm text-accent">{error}</p>}

      {loading ? (
        <div className="mt-10 flex items-center gap-2 text-fg-muted">
          <Loader2 className="size-4 animate-spin" />
          Chargement...
        </div>
      ) : (
        <>
          <section className="mt-10">
            <h2 className="font-mono text-xs uppercase tracking-[0.15em] text-fg-subtle">
              En attente ({pending.length})
            </h2>
            {pending.length === 0 ? (
              <p className="mt-4 text-sm text-fg-muted">Aucun témoignage en attente.</p>
            ) : (
              <div className="mt-4 flex flex-col gap-4">
                {pending.map((t) => (
                  <div key={t.id} className="rounded-2xl border border-border p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-fg">{t.name}</p>
                        <p className="font-mono text-xs text-fg-subtle">
                          {[t.role, t.company].filter(Boolean).join(" — ") || "—"} · {t.email}
                        </p>
                        {t.rating && (
                          <div className="mt-1 flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((n) => (
                              <Star
                                key={n}
                                className={cn(
                                  "size-3.5",
                                  n <= t.rating! ? "fill-accent text-accent" : "fill-transparent text-fg-subtle"
                                )}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <button
                          type="button"
                          onClick={() => approve(t.id)}
                          disabled={busyId === t.id}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-fg-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-60"
                        >
                          <Check className="size-3.5" />
                          Approuver
                        </button>
                        <button
                          type="button"
                          onClick={() => reject(t.id)}
                          disabled={busyId === t.id}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-fg-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-60"
                        >
                          <Trash2 className="size-3.5" />
                          Rejeter
                        </button>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-fg-muted">{t.message}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="mt-12">
            <h2 className="font-mono text-xs uppercase tracking-[0.15em] text-fg-subtle">
              Publiés ({published.length})
            </h2>
            {published.length === 0 ? (
              <p className="mt-4 text-sm text-fg-muted">Aucun témoignage publié pour le moment.</p>
            ) : (
              <div className="mt-4 flex flex-col gap-4">
                {published.map((t, i) => (
                  <div key={i} className="rounded-2xl border border-border p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-fg">{t.name}</p>
                        <p className="font-mono text-xs text-fg-subtle">
                          {[t.role, t.company].filter(Boolean).join(" — ") || "—"}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removePublished(i)}
                        disabled={busyId === `pub-${i}`}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-fg-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-60"
                      >
                        <Trash2 className="size-3.5" />
                        Retirer
                      </button>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-fg-muted">{t.message}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
