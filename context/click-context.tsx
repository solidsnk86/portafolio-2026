"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
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

interface MouseClickProps {
  count: number;
  element: Element | undefined;
  sendAnalyticsData: (payload: Payload) => Promise<void>;
  flushAnalyticsData: () => Promise<void>;
}

const CLickContext = createContext<MouseClickProps | undefined>(undefined);

export const ClickContextProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState<number>(0);
  const [element, setElement] = useState<Element | undefined>(undefined);
  const clicksRef = useRef<ClickRecord[]>([]);
  const timeRef = useRef<number>(0);
  const timerWorkerRef = useRef<Worker | null>(null);

  const {
    data: { lastAccess },
  } = useLocation();

  const sendAnalyticsData = async (payload: Payload) => {
    try {
      await fetch("/api/collection/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Error sending analytics:", err);
    }
  };

  const flushAnalyticsData = async () => {
    const payload = JSON.parse(
      sessionStorage.getItem("solidsnk-analitycs") || "{}"
    );
    if (payload && Object.keys(payload).length > 0) {
      await sendAnalyticsData(payload);
      sessionStorage.removeItem("solidsnk-analitycs");
    }
  };

  useEffect(() => {
    const detectClick = (e: PointerEvent) => {
      if (e.target) {
        const newCount = count + 1;
        setCount(newCount);
        setElement(e.target as Element);

        clicksRef.current.push({
          clickCount: newCount,
          content: (e.target as Element).textContent || "",
        });
      }
    };

    window.addEventListener("click", detectClick);
    return () => {
      window.removeEventListener("click", detectClick);
    };
  }, [count]);

  useEffect(() => {
    const createAndStartWorker = () => {
      const timerWorker = new Worker(
        new URL("../worker/time-worker.ts", import.meta.url)
      );

      timerWorker.postMessage(1000);
      timerWorker.onmessage = (e) => {
        const timer = e.data;
        timeRef.current = timer;
      };

      timerWorkerRef.current = timerWorker;
    };

    createAndStartWorker();

    const handleBlur = () => {
      if (timerWorkerRef.current) {
        timerWorkerRef.current.terminate();
      }

      sessionStorage.setItem(
        "solidsnk-analitycs",
        JSON.stringify({
          event_clicked: clicksRef.current,
          click_count: clicksRef.current.length,
          elapsed_time: timeRef.current,
          user_id: lastAccess?.id || "",
        })
      );
    };

    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("blur", handleBlur);
      if (timerWorkerRef.current) {
        timerWorkerRef.current.terminate();
      }
    };
  }, [lastAccess]);

  useEffect(() => {
    flushAnalyticsData();
  }, []);

  const values: MouseClickProps = {
    count,
    element,
    sendAnalyticsData,
    flushAnalyticsData,
  };

  return <CLickContext value={values}>{children}</CLickContext>;
};

export const useClick = () => {
  const ctx = useContext(CLickContext);
  if (!ctx) throw new Error("Must execute inside the provider");
  return ctx;
};
