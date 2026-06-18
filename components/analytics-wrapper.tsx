"use client";

import { useEffect } from "react";
import { useClick } from "@/context/click-context";

export const AnalyticsWrapper = () => {
  const { flushAnalyticsData } = useClick();

  useEffect(() => {
    const handleBeforeUnload = async () => {
      await flushAnalyticsData();
    };

    window.addEventListener("pagehide", handleBeforeUnload);

    return () => {
      window.removeEventListener("pagehide", handleBeforeUnload);
    };
  }, [flushAnalyticsData]);

  return null;
};
