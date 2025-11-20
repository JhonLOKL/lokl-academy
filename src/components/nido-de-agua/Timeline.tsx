"use client";

import Image from 'next/image';
import React from 'react';

const timelineData = [
  {
    id: 1,
    icon: '/images/new-home/timeline-icon.svg',
    title: 'Etapa de Pre lanzamiento',
    subtitle: 'Cuarto Trimestre del 2022',
    isLast: false
  },
  {
    id: 2,
    icon: '/images/new-home/timeline-icon.svg',
    title: 'Etapa de comercialización',
    subtitle: 'Segundo Trimestre del 2023',
    isLast: false
  },
  {
    id: 3,
    icon: '/images/new-home/timeline-icon.svg',
    title: 'Etapa de construcción',
    subtitle: 'Primer Trimestre del 2024',
    isLast: false
  },
  {
    id: 4,
    icon: 'house-icon',
    title: 'Etapa operativa',
    subtitle: 'Segundo Trimestre del 2026',
    isLast: true
  }
];

export function Timeline() {
  return (
    <section className="w-full flex flex-col items-center px-4 lg:px-8">
      <div className="flex gap-4 flex-row lg:flex-col mb-8 max-w-4xl w-full">
        <p className="text-gray-700">Estabilización estimada del proyecto 2 años a partir del inicio de operación.</p>
        <ul>
          <li className="list-disc text-gray-700">
            Las rentabilidades se repartirán trimestralmente.
          </li>
        </ul>
      </div>

      <div className="flex justify-center flex-col lg:flex-row gap-4 lg:gap-6 xl:gap-8 w-full max-w-6xl overflow-x-auto pb-4">
        {timelineData.map((item) => (
          <div key={item.id} className="w-48 lg:w-56 xl:w-64 flex-shrink-0 mx-auto lg:mx-0">
            <div className="flex justify-center items-end h-20">
              {item.isLast ? (
                <svg width="23" height="60" viewBox="0 0 23 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0L0 31.5H23L12 0Z" fill="#514E4E" />
                  <rect x="10.5" y="54.5" width="3" height="5" fill="#514E4E" />
                  <path d="M4 29.5L12 58L19 30" stroke="#514E4E" />
                </svg>
              ) : (
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={26}
                  height={24}
                  className="w-auto h-12"
                />
              )}
            </div>
            <div className="border-t-2 border-gray-300 flex justify-center text-center">
              <p className="px-4 lg:px-6 xl:px-8 mt-3 text-gray-700">
                <span className="block font-bold">{item.title}</span>
                <span className="block">{item.subtitle}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="my-3 max-w-4xl text-center w-full px-4">
        <p className="font-syne text-[13px] text-gray-500">
          *Las fechas son estimaciones iniciales. Pueden haber cambios y retrasos durante la ejecución del proyecto
        </p>
      </div>
    </section>
  );
}


