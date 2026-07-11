import type { Dispatch, RefObject, SetStateAction } from "react";

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
