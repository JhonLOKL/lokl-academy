"use client";

import React, { useEffect, useRef, useState } from 'react';
import AllyIconCard from '../components/AllyIconCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';

const icons = [
  { icon: '/images/about-us/img-logo-forbes.png', alt: 'Forbes' },
  { icon: '/images/about-us/img-wompi.png', alt: 'Wompi' },
  { icon: '/images/about-us/img-zapsign.png', alt: 'Zapsign' },
  { icon: '/images/about-us/img-truora.png', alt: 'Truora' },
  { icon: '/images/about-us/img-abd&c.png', alt: 'ABCyD' },
  { icon: '/images/about-us/img-credicorp.png', alt: 'Credicorp' },
  { icon: '/images/about-us/img-bancolombia.png', alt: 'Bancolombia' },
  { icon: '/images/about-us/img-legalnova.png', alt: 'Legalnova' },
  { icon: '/images/about-us/img-startup.png', alt: 'Startup' },
  { icon: '/images/about-us/img-rockstartblanco.png', alt: 'Rockstart' },
  { icon: '/images/about-us/img-reload-logo.png', alt: 'Reload' },
];

export default function Supplierbar() {
  const [isVisible, setIsVisible] = useState(false);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]); 

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    });

    iconRefs.current.forEach((icon) => {
      if (icon) {
        observer.observe(icon);
      }
    });

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      iconRefs.current.forEach((icon) => {
        if (icon) {
          observer.unobserve(icon);
        }
      });
    };
  }, [isVisible]);

  return (
    <div className="bg-[#4F4CF1] py-4 w-full text-center" style={{ height: '180px' }}>
      <h3 className="text-white text-center text-xl font-normal mb-4">
        Nuestros aliados y proveedores
      </h3>

      <Swiper
        spaceBetween={10}
        slidesPerView={5}
        loop={true}
        className="flex relative items-center justify-center"
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[Autoplay]}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 15 },
          425: { slidesPerView: 3, spaceBetween: 15 }, 
          768: { slidesPerView: 4, spaceBetween: 15 },
          1024: { slidesPerView: 5, spaceBetween: 20 }
        }}
      >
        {icons.map(({ icon, alt }, index) => (
          <SwiperSlide key={index}>
            <motion.div
                ref={el => { iconRefs.current[index] = el; }}
                initial={{ opacity: 0, y: 25 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
            <div className="flex items-center justify-center">
              <AllyIconCard className="relative md:mx-0" icon={icon} alt={alt} />
              {index < icons.length - 1 && (
                <span className="text-white text-base ml-2 md:ml-4 md:text-3xl lg:text-5xl">•</span>
              )}
            </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
