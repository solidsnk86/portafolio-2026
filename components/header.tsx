"use client";

import { ChevronRight, Menu, MoveRight, X } from "lucide-react";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { GithubIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "./common";
import Image from "next/image";
import { useTheme } from "@/context/theme-context";
import { LocationProps, useLocation } from "@/context/location-context";
import { useContentData } from "@/context/content-context";
import { email, whatsappLink } from "./contact";

interface NavLinkInterface {
  id: number;
  name: string;
  section?: string;
  subMenu: ReactNode;
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { projects, blogs } = useContentData();
  const { theme, toggleTheme } = useTheme();
  const { data: location, isLoading } = useLocation();
  const isDarkMode = theme === "dark";
  const [activeItems, setActiveItems] = useState<number[]>([]);

  const toggle = (id: number) => {
    setActiveItems((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const navLinks: NavLinkInterface[] = [
    {
      id: 1,
      name: "Proyectos",
      section: "/all-projects",
      subMenu: (
        <div className="grid gap-1 p-1">
          {projects.slice(0, 6).map((project) => (
            <Link
              key={project.id}
              href={`/project/${project.name}`}
              className="py-2 px-4 hover:bg-card border border-border-color sub-menu"
            >
              <div className="flex justify-between items-center">
                <p className="capitalize text-xs">
                  {project.name.replaceAll("-", " ")}
                </p>
                <MoveRight size={16} className="text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      ),
    },
    {
      id: 2,
      name: "Blog",
      section: "/#blogs",
      subMenu: (
        <div className="grid gap-1 p-1">
          {blogs.slice(0, 6).map((blog) => (
            <Link
              key={blog.name}
              href={`/blog/${blog.name}`}
              className="py-2 px-4 hover:bg-card border border-border-color sub-menu"
            >
              <div className="flex justify-between items-center">
                <p className="capitalize text-xs">
                  {blog.name.replaceAll("-", " ")}
                </p>
                <MoveRight size={16} className="text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      ),
    },
    {
      id: 3,
      name: "Contacto",
      section: "/#contact",
      subMenu: (
        <div className="grid gap-1 p-1">
          <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background font-semibold hover:opacity-80"
          >
            Contáctame en WhatsApp
          </Link>
          <Link
            href={`mailto:${email}`}
            className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background font-semibold hover:opacity-80"
          >
            {email}
          </Link>
        </div>
      ),
    },
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

  const collectData = async ({ data }: Pick<LocationProps, "data">) => {
    await fetch("/api/collection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
  };

  useEffect(() => {
    if (isLoading || !location || !location.lastAccess) return;

    const currentIP = location.ip;
    const lastIP = location.lastAccess.ip;

    if (lastIP !== currentIP && !currentIP.includes("45.178.0")) {
      const timeoutId = setTimeout(() => {
        collectData({ data: location });
      }, 600);

      return () => clearTimeout(timeoutId);
    }
  }, [isLoading, location]);

  useEffect(() => {
    document.documentElement.style.overflow = isMenuOpen ? "hidden" : "auto";

    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full border-b border-x border-border-color bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="p-4.5 border-r border-border-color">
          {isDarkMode ? (
            <Link href="/">
              <Image
                src="/assets/solid-dark-mode.png"
                width={95}
                height={55}
                alt="SolidSnk86"
                loading="eager"
                className="rotate-3 translate-y-0.5"
                preload
              />
            </Link>
          ) : (
            <Link href="/">
              <Image
                src="/assets/solid-light-mode.png"
                width={95}
                height={55}
                alt="SolidSnk86"
                loading="eager"
                className="rotate-3 translate-y-0.5"
                preload
              />
            </Link>
          )}
        </div>

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
              href={section as string}
              className="flex w-28 justify-center border-l border-border-color py-7 hover:bg-secondary"
            >
              {name}
            </Link>
          ))}
          <div
            onClick={toggleTheme}
            className="flex items-center border-l border-border-color px-6 py-7 hover:bg-secondary"
          >
            <ThemeToggle className="translate-y-[1.5px]" />
          </div>
        </nav>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 top-19 h-[calc(100dvh-73px)] bg-background md:hidden">
          <div className="fixed top-18.75 h-full w-3.25 left-0 bg-stripes border-r border-border-color z-50" />
          <nav className="flex h-full flex-col border-t border-border-color mx-3 overflow-x-hidden overflow-y-auto pb-32">
            {navLinks.map(({ id, name, subMenu }) => (
              <div key={id} className="" id={`nav-link-${id}`}>
                <button
                  onClick={() => toggle(id)}
                  className="flex w-full justify-between p-5 items-center border-b border-border-color text-lg font-semibold text-foreground"
                >
                  {name}
                  {
                    <ChevronRight
                      className={`${activeItems.includes(id) ? "rotate-0" : "rotate-90"} transition-transform`}
                    />
                  }
                </button>
                {activeItems.includes(id) && (
                  <article
                    className={`${activeItems.includes(id) ? "h-full" : "h-0"} transition-discrete duration-700 ease-in-out`}
                  >
                    {subMenu}
                  </article>
                )}
              </div>
            ))}
            <div className="fixed bottom-0 left-3.25 right-3.25 flex justify-between gap-0 bg-background z-40">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="p-5 border-x-0 border-r last:border-0 border-t last:border-t border-border-color w-full"
                >
                  <Icon className="w-full" width={24} height={24} />
                </Link>
              ))}
            </div>
          </nav>
          <div className="fixed top-18.75 right-0 h-full w-3.25 bg-stripes border-l border-border-color z-50" />
        </div>
      )}
    </header>
  );
}
