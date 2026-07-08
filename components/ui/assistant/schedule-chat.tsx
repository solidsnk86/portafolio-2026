"use client";

import { Button } from "@/components/common";
import { X } from "lucide-react";
import { useState } from "react";
import { Chat } from "./chat";

export const ScheduleChat = () => {
  const [start, setStart] = useState(false);
  const [show, setShow] = useState(false);

  const close = () => {
    setShow(false);
  };

  if (!show) {
    return (
      <section
        className="fixed right-2 bottom-2 cursor-pointer z-10"
        onClick={() => setShow(true)}
      >
        <button className="flex items-center gap-1 pl-1 pr-2 py-1 rounded-full bg-foreground">
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
          <h3 className="text-background">Asistencia?</h3>
        </button>
      </section>
    );
  }

  return (
    show && (
      <section className="fixed inset-0 bg-black/40 z-50" onClick={close}>
        <div
          onClick={(e) => e.stopPropagation()}
          className="
          fixed inset-0 h-[100dvh] w-full
          md:inset-auto md:top-auto md:left-auto md:bottom-6 md:right-6
          md:h-auto md:w-97.5 md:max-w-[calc(100vw-2rem)]
          transition-all duration-300
        "
        >
          <article className="flex h-full flex-col overflow-hidden rounded-none border border-border-color bg-background shadow-xl relative md:h-auto md:rounded-xl">
            <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-zinc-300/20 blur-3xl" />

            <button
              className="absolute right-3 top-3 z-10 rounded-full p-2 hover:bg-secondary transition-colors"
              onClick={close}
            >
              <X size={16} />
            </button>

            <header className="border-b border-border-color px-6 py-5 shrink-0">
              <h3 className="text-xl font-semibold">
                {start ? "¿En qué puedo ayudarte?" : "¿Te puedo asistir?"}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {start
                  ? "Contame qué necesitás y, si me dejás tu correo, Gabriel te va a contactar automáticamente para coordinar."
                  : `Obtén una respuesta inmediata mediante el asistente o agenda una
              reunión si prefieres una atención personalizada.`}
              </p>
            </header>

            <main
              className={`min-h-0 overflow-hidden transition-all duration-300 ${
                start ? "flex-1 md:h-80 md:flex-none" : "h-0 flex-none"
              }`}
            >
              <Chat />
            </main>

            <aside className="grid justify-center p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shrink-0">
              {!start && (
                <Button
                  className="w-full"
                  onClick={() => setStart(true)}
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
    )
  );
};