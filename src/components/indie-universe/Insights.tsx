"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

// CSS de Swiper movido a globals.css para optimizar la carga

const insightsData = [
  {
    id: 1,
    img: 'https://lokl-assets.s3.us-east-1.amazonaws.com/indie-universe/social.jpg',
    title: 'Impacto social',
    text: 'INDIE está enfocado en generar espacios y experiencias que permitan a las personas vivir, crear y crecer.',
    buttonBg: 'bg-white',
    overlay: 'bg-black/40'
  },
  {
    id: 2,
    img: 'https://lokl-assets.s3.us-east-1.amazonaws.com/indie-universe/ambiental.jpg',
    title: 'Impacto ambiental',
    text: 'Indie Universe tiene una Certificación Edge gracias a sus esfuerzos en reducción de huella de carbono.',
    buttonBg: 'bg-[#D7CFFF]',
    overlay: 'bg-black/30'
  },
  {
    id: 3,
    img: 'https://lokl-assets.s3.us-east-1.amazonaws.com/indie-universe/economico.jpg',
    title: 'Impacto económico',
    text: 'Nos comprometemos a impulsar comunidades creativas con infraestructura, educación y conexiones, potenciando talentos y proyectos que transformen las industrias culturales y de entretenimiento.',
    buttonBg: 'bg-[#FFF2C3]',
    overlay: 'bg-black/20'
  }
];

export function Insights() {
  const handleGoToBuy = () => {
    window.location.href = '/register';
  };

  return (
    <div className="w-full">
      <div className="w-full text-center mb-3">
        <h3 className="text-black/30 text-xl font-bold">¿Por qué invertir en Indie Universe?</h3>
      </div>

      <div className="rounded-xl overflow-hidden insights-swiper">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false
          }}
          navigation={true}
          modules={[Autoplay, Navigation, Pagination]}
          pagination={true}
          className="w-full h-[500px] md:h-[600px]"
        >
          {insightsData.map((insight) => (
            <SwiperSlide key={insight.id}>
              <div className="relative w-full h-full">
                <div className="relative w-full h-full">
                  <div className={`w-full h-full absolute top-0 left-0 z-10 ${insight.overlay}`}></div>
                  <Image
                    src={insight.img}
                    alt={insight.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 100vw"
                    priority={insight.id === 1}
                  />
                </div>
                <div className="absolute z-30 top-1/2 left-0 right-0 text-center m-auto -translate-y-1/2 px-6 md:px-12 max-w-4xl mx-auto">
                  <h2 className="text-white text-2xl md:text-3xl font-extrabold font-epilogue text-left mb-3">
                    {insight.title}
                  </h2>
                  <div className="text-white text-base md:text-xl font-medium font-epilogue mb-8 md:mb-12 text-left leading-relaxed space-y-4">
                    {typeof insight.text === 'string' ? <p>{insight.text}</p> : insight.text}
                  </div>
                  <div className="flex justify-center md:justify-start">
                    <button 
                      onClick={handleGoToBuy}
                      className={`${insight.buttonBg} text-black rounded-full font-noto font-semibold text-lg md:text-xl px-4 py-2 md:py-[10px] hover:opacity-90 transition whitespace-nowrap`}
                    >
                      Quiero ser socio
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .insights-swiper .swiper-button-next,
        .insights-swiper .swiper-button-prev {
          color: white;
        }
        .insights-swiper .swiper-button-next:after,
        .insights-swiper .swiper-button-prev:after {
          font-size: 20px;
        }
        .insights-swiper .swiper-pagination-bullet {
          background: white;
        }
        .insights-swiper .swiper-pagination-bullet-active {
          background: #5352F6;
        }
      `}</style>
    </div>
  );
}


