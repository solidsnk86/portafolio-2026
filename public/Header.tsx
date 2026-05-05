"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AlignCenter,
  BriefcaseBusiness,
  CircleUser,
  FileBadge,
  InfoIcon,
  MoonStar,
  Rss,
  Sun,
  X,
} from "lucide-react";
import { useMatchMedia } from "@/hooks/useMatchMedia";
import { useTheme } from "@/provider/theme-provider";
import { SocialLinks } from "./SocialLinks";
import { useLocation } from "@/provider/location-provider";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { sendCvView } = useLocation();
  const preferesDark = useMatchMedia("(prefers-color-scheme: dark)", true);
  const menuWrapperRef = useRef<HTMLDivElement>(null);
  const isDarkMode = theme === "dark" || (theme === "system" && preferesDark);
  const links = [
    { name: "acerca", url: "/about/me", icon: InfoIcon },
    { name: "blog", url: "/#blog", icon: Rss },
    { name: "contacto", url: "/#contact", icon: CircleUser },
    { name: "proyectos", url: "/#projects", icon: BriefcaseBusiness },
    {
      name: "cv",
      url: "https://docs.google.com/document/d/1npjJQOyls-A1fhNPE6j58W1xNdDH8BvzG3sX8OkjZbw/edit?usp=sharing",
      icon: FileBadge,
      fx: async () => await sendCvView(),
    },
  ];

  const openMenu = () => {
    setIsMenuOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    if (menuWrapperRef.current) {
      menuWrapperRef.current.addEventListener("click", () =>
        console.log("Clickio tode"),
      );
    }
  }, []);

  const clickSound = () => {
    const audio = new Audio("/assets/computer-click.mp3");
    audio.volume = 0.5;
    if (audio) audio.play().catch((error) => console.log(error));
  };

  return (
    <>
      <header className="sticky top-6 right-10 left-10 rounded-xl w-full mt-6 bg-[var(--header-bg-color)] backdrop-blur-lg h-[74px] mx-auto z-999 border border-[var(--color-border)]">
        <div className="flex items-center justify-between h-full px-6">
          {isDarkMode ? (
            <Link href="/">
              <Image
                src="/assets/solid-dark-mode.png"
                width={95}
                height={55}
                alt="SolidSnk86"
                loading="eager"
                className="rotate-3 translate-y-0.5"
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
              />
            </Link>
          )}
          {/* Links del menú */}
          <aside className="flex items-center">
            <nav className="md:flex hidden items-center gap-4 p-6 group">
              {links.map(({ name, url, fx }) => (
                <Link
                  key={name}
                  href={url}
                  onClick={async () => {
                    if (name.toLowerCase() === "cv" && fx) {
                      await fx();
                    }
                    closeMenu();
                  }}
                  className="font-semibold hover:opacity-75 capitalize relative"
                  target={name.toLowerCase() === "cv" ? "_blank" : "_self"}
                >
                  {name}
                </Link>
              ))}
            </nav>
            <span className="text-zinc-500 hidden md:flex">|</span>
            <button
              onClick={() => setTheme(isDarkMode ? "light" : "dark")}
              onMouseDown={clickSound}
              className="p-2 rounded-lg hidden md:inline-flex"
              aria-label="Cambiar tema"
              title="Cambiar tema"
            >
              {isDarkMode ? (
                <span className="btn-animation">
                  <Sun className="h-6 w-6 text-zinc-500 svg-animation" />
                </span>
              ) : (
                <span className="btn-animation">
                  <MoonStar className="h-6 w-6 text-zinc-500 svg-animation" />
                </span>
              )}
            </button>
          </aside>
          <button
            onClick={openMenu}
            className="p-2 rounded-lg md:hidden hover:bg-[var(--hover-color)] transition-colors duration-200"
            aria-label="Abrir menu"
          >
            <AlignCenter className="h-6 w-6 text-zinc-500" />
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div
          className="fixed top-0 left-0 inset-0 bg-opacity-50 backdrop-blur-[4px] z-9999"
          ref={menuWrapperRef}
        >
          <div
            className={`fixed top-0 h-dvh w-full bg-[var(--background)] shadow-xl transform transition-transform duration-500 ease-in-out`}
          >
            {/* Header del menú */}
            <div className="flex justify-between items-center p-6 border-b border-[var(--color-border)] text-[var(--foreground)]">
              {isDarkMode ? (
                <Link href="/">
                  <Image
                    src="/assets/solid-dark-mode.png"
                    width={90}
                    height={55}
                    alt="SolidSnk86"
                    loading="eager"
                    className="rotate-3 translate-y-1"
                  />
                </Link>
              ) : (
                <Link href="/">
                  <Image
                    src="/assets/solid-light-mode.png"
                    width={90}
                    height={55}
                    alt="SolidSnk86"
                    loading="eager"
                    className="rotate-3 translate-y-1"
                  />
                </Link>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTheme(isDarkMode ? "light" : "dark")}
                  onMouseDown={clickSound}
                  className="p-2 rounded-lg hover:bg-[var(--hover-color)] transition-colors duration-200"
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? <Sun size={20} /> : <MoonStar size={20} />}
                </button>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-lg hover:bg-[var(--hover-color)] transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Links del menú */}
            <nav className="flex flex-col p-6">
              {links.map(({ name, url, icon: Icon, fx }) => (
                <Link
                  key={name}
                  href={url}
                  onClick={async () => {
                    if (name.toLowerCase() === "cv" && fx) {
                      await fx();
                    }
                    closeMenu();
                  }}
                  target={name.toLowerCase() === "cv" ? "_blank" : "_self"}
                  className="flex gap-4 items-center tracking-widest font-semibold text-lg transition-colors duration-200 capitalize py-4"
                >
                  <Icon size={19} />
                  {name}
                </Link>
              ))}
            </nav>
            <div className="absolute bottom-0 left-0 right-0">
              <article className="w-full flex mx-auto justify-center border-t-1 border-[var(--border-color)] px-2">
                <SocialLinks className="flex" />
              </article>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
