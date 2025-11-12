"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Play } from 'lucide-react';
import { scrollToSection } from '@/helpers/functions';

const benefitsData = [
  {
    id: 1,
    img: 'https://lokl-assets.s3.us-east-1.amazonaws.com/nido-de-agua/benefit-img-1.png',
    alt: 'Imagen interior',
    title: 'Beneficios y descuentos',
    description: 'Desde 10% de descuento en los servicios de los proyectos a noches gratuitas...',
    link: {
      text: 'Descubre mas beneficios',
      action: 'scroll',
      target: 'investor-profile'
    }
  },
  {
    id: 2,
    img: 'https://lokl-assets.s3.us-east-1.amazonaws.com/nido-de-agua/benefit-img-2.png',
    alt: 'Imagen de un guitarrista',
    title: 'Invierte en comunidad',
    description: '¡Sé parte de una comunidad que le apasiona crecer con eventos, network y mas!',
    link: {
      text: 'Conoce a la comunidad',
      action: 'video'
    }
  },
  {
    id: 3,
    img: 'https://lokl-assets.s3.us-east-1.amazonaws.com/nido-de-agua/benefit-img-3.png',
    alt: 'Imagen de un edificio',
    title: 'Proyectos con impacto',
    description: 'Invierte en el futuro que quieres crear con proyectos con impacto positivo',
    link: {
      text: '¿Como evaluamos impacto?',
      action: 'link',
      href: '/blog/inversion-ahorro-crecimiento-financiero'
    }
  }
];

function VideoModal({ onClose }: { onClose: () => void }) {
  return (
    <div 
      className="fixed h-screen w-screen bg-black/60 top-0 left-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="w-[360px] h-[300px] lg:w-[666px] lg:h-[430px] relative z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute -right-4 -top-4 lg:-right-8 lg:-top-8 cursor-pointer z-10"
          onClick={onClose}
          aria-label="Cerrar video"
        >
          <X className="w-8 h-8 text-white" />
        </button>
        <iframe 
          className="w-full h-full rounded-xl" 
          src="https://www.youtube.com/embed/CQDtTMMa2mQ" 
          title="YouTube video player" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default function Benefits() {
  const [videoActive, setVideoActive] = useState(false);

  const handleLinkClick = (benefit: typeof benefitsData[0]) => {
    if (benefit.link.action === 'scroll') {
      scrollToSection(benefit.link.target || '', 160);
    } else if (benefit.link.action === 'video') {
      setVideoActive(true);
    }
  };

  return (
    <section className="w-full">
      {videoActive && <VideoModal onClose={() => setVideoActive(false)} />}
      
      <h2 className="text-2xl font-bold mb-12 lg:w-2/4">
        ¿Cuáles son los beneficios de invertir a través de Lokl?
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {benefitsData.map((benefit) => (
          <div key={benefit.id} className="col-span-1 flex items-start">
            <div className="flex-shrink-0 w-[70px] mr-8">
              <Image
                src={benefit.img}
                alt={benefit.alt}
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
              {benefit.link.action === 'link' ? (
                <Link 
                  href={benefit.link.href || '#'} 
                  className="text-[#3533FF] underline cursor-pointer"
                >
                  {benefit.link.text}
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  {benefit.link.action === 'video' && (
                    <Play className="w-5 h-5 text-[#5452F6]" />
                  )}
                  <p 
                    onClick={() => handleLinkClick(benefit)}
                    className="text-[#3533FF] underline cursor-pointer hover:text-[#2521E6] transition"
                  >
                    {benefit.link.text}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


