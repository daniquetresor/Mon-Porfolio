"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Loader2, Save, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project, ProjectCategory } from "@/types";

const CATEGORIES: { value: ProjectCategory; label: string }[] = [
  { value: "network", label: "Réseau" },
  { value: "cybersecurity", label: "Cybersécurité" },
  { value: "systems", label: "Administration système" },
  { value: "soc", label: "SOC" },
  { value: "development", label: "Développement" },
  { value: "community", label: "Digital / Communauté" },
  { value: "creative", label: "Entrepreneuriat / Créatif" },
];

const TONES = ["network", "cyber", "system", "soc", "dev", "community", "creative"] as const;

type FormState = {
  slug: string;
  title: string;
  roleEn: string;
  roleFr: string;
  categories: ProjectCategory[];
  year: string;
  summaryEn: string;
  summaryFr: string;
  descriptionEn: string; // one paragraph per line
  descriptionFr: string;
  technologies: string; // comma-separated
  github: string;
  live: string;
  featured: boolean;
  coverTone: (typeof TONES)[number];
  coverImage: string;
  coverImageFit: "cover" | "contain";
  coverFrame: "browser" | "none";
  hasCaseStudy: boolean;
  csOverviewEn: string;
  csOverviewFr: string;
  csProblemEn: string;
  csProblemFr: string;
  csSolutionEn: string;
  csSolutionFr: string;
  csArchitectureEn: string;
  csArchitectureFr: string;
  csTechnologiesEn: string;
  csTechnologiesFr: string;
  csChallengesEn: string;
  csChallengesFr: string;
  csResultEn: string;
  csResultFr: string;
};

function projectToForm(p?: Project): FormState {
  return {
    slug: p?.slug ?? "",
    title: p?.title ?? "",
    roleEn: p?.role?.en ?? "",
    roleFr: p?.role?.fr ?? "",
    categories: p?.categories ?? [],
    year: p?.year ?? "",
    summaryEn: p?.summary?.en ?? "",
    summaryFr: p?.summary?.fr ?? "",
    descriptionEn: p?.description?.en?.join("\n") ?? "",
    descriptionFr: p?.description?.fr?.join("\n") ?? "",
    technologies: p?.technologies?.join(", ") ?? "",
    github: p?.github ?? "",
    live: p?.live ?? "",
    featured: p?.featured ?? false,
    coverTone: p?.cover?.tone ?? "dev",
    coverImage: p?.cover?.image ?? "",
    coverImageFit: p?.cover?.imageFit ?? "cover",
    coverFrame: p?.cover?.frame ?? "none",
    hasCaseStudy: Boolean(p?.caseStudy),
    csOverviewEn: p?.caseStudy?.overview?.en ?? "",
    csOverviewFr: p?.caseStudy?.overview?.fr ?? "",
    csProblemEn: p?.caseStudy?.problem?.en ?? "",
    csProblemFr: p?.caseStudy?.problem?.fr ?? "",
    csSolutionEn: p?.caseStudy?.solution?.en ?? "",
    csSolutionFr: p?.caseStudy?.solution?.fr ?? "",
    csArchitectureEn: p?.caseStudy?.architecture?.en ?? "",
    csArchitectureFr: p?.caseStudy?.architecture?.fr ?? "",
    csTechnologiesEn: p?.caseStudy?.technologies?.en ?? "",
    csTechnologiesFr: p?.caseStudy?.technologies?.fr ?? "",
    csChallengesEn: p?.caseStudy?.challenges?.en ?? "",
    csChallengesFr: p?.caseStudy?.challenges?.fr ?? "",
    csResultEn: p?.caseStudy?.result?.en ?? "",
    csResultFr: p?.caseStudy?.result?.fr ?? "",
  };
}

function formToProject(f: FormState): Project {
  const project: Project = {
    slug: f.slug.trim(),
    title: f.title.trim(),
    categories: f.categories,
    summary: { en: f.summaryEn.trim(), fr: f.summaryFr.trim() },
    description: {
      en: f.descriptionEn.split("\n").map((s) => s.trim()).filter(Boolean),
      fr: f.descriptionFr.split("\n").map((s) => s.trim()).filter(Boolean),
    },
    technologies: f.technologies.split(",").map((s) => s.trim()).filter(Boolean),
    featured: f.featured,
    cover: {
      tone: f.coverTone,
      image: f.coverImage.trim() || undefined,
      imageFit: f.coverImageFit,
      frame: f.coverFrame,
    },
  };
  if (f.year.trim()) project.year = f.year.trim();
  if (f.github.trim()) project.github = f.github.trim();
  if (f.live.trim()) project.live = f.live.trim();
  if (f.roleEn.trim() && f.roleFr.trim()) project.role = { en: f.roleEn.trim(), fr: f.roleFr.trim() };

  if (f.hasCaseStudy) {
    project.caseStudy = {
      overview: { en: f.csOverviewEn.trim(), fr: f.csOverviewFr.trim() },
      problem: { en: f.csProblemEn.trim(), fr: f.csProblemFr.trim() },
      solution: { en: f.csSolutionEn.trim(), fr: f.csSolutionFr.trim() },
      technologies: { en: f.csTechnologiesEn.trim(), fr: f.csTechnologiesFr.trim() },
      challenges: { en: f.csChallengesEn.trim(), fr: f.csChallengesFr.trim() },
      result: { en: f.csResultEn.trim(), fr: f.csResultFr.trim() },
      ...(f.csArchitectureEn.trim() && f.csArchitectureFr.trim()
        ? { architecture: { en: f.csArchitectureEn.trim(), fr: f.csArchitectureFr.trim() } }
        : {}),
    };
  }

  return project;
}

export default function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter();
  const isEdit = Boolean(project);
  const [form, setForm] = useState<FormState>(() => projectToForm(project));
  const [caseStudyOpen, setCaseStudyOpen] = useState(Boolean(project?.caseStudy));
  const [status, setStatus] = useState<"idle" | "saving" | "uploading" | "error">("idle");
  const [error, setError] = useState("");

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleCategory(cat: ProjectCategory) {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));
  }

  async function handleImageUpload(file: File) {
    setStatus("uploading");
    setError("");
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, base64 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Échec de l'upload.");
      set("coverImage", data.path);
      setStatus("idle");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Échec de l'upload.");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setError("");

    if (form.categories.length === 0) {
      setStatus("error");
      setError("Choisis au moins une catégorie.");
      return;
    }

    const payload = formToProject(form);

    try {
      const res = await fetch(
        isEdit ? `/api/admin/projects/${project!.slug}` : "/api/admin/projects",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Échec de l'enregistrement.");

      router.push("/admin/projects");
      router.refresh();
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Échec de l'enregistrement.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {error && <p className="text-sm text-accent">{error}</p>}

      <Section title="Informations générales">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Slug (URL)" value={form.slug} onChange={(v) => set("slug", v)} disabled={isEdit} />
          <Field label="Titre" value={form.title} onChange={(v) => set("title", v)} />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Année (optionnel)" value={form.year} onChange={(v) => set("year", v)} />
          <label className="flex items-center gap-2 self-end pb-3">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => set("featured", e.target.checked)}
              className="size-4 accent-accent"
            />
            <span className="text-sm text-fg-muted">Mettre en avant (featured)</span>
          </label>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-subtle">Catégories</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => toggleCategory(c.value)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs transition-colors",
                  form.categories.includes(c.value)
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-fg-muted hover:border-border-hover"
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <Field label="Technologies (séparées par des virgules)" value={form.technologies} onChange={(v) => set("technologies", v)} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Lien GitHub (optionnel)" value={form.github} onChange={(v) => set("github", v)} />
          <Field label="Lien live (optionnel)" value={form.live} onChange={(v) => set("live", v)} />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Rôle EN (optionnel)" value={form.roleEn} onChange={(v) => set("roleEn", v)} />
          <Field label="Rôle FR (optionnel)" value={form.roleFr} onChange={(v) => set("roleFr", v)} />
        </div>
      </Section>

      <Section title="Résumé & description">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextArea label="Résumé EN" value={form.summaryEn} onChange={(v) => set("summaryEn", v)} rows={3} />
          <TextArea label="Résumé FR" value={form.summaryFr} onChange={(v) => set("summaryFr", v)} rows={3} />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextArea
            label="Description EN (un paragraphe par ligne)"
            value={form.descriptionEn}
            onChange={(v) => set("descriptionEn", v)}
            rows={4}
          />
          <TextArea
            label="Description FR (un paragraphe par ligne)"
            value={form.descriptionFr}
            onChange={(v) => set("descriptionFr", v)}
            rows={4}
          />
        </div>
      </Section>

      <Section title="Image de couverture">
        <div className="flex items-center gap-4">
          {form.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.coverImage} alt="" className="size-20 rounded-xl border border-border object-cover" />
          )}
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-fg-muted transition-colors hover:border-accent hover:text-accent">
            {status === "uploading" ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
            Choisir une image
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
            />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Select
            label="Ambiance (icône de secours)"
            value={form.coverTone}
            onChange={(v) => set("coverTone", v as FormState["coverTone"])}
            options={TONES.map((t) => ({ value: t, label: t }))}
          />
          <Select
            label="Ajustement image"
            value={form.coverImageFit}
            onChange={(v) => set("coverImageFit", v as FormState["coverImageFit"])}
            options={[
              { value: "cover", label: "Cover (remplit le cadre)" },
              { value: "contain", label: "Contain (image entière)" },
            ]}
          />
          <Select
            label="Cadre"
            value={form.coverFrame}
            onChange={(v) => set("coverFrame", v as FormState["coverFrame"])}
            options={[
              { value: "none", label: "Aucun" },
              { value: "browser", label: "Navigateur (pour captures d'écran web)" },
            ]}
          />
        </div>
      </Section>

      <Section>
        <button
          type="button"
          onClick={() => setCaseStudyOpen((v) => !v)}
          className="flex w-full items-center justify-between text-left"
        >
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-fg-subtle">
            Étude de cas (optionnel)
          </span>
          <ChevronDown className={cn("size-4 text-fg-subtle transition-transform", caseStudyOpen && "rotate-180")} />
        </button>

        {caseStudyOpen && (
          <div className="mt-4 flex flex-col gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.hasCaseStudy}
                onChange={(e) => set("hasCaseStudy", e.target.checked)}
                className="size-4 accent-accent"
              />
              <span className="text-sm text-fg-muted">Inclure une étude de cas pour ce projet</span>
            </label>

            {form.hasCaseStudy && (
              <>
                <CaseStudyPair label="Aperçu (overview)" en={form.csOverviewEn} fr={form.csOverviewFr} onEn={(v) => set("csOverviewEn", v)} onFr={(v) => set("csOverviewFr", v)} />
                <CaseStudyPair label="Problème" en={form.csProblemEn} fr={form.csProblemFr} onEn={(v) => set("csProblemEn", v)} onFr={(v) => set("csProblemFr", v)} />
                <CaseStudyPair label="Solution" en={form.csSolutionEn} fr={form.csSolutionFr} onEn={(v) => set("csSolutionEn", v)} onFr={(v) => set("csSolutionFr", v)} />
                <CaseStudyPair label="Architecture (optionnel)" en={form.csArchitectureEn} fr={form.csArchitectureFr} onEn={(v) => set("csArchitectureEn", v)} onFr={(v) => set("csArchitectureFr", v)} />
                <CaseStudyPair label="Technologies" en={form.csTechnologiesEn} fr={form.csTechnologiesFr} onEn={(v) => set("csTechnologiesEn", v)} onFr={(v) => set("csTechnologiesFr", v)} />
                <CaseStudyPair label="Défis" en={form.csChallengesEn} fr={form.csChallengesFr} onEn={(v) => set("csChallengesEn", v)} onFr={(v) => set("csChallengesFr", v)} />
                <CaseStudyPair label="Résultat" en={form.csResultEn} fr={form.csResultFr} onEn={(v) => set("csResultEn", v)} onFr={(v) => set("csResultFr", v)} />
              </>
            )}
          </div>
        )}
      </Section>

      <button
        type="submit"
        disabled={status === "saving" || status === "uploading"}
        className="inline-flex w-fit items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent disabled:opacity-60"
      >
        {status === "saving" ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
        {isEdit ? "Enregistrer les modifications" : "Créer le projet"}
      </button>
    </form>
  );
}

function Section({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border p-6">
      {title && <h2 className="font-display text-lg font-medium text-fg">{title}</h2>}
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-subtle">{label}</label>
      <input
        type="text"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-border bg-bg-elevated px-4 py-3 text-fg outline-none transition-colors focus:border-accent disabled:opacity-50"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-subtle">{label}</label>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full resize-none rounded-xl border border-border bg-bg-elevated px-4 py-3 text-fg outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-subtle">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-border bg-bg-elevated px-4 py-3 text-fg outline-none transition-colors focus:border-accent"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function CaseStudyPair({
  label,
  en,
  fr,
  onEn,
  onFr,
}: {
  label: string;
  en: string;
  fr: string;
  onEn: (v: string) => void;
  onFr: (v: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-fg">{label}</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextArea label="EN" value={en} onChange={onEn} rows={2} />
        <TextArea label="FR" value={fr} onChange={onFr} rows={2} />
      </div>
    </div>
  );
}
