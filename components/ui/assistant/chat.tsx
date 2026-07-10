"use client";

import MarkdownRenderer from "@/components/markdown-renderer";
import { useContentData } from "@/context/content-context";
import { useLocation } from "@/context/location-context";
import { timeAgo } from "@/utils/formatRelativeTime";
import { Check, Loader, Navigation, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface Message {
  role: "user" | "assistant";
  content: string;
  createdAt?: Date | string;
  readed?: boolean;
}

export const Chat = () => {
  const {
    data: { city, country },
  } = useLocation();
  const MAX_CHAR = 250;
  const [chatResponses, setChatResponses] = useState<Message[]>([]);
  const [query, setQuery] = useState("");
  const [charCount, setCharCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const { historyChat } = useContentData();
  const [status, setStatus] = useState<"active" | "inactive">("inactive");

  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.addEventListener("input", () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height =
          textareaRef.current.scrollHeight + "px";
      }
    });
  }, []);

  useEffect(() => {
    if (!messagesRef.current) return;

    messagesRef.current.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });

    sessionStorage.setItem("history-chat", JSON.stringify(chatResponses));
  }, [chatResponses, isLoading]);

  const playBubbleSound = () => {
    const audio = new Audio("/assets/sounds/bubble-pop.mp3");
    if (audio) {
      audio.volume = 0.5;
      audio.play();
    }
  };

  const onSubmit = async () => {
    if (!query.trim()) {
      setError(new Error("Escriba un mensaje."));
      return;
    }

    setChatResponses((prev) => [
      ...prev,
      {
        role: "user",
        content: query,
        createdAt: new Date().toLocaleTimeString(),
        readed: true,
      },
    ]);

    setError(undefined);
    setIsLoading(true);
    setQuery("");
    setCharCount(0);

    if (textareaRef.current) textareaRef.current.style.height = "36px";

    const messageToSend = chatResponses.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ createdAt, readed, ...message }) => message,
    );

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          historyChat: messageToSend,
          city,
          country,
          lang: country.alpha,
          time: new Date().toLocaleDateString("es-AR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          }),
          createdAt: new Date().toLocaleTimeString(),
        }),
      });

      const jsonData = await response.json();

      if (!response.ok) throw new Error(jsonData.message);

      playBubbleSound();
      setStatus("active");
      setChatResponses((prev) => [
        ...prev,
        {
          role: "assistant",
          content: jsonData.context ?? "Hubo un error?",
          createdAt: jsonData.createdAt,
          readed: true,
        },
      ]);
    } catch (error) {
      console.log((error as TypeError).message);
      setChatResponses([
        { role: "user", content: query },
        {
          role: "assistant",
          content:
            "Al parecer algo salío mal, vuelva a intentarlo después nuevamente.",
          createdAt: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setQuery("");
      setIsLoading(false);
      if (textareaRef.current) textareaRef.current.style.height = "36px";
      setCharCount(0);
    }
  };

  const clearChat = () => setChatResponses([]);

  return (
    <div className="flex flex-col h-full relative">
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
            title={chatResponses.length === 0 ? "Escriba en el chat" : "Nuevo chat"}
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

      <div
        ref={messagesRef}
        className="flex-1 overflow-y-auto px-4 pt-4 pb-10 space-y-3 mask-b-from-90%"
      >
        {chatResponses.map((chat, idx) => {
          return (
            <div
              key={idx}
              className={`flex relative ${
                chat.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[82%] px-3 py-2 text-sm leading-6
                ${
                  chat.role === "user"
                    ? "bg-indigo-600 text-white rounded-2xl rounded-br-md"
                    : "bg-foreground text-background rounded-2xl rounded-bl-md"
                }`}
              >
                <MarkdownRenderer content={chat.content} isChat={true} />
                <div className="flex justify-between gap-1.5 items-center">
                  <time className="text-[10.5px] text-zinc-400 uppercase">
                    {chat.createdAt as string}
                  </time>

                  {chat.readed ? (
                    <div className="relative flex -space-x-2">
                      <Check size={13} className="text-blue-500" />
                      <Check size={13} className="text-blue-500" />
                    </div>
                  ) : (
                    <Check size={13} />
                  )}
                </div>
                {chat.role === "assistant" && (
                  <div className="absolute -bottom-4.5 -left-4">
                    <picture>
                      <img
                        src="/mgc.jfif"
                        alt="Gabriel avatar"
                        width="27px"
                        height="27px"
                        className="object-cover rounded-full border-3 border-background"
                      />
                    </picture>
                  </div>
                )}
                {chat.role === "user" && (
                  <div className="absolute -bottom-4.5 -right-4">
                    <div
                      style={{ width: "27px", height: "27px" }}
                      className="grid content-center justify-center border-2 border-background bg-foreground rounded-full"
                    >
                      <small className="text-[10px] text-background">
                        {country.emojiFlag}
                      </small>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="text-sm text-muted-foreground animate-pulse">
            <small className="flex gap-1 items-center">
              <Loader size={14} className="animate-spin -translate-y-px" />{" "}
              Procesando...
            </small>
          </div>
        )}

        {error && <div className="text-sm text-red-500">{error.message}</div>}
      </div>

      <div className="border-t border-border-color p-3 bg-background">
        <div className="flex gap-2 items-end">
          <textarea
            rows={1}
            ref={textareaRef}
            maxLength={MAX_CHAR}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCharCount(e.target.value.length);
            }}
            placeholder="Escriba su consulta/@email"
            className="flex-1 resize-none overflow-y-hidden rounded-lg border border-border-color bg-transparent px-3 py-2 text-sm outline-none focus:ring-3 focus:ring-indigo-500/30"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                playBubbleSound();
                onSubmit();
              }
            }}
          />

          <button
            onClick={() => {
              playBubbleSound();
              onSubmit();
            }}
            disabled={!query.trim() || isLoading}
            className="h-9 px-4 rounded-lg bg-foreground text-background text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Enviar
          </button>
        </div>
        <div className="ml-1">
          <small className="text-[10px] text-muted-foreground">
            {charCount}/{MAX_CHAR}
          </small>
        </div>
      </div>
    </div>
  );
};
