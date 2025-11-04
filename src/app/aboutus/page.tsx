import React from 'react';
import { Metadata } from 'next';
import LetsGrowthTogether from './sections/LetsGrowthTogether';
import TimeLine from './sections/TimeLine';
import WeAreDifferent from './sections/WeAreDifferent';
import OurTeam from './sections/OurTeam';
import FrequentlyQs from './sections/FrequentlyQs';
import Supplierbar from './sections/Supplierbar';
import StatsBarWithData from './components/StatsBarWithData';

// Metadatos para SEO
export const metadata: Metadata = {
  title: "Sobre Nosotros | Inversiones Inmobiliarias | LOKL",
  description: "Descubre cómo LOKL permite a las nuevas generaciones invertir en proyectos que les apasionan desde $1,000,000 COP en el sector inmobiliario, todo de manera 100% digital.",
  keywords: [
    "Inversión inmobiliaria digital",
    "proyectos apasionantes",
    "inversión desde $1,000,000 COP",
    "propiedad digital",
    "nuevas generaciones inversión",
    "Lokl proyectos inmobiliarios",
    "oportunidades de inversión",
    "inversión 100% digital",
    "ser dueño de proyectos",
    "inversión en bienes raíces",
    "crowdfunding inmobiliario",
    "inversión colaborativa",
    "proptech colombia",
    "fintech inmobiliario",
    "democratización inversiones",
    "sobre nosotros lokl",
    "quienes somos lokl",
    "historia lokl",
    "equipo lokl",
    "misión lokl",
    "visión lokl"
  ],
  alternates: {
    canonical: "https://lokl.life/aboutus",
  },
  openGraph: {
    title: "Sobre Nosotros | Inversiones Inmobiliarias | LOKL",
    description: "Descubre cómo LOKL permite a las nuevas generaciones invertir en proyectos que les apasionan desde $1,000,000 COP en el sector inmobiliario, todo de manera 100% digital.",
    url: "https://lokl.life/aboutus",
    siteName: "LOKL",
    locale: "es",
    type: "website",
    images: [
      {
        url: "/images/aboutus/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LOKL - Sobre Nosotros",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre Nosotros | Inversiones Inmobiliarias | LOKL",
    description: "Descubre cómo LOKL permite a las nuevas generaciones invertir en proyectos que les apasionan desde $1,000,000 COP en el sector inmobiliario.",
    images: ["/images/aboutus/og-image.jpg"],
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

export default function AboutUsPage() {
  return (
    <main>
      <header>
        <LetsGrowthTogether />
      </header>
      
      <section>
        <TimeLine />
      </section>
      
      <section className="w-full">
        <StatsBarWithData />
      </section>
      
      <article className="md:mt-0">
        <WeAreDifferent />
      </article>
      
      <section>
        <OurTeam />
      </section>
     
      <section>
        <FrequentlyQs />
      </section>
      
      <aside className="mt-16">
        <Supplierbar />
      </aside>
    </main>
  );
}

