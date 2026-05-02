"use client";

import { ReactNode } from "react";
import {
  ThemeProvider as NextThemeProvider,
  useTheme as useNextTheme,
} from "next-themes";

type Theme = "light" | "dark";

type UseThemeResult = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
}

export function useTheme(): UseThemeResult {
  const { theme, resolvedTheme, setTheme } = useNextTheme();
  const currentTheme = (theme === "system" ? resolvedTheme : theme) as Theme;

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return {
    theme: currentTheme ?? "light",
    setTheme: (nextTheme: Theme) => setTheme(nextTheme),
    toggleTheme,
  };
}
