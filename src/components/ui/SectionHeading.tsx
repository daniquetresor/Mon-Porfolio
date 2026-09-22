import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

export function SectionLabel({
  index,
  label,
  className,
}: {
  index?: string;
  label: string;
  className?: string;
}) {
  return (
    <Reveal className={cn("flex items-center gap-3", className)}>
      {index && (
        <span className="font-mono text-xs text-accent tracking-[0.15em]">{index}</span>
      )}
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-fg-muted">
        {label}
      </span>
    </Reveal>
  );
}

export function GhostWatermark({
  text,
  center = false,
  className,
}: {
  text: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -top-4 select-none whitespace-nowrap font-display text-[16vw] font-medium leading-none tracking-tight text-fg/[0.035] sm:text-[10vw]",
        center ? "left-1/2 -translate-x-1/2" : "left-0",
        className
      )}
    >
      {text}
    </span>
  );
}

export default function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  ghost,
  className,
}: {
  eyebrow: string;
  index?: string;
  title: string;
  description?: string;
  ghost?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative max-w-3xl", className)}>
      <GhostWatermark text={ghost ?? eyebrow} />
      <div className="relative">
        <SectionLabel index={index} label={eyebrow} className="mb-5" />
        <Reveal delay={0.05}>
          <h2 className="text-balance font-display text-4xl font-medium leading-[1.1] tracking-tight text-fg sm:text-5xl md:text-6xl">
            {title}
          </h2>
        </Reveal>
        {description && (
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
