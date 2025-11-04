"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Cardsteam } from '../components/Cardsteam';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function OurTeam() {
  const teamMembers = [
    { src: 'https://lokl-assets.s3.amazonaws.com/about-us/olarte.jpg', url: "https://www.linkedin.com/in/camiloolarte1/", name: 'Camilo Olarte', role: 'CEO' },
    { src: 'https://lokl-assets.s3.us-east-1.amazonaws.com/about-us/FOTO_CARO.jpg', url: "https://www.linkedin.com/in/carolina-cort%C3%A9s-lobo-4009b2216/", name: 'Carolina Cortés', role: 'Líder Recursos Humanos' },
    { src: 'https://lokl-assets.s3.us-east-1.amazonaws.com/about-us/julian-diosa.png', url: "https://www.linkedin.com/in/julian-david-diosa-echeverri-141506a6/", name: 'Julián Diosa', role: 'Director Administrativo' },
    { src: 'https://lokl-assets.s3.amazonaws.com/about-us/pipe.jpg', url: "https://www.linkedin.com/in/luis-felipe-ramírez-049a08203/", name: 'Luis Felipe Ramírez', role: 'Líder inversiones' },
    { src: 'https://lokl-assets.s3.amazonaws.com/about-us/jhon.jpg', url: "https://www.linkedin.com/in/jhon-esteban-velasquez-gomez-a8928a346/", name: 'Jhon Velásquez', role: 'Director Tech' },
    { src: 'https://lokl-assets.s3.us-east-1.amazonaws.com/about-us/FOTO_SEBAS.jpg', url: "https://www.linkedin.com/in/sebastian-guzmán-morales-432182255/", name: 'Sebastián Guzmán', role: 'Desarrollador' },
    { src: 'https://lokl-assets.s3.us-east-1.amazonaws.com/about-us/FOTO_JESUS.jpg', url: "https://www.linkedin.com/in/jesus-andres-vargas-zerpa-618bb7245/", name: 'Jesus Vargas', role: 'Desarrollador IA' },
    { src: 'https://lokl-assets.s3.us-east-1.amazonaws.com/about-us/FOTO_ALEJA.jpg', url: "https://www.linkedin.com/in/alejandra-bustamante-cruz-07a25034a/", name: 'Alejandra Bustamante', role: 'Diseñadora Grafica' },
    { src: 'https://lokl-assets.s3.us-east-1.amazonaws.com/about-us/maria-jose.png', url: "https://www.linkedin.com/in/mar%C3%ADa-jos%C3%A9-botero-londo%C3%B1o-3650431a0/", name: 'María José Botero', role: 'Coordinadora de Marketing' },
    { src: 'https://lokl-assets.s3.us-east-1.amazonaws.com/about-us/FOTO_MANU.jpg', url: "", name: 'Manuela Montoya', role: 'Líder de Comunidad' },
    { src: 'https://lokl-assets.s3.amazonaws.com/about-us/yuli.jpg', url: "https://www.linkedin.com/in/yuliana-martinez-6247342a2/", name: 'Yuliana Martínez', role: 'Líder Financiera' },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const teamRef = useRef<HTMLDivElement>(null);

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

    if (teamRef.current) {
      observer.observe(teamRef.current);
    }

    return () => {
      if (teamRef.current) {
        observer.unobserve(teamRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden" ref={teamRef}>
          {/* Header */}
          <div className="text-center my-10">
            <h2 className="text-3xl font-light">NUESTRO EQUIPO</h2>
            <h1 className="text-5xl font-bold italic">EXPERIMENTADO</h1>
          </div>

      {/* Team Swiper */}
      <div className="w-full my-10">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
            el: '.custom-pagination',
            bulletClass: 'swiper-pagination-bullet gray-bullet'
          }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop={true}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 50 },
            768: { slidesPerView: 2, spaceBetween: 10 },
            1024: { slidesPerView: 3, spaceBetween: 100 },
          }}
        >
          {teamMembers.map((member, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Cardsteam
                  src={member.src}
                  name={member.name}
                  role={member.role}
                  url={member.url}
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Custom Pagination Container */}
        <div className="custom-pagination flex justify-center mt-8"></div>
      </div>
    </div>
  );
}

