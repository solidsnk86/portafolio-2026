import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import { ContentProvider } from "@/context/content-context";
import "./globals.css";
import ThemeProviderClient from "@/components/theme-provider-client";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "SolidSnk86 — Desarrollador Full-Stack",
    template: "%s | Portafolio",
  },
  description:
    "Desarrollador full‑stack con más de 3 años de experiencia. Me enfoco en resolver problemas reales aplicando buenas prácticas y entregando soluciones de impacto: no sólo conocimientos, sino resultados que transmiten valor.",
  keywords: [
    "desarrollador full-stack",
    "desarrollador web",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
  ],
  openGraph: {
    title: "Portafolio — Desarrollador Full-Stack",
    description:
      "Desarrollador full‑stack con más de 3 años de experiencia. Me enfoco en resolver problemas reales aplicando buenas prácticas y entregando soluciones de impacto.",
    type: "website",
    locale: "es-ES",
    siteName: "Portafolio",
    // Use NEXT_PUBLIC_SITE_URL env var if available, otherwise placeholder
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Portafolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portafolio — Desarrollador Full-Stack",
    description:
      "Desarrollador full‑stack con más de 3 años de experiencia. Me enfoco en resolver problemas reales aplicando buenas prácticas y entregando soluciones de impacto.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    "googleBot": {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ContentProvider>
          <ThemeProviderClient>{children}</ThemeProviderClient>
        </ContentProvider>
      </body>
    </html>
  );
}
