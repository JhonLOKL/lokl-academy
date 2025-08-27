"use client";

import React from "react";
import { Navbar, Footer, Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/design-system";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function DesignSystemPage() {
  const sections = [
    {
      title: "Botones",
      description: "Diferentes variantes y tamaños de botones para todas las necesidades",
      href: "/design-system/buttons",
      color: "bg-[#5352F6]"
    },
    {
      title: "Formularios",
      description: "Campos de entrada y controles de formulario",
      href: "/design-system/forms",
      color: "bg-[#0F0F0F]"
    },
    {
      title: "Tarjetas",
      description: "Diferentes tipos de tarjetas para mostrar información",
      href: "/design-system/cards",
      color: "bg-[#5352F6]"
    },
    {
      title: "Gráficos",
      description: "Visualización de datos y progreso",
      href: "/design-system/charts",
      color: "bg-[#0F0F0F]"
    },
    {
      title: "Layouts",
      description: "Secciones y estructuras para construir páginas completas",
      href: "/design-system/layouts",
      color: "bg-[#5352F6]"
    },
    {
      title: "Colores",
      description: "Paleta de colores y aplicaciones",
      href: "/design-system/colors",
      color: "bg-[#0F0F0F]"
    },
    {
      title: "Iconos",
      description: "Iconografía lineal minimalista",
      href: "/design-system/icons",
      color: "bg-[#5352F6]"
    },
    {
      title: "Tarjetas Visuales",
      description: "Tarjetas con imágenes y diferentes estilos visuales",
      href: "/design-system/visual-cards",
      color: "bg-[#0F0F0F]"
    },
    {
      title: "Tipografía",
      description: "Componentes tipográficos avanzados",
      href: "/design-system/typography",
      color: "bg-[#5352F6]"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        logo={<span className="text-xl font-bold">LOKL <span className="text-[#5352F6]">Design System</span></span>}
        items={[
          { label: "Proyectos", href: "https://lokl.life/", external: true },
          { label: "Contáctanos", href: "https://api.whatsapp.com/send/?phone=573017328112", external: true },
          { label: "Nosotros", href: "https://lokl.life/aboutus", external: true },
          { label: "Embajadores", href: "https://lokl.life/ambassadors", external: true },
          { label: "Inicia sesión", href: "https://lokl.life/login?redirect_to=/", external: true },
          { label: "Regístrate", href: "https://lokl.life/register?redirect_to=/", external: true },
        ]}
      />

      <div className="bg-[#F5F5F5] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight">
              LOKL <span className="text-[#5352F6]">Design System</span>
            </h1>
            <p className="mb-8 text-xl text-[#6D6C6C]">
              Un sistema de diseño moderno, minimalista y profesional para la plataforma LOKL, 
              con componentes reutilizables y coherentes para crear interfaces de alta calidad.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg">Explorar componentes</Button>
              <Button variant="secondary" size="lg">Ver documentación</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="mb-12 text-3xl font-bold">Componentes del Design System</h2>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, index) => (
            <Link href={section.href} key={index} className="block h-full">
              <Card className="h-full transition-transform hover:translate-y-[-4px]">
                <CardHeader>
                  <div className={`mb-4 h-3 w-12 rounded-full ${section.color}`}></div>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between pt-4">
                  <span className="text-sm font-medium text-[#5352F6]">Ver detalles</span>
                  <ChevronRight size={16} className="text-[#5352F6]" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-[#F5F5F5] py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">Principios del Design System</h2>
            <p className="mb-12 text-[#6D6C6C]">
              Nuestro sistema de diseño se basa en principios fundamentales que aseguran coherencia, 
              usabilidad y escalabilidad en todas las interfaces de LOKL.
            </p>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-white p-6 text-left shadow-sm">
                <h3 className="mb-3 text-xl font-semibold">Coherencia</h3>
                <p className="text-[#6D6C6C]">
                  Mantenemos un lenguaje visual consistente en toda la plataforma, 
                  facilitando el reconocimiento y la familiaridad para los usuarios.
                </p>
              </div>
              
              <div className="rounded-lg bg-white p-6 text-left shadow-sm">
                <h3 className="mb-3 text-xl font-semibold">Minimalismo</h3>
                <p className="text-[#6D6C6C]">
                  Priorizamos la simplicidad y la claridad, eliminando elementos innecesarios 
                  para centrarnos en lo esencial de cada interacción.
                </p>
              </div>
              
              <div className="rounded-lg bg-white p-6 text-left shadow-sm">
                <h3 className="mb-3 text-xl font-semibold">Modularidad</h3>
                <p className="text-[#6D6C6C]">
                  Construimos componentes reutilizables que se pueden combinar de múltiples 
                  formas para crear interfaces complejas y coherentes.
                </p>
              </div>
              
              <div className="rounded-lg bg-white p-6 text-left shadow-sm">
                <h3 className="mb-3 text-xl font-semibold">Accesibilidad</h3>
                <p className="text-[#6D6C6C]">
                  Diseñamos para todos los usuarios, asegurando que nuestras interfaces 
                  sean inclusivas y fáciles de usar para personas con diferentes capacidades.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer variant="default" />
    </div>
  );
}