"use client";

import { type Dispatch, type RefObject, type SetStateAction } from "react";

interface FooterSectionChatProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  charCount: number;
  setCharCount: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
  onSubmit: () => void;
  playBubbleSound: () => void;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  maxChar: number;
}

export type Model =
  | "llama-3.1-8b-instant"
  | "openai/gpt-oss-120b"
  | "llama-3.3-70b-versatile"
  | "openai/gpt-oss-20b";

export const models = [
  "llama-3.1-8b-instant",
  "openai/gpt-oss-120b",
  "llama-3.3-70b-versatile",
  "openai/gpt-oss-20b",
];

export const FooterSectionChat = ({
  query,
  setQuery,
  charCount,
  setCharCount,
  isLoading,
  onSubmit,
  playBubbleSound,
  textareaRef,
  maxChar,
}: FooterSectionChatProps) => {
  return (
    <div className="border-t border-border-color p-3 bg-background">
      {/* <label className="text-[11px]">
        Modelo:{" "}
        <select
          onChange={(e) => setSelectedModel(e.target.value as Model)}
          value={selectedModel}
          className="px-2 text-[11px] mb-2 bg-background rounded-md border border-border-color focus:ring-2 ring-accent/50"
        >
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </label> */}
      <div className="flex gap-2 items-end">
        <textarea
          rows={1}
          ref={textareaRef}
          maxLength={maxChar}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setCharCount(e.target.value.length);
          }}
          placeholder="Escriba su consulta /email"
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
          className="py-2 px-4 rounded-lg bg-foreground text-background border border-border-color text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Enviar
        </button>
      </div>
      <div className="ml-1 mt-0.5 flex justify-between items-center">
        <small className="text-[10px] text-muted-foreground">
          {charCount}/{maxChar}
        </small>
        <small className="text-[10px] text-muted-foreground">
          Max. {maxChar} caracteres
        </small>
      </div>
    </div>
  );
};
