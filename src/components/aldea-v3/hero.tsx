"use client";

import React from "react";
import { ArrowRight, Play } from "lucide-react";

const HERO_IMAGE = "/images/home/Hero_Aldea.webp";

export interface AldeaV3HeroProps {
  /** Título del hero (por defecto: "EXPERIENCES THAT GO BEYOND DESTINATIONS") */
  title?: React.ReactNode;
  /** Subtítulo (por defecto: "Tu subtítulo aquí.") */
  subtitle?: string;
  /** Texto del botón principal (por defecto: "Explorar") */
  primaryButtonLabel?: string;
  /** Al hacer clic en el botón principal (si no se pasa, el botón no hace nada especial) */
  onPrimaryClick?: () => void;
  /** Botón secundario: etiqueta y ancla (ej: { label: "Ver proyecto", href: "#back-this-project" }) */
  secondaryButton?: { label: string; href: string };
}

// Máscara: recorte con curva suave fluida (Curva S) en la esquina inferior izquierda.
const HERO_MASK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path fill="white" d="M 0 0 L 100 0 L 100 100 L 55 100 C 40 100, 40 80, 25 80 L 0 80 Z"/></svg>`;
const HERO_MASK_IMAGE = `url("data:image/svg+xml,${encodeURIComponent(HERO_MASK_SVG)}")`;

export function AldeaV3Hero({
  title = "EXPERIENCES THAT GO BEYOND DESTINATIONS",
  subtitle = "Tu subtítulo aquí.",
  primaryButtonLabel = "Explorar",
  onPrimaryClick,
  secondaryButton,
}: AldeaV3HeroProps) {
  return (
    <section
      className="relative flex w-full flex-col overflow-hidden bg-white box-border p-3 sm:p-4"
      style={{
        minHeight: "calc(100dvh - var(--navbar-height, 4rem))",
      }}
    >
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        style={{ minHeight: "calc(100dvh - var(--navbar-height, 4rem) - 2rem)" }}
      >
        {/* Imagen de fondo con máscara en el borde inferior (curva cóncava abajo a la izquierda) */}
        <div
          className="absolute inset-0 bg-no-repeat bg-center bg-cover"
          style={{
            backgroundImage: `url(${HERO_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "50% 80%",
            WebkitMaskImage: HERO_MASK_IMAGE,
            maskImage: HERO_MASK_IMAGE,
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            WebkitMaskPosition: "0 0",
            maskPosition: "0 0",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
          aria-hidden
        />

        {/* Contenido: padding reducido para acercar a las esquinas */}
        <div className="absolute inset-0 flex flex-col justify-start text-white pl-6 pr-4 pt-4 pb-4 sm:pl-10 sm:pr-6 sm:pt-6 sm:pb-6 md:pl-12 md:pr-8 md:pt-8 md:pb-8 lg:pl-14 lg:pt-10 lg:pb-10">
          <div className="select-text cursor-text max-w-4xl">
            <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl text-white">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm sm:mt-4 sm:text-base text-white font-medium">
              {subtitle}
            </p>
          </div>
          <div className="mt-4 sm:mt-6 flex flex-wrap gap-3">
            {onPrimaryClick ? (
              <button
                type="button"
                onClick={onPrimaryClick}
                className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-[#5352F6] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#4241C5] sm:px-5"
              >
                {primaryButtonLabel}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            ) : (
              <button
                type="button"
                className="rounded-full border border-white/60 bg-black/25 px-4 py-2 text-sm text-white backdrop-blur sm:px-5"
              >
                {primaryButtonLabel}
              </button>
            )}
            {secondaryButton && (
              <a
                href={secondaryButton.href}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-white/15 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/25 hover:border-white sm:px-5"
              >
                <Play className="h-4 w-4" aria-hidden />
                {secondaryButton.label}
              </a>
            )}
          </div>
        </div>

        {/* Métricas: a la izquierda, sobre el hero sin tarjeta */}
        <div
          className="absolute left-8 bottom-6 sm:left-10 sm:bottom-6 md:left-12 md:bottom-8"
          aria-label="Estadísticas"
        >
          <div className="grid grid-cols-3 items-center gap-4 sm:gap-6 text-xs sm:text-sm text-black">
            <div>
              <div className="font-semibold sm:text-lg">6,800+</div>
              <div className="text-neutral-600">Islands</div>
            </div>
            <div>
              <div className="font-semibold sm:text-lg">2,000+</div>
              <div className="text-neutral-600">Years of History</div>
            </div>
            <div>
              <div className="font-semibold sm:text-lg">2,000+</div>
              <div className="text-neutral-600">Temples & Shrines</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
