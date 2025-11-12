"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { MapPin } from 'lucide-react';
import Image from 'next/image';

// CSS de Swiper movido a globals.css para optimizar la carga

export function Location() {
  // Placeholder para las imágenes - reemplazar con las imágenes reales
  const locationImages = [
    {
      src: 'https://lokl-assets.s3.us-east-1.amazonaws.com/nido-de-agua/location/location-image-1.png',
      alt: 'Ubicación Nido de Agua 1',
    },
    {
      src: 'https://lokl-assets.s3.us-east-1.amazonaws.com/nido-de-agua/location/location-image-2.png',
      alt: 'Ubicación Nido de Agua 2',
    },
    {
      src: 'https://lokl-assets.s3.us-east-1.amazonaws.com/nido-de-agua/location/location-image-3.png',
      alt: 'Ubicación Nido de Agua 3',
    },
  ];

  return (
    <section className="w-full">
      <h2 className="text-gray-400 text-2xl font-bold font-epilogue mb-5">
        ¿Dónde está ubicado?
      </h2>
      
      <h2 className="text-3xl font-epilogue font-bold mb-12">
        Guatapé / Peñol - Antioquia, Colombia
      </h2>

      <div className="flex flex-col md:flex-row gap-x-8 mb-12">
        <p className="font-syne text-lg mb-4 md:mb-0">
          Uno de los destinos más importantes de valorización del país 
          y uno de los principales atractivos de Medellín, 
          la ciudad más turística de Colombia.
        </p>
        <ul>
          <li className="list-disc font-syne text-lg">
            "Un lugar que ha crecido en un <strong className="font-bold">85%</strong> su ocupación hotelera."
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <Swiper
          loop={true}
          navigation={true}
          grabCursor
          modules={[Autoplay, Navigation]}
          className="aliados-logos select-none"
          breakpoints={{
            640: {
              slidesPerView: 1.4,
              spaceBetween: 5,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 5,
            },
            1024: {
              slidesPerView: 2.6,
              spaceBetween: 10,
            },
          }}
          spaceBetween={5}
          slidesPerView={1.4}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false
          }}
        >
          {locationImages.map((image, index) => (
            <SwiperSlide
              key={index}
              className="logo select-none"
              onDragStart={(event) => event.preventDefault()}
            >
              <div className="relative w-full aspect-video rounded-lg overflow-hidden select-none">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  draggable={false}
                  className="object-cover rounded-lg pointer-events-none"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex items-center w-full justify-center mt-4 gap-2">
        <div>
          <svg width="39" height="48" viewBox="0 0 39 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.4993 33.7834C19.4355 33.7833 19.3724 33.7694 19.3146 33.7425C19.2569 33.7157 19.2059 33.6766 19.1652 33.6281C18.7362 33.1161 8.66602 21.0269 8.66602 15.2831C8.66602 12.4541 9.80738 9.74104 11.839 7.74065C13.8707 5.74026 16.6262 4.61646 19.4993 4.61646C22.3725 4.61646 25.128 5.74026 27.1597 7.74065C29.1913 9.74104 30.3327 12.4541 30.3327 15.2831C30.3327 21.0269 20.2625 33.1178 19.8334 33.6298C19.7927 33.678 19.7416 33.7168 19.6838 33.7433C19.6261 33.7699 19.5631 33.7836 19.4993 33.7834ZM19.4993 5.46979C16.8569 5.47272 14.3236 6.50757 12.4551 8.34729C10.5867 10.187 9.53566 12.6814 9.53268 15.2831C9.53268 20.1591 17.7274 30.4993 19.4993 32.6779C21.2712 30.4993 29.466 20.1591 29.466 15.2831C29.463 12.6814 28.412 10.187 26.5436 8.34729C24.6751 6.50757 22.1418 5.47272 19.4993 5.46979Z" fill="#3533FF"/>
            <path d="M19.5 21.6833C18.2144 21.6833 16.9577 21.308 15.8888 20.6047C14.8199 19.9015 13.9868 18.9019 13.4948 17.7325C13.0028 16.563 12.8741 15.2762 13.1249 14.0347C13.3757 12.7932 13.9948 11.6529 14.9038 10.7578C15.8128 9.86276 16.971 9.25322 18.2319 9.00628C19.4928 8.75933 20.7997 8.88607 21.9874 9.37047C23.1752 9.85488 24.1903 10.6752 24.9046 11.7277C25.6188 12.7801 26 14.0175 26 15.2833C25.9982 16.9801 25.3128 18.6069 24.0942 19.8068C22.8756 21.0066 21.2233 21.6815 19.5 21.6833ZM19.5 9.73664C18.3858 9.73664 17.2967 10.0619 16.3703 10.6714C15.4439 11.2809 14.7219 12.1472 14.2955 13.1607C13.8691 14.1742 13.7575 15.2895 13.9749 16.3654C14.1923 17.4414 14.7288 18.4297 15.5166 19.2054C16.3045 19.9811 17.3082 20.5094 18.401 20.7234C19.4938 20.9374 20.6264 20.8276 21.6558 20.4078C22.6851 19.9879 23.5649 19.277 24.1839 18.3649C24.8029 17.4527 25.1333 16.3803 25.1333 15.2833C25.1316 13.8128 24.5376 12.4029 23.4815 11.3631C22.4254 10.3233 20.9935 9.73833 19.5 9.73664Z" fill="#3533FF"/>
          </svg>
        </div>
        <a
          className="text-[#3533FF] font-epilogue text-md hover:underline"
          href="https://maps.app.goo.gl/xh13UUhXdngRQBi58"
          target="_blank"
          rel="noreferrer"
        >
          Ubicación de Nido de agua
        </a>
      </div>

      <style jsx global>{`
        .aliados-logos .swiper-button-next,
        .aliados-logos .swiper-button-prev {
          color: #3533FF;
        }
        .aliados-logos .swiper-button-next:after,
        .aliados-logos .swiper-button-prev:after {
          font-size: 20px;
        }
      `}</style>
    </section>
  );
}


