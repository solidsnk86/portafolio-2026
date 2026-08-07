"use client";

import { useEffect, useState } from "react";

export const useObserverFooter = () => {
  const [isOnSection, setIsOnSection] = useState<boolean>(false);

  useEffect(() => {
    const elFooter = document.documentElement.querySelector("footer");
    if (!elFooter) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio <= 0) {
        setIsOnSection(false);
      } else {
        setIsOnSection(true);
      };
    });

    observer.observe(elFooter);

    return () => {
      observer.disconnect();
    };
  }, []);

  return isOnSection;
};
