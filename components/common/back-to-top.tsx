"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export const BackToTop = () => {
  const [scrolled, setScrolled] = useState(false);

  const backToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const detectScroll = () => {
      if (window.scrollY > 400) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", detectScroll);

    return () => window.removeEventListener("scroll", detectScroll);
  }, []);

  return (
    <>
      <div
        onClick={backToTop}
        className={`fixed bottom-2 left-5 p-2 border border-border-color bg-stripes backdrop-blur-[2px] hover:scale-105 z-40
            ${scrolled ? " translate-x-0" : "-translate-x-20"} transition-transform`}
      >
        <ArrowUp className="text-muted-foreground" />
      </div>
    </>
  );
};
