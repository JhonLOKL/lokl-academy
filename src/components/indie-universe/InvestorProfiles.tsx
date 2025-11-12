"use client";

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import MenuTabs from './MenuTabs';

// CSS de Swiper movido a globals.css para optimizar la carga

// Datos de los perfiles de inversionista
const INVESTOR_PROFILES = [
  {
    type: "Explorador",
    img: '/images/profiles/explorer.png',
    price: 12925000, // 100 * 129250
    amount: 100,
    benefits: [
      'Descuento 10% en espacios operados por Indie Universe',
      'Canales dedicados de atención para reservas y requerimientos',
      'Eventos exclusivos para comunidad de inversionistas'
    ]
  },
  {
    type: "Aventurero",
    img: '/images/profiles/adventurer.png',
    price: 25850000, // 200 * 129250
    amount: 200,
    benefits: [
      'Descuento 20% en espacios operados por Indie Universe',
      'Participa de la lotería de noches y experiencias de Indie Universe',
      'Acceso a asesorías privadas para evaluar portafolio'
    ]
  },
  {
    type: "Héroe",
    img: '/images/profiles/hero.jpg',
    price: 64625000, // 500 * 129250
    amount: 500,
    benefits: [
      'Descuento 25% en espacios operados por Indie Universe',
      'Participa de la lotería de experiencias de Indie Universe y 1 Noche Gratis al año',
      'Acceso a asesorías privadas para evaluar portafolio'
    ]
  }
];

interface InvestorProfileProps {
  type: string;
  img: string;
  price: number;
  benefits: string[];
  amount: number;
}

function InvestorProfile({ type, img, price, benefits, amount }: InvestorProfileProps) {
  const [showBenefit, setShowBenefit] = useState(false);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const goBenefit = (amount: number) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('amount', amount.toString());
      localStorage.setItem('instalmentValue', price.toString());
      localStorage.setItem('installments', '1');
      // Redirigir a registro o checkout
      window.location.href = '/register';
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden">
      <div className="relative w-full aspect-square min-h-[266px]">
        <Image
          src={img}
          alt={type}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black/60">
        <div className="px-10 mb-6 w-full">
          <h4 className="text-3xl font-lato font-extrabold text-white mb-4">{type}</h4>
          
          {!showBenefit ? (
            <div>
              <div className="mb-4">
                <p className="text-white font-lato">Invirtiendo a partir de</p>
                <h4 className="text-3xl font-lato font-extrabold text-white">{formatPrice(price)}</h4>
                <p className="text-white font-lato text-lg">Estás a un paso de ser inversionista pionero y comenzar tu historia</p>
              </div>
              <p
                className="text-white text-center font-semibold underline text-lg cursor-pointer hover:text-gray-200 transition"
                onClick={() => setShowBenefit(true)}
              >
                Conoce los beneficios
              </p>
            </div>
          ) : (
            <div className="px-4">
              <ul className="list-disc text-white font-lato text-lg space-y-2">
                {benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
              <div className="w-full text-center mt-4">
                <p 
                  className="text-white text-center font-semibold underline text-lg cursor-pointer hover:text-gray-200 transition" 
                  onClick={() => setShowBenefit(false)}
                >
                  Volver
                </p>
              </div>
            </div>
          )}
        </div>
        
        <button 
          id="btnInvestorProfile"
          className="bg-[#B8CCFF] text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-[#A8BCEF] transition"
          onClick={() => goBenefit(amount)}
        >
          Quiero ser un {type}
        </button>
      </div>
    </div>
  );
}

export default function InvestorProfiles() {
  const itemsBenefits = [
    { name: 'Explorador', id: 'explorador' },
    { name: 'Aventurero', id: 'aventurero' },
    { name: 'Héroe', id: 'heroe' }
  ];

  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const focusSlide = (slideItem?: string) => {
    const index = itemsBenefits.findIndex((item) => item.name === slideItem);
    if (swiperRef.current && index !== -1) {
      swiperRef.current.slideTo(index);
      setActiveIndex(index);
    }
  };

  return (
    <div className="w-full space-y-5">
      <div className="flex justify-center">
        <MenuTabs 
          menuItems={itemsBenefits} 
          onItemClick={(item) => focusSlide(item.name)}
          activeIndex={activeIndex}
        />
      </div>

      <div className="aspect-square">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          modules={[Autoplay]}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false
          }}
          className="w-full h-full"
        >
          {INVESTOR_PROFILES.map((profile, index) => (
            <SwiperSlide key={index}>
              <InvestorProfile
                img={profile.img}
                type={profile.type}
                price={profile.price}
                amount={profile.amount}
                benefits={profile.benefits}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}


