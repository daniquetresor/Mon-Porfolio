"use client";

import Container from "../ui/Container";
import { SectionLabel } from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { useI18n } from "@/lib/i18n";

export default function CurrentlyExploring() {
  const { t } = useI18n();

  return (
    <section className="border-t border-border py-20">
      <Container>
        <SectionLabel label={t.exploring.label} className="mb-8" />
        <Reveal delay={0.05}>
          <div className="flex flex-wrap gap-3">
            {t.exploring.items.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border px-4 py-2 font-display text-base text-fg-muted transition-colors hover:border-accent hover:text-fg sm:text-lg"
              >
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
