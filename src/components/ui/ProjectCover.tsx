import { Aperture, Code2, Network, Radar, Server, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import type { Project } from "@/types";

const ICONS: Record<Project["cover"]["tone"], LucideIcon> = {
  network: Network,
  cyber: ShieldCheck,
  system: Server,
  soc: Radar,
  dev: Code2,
  community: Users,
  creative: Aperture,
};

export default function ProjectCover({ tone }: { tone: Project["cover"]["tone"] }) {
  const Icon = ICONS[tone];

  return (
    <div className="relative h-full w-full overflow-hidden bg-bg-elevated">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -right-10 -top-10 h-56 w-56 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-35"
        style={{ background: "var(--color-accent)" }}
        aria-hidden="true"
      />
      <Icon
        className="absolute -bottom-8 -right-8 size-40 text-fg-subtle/25 transition-transform duration-500 ease-out group-hover:scale-105 group-hover:text-accent/25"
        strokeWidth={1}
        aria-hidden="true"
      />
      <div className="absolute left-6 top-6 h-8 w-8 border-l border-t border-border-hover" aria-hidden="true" />
      <div className="absolute bottom-6 right-6 h-8 w-8 border-b border-r border-border-hover" aria-hidden="true" />
    </div>
  );
}
