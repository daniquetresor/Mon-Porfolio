import { NextResponse } from "next/server";
import { readJsonFile, writeJsonFile, isGithubConfigured } from "@/lib/github";
import { projectSchema } from "@/lib/project-schema";
import type { Project } from "@/types";

export async function GET() {
  if (!isGithubConfigured()) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN / GITHUB_REPO ne sont pas configurés." },
      { status: 503 }
    );
  }
  try {
    const { data } = await readJsonFile<Project[]>("src/data/projects.json");
    return NextResponse.json({ projects: data });
  } catch (error) {
    console.error("Failed to read projects", error);
    return NextResponse.json({ error: "Impossible de lire les projets." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isGithubConfigured()) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN / GITHUB_REPO ne sont pas configurés." },
      { status: 503 }
    );
  }

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

    if (projects.some((p) => p.slug === parsed.data.slug)) {
      return NextResponse.json({ error: "Ce slug existe déjà." }, { status: 409 });
    }

    const newProject = cleanProject(parsed.data);
    await writeJsonFile(
      "src/data/projects.json",
      [...projects, newProject],
      `Add project: ${newProject.title}`
    );

    return NextResponse.json({ success: true, project: newProject });
  } catch (error) {
    console.error("Failed to create project", error);
    return NextResponse.json({ error: "Échec de la création du projet." }, { status: 500 });
  }
}

/** Strips empty-string optional fields so they're omitted from the JSON rather than stored as "". */
export function cleanProject(input: Project): Project {
  const cleaned: Project = { ...input };
  if (!cleaned.github) delete cleaned.github;
  if (!cleaned.live) delete cleaned.live;
  if (!cleaned.year) delete cleaned.year;
  if (cleaned.cover && !cleaned.cover.image) delete cleaned.cover.image;
  if (!cleaned.role) delete cleaned.role;
  if (!cleaned.caseStudy) delete cleaned.caseStudy;
  else if (!cleaned.caseStudy.architecture) delete cleaned.caseStudy.architecture;
  return cleaned;
}
