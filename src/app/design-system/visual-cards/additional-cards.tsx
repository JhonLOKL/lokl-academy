"use client";

import React from "react";
import {
  FeatureCard,
  FeatureCardGrid,
  ProgramCard,
  BenefitItem,
  InfoCard,
  InfoCardGroup,
  BenefitCard,
  BenefitCardGroup,
  Button,
} from "@/components/design-system";
import {
  ChevronRight,
  Map,
  TrendingUp,
  Users,
  Building,
  Layers,
  BarChart,
  LineChart,
  PieChart,
  User,
  Target,
  Zap,
  Cpu,
} from "lucide-react";

export function AdditionalCards() {
  return (
    <>
      {/* Feature Cards */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Tarjetas de Características</h2>
        <FeatureCardGrid columns={3}>
          <FeatureCard
            subtitle="Innovación Digital"
            title="Tecnología Avanzada"
            description="Utilizamos las últimas tecnologías para optimizar tus inversiones y maximizar tus rendimientos."
            ctaText="Ver más"
          />
          <FeatureCard
            subtitle="Crecimiento Conjunto"
            title="Comunidad de Inversores"
            description="Forma parte de una comunidad activa de inversores que comparten conocimientos y estrategias."
            ctaText="Ver más"
          />
          <FeatureCard
            subtitle="Para Todos"
            title="Futuro Accesible"
            description="Democratizamos las inversiones inmobiliarias, haciendo accesibles oportunidades que antes estaban reservadas para pocos."
            ctaText="Ver más"
          />
        </FeatureCardGrid>
      </section>
      
      {/* Program Card */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Tarjeta de Programa</h2>
        <ProgramCard
          hashtag="CRECECONLOKL"
          title={<>Conviértete en <span className="font-extrabold">Embajador LOKL</span></>}
          subtitle="Impulsa la inversión inmobiliaria digital"
          description="Forma parte de una comunidad de inversores visionarios. Accede a oportunidades exclusivas con retornos reales y sostenibles. Sé el puente entre LOKL y nuevos inversionistas."
          ctaText="Únete al Programa"
          benefits={[
            { 
              icon: <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20"><Map size={18} /></div>,
              text: "Estadías en proyectos únicos" 
            },
            { 
              icon: <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20"><TrendingUp size={18} /></div>,
              text: "Bonos de inversión adicionales" 
            },
            { 
              icon: <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20"><User size={18} /></div>,
              text: "Asesorías personalizadas" 
            },
          ]}
          stats={[
            { value: "+2,500", label: "embajadores" }
          ]}
        />
      </section>
      
      {/* Info Cards */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Tarjetas Institucionales</h2>
        <InfoCardGroup variant="split">
          <InfoCard
            tag="SECCIÓN INSTITUCIONAL"
            title="CREAMOS todo pensando"
            highlight="EN TI"
            description="LOKL es una plataforma de inversión colaborativa 100% digital que democratiza el acceso a oportunidades inmobiliarias exclusivas."
            variant="light"
          />
          <InfoCard
            tag="PLATAFORMA DIGITAL"
            title="Somos la plataforma inmobiliaria de las nuevas generaciones."
            description={<>Gana <span className="font-bold">recompensas</span> adicionales</>}
            variant="dark"
          />
        </InfoCardGroup>
        
        <div className="mt-6">
          <InfoCardGroup>
            <InfoCard
              tag="HERO SECTION"
              title={<>Acumula <span className="text-4xl font-black">puntos</span></>}
              subtitle="Con tus referidos exitosos"
              description={<>Únete al programa de embajadores más rentable del mercado inmobiliario. <span className="font-bold">Obtén hasta 18% de rentabilidad anual</span> mientras ayudas a otros a construir su patrimonio.</>}
              variant="light"
            />
            <InfoCard
              tag="TARJETA DE BENEFICIO"
              title={<>Inversión <span className="text-[#5352F6]">Inteligente</span></>}
              description="Nuestros algoritmos de IA analizan miles de propiedades para encontrar las mejores oportunidades de inversión."
              variant="light"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EEEEFE] text-[#5352F6]">
                <LineChart size={20} />
              </div>
            </InfoCard>
          </InfoCardGroup>
        </div>
      </section>
      
      {/* Benefit Cards */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Tarjetas de Beneficios con Iconos</h2>
        <BenefitCardGroup columns={3}>
          <BenefitCard
            icon={<Layers size={24} />}
            iconBackground="light-purple"
            subtitle="Tecnología"
            title="Avanzada"
            description="Utilizamos algoritmos de inteligencia artificial para optimizar tus inversiones y maximizar rendimientos."
          />
          <BenefitCard
            icon={<Users size={24} />}
            iconBackground="light-purple"
            subtitle="Comunidad"
            title="Activa"
            description="Forma parte de una red de inversores que comparten estrategias y conocimientos para el crecimiento conjunto."
          />
          <BenefitCard
            icon={<Target size={24} />}
            iconBackground="light-purple"
            subtitle="Futuro"
            title="Accesible"
            description="Democratizamos las inversiones inmobiliarias, haciendo accesibles oportunidades exclusivas para todos."
          />
        </BenefitCardGroup>
        
        <div className="mt-8">
          <h3 className="mb-4 text-xl font-semibold">Variantes de Tarjetas de Beneficios</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <BenefitCard
              icon={<Cpu size={20} />}
              iconBackground="purple"
              title="Tecnología"
              variant="simple"
            />
            <BenefitCard
              icon={<Users size={20} />}
              iconBackground="white"
              title="Comunidad"
              variant="simple"
            />
            <BenefitCard
              icon={<Building size={20} />}
              iconBackground="transparent"
              title="Proyectos"
              variant="compact"
            />
            <BenefitCard
              icon={<Zap size={20} />}
              iconBackground="light-purple"
              title="Rentabilidad"
              variant="compact"
              highlight
            />
          </div>
        </div>
      </section>
      
      {/* Black Banner */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Banner Oscuro</h2>
        <div className="rounded-lg bg-black p-8 text-white">
          <h2 className="mb-4 text-3xl font-bold">Transforma tu futuro financiero</h2>
          <p className="mb-6 text-lg">Únete a los miles de inversores que ya están construyendo su patrimonio con LOKL</p>
        </div>
      </section>
      
      {/* Text Section */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Sección de Texto</h2>
        <div className="mb-6 text-center">
          <h2 className="mb-4 text-3xl font-bold">Creamos pensando en ti</h2>
          <p className="mx-auto max-w-3xl text-[#6D6C6C]">
            LOKL es una plataforma de inversión colaborativa 100% digital en proyectos inmobiliarios que te ayuda a conectar con proyectos innovadores y rentables, en los que puedes invertir desde bajos montos y obtener rentabilidades por valorización y rentas, además de beneficios en los proyectos y con la comunidad de LOKL.
          </p>
        </div>
      </section>
    </>
  );
}
