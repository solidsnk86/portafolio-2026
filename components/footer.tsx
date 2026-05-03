"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { useCallback, useEffect, useState } from "react";

interface Phrases {
  id: number;
  autor: string;
  texto: string;
}

export function Footer() {
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
    { label: "Twitter", href: "https://twitter.com/solidsnk86" },
    { label: "Instagram", href: "https://instagram.com/solidsnk86" },
  ];

  const projectLinks = [
    { label: "E-commerce", href: "#projects" },
    { label: "Dashboard", href: "#projects" },
    { label: "Turnos App", href: "#projects" },
  ];

  const blogLinks = [
    { label: "TypeScript Tips", href: "#blogs" },
    { label: "React Patterns", href: "#blogs" },
    { label: "Next.js Best Practices", href: "#blogs" },
  ];
  
  const [repoLinks, setRepoLinks] = useState<{ name: string; id?: number }[]>(
    [],
  );
  const [articleLinks, setArticleLinks] = useState<
    { name: string; title?: string }[]
  >([]);

  useEffect(() => {
    let active = true;

    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        if (!active) return;
        setRepoLinks((data.allProjects || []).slice(0, 4));
      } catch (err) {
        console.error(err);
      }
    };

    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        if (!active) return;
        setArticleLinks((data.blog || []).slice(0, 4));
      } catch (err) {
        console.error(err);
      }
    };

    fetchProjects();
    fetchBlogs();

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <footer className="border-t border-x border-border-color">
        <div className="grid grid-cols-1 xl:grid-cols-4 px-4">
          <div className="flex flex-col gap-3 px-2 py-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Citas
            </span>
            {getRandomPhrase(phrases)?.map((quote) => (
              <blockquote
                key={quote?.texto}
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
            {repoLinks.length > 0
              ? repoLinks.map((repo) => (
                  <Link
                    key={repo.name}
                    href={`/project/${repo.name}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {repo.name}
                  </Link>
                ))
              : projectLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
          </div>
          <div className="flex flex-col justify-start gap-2 py-4 px-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Artículos
            </span>
            {articleLinks.length > 0
              ? articleLinks.map((b) => (
                  <Link
                    key={b.name}
                    href={`/blog/${b.name}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {b.title ?? b.name}
                  </Link>
                ))
              : blogLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
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
        <div className="">
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
