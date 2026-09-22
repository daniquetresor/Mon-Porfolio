import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/booking-schema";
import { getTransporter, getGmailUser, isMailerConfigured } from "@/lib/mailer";
import { site } from "@/data/site";

function formatDateTime(date: string, time: string, locale: string) {
  const dt = new Date(`${date}T${time}:00`);
  const intlLocale = locale === "fr" ? "fr-FR" : "en-US";
  const dateLabel = new Intl.DateTimeFormat(intlLocale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(dt);
  return `${dateLabel} — ${time}`;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid form data.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { name, email, type, date, time, message } = parsed.data;
  const locale =
    typeof body === "object" && body && "locale" in body && (body as { locale?: unknown }).locale === "fr"
      ? "fr"
      : "en";

  if (!isMailerConfigured()) {
    console.warn("Mailer is not configured — booking request was not sent.", {
      name,
      email,
      type,
      date,
      time,
    });
    return NextResponse.json(
      {
        error:
          "The booking form isn't fully configured yet. Please reach out directly by email in the meantime.",
      },
      { status: 503 }
    );
  }

  const when = formatDateTime(date, time, locale);
  const typeLabel = type === "online" ? "Online (30 min, video call)" : "In person (1h, Abidjan)";

  try {
    const transporter = getTransporter();
    const gmailUser = getGmailUser();

    await transporter.sendMail({
      from: `"Portfolio Booking" <${gmailUser}>`,
      to: site.email,
      replyTo: email,
      subject: `[Booking] New appointment request — ${name}`,
      text: [
        `New appointment request from the portfolio site.`,
        ``,
        `Name: ${name}`,
        `Email: ${email}`,
        `Type: ${typeLabel}`,
        `Requested time: ${when}`,
        ``,
        message ? `Message:\n${message}` : `No message left.`,
        ``,
        `Reply to this email or contact ${name} directly at ${email} to confirm.`,
      ].join("\n"),
    });

    const confirmationText =
      locale === "fr"
        ? [
            `Bonjour ${name},`,
            ``,
            `Merci pour votre demande de rendez-vous — je l'ai bien reçue.`,
            ``,
            `Type : ${type === "online" ? "En ligne (30 min max, appel vidéo)" : "En présentiel (1h max, Abidjan)"}`,
            `Créneau demandé : ${when}`,
            ``,
            `Je confirme les rendez-vous sous 24h maximum par email. Si le créneau ne convient pas, je vous proposerai une alternative.`,
            ``,
            `À bientôt,`,
            `Trésor Ossohou`,
          ].join("\n")
        : [
            `Hi ${name},`,
            ``,
            `Thanks for your appointment request — I've received it.`,
            ``,
            `Type: ${typeLabel}`,
            `Requested time: ${when}`,
            ``,
            `I confirm appointments within 24 hours by email. If that slot doesn't work, I'll suggest an alternative.`,
            ``,
            `Talk soon,`,
            `Trésor Ossohou`,
          ].join("\n");

    await transporter.sendMail({
      from: `"Trésor Ossohou" <${gmailUser}>`,
      to: email,
      subject:
        locale === "fr"
          ? "Votre demande de rendez-vous — Trésor Ossohou"
          : "Your appointment request — Trésor Ossohou",
      text: confirmationText,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send booking email", error);
    return NextResponse.json(
      { error: "Something went wrong sending your request. Please try again." },
      { status: 500 }
    );
  }
}
