"use client";

import { useLocation } from "@/context/location-context";
import { FileChartLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const spanishLangs = [
  "AR",
  "CO",
  "ES",
  "VE",
  "PE",
  "CU",
  "CR",
  "CL",
  "PA",
  "NI",
  "UY",
  "PR",
  "EC",
  "DO",
  "SV",
  "GT",
];

export function Hero() {
  const { data: location, isLoading } = useLocation();
  // const asideRef = useRef<HTMLDivElement>(null);
  // const [size, setSize] = useState<{
  //   width: number;
  //   height: number;
  // }>({ width: 0, height: 0 });

  const dataCollect = async () => {
    if (!isLoading) {
      await fetch("/api/collection/cv-views", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: `Visto desde ${location.city.name}, ${location.country.name}.`,
        }),
      });
    }
  };

  const detectCountry = () => {
    const englishFile =
      "https://docs.google.com/document/d/1kocRsRUNb7osGJco5NZXoIGt3lRcqt6TiBLJ1TGxVRA/edit?usp=sharing";
    const spanishFile =
      "https://docs.google.com/document/d/1npjJQOyls-A1fhNPE6j58W1xNdDH8BvzG3sX8OkjZbw/edit?usp=sharing";
    if (!spanishLangs.includes(location.country.alpha)) {
      return englishFile;
    }
    return spanishFile;
  };

  // useEffect(() => {
  //   const el = asideRef.current;
  //   if (!el) return;
  //   const update = () => {
  //     setSize({ width: el.clientWidth, height: el.clientHeight });
  //   };
  //   update();
  //   const observer = new ResizeObserver(update);
  //   observer.observe(el);
  //   return () => observer.disconnect();
  // }, []);

  // const cols = size.width ? Math.max(1, Math.floor(size.width / 72)) : 0;
  // const rows = size.height ? Math.max(1, Math.floor(size.height / 72)) : 0;
  // const count = cols * rows;

  return (
    <section className="mx-auto max-w-6xl md:min-h-[90dvh] h-svh border-b border-border-color border-x relative">
      <div className="grid h-full items-stretch md:grid-cols-2">
        <div className="p-6 md:flex md:items-center md:h-full md:p-10 lg:p-12">
          <div className="mt-22 xl:mt-0">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Hola,
            </p>
            <h1
              id="whoami"
              className="text-5xl font-semibold leading-tight text-foreground md:text-6xl"
            >
              Soy Gabriel
            </h1>
            <p className="max-w-xl text-base text-muted-foreground md:text-lg my-4">
              Desarrollador Full Stack especializado en aplicaciones web, APIs y
              herramientas de automatización que ahorran tiempo.
            </p>
            <section className="flex items-center gap-2">
              <div className="flex gap-1.5 items-center border border-border-color rounded-2xl px-2 py-1 w-fit bg-secondary">
                <div className="w-2 h-2 rounded-full bg-green-400 border border-green-500" />
                <small>Disponible en remoto</small>
              </div>
              <Link
                title="Ver CV"
                aria-label="Ver CV"
                onClick={async () => await dataCollect()}
                href={detectCountry()}
                target="_blank"
                className="flex gap-1.5 items-center border border-border-color rounded-2xl px-2 py-1 w-fit bg-secondary hover:cursor-pointer hover:opacity-80"
              >
                <FileChartLine className="text-muted-foreground" size={16} />
                <small>Mi CV</small>
              </Link>
            </section>
          </div>
        </div>

        <div
          className="absolute inset-0 h-full min-h-80 w-full md:min-h-[90dvh] -z-10"
        >
          {/* <div
            className="grid gap-px overflow-hidden"
            style={{
              width: size.width ? `${size.width}px` : undefined,
              height: size.height ? `${size.height}px` : undefined,
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: count }).map((_, i) => (
              <span
                key={i + 1}
                className={`w-full h-full -z-10 blur-sm mask-l-from-45% grayscale-50 border border-border-color`}
                style={{
                  background: `hsl(${280 + (i / 18) * 120}, 100%, 55%)`,
                }}
              ></span>
            ))}
          </div> */}
          <Image
            src={"/nordic_30.png"}
            fill
            alt="Gabriel - Desarrollador Full Stack"
            className={`object-cover md:mask-l-from-1% -z-10 opacity-85 mask-t-from-1% md:mask-t-from-0`}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
