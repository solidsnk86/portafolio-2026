"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { GithubIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "./common";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Proyectos", section: "/#projects" },
    { name: "Blog", section: "/#blogs" },
    { name: "Contacto", section: "/#contact" },
  ];

  const socialLinks = [
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/gabriel",
      icon: LinkedinIcon,
    },
    {
      label: "GitHub",
      href: "https://github.com/solidsnk86",
      icon: GithubIcon,
    },
    {
      label: "Twitter",
      href: "https://twitter.com/solidsnk86",
      icon: TwitterIcon,
    },
    {
      label: "Instagram",
      href: "https://instagram.com/solidsnk86",
      icon: InstagramIcon,
    },
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
          <h2 className="text-xl font-semibold capitalize text-foreground tracking-widest">
            SolidSnk86
          </h2>
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
            <ThemeToggle className="translate-y-[1.5px]" />
          </div>
        </nav>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 top-19 h-[calc(100dvh-73px)] bg-background md:hidden">
          <div className="fixed top-[75px] h-full w-[13px] left-0 bg-stripes border-r border-border-color" />
          <nav className="flex h-full flex-col border-t border-border-color mx-3">
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
            <div className="flex justify-between gap-0">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="p-5 borderx-0 border-r last:border-0 border-border-color w-full"
                >
                  <Icon className="w-full" width={24} height={24} />
                </Link>
              ))}
            </div>
          </nav>
          <div className="fixed top-[75px] right-0 h-full w-[13px] bg-stripes border-l border-border-color" />
        </div>
      )}
    </header>
  );
}
