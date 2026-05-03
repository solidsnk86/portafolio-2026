"use client";

import MarkdownRenderer from "@/components/markdown-renderer";
import { Loader2, MoveLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ProjectResponse {
  data: {
    name: string;
    description: string | null;
    created_at: string;
    html_url?: string;
    homepage?: string | null;
  };
  decoded: string;
}

const formatDate = (dateTime: string) =>
  new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateTime));

export function ProjectClient({ name }: { name: string }) {
  const [project, setProject] = useState<ProjectResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadProject = async () => {
      try {
        const response = await fetch(`/api/repo?name=${encodeURIComponent(name)}`);
        const data = (await response.json()) as ProjectResponse & { message?: string };

        if (!response.ok) {
          throw new Error(data.message ?? "No se pudo cargar el proyecto");
        }

        if (active) {
          setProject(data);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Error desconocido");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    loadProject();

    return () => {
      active = false;
    };
  }, [name]);

  return (
    <section className="px-4 py-8 md:px-6 lg:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <Link
          href="/all-projects"
          className="group flex items-center gap-2 self-start text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <MoveLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Volver a proyectos</span>
        </Link>
        {isLoading ? (
          <div className="flex min-h-[40vh] items-center justify-center gap-3 text-sm font-medium text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin text-foreground" />
            <span>Cargando proyectos..</span>
          </div>
        ) : error ? (
          <small className="rounded border border-red-300/50 bg-red-500/80 px-2 py-0.5 text-white">
            {error}
          </small>
        ) : (
          <article className="space-y-6 text-foreground">
            <header className="space-y-3 border-b border-border-color pb-4">
              <p className="text-sm font-medium text-muted-foreground">
                {formatDate(project?.data.created_at ?? new Date().toISOString())}
              </p>
              <h1 className="text-3xl font-semibold md:text-4xl">
                {project?.data.name}
              </h1>
              <p className="text-base text-muted-foreground">
                {project?.data.description ?? "Sin descripción disponible."}
              </p>
            </header>

            <MarkdownRenderer content={project?.decoded ?? ""} />
          </article>
        )}
      </div>
    </section>
  );
}