"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import LazyImage from "./lazy-image";

export default function Hero() {
  const [monthlyAmount, setMonthlyAmount] = useState([1300000]);
  const [term, setTerm] = useState("12");
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  // Estado para el simulador del hero
  const [selectedHeroProject, setSelectedHeroProject] = useState("indie-universe");
  const [heroInvestmentAmount, setHeroInvestmentAmount] = useState([5310000]);

  // Configuración de proyectos para el simulador del hero
  const heroProjects = {
    "indie-universe": {
      name: "Indie Universe",
      units: 40,
      minInvestment: 5310000,
      maxInvestment: 212400000, // 40 units * 5,310,000
      returnRate: 0.125, // 12.5%
      location: "Bogotá",
    },
    "nido-de-agua": {
      name: "Nido de Agua",
      units: 100,
      minInvestment: 12900000,
      maxInvestment: 1290000000, // 100 units * 12,900,000
      returnRate: 0.135, // 13.5%
      location: "Medellín",
    },
  };

  const currentHeroProject = heroProjects[selectedHeroProject as keyof typeof heroProjects];

  // Proyectos disponibles con sus imágenes correspondientes
  const featuredProjects = [
    {
      id: 1,
      name: "Nido de Agua",
      amount: "12,900,000",
      image: "/images/new-home/NIDO_AGUA_HERO.png",
    },
    {
      id: 2,
      name: "Indie Universe",
      amount: "5,310,000",
      image: "/images/new-home/INDIE UNIVERSE_HERO.png",
    },
  ];

  // Rotación automática de proyectos cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProjectIndex(
        (prev) => (prev + 1) % featuredProjects.length,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredProjects.length]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Actualizar el monto mínimo cuando cambia el proyecto en el hero
  const handleHeroProjectChange = (projectId: string) => {
    setSelectedHeroProject(projectId);
    const project = heroProjects[projectId as keyof typeof heroProjects];
    setHeroInvestmentAmount([project.minInvestment]);
  };

  const calculateHeroProjection = () => {
    const amount = heroInvestmentAmount[0];
    const unitsInvested = Math.floor(
      amount / currentHeroProject.minInvestment,
    );
    const actualInvestment = unitsInvested * currentHeroProject.minInvestment;
    const annualReturn = currentHeroProject.returnRate;

    // Proyección a 12 meses
    const projectedValue = actualInvestment * (1 + annualReturn);
    const returns = projectedValue - actualInvestment;

    return {
      unitsInvested,
      actualInvestment,
      projectedValue: Math.round(projectedValue),
      returns: Math.round(returns),
    };
  };

  const calculateProjection = () => {
    const monthly = monthlyAmount[0];
    const months = parseInt(term);
    const totalInvested = monthly * months;
    const annualReturn = 0.125; // 12.5% average
    const monthlyReturn = annualReturn / 12;

    let futureValue = 0;
    for (let i = 0; i < months; i++) {
      futureValue = (futureValue + monthly) * (1 + monthlyReturn);
    }

    return {
      invested: totalInvested,
      projected: Math.round(futureValue),
      returns: Math.round(futureValue - totalInvested),
    };
  };

  const projection = calculateProjection();
  const heroProjection = calculateHeroProjection();

  const handleSimulateClick = () => {
    document
      .getElementById("simulador")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleWhatIsClick = () => {
    document
      .getElementById("que-es-lokl")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen text-white"
    >
      {/* Fondo a pantalla completa que cambia según el proyecto */}
      <div className="absolute inset-0">
        {featuredProjects.map((project, index) => (
          <picture
            key={project.id}
            aria-hidden="true"
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentProjectIndex
                ? "opacity-100"
                : "opacity-0"
            }`}
          >
            <source
              media="(max-width: 767px)"
              srcSet={project.image}
            />
            <LazyImage
              src={project.image}
              alt={`Proyecto ${project.name} - LOKL`}
              className="absolute inset-0 h-full w-full object-cover"
              priority={index === 0}
            />
          </picture>
        ))}
      </div>

      {/* Overlay para contraste del texto */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20"></div>

      {/* Contenido en 2 columnas */}
      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-8 px-6 py-10 md:grid-cols-12">
        {/* Columna IZQUIERDA: texto */}
        <div className="md:col-span-7">
          <h1 className="leading-[0.85] font-semibold md:text-6xl text-[48px] text-left text-[rgb(255,248,248)] max-w-xl">
            <span className="text-white text-[40px] leading-[0.85]">
              Invierte en bienes raíces en
            </span>
            <span className="text-[#5352F6] text-[40px]">{" "}Colombia{" "}</span>
            <span className="text-white text-[40px] leading-[0.85]">
              de forma simple y 100% digital
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-lg text-white/90"> 
            <span className="text-white/90">Crowdfunding inmobiliario seguro y 100% digital en Colombia</span>
          </p>

          {/* "Invierte" / micro-beneficios */}
          <div className="mt-5 grid grid-cols-2 gap-2 w-fit">
            <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-center whitespace-nowrap">
              <span className="text-[rgba(255,255,255,1)] font-bold">
                Diversificación
              </span>
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-center whitespace-nowrap">
              <span className="text-[rgba(255,255,255,1)] font-bold">
                Hospitality
              </span>
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-center whitespace-nowrap">
              <span className="text-[rgba(255,255,255,1)] font-bold">
                Sostenibilidad
              </span>
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-center whitespace-nowrap">
              <span className="text-[rgba(255,255,255,1)] font-bold">
                Crowdfunding
              </span>
            </span>
          </div>

          {/* Proyecto destacado rotativo - fuera de tarjeta */}
          <div className="mt-6">
            <div
              key={currentProjectIndex}
              className="animate-in fade-in duration-500"
            >
              <p className="text-lg text-white/90 mb-2">
                <span className="text-white/90">
                  Invierte en{" "}
                </span>
                <span className="text-[rgba(255,255,255,1)] font-semibold font-bold">
                  {featuredProjects[currentProjectIndex].name}
                </span>
                <span className="text-white/90"> desde</span>
              </p>
              <p className="text-3xl font-semibold text-white">
                ${featuredProjects[currentProjectIndex].amount}{" "}
                COP
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#featured-projects"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("featured-projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-xl bg-[#5352F6] px-5 py-3 font-medium text-white hover:bg-[#5352F6]/90 focus:outline-none focus:ring-2 focus:ring-[#5352F6]/30"
            >
              Ver proyectos
            </a>
            <a
              href="#que-es-lokl"
              onClick={handleWhatIsClick}
              className="rounded-xl border border-white/70 px-5 py-3 font-medium text-white hover:bg-white/10"
            >
              <span className="text-white">¿Qué es </span>
              <span className="text-[rgba(255,255,255,1)] font-bold">
                LOKL
              </span>
              <span className="text-white">?</span>
            </a>
          </div>
        </div>

        {/* Columna DERECHA: preview del simulador con glassmorphism */}
        <div className="md:col-span-5">
          <div className="rounded-2xl p-6 shadow-2xl ring-1 ring-white/20 bg-white/15 backdrop-blur-xl backdrop-saturate-150 max-w-sm mx-auto">
            {/* Título del teaser */}
            <h3 className="text-xl font-semibold text-white mb-1">
              Proyección rápida
            </h3>
            <p className="text-sm text-white/70 mb-6">
              Simula tu inversión en segundos
            </p>

            {/* Simulador funcional del hero */}
            <div className="space-y-5 max-w-xs mx-auto">
              {/* Selector de Proyecto */}
              <div className="w-full">
                <label className="text-sm text-white/90 block mb-2">
                  Proyecto
                </label>
                <Select
                  value={selectedHeroProject}
                  onValueChange={handleHeroProjectChange}
                >
                  <SelectTrigger className="bg-white/20 border-white/30 text-white hover:bg-white/25 transition-colors w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="indie-universe">
                      Indie Universe - Medellín
                    </SelectItem>
                    <SelectItem value="nido-de-agua">
                      Nido de Agua - Guatape
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Barra deslizable para monto de inversión */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-white/90">
                    Valor a invertir
                  </label>
                  <span className="text-sm font-semibold text-white">
                    {formatCurrency(heroInvestmentAmount[0])}
                  </span>
                </div>
                <Slider
                  value={heroInvestmentAmount}
                  onValueChange={setHeroInvestmentAmount}
                  min={currentHeroProject.minInvestment}
                  max={currentHeroProject.maxInvestment}
                  step={currentHeroProject.minInvestment}
                  className="w-full"
                />
                <div className="flex justify-between mt-1 text-xs text-white/60">
                  <span>
                    {formatCurrency(
                      currentHeroProject.minInvestment,
                    )}
                  </span>
                  <span>
                    {formatCurrency(
                      currentHeroProject.maxInvestment,
                    )}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <a
                href="#simulador"
                onClick={handleSimulateClick}
                className="block w-full rounded-xl bg-[#5352F6] px-4 py-3 text-center font-medium text-white hover:bg-[#5352F6]/90 focus:outline-none focus:ring-2 focus:ring-[#5352F6]/30 transition-all shadow-lg hover:shadow-xl"
              >
                Ver proyección completa
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
