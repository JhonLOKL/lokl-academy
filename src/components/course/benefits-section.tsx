"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/design-system";
import { ChartBar, BookOpen, Users, TrendingUp } from "lucide-react";

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      title: "Aprende mientras inviertes",
      description: "Adquiere conocimientos financieros mientras tus inversiones generan rendimientos en proyectos inmobiliarios reales.",
      icon: <ChartBar className="h-8 w-8 text-[#5352F6]" />,
    },
    {
      title: "Contenido de alta calidad",
      description: "Cursos creados por expertos del sector inmobiliario con experiencia práctica y resultados comprobados.",
      icon: <BookOpen className="h-8 w-8 text-[#5352F6]" />,
    },
    {
      title: "Comunidad de inversores",
      description: "Conecta con otros estudiantes e inversores para compartir experiencias y ampliar tu red de contactos.",
      icon: <Users className="h-8 w-8 text-[#5352F6]" />,
    },
    {
      title: "Crecimiento constante",
      description: "Desarrolla habilidades que te permitirán tomar mejores decisiones financieras y aumentar tu patrimonio.",
      icon: <TrendingUp className="h-8 w-8 text-[#5352F6]" />,
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            ¿Por qué estudiar en <span className="text-[#5352F6]">LOKL Academy</span>?
          </h2>
          <p className="mx-auto max-w-2xl text-[#6D6C6C]">
            Crece con tus inversiones mientras adquieres conocimientos valiosos sobre el mercado inmobiliario, 
            recibiendo rentas y beneficios de tus inversiones.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="flex flex-col rounded-lg border border-[#E5E5E5] bg-white p-6 shadow-sm transition-all hover:border-[#5352F6] hover:shadow-md"
            >
              <div className="mb-4 rounded-lg bg-[#EEEEFE] p-3 inline-flex">
                {benefit.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold">{benefit.title}</h3>
              <p className="text-[#6D6C6C]">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-lg bg-[#F5F5F5] p-8 md:p-12">
          <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between">
            <div className="mb-8 md:mb-0 md:max-w-xl">
              <h3 className="mb-4 text-2xl font-bold md:text-3xl">
                Invierte y aprende simultáneamente
              </h3>
              <p className="mb-6 text-[#6D6C6C]">
                En LOKL Academy no solo adquieres conocimientos teóricos, sino que puedes ponerlos en práctica 
                inmediatamente invirtiendo en proyectos reales. Aprende sobre inversiones inmobiliarias mientras 
                recibes rentas y beneficios de tu inversión.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#5352F6] text-white">
                    ✓
                  </div>
                  <p>Acceso a proyectos inmobiliarios exclusivos</p>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#5352F6] text-white">
                    ✓
                  </div>
                  <p>Rendimientos superiores al mercado tradicional</p>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#5352F6] text-white">
                    ✓
                  </div>
                  <p>Asesoramiento personalizado para inversores</p>
                </div>
              </div>
              <Button className="mt-6" size="lg">Conocer proyectos</Button>
            </div>
            
            <div className="relative h-64 w-full md:h-80 md:w-80">
              <Image
                src="/images/modern-building.jpg"
                alt="Edificio moderno de inversión LOKL"
                fill
                className="rounded-lg object-cover grayscale"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
