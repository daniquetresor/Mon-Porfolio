import { cn } from "@/lib/utils";

export default function Tag({
  children,
  className,
  muted = false,
}: {
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em]",
        muted
          ? "border-border text-fg-subtle"
          : "border-border text-fg-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
