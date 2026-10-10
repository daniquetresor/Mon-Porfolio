"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import type { Project } from "@/types";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busySlug, setBusySlug] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/projects", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur de chargement.");
      setProjects(data.projects);
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

  async function handleDelete(slug: string) {
    if (!confirm("Supprimer ce projet définitivement ?")) return;
    setBusySlug(slug);
    try {
      const res = await fetch(`/api/admin/projects/${slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      await load();
    } catch {
      setError("Échec de la suppression. Réessaie.");
    } finally {
      setBusySlug(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium text-fg">Projets</h1>
          <p className="mt-2 text-fg-muted">Ajoute, modifie ou supprime les projets du portfolio.</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-accent"
        >
          <Plus className="size-4" />
          Ajouter
        </Link>
      </div>

      {error && <p className="mt-4 text-sm text-accent">{error}</p>}

      {loading ? (
        <div className="mt-10 flex items-center gap-2 text-fg-muted">
          <Loader2 className="size-4 animate-spin" />
          Chargement...
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-3">
          {projects.map((p) => (
            <div
              key={p.slug}
              className="flex items-center justify-between gap-4 rounded-2xl border border-border p-4"
            >
              <div>
                <p className="font-medium text-fg">{p.title}</p>
                <p className="font-mono text-xs text-fg-subtle">
                  {p.slug} {p.year ? `· ${p.year}` : ""} {p.featured ? "· ⭐ featured" : ""}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Link
                  href={`/admin/projects/${p.slug}/edit`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-fg-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Pencil className="size-3.5" />
                  Modifier
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(p.slug)}
                  disabled={busySlug === p.slug}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-fg-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-60"
                >
                  <Trash2 className="size-3.5" />
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
