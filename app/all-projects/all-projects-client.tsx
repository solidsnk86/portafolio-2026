"use client";

import { useContentData } from "@/context/content-context";
import { timeAgo } from "@/utils/formatRelativeTime";
import { Loader2, MoveLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const ALlProjectsClient = () => {
  const { projects: repos, isLoadingProjects } = useContentData();
  const [projects, SetProjects] = useState<number>(10);

  return (
    <section className="relative z-10 mx-auto my-10 flex w-full flex-col justify-center rounded-xl bg-(--header-bg-color)">
      <Link
        href="/"
        className="group flex items-center gap-2 text-(--mutted-color) hover:brightness-125 ml-4"
      >
        <MoveLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
        <span>Volver</span>
      </Link>
      {isLoadingProjects ? (
        <div className="flex items-center justify-center gap-3 py-20 text-sm font-medium text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin text-foreground" />
          <span>Cargando proyectos..</span>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-semibold m-4">Todos los Proyectos</h1>
          <div className="flex flex-col">
            {repos.slice(0, projects).map((repo, i) => (
              <Link
                href={`/project/${repo.name}`}
                key={`${repo.name}-${i}`}
                className="border-t border-border-color bg-bg-card p-4 last:border-b hover:bg-secondary"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{repo.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {repo.description ?? "Sin descripción disponible."}
                    </p>
                  </div>
                  <time className="text-sm font-medium text-foreground">
                    {timeAgo(new Date(repo.created_at))}
                  </time>
                </div>
              </Link>
            ))}
            <div className="flex mx-auto">
              <button
                disabled={projects >= repos.length}
                onClick={() => SetProjects((project) => project + 10)}
                className="button-bg relative flex items-center gap-2 mt-8 border border-border-color px-3 py-1 font-semibold text-(--mutted-color) outline-1 outline-offset-1 outline-border-color transition-transform duration-300 hover:bg-secondary hover:shadow-lg disabled:cursor-not-allowed"
              >
                Cargar más proyectos
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
