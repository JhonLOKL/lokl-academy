"use client";

import React from 'react';
import Image from 'next/image';

const teamList = [
  {
    id: 1,
    name: 'Indie',
    roll: 'Operador y marca',
    imageLink:
      'https://lokl-assets.s3.us-east-1.amazonaws.com/property-page/indie-universe/team/img-indie.png',
    collaboratorLink: 'https://www.indie.com.co/',
  },
  {
    id: 2,
    name: 'Mgroup',
    roll: 'Gerente y Arquitecto',
    imageLink:
      'https://lokl-assets.s3.us-east-1.amazonaws.com/property-page/indie-universe/team/img-m-group.jpg',
    collaboratorLink: 'https://mgroup.com.co/',
  },
  {
    id: 3,
    name: 'Pettra',
    roll: 'Constructor',
    imageLink:
      'https://lokl-assets.s3.us-east-1.amazonaws.com/property-page/indie-universe/team/img-retina-pettra.png',
    collaboratorLink:
      'https://www.facebook.com/p/Pettra-Desarrollo-Inmobiliario-100062945063718/',
  },
];

export default function Team() {
  return (
    <section className="w-full">
      <h2 className="text-gray-400 text-2xl font-bold font-epilogue mb-5">
        Equipo del proyecto
      </h2>
      
      <div className="grid grid-cols-6 gap-x-0 gap-y-6 lg:gap-x-5 lg:gap-y-16">
        {teamList.map((team) => (
          <div 
            key={team.id} 
            className="flex items-end justify-center col-span-3 lg:col-span-2"
          >
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Image
                  src={team.imageLink}
                  alt={team.name}
                  width={104}
                  height={104}
                  className="object-contain rounded-lg"
                />
              </div>
              <p className="font-syne text-sm text-gray-700">{team.name}</p>
              <p className="font-syne text-xs text-gray-500 mb-2">
                {team.roll}
              </p>
              <a 
                href={team.collaboratorLink}
                className="font-syne text-[#5452F6] text-sm hover:underline" 
                target="_blank" 
                rel="noreferrer"
              >
                Conoce más aquí
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


