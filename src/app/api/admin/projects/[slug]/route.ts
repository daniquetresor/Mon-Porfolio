import { NextResponse } from "next/server";
import { readJsonFile, writeJsonFile, isGithubConfigured } from "@/lib/github";
import { projectSchema } from "@/lib/project-schema";
import { cleanProject } from "../route";
import type { Project } from "@/types";

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!isGithubConfigured()) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN / GITHUB_REPO ne sont pas configurés." },
      { status: 503 }
    );
  }

  const { slug } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = projectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  try {
    const { data: projects } = await readJsonFile<Project[]>("src/data/projects.json");
    const index = projects.findIndex((p) => p.slug === slug);
    if (index === -1) {
      return NextResponse.json({ error: "Projet introuvable." }, { status: 404 });
    }

    const updated = cleanProject(parsed.data as Project);
    const next = [...projects];
    next[index] = updated;

    await writeJsonFile("src/data/projects.json", next, `Update project: ${updated.title}`);

    return NextResponse.json({ success: true, project: updated });
  } catch (error) {
    console.error("Failed to update project", error);
    return NextResponse.json({ error: "Échec de la mise à jour." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!isGithubConfigured()) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN / GITHUB_REPO ne sont pas configurés." },
      { status: 503 }
    );
  }

  const { slug } = await params;

  try {
    const { data: projects } = await readJsonFile<Project[]>("src/data/projects.json");
    const target = projects.find((p) => p.slug === slug);
    if (!target) {
      return NextResponse.json({ error: "Projet introuvable." }, { status: 404 });
    }

    const remaining = projects.filter((p) => p.slug !== slug);
    await writeJsonFile("src/data/projects.json", remaining, `Delete project: ${target.title}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete project", error);
    return NextResponse.json({ error: "Échec de la suppression." }, { status: 500 });
  }
}
