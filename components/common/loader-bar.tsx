"use client";

import { useEffect } from "react";

export const LoaderBar = () => {
  useEffect(() => {
    const containerBar = document.getElementById("container-bar");
    const loadBar = document.getElementById("bar-load");

    let counter = 0;
    const interval = setInterval(() => {
      if (containerBar && loadBar) {
        loadBar.style.width = `${counter}%`;

        counter += 35;
      }
      if (counter > 300) {
        clearInterval(interval);
      }
    }, 255);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col gap-1">
      <div className="container-bar" id="container-bar">
        <div className="bar-load" id="bar-load"></div>
      </div>
      <small className="text-center text-xs">Cargando...</small>
    </section>
  );
};
