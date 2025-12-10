import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CDT vs. inversión inmobiliaria | LOKL",
  description:
    "Compara la seguridad de un CDT con el potencial de crecimiento que obtienes al invertir en bienes raíces con LOKL. Entiende cómo proteger y hacer crecer tu dinero.",
  keywords: [
    "CDT vs inversión inmobiliaria",
    "comparación CDT",
    "inversión inmobiliaria",
    "bienes raíces",
    "LOKL",
    "rentabilidad",
    "diversificación",
    "inversión inteligente",
  ],
  alternates: {
    canonical: "https://lokl.life/cdt-vs-real-estate-investing",
  },
  openGraph: {
    title: "CDT vs. inversión inmobiliaria | LOKL",
    description:
      "Compara la seguridad de un CDT con el potencial de crecimiento que obtienes al invertir en bienes raíces con LOKL. Entiende cómo proteger y hacer crecer tu dinero.",
    url: "https://lokl.life/cdt-vs-real-estate-investing",
    siteName: "LOKL Life",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CDT vs. inversión inmobiliaria | LOKL",
    description:
      "Compara la seguridad de un CDT con el potencial de crecimiento que obtienes al invertir en bienes raíces con LOKL.",
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

export default function CDTvsRealEstateInvestingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

