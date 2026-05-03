"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Proyectos", section: "#projects" },
    { name: "Blog", section: "#blogs" },
    { name: "Contacto", section: "#contact" },
  ];

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full border-b border-x border-border-color bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="p-6 border-r border-border-color">
          <h2 className="text-xl font-semibold capitalize text-foreground tracking-widest">SolidSnk86</h2>
        </Link>

        <div className="flex items-center md:hidden">
          <div className="flex h-full items-center border-l border-border-color px-5 py-7">
            <ThemeToggle />
          </div>
          <button
            type="button"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-full items-center border-l border-border-color px-5 py-7 text-foreground"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <nav className="hidden h-full items-center text-sm text-foreground md:flex">
          {navLinks.map(({ name, section }) => (
            <Link
              key={name}
              href={section}
              className="flex w-28 justify-center border-l border-border-color py-7"
            >
              {name}
            </Link>
          ))}
          <div className="flex items-center border-l border-border-color px-6 py-7">
            <ThemeToggle />
          </div>
        </nav>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 top-18.25 h-[calc(100dvh-73px)] bg-background md:hidden">
          <nav className="flex h-full flex-col border-t border-border-color">
            {navLinks.map(({ name, section }) => (
              <Link
                key={name}
                href={section}
                onClick={() => setIsMenuOpen(false)}
                className="flex flex-1 items-center justify-center border-b border-border-color text-xl font-semibold text-foreground"
              >
                {name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
