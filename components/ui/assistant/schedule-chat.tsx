"use client";

import { Button } from "@/components/common";
import { CopyIcon, Square, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Chat, Message } from "./chat";
import { useLocation } from "@/context/location-context";
import { useContentData } from "@/context/content-context";
import { useObserver } from "@/app/hooks/use-observer";
import Image from "next/image";

export const ScheduleChat = () => {
  const [start, setStart] = useState(false);
  const [show, setShow] = useState(false);
  const [maximize, setMaximize] = useState(false);
  const {
    data: { ip, city, country },
  } = useLocation();
  const { refreshHistory } = useContentData();
  const isOnFooter = useObserver();

  const playCloseSound = () => {
    const audio = new Audio("/assets/sounds/notification.mp3");
    if (audio) {
      audio.volume = 0.5;
      audio.play();
    }
  };

  const sendHistory = async () => {
    try {
      const sessionHistory = sessionStorage.getItem("history-chat");
      const messages: Message[] = JSON.parse(sessionHistory || "[]");

      if (messages.length === 0) return;

      await fetch("/api/collection/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages,
          cityName: city.name,
          countryName: country.name,
          ip,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const close = async () => {
    playCloseSound();
    setShow(false);
    sendHistory();
    refreshHistory();
  };

  const fullWindow = () => {
    setMaximize(!maximize);
  };

  const playInitSound = () => {
    const audio = new Audio("/assets/sounds/ui-sound.mp3");
    if (audio) {
      audio.volume = 0.5;
      audio.play();
    }
  };

  useEffect(() => {
    if (show) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [show]);

  return (
    <>
      {!show && (
        <section
          className="fixed right-5 bottom-2 cursor-pointer z-10"
          onClick={() => {
            playInitSound();
            setShow(true);
          }}
        >
          <button className="flex items-center gap-0.5 py-1 pl-1 pr-0.5 rounded-full bg-stripes bg-secondary group relative">
            <div className="absolute top-0 right-0 w-2 h-2 bg-red-400 rounded-full animate-ping z-40" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-red-400 rounded-full z-50" />
            <div className="relative h-8 w-8 overflow-hidden rounded-full">
              <picture>
                <img
                  src="/mgc.jfif"
                  alt="Gabriel avatar"
                  width="100%"
                  height="100%"
                  className="object-cover"
                />
              </picture>
            </div>
            <h3
              className={`text-foreground overflow-hidden whitespace-nowrap max-w-0 pr-0 
              opacity-0 translate-x-0 transition-all duration-500 ease-out 
              ${isOnFooter ? "" : "group-hover:max-w-24 group-hover:pr-1.5 group-hover:opacity-100 group-hover:translate-x-0"}`}
            >
              Asistencia?
            </h3>
          </button>
        </section>
      )}

      <section
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          show
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div
          onClick={(e) => e.stopPropagation()}
          className="
          fixed inset-0 h-dvh w-full
          md:inset-auto md:top-auto md:left-auto md:bottom-6 md:right-6
          md:h-auto md:w-97.5 md:max-w-[calc(100vw-2rem)]
          transition-all duration-300
        "
          style={
            maximize
              ? {
                  inset: 0,
                  width: "100dvw",
                  height: "100dvh",
                  maxWidth: "none",
                  maxHeight: "none",
                }
              : undefined
          }
        >
          <article
            className={`flex h-full flex-col overflow-hidden rounded-none border border-border-color bg-background shadow-xl relative z-50 ${
              maximize ? "md:h-full" : "md:h-auto"
            } md:rounded-xl`}
          >
            <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-zinc-300/20 blur-3xl" />

            {start && (
              <button
                className="absolute right-8.5 top-1.5 z-10 rounded-full p-2 hover:bg-secondary transition-colors hidden md:block"
                onClick={fullWindow}
              >
                {!maximize && <Square size={14} className="translate-y-px" />}
                {maximize && (
                  <CopyIcon size={14} className="rotate-x-180 translate-y-px" />
                )}
              </button>
            )}
            <button
              className="absolute right-1.5 top-1.5 z-10 rounded-full p-2 hover:bg-secondary transition-colors"
              onClick={close}
            >
              <X size={16} />
            </button>

            {!start && (
              <header className="border-b border-border-color px-4 py-4 shrink-0">
                <div className="flex gap-2 items-center">
                  <h3 className="text-xl font-semibold">¿Te puedo asistir?</h3>
                </div>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Obtén una respuesta inmediata mediante el asistente o agenda
                  una reunión si prefieres una atención personalizada dándole tu
                  correo.
                </p>
              </header>
            )}

            {!start && (
              <Image
                src={"/nordic_32.png"}
                fill
                alt="Gabriel - Desarrollador Full Stack"
                className={`object-cover md:mask-l-from-1% -z-10 opacity-85 mask-t-from-1% md:mask-t-from-0`}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            )}

            <main
              className={`min-h-0 overflow-hidden transition-all duration-300 ${
                start ? "flex-1 md:h-118 md:flex-none" : "h-0 flex-none"
              }`}
              style={{ height: maximize ? "92svh" : "" }}
            >
              <Chat />
            </main>

            <aside className="grid justify-center p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shrink-0">
              {!start && (
                <Button
                  className="w-full"
                  onClick={() => {
                    setStart(true);
                  }}
                  type="button"
                >
                  Iniciar conversación
                </Button>
              )}

              <small
                className="block text-left text-[11px] text-muted-foreground"
                style={{ marginTop: !start ? "12px" : "" }}
              >
                Esta conversación puede ser registrada para mejorar la calidad
                del servicio.
              </small>
            </aside>
          </article>
        </div>
      </section>
    </>
  );
};
