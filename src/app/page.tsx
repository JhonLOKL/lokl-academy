import React from "react";
import { Metadata } from "next";
import HomePageClient from "@/sections/home/home-page-client";
import { WebsiteSchema, OrganizationSchema } from "@/components/lokl-academy/components";

// Metadatos para SEO
export const metadata: Metadata = {
  title: "LOKL - Inversiones inmobiliarias con propósito",
  description: "Invierte en bienes raíces y proyectos hoteleros de forma simple y transparente. Crowdfunding inmobiliario, comunidad y herramientas para invertir mejor.",
  keywords: ["inversiones inmobiliarias", "crowdfunding inmobiliario", "bienes raíces", "hotelería", "inversión colectiva", "LOKL"],
  alternates: {
    canonical: "https://lokl.life",
  },
  authors: [{ name: "LOKL" }],
  openGraph: {
    title: "LOKL - Inversiones inmobiliarias con propósito",
    description: "Invierte en bienes raíces y proyectos hoteleros con LOKL. Diversifica tu portafolio con transparencia y comunidad.",
    url: "https://lokl.life",
    siteName: "LOKL",
    locale: "es",
    type: "website",
    images: [
      {
        url: "/images/modern-building.jpg",
        width: 1200,
        height: 630,
        alt: "LOKL - Inversiones inmobiliarias con propósito",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LOKL - Inversiones inmobiliarias con propósito",
    description: "Invierte en bienes raíces y proyectos hoteleros con LOKL.",
    images: ["/images/modern-building.jpg"],
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

export default function Page() {
  return (
    <>
      <WebsiteSchema />
      <OrganizationSchema 
        socialLinks={[
          "https://www.facebook.com/lokllife",
          "https://www.instagram.com/lokl.life/",
          "https://www.linkedin.com/company/lokl-life/"
        ]}
      />
      <HomePageClient />
    </>
  );
}