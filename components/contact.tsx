"use client";

import { useDiffLabel } from "@/app/hooks/use-diff-label";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { FaShareFromSquare } from "react-icons/fa6";
import {
  LuClock1,
  LuClock10,
  LuClock11,
  LuClock12,
  LuClock2,
  LuClock3,
  LuClock4,
  LuClock5,
  LuClock6,
  LuClock7,
  LuClock8,
  LuClock9,
} from "react-icons/lu";

const whatsappNumber = "+5492665290020";
const whatsappMessage =
  "Hola Gabriel, quiero hablar sobre un proyecto que tengo en mente.";
export const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage,
)}`;
export const email = "calcagni.gabriel86@gmail.com";
const clockIcons = [
  LuClock12,
  LuClock1,
  LuClock2,
  LuClock3,
  LuClock4,
  LuClock5,
  LuClock6,
  LuClock7,
  LuClock8,
  LuClock9,
  LuClock10,
  LuClock11,
];

export function Contact() {
  const label = useDiffLabel();

  const getBuenosAiresHour = () => {
    const hourString = new Date().toLocaleString("en-US", {
      hour: "2-digit",
      hour12: false,
      timeZone: "America/Buenos_Aires",
    });

    return Number(hourString) % 24;
  };

  const detectHourForIcon = (hour: number) => clockIcons[hour % 12];

  const currentTime = new Date().toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Buenos_Aires",
  });

  const ClockIcon = detectHourForIcon(getBuenosAiresHour());

  const contacts = [
    {
      content: currentTime.toUpperCase() + label,
      icon: ClockIcon,
    },
    {
      content: "+54 2665 290020",
      src: "tel:+542665290020",
      icon: Phone,
    },
    {
      content: "Compartir éste portafolio",
      icon: FaShareFromSquare,
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
      icon: MapPin,
    },
    {
      content: "calcagni.gabriel86@gmail.com",
      src: "mailto:calcagni.gabriel86@gmail.com",
      icon: Mail,
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
            {contacts.map(({ content, src, icon: Icon, fx }) => {
              return src ? (
                <Link
                  href={src as string}
                  key={content}
                  className="flex gap-4 items-center hover:underline"
                >
                  <div className="p-1 border border-border-color rounded-md bg-secondary outline-1 outline-border-color outline-offset-1">
                    <Icon
                      size={16}
                      className="text-muted-foreground stroke-0.5"
                    />
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
                    <Icon
                      size={16}
                      className="text-muted-foreground stroke-0.5"
                    />
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
