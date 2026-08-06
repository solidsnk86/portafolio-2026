"use client";

import { useContentData } from "@/context/content-context";
import { useLocation } from "@/context/location-context";
import { useEffect, useRef, useState } from "react";
import { FooterSectionChat } from "./components/footer-section-chat";
import { HeaderSectionChat } from "./components/header-section-chat";
import { MainSectionChat } from "./components/main-section-chat";
import { showDialog } from "@/components/common/dialog";
import { DISALLOWED_WORDS } from "@/utils/constants";

export interface Message {
  role: "user" | "assistant";
  content: string;
  createdAt?: Date | string;
  readed?: boolean;
  searchResult?: string;
  responseTime?: number;
}

export const Chat = () => {
  const {
    data: { city, country },
  } = useLocation();
  const MAX_CHAR = 300;
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

  const getProcessedText = () => {
    const words = query.split(" ");
    const filteredWords = words.filter((word) => !DISALLOWED_WORDS.includes(word));
    return filteredWords.join(" ");
  }

  const onSubmit = async () => {
    if (!query.trim()) {
      setError(new Error("Escriba un mensaje."));
      return;
    }

    setChatResponses((prev) => [
      ...prev,
      {
        role: "user",
        content: getProcessedText(),
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
      ({ createdAt, readed, searchResult, responseTime, ...message }) => message,
    );

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: getProcessedText(),
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
          content: jsonData.context ?? "Ooops parece que hubo un error. Intenta más tarde.",
          createdAt: jsonData.createdAt,
          readed: true,
          searchResult: jsonData.searchResult,
          responseTime: jsonData.responseTime
        },
      ]);
      if (jsonData.context.toLowerCase().match("Se ha bloqueado la conversación.")) {
        showDialog({ content: <div className="p-5">Lamentablemente se cerrará el chat por tu comportamiento.</div> })
      }
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
      <HeaderSectionChat
        historyChat={historyChat}
        chatResponses={chatResponses}
        clearChat={clearChat}
        country={country}
        city={city}
        status={status}
      />

      <MainSectionChat
        messagesRef={messagesRef}
        chatResponses={chatResponses}
        isLoading={isLoading}
        country={country}
        error={error}
      />

      <FooterSectionChat
        query={query}
        getProcessedText={getProcessedText}
        setQuery={setQuery}
        charCount={charCount}
        setCharCount={setCharCount}
        isLoading={isLoading}
        onSubmit={onSubmit}
        playBubbleSound={playBubbleSound}
        textareaRef={textareaRef}
        maxChar={MAX_CHAR}
      />
    </div>
  );
};
