"use client";

import { useContentData } from "@/context/content-context";
import { ChevronsLeftRightEllipsis, Download, Users } from "lucide-react";

export const Metrics = () => {
  const { metrics } = useContentData();

const appMetrics = [
  {
    name: "Geolocation API",
    info: "consultas",
    count: metrics.geoRequests,
    icon: ChevronsLeftRightEllipsis,
    description: "Consultas geoespaciales procesadas en tiempo real por la API.",
  },
  {
    name: "Neo WiFi Web",
    info: "coberturas",
    count: metrics.neoWifiUsers,
    icon: Users,
    description: "Cálculos de cobertura ejecutados desde la aplicación web.",
  },
  {
    name: "Neo WiFi Desktop",
    info: "descargas",
    count: metrics.downloadCount,
    icon: Download,
    description: "Instalaciones de la aplicación de escritorio realizadas.",
  },
  {
    name: "Neo WiFi APK",
    info: "descargas",
    count: metrics.apkDownloadsCount,
    icon: Download,
    description: "Instalaciones de la aplicación Android realizadas.",
  },
];

  return (
    <section className="mx-auto max-w-6xl pt-8 border-b border-border-color">
      <div className="space-y-3 mb-12 px-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Impacto en números
        </p>
        <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
          Métricas de las aplicaciones
        </h2>
        <p className="max-w-2xl text-base text-muted-foreground">
          Más allá del código, el valor de un proyecto se mide por su adopción.
          Aquí tienes un vistazo al alcance y la confianza depositada en mis
          herramientas digitales.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {appMetrics.map(({ name, count, info, icon: Icon, description }, i) => (
          <div
            key={`${name}-${i + 1}`}
            className="border-t md:border-r last:border-r-0 last:border-l-0 border-border-color p-4 flex flex-col gap-1 justify-center text-center"
          >
            <p className="text-2xl">{name}</p>
            <span className="text-3xl font-bold">{count}</span>
            <div className="flex justify-center mx-auto gap-1.5 items-center border border-border-color rounded-2xl px-2 py-1 w-fit bg-secondary">
              <small className="capitalize flex items-center gap-1">
                <Icon size={14} />
                {info}
              </small>
            </div>
            <div className="">
              {description && <small>{description}</small>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
