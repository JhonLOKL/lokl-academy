"use client";

import React from 'react';

const timelineData = [
  {
    id: 1,
    icon: 'timeline-icon',
    text: 'Pre lanzamiento noviembre 2022',
    isLast: false
  },
  {
    id: 2,
    icon: 'timeline-icon',
    text: 'Lanzamiento junio 2023',
    isLast: false
  },
  {
    id: 3,
    icon: 'timeline-icon',
    text: 'Inicio de la construcción primer semestre del 2024',
    isLast: false
  },
  {
    id: 4,
    icon: 'house-icon',
    text: 'Inicio de operación primer semestre del 2026',
    isLast: true
  }
];

export function Timeline() {
  return (
    <section className="w-full flex flex-col items-center">
      <div className="flex gap-4 flex-row lg:flex-col mb-8 max-w-4xl">
        <p className="text-gray-700">Estabilización estimada del proyecto 2 años a partir del inicio de operación.</p>
        <ul>
          <li className="list-disc text-gray-700">
            Las rentabilidades se repartirán trimestralmente.
          </li>
        </ul>
      </div>

      <div className="flex justify-center flex-col lg:flex-row gap-4 w-full max-w-5xl">
        {timelineData.map((item) => (
          <div key={item.id} className="w-48 mx-auto">
            <div className="flex justify-center items-end h-20">
              {item.isLast ? (
                <svg width="23" height="60" viewBox="0 0 23 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0L0 31.5H23L12 0Z" fill="#514E4E" />
                  <rect x="10.5" y="54.5" width="3" height="5" fill="#514E4E" />
                  <path d="M4 29.5L12 58L19 30" stroke="#514E4E" />
                </svg>
              ) : (
                <div className="w-6 h-6 bg-[#514E4E] rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              )}
            </div>
            <div className="border-t-2 border-gray-300 flex justify-center text-center">
              <p className="px-8 mt-3 text-gray-700">
                {item.id === 1 ? (
                  <>Pre lanzamiento noviembre <strong className="font-bold">2022</strong></>
                ) : item.id === 2 ? (
                  <>Lanzamiento junio <strong className="font-bold">2023</strong></>
                ) : item.id === 3 ? (
                  <><strong className="font-bold">Inicio de la construcción</strong> primer semestre del <strong className="font-bold">2024</strong></>
                ) : (
                  <><strong className="font-bold">Inicio de operación</strong> primer semestre del <strong className="font-bold">2026</strong></>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="my-3 max-w-4xl text-center">
        <p className="font-syne text-[13px] text-gray-500">
          *Las fechas son estimaciones iniciales. Pueden haber cambios y retrasos durante la ejecución del proyecto
        </p>
      </div>
    </section>
  );
}


