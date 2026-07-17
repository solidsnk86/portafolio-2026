import {
  About,
  Blogs,
  Contact,
  Footer,
  Header,
  Hero,
  Projects,
} from "@/components";
import { ScheduleChat } from "@/components/ui/assistant/schedule-chat";
import { WhatIDo } from "@/components/what-i-do";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ utm_source?: string; fbclid?: string }>;
}) {
  const fbclid = (await searchParams).fbclid;
  const source =
    (await searchParams).utm_source || typeof fbclid !== "undefined"
      ? `fbId=${fbclid}`
      : `No se detectó el origen utm`;

  return (
    <section className="min-h-screen overflow-x-hidden px-3 md:px-0">
      <div className="relative mx-auto flex max-w-6xl flex-col justify-center">
        <div className="absolute top-0 h-full w-6 -left-6 bg-stripes md:-left-6" />
        <Header />
        <main className="border-x border-border-color">
          <Hero />
          <About source={source} />
          <Projects />
          <Blogs />
          <Contact />
          <WhatIDo />
        </main>
        <ScheduleChat />
        <Footer />
        <div className="absolute top-0 h-full w-6 -right-6 bg-stripes md:-right-6" />
      </div>
    </section>
  );
}
