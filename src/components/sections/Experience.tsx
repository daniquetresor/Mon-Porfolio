"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Award, Briefcase, Camera, Code2, GraduationCap } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Reveal, { RevealGroup, RevealItem } from "../ui/Reveal";
import { experience } from "@/data/experience";
import { useI18n } from "@/lib/i18n";
import type { ExperienceIcon } from "@/types";

const ICONS: Record<ExperienceIcon, React.ComponentType<{ className?: string }>> = {
  education: GraduationCap,
  work: Briefcase,
  cert: Award,
  code: Code2,
  creative: Camera,
};

export default function Experience() {
  const { t, locale } = useI18n();
  const closing = t.experience.closing;
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  function handleMouseMove(e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const HoveredIcon = hovered !== null ? ICONS[experience[hovered].icon] : null;

  return (
    <section id="experience" className="overflow-hidden border-t border-border py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={t.experience.eyebrow} index="05" title={t.experience.title} />

        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHovered(null)}
          className="relative mt-16 overflow-hidden rounded-2xl border border-border bg-bg-elevated-2 px-6 sm:px-10"
        >
          <RevealGroup className="flex flex-col">
            {experience.map((item, i) => (
              <RevealItem key={i}>
                <div
                  onMouseEnter={() => setHovered(i)}
                  className="group grid grid-cols-1 gap-3 border-t border-border py-8 transition-opacity duration-300 first:border-t-0 sm:grid-cols-[160px_1fr] sm:gap-8"
                  style={{
                    opacity: hovered === null || hovered === i ? 1 : 0.45,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        item.current
                          ? "size-2 shrink-0 rounded-full bg-accent"
                          : "size-2 shrink-0 rounded-full bg-border-hover"
                      }
                    />
                    <span className="font-mono text-sm text-fg-subtle">
                      {item.period}
                      {item.current && ` – ${t.experience.present}`}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-fg sm:text-xl">
                      {item.title[locale]}
                      {item.org && <span className="text-fg-muted"> — {item.org[locale]}</span>}
                    </h3>
                    <div className="mt-2 max-w-2xl space-y-2 text-sm leading-relaxed text-fg-muted sm:text-base">
                      {item.description[locale].map((paragraph, j) => (
                        <p key={j}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <AnimatePresence>
            {HoveredIcon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: -6 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{ left: springX, top: springY }}
                className="pointer-events-none absolute z-10 hidden -translate-x-1/2 -translate-y-1/2 sm:block"
              >
                <div className="flex size-24 items-center justify-center rounded-2xl border border-border-hover bg-bg shadow-2xl">
                  <HoveredIcon className="size-9 text-accent" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Reveal>
          <div className="mt-16 max-w-3xl border-t border-border pt-12">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {closing.label}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {closing.disciplines.map((d) => (
                <span
                  key={d}
                  className="rounded-full border border-border px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-fg-muted"
                >
                  {d}
                </span>
              ))}
            </div>
            <p className="mt-6 text-base leading-relaxed text-fg-muted sm:text-lg">
              {closing.body}
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-fg sm:text-lg">
              {closing.goal}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
