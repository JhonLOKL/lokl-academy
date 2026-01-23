"use client";

import React from "react";
import {
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "./image-with-fallback";

type GtagFunction = {
  (command: "js", date: Date): void;
  (command: "config", id: string, params?: Record<string, unknown>): void;
  (command: "event", action: string, parameters?: Record<string, unknown>): void;
};

interface WindowWithGtag extends Window {
  gtag?: GtagFunction;
}

const TALLY_OPPORTUNITIES_URL = "https://tally.so/r/n02GXy";
const BANNER_IMAGE_URL =
  "https://lokl-assets.s3.us-east-1.amazonaws.com/home/Banner_opportunity.webp";

export default function ProjectOpportunitiesCTA() {
  const handleOpenTally = () => {
    if (typeof window !== "undefined") {
      const w = window as WindowWithGtag;
      w.gtag?.("event", "project_opportunity_form_click", {
        event_category: "Lead Generation",
        event_label: "CTA Project Opportunities (Tally)",
      });
      window.open(TALLY_OPPORTUNITIES_URL, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section
      id="oportunidades"
      className="pt-12 pb-12 md:pt-16 md:pb-16 bg-[#F3F3F3]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden min-h-[320px] md:min-h-[360px]">
          {/* Imagen de fondo: ocupa TODO el banner */}
          <ImageWithFallback
            src={BANNER_IMAGE_URL}
            alt="Banner de oportunidades LOKL"
            fill
            className="absolute inset-0 w-full h-full object-cover"
            priority={false}
            quality={85}
            sizes="(max-width: 768px) 100vw, 1280px"
          />

          {/* Contenido encima, alineado a la izquierda */}
          <div className="relative z-10 h-full p-6 md:p-10 flex items-center">
            <div className="max-w-xl w-full">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-left text-white">
              ¿Tienes un terreno? Crea un impacto con nosotros.
              </h2>

              <p className="text-white/90 text-base md:text-lg text-left">
                Si tienes un terreno, un proyecto en desarrollo o un negocio inmobiliario, queremos conocerlo.
              </p>

              <div className="mt-8 flex justify-start">
                <Button
                  onClick={handleOpenTally}
                  size="lg"
                  className="bg-white hover:bg-white text-[#5352F6] transition-none font-semibold w-full sm:w-auto"
                >
                  Hagámoslo realidad
                  <ArrowRight className="w-4 h-4 ml-2 text-[#5352F6]" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

