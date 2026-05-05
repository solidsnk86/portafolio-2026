"use client";

import Link from "next/link";

const formatDate = (dateTime: string) =>
  new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateTime));

export const formatText = (text: string) => (text ? text.replace(/-/g, " ") : "");

export function Projects() {
  const featuredProjects = [
    {
      name: "E-Commerce",
      url: "frontend-e-retro-leyends",
      description: "Tienda E-Commerce full-stack (PERN) con pagos integrados y admin.",
      created_at: "2025-12-19T15:38:54Z",
    },
    {
      name: "Neo-WiFi App",
      url: "neo-wifi-desktop",
      description: "Automatiza configuración de CPEs y routers TP-Link.",
      created_at: "2025-02-26T15:38:54Z",
    },
    {
      name: "Neo-WiFi Web",
      url: "neo-wifi",
      description: "Localización inteligente de antenas WiFi para cobertura.",
      created_at: "2025-01-28T03:18:53Z",
    },
    {
      name: "Geolocation API",
      url: "geo_api",
      description:
        "API de geolocalización por IP o coordenadas en tiempo real.",
      created_at: "2024-02-07T15:38:54Z",
    },
    {
      name: "App de tareas (PERN)",
      url: "taskApp-doubleCommit",
      description: "Gestor de tareas con usuarios, perfiles y asistencia IA.",
      created_at: "2025-10-19T08:13:49Z",
    },
    {
      name: "Portfolio Editable",
      url: "CV_GEC",
      description: "CV editable desde Google Sheets con vista web responsive.",
      created_at: "2024-02-07T15:38:54Z",
    },
  ];

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
          Una selección de trabajos donde prioricé claridad técnica, rendimiento
          y experiencia de usuario.
        </p>
      </div>
      <div className="mt-8 grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <Link
            href={`/project/${project.url}`}
            key={project.url}
            className="border-t border-r border-border-color bg-bg-card p-4 nth-last-[-n+3]:border-b hover:bg-secondary"
          >
            <h3 className="text-lg font-semibold text-foreground capitalize">
              {formatText(project.name)}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {project.description ?? "Sin descripción disponible."}
            </p>
            <p className="mt-3 text-sm font-medium text-foreground">
              {formatDate(String(project.created_at))}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
