"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Banner = () => {
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const timerWorkerRef = useRef<Worker>(null);

  useEffect(() => {
    timerWorkerRef.current = new Worker(
      new URL("../../../worker/time-worker.ts", import.meta.url),
    );

    timerWorkerRef.current.postMessage(1000);
    timerWorkerRef.current.onmessage = (e) => {
      const timer = e.data;

      if (timer === 10) {
        setShowBanner(true);
        if (bannerRef.current) {
          bannerRef.current.style.background = "#05df72";
        }
      }
      if (timer === 20) {
        if (bannerRef.current) {
          bannerRef.current.style.background = "#fff";
        }
      }
      if (timer === 30) {
        if (bannerRef.current) {
          bannerRef.current.style.background = "oklch(67.3% 0.182 276.935)";
        }
      }
      if (timer === 40) {
        if (bannerRef.current) {
          bannerRef.current.style.background = "oklch(75% 0.183 55.934)";
        }
      }
      if (timer === 50) {
        if (bannerRef.current) {
          bannerRef.current.style.background = "oklch(70.2% 0.183 293.541)";
        }
      }
      if (timer === 60) {
        if (bannerRef.current) {
          bannerRef.current.style.background = "oklch(71.8% 0.202 349.761)";
        }
      }
      if (timer > 60) timerWorkerRef.current?.terminate();
    };

    return () => {
      if (timerWorkerRef.current) {
        timerWorkerRef.current.terminate();
      }
    };
  }, []);

  const closeBanner = () => {
    if (timerWorkerRef.current && bannerRef.current) {
        timerWorkerRef.current.terminate();
        bannerRef.current.remove();
    }
  }

  return (
    <>
      {showBanner && (
        <div ref={bannerRef} className="fixed inset-0 w-full h-6 bg-pink-400">
          <div className="flex justify-center">
            <small className="text-center text-black">
              Arreglo aplicaciones vibecodeadas sin sentido
            </small>
          </div>
          <X onClick={closeBanner} size={14} className="text-black fixed right-2 top-1.25" />
        </div>
      )}
    </>
  );
};
