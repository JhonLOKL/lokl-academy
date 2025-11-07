"use client";

import { Award, Rocket, Trophy, ChevronRight, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface InvestorLevel {
  name: string;
  minUnits: number;
  icon: typeof Award;
  accentColor: string;
  benefits: string[];
  image: string;
}

const investorLevels: InvestorLevel[] = [
  {
    name: "Explorador",
    minUnits: 100,
    icon: Award,
    accentColor: "#60A5FA",
    image: "/images/ambassadors/ambassador-forest-image.png",
    benefits: [
      "Descuento del 10% en espacios operados por nido de agua",
      "Sé primero en listas de esperas para el proyecto",
      "Acceso exclusivo a MetaLOKL un metaverso inmobiliario",
    ],
  },
  {
    name: "Aventurero",
    minUnits: 200,
    icon: Rocket,
    accentColor: "#EC4899",
    image: "/images/about-us/img-lets-growth.jpg",
    benefits: [
      "Kit de bienvenida para inversionista",
      "Sé primero en listas de esperas para el proyecto",
      "Acceso exclusivo a MetaLOKL un metaverso inmobiliario",
      "Participa de las loterías para noches y beneficios",
      "Descuento del 20% en espacios",
    ],
  },
  {
    name: "Héroe",
    minUnits: 500,
    icon: Trophy,
    accentColor: "#F59E0B",
    image: "/images/about-us/img-graph-new-up.png",
    benefits: [
      "Participa de las loterías para noches y beneficios",
      "Súper Kit de bienvenida para inversionista",
      "Sé primero en listas de esperas para el proyecto",
      "Acceso exclusivo a MetaLOKL un metaverso inmobiliario",
      "Experiencia anual para inversionistas",
      "Una noche gratuita",
      "Descuento del 25% en espacios",
    ],
  },
];

interface InvestorLevelCardProps {
  currentUnits: number;
  unitPrice: number;
  onInvestmentChange: (amount: number) => void;
  compact?: boolean;
}

export default function InvestorLevelCard({
  currentUnits,
  unitPrice,
  onInvestmentChange,
  compact = false,
}: InvestorLevelCardProps) {
  // Determinar nivel actual
  const getCurrentLevel = () => {
    for (let i = investorLevels.length - 1; i >= 0; i--) {
      if (currentUnits >= investorLevels[i].minUnits) {
        return { level: investorLevels[i], index: i };
      }
    }
    return null;
  };

  const currentLevel = getCurrentLevel();
  const nextLevel = currentLevel
    ? investorLevels[currentLevel.index + 1]
    : investorLevels[0];

  // Calcular progreso
  const getProgress = () => {
    if (!nextLevel) return 100;
    const start = currentLevel?.level.minUnits || 0;
    const end = nextLevel.minUnits;
    const progress = ((currentUnits - start) / (end - start)) * 100;
    return Math.min(100, Math.max(0, progress));
  };

  const progress = getProgress();
  const unitsToNext = nextLevel ? Math.max(0, nextLevel.minUnits - currentUnits) : 0;

  // Nivel a mostrar (actual o próximo)
  const displayLevel = currentLevel?.level || investorLevels[0];
  const LevelIcon = displayLevel.icon;

  if (compact) {
    // Versión compacta para Phase 3
    return (
      <div className="relative overflow-hidden rounded-xl h-[200px] shadow-xl">
        {/* Imagen de fondo con overlay oscuro */}
        <div className="absolute inset-0">
          <Image
            src={displayLevel.image}
            alt={displayLevel.name}
            fill
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-between p-5">
          {/* Header con badge */}
          <div className="flex items-center justify-between">
            <div 
              className="px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg"
              style={{ backgroundColor: displayLevel.accentColor }}
            >
              {currentLevel ? "Tu nivel" : "Próximo nivel"}
            </div>
            {currentLevel && (
              <Sparkles className="w-5 h-5 text-yellow-300 drop-shadow-lg animate-pulse" />
            )}
          </div>

          {/* Contenido inferior */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div 
                className="p-2 rounded-lg shadow-lg"
                style={{ backgroundColor: displayLevel.accentColor }}
              >
                <LevelIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-black text-white drop-shadow-lg">{displayLevel.name}</p>
                {nextLevel && (
                  <p className="text-xs text-white/90">
                    Faltan <span className="font-bold">{unitsToNext} units</span>
                  </p>
                )}
              </div>
            </div>

            {nextLevel && (
              <Button
                onClick={() => onInvestmentChange(nextLevel.minUnits * unitPrice)}
                size="sm"
                className="w-full bg-white text-[#5352F6] hover:bg-white/90 font-bold h-9 shadow-lg"
              >
                Subir a {nextLevel.minUnits} units
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}

            {!nextLevel && (
              <div className="text-center py-2">
                <p className="text-sm font-bold text-white">¡Nivel Máximo! 🏆</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Versión completa para Phase 1
  return (
    <div className="relative overflow-hidden rounded-2xl h-[420px] shadow-2xl">
      {/* Imagen de fondo con overlay oscuro */}
      <div className="absolute inset-0">
        <Image
          src={displayLevel.image}
          alt={displayLevel.name}
          fill
          className="object-cover"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between p-6">
        {/* Header con badge */}
        <div className="flex items-center justify-between">
          <div 
            className="px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg"
            style={{ backgroundColor: displayLevel.accentColor }}
          >
            {currentLevel ? "Tu nivel actual" : "Próximo nivel"}
          </div>
          {currentLevel && (
            <Sparkles className="w-6 h-6 text-yellow-300 drop-shadow-lg animate-pulse" />
          )}
        </div>

        {/* Contenido inferior */}
        <div className="space-y-4">
          {/* Título del nivel */}
          <div className="flex items-center gap-4">
            <div 
              className="p-3 rounded-xl shadow-xl"
              style={{ backgroundColor: displayLevel.accentColor }}
            >
              <LevelIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-3xl font-black text-white drop-shadow-lg">{displayLevel.name}</p>
              {nextLevel && (
                <p className="text-sm text-white/90 mt-1">
                  Faltan <span className="font-bold text-white">{unitsToNext} units</span> para subir
                </p>
              )}
            </div>
          </div>

          {/* Beneficios principales (solo 3 primeros) */}
          <div className="space-y-2">
            {displayLevel.benefits.slice(0, 3).map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-white">
                <Check className="w-5 h-5 mt-0.5 flex-shrink-0 drop-shadow-lg" style={{ color: displayLevel.accentColor }} />
                <span className="text-sm leading-relaxed font-medium drop-shadow">{benefit}</span>
              </div>
            ))}
            {displayLevel.benefits.length > 3 && (
              <p className="text-xs text-white/80 ml-7">
                +{displayLevel.benefits.length - 3} beneficios más
              </p>
            )}
          </div>

          {/* Botón de acción */}
          {nextLevel && (
            <Button
              onClick={() => onInvestmentChange(nextLevel.minUnits * unitPrice)}
              className="w-full bg-white text-[#5352F6] hover:bg-white/90 hover:scale-105 transition-all font-bold h-12 text-base shadow-xl"
            >
              Subir a {nextLevel.minUnits} units
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          )}

          {!nextLevel && (
            <div className="text-center py-3">
              <Trophy className="w-12 h-12 text-yellow-300 mx-auto mb-2 drop-shadow-lg" />
              <p className="text-lg font-black text-white drop-shadow-lg">¡Nivel Máximo Alcanzado! 🎉</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

