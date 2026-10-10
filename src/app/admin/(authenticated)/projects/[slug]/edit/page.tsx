"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import ProjectForm from "@/components/admin/ProjectForm";
import type { Project } from "@/types";

export default function EditProjectPage() {
  const params = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/projects", { cache: "no-store" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Erreur de chargement.");
        const found = (data.projects as Project[]).find((p) => p.slug === params.slug);
        if (!found) throw new Error("Projet introuvable.");
        setProject(found);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Erreur de chargement.");
      } finally {
        setLoading(false);
      }
    })();
  }, [params.slug]);

  return (
    <div>
      <h1 className="font-display text-3xl font-medium text-fg">Modifier le projet</h1>

      {loading ? (
        <div className="mt-10 flex items-center gap-2 text-fg-muted">
          <Loader2 className="size-4 animate-spin" />
          Chargement...
        </div>
      ) : error ? (
        <p className="mt-4 text-sm text-accent">{error}</p>
      ) : (
        <div className="mt-8">
          <ProjectForm project={project!} />
        </div>
      )}
    </div>
  );
}
