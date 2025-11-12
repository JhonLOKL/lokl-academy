"use client";

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import MenuTabs from '@/components/indie-universe/MenuTabs';
import { scrollToSection } from '@/helpers/functions';
import Benefits from '@/components/indie-universe/Benefits';
import Header from '@/components/indie-universe/Header';
import Team from '@/components/indie-universe/Team';
import { AboutInvestment } from '@/components/indie-universe/AboutInvestment';
import { LocationIndie } from '@/components/indie-universe/LocationIndie';
import { Nidos } from '@/components/indie-universe/Nidos';
import { Insights } from '@/components/indie-universe/Insights';
import { Simulator } from '@/components/indie-universe/Simulator';
import InvestorProfiles from '@/components/indie-universe/InvestorProfiles';

export default function IndieUniverse() {
  const searchParams = useSearchParams();

  // Código para hacer scroll al inicio cuando cambia la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const itemsPage = [
    { name: 'Acerca de la inversión', id: 'aboutInvestment' },
    { name: '¿Dónde está ubicado?', id: 'location' },
    { name: 'Líneas de negocio', id: 'businessLines' },
    { name: 'Equipo del proyecto', id: 'team' },
    { name: 'Beneficios', id: 'benefits' }
  ];

  // Manejar hash en la URL para scroll automático
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash;
      const section = hash.replace("#", '');
      const distance = 180;
      scrollToSection(section, distance);
    }
  }, []);

  // Obtener y guardar utm_source si existe
  useEffect(() => {
    const pageOrigin = searchParams.get('utm_source');
    if (pageOrigin && typeof window !== 'undefined') {
      localStorage.setItem('pageOrigin', pageOrigin);
    }
  }, [searchParams]);

  return (
    <>
      <section
        id="IndieUniverseTop"
        className="flex flex-col items-start container mx-auto xl:max-w-7xl pt-52 pb-40 space-y-12 lg:space-y-16 px-4"
      >
        <Header />

        <div className="w-full lg:flex justify-center" id="simulator">
          <Simulator />
        </div>

        <div className="w-full">
          <MenuTabs menuItems={itemsPage} scroll={true} />
        </div>

        <div className="grid flex-col-reverse grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8 lg:mr-8">
            <div id="aboutInvestment" className="w-full mb-12">
              <AboutInvestment />
            </div>

            <hr className="my-8" />

            <div id="location" className="w-full my-12">
              <LocationIndie />
            </div>

            <div id="businessLines" className="w-full my-12">
              <Nidos />
            </div>

            <hr className="my-8" />

            <div id="team" className="w-full my-12">
              <Team />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <div className="my-6 w-full" id="investor-profile">
              <InvestorProfiles />
            </div>

            <div className="my-6 w-full hidden md:block" id="insights">
              <Insights />
            </div>
          </div>
        </div>

        <div>
          <hr className="my-8" />

          <div id="benefits" className="w-full my-12">
            <Benefits />
          </div>
        </div>
      </section>
    </>
  );
}


