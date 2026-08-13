"use client";

import { Button } from "@/components/common";
import { Settings, X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

type TargetName = "init-message" | "history_chat" | "use-location";

export const SettingsCard = ({ close }: { close: () => void }) => {
  const [checked, setChecked] = useState<
    { name: TargetName; checked: boolean | undefined }[]
  >([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as TargetName;
    setChecked((prev) => {
      const exists = prev.some((item) => item.name === name);
      if (exists) {
        return prev.map((item) =>
          item.name === name ? { ...item, checked: e.target.checked } : item
        );
      }
      return [{ name, checked: e.target.checked }, ...prev];
    });
  };


  const saveSettings = () => {
    if (checked.length === 0) return;

    close();
  };

  return (
    <section className="fixed inset-0 backdrop-blur-md">
      <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[96%] border border-border-color md:w-1/2 h-fit flex flex-col bg-background/50 z-999 rounded-xl">
        <div className="absolute inset-0 w-full h-full backdrop-blur-3xl rounded-xl" />
        <Image
          src={"/nordic_31.png"}
          fill
          alt="Gabriel - Desarrollador Full Stack"
          className={`object-cover md:mask-l-from-1% -z-20 opacity-50 mask-t-from-1% md:mask-t-from-0 rounded-xl`}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <header className="p-1.5 justify-between z-10">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center pl-1">
              <Settings size={16} className="text-foreground" />
              <h3 className="text-lg font-semibold text-foreground">
                Configuración
              </h3>
            </div>

            <button
              className="rounded-full p-2 hover:bg-secondary transition-colors text-muted-foreground"
              onClick={close}
            >
              <X size={16} />
            </button>
          </div>
        </header>

        <aside className="flex flex-col px-4 py-2 z-30">
          <article className="space-y-0.5">
            <label className="flex gap-8 text-xs md:text-base justify-between items-center text-muted-foreground leading-relaxed">
              Configurar para no volver a ver éste mensaje al inicio.
              <input
                type="checkbox"
                name="init-message"
                id=""
                onChange={handleChange}
                className="size-4 accent-foreground cursor-pointer"
              />
            </label>
            <label className="flex gap-8 text-xs md:text-base justify-between items-center text-muted-foreground leading-relaxed">
              No guardar historial del chat.
              <input
                type="checkbox"
                name="history-chat"
                id=""
                onChange={handleChange}
                className="size-4 accent-foreground cursor-pointer"
              />
            </label>
            <label className="flex gap-8 text-xs md:text-base justify-between items-center text-muted-foreground leading-relaxed">
              No usar mi ubicación para el asistente.
              <input
                type="checkbox"
                name="use-location"
                id=""
                onChange={handleChange}
                className="size-4 accent-foreground cursor-pointer"
              />
            </label>
          </article>
          <div className="flex justify-evenly md:justify-end gap-2 items-center py-2 mt-2">
            <Button
              style={{
                background: "transparent",
                outline: "1px solid var(--foreground)",
                outlineOffset: "-2px",
                color: "var(--foreground)",
                backdropFilter: "blur(2px)",
                cursor: "pointer",
                padding: "6px 12px",
              }}
              onClick={close}
            >
              Cancelar
            </Button>
            <Button
              style={{ width: "fit", padding: "6px 12px" }}
              onClick={saveSettings}
            >
              Guardar
            </Button>
          </div>
        </aside>
      </div>
    </section>
  );
};
