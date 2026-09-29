import { NextResponse } from "next/server";

const githubRawUrl =
  "https://raw.githubusercontent.com/solidsnk86/portafolio-2026/refs/heads/master/public";
const featuredProjects = [
  {
    name: "Better Call Dante",
    repo: "better-call-dante",
    description:
      "Ecosistema digital para un estudio de abogados que integra correo, calendario, planillas y documentos en un solo panel, con asistente IA.",
    created_at: "2026-09-04T00:00:00Z",
    platform: { name: "web" },
    url: "https://better-call-dante.vercel.app",
    images: [
      "/assets/better-call-dante/better-call-dante-mock.png",
      "/assets/better-call-dante/better-call-dante-login-cap.png",
      "/assets/better-call-dante/better-call-dante-main-dash-cap.png",
      "/assets/better-call-dante/better-call-dante-agent-cap-1.png",
      "/assets/better-call-dante/better-call-dante-agent-cap-2.png",
      "/assets/better-call-dante/better-call-dante-pallete-cap-1.png",
    ],
  },
  {
    name: "Inmobiliaria Daeva",
    repo: "inmobiliaria-daeva",
    description:
      "SPA inmobiliaria: propiedades en venta/alquiler, con comentarios y panel de agente/cliente. ",
    created_at: "2026-09-06T00:00:00Z",
    platform: { name: "web" },
    url: "https://daeva.vercel.app",
    images: [
      "/assets/daeva-inmobiliaria/daeva-mock.png",
      "/assets/daeva-inmobiliaria/daeva-main-section-cap.png",
      "/assets/daeva-inmobiliaria/daeva-prop-details-cap.png",
      "/assets/daeva-inmobiliaria/daeva-admin-dash-cap.png",
      "/assets/daeva-inmobiliaria/daeva-reservations-dash-cap.png",
      "/assets/daeva-inmobiliaria/daeva-profile-cap-1.png",
    ],
  },
  {
    name: "Pascale - Tienda Virtual",
    repo: "frontend-e-retro-leyends",
    description:
      "Pascale Closet es una Tienda E-Commerce full-stack (PERN) con pagos integrados con Mercado Pago y panel de administración y comprador.",
    created_at: "2025-11-12T15:38:54Z",
    platform: { name: "web" },
    url: "https://pascalecloset.com",
    images: [
      "/assets/e-commerce-gallery/pascale-mock.png",
      "/assets/e-commerce-gallery/screencapture-pascalecloset-seller-orders-2026-05-21-16_23_20.png",
      "/assets/e-commerce-gallery/screencapture-pascalecloset-seller-products-2026-05-21-16_25_15.png",
      "/assets/e-commerce-gallery/screencapture-pascalecloset-user-profile-2026-05-21-16_18_18.webp",
      "/assets/e-commerce-gallery/screencapture-pascalecloset-user-profile-2026-05-21-16_19_44.png",
      "/assets/e-commerce-gallery/screencapture-pascalecloset-user-profile-2026-05-21-16_20_50.png",
    ],
  },
  {
    name: "Neo-WiFi Web",
    repo: "neo-wifi",
    description: "Localización inteligente de antenas WiFi para cobertura.",
    created_at: "2025-01-28T03:18:53Z",
    platform: { name: "web" },
    url: "https://neo-wifi.com",
    images: [
      "/assets/neo-wifi-web/neo-wifi-web-mock.png",
      "/assets/neo-wifi-web/neo-wifi-hero-web-cap-1-sat.png",
      "/assets/neo-wifi-web/neo-wifi-hero-web-cap-3-app.png",
      "/assets/neo-wifi-web/neo-wifi-hero-web-cap-4-features.png",
      "/assets/neo-wifi-web/neo-wifi-hero-web-cap-5-desktop-info.png",
    ],
  },
  {
    name: "Geolocation API",
    repo: "geo_api",
    description: "API de geolocalización por IP o coordenadas en tiempo real.",
    created_at: "2024-02-07T15:38:54Z",
    platform: { name: "api" },
    url: "https://geo-api.solidsnk86.dev",
    images: [
      "/assets/geo-api/solid-geo-api-mock.png",
      "/assets/geo-api/solid-geo-api-cap-2.png",
    ],
  },
  {
    name: "Neo Wifi - v1.3.6",
    repo: "neo-wifi-desktop",
    description:
      "Aplicación para configurar automáticamente dispositivos TP-LINK.",
    created_at: "2025-07-08T15:38:54Z",
    platform: { name: "windows" },
    url: "https://neo-wifi.vercel.app",
    images: ["/assets/neo-wifi-desktop-app/neo-wifi-desktop-mock.png"],
  },
];

const projects = featuredProjects.map((featured) => {
  const images = featured.images;
  const formattedUrlImg = images.map((img) => (githubRawUrl+img));
  const formattedDate = () => {
    const date = new Date(featured.created_at).toLocaleDateString("es-AR", { year: "numeric", month: "long", day: "2-digit" });
    const splitedDate = date.split(" ");
    const month = splitedDate[2];
    const day = splitedDate[0];
    const year = splitedDate[4];
    return `${month.charAt(0).toUpperCase() + month.slice(1)} ${day}, ${year}`
  }

  return {
    name: featured.name,
    title: featured.description,
    createdAt: featured.created_at,
    date: formattedDate(),
    url: featured.url,
    images: formattedUrlImg,
  };
});

export async function GET() {
  try {
    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json({
      message: `Error: ${(error as TypeError).message}`,
    });
  }
}
