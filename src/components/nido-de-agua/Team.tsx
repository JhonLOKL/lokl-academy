"use client";

import React from 'react';
import Image from 'next/image';

const teamList = [
  {
    id: 1,
    name: 'Discorp',
    img: 'https://lokl-assets.s3.us-east-1.amazonaws.com/property-page/nido-de-agua/team/img-discorp.png',
    link: 'https://discorp.com.co/',
  },
  {
    id: 2,
    name: 'mockuproom',
    img: 'https://lokl-assets.s3.us-east-1.amazonaws.com/property-page/nido-de-agua/team/img-mockupproom.png',
    link: 'https://mockuproom.com.co/',
  },
  {
    id: 3,
    name: 'Astrostation',
    img: 'https://lokl-assets.s3.us-east-1.amazonaws.com/property-page/nido-de-agua/team/img-arquitecto.png',
    link: 'https://www.instagram.com/astrostation.co/',
  },
  {
    id: 4,
    name: 'souland_sas',
    img: 'https://lokl-assets.s3.us-east-1.amazonaws.com/property-page/nido-de-agua/team/img-souland.png',
    link: 'https://www.instagram.com/souland_sas/',
  },
  {
    id: 5,
    name: 'oa.mas',
    img: 'https://lokl-assets.s3.us-east-1.amazonaws.com/property-page/nido-de-agua/team/img-oa-plus.png',
    link: 'https://www.instagram.com/oa.mas/?igshid=NzZlODBkYWE4Ng%3D%3D',
  },
  {
    id: 6,
    name: 'Front & Back Hospitality',
    img: 'https://lokl-assets.s3.us-east-1.amazonaws.com/property-page/nido-de-agua/team/img-font-and-back.png',
    link: 'https://www.datacreditoempresas.com.co/directorio/front-y-back-hospitality-group-sas.html',
  },
  {
    id: 7,
    name: 'El Cedro Rojo',
    img: 'https://lokl-assets.s3.us-east-1.amazonaws.com/property-page/nido-de-agua/team/img-el-cedro-rojo.png',
    link: 'https://cedrorojo.com/',
  },
  {
    id: 8,
    name: 'Startup',
    img: 'https://lokl-assets.s3.us-east-1.amazonaws.com/property-page/nido-de-agua/team/img-startup.png',
    link: 'https://www.instagram.com/startup.com.co/?igshid=MmIxOGMzMTU%3D',
  },
];

export default function Team() {
  return (
    <section className="w-full">
      <h2 className="text-gray-400 text-2xl font-bold font-epilogue mb-5 text-center">
        Equipo del proyecto
      </h2>
      
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-6 xl:gap-y-10">
        {teamList.map((team) => (
          <div
            key={team.id}
            className="flex flex-col items-center justify-start text-center"
          >
            <div className="flex justify-center mb-3">
              <Image
                src={team.img}
                alt={team.name}
                width={104}
                height={104}
                className="object-contain rounded-lg"
              />
            </div>
            <p className="font-syne text-sm text-gray-700">{team.name}</p>
            <a
              href={team.link}
              className="font-syne text-[#5452F6] text-sm hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Conoce más aquí
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}


