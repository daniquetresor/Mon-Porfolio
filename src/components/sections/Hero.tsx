"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, MapPin } from "lucide-react";
import { site, socials } from "@/data/site";
import { useI18n } from "@/lib/i18n";
import SocialPill from "../ui/SocialPill";

const word = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const [firstName, ...restName] = site.name.split(" ");
const lastName = restName.join(" ");

export default function Hero() {
  const { t } = useI18n();

  return (
    <section id="home" className="relative overflow-hidden pt-16 pb-24 sm:pt-20 sm:pb-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex justify-center lg:justify-start"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-bg-elevated px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-fg-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {t.hero.openTo}
          </span>
        </motion.div>

        {/* Giant name with portrait overlapping */}
        <div className="relative">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center font-display text-[15vw] font-medium uppercase leading-[0.95] tracking-tight sm:text-[11vw] lg:text-[7.4vw]"
          >
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1.5px var(--color-fg)" }}
            >
              {firstName}
            </span>
            <span className="text-accent">{lastName}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mx-auto -mt-[6vw] h-[54vw] w-[42vw] max-w-[230px] sm:-mt-[5vw] sm:h-[31vw] sm:w-[24vw] lg:-mt-[4vw] lg:h-[20.5vw] lg:w-[16vw] lg:max-h-[283px] lg:max-w-[220px]"
            style={{
              maskImage: "linear-gradient(to bottom, black 88%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 88%, transparent 100%)",
            }}
          >
            <Image
              src="/images/tresor-ossohou-headshot-trimmed.png"
              alt="Portrait of Trésor Ossohou"
              fill
              sizes="(min-width: 1024px) 16vw, 42vw"
              className="object-contain object-bottom grayscale contrast-[1.1]"
              priority
            />
          </motion.div>
        </div>

        {/* Role, description, CTAs + social pills */}
        <div className="relative z-10 mt-6 grid grid-cols-1 gap-10 lg:mt-2 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-8">
          <div className="text-center lg:text-left">
            <motion.p
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.6 } } }}
              className="text-balance font-display text-xl font-medium leading-snug text-fg sm:text-2xl lg:text-3xl"
            >
              {t.hero.title.flat().map((w, i) => (
                <motion.span
                  key={i}
                  variants={word}
                  className={`inline-block ${w.accent ? "text-accent" : ""} mr-[0.28em]`}
                >
                  {w.text}
                </motion.span>
              ))}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="mx-auto mt-4 max-w-lg text-balance text-sm leading-relaxed text-fg-muted sm:text-base lg:mx-0"
            >
              {t.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-7 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-colors duration-300 hover:bg-accent"
              >
                {t.hero.ctaProjects}
                <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
              >
                {t.hero.ctaContact}
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="flex flex-wrap justify-center gap-2.5 lg:flex-col lg:items-end"
          >
            {socials.map((social) => (
              <SocialPill key={social.label} social={social} />
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-border pt-6 font-mono text-xs uppercase tracking-[0.12em] text-fg-subtle lg:justify-start"
        >
          <span className="inline-flex items-center gap-2">
            <MapPin className="size-3.5" />
            {site.location}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
