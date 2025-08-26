"use client";

import React from "react";
import { Button, Navbar, Footer } from "@/components/design-system";
import { ArrowRight, Check, User } from "lucide-react";

export default function ButtonsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar
        logo={<span className="text-xl font-bold">LOKL <span className="text-[#5352F6]">Design System</span></span>}
        items={[
          { label: "Componentes", href: "/design-system" },
          { label: "Botones", href: "/design-system/buttons", active: true },
          { label: "Formularios", href: "/design-system/forms" },
          { label: "Tarjetas", href: "/design-system/cards" },
          { label: "Gráficos", href: "/design-system/charts" },
          { label: "Layouts", href: "/design-system/layouts" },
          { label: "Colores", href: "/design-system/colors" },
          { label: "Iconos", href: "/design-system/icons" },
          { label: "Tarjetas Visuales", href: "/design-system/visual-cards" },
          { label: "Tipografía", href: "/design-system/typography" },
        ]}
      />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight">Botones LOKL</h1>
          <p className="text-[#6D6C6C] max-w-3xl">
            Componentes de botones diseñados con diferentes variantes, tamaños y estados para todas las necesidades de interacción.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Variantes</h2>
          <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
            <div className="flex flex-wrap gap-4">
              <Button>Primario</Button>
              <Button variant="secondary">Secundario</Button>
              <Button variant="dark">Oscuro</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="mt-8">
              <p className="text-sm text-[#6D6C6C]">
                Las variantes de botones permiten diferentes niveles de énfasis visual, desde el botón primario con mayor peso visual hasta el botón link con el menor.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Tamaños</h2>
          <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Pequeño</Button>
              <Button>Mediano (Default)</Button>
              <Button size="lg">Grande</Button>
            </div>
            <div className="mt-8">
              <p className="text-sm text-[#6D6C6C]">
                Diferentes tamaños para adaptarse a distintos contextos de UI. El tamaño mediano es el estándar para la mayoría de las interacciones.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Con iconos</h2>
          <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
            <div className="flex flex-wrap gap-4">
              <Button leftIcon={<Check />}>Con icono izquierdo</Button>
              <Button rightIcon={<ArrowRight />}>Con icono derecho</Button>
              <Button variant="secondary" leftIcon={<User />}>Perfil</Button>
              <Button variant="dark" rightIcon={<ArrowRight />}>Siguiente</Button>
              <Button variant="outline" leftIcon={<Check />}>Seleccionar</Button>
            </div>
            <div className="mt-8">
              <p className="text-sm text-[#6D6C6C]">
                Los iconos pueden añadirse a la izquierda o derecha del texto para mejorar la comprensión y el contexto de la acción.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Estados</h2>
          <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
            <div className="space-y-8">
              <div>
                <h3 className="mb-3 text-lg font-semibold">Estado Normal</h3>
                <div className="flex flex-wrap gap-4">
                  <Button>Primario</Button>
                  <Button variant="secondary">Secundario</Button>
                  <Button variant="dark">Oscuro</Button>
                </div>
              </div>
              
              <div>
                <h3 className="mb-3 text-lg font-semibold">Estado Hover</h3>
                <div className="flex flex-wrap gap-4">
                  <Button className="opacity-90 hover:opacity-90">Primario Hover</Button>
                  <Button variant="secondary" className="opacity-90 hover:opacity-90">Secundario Hover</Button>
                  <Button variant="dark" className="opacity-90 hover:opacity-90">Oscuro Hover</Button>
                </div>
              </div>
              
              <div>
                <h3 className="mb-3 text-lg font-semibold">Estado Deshabilitado</h3>
                <div className="flex flex-wrap gap-4">
                  <Button disabled>Primario Deshabilitado</Button>
                  <Button variant="secondary" disabled>Secundario Deshabilitado</Button>
                  <Button variant="dark" disabled>Oscuro Deshabilitado</Button>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-sm text-[#6D6C6C]">
                Los botones tienen diferentes estados visuales para indicar su interactividad: normal, hover y deshabilitado.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Combinaciones</h2>
          <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-lg font-semibold">Botones de llamada a la acción (CTA)</h3>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" leftIcon={<Check />}>Comenzar ahora</Button>
                  <Button size="lg" variant="secondary" rightIcon={<ArrowRight />}>Explorar opciones</Button>
                </div>
              </div>
              
              <div>
                <h3 className="mb-3 text-lg font-semibold">Botones de formulario</h3>
                <div className="flex flex-wrap gap-4">
                  <Button>Guardar</Button>
                  <Button variant="outline">Cancelar</Button>
                </div>
              </div>
              
              <div>
                <h3 className="mb-3 text-lg font-semibold">Botones de navegación</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="ghost" size="sm">Anterior</Button>
                  <Button size="sm" rightIcon={<ArrowRight />}>Siguiente</Button>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-sm text-[#6D6C6C]">
                Ejemplos de combinaciones comunes de botones para diferentes contextos de interfaz de usuario.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer variant="simple" />
    </div>
  );
}
