import { prisma } from "./db";
import { normalizeProject, normalizeProjects } from "./normalizeProject";

/**
 * Return all projects from the database, normalized for the UI.
 */
export async function getAllProjects() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return normalizeProjects(projects as any);
}

/**
 * Find a single project by slug. Returns null when not found.
 */
export async function getProjectBySlug(slug: string) {
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) return null;
  return normalizeProject(project as any);
}
