"use client";

import React from 'react';
import Image from 'next/image';

const benefitsData = [
  {
    id: 1,
    title: "Impacto y comunidad",
    description:
      "Inversión inmobiliaria con propósito: proyectos reales que crean valor, empleo y tejido local.",
    image: "https://lokl-assets.s3.us-east-1.amazonaws.com/home/benefits/Benefit-01.png",
  },
  {
    id: 2,
    title: "Accesibilidad",
    description:
      "Montos flexibles y procesos simples para diversificar tu patrimonio sin barreras.",
    image: "https://lokl-assets.s3.us-east-1.amazonaws.com/home/benefits/Benefit-02.png",
  },
  {
    id: 3,
    title: "Rentabilidad",
    description:
      "Potencial de retorno con seguimiento transparente y gestión experta del activo.",
    image: "https://lokl-assets.s3.us-east-1.amazonaws.com/home/benefits/Benefit-03.png",
  },
  {
    id: 4,
    title: "Seguridad y transparencia",
    description:
      "La confianza no se promete, se construye. Curaduría experta y seguimiento 100% abierto y en tiempo real.",
    image:
      "https://lokl-assets.s3.us-east-1.amazonaws.com/home/benefits/Benefit-04.png",
  },
  {
    id: 5,
    title: "Valor que vuelve a ti",
    description:
      "Inversión inmobiliaria con propósito: proyectos reales que crean valor, empleo y tejido local..",
    image: "https://lokl-assets.s3.us-east-1.amazonaws.com/home/benefits/Benefit-05.png",
  },
  {
    id: 6,
    title: "Educación",
    description:
      "Aprende a invertir mejor: test de perfil, guías, cursos y webinars en vivo.",
    image: "https://lokl-assets.s3.us-east-1.amazonaws.com/home/benefits/Benefit-06.png",
  },
];

export default function Benefits() {
  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold mb-12 lg:w-2/4">
        ¿Cuáles son los beneficios de invertir a través de Lokl?
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {benefitsData.map((benefit) => (
          <div key={benefit.id} className="col-span-1 flex items-start">
            <div className="flex-shrink-0 w-[70px] mr-8">
              <Image
                src={benefit.image}
                alt={benefit.title}
                width={70}
                height={70}
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <h3 className="font-medium text-3xl mb-4">{benefit.title}</h3>
              <p className="text-lg leading-8 text-[#575757] mb-3">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


