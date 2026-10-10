import { NextResponse } from "next/server";
import { writeBinaryFile, isGithubConfigured } from "@/lib/github";

const ALLOWED_EXTENSIONS = ["png", "jpg", "jpeg", "webp", "gif"];

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

  const { filename, base64 } = (body ?? {}) as { filename?: string; base64?: string };
  if (!filename || !base64) {
    return NextResponse.json({ error: "Fichier manquant." }, { status: 400 });
  }

  const safeName = filename
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-");
  const ext = safeName.split(".").pop() ?? "";
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return NextResponse.json({ error: "Format d'image non supporté." }, { status: 400 });
  }

  const path = `public/images/projects/${Date.now()}-${safeName}`;

  try {
    await writeBinaryFile(path, base64, `Upload project image: ${safeName}`);
    const publicPath = path.replace(/^public/, "");
    return NextResponse.json({ success: true, path: publicPath });
  } catch (error) {
    console.error("Failed to upload image", error);
    return NextResponse.json({ error: "Échec de l'upload." }, { status: 500 });
  }
}
