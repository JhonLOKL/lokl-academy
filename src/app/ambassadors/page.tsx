import React from 'react';
import { Metadata } from 'next';
import MainHeaderWithCTA from './sections/MainHeaderWithCTA';
import AmbassadorWhoWeAre from './sections/AmbassadorWhoWeAre';
import AmbassadorBenefits from './sections/AmbassadorBenefits';
import AmbassadorHowItsWorks from './sections/AmbassadorHowItsWorks';
import AmbassadorStepsToRefer from './sections/AmbassadorStepsToRefer';
import Image from 'next/image';

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
    "marketing de afiliados en bienes raíces",
    "programa de referidos con alto ROI",
    "marketing de afiliados en bienes raices",
    "como vender casas sin propiedades",
    "secretos para ganar dinero en bienes raices",
    "estrategias innovadoras de finca raiz",
    "vender propiedades sin inversion",
    "realtor inmobiliario",
    "realty",
    "oportunidades en el mercado inmobiliario",
    "marketing digital en bienes raices",
    "como ganar dinero en el sector inmobiliario",
    "emprendimiento en bienes raices",
    "ganar dinero sin ser dueno de propiedades",
    "ingresos pasivos con finca raiz",
    "vender hoteles online",
    "vender inmuebles online",
    "trabajar en bienes raices sin invertir",
    "como empezar en bienes raices sin gastar un peso",
    "ganar comisiones por referidos de finca raiz",
    "trucos para vender propiedades sin ser dueno",
    "ganar plata con finca raiz facil",
    "vender hoteles sin ser dueno",
    "que es un embajador inmobiliario y como funciona",
    "bienes raices para principiantes",
    "ideas de negocio en finca raiz",
    "como ganar dinero con bienes raices sin invertir",
    "programa de referidos inmobiliarios 2025",
    "marketing de afiliados propiedades colombia",
    "como ser embajador inmobiliario",
    "oportunidades real estate colombia",
    "afiliados bienes raices",
    "ganar desde casa inmobiliaria",
    "embajador digital inmobiliario",
    "referidos propiedades",
    "proptech colombia",
    "inversion inmobiliaria",
    "comisiones inmobiliarias",
    "codigo referido propiedades",
    "real estate marketing",
    "marketing de afiliados inmobiliario",
    "programa embajadores lokl",
    "invertir en bienes raices",
    "negocios inmobiliarios online",
    "ganar sin invertir real estate",
    "real estate colombia",
    "bienes raices 2025",
    "ingresos pasivos",
    "embajador inmobiliario",
    "ganar dinero real estate"
  ],
  alternates: {
    canonical: "https://lokl.life/ambassadors",
  },
  openGraph: {
    title: "Programa de Embajadores en Inversiones | Gana dinero como embajador | LOKL",
    description: "Conviértete en embajador de inversiones inmobiliarias y gana dinero desde casa. Descubre los beneficios de ser embajador de LOKL y cómo ganar dinero con referidos inmobiliarios.",
    url: "https://lokl.life/ambassadors",
    siteName: "LOKL",
    locale: "es",
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
    </main>
  );
}

