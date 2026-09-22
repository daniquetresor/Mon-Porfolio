"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import ProjectCover from "./ProjectCover";
import { useI18n } from "@/lib/i18n";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t, locale } = useI18n();

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-bg-elevated transition-colors duration-300 hover:border-border-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]">
          <ProjectCover tone={project.cover.tone} />
        </div>
        <div className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-bg/80 text-fg opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2">
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </div>
        <div className="absolute left-4 top-4 font-mono text-xs text-fg-subtle">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
          <span>{t.projects.categoryLabels[project.categories[0]]}</span>
          {project.year && (
            <>
              <span className="text-fg-subtle">·</span>
              <span className="text-fg-subtle">{project.year}</span>
            </>
          )}
        </div>
        <h3 className="text-xl font-medium tracking-tight text-fg transition-colors duration-300 group-hover:text-accent sm:text-2xl">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-fg-muted line-clamp-2">
          {project.summary[locale]}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-fg-subtle"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
