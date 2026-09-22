"use client";

import Image from "next/image";
import { FileText } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { RevealGroup, RevealItem } from "../ui/Reveal";
import { certifications } from "@/data/certifications";
import { useI18n } from "@/lib/i18n";

export default function Certifications() {
  const { t, locale } = useI18n();
  const intlLocale = locale === "fr" ? "fr-FR" : "en-US";

  return (
    <section id="certifications" className="overflow-hidden border-t border-border py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={t.certifications.eyebrow} index="03" title={t.certifications.title} />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => {
            const dateLabel = cert.date
              ? new Intl.DateTimeFormat(intlLocale, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }).format(new Date(`${cert.date}T00:00:00`))
              : null;

            return (
              <RevealItem key={cert.name}>
                <div className="group flex h-full flex-col justify-between rounded-2xl border border-border p-6 transition-colors duration-300 hover:border-border-hover">
                  <div>
                    {cert.badges && cert.badges.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {cert.badges.map((badge) => (
                          <div
                            key={badge.src}
                            className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-border"
                            title={badge.label}
                          >
                            <Image
                              src={badge.src}
                              alt={badge.label}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-5">
                      <p className="text-base font-medium leading-snug text-fg">{cert.name}</p>
                      <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-fg-subtle">
                        {cert.organization}
                      </p>
                    </div>

                    {(dateLabel || cert.credentialId) && (
                      <div className="mt-3 flex flex-col gap-1 font-mono text-[11px] text-fg-subtle">
                        {dateLabel && <span>{dateLabel}</span>}
                        {cert.credentialId && (
                          <span className="truncate" title={cert.credentialId}>
                            ID: {cert.credentialId}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {cert.certificateFile && (
                    <a
                      href={cert.certificateFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-accent underline-offset-anim"
                    >
                      <FileText className="size-3.5" />
                      {t.certifications.viewCredential}
                    </a>
                  )}
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
