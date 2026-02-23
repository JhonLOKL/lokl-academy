"use client";

import React from "react";
import { Navbar, Footer, Button, Card, CardHeader, CardTitle, CardDescription, CardContent, H1, H2, H3, Paragraph } from "@/components/design-system";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { urls } from "@/config/urls";

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
    },
    {
      title: "Dashboard",
      description: "Componentes de graficas, indicadores y tablas",
      href: "/design-system/dashboard",
      color: "bg-[#0F0F0F]"
    },
    {
      title: "Modales y pop-ups",
      description: "Componentes de modales y pop-ups",
      href: "/design-system/modals",
      color: "bg-[#5352F6]"
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        logo={<span className="text-xl font-bold">LOKL <span className="text-[#5352F6]">Design System</span></span>}
        items={[
          { label: "Proyectos", href: urls.SITE_URL },
          { label: "Contáctanos", href: "https://api.whatsapp.com/send/?phone=573017328112" },
          { label: "Nosotros", href: `${urls.SITE_URL}/about-us` },
          { label: "Embajadores", href: `${urls.SITE_URL}/ambassadors` },
        ]}
        actions={
          <div className="flex items-center space-x-4">
            <a
              href={`${urls.SITE_URL}/login?redirect_to=/` }
              className="text-sm font-medium text-[#0F0F0F] transition-colors hover:text-[#5352F6]"
            >
              Inicia sesión
            </a>
            <a
              href={`${urls.SITE_URL}/register?redirect_to=/`}
              className="rounded-md bg-[#5352F6] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4A4AE5]"
            >
              Regístrate
            </a>
          </div>
        }
      />

      <div className="bg-[#F5F5F5] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <H1 variant="hero" className="mb-6">
              LOKL <span className="text-[#5352F6]">Design System</span>
            </H1>
            <Paragraph variant="lead" color="muted" className="mb-8">
              Un sistema de diseño moderno, minimalista y profesional para la plataforma LOKL, 
              con componentes reutilizables y coherentes para crear interfaces de alta calidad.
            </Paragraph>
            <div className="flex flex-wrap gap-4">
              <Button size="lg">Explorar componentes</Button>
              <Button variant="secondary" size="lg">Ver documentación</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <H2 variant="section" className="mb-12">Componentes del Design System</H2>
        
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
            <H2 variant="section" className="mb-6">Principios del Design System</H2>
            <Paragraph variant="lead" color="muted" className="mb-12">
              Nuestro sistema de diseño se basa en principios fundamentales que aseguran coherencia, 
              usabilidad y escalabilidad en todas las interfaces de LOKL.
            </Paragraph>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-white p-6 text-left shadow-sm">
                <H3 variant="feature" className="mb-3">Coherencia</H3>
                <Paragraph color="muted">
                  Mantenemos un lenguaje visual consistente en toda la plataforma, 
                  facilitando el reconocimiento y la familiaridad para los usuarios.
                </Paragraph>
              </div>
              
              <div className="rounded-lg bg-white p-6 text-left shadow-sm">
                <H3 variant="feature" className="mb-3">Minimalismo</H3>
                <Paragraph color="muted">
                  Priorizamos la simplicidad y la claridad, eliminando elementos innecesarios 
                  para centrarnos en lo esencial de cada interacción.
                </Paragraph>
              </div>
              
              <div className="rounded-lg bg-white p-6 text-left shadow-sm">
                <H3 variant="feature" className="mb-3">Modularidad</H3>
                <Paragraph color="muted">
                  Construimos componentes reutilizables que se pueden combinar de múltiples 
                  formas para crear interfaces complejas y coherentes.
                </Paragraph>
              </div>
              
              <div className="rounded-lg bg-white p-6 text-left shadow-sm">
                <H3 variant="feature" className="mb-3">Accesibilidad</H3>
                <Paragraph color="muted">
                  Diseñamos para todos los usuarios, asegurando que nuestras interfaces 
                  sean inclusivas y fáciles de usar para personas con diferentes capacidades.
                </Paragraph>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer variant="default" />
    </div>
  );
}