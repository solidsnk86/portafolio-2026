"use client";

import { closeDialog, showDialog } from "@/components/common/dialog";
import MarkdownRenderer from "@/components/markdown-renderer";
import { formatText } from "@/components/projects";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Navigation, Pagination, Zoom } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import {
  eCommerceGallery,
  daevaGallery,
  bcallDanteGallery,
} from "@/utils/constants";
import { LoaderBar } from "@/components/common/loader-bar";

interface ProjectResponse {
  data: {
    name: string;
    description: string | null;
    created_at: string;
    html_url?: string;
    homepage?: string | null;
  };
  decoded: string;
}

const formatDate = (dateTime: string) =>
  new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateTime));

type GalleryArrowProps = {
  id: string;
  direction: "prev" | "next";
  label: string;
};

const GalleryArrow = ({ id, direction, label }: GalleryArrowProps) => {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;

  return (
    <button
      id={id}
      type="button"
      data-direction={direction}
      aria-label={label}
      className="gallery-arrow"
    >
      <Icon size={20} strokeWidth={2} />
    </button>
  );
};

const DialogGallery = ({
  initialIndex,
  gallery,
}: {
  initialIndex: number;
  gallery: { id: number; url: string }[];
}) => (
  <div className="fixed inset-0 z-50 bg-black">
    <div className="fixed top-0 right-0 z-999 p-2">
      <X className="text-accent" onClick={closeDialog} />
    </div>
    <GalleryArrow id="dialog-gallery-prev" direction="prev" label="Anterior" />
    <GalleryArrow id="dialog-gallery-next" direction="next" label="Siguiente" />
    <Swiper
      initialSlide={initialIndex}
      slidesPerView={1}
      spaceBetween={0}
      zoom={{ maxRatio: 3 }}
      pagination={{ clickable: true }}
      navigation={{
        prevEl: "#dialog-gallery-prev",
        nextEl: "#dialog-gallery-next",
      }}
      modules={[Pagination, Zoom, Navigation]}
      className="h-full w-full dialog-gallery"
    >
      {gallery.map(({ id, url }) => (
        <SwiperSlide
          key={`dialog-slide-${id}`}
          className="flex items-center justify-center bg-black"
        >
          <div className="swiper-zoom-container relative h-full w-full">
            <Image
              src={url}
              alt={`Foto-${id}`}
              fill
              sizes="100vw"
              className="object-contain cursor-zoom-in"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

const AppGallery = ({
  openGalleryDialog,
  gallery,
}: {
  openGalleryDialog: (
    initialIndex: number,
    gallery: { id: number; url: string }[],
  ) => void;
  gallery: { id: number; url: string }[];
}) => (
  <div className="relative mt-10 w-full">
    <h2 className="mx-auto max-w-3xl text-2xl mb-6 border-b py-3 border-border-color font-semibold">
      Algunas capturas de la aplicación:
    </h2>
    <div className="gallery-slider relative">
      <GalleryArrow id="gallery-prev" direction="prev" label="Anterior" />
      <GalleryArrow id="gallery-next" direction="next" label="Siguiente" />
      <Swiper
        pagination={{ clickable: true }}
        navigation={{
          prevEl: "#gallery-prev",
          nextEl: "#gallery-next",
        }}
        modules={[Pagination, Navigation]}
        slidesPerView={1}
        spaceBetween={12}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 12 },
          1024: { slidesPerView: 2, spaceBetween: 16 },
        }}
        className="project-gallery !overflow-visible"
      >
        {gallery.map((pic, index) => (
          <SwiperSlide key={`app-slide-${pic.id}`} className="relative">
            <div
              onClick={() => openGalleryDialog(index, gallery)}
              className="group relative aspect-[1360/605] w-full overflow-hidden rounded-md border border-border-color bg-secondary hover:cursor-zoom-in"
            >
              <Image
                src={pic.url}
                alt={`Foto-${pic.id}`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="pointer-events-none absolute right-2 bottom-2 flex h-8 w-8 items-center justify-center rounded-full border border-border-color bg-background/80 text-muted-foreground opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <Maximize2 size={15} />
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>
);

export function ProjectClient({ name }: { name: string }) {
  const [project, setProject] = useState<ProjectResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const openGalleryDialog = (
    initialIndex: number,
    gallery: { id: number; url: string }[],
  ) => {
    showDialog({
      width: "100%",
      className: "bg-transparent p-0 m-0 max-w-none rounded-none shadow-none",
      content: <DialogGallery initialIndex={initialIndex} gallery={gallery} />,
    });
  };

  useEffect(() => {
    let active = true;

    const loadProject = async () => {
      try {
        const response = await fetch(
          `/api/repo?name=${encodeURIComponent(name)}`,
        );
        const data = (await response.json()) as ProjectResponse & {
          message?: string;
        };

        if (!response.ok) {
          throw new Error(data.message ?? "No se pudo cargar el proyecto");
        }

        if (active) {
          setProject(data);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Error desconocido");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    const getProjectRelease = async () => {
      setIsLoading(true);
      try {
        await fetch("https://neo-wifi.com/api/releases")
          .then((res) => res.json())
          .then((releases) => {
            if (!active) return;
            setProject({
              data: {
                name: releases.release.appName,
                created_at: releases.release.createdAt,
                description: "Automatización dispositivos TP-LINK",
              },
              decoded: releases.release.appInfo,
            });
            setIsLoading(false);
          })
          .catch((err) => {
            throw new Error(err);
          });
      } catch (error) {
        if (active) {
          setIsLoading(false);
        }
        showDialog({ content: <div>{(error as TypeError).message}</div> });
      }
    };

    interface LocalProjectMeta {
      name: string;
      description: string;
      created_at: string;
    }

    const localProjects: Record<string, LocalProjectMeta> = {
      "better-call-dante": {
        name: "Better Call Dante",
        description:
          "Ecosistema digital para un estudio de abogados que integra correo, calendario, planillas y documentos en un solo panel, con asistente IA.",
        created_at: "2026-09-04T00:00:00Z",
      },
      "inmobiliaria-daeva": {
        name: "Inmobiliaria Daeva",
        description:
          "SPA inmobiliaria: propiedades en venta/alquiler, reservas con seña vía MercadoPago, panel de agente y panel de administración.",
        created_at: "2026-09-06T00:00:00Z",
      },
    };

    const loadLocalProject = async (meta: LocalProjectMeta) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/read-project?name=${encodeURIComponent(name)}`,
        );
        const data = (await response.json()) as {
          decoded?: string;
          message?: string;
        };
        if (!response.ok) {
          throw new Error(data.message ?? "No se pudo cargar el proyecto");
        }
        if (active) {
          setProject({
            data: {
              name: meta.name,
              description: meta.description,
              created_at: meta.created_at,
            },
            decoded: data.decoded ?? "",
          });
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Error desconocido");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    const localProject = localProjects[name];

    if (localProject) {
      loadLocalProject(localProject);
    } else if (name === "neo-wifi-desktop") {
      getProjectRelease();
    } else {
      loadProject();
    }

    return () => {
      active = false;
    };
  }, [name]);

  return (
    <section className="px-4 py-8 md:px-6 lg:px-8 overflow-x-hidden md:mask-l-from-90% md:mask-r-from-90%">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <Link
          href="/all-projects"
          className="group flex items-center gap-2 self-start text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft
            size={16}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          <span>Volver a proyectos</span>
        </Link>
        {isLoading ? (
          <div className="grid h-dvh items-center justify-center">
            <LoaderBar />
          </div>
        ) : error ? (
          <div className="h-dvh">
            <small className="rounded border border-red-300/50 bg-red-500/80 px-2 py-0.5 text-white">
              {error}
            </small>
          </div>
        ) : (
          <article className="space-y-6 text-foreground">
            <header className="space-y-3 border-b border-border-color pb-4">
              <p className="text-base font-medium text-muted-foreground">
                {formatDate(
                  project?.data.created_at ?? new Date().toISOString(),
                )}
              </p>
              <h1 className="text-3xl font-semibold md:text-4xl capitalize">
                {formatText(project?.data.name as string)}
              </h1>
              <p className="text-base text-muted-foreground">
                {project?.data.description ?? "Sin descripción disponible."}
              </p>
            </header>

            {name === "link-data" && (
              <div className="flex justify-center">
                <Image
                  src={"/assets/link-data-hero.png"}
                  width={800}
                  height={800}
                  alt={"Link data hero"}
                />
              </div>
            )}

            <MarkdownRenderer content={project?.decoded ?? ""} />
          </article>
        )}
      </div>

      {!isLoading && !error && (
        <>
          {name === "frontend-e-retro-leyends" && (
            <AppGallery
              openGalleryDialog={openGalleryDialog}
              gallery={eCommerceGallery}
            />
          )}

          {name === "inmobiliaria-daeva" && (
            <AppGallery
              openGalleryDialog={openGalleryDialog}
              gallery={daevaGallery}
            />
          )}

          {name === "better-call-dante" && (
            <AppGallery
              openGalleryDialog={openGalleryDialog}
              gallery={bcallDanteGallery}
            />
          )}
        </>
      )}
    </section>
  );
}
