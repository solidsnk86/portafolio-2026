"use client";

import Link from "next/link";
import { Metrics } from "./metrics";
import { timeAgo } from "@/utils/formatRelativeTime";

const formatDate = (dateTime: string) =>
  new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateTime));

export const formatText = (text: string) =>
  text ? text.replace(/[-_]/g, " ") : "";

export const featuredProjects = [
  {
    name: "Neo-WiFi Apk",
    repo: "neo-wifi-apk",
    description:
      "Localización Inteligente de Antenas WiFi (gratuitas) para Android.",
    created_at: "2026-02-19T03:53:10Z",
    platform: "android",
  },
  {
    name: "E-Commerce",
    repo: "frontend-e-retro-leyends",
    description:
      "Tienda E-Commerce full-stack (PERN) con pagos integrados y admin.",
    created_at: "2025-11-12T15:38:54Z",
    platform: "web",
  },
  {
    name: "Neo-WiFi Web",
    repo: "neo-wifi",
    description: "Localización inteligente de antenas WiFi para cobertura.",
    created_at: "2025-01-28T03:18:53Z",
    platform: "web",
  },
  {
    name: "Geolocation API",
    repo: "geo_api",
    description: "API de geolocalización por IP o coordenadas en tiempo real.",
    created_at: "2024-02-07T15:38:54Z",
    platform: "web/api",
  },
  {
    name: "LinkData",
    repo: "link-data",
    description:
      "Transmite tu cámara o pantalla en vivo, también puedes compartir un archivo con un link.",
    created_at: "2026-06-19T18:38:04Z",
    platform: "web",
  },
  {
    name: "Neo Wifi - v1.3.6",
    repo: "neo-wifi-desktop",
    description:
      "Aplicación para configurar automáticamente dispositivos TP-LINK.",
    created_at: "2025-07-08T15:38:54Z",
    platform: "windows",
  },
];

export function Projects() {
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
        {featuredProjects
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime(),
          )
          .map((project) => (
            <Link
              href={`/project/${project.repo}`}
              key={project.repo}
              className="border-t border-r border-border-color odd:bg-stripes p-4 nth-last-[-n+3]:border-b xl:nth-[3]:border-r-0 last:border-r-0 last:border-t-0 xl:last:border-t xl:nth-[4]:border-r nth-[4]:border-r-0 hover:bg-secondary relative transition-colors"
            >
              <h3 className="text-lg font-semibold text-foreground capitalize">
                {formatText(project.name)}
              </h3>
              <div className="absolute top-4 right-4">
                <small className="px-2 bg-foreground text-background rounded-2xl text-xs">
                  {project.platform}
                </small>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {project.description ?? "Sin descripción disponible."}
              </p>
              <div className="flex items-center justify-between gap-2">
                <p className="mt-3 text-sm font-medium text-foreground">
                  {formatDate(String(project.created_at))}
                </p>
                <p className="mt-3 text-xs px-2 rounded-2xl text-green-600">
                  {timeAgo(new Date(project.created_at))?.includes("días") && "Nuevo!"}
                </p>
              </div>
            </Link>
          ))}
      </div>
      <Metrics />
    </section>
  );
}
