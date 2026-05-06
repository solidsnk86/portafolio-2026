"use client";

import { useContentData } from "@/context/content-context";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { useCallback, useEffect, useState } from "react";

interface Phrases {
  id: number;
  autor: string;
  texto: string;
}

export function Footer() {
  const { blogs, projects } = useContentData();
  const [phrases, setPrhases] = useState<Phrases[]>([]);
  const [randomIndex] = useState<number>(() => Math.random());

  const getPhrases = useCallback(async () => {
    await fetch(
      "https://cdn.jsdelivr.net/gh/liquidsnk86/cdn-js@main/ramdom-json-phrases.json",
    )
      .then((res) => res.json())
      .then((cdn) => setPrhases(cdn.data.frases || []))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    getPhrases();
  }, [getPhrases]);

  const getRandomPhrase = (data: Phrases[]) => {
    if (!data) return;
    const randomPrhase = data[Math.floor(randomIndex * data.length)];
    return [randomPrhase];
  };

  const socialLinks = [
    { label: "LinkedIn", href: "https://linkedin.com/in/gabriel" },
    { label: "GitHub", href: "https://github.com/solidsnk86" },
    { label: "Twitter", href: "https://x.com/CalcagniGabriel" },
    { label: "Instagram", href: "https://www.instagram.com/calcagnigabriel" },
  ];

  const projectLinks = projects.slice(0, 4);
  const blogLinks = blogs.slice(0, 4);

  return (
    <>
      <footer className="border-t border-x border-border-color">
        <div className="grid grid-cols-1 xl:grid-cols-4 px-4">
          <div className="flex flex-col gap-3 xl:px-0 px-4 py-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Citas
            </span>
            {getRandomPhrase(phrases)?.map((quote) => (
              <blockquote
                key={crypto.randomUUID()}
                className="text-sm leading-relaxed text-muted-foreground text-pretty"
              >
                <span className="block">“{quote?.texto}”</span>
                <footer className="mt-1 text-xs uppercase tracking-[0.18em] text-foreground/70">
                  {quote?.autor}
                </footer>
              </blockquote>
            ))}
          </div>
          <div className="flex flex-col justify-start gap-2 xl:border-x border-border-color py-4 px-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Redes
            </span>
            {socialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col justify-start gap-2 xl:border-r border-border-color py-4 px-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Proyectos
            </span>
            {projectLinks.map((repo) => (
              <Link
                key={repo.id}
                href={`/project/${repo.name}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {repo.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col justify-start gap-2 py-4 px-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Artículos
            </span>
            {blogLinks.map((blog) => (
              <Link
                key={blog.name}
                href={`/blog/${blog.name}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {blog.title}
              </Link>
            ))}
          </div>
        </div>
      </footer>
      <div className="flex justify-between border-t border-border-color items-center border-x p-4">
        <div className="">
          <p className="font-sans text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()}· Hecho con 💛 por SolidSnk86
          </p>
        </div>
        <div className="translate-y-0.5">
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
