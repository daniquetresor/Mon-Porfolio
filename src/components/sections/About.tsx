"use client";

import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Reveal, { RevealGroup, RevealItem } from "../ui/Reveal";
import { useI18n } from "@/lib/i18n";

export default function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="overflow-hidden border-t border-border py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={t.about.eyebrow} index="01" title={t.about.title} />

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <div className="space-y-6">
            {t.about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p
                  className={
                    i === 0
                      ? "text-balance font-display text-2xl font-medium leading-snug text-fg sm:text-3xl"
                      : "max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg"
                  }
                >
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <RevealGroup className="grid grid-cols-1 gap-6 self-start border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-1 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
            {t.about.facts.map((fact) => (
              <RevealItem key={fact.label}>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-subtle">
                  {fact.label}
                </p>
                <p className="mt-2 text-base text-fg">{fact.value}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
