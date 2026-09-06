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
            Desarrollador Full Stack, egresado de la UTN-FRSR. Experiencia +4
            años, construyo aplicaciones web y automatizo procesos, conectando
            APIs y servicios para reducir tareas manuales. Uso IA para acelerar
            el flujo de desarrollo sin delegar las decisiones técnicas.
          </p>

          <p className="text-base leading-relaxed text-muted-foreground">
            He trabajado para clientes de Argentina y Chile: una tienda online
            <Link
              href="http://pascalecloset.com/"
              target="_blank"
              className="mx-1 font-semibold text-zinc-600 hover:underline"
            >
              @pascale-closet.
            </Link>
            y un ecosistema digital para un estudio de abogados que integra
            correo, calendario, planillas y documentos en un solo panel, con
            asistente IA
            <Link
              href="http://better-call-dante-2.vercel.app/"
              target="_blank"
              className="mx-1 font-semibold text-zinc-600 hover:underline"
            >
              @better-call-dante
            </Link>
            .
          </p>
        </article>
      </div>
    </section>
  );
}
