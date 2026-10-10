import type { Project } from "@/types";
import projectsData from "./projects.json";

export const projects = projectsData as unknown as Project[];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
