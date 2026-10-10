import { NextResponse } from "next/server";
import { testimonialSchema } from "@/lib/testimonial-schema";
import { getTransporter, getSenderEmail, isMailerConfigured } from "@/lib/mailer";
import { site } from "@/data/site";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = testimonialSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid form data.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { name, email, role, company, message, rating } = parsed.data;
  const locale =
    typeof body === "object" && body && "locale" in body && (body as { locale?: unknown }).locale === "fr"
      ? "fr"
      : "en";

  if (!isMailerConfigured()) {
    console.warn("Mailer is not configured — testimonial submission was not sent.", {
      name,
      email,
    });
    return NextResponse.json(
      {
        error:
          "The testimonial form isn't fully configured yet. Please reach out directly by email in the meantime.",
      },
      { status: 503 }
    );
  }

  const roleLine = [role, company].filter(Boolean).join(" at ") || "—";

  try {
    const transporter = getTransporter();
    const senderEmail = getSenderEmail();

    const confirmationText =
      locale === "fr"
        ? [
            `Bonjour ${name},`,
            ``,
            `Merci beaucoup pour votre témoignage — je l'ai bien reçu.`,
            ``,
            `Je le relis avant publication ; il apparaîtra sur le site une fois validé.`,
            ``,
            `Merci encore,`,
            `Trésor Ossohou`,
          ].join("\n")
        : [
            `Hi ${name},`,
            ``,
            `Thank you so much for your testimonial — I've received it.`,
            ``,
            `I review every submission before it goes live; it'll appear on the site once approved.`,
            ``,
            `Thanks again,`,
            `Trésor Ossohou`,
          ].join("\n");

    await Promise.all([
      transporter.sendMail({
        from: `"Portfolio Testimonial" <${senderEmail}>`,
        to: site.email,
        replyTo: email,
        subject: `[Testimonial] New submission — ${name}`,
        text: [
          `New testimonial submitted on the portfolio site — review before publishing.`,
          ``,
          `Name: ${name}`,
          `Email: ${email}`,
          `Role / Company: ${roleLine}`,
          `Rating: ${rating ? `${rating}/5` : "—"}`,
          ``,
          `Message:`,
          message,
          ``,
          `To publish, add it to src/data/testimonials.ts.`,
        ].join("\n"),
      }),
      transporter.sendMail({
        from: `"Trésor Ossohou" <${senderEmail}>`,
        to: email,
        subject:
          locale === "fr"
            ? "Merci pour votre témoignage — Trésor Ossohou"
            : "Thanks for your testimonial — Trésor Ossohou",
        text: confirmationText,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send testimonial email", error);
    return NextResponse.json(
      { error: "Something went wrong sending your testimonial. Please try again." },
      { status: 500 }
    );
  }
}
