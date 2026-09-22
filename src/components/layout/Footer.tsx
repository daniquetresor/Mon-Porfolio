"use client";

import { Mail } from "lucide-react";
import Container from "../ui/Container";
import { site, socials, githubUrl } from "@/data/site";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";
import { useI18n } from "@/lib/i18n";

const ICONS = {
  linkedin: LinkedinIcon,
  mail: Mail,
};

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg text-fg">{site.name}</p>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-fg-subtle">
            {t.footer.tagline}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex size-10 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:border-accent hover:text-accent"
            >
              <GithubIcon className="size-4" />
            </a>
          )}
          {socials
            .filter((s) => s.icon === "linkedin" || s.icon === "mail")
            .map((social) => {
              const Icon = ICONS[social.icon as keyof typeof ICONS];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="flex size-10 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
        </div>

        <p className="font-mono text-xs text-fg-subtle">
          © {year} {site.name}. {t.footer.rights}
        </p>
      </Container>
    </footer>
  );
}
