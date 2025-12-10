import React from 'react';
import { Metadata } from 'next';
import MainHeaderWithCTA from './sections/MainHeaderWithCTA';
import AmbassadorWhoWeAre from './sections/AmbassadorWhoWeAre';
import AmbassadorBenefits from './sections/AmbassadorBenefits';
import AmbassadorHowItsWorks from './sections/AmbassadorHowItsWorks';
import AmbassadorStepsToRefer from './sections/AmbassadorStepsToRefer';
import Image from 'next/image';
import MarketingFooter from '@/components/footer/marketing-footer';

// Metadatos para SEO
export const metadata: Metadata = {
  title: "Programa de Embajadores en Inversiones | Gana dinero como embajador | LOKL",
  description: "Conviértete en embajador de inversiones inmobiliarias y gana dinero desde casa. Descubre los beneficios de ser embajador de LOKL y cómo ganar dinero con referidos inmobiliarios.",
  keywords: [
    "programa de embajadores en inversiones",
    "gana dinero como embajador",
    "gana dinero desde casa",
    "embajadores de inversiones inmobiliarias",
    "beneficios de ser embajador de LOKL",
    "programa de referidos en bienes raíces",
    "cómo ganar dinero con referidos inmobiliarios",
    "recompensas para embajadores de LOKL",
    "invierte y gana como embajador",
    "realtor inmobiliario",
    "que es un embajador inmobiliario y como funciona",
    "como ser embajador inmobiliario",
    "programa embajadores lokl",
    "invertir en bienes raices",
    "negocios inmobiliarios online",
    "ganar sin invertir real estate",
    "real estate colombia",
    "bienes raices 2025",
    "ingresos pasivos",
    "embajador inmobiliario",

  ],
  alternates: {
    canonical: "https://lokl.life/ambassadors",
  },
  openGraph: {
    title: "Programa de Embajadores en Inversiones | Gana dinero como embajador | LOKL",
    description: "Conviértete en embajador de inversiones inmobiliarias y gana dinero desde casa. Descubre los beneficios de ser embajador de LOKL y cómo ganar dinero con referidos inmobiliarios.",
    url: "https://lokl.life/ambassadors",
    siteName: "LOKL Life",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Programa de Embajadores en Inversiones | Gana dinero como embajador | LOKL",
    description: "Conviértete en embajador de inversiones inmobiliarias y gana dinero desde casa.",
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

export default function Ambassadors() {
  return (
    <main>
      <header>
        <MainHeaderWithCTA />
      </header>
      
      <article>
        <section>
          <AmbassadorWhoWeAre />
        </section>
      
        <div className="relative flex justify-center -my-16 md:-my-24">
          <Image
            src="/images/ambassadors/ambassador-check-blue.png"
            alt="Check azul"
            width={208}
            height={208}
            className="w-24 h-24 md:w-52 md:h-52"
          />
        </div>
        
        <section>
          <AmbassadorBenefits />
        </section>
        
        <section className="-mt-8">
          <AmbassadorHowItsWorks />
        </section>
        
        <section>
          <AmbassadorStepsToRefer />
        </section>
      </article>

      <MarketingFooter />
    </main>
  );
}

