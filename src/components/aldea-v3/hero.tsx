"use client";

import React from "react";
import Image from "next/image";

const HERO_IMAGE = "/images/home/Hero_Aldea.webp";

/* ─────────────────────────────────────────────────────────────
   Color de fondo: DEBE coincidir en la sección, el shelf y los
   concave-corners para que la unión sea invisible.
   ───────────────────────────────────────────────────────────── */
const BG = "#ffffff";

/** Radio de las esquinas cóncavas (inverse border-radius). */
const R = 40;

export interface AldeaV3HeroProps {
  /** Headline (acepta ReactNode para <br/>, <span>, etc.) */
  title?: React.ReactNode;
  /** Subtítulo descriptivo */
  subtitle?: string;
  /** Texto del botón CTA */
  primaryButtonLabel?: string;
  /** Click handler del botón CTA */
  onPrimaryClick?: () => void;
  /** Botón secundario opcional */
  secondaryButton?: { label: string; href: string };
}

export function AldeaV3Hero({
  title = (
    <>
      Designing Spaces
      <br />
      That Inspire &amp; Endure
    </>
  ),
  subtitle = "We transform visions into timeless architecture, blending innovative design with functional excellence.",
  primaryButtonLabel = "Schedule a Free Consultation",
  onPrimaryClick,
  secondaryButton,
}: AldeaV3HeroProps) {
  return (
    <section className="relative w-full" style={{ background: BG }}>
      {/* Padding exterior — la tarjeta hero "flota" sobre el fondo */}
      <div className="p-2 sm:p-3 md:p-4 lg:p-5">
        {/* ════════════════  HERO CARD  ════════════════ */}
        <div
          className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl"
          style={{
            minHeight: "calc(100dvh - var(--navbar-height, 4rem) - 2.5rem)",
          }}
        >
          {/* ── Imagen de fondo ── */}
          <Image
            src={HERO_IMAGE}
            alt="Hero background — arquitectura premium"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />

          {/* ── Gradientes para legibilidad del texto ── */}
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background: [
                "linear-gradient(to top, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.12) 50%, transparent 100%)",
                "linear-gradient(to right, rgba(0,0,0,0.38) 0%, transparent 55%)",
              ].join(", "),
            }}
          />

          {/* ── Headline + Subtitle ──
               En mobile: texto + botón inline sobre la imagen.
               En desktop (md+): texto arriba del shelf blanco. */}
          <div
            className={[
              "absolute z-20 max-w-lg lg:max-w-xl",
              "left-6 sm:left-8 md:left-10 lg:left-14",
              "bottom-8 sm:bottom-10 md:bottom-32 lg:bottom-36",
            ].join(" ")}
          >
            <h1 className="text-[1.75rem] leading-[1.13] font-bold tracking-tight text-white sm:text-4xl md:text-[2.75rem] lg:text-[3.25rem]">
              {title}
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80 sm:mt-4 sm:text-[15px] md:text-base">
              {subtitle}
            </p>

            {/* CTA — SOLO mobile / tablet (< md) */}
            <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-6 md:hidden">
              <button
                type="button"
                onClick={onPrimaryClick}
                className="inline-flex items-center rounded-full bg-[#1a1a1a] px-5 py-2.5 text-sm font-medium text-white shadow-xl transition-colors hover:bg-[#2a2a2a]"
              >
                {primaryButtonLabel}
              </button>

              {secondaryButton && (
                <a
                  href={secondaryButton.href}
                  className="inline-flex items-center rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  {secondaryButton.label}
                </a>
              )}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════
               SHELF BLANCO + ESQUINAS CÓNCAVAS — solo desktop (md+)
               Repisa rectangular compacta que envuelve el botón,
               con dos fillets SVG para lograr un recorte orgánico
               sin ángulos duros.
             ══════════════════════════════════════════════════════ */}
          <div
            /* className="absolute bottom-0 left-0 z-10 hidden md:flex items-center pl-10 pr-8 py-6 lg:pl-14 lg:pr-10 lg:py-8" */
            className="absolute bottom-0 left-0 z-10 hidden md:flex items-center pl-0 pr-6 py-6 lg:pl-0 lg:pr-6 lg:py-6"
            style={{
              background: BG,
              borderTopRightRadius: R,
            }}
          >
            {/* ── Fillet Superior (Top-Left) ──
                 Conecta el borde izquierdo de la imagen con el borde superior del shelf */}
            <svg
              className="absolute pointer-events-none"
              style={{ bottom: "100%", left: 0, width: R, height: R }}
              viewBox="0 0 100 100"
              fill={BG}
            >
              <path d="M 0 0 C 0 55.23, 44.77 100, 100 100 L 0 100 Z" />
            </svg>

            {/* ── Fillet Derecho (Bottom-Right) ──
                 Conecta el borde derecho del shelf con el borde inferior de la imagen */}
            <svg
              className="absolute pointer-events-none"
              style={{ bottom: 0, left: "100%", width: R, height: R }}
              viewBox="0 0 100 100"
              fill={BG}
            >
              <path d="M 0 0 C 0 55.23, 44.77 100, 100 100 L 0 100 Z" />
            </svg>

            {/* ── CTA Button ── */}
            <button
              type="button"
              onClick={onPrimaryClick}
              className="inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] px-10 py-2.5 text-[15px] font-medium text-white transition-all duration-300 hover:bg-[#2a2a2a] md:px-7 md:py-3 lg:px-8 lg:py-3.5"
            >
              {primaryButtonLabel}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
