import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nido de Agua | LOKL",
  description:
    "Descubre Nido de Agua, el proyecto exclusivo de inversión inmobiliaria de LOKL. Conoce sus beneficios, cronograma, equipo y oportunidades.",
  keywords: [
    "Nido de Agua",
    "inversión inmobiliaria",
    "LOKL",
    "bienes raíces",
    "proyecto inmobiliario",
    "crowdfunding inmobiliario",
    "inversión en Colombia",
    "oportunidades de inversión",
  ],
  alternates: {
    canonical: "https://lokl.life/nido-de-agua",
  },
  openGraph: {
    title: "Nido de Agua | LOKL",
    description:
      "Descubre Nido de Agua, el proyecto exclusivo de inversión inmobiliaria de LOKL. Conoce sus beneficios, cronograma, equipo y oportunidades.",
    url: "https://lokl.life/nido-de-agua",
    siteName: "LOKL Life",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nido de Agua | LOKL",
    description:
      "Descubre Nido de Agua, el proyecto exclusivo de inversión inmobiliaria de LOKL. Conoce sus beneficios, cronograma, equipo y oportunidades.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function NidoDeAguaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

