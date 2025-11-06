import { ProjectCard } from "@/components/ui/project-card";

export default async function ProjectsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`, {
    cache: "no-store", // always fresh
  });

  if (!res.ok) {
    return <div className="text-red-500">Failed to load projects.</div>;
  }

  const projects = await res.json();

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project: any) => (
        <ProjectCard key={project.slug} {...project} />
      ))}
    </div>
  );
}
