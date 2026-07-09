"use client";

import { Button } from "@/components/common";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Chat, Message } from "./chat";
import { useLocation } from "@/context/location-context";
import Image from "next/image";
import { timeAgo } from "@/utils/formatRelativeTime";
import { useContentData } from "@/context/content-context";

export const ScheduleChat = () => {
  const [start, setStart] = useState(false);
  const [show, setShow] = useState(false);
  const {
    data: { lastAccess },
  } = useLocation();
  const { historyChat, refreshHistory } = useContentData();

  const playCloseSound = () => {
    const audio = new Audio("/assets/sounds/notification.mp3");
    if (audio) {
      audio.volume = 0.5;
      audio.play();
    }
  };

  const sendHistory = async () => {
    const sessionHistory = sessionStorage.getItem("history-chat");
    const messages: Message[] = JSON.parse(sessionHistory || "[]");
    try {
      await fetch("/api/collection/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: lastAccess.id, messages }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const close = async () => {
    playCloseSound();
    setShow(false);
    await sendHistory();
    await refreshHistory();
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
  }, [show]);

  return (
    <>
      {!show && (
        <section
          className="fixed right-2 bottom-2 cursor-pointer z-10"
          onClick={() => {
            playInitSound();
            setShow(true);
          }}
        >
          <button className="flex items-center gap-0.5 py-1 pl-1 pr-0.5 rounded-full bg-accent group relative">
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
            <h3 className="text-white overflow-hidden whitespace-nowrap max-w-0 pr-0 opacity-0 translate-x-0 transition-all duration-500 ease-out group-hover:max-w-24 group-hover:pr-1.5 group-hover:opacity-100 group-hover:translate-x-0">
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
        >
          <article className="flex h-full flex-col overflow-hidden rounded-none border border-border-color bg-background shadow-xl relative md:h-auto md:rounded-xl z-50">
            <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-zinc-300/20 blur-3xl" />

            <button
              className="absolute right-2.5 top-2.5 z-10 rounded-full p-2 hover:bg-secondary transition-colors"
              onClick={close}
            >
              <X size={16} />
            </button>

            <header className="border-b border-border-color px-6 py-5 shrink-0">
              {!start && (
                <>
                  <div className="flex gap-2 items-center">
                    <h3 className="text-xl font-semibold">
                      ¿Te puedo asistir?
                    </h3>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Obtén una respuesta inmediata mediante el asistente o agenda
                    una reunión si prefieres una atención personalizada dándole
                    tu correo.
                  </p>
                </>
              )}

              {start && (
                <div>
                  <div className="flex items-center gap-1 relative">
                    {timeAgo(
                      new Date(historyChat?.created_at as string),
                    )?.includes("segundo") ? (
                      <div className="absolute bottom-2 outline-2 outline-background left-6.5 w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    ) : (
                      <div className="absolute bottom-2 outline-2 outline-background left-6.5 w-1.5 h-1.5 rounded-full bg-zinc-500"></div>
                    )}

                    <picture>
                      <img
                        src="/mgc.jfif"
                        alt="Gabriel avatar"
                        width={36}
                        height={36}
                        className="object-cover rounded-full border-2 border-background"
                      />
                    </picture>
                    <div className="flex flex-col -space-y-1">
                      <h4 className="font-semibold">Gabriel Calcagni</h4>
                      <div className="flex gap-1 items-center text-muted-foreground">
                        <small className="text-accent flex gap-1 items-center text-xs">
                          {timeAgo(
                            new Date(historyChat?.created_at as string),
                          )?.includes("segundo")
                            ? "En Línea"
                            : "Desconectado"}
                        </small>
                        ·
                        <small className="text-xs">
                          última actividad{" "}
                          {timeAgo(new Date(historyChat?.created_at as string))}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </header>

            <main
              className={`min-h-0 overflow-hidden transition-all duration-300 ${
                start ? "flex-1 md:h-86 md:flex-none" : "h-0 flex-none"
              }`}
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

              <small className="mt-3 block text-left text-[11px] text-muted-foreground">
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
