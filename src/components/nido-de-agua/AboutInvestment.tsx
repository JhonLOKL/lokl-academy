"use client";

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { Calendar, CreditCard, DollarSign, Lock, Clock, Percent } from 'lucide-react';

// CSS de Swiper movido a globals.css para optimizar la carga

const investmentInfo = [
  {
    icon: Calendar,
    text: '*Estimado de apertura Primer semestre 2026'
  },
  {
    icon: CreditCard,
    text: '*Pagos trimestrales, un año después de apertura'
  },
  {
    icon: DollarSign,
    text: '*<strong>3%</strong> de comisión cuando te ayudamos a vender tu inversión'
  },
  {
    icon: Lock,
    text: '*1 año mínimo para poder vender tu inversión'
  },
  {
    icon: Clock,
    text: '*El primer año de operación se realizan reservas'
  },
  {
    icon: Percent,
    text: '*<strong>1%</strong> de costo de administración anual de tu inversión'
  }
];

export function AboutInvestment() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="w-full relative md:px-10">
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 1.6,
            slidesPerGroup: 1.6,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 10,
          },
        }}
        centeredSlides={false}
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false
        }}
        slidesPerView={1.6}
        spaceBetween={5}
        slidesPerGroupSkip={0}
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="about-investment-swiper"
      >
        {investmentInfo.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <SwiperSlide key={index}>
              <div className="flex border border-gray-200 rounded-2xl font-normal h-36 items-center justify-center px-4 mx-px">
                <div className="flex justify-center items-start">
                  <div className="flex-shrink-0 w-7 mr-3">
                    <IconComponent className="w-full h-7 text-gray-600" />
                  </div>
                  <div className="w-full">
                    <p className="text-[13px] text-gray-700 leading-relaxed">
                      {item.text.includes('3%') || item.text.includes('1%') ? (
                        <>
                          {item.text.split(/(<strong>.*?<\/strong>)/).map((part, i) => {
                            if (part.includes('<strong>')) {
                              const match = part.match(/<strong>(.*?)<\/strong>/);
                              return match ? (
                                <strong key={i} className="font-bold">{match[1]}</strong>
                              ) : null;
                            }
                            return part.replace('*', '');
                          })}
                        </>
                      ) : (
                        item.text.replace('*', '')
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Botones de navegación - Desktop */}
      <div className="hidden md:block">
        <button 
          onClick={() => swiperRef.current?.slidePrev()} 
          className="absolute top-[40%] left-0 -translate-y-1/2 rotate-180 z-30 p-2 hover:bg-gray-100 rounded-full transition"
          aria-label="Anterior"
        >
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5007 22.9166C18.2538 22.9166 22.9173 18.253 22.9173 12.4999C22.9173 6.74679 18.2538 2.08325 12.5007 2.08325C6.74753 2.08325 2.08398 6.74679 2.08398 12.4999C2.08398 18.253 6.74753 22.9166 12.5007 22.9166Z" stroke="#656565" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11.1875 16.1772L14.8542 12.5001L11.1875 8.823" stroke="#656565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button 
          onClick={() => swiperRef.current?.slideNext()} 
          className="absolute top-[40%] right-0 -translate-y-1/2 z-30 p-2 hover:bg-gray-100 rounded-full transition"
          aria-label="Siguiente"
        >
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5007 22.9166C18.2538 22.9166 22.9173 18.253 22.9173 12.4999C22.9173 6.74679 18.2538 2.08325 12.5007 2.08325C6.74753 2.08325 2.08398 6.74679 2.08398 12.4999C2.08398 18.253 6.74753 22.9166 12.5007 22.9166Z" stroke="#656565" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11.1875 16.1772L14.8542 12.5001L11.1875 8.823" stroke="#656565" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <style jsx global>{`
        .about-investment-swiper .swiper-pagination {
          bottom: -30px;
        }
        .about-investment-swiper .swiper-pagination-bullet {
          background: #656565;
        }
        .about-investment-swiper .swiper-pagination-bullet-active {
          background: #5352F6;
        }
      `}</style>
    </div>
  );
}


