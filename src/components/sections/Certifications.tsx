"use client";

import { Award } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "../ui/Reveal";
import { certifications } from "@/data/certifications";
import { useI18n } from "@/lib/i18n";

export default function Certifications() {
  const { t } = useI18n();

  return (
    <section id="certifications" className="overflow-hidden border-t border-border py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={t.certifications.eyebrow} index="03" title={t.certifications.title} />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <RevealItem key={cert.name}>
              <div className="group flex h-full flex-col justify-between rounded-2xl border border-border p-6 transition-colors duration-300 hover:border-border-hover">
                <div className="flex items-start justify-between">
                  <span className="flex size-10 items-center justify-center rounded-full border border-border text-accent transition-colors group-hover:border-accent">
                    <Award className="size-4" />
                  </span>
                  {cert.date && (
                    <span className="font-mono text-[11px] text-fg-subtle">{cert.date}</span>
                  )}
                </div>
                <div className="mt-6">
                  <p className="text-base font-medium leading-snug text-fg">{cert.name}</p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-fg-subtle">
                    {cert.organization}
                  </p>
                </div>
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 font-mono text-xs uppercase tracking-[0.1em] text-accent underline-offset-anim"
                  >
                    {t.certifications.viewCredential}
                  </a>
                )}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
