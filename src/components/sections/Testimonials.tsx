"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Reveal, { RevealGroup, RevealItem } from "../ui/Reveal";
import TestimonialForm from "../TestimonialForm";
import { testimonials } from "@/data/testimonials";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function Testimonials() {
  const { t } = useI18n();
  const [showForm, setShowForm] = useState(false);

  return (
    <section id="testimonials" className="overflow-hidden border-t border-border py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow={t.testimonials.eyebrow}
            index="06"
            title={t.testimonials.title}
            description={t.testimonials.description}
            className="flex-1"
          />

          <Reveal delay={0.1}>
            <button
              type="button"
              onClick={() => setShowForm((v) => !v)}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
            >
              {showForm ? t.testimonials.cancelButton : t.testimonials.shareButton}
            </button>
          </Reveal>
        </div>

        <AnimatePresence initial={false}>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-12 max-w-2xl rounded-2xl border border-border p-6 sm:p-8">
                <TestimonialForm onSuccess={() => setShowForm(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {testimonials.length === 0 ? (
          <Reveal delay={0.15} className="mt-16">
            <p className="max-w-lg text-base leading-relaxed text-fg-muted">
              {t.testimonials.empty}
            </p>
          </Reveal>
        ) : (
          <RevealGroup className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <RevealItem key={i}>
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-border p-6">
                  <Quote className="size-6 text-accent" strokeWidth={1.5} />
                  {testimonial.rating && (
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                          key={n}
                          className={cn(
                            "size-3.5",
                            n <= testimonial.rating!
                              ? "fill-accent text-accent"
                              : "fill-transparent text-fg-subtle"
                          )}
                        />
                      ))}
                    </div>
                  )}
                  <p className="flex-1 text-sm leading-relaxed text-fg-muted">
                    &ldquo;{testimonial.message}&rdquo;
                  </p>
                  <div>
                    <p className="text-sm font-medium text-fg">{testimonial.name}</p>
                    {(testimonial.role || testimonial.company) && (
                      <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-fg-subtle">
                        {[testimonial.role, testimonial.company].filter(Boolean).join(" — ")}
                      </p>
                    )}
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </Container>
    </section>
  );
}
