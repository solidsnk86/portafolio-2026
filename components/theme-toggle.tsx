"use client";

import { useTransition } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/theme-context";

type ThemeToggleProps = {
  className?: string;
  sizeIcons?: number;
};

export function ThemeToggle({ className = "", sizeIcons = 18 }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [isPending, startTransition] = useTransition();

  const isDark = theme === "dark";

  const handleToggle = () => {
    startTransition(() => {
      toggleTheme();
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      aria-label={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      title={isDark ? "Tema claro" : "Tema oscuro"}
      suppressHydrationWarning
      className={[
        "inline-flex h-5 w-5 items-center justify-center leading-none",
        "text-foreground transition-colors hover:text-muted-foreground",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {isDark ? <Sun size={sizeIcons} className="block" /> : <Moon size={sizeIcons} className="block" />}
    </button>
  );
}
