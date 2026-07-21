"use client";

import { useDiffLabel } from "@/app/hooks/use-diff-label";
import Link from "next/link";
import { useEffect, useState } from "react";

const whatsappNumber = "+5492665290020";
const whatsappMessage =
  "Hola Gabriel, quiero hablar sobre un proyecto que tengo en mente.";
export const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage,
)}`;
export const email = "calcagni.gabriel86@gmail.com";

function getClockHandsPath(hour: number, minute: number) {
  const cx = 12,
    cy = 12;
  const minuteAngle = minute * 6;
  const hourAngle = (hour % 12) * 30 + minute * 0.5;
  const toXY = (angleDeg: number, radius: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: Math.round(cx + radius * Math.sin(rad)),
      y: Math.round(cy - radius * Math.cos(rad)),
    };
  };
  const m = toXY(minuteAngle, 6);
  const h = toXY(hourAngle, 4);
  return `M${m.x} ${m.y}L${cx} ${cy}L${h.x} ${h.y}`;
}

export function Contact() {
  const label = useDiffLabel();
  const [time, setTime] = useState<{ hour: number; minute: number } | null>(
    null,
  );

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime({ hour: now.getHours(), minute: now.getMinutes() });
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  const currentTime = new Date().toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Buenos_Aires",
  });

  const contacts = [
    {
      content: currentTime.toUpperCase() + label,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d={getClockHandsPath(time.hour, time.minute)} />
        </svg>
      ),
    },
    {
      content: "+54 2665 290020",
      src: "tel:+542665290020",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-phone-icon lucide-phone"
        >
          <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
        </svg>
      ),
    },
    {
      content: "Compartir éste portafolio",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-forward-icon lucide-forward"
        >
          <path d="m15 17 5-5-5-5" />
          <path d="M4 18v-2a4 4 0 0 1 4-4h12" />
        </svg>
      ),
      fx: async () => {
        await navigator.share({
          title: document.title,
          text: "Desarrollador full‑stack con 4 años de experiencia. Me enfoco en resolver problemas reales aplicando buenas prácticas y entregando soluciones de impacto: no sólo conocimientos, sino resultados que transmiten valor.",
          url: window.location.href,
        });
      },
    },
    {
      content: "Concarán · San Luis, Argentina",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-map-pin-icon lucide-map-pin"
        >
          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      content: "calcagni.gabriel86@gmail.com",
      src: "mailto:calcagni.gabriel86@gmail.com",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-mail-icon lucide-mail"
        >
          <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
          <rect x="2" y="4" width="20" height="16" rx="2" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl px-4 py-16 z-50 bg-background border-x border-border-color"
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
        <div className="space-y-3 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Contacto
          </p>
          <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
            Hablemos de tu proximo proyecto
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground">
            Si tienes una idea o necesitás mejorar un producto existente,
            podemos construir una solucion clara y escalable.
          </p>

          <p className="max-w-2xl text-base text-muted-foreground">
            ¿Tu proyecto creció demasiado rápido con IA? Te ayudo a convertirlo
            en un producto mantenible.
          </p>
        </div>

        <section className="md:mt-6">
          <div className="flex flex-col gap-3">
            {contacts.map(({ content, src, icon, fx }) => {
              return src ? (
                <Link
                  href={src as string}
                  key={content}
                  className="flex gap-4 items-center hover:underline"
                >
                  <div className="p-1 border border-border-color rounded-md bg-secondary outline-1 outline-border-color outline-offset-1">
                    <div className="text-muted-foreground stroke-0.5">
                      {icon}
                    </div>
                  </div>
                  {content}
                </Link>
              ) : (
                <div
                  key={content}
                  suppressHydrationWarning
                  onClick={
                    content.toLowerCase().startsWith("compartir")
                      ? fx
                      : undefined
                  }
                  className={`flex gap-4 cursor-default items-center ${content.toLowerCase().startsWith("compartir") ? "cursor-pointer" : ""}`}
                >
                  <div className="p-1 border border-border-color rounded-md bg-secondary outline-1 outline-border-color outline-offset-1 cursor-default">
                    <div className="text-muted-foreground stroke-0.5">
                      {icon}
                    </div>
                  </div>
                  {content}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}
