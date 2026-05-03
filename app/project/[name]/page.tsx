import { ProjectClient } from "./project-client";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const projectName = (await params)?.name;

  return (
    <section>
      <ProjectClient name={projectName} />
    </section>
  );
}