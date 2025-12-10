import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inversión inteligente para freelancers | LOKL",
  description:
    "Descubre cómo los freelancers pueden convertir sus ingresos variables en patrimonio estable con proyectos inmobiliarios respaldados por LOKL.",
  keywords: [
    "inversión para freelancers",
    "freelancers",
    "ingresos variables",
    "patrimonio",
    "inversión inmobiliaria",
    "LOKL",
    "bienes raíces",
    "finanzas personales",
  ],
  alternates: {
    canonical: "https://lokl.life/investment-for-freelancers",
  },
  openGraph: {
    title: "Inversión inteligente para freelancers | LOKL",
    description:
      "Descubre cómo los freelancers pueden convertir sus ingresos variables en patrimonio estable con proyectos inmobiliarios respaldados por LOKL.",
    url: "https://lokl.life/investment-for-freelancers",
    siteName: "LOKL Life",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inversión inteligente para freelancers | LOKL",
    description:
      "Descubre cómo los freelancers pueden convertir sus ingresos variables en patrimonio estable con proyectos inmobiliarios.",
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

export { default } from "./investment-for-freelancers.client";
