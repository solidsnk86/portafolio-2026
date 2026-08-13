"use client";

import { useState, useEffect } from "react";

export const useMouse = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const detectMouse = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", detectMouse);

    return () => {
      window.removeEventListener("mousemove", detectMouse);
    };
  }, []);

  return position;
};
