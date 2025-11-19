"use client";

import { Award, Rocket, Trophy, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface InvestorLevelsBannerProps {
  currentUnits: number;
  onUnitsChange?: (units: number) => void;
}

const levels = [
  {
    name: "Explorador",
    minUnits: 100,
    icon: Award,
    image: "/images/ambassadors/ambassador-forest-image.png",
    benefits: [
      "Descuento del 10% en espacios",
      "Primero en listas de espera",
      "Acceso a MetaLOKL",
    ],
  },
  {
    name: "Aventurero",
    minUnits: 200,
    icon: Rocket,
    image: "/images/about-us/img-lets-growth.jpg",
    benefits: [
      "Kit de bienvenida",
      "Loterías para noches gratis",
      "Descuento del 20% en espacios",
    ],
  },
  {
    name: "Héroe",
    minUnits: 500,
    icon: Trophy,
    image: "/images/about-us/img-graph-new-up.png",
    benefits: [
      "Súper Kit de bienvenida",
      "Experiencia anual VIP",
      "Una noche gratuita",
      "Descuento del 25% en espacios",
    ],
  },
];

export default function InvestorLevelsBanner({ currentUnits, onUnitsChange }: InvestorLevelsBannerProps) {
  // Determinar nivel actual y siguiente
  const getCurrentLevel = () => {
    for (let i = levels.length - 1; i >= 0; i--) {
      if (currentUnits >= levels[i].minUnits) {
        return { current: levels[i], next: levels[i + 1] || null, index: i };
      }
    }
    return { current: null, next: levels[0], index: -1 };
  };

  const { current, next } = getCurrentLevel();
  const displayLevel = current || levels[0];
  const LevelIcon = displayLevel.icon;
  const unitsToNext = next ? next.minUnits - currentUnits : 0;
  const progress = next
    ? ((currentUnits - (current?.minUnits || 0)) / (next.minUnits - (current?.minUnits || 0))) * 100
    : 100;

  return (
    <div className="max-w-7xl mx-auto mb-8 px-4 md:px-0">
      <div className="relative overflow-hidden rounded-2xl md:h-[280px] shadow-2xl">
        {/* Imagen de fondo */}
        <div className="absolute inset-0">
          <Image
            src={displayLevel.image}
            alt={displayLevel.name}
            fill
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black/85 via-black/70 to-black/50"></div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-stretch md:items-center justify-between p-4 md:p-8 gap-4 md:gap-6">
          {/* Lado izquierdo: Nivel actual */}
          <div className="flex items-center gap-4">
            <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-[#5352F6] shadow-xl flex-shrink-0">
              <LevelIcon className="w-8 h-8 md:w-12 md:h-12 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-white/80 text-xs md:text-sm font-medium mb-1">
                {current ? "Con esta inversión serías" : "Invierte para ser"}
              </p>
              <h3 className="text-2xl md:text-4xl font-black text-white mb-1 truncate">
                {displayLevel.name}
              </h3>
              <p className="text-white/90 text-xs md:text-sm">
                {current ? `${displayLevel.minUnits} units o más` : `Desde ${displayLevel.minUnits} units`}
              </p>
            </div>
          </div>

          {/* Centro: Beneficios */}
          <div className="flex-1 md:max-w-md">
            <p className="text-white/90 text-xs font-semibold mb-2 uppercase tracking-wide">
              {current ? "Tus beneficios incluyen:" : "Desbloquearías:"}
            </p>
            <div className="space-y-1.5 md:space-y-2">
              {displayLevel.benefits.slice(0, 3).map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2 text-white">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#5352F6] bg-white rounded-full p-0.5" />
                  <span className="text-xs md:text-sm font-medium leading-tight">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lado derecho: Progreso */}
          {next ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-white/20 w-full md:w-auto md:min-w-[240px]">
              <p className="text-white/90 text-xs md:text-sm font-medium mb-2">
                Simula <span className="font-bold text-white">{unitsToNext} units más</span> para ser
              </p>
              <p className="text-white text-base md:text-lg font-black mb-3">{next.name}</p>
              
              {/* Barra de progreso */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-white/80 mb-1">
                  <span>{current?.minUnits || 0}</span>
                  <span>{next.minUnits} units</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#5352F6] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                  ></div>
                </div>
              </div>

              <p className="text-white/70 text-xs mb-3 leading-tight">
                Descubre los beneficios exclusivos de los inversionistas {next.name}
              </p>

              <Button
                size="sm"
                onClick={() => {
                  if (onUnitsChange) {
                    onUnitsChange(next.minUnits);
                    // Scroll suave al simulador
                    setTimeout(() => {
                      const simulatorElement = document.querySelector('[data-simulator-section]');
                      if (simulatorElement) {
                        simulatorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 100);
                  }
                }}
                className="w-full bg-[#5352F6] hover:bg-[#4845d8] text-white font-bold h-9 text-xs md:text-sm"
              >
                Simular {next.minUnits} units
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-white/20 text-center w-full md:w-auto md:min-w-[240px]">
              <Trophy className="w-10 h-10 md:w-12 md:h-12 text-yellow-300 mx-auto mb-2" />
              <p className="text-white font-bold text-base md:text-lg">¡Nivel Máximo!</p>
              <p className="text-white/80 text-xs md:text-sm mt-1">
                Con esta inversión accederías a todos los beneficios exclusivos
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

