"use client";

import React from "react";
import { Button } from "@/components/design-system";
import { CheckIcon, XIcon, BookOpen, Users, MessageSquare, Headphones, Clock, Award, BarChart4 } from "lucide-react";

const PlanComparison: React.FC = () => {
  const features = [
    {
      name: "Acceso a blogs",
      icon: BookOpen,
      basic: { text: "Blogs básicos", available: true },
      investor: { text: "Todos los blogs", available: true }
    },
    {
      name: "Cursos",
      icon: BookOpen,
      basic: { text: "Cursos gratuitos", available: true },
      investor: { text: "Todos los cursos", available: true }
    },
    {
      name: "Podcast",
      icon: Headphones,
      basic: { available: true },
      investor: { available: true }
    },
    {
      name: "Herramientas de inversión",
      icon: BarChart4,
      basic: { available: true },
      investor: { available: true }
    },
    {
      name: "Soporte dedicado",
      icon: MessageSquare,
      basic: { available: false },
      investor: { available: true }
    },
    {
      name: "Conferencias en vivo",
      icon: Users,
      basic: { available: false },
      investor: { available: true }
    },
    {
      name: "Acceso a comunidad",
      icon: Users,
      basic: { available: false },
      investor: { available: true }
    },
    {
      name: "Acceso anticipado a proyectos",
      icon: Clock,
      basic: { available: false },
      investor: { available: true }
    },
    {
      name: "Proyectos exclusivos",
      icon: Award,
      basic: { available: false },
      investor: { available: true }
    },
    {
      name: "Certificados incluidos",
      icon: Award,
      basic: { available: false },
      investor: { available: true }
    },
    {
      name: "Rutas y perfiles de inversión",
      icon: BookOpen,
      basic: { available: false },
      investor: { available: true }
    }
  ];

  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border-2 border-[#E5E5E5] bg-white shadow-md">
      {/* Encabezado de la tabla */}
      <div className="grid grid-cols-3 border-b-2 border-[#E5E5E5] bg-[#FAFAFA]">
        <div className="p-6">
          <h3 className="text-xl font-bold text-[#0F0F0F]">Planes</h3>
        </div>
        <div className="p-6 text-center">
          <h3 className="text-xl font-bold">Básico</h3>
          <div className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-600">
            Gratis
          </div>
        </div>
        <div className="p-6 text-center">
          <h3 className="text-xl font-bold text-[#5352F6]">Inversionista</h3>
          <div className="mt-2 inline-block rounded-full bg-[#5352F6]/10 px-3 py-1 text-sm font-medium text-[#5352F6]">
            Exclusivo
          </div>
        </div>
      </div>
      
      {/* Filas de características */}
      {features.map((feature, index) => (
        <div 
          key={feature.name}
          className={`grid grid-cols-3 border-b border-[#E5E5E5] ${index % 2 === 1 ? 'bg-[#FAFAFA]' : ''}`}
        >
          <div className="flex items-center gap-3 p-5">
            {feature.icon && <feature.icon className="h-5 w-5 text-[#5352F6]" />}
            <p className="font-medium">{feature.name}</p>
          </div>
          <div className="flex items-center justify-center p-5">
            {feature.basic.text ? (
              <p className="text-center text-sm">{feature.basic.text}</p>
            ) : (
              <div className={`flex h-6 w-6 items-center justify-center rounded-full ${
                feature.basic.available ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
              }`}>
                {feature.basic.available ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  <XIcon className="h-4 w-4" />
                )}
              </div>
            )}
          </div>
          <div className="flex items-center justify-center p-5">
            {feature.investor.text ? (
              <p className="text-center text-sm font-medium">{feature.investor.text}</p>
            ) : (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5352F6]/10 text-[#5352F6]">
                <CheckIcon className="h-4 w-4" />
              </div>
            )}
          </div>
        </div>
      ))}
      
      {/* Botones de acción */}
      <div className="grid grid-cols-3 p-6">
        <div className="flex items-center">
          <p className="text-sm font-medium text-[#6D6C6C]">Elige tu plan:</p>
        </div>
        <div className="flex items-center justify-center px-4">
          <Button variant="secondary" className="w-full">Explorar contenido gratis</Button>
        </div>
        <div className="flex items-center justify-center px-4">
          <Button className="w-full">Convertirme en inversionista</Button>
        </div>
      </div>
    </div>
  );
};

export default PlanComparison;
