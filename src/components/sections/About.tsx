"use client";

import { Download } from "lucide-react";
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

            <Reveal delay={0.3}>
              <a
                href="/documents/tresor-ossohou-cv.pdf"
                download
                className="group mt-2 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
              >
                <Download className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                {t.about.downloadCv}
              </a>
            </Reveal>
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
