"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import ProjectCover from "@/components/ui/ProjectCover";
import BrowserFrame from "@/components/ui/BrowserFrame";
import Reveal from "@/components/ui/Reveal";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { useI18n } from "@/lib/i18n";
import type { Project } from "@/types";

const SECTION_KEYS = [
  "overview",
  "problem",
  "solution",
  "architecture",
  "technologies",
  "challenges",
  "result",
] as const;

export default function ProjectCaseStudy({
  project,
  next,
}: {
  project: Project;
  next: Project;
}) {
  const { t, locale } = useI18n();
  const caseStudy = project.caseStudy;
  const sections = t.projectPage.sections;

  return (
    <article className="pb-24 pt-12 sm:pb-32">
      <Container>
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-fg-muted transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowLeft className="size-3.5" />
            {t.projectPage.allProjects}
          </Link>
          <span className="hidden items-center gap-2.5 rounded-full border border-border bg-bg-elevated px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-fg-muted sm:inline-flex">
            <span className="size-2 rounded-full bg-accent" />
            {t.hero.openTo}
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <Reveal>
            <div className="flex flex-wrap gap-2">
              {project.categories.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-accent"
                >
                  {t.projects.categoryLabels[c]}
                </span>
              ))}
            </div>
            <h1 className="mt-6 text-balance font-display text-4xl font-medium leading-[1.05] tracking-tight text-fg sm:text-6xl">
              {project.title}
            </h1>
            {project.role && (
              <p className="mt-4 font-mono text-sm uppercase tracking-[0.1em] text-fg-subtle">
                {project.role[locale]}
              </p>
            )}
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col items-start gap-4 lg:items-end">
            {project.year && (
              <span className="font-mono text-sm text-fg-subtle">{project.year}</span>
            )}
            <div className="flex flex-wrap gap-3 lg:justify-end">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-accent"
                >
                  {t.projectPage.visitLive}
                  <ArrowUpRight className="size-4" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
                >
                  <GithubIcon className="size-4" />
                  {t.projectPage.viewCode}
                </a>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-14">
          <BrowserFrame>
            <ProjectCover tone={project.cover.tone} />
          </BrowserFrame>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-16 lg:grid-cols-[220px_1fr]">
          <Reveal className="hidden lg:block">
            <nav className="sticky top-32 flex flex-col gap-3">
              {SECTION_KEYS.filter((key) => caseStudy?.[key]).map((key, i) => (
                <a
                  key={key}
                  href={`#${key}`}
                  className="font-mono text-xs uppercase tracking-[0.1em] text-fg-subtle transition-colors hover:text-accent"
                >
                  {String(i + 1).padStart(2, "0")} — {sections[key]}
                </a>
              ))}
              <a
                href="#links"
                className="font-mono text-xs uppercase tracking-[0.1em] text-fg-subtle transition-colors hover:text-accent"
              >
                {String(
                  SECTION_KEYS.filter((key) => caseStudy?.[key]).length + 1
                ).padStart(2, "0")}{" "}
                — {sections.links}
              </a>
            </nav>
          </Reveal>

          <div className="flex flex-col gap-16">
            {caseStudy &&
              SECTION_KEYS.map((key, i) => {
                const content = caseStudy[key];
                if (!content) return null;
                return (
                  <Reveal key={key}>
                    <div id={key} className="scroll-mt-32">
                      <p className="font-mono text-xs text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <h2 className="mt-2 font-display text-2xl font-medium text-fg sm:text-3xl">
                        {sections[key]}
                      </h2>
                      <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
                        {content[locale]}
                      </p>
                    </div>
                  </Reveal>
                );
              })}

            <Reveal>
              <div id="links" className="scroll-mt-32 border-t border-border pt-10">
                <p className="font-mono text-xs text-accent">
                  {String(
                    SECTION_KEYS.filter((key) => caseStudy?.[key]).length + 1
                  ).padStart(2, "0")}
                </p>
                <h2 className="mt-2 font-display text-2xl font-medium text-fg sm:text-3xl">
                  {t.projectPage.technologiesUsed}
                </h2>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-fg-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-24 flex items-center justify-between border-t border-border pt-10">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-fg-subtle">
            {t.projectPage.nextProject}
          </span>
          <Link
            href={`/projects/${next.slug}`}
            className="group flex items-center gap-3 font-display text-xl text-fg transition-colors hover:text-accent sm:text-2xl"
          >
            {next.title}
            <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </Container>
    </article>
  );
}
