"use client";

import Image from "next/image";
import Link from "next/link";
import { Metrics } from "./metrics";
import { timeAgo } from "@/utils/formatRelativeTime";
import { GiWorld } from "react-icons/gi";
import { FaWindows, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { AiOutlineApi } from "react-icons/ai";
import type { IconType } from "react-icons";

const formatDate = (dateTime: string) =>
  new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateTime));

export const formatText = (text: string) =>
  text ? text.replace(/[-_]/g, " ") : "";

interface FeaturedProject {
  name: string;
  repo: string;
  description: string;
  created_at: string;
  platform: { name: string; icon: IconType };
  url: string;
  images: string[];
}

export const featuredProjects: FeaturedProject[] = [
  {
    name: "Better Call Dante",
    repo: "better-call-dante",
    description:
      "Ecosistema digital para un estudio de abogados que integra correo, calendario, planillas y documentos en un solo panel, con asistente IA.",
    created_at: "2026-09-04T00:00:00Z",
    platform: { name: "web", icon: GiWorld },
    url: "https://better-call-dante.vercel.app",
    images: [
      "/assets/better-call-dante/better-call-dante-mock.png",
      "/assets/better-call-dante/better-call-dante-login-cap.png",
      "/assets/better-call-dante/better-call-dante-main-dash-cap.png",
      "/assets/better-call-dante/better-call-dante-agent-cap-1.png",
      "/assets/better-call-dante/better-call-dante-agent-cap-2.png",
      "/assets/better-call-dante/better-call-dante-pallete-cap-1.png",
    ],
  },
  {
    name: "Inmobiliaria Daeva",
    repo: "inmobiliaria-daeva",
    description:
      "SPA inmobiliaria: propiedades en venta/alquiler, con comentarios y panel de agente/cliente. ",
    created_at: "2026-09-06T00:00:00Z",
    platform: { name: "web", icon: GiWorld },
    url: "https://daeva.vercel.app",
    images: [
      "/assets/daeva-inmobiliaria/daeva-mock.png",
      "/assets/daeva-inmobiliaria/daeva-main-section-cap.png",
      "/assets/daeva-inmobiliaria/daeva-prop-details-cap.png",
      "/assets/daeva-inmobiliaria/daeva-admin-dash-cap.png",
      "/assets/daeva-inmobiliaria/daeva-reservations-dash-cap.png",
      "/assets/daeva-inmobiliaria/daeva-profile-cap-1.png",
    ],
  },
  {
    name: "Pascale - Tienda Virtual",
    repo: "frontend-e-retro-leyends",
    description:
      "Pascale Closet es una Tienda E-Commerce full-stack (PERN) con pagos integrados con Mercado Pago y panel de administración y comprador.",
    created_at: "2025-11-12T15:38:54Z",
    platform: { name: "web", icon: GiWorld },
    url: "https://pascalecloset.com",
    images: [
      "/assets/e-commerce-gallery/pascale-mock.png",
      "/assets/e-commerce-gallery/screencapture-pascalecloset-seller-orders-2026-05-21-16_23_20.png",
      "/assets/e-commerce-gallery/screencapture-pascalecloset-seller-products-2026-05-21-16_25_15.png",
      "/assets/e-commerce-gallery/screencapture-pascalecloset-user-profile-2026-05-21-16_18_18.webp",
      "/assets/e-commerce-gallery/screencapture-pascalecloset-user-profile-2026-05-21-16_19_44.png",
      "/assets/e-commerce-gallery/screencapture-pascalecloset-user-profile-2026-05-21-16_20_50.png",
    ],
  },
  {
    name: "Neo-WiFi Web",
    repo: "neo-wifi",
    description: "Localización inteligente de antenas WiFi para cobertura.",
    created_at: "2025-01-28T03:18:53Z",
    platform: { name: "web", icon: GiWorld },
    url: "https://neo-wifi.com",
    images: [
      "/assets/neo-wifi-web/neo-wifi-web-mock.png",
      "/assets/neo-wifi-web/neo-wifi-hero-web-cap-1-sat.png",
      "/assets/neo-wifi-web/neo-wifi-hero-web-cap-3-app.png",
      "/assets/neo-wifi-web/neo-wifi-hero-web-cap-4-features.png",
      "/assets/neo-wifi-web/neo-wifi-hero-web-cap-5-desktop-info.png",
    ],
  },
  {
    name: "Geolocation API",
    repo: "geo_api",
    description: "API de geolocalización por IP o coordenadas en tiempo real.",
    created_at: "2024-02-07T15:38:54Z",
    platform: { name: "api", icon: AiOutlineApi },
    url: "https://geo-api.solidsnk86.dev",
    images: [
      "/assets/geo-api/solid-geo-api-mock.png",
      "/assets/geo-api/solid-geo-api-cap-2.png",
    ],
  },
  {
    name: "Neo Wifi - v1.3.6",
    repo: "neo-wifi-desktop",
    description:
      "Aplicación para configurar automáticamente dispositivos TP-LINK.",
    created_at: "2025-07-08T15:38:54Z",
    platform: { name: "windows", icon: FaWindows },
    url: "https://neo-wifi.vercel.app",
    images: [
      "/assets/neo-wifi-desktop-app/neo-wifi-desktop-mock.png",
    ],
  },
];

const ProjectCover = ({
  images,
  name,
}: {
  images: string[];
  name: string;
}) => {
  const count = images.length;
  return (
    <div className="relative h-full w-full">
      <Image
        src={images[0]}
        alt={`${name} - captura`}
        fill
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
      />
      {count > 1 && (
        <small className="absolute bottom-2 right-2 flex items-center gap-1 rounded-2xl bg-foreground/80 px-2 py-0.5 text-[10px] font-medium text-background backdrop-blur">
          {count} fotos
        </small>
      )}
    </div>
  );
};

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl py-14 border-x border-border-color">
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
              <div className="-m-4 mb-4 aspect-[3/2] overflow-hidden border-b border-border-color">
                <ProjectCover
                  images={project.images}
                  name={project.name}
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground capitalize">
                {formatText(project.name)}
              </h3>
              <div className="absolute top-4 right-4">
                <small className="flex gap-1 items-center px-2 bg-foreground text-background rounded-2xl text-xs">
                  <project.platform.icon />
                  {project.platform.name}
                </small>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {project.description ?? "Sin descripción disponible."}
              </p>
              <div className="mt-3 flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-foreground whitespace-nowrap">
                  {formatDate(String(project.created_at))}
                </p>
                <p className="text-xs px-2 rounded-2xl text-green-600">
                  {timeAgo(new Date(project.created_at))?.includes("días") && "Nuevo!"}
                </p>
              </div>
              {project.url && (
                <div className="mt-2 border-t border-border-color pt-2.5">
                  <span
                    role="link"
                    tabIndex={0}
                    onClick={(event) => {
                      event.stopPropagation();
                      window.open(project.url, "_blank", "noopener,noreferrer");
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        event.stopPropagation();
                        window.open(
                          project.url,
                          "_blank",
                          "noopener,noreferrer",
                        );
                      }
                    }}
                    className="inline-flex max-w-full cursor-pointer items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-accent"
                    aria-label={`Visitar ${project.name}`}
                  >
                    <FaArrowUpRightFromSquare size={11} className="shrink-0" />
                    <span className="truncate">
                      {new URL(project.url).hostname.replace("www.", "")}
                    </span>
                  </span>
                </div>
              )}
            </Link>
          ))}
      </div>
      <Metrics />
    </section>
  );
}