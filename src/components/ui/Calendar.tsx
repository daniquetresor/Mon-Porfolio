"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function startOfDay(d: Date) {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export default function Calendar({
  locale,
  selected,
  onSelect,
}: {
  locale: Locale;
  selected: Date | null;
  onSelect: (date: Date) => void;
}) {
  const intlLocale = locale === "fr" ? "fr-FR" : "en-US";
  const today = startOfDay(new Date());
  const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthLabel = new Intl.DateTimeFormat(intlLocale, { month: "long", year: "numeric" }).format(viewDate);

  const firstDay = new Date(year, month, 1);
  const startWeekday = (firstDay.getDay() + 6) % 7; // Monday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const weekdayLabels = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(2024, 0, i + 1); // Jan 1 2024 is a Monday
    return new Intl.DateTimeFormat(intlLocale, { weekday: "short" }).format(d);
  });

  const cells: (Date | null)[] = [
    ...Array(startWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  const canGoPrev = !(year === today.getFullYear() && month === today.getMonth());

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => canGoPrev && setViewDate(new Date(year, month - 1, 1))}
          disabled={!canGoPrev}
          aria-label="Previous month"
          className="flex size-8 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft className="size-4" />
        </button>
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-fg capitalize">{monthLabel}</p>
        <button
          type="button"
          onClick={() => setViewDate(new Date(year, month + 1, 1))}
          aria-label="Next month"
          className="flex size-8 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:border-accent hover:text-accent"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekdayLabels.map((w) => (
          <div key={w} className="py-1 text-center font-mono text-[10px] uppercase text-fg-subtle">
            {w}
          </div>
        ))}
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const disabled = d < today;
          const active = selected !== null && isSameDay(d, selected);
          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(d)}
              aria-pressed={active}
              className={cn(
                "aspect-square rounded-lg font-mono text-sm transition-colors",
                disabled && "cursor-not-allowed text-fg-subtle/25",
                !disabled && !active && "text-fg-muted hover:bg-bg-elevated-2 hover:text-fg",
                active && "bg-accent font-medium text-bg"
              )}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
