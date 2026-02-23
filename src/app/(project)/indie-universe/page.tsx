"use client";

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import MenuTabs from '@/components/indie-universe/MenuTabs';
import { scrollToSection } from '@/helpers/functions';
import Benefits from '@/components/landing/new-home/benefits';
import Header from '@/components/indie-universe/Header';
import Team from '@/components/indie-universe/Team';
import { AboutInvestment } from '@/components/indie-universe/AboutInvestment';
import { LocationIndie } from '@/components/indie-universe/LocationIndie';
import { Nidos } from '@/components/indie-universe/Nidos';
import { Insights } from '@/components/indie-universe/Insights';
import { Simulator } from '@/components/indie-universe/Simulator';
import InvestorProfiles from '@/components/indie-universe/InvestorProfiles';
import PromoBanner from '@/components/shared/PromoBanner';
import MarketingFooter from '@/components/footer/marketing-footer';
import { getIndieUniverseHomeInfoAction } from '@/actions/project-actions';
import type { ProjectHomePageInfo } from '@/services/projectService';
import dynamic from 'next/dynamic';
import { urls } from '@/config/urls';

const FloatingWhatsAppButton = dynamic(
  () => import('@/components/shared/floating-whatsapp-button'),
  { ssr: false }
);

function IndieUniverseContent() {
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

  // Obtener información del home del proyecto
  useEffect(() => {
    let isMounted = true;

    const fetchHomeInfo = async () => {
      try {
        const result = await getIndieUniverseHomeInfoAction();

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

  return (
    <>
      <PromoBanner
        title="¡Disfruta de beneficios exclusivos siendo inversionista!"
        subtitle="y crece como socio invirtiendo en proyectos con LOKL"
        ctaLabel="Invertir ahora"
        targetId="insights"
        ctaHref={`${urls.DASHBOARD_URL}/register?redirect_to=/checkout/invest?`}
        countdownLabel="Aumento del Unit en"
        deadline="2025-12-01T00:00:00-05:00"
      />
      <section
        id="IndieUniverseTop"
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
              <InvestorProfiles homeInfo={homeInfo} />
            </div>

            <div
              id="insights"
              className="h-0 scroll-mt-40 pointer-events-none"
              aria-hidden="true"
            />

            <div className="my-6 w-full hidden md:block">
              <Insights />
            </div>
          </div>
        </div>
      </section>

      <Benefits />

      <MarketingFooter />
      <FloatingWhatsAppButton />
    </>
  );
}

export default function IndieUniverse() {
  return (
    <Suspense fallback={null}>
      <IndieUniverseContent />
    </Suspense>
  );
}
