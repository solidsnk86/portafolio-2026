import { HistoryChat } from "@/context/content-context";
import { timeAgo } from "@/utils/formatRelativeTime";
import { Navigation, Plus } from "lucide-react";
import type { Message } from "../chat";

interface HeaderSectionChatProps {
  historyChat: HistoryChat | null;
  status: "active" | "inactive";
  chatResponses: Message[];
  city: { name: string };
  country: { name: string; alpha: string };
  clearChat: () => void;
}

export const HeaderSectionChat = ({
  historyChat,
  status,
  chatResponses,
  city,
  country,
  clearChat,
}: HeaderSectionChatProps) => {
  return (
    <header className="border-b border-border-color px-4 pt-4 shrink-0">
      <div className="flex items-center gap-1 relative">
        {timeAgo(new Date(historyChat?.created_at as string))?.includes(
          "segundo",
        ) || status === "active" ? (
          <div className="absolute bottom-2 outline-2 outline-background left-6.5 w-1.5 h-1.5 rounded-full bg-green-500" />
        ) : (
          <div className="absolute bottom-2 outline-2 outline-background left-6.5 w-1.5 h-1.5 rounded-full bg-zinc-500" />
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
              {timeAgo(new Date(historyChat?.created_at as string))?.includes(
                "segundo",
              ) || status === "active"
                ? "En Línea"
                : "Desconectado"}
            </small>
            ·
            {timeAgo(new Date(historyChat?.created_at as string))?.includes(
              "segundo",
            ) || status === "active" ? (
              <small className="text-xs">conectado ahora</small>
            ) : (
              <small className="text-xs">
                última actividad{" "}
                {timeAgo(new Date(historyChat?.created_at as string))}
              </small>
            )}
          </div>
        </div>
      </div>
      <aside className="flex items-center w-full justify-between my-1">
        <button
          onClick={clearChat}
          title={
            chatResponses.length === 0 ? "Escriba en el chat" : "Nuevo chat"
          }
          disabled={chatResponses.length === 0}
          className="flex items-center gap-0.5 py-0.5 px-1 disabled:text-muted-foreground transition-colors hover:opacity-80"
        >
          <Plus size={12} className="text-accent" />
          <p className="text-[11px]">Nuevo chat</p>
        </button>
        <div className="flex items-center gap-1">
          <Navigation size={11} className="text-accent" />
          <p className="text-[11px]">
            Ubicación: {city.name}, {country.alpha}
          </p>
        </div>
      </aside>
    </header>
  );
};
