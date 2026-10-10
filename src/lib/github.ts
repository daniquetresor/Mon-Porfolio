const API_BASE = "https://api.github.com";

export function isGithubConfigured() {
  return Boolean(process.env.GITHUB_TOKEN && process.env.GITHUB_REPO);
}

function getConfig() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO; // "owner/repo"
  const branch = process.env.GITHUB_BRANCH || "main";
  if (!token || !repo) {
    throw new Error("GITHUB_TOKEN / GITHUB_REPO are not configured.");
  }
  return { token, repo, branch };
}

function headers(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

/** Reads a repo file's text content and its blob SHA (needed to update it). */
export async function readFile(path: string): Promise<{ content: string; sha: string }> {
  const { token, repo, branch } = getConfig();
  const res = await fetch(
    `${API_BASE}/repos/${repo}/contents/${encodeURIComponent(path).replace(/%2F/g, "/")}?ref=${branch}`,
    { headers: headers(token), cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error(`Failed to read ${path} from GitHub: ${res.status} ${await res.text()}`);
  }
  const data = (await res.json()) as { content: string; sha: string; encoding: string };
  const content = Buffer.from(data.content, data.encoding as BufferEncoding).toString("utf-8");
  return { content, sha: data.sha };
}

/** Reads and JSON-parses a repo file. */
export async function readJsonFile<T>(path: string): Promise<{ data: T; sha: string }> {
  const { content, sha } = await readFile(path);
  return { data: JSON.parse(content) as T, sha };
}

/** Creates or updates a text file in the repo, committing directly to the configured branch. */
export async function writeFile(path: string, content: string, message: string, sha?: string) {
  const { token, repo, branch } = getConfig();
  const res = await fetch(
    `${API_BASE}/repos/${repo}/contents/${encodeURIComponent(path).replace(/%2F/g, "/")}`,
    {
      method: "PUT",
      headers: { ...headers(token), "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        content: Buffer.from(content, "utf-8").toString("base64"),
        branch,
        ...(sha ? { sha } : {}),
      }),
    }
  );
  if (!res.ok) {
    throw new Error(`Failed to write ${path} to GitHub: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

/** Writes a JSON-serializable value to a repo file, fetching the current sha first. */
export async function writeJsonFile(path: string, data: unknown, message: string) {
  let sha: string | undefined;
  try {
    const existing = await readFile(path);
    sha = existing.sha;
  } catch {
    // File doesn't exist yet — create it.
  }
  const content = JSON.stringify(data, null, 2) + "\n";
  return writeFile(path, content, message, sha);
}

/** Uploads a binary file (e.g. an image) given as a base64 string, creating or overwriting it. */
export async function writeBinaryFile(path: string, base64Content: string, message: string) {
  const { token, repo, branch } = getConfig();

  let sha: string | undefined;
  const existingRes = await fetch(
    `${API_BASE}/repos/${repo}/contents/${encodeURIComponent(path).replace(/%2F/g, "/")}?ref=${branch}`,
    { headers: headers(token), cache: "no-store" }
  );
  if (existingRes.ok) {
    const data = (await existingRes.json()) as { sha: string };
    sha = data.sha;
  }

  const res = await fetch(
    `${API_BASE}/repos/${repo}/contents/${encodeURIComponent(path).replace(/%2F/g, "/")}`,
    {
      method: "PUT",
      headers: { ...headers(token), "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        content: base64Content,
        branch,
        ...(sha ? { sha } : {}),
      }),
    }
  );
  if (!res.ok) {
    throw new Error(`Failed to upload ${path} to GitHub: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

/** Deletes a file from the repo. */
export async function deleteFile(path: string, message: string) {
  const { token, repo, branch } = getConfig();
  const { sha } = await readFile(path);
  const res = await fetch(
    `${API_BASE}/repos/${repo}/contents/${encodeURIComponent(path).replace(/%2F/g, "/")}`,
    {
      method: "DELETE",
      headers: { ...headers(token), "Content-Type": "application/json" },
      body: JSON.stringify({ message, sha, branch }),
    }
  );
  if (!res.ok) {
    throw new Error(`Failed to delete ${path} from GitHub: ${res.status} ${await res.text()}`);
  }
  return res.json();
}
