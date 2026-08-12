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
      <div className=" grid md:grid-cols-2 justify-center space-y-5 text-left">
        <div className="md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Sobre mi
          </p>
          <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
            Desarrollo web práctico, moderno y eficiente
          </h2>
        </div>
        <article className="space-y-4 md:p-8">
          <p className="text-base leading-relaxed text-muted-foreground">
            Desarrollador con 4 años de experiencia, egresado de la UTN-FRSR.
            Trabajo con una mirada práctica, priorizo simplicidad, rendimiento y
            una buena experiencia de usuario en cada entrega.
          </p>

          <p className="text-base leading-relaxed text-muted-foreground">
            Hoy potencio mi flujo con agentes de IA para investigar, prototipar
            y documentar más rápido, sin perder criterio técnico. La IA me ayuda
            a acelerar, pero las decisiones de arquitectura y calidad siempre
            las guío en el contexto del proyecto.
          </p>

          <p className="text-base leading-relaxed text-muted-foreground">
            Hace poco colaboré con un cliente en Chile con una tienda online
            <Link
              href="http://pascalecloset.com/"
              target="_blank"
              className="mx-1 font-semibold hover:underline text-indigo-500"
            >
              @pascale-closet.
            </Link>
          </p>
        </article>
      </div>
    </section>
  );
}
