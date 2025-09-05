"use client";

import React from "react";
import Image from "next/image";
import { Button, Card, CardContent, H2, H3, Paragraph, BenefitCard, BenefitCardGroup } from "@/components/design-system";
import { ChartBar, BookOpen, Users, TrendingUp, Check } from "lucide-react";

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
          <H2 className="mb-4">
            ¿Por qué estudiar en <span className="text-[#5352F6]">LOKL Academy</span>?
          </H2>
          <Paragraph className="mx-auto max-w-2xl text-[#6D6C6C]">
            Crece con tus inversiones mientras adquieres conocimientos valiosos sobre el mercado inmobiliario, 
            recibiendo rentas y beneficios de tus inversiones.
          </Paragraph>
        </div>

        <BenefitCardGroup className="gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <BenefitCard 
              key={index}
              title={benefit.title}
              description={benefit.description}
              icon={benefit.icon}
              className="hover:border-[#5352F6] hover:shadow-md transition-all"
            />
          ))}
        </BenefitCardGroup>

        <Card className="mt-16 overflow-hidden border-none shadow-lg">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="p-8 md:p-12 md:w-1/2">
                <H3 className="mb-4 text-2xl font-bold md:text-3xl">
                  Invierte y aprende <span className="text-[#5352F6]">simultáneamente</span>
                </H3>
                <Paragraph className="mb-6 text-[#6D6C6C]">
                  En LOKL Academy no solo adquieres conocimientos teóricos, sino que puedes ponerlos en práctica 
                  inmediatamente invirtiendo en proyectos reales. Aprende sobre inversiones inmobiliarias mientras 
                  recibes rentas y beneficios de tu inversión.
                </Paragraph>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#5352F6] text-white">
                      <Check size={14} />
                    </div>
                    <Paragraph>Acceso a proyectos inmobiliarios exclusivos</Paragraph>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#5352F6] text-white">
                      <Check size={14} />
                    </div>
                    <Paragraph>Rendimientos superiores al mercado tradicional</Paragraph>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#5352F6] text-white">
                      <Check size={14} />
                    </div>
                    <Paragraph>Asesoramiento personalizado para inversores</Paragraph>
                  </div>
                </div>
                <Button className="mt-8" size="lg">Conocer proyectos</Button>
              </div>
              
              <div className="group relative md:w-1/2 h-[300px] md:h-auto overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Edificio moderno de inversión LOKL"
                  fill
                  className="object-cover object-center transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20 transition-opacity duration-300"></div>
                <div className="absolute top-8 left-8 z-10">
                  <div className="mb-2 inline-flex rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-[#0F0F0F]">
                    Proyectos exclusivos
                  </div>
                  <div className="mt-4 max-w-xs">
                    <div className="mb-1 text-lg font-bold text-white">Edificios de alto rendimiento</div>
                    <div className="text-sm text-white/80">Oportunidades de inversión con retornos superiores al mercado</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BenefitsSection;
