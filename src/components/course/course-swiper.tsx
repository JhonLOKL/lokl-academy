"use client";

import React, { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';

// Importar estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CourseSwiperProps {
  children: ReactNode[];
  slidesPerView?: number;
  spaceBetween?: number;
  className?: string;
  breakpoints?: {
    [width: number]: {
      slidesPerView: number;
      spaceBetween: number;
    };
  };
}

export default function CourseSwiper({
  children,
  slidesPerView = 'auto' as unknown as number,
  spaceBetween = 24,
  className = '',
  breakpoints,
}: CourseSwiperProps) {
  return (
    <div className={`course-swiper-container ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div></div>
        <div className="flex gap-2">
          <button className="swiper-custom-prev flex items-center justify-center w-8 h-8 rounded-full bg-white border border-[#EEEEFE] text-[#5352F6] hover:bg-[#EEEEFE] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="swiper-custom-next flex items-center justify-center w-8 h-8 rounded-full bg-white border border-[#EEEEFE] text-[#5352F6] hover:bg-[#EEEEFE] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        pagination={{ clickable: true, dynamicBullets: true }}
        className="course-swiper"
        breakpoints={breakpoints || {
          320: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
        wrapperClass="swiper-wrapper !items-stretch"
        navigation={{
          prevEl: '.swiper-custom-prev',
          nextEl: '.swiper-custom-next',
        }}
      >
        {children.map((child, index) => (
          <SwiperSlide key={index} className="h-auto flex">
            <div className="w-full">{child}</div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <style jsx global>{`
        .course-swiper-container .swiper {
          padding: 0 0 40px 0;
          margin: 0 -12px;
          width: calc(100% + 24px);
        }
        
        .course-swiper-container .swiper-slide {
          height: auto;
          display: flex;
          align-items: stretch;
        }
        
        .course-swiper-container .swiper-button-next,
        .course-swiper-container .swiper-button-prev {
          display: none;
        }
        
        .course-swiper-container .swiper-pagination-bullet-active {
          background: #5352F6;
        }
        
        .course-swiper-container .swiper-pagination {
          bottom: 0px;
        }
        
        .swiper-custom-prev:disabled,
        .swiper-custom-next:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
