"use client";

import { Ref, useState } from "react";
import type { Message } from "../chat";
import MarkdownRenderer from "@/components/markdown-renderer";
import { Check, Loader } from "lucide-react";
import Link from "next/link";
import { LoaderBlocks } from "../../loader-blocks";

interface MainSectionChatProps {
  messagesRef: Ref<HTMLDivElement>;
  chatResponses: Message[];
  country: { emojiFlag: string };
  isLoading: boolean;
  error: TypeError | Error | undefined;
}

const loadingStateWords = [
  "procesando",
  "analizando",
  "evaluando",
  "desarrollando",
  "prototipando",
  "preparando",
  "pensando",
  "compilando",
  "iterando",
  "renderizando",
  "optimizando",
  "sincronizando",
  "generando",
  "consultando",
  "armando",
  "puliendo",
  "chequeando",
  "ensamblando",
];

const pickRandom = () =>
  loadingStateWords[Math.floor(Math.random() * loadingStateWords.length)];

export const MainSectionChat = ({
  messagesRef,
  chatResponses,
  country,
  isLoading,
  error,
}: MainSectionChatProps) => {
  const [randomWord, setRandomWord] = useState(pickRandom);
  const [prevIsLoading, setPrevIsLoading] = useState(isLoading);

  if (isLoading !== prevIsLoading) {
    setPrevIsLoading(isLoading);
    if (isLoading) {
      setRandomWord(pickRandom());
    }
  }

  return (
    <div
      ref={messagesRef}
      className="flex-1 overflow-y-auto px-5 pt-4 pb-11 space-y-3 mask-b-from-90% overflow-x-hidden"
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
                    ? "bg-indigo-600 text-white rounded-2xl rounded-br-md overflow-x-hidden"
                    : "bg-secondary text-foreground rounded-2xl rounded-bl-md overflow-x-hidden"
                }`}
            >
              <MarkdownRenderer content={chat.content} isChat={true} />

              <div className="flex justify-between gap-1.5 items-center">
                <div className="flex items-center gap-1">
                  <time className="text-[10.5px] uppercase opacity-70">
                    {chat.createdAt as string}
                  </time>
                  <span className="text-muted-foreground">&middot;</span>
                  <div className="relative flex">
                    <time className="text-[10.5px] opacity-70">
                      {new Date().toLocaleDateString("es-AR", {
                        month: "short",
                        day: "numeric",
                      })}
                      , {new Date().getFullYear()}
                    </time>
                  </div>
                </div>
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
          <small className="flex gap-1 items-center capitalize">
            <LoaderBlocks
              boardWidth="w-3"
              boardHeight="h-3"
              width="2px"
              height="2px"
            />{" "}
            {randomWord}...
          </small>
        </div>
      )}

      {error && <div className="text-sm text-red-500">{error.message}</div>}
    </div>
  );
};
