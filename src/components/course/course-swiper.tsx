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
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        navigation
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
          color: #5352F6;
          transform: scale(0.7);
          top: 35%;
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .course-swiper-container .swiper-button-next {
          right: 10px;
        }
        
        .course-swiper-container .swiper-button-prev {
          left: 10px;
        }
        
        .course-swiper-container .swiper-button-next:after,
        .course-swiper-container .swiper-button-prev:after {
          font-size: 18px;
        }
        
        .course-swiper-container .swiper-pagination-bullet-active {
          background: #5352F6;
        }
        
        .course-swiper-container .swiper-pagination {
          bottom: 0px;
        }
      `}</style>
    </div>
  );
}
