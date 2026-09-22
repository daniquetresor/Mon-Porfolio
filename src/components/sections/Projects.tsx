"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import ProjectCard from "../ui/ProjectCard";
import { projects } from "@/data/projects";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/types";

export default function Projects() {
  const { t } = useI18n();
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");

  const availableCategories = useMemo(() => {
    const seen: ProjectCategory[] = [];
    for (const project of projects) {
      for (const c of project.categories) {
        if (!seen.includes(c)) seen.push(c);
      }
    }
    return seen;
  }, []);

  const filtered = useMemo(
    () =>
      filter === "all" ? projects : projects.filter((p) => p.categories.includes(filter)),
    [filter]
  );

  return (
    <section id="projects" className="overflow-hidden border-t border-border py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow={t.projects.eyebrow}
            index="04"
            title={t.projects.title}
            description={t.projects.description}
            className="flex-1"
          />

          <Reveal delay={0.1} className="flex flex-wrap gap-2 lg:justify-end">
            <FilterTab active={filter === "all"} onClick={() => setFilter("all")}>
              {t.projects.filterAll}
            </FilterTab>
            {availableCategories.map((c) => (
              <FilterTab key={c} active={filter === c} onClick={() => setFilter(c)}>
                {t.projects.categoryLabels[c]}
              </FilterTab>
            ))}
          </Reveal>
        </div>

        <motion.div layout className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-fg-muted">{t.projects.empty}</p>
        )}
      </Container>
    </section>
  );
}

function FilterTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] transition-colors",
        active
          ? "border-accent bg-accent/10 text-accent"
          : "border-border text-fg-muted hover:border-border-hover hover:text-fg"
      )}
    >
      {children}
    </button>
  );
}
