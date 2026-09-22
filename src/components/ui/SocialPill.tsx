import { Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon, TiktokIcon } from "./BrandIcons";
import type { SocialLink } from "@/types";
import { cn } from "@/lib/utils";

const ICONS = {
  linkedin: LinkedinIcon,
  mail: Mail,
  tiktok: TiktokIcon,
  github: GithubIcon,
  phone: Phone,
};

export default function SocialPill({
  social,
  className,
}: {
  social: SocialLink;
  className?: string;
}) {
  const Icon = ICONS[social.icon];
  const external = social.href.startsWith("http");

  return (
    <a
      href={social.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-full border border-border bg-bg-elevated px-4 py-2.5 text-sm text-fg-muted transition-colors hover:border-accent hover:text-fg",
        className
      )}
    >
      <Icon className="size-4 transition-colors group-hover:text-accent" />
      {social.label}
    </a>
  );
}
