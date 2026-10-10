import { NextResponse } from "next/server";
import { readJsonFile, writeJsonFile, isGithubConfigured } from "@/lib/github";
import type { Testimonial, TestimonialSubmission } from "@/types";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isGithubConfigured()) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN / GITHUB_REPO ne sont pas configurés." },
      { status: 503 }
    );
  }

  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from"); // "pending" | "published"

  try {
    if (from === "published") {
      const { data } = await readJsonFile<(Testimonial & { id?: string })[]>(
        "src/data/testimonials.json"
      );
      const index = Number(id);
      const remaining = data.filter((_, i) => i !== index);
      await writeJsonFile("src/data/testimonials.json", remaining, `Remove published testimonial`);
    } else {
      const { data } = await readJsonFile<TestimonialSubmission[]>(
        "src/data/testimonials-pending.json"
      );
      const remaining = data.filter((t) => t.id !== id);
      await writeJsonFile(
        "src/data/testimonials-pending.json",
        remaining,
        `Reject pending testimonial`
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete testimonial", error);
    return NextResponse.json({ error: "Échec de la suppression." }, { status: 500 });
  }
}
