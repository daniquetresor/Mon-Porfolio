"use client";

import { useState } from "react";
import { Loader2, Send, Star } from "lucide-react";
import { testimonialSchema } from "@/lib/testimonial-schema";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  role: string;
  company: string;
  message: string;
};

const INITIAL_STATE: FormState = { name: "", email: "", role: "", company: "", message: "" };

type Status = "idle" | "submitting" | "success" | "error";

export default function TestimonialForm({ onSuccess }: { onSuccess?: () => void }) {
  const { t, locale } = useI18n();
  const f = t.testimonials.form;

  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setFeedback("");

    const payload = {
      ...form,
      rating: rating > 0 ? rating : undefined,
    };

    const parsed = testimonialSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        name: Boolean(fieldErrors.name?.length),
        email: Boolean(fieldErrors.email?.length),
        message: Boolean(fieldErrors.message?.length),
      });
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, locale }),
      });

      if (!res.ok) {
        setStatus("error");
        setFeedback(res.status === 503 ? f.errorUnavailable : f.errorGeneric);
        return;
      }

      setStatus("success");
      setFeedback(f.success);
      setForm(INITIAL_STATE);
      setRating(0);
      onSuccess?.();
    } catch {
      setStatus("error");
      setFeedback(f.errorGeneric);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field
          label={f.name}
          id="testimonial-name"
          value={form.name}
          onChange={(v) => handleChange("name", v)}
          error={errors.name ? f.errorName : undefined}
          autoComplete="name"
        />
        <Field
          label={f.email}
          id="testimonial-email"
          type="email"
          value={form.email}
          onChange={(v) => handleChange("email", v)}
          error={errors.email ? f.errorEmail : undefined}
          autoComplete="email"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field
          label={f.role}
          id="testimonial-role"
          value={form.role}
          onChange={(v) => handleChange("role", v)}
        />
        <Field
          label={f.company}
          id="testimonial-company"
          value={form.company}
          onChange={(v) => handleChange("company", v)}
        />
      </div>

      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-subtle">
          {f.rating}
        </p>
        <div className="mt-2 flex items-center gap-1" onMouseLeave={() => setHoverRating(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              onMouseEnter={() => setHoverRating(n)}
              aria-label={`${n}/5`}
              className="p-0.5"
            >
              <Star
                className={cn(
                  "size-6 transition-colors",
                  n <= (hoverRating || rating)
                    ? "fill-accent text-accent"
                    : "fill-transparent text-fg-subtle"
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="testimonial-message"
          className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-subtle"
        >
          {f.message}
        </label>
        <textarea
          id="testimonial-message"
          rows={4}
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "testimonial-message-error" : undefined}
          className="mt-2 w-full resize-none rounded-xl border border-border bg-bg-elevated px-4 py-3 text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-accent"
          placeholder={f.messagePlaceholder}
        />
        {errors.message && (
          <p id="testimonial-message-error" className="mt-2 text-sm text-accent">
            {f.errorMessage}
          </p>
        )}
      </div>

      <p className="text-xs text-fg-subtle">{f.privacyNote}</p>

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
        {status === "submitting" ? f.sending : f.submit}
      </button>

      {feedback && (
        <p role="status" className={status === "success" ? "text-sm text-accent" : "text-sm text-fg-muted"}>
          {feedback}
        </p>
      )}
    </form>
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
