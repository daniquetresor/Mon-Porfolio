import { NextResponse } from "next/server";
import { readJsonFile, writeJsonFile, isGithubConfigured } from "@/lib/github";
import type { Testimonial, TestimonialSubmission } from "@/types";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isGithubConfigured()) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN / GITHUB_REPO ne sont pas configurés." },
      { status: 503 }
    );
  }

  const { id } = await params;

  try {
    const { data: pending } = await readJsonFile<TestimonialSubmission[]>(
      "src/data/testimonials-pending.json"
    );
    const submission = pending.find((t) => t.id === id);
    if (!submission) {
      return NextResponse.json({ error: "Témoignage introuvable." }, { status: 404 });
    }

    const { data: published } = await readJsonFile<Testimonial[]>("src/data/testimonials.json");

    const publishedEntry: Testimonial = {
      name: submission.name,
      ...(submission.role ? { role: submission.role } : {}),
      ...(submission.company ? { company: submission.company } : {}),
      message: submission.message,
      ...(submission.rating ? { rating: submission.rating } : {}),
      date: submission.submittedAt.slice(0, 10),
    };

    await writeJsonFile(
      "src/data/testimonials.json",
      [...published, publishedEntry],
      `Approve testimonial from ${submission.name}`
    );

    const remainingPending = pending.filter((t) => t.id !== id);
    await writeJsonFile(
      "src/data/testimonials-pending.json",
      remainingPending,
      `Remove approved testimonial from pending (${submission.name})`
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to approve testimonial", error);
    return NextResponse.json({ error: "Échec de l'approbation." }, { status: 500 });
  }
}
