"use client";

import { useContentData } from "@/context/content-context";

export const Metrics = () => {
  const { metrics } = useContentData()

  const appMetrics = [
    { name: "Geolocation API", info: "consultas", count: metrics.geoRequests },
    { name: "Neo WiFi Web", info: "usuarios", count: metrics.neoWifiUsers },
    { name: "Neo WiFi Desktop", info: "descargas", count: metrics.downloadCount },
    { name: "Neo WiFi APK", info: "descargas", count: 16 },
  ];

  return (
    <section className="mx-auto max-w-6xl pt-8 border-b border-border-color">
      <div className="space-y-3 mb-12 px-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Impacto en números
        </p>
        <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
          Soluciones con tracción real
        </h2>
        <p className="max-w-2xl text-base text-muted-foreground">
          Más allá del código, el valor de un proyecto se mide por su adopción.
          Aquí tienes un vistazo al alcance y la confianza depositada en mis herramientas digitales.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {appMetrics.map((app) => (
          <div
            key={app.count}
            className="border-t border-r last:border-r-0 last:border-l-0 border-border-color p-4 flex flex-col justify-center text-center"
          >
            <p className="text-2xl">{app.name}</p>
            <span className="text-3xl font-bold">{app.count}</span>
            <p className="text-sm capitalize">{app.info}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
