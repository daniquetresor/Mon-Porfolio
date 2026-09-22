"use client";

import { useMemo, useState } from "react";
import { Loader2, Send, Video, Users } from "lucide-react";
import Calendar from "./ui/Calendar";
import { bookingSchema, type MeetingType } from "@/lib/booking-schema";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const TIME_SLOTS = Array.from({ length: 18 }, (_, i) => {
  const totalMinutes = 9 * 60 + i * 30;
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
});

function toDateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

type Status = "idle" | "submitting" | "success" | "error";

export default function BookingForm() {
  const { t, locale } = useI18n();
  const booking = t.contact.booking;

  const [type, setType] = useState<MeetingType>("online");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Partial<Record<"name" | "email" | "date" | "time", boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  const dateKey = useMemo(() => (selectedDate ? toDateKey(selectedDate) : ""), [selectedDate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setFeedback("");

    const payload = {
      name,
      email,
      type,
      date: dateKey,
      time: selectedTime ?? "",
      message,
    };

    const parsed = bookingSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        name: Boolean(fieldErrors.name?.length),
        email: Boolean(fieldErrors.email?.length),
        date: Boolean(fieldErrors.date?.length),
        time: Boolean(fieldErrors.time?.length),
      });
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, locale }),
      });

      if (!res.ok) {
        setStatus("error");
        setFeedback(res.status === 503 ? t.contact.errorUnavailable : t.contact.errorGeneric);
        return;
      }

      setStatus("success");
      setFeedback(t.contact.success);
      setName("");
      setEmail("");
      setMessage("");
      setSelectedDate(null);
      setSelectedTime(null);
    } catch {
      setStatus("error");
      setFeedback(t.contact.errorGeneric);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      <p className="text-sm leading-relaxed text-fg-muted sm:text-base">{booking.intro}</p>

      {/* Meeting type */}
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-subtle">
          {booking.typeLabel}
        </p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <TypeCard
            active={type === "online"}
            onClick={() => setType("online")}
            icon={<Video className="size-4" />}
            label={booking.online}
            duration={booking.onlineDuration}
          />
          <TypeCard
            active={type === "in-person"}
            onClick={() => setType("in-person")}
            icon={<Users className="size-4" />}
            label={booking.inPerson}
            duration={booking.inPersonDuration}
          />
        </div>
      </div>

      {/* Date + time */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-[auto_1fr]">
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.15em] text-fg-subtle">
            {booking.dateLabel}
          </p>
          <Calendar locale={locale} selected={selectedDate} onSelect={setSelectedDate} />
          {errors.date && <p className="mt-2 text-sm text-accent">{t.contact.errorDate}</p>}
        </div>

        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.15em] text-fg-subtle">
            {booking.timeLabel}
          </p>
          {!selectedDate ? (
            <p className="text-sm text-fg-subtle">{booking.selectDatePrompt}</p>
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  aria-pressed={selectedTime === slot}
                  className={cn(
                    "rounded-lg border px-3 py-2 font-mono text-sm transition-colors",
                    selectedTime === slot
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border text-fg-muted hover:border-border-hover hover:text-fg"
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>
          )}
          {errors.time && <p className="mt-2 text-sm text-accent">{t.contact.errorTime}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field
          label={t.contact.name}
          id="booking-name"
          value={name}
          onChange={setName}
          error={errors.name ? t.contact.errorName : undefined}
          autoComplete="name"
        />
        <Field
          label={t.contact.email}
          id="booking-email"
          type="email"
          value={email}
          onChange={setEmail}
          error={errors.email ? t.contact.errorEmail : undefined}
          autoComplete="email"
        />
      </div>

      <div>
        <label
          htmlFor="booking-message"
          className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-subtle"
        >
          {t.contact.message}
        </label>
        <textarea
          id="booking-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-2 w-full resize-none rounded-xl border border-border bg-bg-elevated px-4 py-3 text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-accent"
          placeholder={t.contact.messagePlaceholder}
        />
      </div>

      <p className="text-sm text-fg-subtle">{booking.confirmNotice}</p>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group inline-flex w-fit items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-colors duration-300 hover:bg-accent disabled:opacity-60"
      >
        {status === "submitting" ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        )}
        {status === "submitting" ? t.contact.sending : t.contact.send}
      </button>

      {feedback && (
        <p role="status" className={status === "success" ? "text-sm text-accent" : "text-sm text-fg-muted"}>
          {feedback}
        </p>
      )}
    </form>
  );
}

function TypeCard({
  active,
  onClick,
  icon,
  label,
  duration,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  duration: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex items-start gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
        active ? "border-accent bg-accent/10" : "border-border hover:border-border-hover"
      )}
    >
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full border",
          active ? "border-accent text-accent" : "border-border text-fg-muted"
        )}
      >
        {icon}
      </span>
      <span>
        <span className={cn("block text-sm font-medium", active ? "text-accent" : "text-fg")}>
          {label}
        </span>
        <span className="block text-xs text-fg-subtle">{duration}</span>
      </span>
    </button>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-subtle">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-2 w-full rounded-xl border border-border bg-bg-elevated px-4 py-3 text-fg outline-none transition-colors focus:border-accent"
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-accent">
          {error}
        </p>
      )}
    </div>
  );
}
