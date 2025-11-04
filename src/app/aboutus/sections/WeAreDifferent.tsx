"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CardCarrouselDifferent } from '../components/CardCarrouselDifferent';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function WeAreDifferent() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <section className="relative w-full min-h-[100vh] overflow-hidden bg-[#f0f2f4]" ref={sectionRef}>
        {/* Header Section */}
        <motion.div
          className={`text-right flex flex-col md:flex-row px-4 md:px-3 justify-between mt-12 md:mt-20 items-start ${isVisible ? 'fade-in' : 'fade-out'}`}
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-left md:ml-32 text-3xl md:text-5xl lg:text-8xl mb-4 md:mb-0">
            <h2 className="font-light">SOMOS</h2>
            <h2 className="font-bold italic">DIFERENTES</h2>
          </div>
          <div className="text-right md:mr-40 text-xl md:text-3xl lg:text-4xl">
            <p className="leading-tight">
              <span className="font-semibold">CREAMOS</span>
              <br />
              <span className="font-thin">TODO</span>
              <br />
              PENSANDO
              <br />
              <span className="font-bold">EN TI</span>
            </p>
          </div>
        </motion.div>

        {/* Swiper Carousel */}
        <div className="relative w-full my-12 md:my-24 flex justify-center px-4 md:px-0">
          <div className="w-full md:max-w-[1400px]">
            <Swiper
              pagination={{ 
                clickable: true,
                dynamicBullets: true,
              }}
              modules={[Pagination]}
              className="we-are-different-swiper"
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { 
                  slidesPerView: 1, 
                  spaceBetween: 30 
                },
                768: { 
                  slidesPerView: 2, 
                  spaceBetween: 30 
                },
                1024: { 
                  slidesPerView: 3, 
                  spaceBetween: 40 
                },
              }}
            >
              <SwiperSlide className="flex justify-center pb-12">
                <CardCarrouselDifferent
                  src="https://lokl-assets.s3.amazonaws.com/about-us/business-colleagues-banner-conce.jpg"
                  textButton="Ver más"
                  text="Inversiones accesibles"
                  link="/blog"
                />
              </SwiperSlide>
              <SwiperSlide className="flex justify-center pb-12">
                <CardCarrouselDifferent
                  src="https://lokl-assets.s3.amazonaws.com/about-us/happy-parents-with-child-home.jpg"
                  textButton="Ver más"
                  text="Disfruta tus inversiones"
                  link="/blog"
                />
              </SwiperSlide>
              <SwiperSlide className="flex justify-center pb-12">
                <CardCarrouselDifferent
                  src="https://lokl-assets.s3.amazonaws.com/about-us/close-up-hands-holding-black-pho.jpg"
                  textButton="Ver más"
                  text="Inversión 100% digital"
                  link="/blog"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        {/* Purpose and Value Proposition */}
        <div className="relative grid items-center grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 mb-12 md:mb-20 mt-4 md:mt-8 px-4 md:px-10">
          {/* Propósito */}
          <motion.div
            className={`flex flex-col pl-0 md:pl-32 md:mb-24 mt-2 ${isVisible ? 'fade-in' : 'fade-out'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="relative w-20 h-16 md:w-32 md:h-24 lg:w-44 lg:h-36 mb-2 ml-4 md:ml-0">
              <Image
                src="/images/about-us/img-financials.png"
                alt="Icono Propósito"
                fill
                className="object-contain"
              />
            </div>
            <span className="ml-8 md:ml-11">
              <p className="font-bold text-lg md:text-2xl lg:text-2xl">PROPÓSITO</p>
              <p className="font-normal text-base md:text-lg lg:text-2xl">
                Empoderamos a las nuevas generaciones <br />
                para que juntos construyamos
                <br />
                el futuro que queremos crear. <br />
              </p>
            </span>
          </motion.div>

          {/* Propuesta de Valor */}
          <motion.div
            className={`flex flex-col md:pl-32 pl-0 ${isVisible ? 'fade-in' : 'fade-out'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="relative w-20 h-16 md:w-32 md:h-24 lg:w-44 lg:h-36 mb-2 ml-4 md:ml-0">
              <Image
                src="/images/about-us/img-tree.png"
                alt="Icono Propuesta de Valor"
                fill
                className="object-contain"
              />
            </div>
            <span className="ml-8 md:ml-11">
              <p className="font-bold text-lg md:text-2xl lg:text-2xl">PROPUESTA DE VALOR</p>
              <p className="text-sm md:text-lg lg:text-2xl font-normal">
                Ofrece a las nuevas generaciones la <br />
                oportunidad de ser dueños de proyectos <br />
                que les apasionan. <br />
                <br />
                Con inversiones a partir de $1,000,000 COP
                <br />
                en el sector inmobiliario, todo de manera <br />
                100% digital.
              </p>
            </span>
          </motion.div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        .we-are-different-swiper {
          padding-bottom: 40px;
        }
        
        .we-are-different-swiper .swiper-pagination {
          bottom: 0px;
          position: relative;
          margin-top: 20px;
        }
        
        .we-are-different-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(83, 82, 246, 0.3);
          opacity: 1;
          transition: all 0.3s ease;
        }
        
        .we-are-different-swiper .swiper-pagination-bullet-active {
          background: #5352F6;
          width: 24px;
          border-radius: 5px;
        }
        
        @media (max-width: 768px) {
          .we-are-different-swiper .swiper-pagination {
            margin-top: 10px;
          }
          
          .we-are-different-swiper .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
          }
          
          .we-are-different-swiper .swiper-pagination-bullet-active {
            width: 20px;
          }
        }
      `}} />
    </>
  );
}

