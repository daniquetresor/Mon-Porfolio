"use client";

import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale } = useI18n();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border p-0.5 font-mono text-[11px] uppercase tracking-[0.1em]",
        className
      )}
      role="group"
      aria-label="Language"
    >
      {(["en", "fr"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
          className={cn(
            "rounded-full px-2.5 py-1.5 transition-colors",
            locale === code ? "bg-fg text-bg" : "text-fg-muted hover:text-fg"
          )}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
