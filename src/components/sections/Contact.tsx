"use client";

import { Mail, Phone } from "lucide-react";
import Container from "../ui/Container";
import { SectionLabel, GhostWatermark } from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { LinkedinIcon } from "../ui/BrandIcons";
import BookingForm from "../BookingForm";
import { site, socials } from "@/data/site";
import { useI18n } from "@/lib/i18n";

export default function Contact() {
  const { t } = useI18n();
  const linkedin = socials.find((s) => s.icon === "linkedin");

  return (
    <section id="contact" className="border-t border-border py-24 sm:py-32">
      <Container>
        <div className="relative overflow-hidden pb-16 text-center">
          <GhostWatermark text={t.contact.eyebrow} center />
          <div className="relative flex flex-col items-center">
            <SectionLabel index="06" label={t.contact.eyebrow} className="justify-center" />

            <Reveal delay={0.05} className="mt-8 flex justify-center">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-bg-elevated px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-fg-muted">
                <span className="size-2 rounded-full bg-accent" />
                {t.hero.openTo}
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mt-8 text-balance font-display text-4xl font-medium uppercase leading-[1.05] tracking-tight text-fg sm:text-6xl md:text-7xl">
                {t.contact.title}
              </h2>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-fg-muted sm:text-lg">
                {t.contact.description}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="border-t border-border pt-16">
          <Reveal delay={0.1} className="mx-auto max-w-3xl">
            <BookingForm />
          </Reveal>

          <Reveal delay={0.2} className="mx-auto mt-16 max-w-3xl border-t border-border pt-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-subtle">
              {t.contact.booking.orDirect}
            </p>
            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-4">
              <a
                href={`mailto:${site.email}`}
                className="group flex items-center gap-3 text-fg transition-colors hover:text-accent"
              >
                <span className="flex size-9 items-center justify-center rounded-full border border-border transition-colors group-hover:border-accent">
                  <Mail className="size-3.5" />
                </span>
                <span className="text-sm">{site.email}</span>
              </a>
              <a
                href={`tel:${site.phones[0].replace(/\s/g, "")}`}
                className="group flex items-center gap-3 text-fg transition-colors hover:text-accent"
              >
                <span className="flex size-9 items-center justify-center rounded-full border border-border transition-colors group-hover:border-accent">
                  <Phone className="size-3.5" />
                </span>
                <span className="text-sm">{site.phones[0]}</span>
              </a>
              {linkedin && (
                <a
                  href={linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-fg transition-colors hover:text-accent"
                >
                  <span className="flex size-9 items-center justify-center rounded-full border border-border transition-colors group-hover:border-accent">
                    <LinkedinIcon className="size-3.5" />
                  </span>
                  <span className="text-sm">{t.contact.connectLinkedin}</span>
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
