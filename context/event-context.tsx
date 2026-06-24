"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from "react";
import { useLocation } from "./location-context";

interface ClickRecord {
  clickCount: number;
  content: string;
}

interface Payload {
  event_clicked: string;
  click_count: number;
  elapsed_time: number;
  user_id: string;
}

interface EventsProps {
  count: number;
  element: Element | undefined;
  sendAnalyticsData: (payload: Payload) => Promise<void>;
  flushAnalyticsData: () => Promise<void>;
}

const ClickContext = createContext<EventsProps | undefined>(undefined);

export const EventContextProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState<number>(0);
  const [element, setElement] = useState<Element | undefined>(undefined);
  const clicksRef = useRef<ClickRecord[]>([]);
  const countRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const timerWorkerRef = useRef<Worker | null>(null);

  const {
    data: { lastAccess },
  } = useLocation();

  const sendAnalyticsData = useCallback(async (payload: Payload) => {
    try {
      const response = await fetch("/api/collection/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) return;

      await response.json();
    } catch {
      // Error silencioso
    }
  }, []);

  const flushAnalyticsData = useCallback(async () => {
    const stored = sessionStorage.getItem("solidsnk-analitycs");
    if (!stored) return;

    const payload = JSON.parse(stored);
    if (payload && Object.keys(payload).length > 0) {
      await sendAnalyticsData(payload);
      sessionStorage.removeItem("solidsnk-analitycs");
    }
  }, [sendAnalyticsData]);

  
  useEffect(() => {
    const detectClick = (e: PointerEvent) => {
      if (!e.target) return;

      countRef.current += 1;
      setCount(countRef.current);
      setElement(e.target as Element);

      clicksRef.current.push({
        clickCount: countRef.current,
        content: (e.target as Element).textContent || "",
      });
    };

    window.addEventListener("click", detectClick);
    return () => window.removeEventListener("click", detectClick);
  }, []);

  useEffect(() => {
    const timerWorker = new Worker(
      new URL("../worker/time-worker.ts", import.meta.url)
    );
    timerWorker.postMessage(1000);
    timerWorker.onmessage = (e) => {
      timeRef.current = e.data;
    };
    timerWorkerRef.current = timerWorker;

    const saveAnalyticsData = () => {
      const payload = {
        event_clicked: clicksRef.current,
        click_count: clicksRef.current.length,
        elapsed_time: timeRef.current,
        user_id: lastAccess!.id,
      };
      sessionStorage.setItem("solidsnk-analitycs", JSON.stringify(payload));
    };

    const handleBlur = () => {
      timerWorkerRef.current?.terminate();
      saveAnalyticsData();
      flushAnalyticsData();
    };

    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("blur", handleBlur);
      timerWorkerRef.current?.terminate();
    };
  }, [lastAccess, flushAnalyticsData]);

  useEffect(() => {
    flushAnalyticsData();
  }, [flushAnalyticsData]);

  const values = {
    count,
    element,
    sendAnalyticsData,
    flushAnalyticsData,
  };

  return <ClickContext value={values}>{children}</ClickContext>;
};

export const useEvent = () => {
  const ctx = useContext(ClickContext);
  if (!ctx) throw new Error("Must execute inside the provider");
  return ctx;
};