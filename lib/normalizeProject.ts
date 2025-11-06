import { Project } from "@prisma/client";

/**
 * Normalize a single project so null/optional fields are safe for UI
 */
export function normalizeProject(project: Project) {
  return {
    ...project,
    description: project.description ?? "",
    url: project.url ?? "",
    imageUrl: project.imageUrl ?? "",
    tags: project.tags ? project.tags.split(",").map((t) => t.trim()) : [],
  };
}

/**
 * Normalize an array of projects safely
 */
export function normalizeProjects(projects: any) {
  if (!Array.isArray(projects)) {
    console.warn("normalizeProjects expected an array but got:", projects);
    return []; // 👈 prevent crashes
  }
  return projects.map(normalizeProject);
}
