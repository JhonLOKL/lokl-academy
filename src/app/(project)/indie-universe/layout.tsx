import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Indie Universe | LOKL",
  description:
    "Explora Indie Universe, el proyecto de inversión inmobiliaria de LOKL con beneficios y oportunidades exclusivas para inversionistas.",
  keywords: [
    "Indie Universe",
    "inversión inmobiliaria",
    "LOKL",
    "bienes raíces",
    "proyecto inmobiliario",
    "crowdfunding inmobiliario",
    "inversión en Colombia",
    "oportunidades de inversión",
  ],
  alternates: {
    canonical: "https://lokl.life/indie-universe",
  },
  openGraph: {
    title: "Indie Universe | LOKL",
    description:
      "Explora Indie Universe, el proyecto de inversión inmobiliaria de LOKL con beneficios y oportunidades exclusivas para inversionistas.",
    url: "https://lokl.life/indie-universe",
    siteName: "LOKL Life",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Indie Universe | LOKL",
    description:
      "Explora Indie Universe, el proyecto de inversión inmobiliaria de LOKL con beneficios, cronograma y oportunidades exclusivas para inversionistas.",
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

export default function IndieUniverseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

