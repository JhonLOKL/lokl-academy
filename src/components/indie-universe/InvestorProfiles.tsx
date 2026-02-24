"use client";

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import MenuTabs from './MenuTabs';
import type { ProjectHomePageInfo } from '@/services/projectService';
import { urls } from '@/config/urls';

// CSS de Swiper movido a globals.css para optimizar la carga

type AnyRecord = Record<string, unknown>;

const DEFAULT_UNIT_PRICE = 129250;

const UNIT_PRICE_KEYS = [
  "unitPrice",
  "valuePerUnit",
  "unit_price",
  "unit_value",
  "unitprice",
  "unitvalue",
  "pricePerUnit",
  "price_per_unit",
  "unitCost",
  "unitAmount",
];

const ensureRecord = (value: unknown): AnyRecord | null =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as AnyRecord)
    : null;

const ensureNumber = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const digitsOnly = value.replace(/\D/g, "");
    if (digitsOnly.length === 0) {
      return null;
    }

    return Number(digitsOnly);
  }

  return null;
};

const extractUnitPrice = (homeInfo?: ProjectHomePageInfo | null): number | null => {
  const initialRecord = ensureRecord(homeInfo);

  if (!initialRecord) {
    return null;
  }

  const queue: AnyRecord[] = [initialRecord];
  const visited = new Set<AnyRecord>([initialRecord]);

  while (queue.length > 0) {
    const record = queue.shift()!;

    for (const key of Object.keys(record)) {
      const value = record[key];

      if (UNIT_PRICE_KEYS.includes(key)) {
        const numericValue = ensureNumber(value);
        if (numericValue !== null && numericValue > 0) {
          return numericValue;
        }
      }

      if (Array.isArray(value)) {
        value.forEach((item) => {
          const nested = ensureRecord(item);
          if (nested && !visited.has(nested)) {
            visited.add(nested);
            queue.push(nested);
          }
        });
      } else {
        const nested = ensureRecord(value);
        if (nested && !visited.has(nested)) {
          visited.add(nested);
          queue.push(nested);
        }
      }
    }
  }

  return null;
};

type InvestorProfileConfig = {
  type: string;
  img: string;
  multiplier: number;
  benefits: string[];
};

const INVESTOR_PROFILE_CONFIG: InvestorProfileConfig[] = [
  {
    type: "Explorador",
    img: "/images/profiles/explorer.png",
    multiplier: 100,
    benefits: [
      "Descuento 10% en espacios operados por Indie Universe",
      "Canales dedicados de atención para reservas y requerimientos",
      "Eventos exclusivos para comunidad de inversionistas",
    ],
  },
  {
    type: "Aventurero",
    img: "/images/profiles/adventurer.png",
    multiplier: 200,
    benefits: [
      "Descuento 20% en espacios operados por Indie Universe",
      "Participa de la lotería de noches y experiencias de Indie Universe",
      "Acceso a asesorías privadas para evaluar portafolio",
    ],
  },
  {
    type: "Héroe",
    img: "/images/profiles/hero.jpg",
    multiplier: 500,
    benefits: [
      "Descuento 25% en espacios operados por Indie Universe",
      "Participa de la lotería de experiencias de Indie Universe y 1 Noche Gratis al año",
      "Acceso a asesorías privadas para evaluar portafolio",
    ],
  },
];

interface InvestorProfileProps {
  type: string;
  img: string;
  price: number;
  benefits: string[];
  amount: number;
  swiperRef?: React.RefObject<SwiperType | null>;
}

function InvestorProfile({ type, img, price, benefits, amount, swiperRef }: InvestorProfileProps) {
  const [showBenefit, setShowBenefit] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si estamos en móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint de Tailwind
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Controlar autoplay en móvil cuando se muestran/ocultan beneficios
  useEffect(() => {
    if (!isMobile || !swiperRef?.current) return;

    if (showBenefit) {
      // Detener autoplay cuando se muestran los beneficios
      swiperRef.current.autoplay?.stop();
    } else {
      // Reanudar autoplay cuando se ocultan los beneficios
      swiperRef.current.autoplay?.start();
    }
  }, [showBenefit, isMobile, swiperRef]);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current && overlayRef.current && imageRef.current) {
        const imageHeight = imageRef.current.offsetHeight;
        const overlayHeight = overlayRef.current.scrollHeight;
        const newHeight = Math.max(imageHeight, overlayHeight);
        containerRef.current.style.height = `${newHeight}px`;
      }
    };

    // Actualizar inmediatamente
    updateHeight();
    
    // Actualizar después de que el DOM se actualice
    const timeoutId1 = setTimeout(updateHeight, 0);
    const timeoutId2 = setTimeout(updateHeight, 100);
    
    // Usar requestAnimationFrame para asegurar que se actualice después del render
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(updateHeight);
    });
    
    window.addEventListener('resize', updateHeight);
    return () => {
      window.removeEventListener('resize', updateHeight);
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      cancelAnimationFrame(rafId);
    };
  }, [showBenefit]);

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
      // Redirigir a checkout
      window.location.href = `${urls.DASHBOARD_URL}/checkout/invest?`;
    }
  };

  return (
    <div ref={containerRef} className="relative rounded-xl overflow-x-hidden w-full max-w-full" style={{ minHeight: '266px' }}>
      <div ref={imageRef} className="relative w-full aspect-square md:aspect-square min-h-[266px]">
        <Image
          src={img}
          alt={type}
          fill
          className="object-cover rounded-xl"
        />
      </div>
      
      <div ref={overlayRef} className="absolute top-0 left-0 w-full flex flex-col justify-center items-center bg-black/60 py-4 md:py-0 rounded-xl" style={{ minHeight: '100%' }}>
        <div className="px-4 md:px-10 mb-4 md:mb-6 w-full max-w-full box-border">
          <h4 className="text-2xl md:text-3xl font-lato font-extrabold text-white mb-3 md:mb-4 break-words">{type}</h4>
          
          {!showBenefit ? (
            <div className="w-full">
              <div className="mb-4">
                <p className="text-white font-lato text-sm md:text-base">Invirtiendo a partir de</p>
                <h4 className="text-2xl md:text-3xl font-lato font-extrabold text-white break-words">{formatPrice(price)}</h4>
                <p className="text-white font-lato text-base md:text-lg break-words">Estás a un paso de ser inversionista pionero y comenzar tu historia</p>
              </div>
              <p
                className="text-white text-center font-semibold underline text-base md:text-lg cursor-pointer hover:text-gray-200 transition break-words"
                onClick={() => setShowBenefit(true)}
              >
                Conoce los beneficios
              </p>
            </div>
          ) : (
            <div className="w-full max-w-full box-border">
              <ul className="list-disc text-white font-lato text-base md:text-lg space-y-2 pl-5 pr-2 break-words">
                {benefits.map((benefit, index) => (
                  <li key={index} className="break-words">{benefit}</li>
                ))}
              </ul>
              <div className="w-full text-center mt-4">
                <p 
                  className="text-white text-center font-semibold underline text-base md:text-lg cursor-pointer hover:text-gray-200 transition break-words" 
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
          className="bg-[#B8CCFF] text-gray-800 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-[#A8BCEF] transition text-sm md:text-base whitespace-nowrap mx-4 max-w-[calc(100%-2rem)]"
          onClick={() => goBenefit(amount)}
        >
          Quiero ser un {type}
        </button>
      </div>
    </div>
  );
}

interface InvestorProfilesProps {
  homeInfo?: ProjectHomePageInfo | null;
}

export default function InvestorProfiles({ homeInfo }: InvestorProfilesProps) {
  const unitPrice = useMemo(() => {
    const priceFromApi = extractUnitPrice(homeInfo);
    return priceFromApi && priceFromApi > 0 ? priceFromApi : DEFAULT_UNIT_PRICE;
  }, [homeInfo]);

  const investorProfiles = useMemo(
    () =>
      INVESTOR_PROFILE_CONFIG.map((profile) => ({
        ...profile,
        price: unitPrice * profile.multiplier,
        amount: profile.multiplier,
      })),
    [unitPrice]
  );

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

      <div className="w-full max-w-full">
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
          className="w-full"
          style={{ height: 'auto', minHeight: '400px' }}
        >
          {investorProfiles.map((profile, index) => (
            <SwiperSlide key={index} className="!h-auto">
              <InvestorProfile
                img={profile.img}
                type={profile.type}
                price={profile.price}
                amount={profile.amount}
                benefits={profile.benefits}
                swiperRef={swiperRef}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}


