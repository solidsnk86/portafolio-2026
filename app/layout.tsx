import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import { ContentProvider } from "@/context/content-context";
import "./globals.css";
import ThemeProviderClient from "@/components/theme-provider-client";
import { LocationProvider } from "@/context/location-context";
import { BackToTop } from "@/components/common/back-to-top";

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
    default: "Gabriel Calcagni — Desarrollador Full-Stack",
    template: "%s | Portafolio",
  },
  description:
    "Desarrollador full‑stack con 4 años de experiencia. Me enfoco en resolver problemas reales aplicando buenas prácticas y entregando soluciones de impacto: no sólo conocimientos, sino resultados que transmiten valor.",
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
      "Desarrollador full‑stack con 4 años de experiencia. Me enfoco en resolver problemas reales aplicando buenas prácticas y entregando soluciones de impacto.",
    type: "website",
    locale: "es-ES",
    siteName: "Portafolio",
    url: "/open-graph-solidsnk.png",
    images: [
      {
        url: "favicon.png",
        width: 1200,
        height: 630,
        alt: "Portafolio",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
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
        <LocationProvider>
          <ContentProvider>
            <ThemeProviderClient>{children}</ThemeProviderClient>
          </ContentProvider>
        </LocationProvider>
        <BackToTop />
      </body>
    </html>
  );
}
