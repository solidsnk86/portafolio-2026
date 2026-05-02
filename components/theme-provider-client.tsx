"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/context/theme-context";

export function ThemeProviderClient({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

export default ThemeProviderClient;
