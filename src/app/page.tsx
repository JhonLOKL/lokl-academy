import React from "react";
import { Metadata } from "next";
import HomePageClient from "@/sections/home/home-page-client";
import { WebsiteSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/lokl-academy/components";

// Metadatos para SEO
export const metadata: Metadata = {
  title: "LOKL - Inversiones Inmobiliarias y Crowdfunding en Colombia",
  description: "Inversiones inmobiliarias accesibles desde $1.3M. Crowdfunding inmobiliario con proyectos hoteleros verificados en Colombia. Rentabilidad transparente, comunidad de inversionistas y herramientas para invertir mejor en bienes raíces.",
  keywords: ["inversiones inmobiliarias", "inversiones inmobiliarias colombia", "crowdfunding inmobiliario", "crowdfunding inmobiliario colombia", "bienes raíces", "hotelería", "inversión colectiva", "LOKL", "invertir en bienes raíces", "crowdfunding colombia"],
  alternates: {
    canonical: "https://lokl.life",
  },
  authors: [{ name: "LOKL" }],
  openGraph: {
    title: "LOKL - Inversiones Inmobiliarias y Crowdfunding en Colombia",
    description: "Inversiones inmobiliarias accesibles desde $1.3M. Crowdfunding inmobiliario con proyectos hoteleros verificados. Rentabilidad transparente y comunidad de inversionistas.",
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
    title: "LOKL - Inversiones Inmobiliarias y Crowdfunding en Colombia",
    description: "Inversiones inmobiliarias accesibles desde $1.3M. Crowdfunding inmobiliario con proyectos hoteleros verificados en Colombia.",
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
      <WebsiteSchema 
        name="LOKL"
        url="https://lokl.life"
        description="Inversiones inmobiliarias accesibles desde $1.3M. Crowdfunding inmobiliario con proyectos hoteleros verificados en Colombia. Rentabilidad transparente y comunidad de inversionistas."
      />
      <OrganizationSchema 
        name="LOKL"
        url="https://lokl.life"
        description="Plataforma de crowdfunding inmobiliario que democratiza el acceso a inversiones en bienes raíces en Colombia. Proyectos hoteleros sostenibles con impacto social y rentabilidad real."
        socialLinks={[
          "https://www.facebook.com/lokllife",
          "https://www.instagram.com/lokl.life/",
          "https://www.linkedin.com/company/lokl-life/"
        ]}
      />
      <BreadcrumbSchema 
        items={[
          {
            name: "Inicio",
            url: "https://lokl.life",
            position: 1
          }
        ]}
      />
      <HomePageClient />
    </>
  );
}