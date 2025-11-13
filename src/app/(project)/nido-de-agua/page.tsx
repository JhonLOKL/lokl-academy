"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import MenuTabs from '@/components/nido-de-agua/MenuTabs';
import { scrollToSection } from '@/helpers/functions';
import Header from '@/components/nido-de-agua/Header';
import Team from '@/components/nido-de-agua/Team';
import { AboutInvestment } from '@/components/nido-de-agua/AboutInvestment';
import { Location } from '@/components/nido-de-agua/Location';
import { Nidos } from '@/components/nido-de-agua/Nidos';
import { Timeline } from '@/components/nido-de-agua/Timeline';
import { Insights } from '@/components/nido-de-agua/Insights';
import { Simulator } from '@/components/nido-de-agua/Simulator';
import InvestorProfiles from '@/components/nido-de-agua/InvestorProfiles';
import PromoBanner from '@/components/shared/PromoBanner';
import MarketingFooter from '@/components/footer/marketing-footer';
import { getNidoDeAguaHomeInfoAction } from '@/actions/project-actions';
import type { ProjectHomePageInfo } from '@/services/projectService';
import Benefits from '@/components/nido-de-agua/Benefits';

export default function NidoDeAgua() {
  const searchParams = useSearchParams();
  const [homeInfo, setHomeInfo] = useState<ProjectHomePageInfo | null>(null);
  const [homeInfoError, setHomeInfoError] = useState<string | null>(null);
  const [homeInfoLoading, setHomeInfoLoading] = useState(true);

  // Código para hacer scroll al inicio cuando cambia la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const itemsPage = [
    { name: 'Acerca de la inversión', id: 'aboutInvestment' },
    { name: '¿Dónde está ubicado?', id: 'location' },
    { name: 'Líneas de negocio', id: 'businessLines' },
    { name: 'Equipo del proyecto', id: 'team' },
    { name: 'Beneficios', id: 'benefits' },
    { name: 'Cronograma', id: 'timeline' }
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

  // Obtener información del home del proyecto
  useEffect(() => {
    let isMounted = true;

    const fetchHomeInfo = async () => {
      try {
        const result = await getNidoDeAguaHomeInfoAction();

        if (!isMounted) return;

        if (result.success) {
          setHomeInfo(result.data);
          setHomeInfoError(null);
        } else {
          setHomeInfo(null);
          setHomeInfoError(result.error);
        }
      } catch (error) {
        if (!isMounted) return;

        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Ocurrió un error inesperado al cargar la información del proyecto.';

        setHomeInfo(null);
        setHomeInfoError(errorMessage);
      } finally {
        if (isMounted) {
          setHomeInfoLoading(false);
        }
      }
    };

    fetchHomeInfo();

    return () => {
      isMounted = false;
    };
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
      <PromoBanner
        title="¡Disfruta de beneficios exclusivos siendo inversionista!"
        subtitle="y crece como socio invirtiendo en proyectos con LOKL"
        ctaLabel="Invertir ahora"
        targetId="insights"
        ctaHref="https://dashboard.lokl.life/register?redirect_to=/checkout/invest?"
        countdownLabel="Aumento del Unit en"
        deadline="2025-12-01T00:00:00-05:00"
      />
      <section
        id="NidoTop"
        className="flex flex-col items-start container mx-auto xl:max-w-7xl pt-16 pb-40 space-y-12 lg:space-y-16 px-4"
      >
        <Header homeInfo={homeInfo} isLoading={homeInfoLoading} error={homeInfoError} />

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
              <Location />
            </div>

            <div id="businessLines" className="w-full my-12">
              <Nidos />
            </div>

            <hr className="my-8" />

          </div>

          <div className="col-span-12 lg:col-span-4">
            <div className="my-6 w-full" id="investor-profile">
              <InvestorProfiles homeInfo={homeInfo} />
            </div>

            <div className="my-6 w-full hidden md:block scroll-mt-40" id="insights">
              <Insights />
            </div>
          </div>
        </div>

        <div id="team" className="w-full my-12">
          <Team />
        </div>

        <div>
          <hr className="my-8" />

          <div className="my-12 hidden md:block" id="timeline">
            <h2 className="text-gray-400 text-2xl font-bold font-epilogue mb-5 text-center">
              Cronograma del proyecto
            </h2>
            <div className="grid grid-cols-12 my-5 lg:gap-16">
              <div className="col-span-12 lg:col-span-12">
                <Timeline />
              </div>
            </div>
          </div>

          <hr className="my-8" />

          <section className="w-full">
            <Benefits />
          </section>
        </div>
      </section>
      <MarketingFooter />
    </>
  );
}


