"use client";

import { useLocation } from "@/context/location-context";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export function About({ source }: { source?: string }) {
  const { data: location, isLoading } = useLocation();

  useEffect(() => {
    if (!source || source === "No se detectó el origen utm") return;

    const collectDataUTM = async (source: string) => {
      try {
        if (!isLoading && location.lastAccess) {
          await fetch("/api/utm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              utm: source,
              referer: document.referrer,
              lastAccessId: location.lastAccess.id,
            }),
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    collectDataUTM(source);
  }, [source, location, isLoading]);

  return (
    <section
      id="about"
      className="mx-auto max-w-6xl border-b border-border-color px-4 py-16 border-x relative"
    >
      <div className="grid md:grid-cols-2 justify-center space-y-5 text-left">
        <div className="md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Sobre mí
          </p>
          <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
            Desarrollo web y automatización de procesos
          </h2>
        </div>

        <article className="space-y-4 md:p-8">
          <p className="text-base leading-relaxed text-muted-foreground">
            Desarrollador con 4 años de experiencia, egresado de la UTN-FRSR.
            Desarrollo aplicaciones web modernas y soluciones orientadas a
            resolver problemas concretos, priorizando simplicidad, rendimiento y
            una buena experiencia de usuario.
          </p>

          <p className="text-base leading-relaxed text-muted-foreground">
            También me especializo en{" "}
            <strong className="text-foreground">
              automatizar tareas y flujos de trabajo diarios
            </strong>
            , conectando servicios, APIs y herramientas para reducir procesos
            manuales y hacer más eficientes las operaciones.
          </p>

          <p className="text-base leading-relaxed text-muted-foreground">
            Hoy potencio mi flujo de desarrollo con agentes de IA para
            investigar, prototipar, analizar y documentar más rápido, sin
            delegar el criterio técnico. La IA es una herramienta para acelerar
            el proceso; las decisiones de arquitectura, implementación y calidad
            siguen estando guiadas por las necesidades de cada proyecto.
          </p>

          <p className="text-base leading-relaxed text-muted-foreground">
            He trabajado en proyectos para clientes de Argentina y Chile,
            incluyendo el desarrollo de una tienda online
            <Link
              href="http://pascalecloset.com/"
              target="_blank"
              className="mx-1 font-semibold text-zinc-600 hover:underline"
            >
              @pascale-closet.
            </Link>
          </p>
        </article>
      </div>
    </section>
  );
}
