import { NextResponse } from "next/server";
import { readJsonFile, isGithubConfigured } from "@/lib/github";
import type { Testimonial, TestimonialSubmission } from "@/types";

export async function GET() {
  if (!isGithubConfigured()) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN / GITHUB_REPO ne sont pas configurés." },
      { status: 503 }
    );
  }

  try {
    const [pending, published] = await Promise.all([
      readJsonFile<TestimonialSubmission[]>("src/data/testimonials-pending.json"),
      readJsonFile<Testimonial[]>("src/data/testimonials.json"),
    ]);

    return NextResponse.json({
      pending: pending.data,
      published: published.data,
    });
  } catch (error) {
    console.error("Failed to read testimonials", error);
    return NextResponse.json({ error: "Impossible de lire les témoignages." }, { status: 500 });
  }
}
