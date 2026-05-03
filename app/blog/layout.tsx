import type { ReactNode } from "react";

import { ThemeProviderClient } from "@/components/theme-provider-client";
import { Footer, Header } from "@/components";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProviderClient>
      <section className="min-h-screen overflow-x-hidden px-3 md:px-0">
        <div className="relative mx-auto flex max-w-6xl flex-col justify-center">
          <div className="absolute top-0 h-full w-6 -left-6 bg-stripes md:-left-6" />
          <Header />
          <main className="border-x border-border-color">{children}</main>
          <Footer />
          <div className="absolute top-0 h-full w-6 -right-6 bg-stripes md:-right-6" />
        </div>
      </section>
    </ThemeProviderClient>
  );
}