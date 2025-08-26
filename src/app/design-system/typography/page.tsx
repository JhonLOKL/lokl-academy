"use client";

import React from "react";
import {
  Navbar,
  Footer,
  Heading,
  HighlightHeading,
  MultiStyleHeading,
} from "@/components/design-system";

export default function TypographyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar
        logo={<span className="text-xl font-bold">LOKL <span className="text-[#5352F6]">Design System</span></span>}
        items={[
          { label: "Componentes", href: "/design-system" },
          { label: "Tarjetas Visuales", href: "/design-system/visual-cards" },
          { label: "Tipografía", href: "/design-system/typography", active: true },
        ]}
      />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight">Tipografía LOKL</h1>
          <p className="text-[#6D6C6C] max-w-3xl">
            Componentes de tipografía avanzados con combinaciones de estilos, pesos y colores, manteniendo una buena estructura SEO.
          </p>
        </div>

        {/* Basic Headings */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Headings Básicos</h2>
          <div className="space-y-8">
            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <Heading
                level={1}
                parts={[{ text: "EMBAJADOR LOKL", weight: "bold" }]}
              />
              <p className="mt-2 text-sm text-[#6D6C6C]">Estilo: Regular Italic + Bold Purple • Identidad de marca personal</p>
            </div>

            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <Heading
                level={2}
                parts={[
                  { text: "EL ", weight: "light" },
                  { text: "FUTURO ", weight: "bold" },
                  { text: "DE LAS INVERSIONES ", weight: "regular" },
                  { text: "ES HOY", weight: "black" },
                ]}
              />
              <p className="mt-2 text-sm text-[#6D6C6C]">Estilo: Light + Regular Italic + Light + Bold • Inspiracional y visionario</p>
            </div>

            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <Heading
                level={3}
                parts={[
                  { text: "RENTABILIDAD ", weight: "bold" },
                  { text: "GARANTIZADA", weight: "light", italic: true },
                ]}
              />
              <p className="mt-2 text-sm text-[#6D6C6C]">Estilo: Bold + Light Italic • Fuerza y elegancia</p>
            </div>
          </div>
        </section>

        {/* Colored Headings */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Headings con Color</h2>
          <div className="space-y-8">
            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <Heading
                level={1}
                parts={[
                  { text: "EMBAJADOR ", weight: "regular" },
                  { text: "LOKL", weight: "bold", color: "purple" },
                ]}
              />
              <p className="mt-2 text-sm text-[#6D6C6C]">Estilo: Regular + Bold Purple • Identidad de marca destacada</p>
            </div>

            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <Heading
                level={2}
                parts={[
                  { text: "PARA LA ", weight: "light" },
                  { text: "NUEVA GENERACIÓN ", weight: "bold" },
                  { text: "DE INVERSIONISTAS", weight: "regular" },
                ]}
              />
              <p className="mt-2 text-sm text-[#6D6C6C]">Estilo: Light Italic + Semibold + Light Italic • Modernidad generacional</p>
            </div>

            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <Heading
                level={2}
                parts={[
                  { text: "INVERSIÓN ", weight: "bold", color: "purple" },
                  { text: "REALMENTE INTELIGENTE", weight: "light", italic: true },
                ]}
              />
              <p className="mt-2 text-sm text-[#6D6C6C]">Estilo: Bold Purple + Light Italic + Light • Contraste peso y color</p>
            </div>
          </div>
        </section>

        {/* Multi-style Headings */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Combinaciones Avanzadas</h2>
          <div className="space-y-8">
            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <MultiStyleHeading
                level={1}
                firstPart={{ text: "ÚNETE A ", weight: "light" }}
                secondPart={{ text: "LOKL", weight: "bold", color: "purple" }}
              />
              <p className="mt-2 text-sm text-[#6D6C6C]">Estilo: Light + Bold Purple • Contraste de peso y color</p>
            </div>

            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <MultiStyleHeading
                level={2}
                firstPart={{ text: "Y TRANSFORMA ", weight: "light" }}
                secondPart={{ text: "TU FUTURO", weight: "bold", color: "purple" }}
              />
              <p className="mt-2 text-sm text-[#6D6C6C]">Estilo: Light + Bold Purple + Light Italic + Bold Purple • Identidad marca fuerte</p>
            </div>

            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <MultiStyleHeading
                level={1}
                firstPart={{ text: "LA ", weight: "light" }}
                secondPart={{ text: "EXPERIENCIA LOKL", weight: "semibold", color: "purple", italic: true }}
              />
              <p className="mt-2 text-sm text-[#6D6C6C]">Estilo: Light + Semibold Purple Italic + Light + Light Italic • Elegancia cursiva</p>
            </div>
          </div>
        </section>

        {/* Highlight Headings */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Headings con Resaltado</h2>
          <div className="space-y-8">
            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <HighlightHeading
                level={1}
                text="QUE BUSCABAS"
                highlight="QUE"
                highlightColor="purple"
                baseWeight="light"
              />
              <p className="mt-2 text-sm text-[#6D6C6C]">Estilo: Resaltado en púrpura con peso diferente</p>
            </div>

            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <HighlightHeading
                level={2}
                text="CONSTRUYE PATRIMONIO CON LOKL"
                highlight="PATRIMONIO"
                highlightColor="purple"
                baseWeight="regular"
                highlightWeight="bold"
              />
              <p className="mt-2 text-sm text-[#6D6C6C]">Estilo: Light + Bold Purple Italic + Light + Bold Purple • Aspiracional marcado</p>
            </div>

            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <HighlightHeading
                level={3}
                text="TECNOLOGÍA FINANCIERA PARA TODOS"
                highlight="TECNOLOGÍA"
                highlightColor="purple"
                baseWeight="light"
                highlightWeight="semibold"
              />
              <p className="mt-2 text-sm text-[#6D6C6C]">Estilo: Semibold Purple + Light Italic + Light + Bold Purple • Inclusión tecnológica</p>
            </div>
          </div>
        </section>

        {/* Different Backgrounds */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Fondos Diferentes</h2>
          <div className="space-y-8">
            <div className="rounded-lg bg-black p-6">
              <Heading
                level={1}
                parts={[
                  { text: "PLATAFORMA ", weight: "bold", color: "purple" },
                  { text: "100% ", weight: "bold", color: "white" },
                  { text: "DIGITAL", weight: "light", color: "purple", italic: true },
                ]}
                theme="dark"
              />
              <p className="mt-2 text-sm text-[#D1D1D1]">Estilo: Bold Purple + Light + Light Italic Purple • Tecnología destacada</p>
            </div>

            <div className="rounded-lg bg-[#5352F6] p-6">
              <Heading
                level={2}
                parts={[
                  { text: "UNA ", weight: "light", color: "white" },
                  { text: "COMUNIDAD ", weight: "semibold", color: "white" },
                  { text: "QUE CRECE CONTIGO", weight: "regular", color: "white", italic: true },
                ]}
                theme="purple"
              />
              <p className="mt-2 text-sm text-white opacity-80">Estilo: Light Italic + Semibold Purple + Light + Regular Purple Italic • Social elegante</p>
            </div>

            <div className="rounded-lg bg-[#F5F5F5] p-6">
              <Heading
                level={3}
                parts={[
                  { text: "REVOLUCIONANDO ", weight: "bold", color: "purple" },
                  { text: "LAS INVERSIONES ", weight: "light" },
                  { text: "INMOBILIARIAS", weight: "bold" },
                ]}
              />
              <p className="mt-2 text-sm text-[#6D6C6C]">Estilo: Bold Purple + Light + Light Italic • Revolución y elegancia</p>
            </div>
          </div>
        </section>

        {/* Contraste Tipográfico */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Contraste Tipográfico</h2>
          <div className="space-y-8">
            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <Heading
                level={2}
                parts={[
                  { text: "PREGUNTAS ", weight: "regular" },
                  { text: "FRECUENTES", weight: "bold" },
                ]}
              />
              <p className="mt-2 text-sm text-[#6D6C6C]">Estilo: Regular + Bold • Contraste sutil y elegante</p>
            </div>

            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <Heading
                level={1}
                parts={[
                  { text: "ACUMULA ", weight: "light" },
                  { text: "PUNTOS", weight: "black" },
                ]}
              />
              <p className="mt-2 text-sm text-[#6D6C6C]">Estilo: Light + Semibold • Contraste suave y profesional</p>
            </div>

            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <Heading
                level={2}
                parts={[
                  { text: "GANA ", weight: "light" },
                  { text: "RECOMPENSAS ", weight: "bold" },
                  { text: "ADICIONALES", weight: "light", italic: true },
                ]}
              />
              <p className="mt-2 text-sm text-[#6D6C6C]">Estilo: Light + Bold + Light Italic • Combinación armoniosa</p>
            </div>

            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <Heading
                level={1}
                parts={[
                  { text: "CONSTRUYE TU ", weight: "light", italic: true },
                  { text: "PATRIMONIO", weight: "black" },
                ]}
              />
              <p className="mt-2 text-sm text-[#6D6C6C]">Estilo: Light Italic + Bold • Contraste dinámico y aspiracional</p>
            </div>
          </div>
        </section>
      </main>

      <Footer variant="simple" />
    </div>
  );
}
