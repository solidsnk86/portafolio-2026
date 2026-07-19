"use client";

import { useEffect, useState } from "react";

function diffHoras(tzA: string, tzB: string, fecha = new Date()) {
  const enA = new Date(
    fecha.toLocaleString("en-US", { timeZone: tzA }),
  ).getTime();
  const enB = new Date(
    fecha.toLocaleString("en-US", { timeZone: tzB }),
  ).getTime();
  return (enA - enB) / (1000 * 60 * 60);
}

export function useDiffLabel() {
  const [label, setLabel] = useState("");

  useEffect(() => {
    const visitorTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const diff = diffHoras(visitorTZ, "America/Argentina/Buenos_Aires");

    if (diff === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLabel("");
      return;
    }
    const signo = diff > 0 ? "+" : "";
    setLabel(` / diferencia ${signo}${diff} hs.`);
  }, []);

  return label;
}
