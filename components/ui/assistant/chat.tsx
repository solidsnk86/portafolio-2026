"use client";

import MarkdownRenderer from "@/components/markdown-renderer";
import { useLocation } from "@/context/location-context";
import { Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface Message {
  role: "user" | "assistant";
  content: string;
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
  }, [chatResponses, isLoading]);

  const onSubmit = async () => {
    if (!query.trim()) {
      setError(new Error("Escriba un mensaje."));
      return;
    }

    setChatResponses((prev) => [...prev, { role: "user", content: query }]);
    setError(undefined);
    setIsLoading(true);
    setQuery("");
    setCharCount(0);

    if (textareaRef.current) textareaRef.current.style.height = "36px";

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          historyChat: chatResponses,
          city,
          country,
          lang: country.alpha,
        }),
      });

      const jsonData = await response.json();

      if (!response.ok) throw new Error(jsonData.message);

      setChatResponses((prev) => [
        ...prev,
        {
          role: "assistant",
          content: jsonData.context ?? "",
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
        },
      ]);
    } finally {
      setQuery("");
      setIsLoading(false);
      if (textareaRef.current) textareaRef.current.style.height = "36px";
      setCharCount(0);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div
        ref={messagesRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
      >
        {chatResponses.map((chat, idx) => {
          return (
            <div
              key={idx}
              className={`flex ${
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
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="text-sm text-muted-foreground animate-pulse">
            <small className="flex gap-1 items-center">
              <Loader size={14} className="animate-spin -translate-y-px" /> Procesando...
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
            placeholder="Escriba su consulta..."
            className="
              flex-1
              resize-none
              overflow-y-hidden
              rounded-lg
              border
              border-border-color
              bg-transparent
              px-3
              py-2
              text-sm
              outline-none
              focus:ring-3
              focus:ring-indigo-500/30
            "
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSubmit();
              }
            }}
          />

          <button
            onClick={onSubmit}
            disabled={!query.trim() || isLoading}
            className="
              h-9
              px-4
              rounded-lg
              bg-foreground
              text-background
              text-sm
              disabled:opacity-50
              disabled:cursor-not-allowed
              transition-colors
            "
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
