import { Ref } from "react";
import type { Message } from "../chat";
import MarkdownRenderer from "@/components/markdown-renderer";
import { Check, Loader } from "lucide-react";
import Link from "next/link";

interface MainSectionChatProps {
  messagesRef: Ref<HTMLDivElement>;
  chatResponses: Message[];
  country: { emojiFlag: string };
  isLoading: boolean;
  error: TypeError | Error | undefined;
}

export const MainSectionChat = ({
  messagesRef,
  chatResponses,
  country,
  isLoading,
  error,
}: MainSectionChatProps) => {
  return (
    <div
      ref={messagesRef}
      className="flex-1 overflow-y-auto px-4 pt-4 pb-10 space-y-3 mask-b-from-90% overflow-x-hidden"
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
                    : "bg-foreground text-background rounded-2xl rounded-bl-md overflow-x-hidden"
                }`}
            >
              <MarkdownRenderer content={chat.content} isChat={true} />
              {chat.role === "assistant" && chat.searchResult?.length !== 0 && (
                <div className="flex gap-2 justify-between items-center my-2 text-muted-foreground italic">
                  <small>
                    Tiempo empleado en la búsqueda {chat.responseTime}s
                  </small>
                  <small>powered by <Link href={"https://www.tavily.com/"} className="text-emerald-500">Tavily</Link></small>
                </div>
              )}
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
  );
};
