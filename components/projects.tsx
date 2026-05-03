"use client";

import { useContentData } from "@/context/content-context";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const formatDate = (dateTime: string) =>
  new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateTime));

export function Projects() {
  const { projects, isLoadingProjects } = useContentData();

  return (
    <section id="projects" className="mx-auto max-w-6xl py-16">
      <div className="space-y-3 px-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Portfolio
        </p>
        <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
          Proyectos destacados
        </h2>
        <p className="max-w-2xl text-base text-muted-foreground">
          Una selección de trabajos donde prioricé claridad técnica,
          rendimiento y experiencia de usuario.
        </p>
      </div>
      <div className="mt-8 grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
        {isLoadingProjects ? (
          <div className="col-span-full flex items-center gap-2 px-4 text-sm font-medium text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin text-foreground" />
            <span>Cargando proyectos..</span>
          </div>
        ) : (
          projects.slice(0, 6).map((project) => (
            <Link href={`/project/${project.name}`}
              key={project.id}
              className="border-t border-r border-border-color bg-bg-card p-4 nth-last-[-n+3]:border-b hover:bg-secondary"
            >
              <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {project.description ?? "Sin descripción disponible."}
              </p>
              <p className="mt-3 text-sm font-medium text-foreground">
                {formatDate(project.created_at)}
              </p>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
