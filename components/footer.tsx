"use client";

import { useContentData } from "@/context/content-context";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { useCallback, useEffect, useState } from "react";
import { featuredProjects, formatText } from "./projects";

interface Phrases {
  id: number | string;
  autor: string;
  texto: string;
}

export function Footer() {
  const { blogs, projects } = useContentData();
  const [phrases, setPrhases] = useState<Phrases[]>([{ id: crypto.randomUUID() ,texto: "El ir más rápido, ¿produce más?", autor: "Gabriel Calcagni" }]);
  const [randomIndex] = useState<number>(() => Math.random());

  const getPhrases = useCallback(async () => {
    try {
      await fetch(
        "https://cdn.jsdelivr.net/gh/liquidsnk86/cdn-js@main/ramdom-json-phrases.json",
      )
        .then((res) => res.json())
        .then((cdn) => setPrhases(cdn.data.frases || []))
        .catch((err) => {
          throw new Error(err);
        });
    } catch (error) {
      console.log(error);
    }
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

  const projectLinks = projects
    .filter(
      (project) =>
        !featuredProjects.some(
          (fp) => fp.name === project.name || project.name === "neo-wifi-apk",
        ),
    )
    .slice(0, 4);
  const blogLinks = blogs.slice(0, 4).reverse();

  return (
    <>
      <footer className="border-t border-x border-border-color z-40 bg-background">
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="flex flex-col justify-start gap-2 py-4 px-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Citas
            </span>
            {getRandomPhrase(phrases)?.map((quote) => (
              <blockquote
                key={crypto.randomUUID()}
                className="text-sm leading-relaxed text-foreground text-pretty"
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
                className="text-sm  text-foreground transition-colors hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col justify-start gap-2 xl:border-r border-border-color py-4 px-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Otros Proyectos
            </span>
            {projectLinks.length !== 0
              ? projectLinks.map((repo) => (
                  <Link
                    key={repo.id}
                    href={`/project/${repo.name}`}
                    className="text-sm transition-colors text-foreground capitalize hover:underline"
                  >
                    {formatText(repo.name)}
                  </Link>
                ))
              : featuredProjects.map((repo) => (
                  <Link
                    key={repo.name}
                    href={`/project/${repo.name}`}
                    className="text-sm transition-colors text-foreground capitalize hover:underline"
                  >
                    {formatText(repo.name)}
                  </Link>
                ))}
          </div>
          <div className="flex flex-col justify-start gap-2 py-4 px-4">
            <span
              className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
              aria-description="Artículos del blog"
            >
              Artículos
            </span>
            {blogLinks.map((blog) => (
              <Link
                key={blog.name}
                href={`/blog/${blog.name}`}
                className="text-sm transition-colors text-foreground hover:underline"
              >
                {blog.title}
              </Link>
            ))}
          </div>
        </div>
      </footer>
      <div className="flex justify-between border-t border-border-color items-center border-x p-4 z-40 bg-background">
        <div className="ml-10 md:ml-0">
          <p className="font-sans text-muted-foreground text-sm inline-flex">
            &copy; {new Date().getFullYear()} ·
            <span className="hidden md:block ml-1">Hecho con 💛 por</span>{" "}
            <Link href={"https://github.com/solidsnk86"} className="hover:text-accent ml-1 hover:underline">SolidSnk86</Link>
          </p>
        </div>
        <div className="translate-y-0.5">
          <ThemeToggle sizeIcons={17} />
        </div>
      </div>
    </>
  );
}
