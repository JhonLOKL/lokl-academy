import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendario de Adviento LOKL | Recompensas Exclusivas",
  description:
    "Cada día desbloquea una recompensa exclusiva diseñada para impulsar tu crecimiento profesional. Del 13 al 24 de diciembre, descubre ventajas únicas que te acercan a tus objetivos.",
  keywords: [
    "calendario de adviento",
    "recompensas exclusivas",
    "LOKL",
    "crecimiento profesional",
    "inversión inmobiliaria",
    "educación financiera",
  ],
  alternates: {
    canonical: "https://lokl.life/advent-calendar",
  },
  openGraph: {
    title: "Calendario de Adviento LOKL | Recompensas Exclusivas",
    description:
      "Cada día desbloquea una recompensa exclusiva diseñada para impulsar tu crecimiento profesional. Del 13 al 24 de diciembre, descubre ventajas únicas que te acercan a tus objetivos.",
    url: "https://lokl.life/advent-calendar",
    siteName: "LOKL Life",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "https://lokl-assets.s3.us-east-1.amazonaws.com/home/advent+calendar/HeroMovil.png",
        width: 1200,
        height: 630,
        alt: "Calendario de Adviento LOKL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calendario de Adviento LOKL | Recompensas Exclusivas",
    description:
      "Cada día desbloquea una recompensa exclusiva diseñada para impulsar tu crecimiento profesional.",
    images: [
      "https://lokl-assets.s3.us-east-1.amazonaws.com/home/advent+calendar/HeroMovil.png",
    ],
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

export default function AdventCalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

