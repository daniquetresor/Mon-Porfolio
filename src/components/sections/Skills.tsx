"use client";

import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "../ui/Reveal";
import { skillCategories } from "@/data/skills";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

const LEVEL_DOT: Record<string, string> = {
  learning: "bg-fg-subtle",
  practicing: "bg-accent/50",
  comfortable: "bg-accent",
};

export default function Skills() {
  const { t, locale } = useI18n();

  return (
    <section id="skills" className="overflow-hidden border-t border-border py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow={t.skills.eyebrow}
            index="02"
            title={t.skills.title}
            description={t.skills.description}
          />
          <div className="flex shrink-0 flex-wrap gap-4 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-subtle">
            {Object.entries(t.skills.levels).map(([key, label]) => (
              <span key={key} className="inline-flex items-center gap-2">
                <span className={cn("size-1.5 rounded-full", LEVEL_DOT[key])} />
                {label}
              </span>
            ))}
          </div>
        </div>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, i) => (
            <RevealItem
              key={category.title.en}
              className={cn(
                "bg-bg p-8",
                i === skillCategories.length - 1 && "sm:col-span-2 lg:col-span-2"
              )}
            >
              <h3 className="font-display text-lg font-medium text-fg">
                {category.title[locale]}
              </h3>
              <ul className="mt-6 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-fg-muted"
                  >
                    <span className={cn("size-1.5 rounded-full", LEVEL_DOT[skill.level])} />
                    {skill.name}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
