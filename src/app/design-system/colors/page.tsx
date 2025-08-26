"use client";

import React from "react";
import { Navbar, Footer, Button } from "@/components/design-system";

export default function ColorsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar
        logo={<span className="text-xl font-bold">LOKL <span className="text-[#5352F6]">Design System</span></span>}
        items={[
          { label: "Componentes", href: "/design-system" },
          { label: "Botones", href: "/design-system/buttons" },
          { label: "Formularios", href: "/design-system/forms" },
          { label: "Tarjetas", href: "/design-system/cards" },
          { label: "Gráficos", href: "/design-system/charts" },
          { label: "Layouts", href: "/design-system/layouts" },
          { label: "Colores", href: "/design-system/colors", active: true },
          { label: "Iconos", href: "/design-system/icons" },
          { label: "Tarjetas Visuales", href: "/design-system/visual-cards" },
          { label: "Tipografía", href: "/design-system/typography" },
        ]}
      />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight">Paleta de Colores LOKL</h1>
          <p className="text-[#6D6C6C] max-w-3xl">
            Sistema de colores diseñado para transmitir profesionalismo, confianza y modernidad, con un enfoque minimalista y elegante.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Color Primario</h2>
          <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <div className="mb-4 h-40 rounded-lg bg-[#5352F6] shadow-md"></div>
                <div className="space-y-2">
                  <p className="text-lg font-semibold">Púrpura Primario</p>
                  <p className="font-mono text-sm text-[#6D6C6C]">HEX: #5352F6</p>
                  <p className="font-mono text-sm text-[#6D6C6C]">RGB: 83, 82, 246</p>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-lg font-medium">Usos principales:</p>
                <ul className="ml-5 list-disc space-y-2 text-[#6D6C6C]">
                  <li>Color de marca principal</li>
                  <li>Botones de acción primaria</li>
                  <li>Enlaces y elementos interactivos</li>
                  <li>Elementos destacados y acentos</li>
                  <li>Indicadores de progreso</li>
                </ul>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button>Botón Primario</Button>
                  <div className="flex items-center">
                    <span className="text-[#5352F6]">Texto con color primario</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Variaciones del Color Primario</h2>
          <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="mb-3 h-24 rounded-md bg-[#7A79F9] shadow-sm"></div>
                <p className="font-semibold">Púrpura Claro</p>
                <p className="font-mono text-sm text-[#6D6C6C]">#7A79F9</p>
              </div>
              <div>
                <div className="mb-3 h-24 rounded-md bg-[#5352F6] shadow-sm"></div>
                <p className="font-semibold">Púrpura Primario</p>
                <p className="font-mono text-sm text-[#6D6C6C]">#5352F6</p>
              </div>
              <div>
                <div className="mb-3 h-24 rounded-md bg-[#4241C5] shadow-sm"></div>
                <p className="font-semibold">Púrpura Oscuro</p>
                <p className="font-mono text-sm text-[#6D6C6C]">#4241C5</p>
              </div>
              <div>
                <div className="mb-3 h-24 rounded-md bg-[#A1A0FB] shadow-sm"></div>
                <p className="font-semibold">Púrpura Pastel</p>
                <p className="font-mono text-sm text-[#6D6C6C]">#A1A0FB</p>
              </div>
            </div>
            <p className="mt-6 text-sm text-[#6D6C6C]">
              Variaciones del color primario para diferentes necesidades de diseño, como estados hover, elementos secundarios o fondos sutiles.
            </p>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Colores Neutros</h2>
          <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="mb-3 h-24 rounded-md bg-black shadow-sm"></div>
                <p className="font-semibold">Negro</p>
                <p className="font-mono text-sm text-[#6D6C6C]">#000000</p>
              </div>
              <div>
                <div className="mb-3 h-24 rounded-md bg-[#0F0F0F] shadow-sm"></div>
                <p className="font-semibold">Gris Oscuro</p>
                <p className="font-mono text-sm text-[#6D6C6C]">#0F0F0F</p>
              </div>
              <div>
                <div className="mb-3 h-24 rounded-md bg-[#444444] shadow-sm"></div>
                <p className="font-semibold">Gris Medio</p>
                <p className="font-mono text-sm text-[#6D6C6C]">#444444</p>
              </div>
              <div>
                <div className="mb-3 h-24 rounded-md bg-[#6D6C6C] shadow-sm"></div>
                <p className="font-semibold">Gris</p>
                <p className="font-mono text-sm text-[#6D6C6C]">#6D6C6C</p>
              </div>
              <div>
                <div className="mb-3 h-24 rounded-md bg-[#919090] shadow-sm"></div>
                <p className="font-semibold">Gris Claro</p>
                <p className="font-mono text-sm text-[#6D6C6C]">#919090</p>
              </div>
              <div>
                <div className="mb-3 h-24 rounded-md bg-[#D1D1D1] shadow-sm"></div>
                <p className="font-semibold">Gris Muy Claro</p>
                <p className="font-mono text-sm text-[#6D6C6C]">#D1D1D1</p>
              </div>
              <div>
                <div className="mb-3 h-24 rounded-md bg-[#F5F5F5] shadow-sm border border-[#E5E5E5]"></div>
                <p className="font-semibold">Gris Pálido</p>
                <p className="font-mono text-sm text-[#6D6C6C]">#F5F5F5</p>
              </div>
              <div>
                <div className="mb-3 h-24 rounded-md bg-[#FAFAFA] shadow-sm border border-[#E5E5E5]"></div>
                <p className="font-semibold">Blanco Humo</p>
                <p className="font-mono text-sm text-[#6D6C6C]">#FAFAFA</p>
              </div>
            </div>
            <p className="mt-6 text-sm text-[#6D6C6C]">
              Escala de grises para textos, fondos, bordes y elementos de interfaz, proporcionando una base neutra y profesional.
            </p>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Colores Semánticos</h2>
          <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="mb-3 h-24 rounded-md bg-[#22C55E] shadow-sm"></div>
                <p className="font-semibold">Verde Éxito</p>
                <p className="font-mono text-sm text-[#6D6C6C]">#22C55E</p>
              </div>
              <div>
                <div className="mb-3 h-24 rounded-md bg-[#F59E0B] shadow-sm"></div>
                <p className="font-semibold">Amarillo Advertencia</p>
                <p className="font-mono text-sm text-[#6D6C6C]">#F59E0B</p>
              </div>
              <div>
                <div className="mb-3 h-24 rounded-md bg-[#EF4444] shadow-sm"></div>
                <p className="font-semibold">Rojo Error</p>
                <p className="font-mono text-sm text-[#6D6C6C]">#EF4444</p>
              </div>
              <div>
                <div className="mb-3 h-24 rounded-md bg-[#3B82F6] shadow-sm"></div>
                <p className="font-semibold">Azul Información</p>
                <p className="font-mono text-sm text-[#6D6C6C]">#3B82F6</p>
              </div>
            </div>
            <p className="mt-6 text-sm text-[#6D6C6C]">
              Colores con significado semántico para comunicar estados, alertas y mensajes al usuario.
            </p>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Aplicaciones de Color</h2>
          <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
            <h3 className="mb-6 text-xl font-semibold">Texto</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-6 w-6 rounded-full bg-[#0F0F0F]"></div>
                <p className="text-[#0F0F0F] text-lg font-semibold">Texto Principal</p>
                <p className="font-mono text-sm text-[#6D6C6C]">#0F0F0F</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-6 w-6 rounded-full bg-[#6D6C6C]"></div>
                <p className="text-[#6D6C6C] text-lg">Texto Secundario</p>
                <p className="font-mono text-sm text-[#6D6C6C]">#6D6C6C</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-6 w-6 rounded-full bg-[#5352F6]"></div>
                <p className="text-[#5352F6] text-lg font-semibold">Texto Destacado</p>
                <p className="font-mono text-sm text-[#6D6C6C]">#5352F6</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-6 w-6 rounded-full bg-[#919090]"></div>
                <p className="text-[#919090] text-lg">Texto Deshabilitado</p>
                <p className="font-mono text-sm text-[#6D6C6C]">#919090</p>
              </div>
            </div>
            
            <h3 className="mb-6 mt-12 text-xl font-semibold">Fondos</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-6 w-6 rounded-full bg-white border border-[#E5E5E5]"></div>
                <p className="text-lg">Fondo Blanco</p>
                <p className="font-mono text-sm text-[#6D6C6C]">#FFFFFF</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-6 w-6 rounded-full bg-[#FAFAFA] border border-[#E5E5E5]"></div>
                <p className="text-lg">Fondo Claro</p>
                <p className="font-mono text-sm text-[#6D6C6C]">#FAFAFA</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-6 w-6 rounded-full bg-[#F5F5F5]"></div>
                <p className="text-lg">Fondo Gris</p>
                <p className="font-mono text-sm text-[#6D6C6C]">#F5F5F5</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-6 w-6 rounded-full bg-[#0F0F0F]"></div>
                <p className="text-lg">Fondo Oscuro</p>
                <p className="font-mono text-sm text-[#6D6C6C]">#0F0F0F</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-6 w-6 rounded-full bg-[#5352F6]"></div>
                <p className="text-lg">Fondo Acento</p>
                <p className="font-mono text-sm text-[#6D6C6C]">#5352F6</p>
              </div>
            </div>
            
            <h3 className="mb-6 mt-12 text-xl font-semibold">Bordes</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-6 w-20 rounded-md border border-[#E5E5E5]"></div>
                <p className="text-lg">Borde Claro</p>
                <p className="font-mono text-sm text-[#6D6C6C]">#E5E5E5</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-6 w-20 rounded-md border border-[#D1D1D1]"></div>
                <p className="text-lg">Borde Medio</p>
                <p className="font-mono text-sm text-[#6D6C6C]">#D1D1D1</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-6 w-20 rounded-md border-2 border-[#5352F6]"></div>
                <p className="text-lg">Borde Acento</p>
                <p className="font-mono text-sm text-[#6D6C6C]">#5352F6</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Combinaciones de Color</h2>
          <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="overflow-hidden rounded-lg">
                <div className="bg-white p-8">
                  <h3 className="mb-2 text-2xl font-bold text-[#0F0F0F]">Tema Claro</h3>
                  <p className="text-[#6D6C6C]">Texto secundario sobre fondo blanco</p>
                  <div className="mt-4">
                    <Button>Botón Primario</Button>
                  </div>
                </div>
              </div>
              
              <div className="overflow-hidden rounded-lg">
                <div className="bg-[#0F0F0F] p-8">
                  <h3 className="mb-2 text-2xl font-bold text-white">Tema Oscuro</h3>
                  <p className="text-white opacity-80">Texto secundario sobre fondo oscuro</p>
                  <div className="mt-4">
                    <Button>Botón Primario</Button>
                  </div>
                </div>
              </div>
              
              <div className="overflow-hidden rounded-lg">
                <div className="bg-[#5352F6] p-8">
                  <h3 className="mb-2 text-2xl font-bold text-white">Tema Acento</h3>
                  <p className="text-white opacity-90">Texto sobre fondo de color primario</p>
                  <div className="mt-4">
                    <Button variant="outline" className="border-white text-white hover:bg-white/10">
                      Botón Outline
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="overflow-hidden rounded-lg">
                <div className="bg-[#F5F5F5] p-8">
                  <h3 className="mb-2 text-2xl font-bold text-[#0F0F0F]">Tema Gris</h3>
                  <p className="text-[#6D6C6C]">Texto secundario sobre fondo gris claro</p>
                  <div className="mt-4">
                    <Button variant="dark">Botón Oscuro</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer variant="simple" />
    </div>
  );
}
