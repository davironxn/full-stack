import { ProjectCard } from '@/components/ui/project-card';

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects?slug=${params.slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div className="text-red-500 text-center py-10">Project not found.</div>;
  }

  const project = await res.json();

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <ProjectCard {...project} />
      <p className="text-muted-foreground mt-6 leading-relaxed">{project.description}</p>
    </div>
  );
}
