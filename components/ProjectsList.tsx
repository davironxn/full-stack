import { prisma } from "@/lib/db"

import { ProjectCard } from "./ui/project-card"

type Projects = Awaited<ReturnType<typeof prisma.project.findMany>>
type Project = Projects[number]

function parseTags(rawTags: Project["tags"]): string[] {
  if (!rawTags) return []

  return rawTags
    .split(",")
    .map((tag: string) => tag.trim())
    .filter((tag: string): tag is string => Boolean(tag))
}

export default async function ProjectsList() {
  let projects: Projects = []
  let failedToLoad = false

  if (!process.env.DATABASE_URL) {
    failedToLoad = true
  } else {
    try {
      projects = await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
      })
    } catch (error) {
      console.error("Failed to load projects from the database:", error)
      failedToLoad = true
    }
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200/70 bg-white/60 p-8 text-center text-sm text-muted-foreground shadow-[0_18px_35px_-24px_rgba(15,23,42,0.35)]">
        {failedToLoad
          ? 'Projects are temporarily unavailable while the database connection is offline. Please try again shortly.'
          : 'I&apos;m actively building right now. Check back soon to see fresh case studies.'}
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project: Project) => {
        const tags = parseTags(project.tags)

        return (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            url={project.url ?? undefined}
            tags={tags}
          />
        )
      })}
    </div>
  )
}
