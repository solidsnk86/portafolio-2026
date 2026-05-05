"use client";

import Image from "next/image";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl md:min-h-[90dvh] border-b border-border-color">
      <div className="grid h-full items-stretch md:grid-cols-2">
        <div className="p-6 md:flex md:items-center md:h-full md:p-10 lg:p-12">
          <div className="my-24">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Hola,
            </p>
            <h1 className="text-5xl font-semibold leading-tight text-foreground md:text-6xl">
              Soy Gabriel
            </h1>
            <p className="max-w-xl text-base text-muted-foreground md:text-lg my-4">
              Técnico Universitario en Programación y entusiasta del desarrollo
              de software.
            </p>
          </div>
        </div>

        <div className="relative h-full min-h-80 w-full md:min-h-[90dvh]">
          <Image
            src={"/texture-color.jpg"}
            fill
            alt="Gabriel - Desarrollador Full Stack"
            className={`object-cover md:mask-l-from-10% -z-10`}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
