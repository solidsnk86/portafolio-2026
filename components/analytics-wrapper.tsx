"use client";

import { useEffect } from "react";
import { useEvent } from "@/context/event-context";

export const AnalyticsWrapper = () => {
  const { flushAnalyticsData } = useEvent();

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
