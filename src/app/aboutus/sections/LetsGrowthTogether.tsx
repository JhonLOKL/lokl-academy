"use client";

import React from 'react';
import Image from 'next/image';

export default function LetsGrowthTogether() {
  return (
    <div className="relative w-full h-[100vh] max-h-[100vh] md:max-h-[740px] md:h-[100vh] overflow-hidden">
          {/* Background Image */}
          <Image
            src="/images/about-us/img-lets-growth.jpg"
            alt="Somos la plataforma inmobiliaria de las nuevas generaciones | LOKL."
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 to-transparent"></div>

      {/* Central Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-center font-light text-2xl md:text-3xl lg:text-5xl leading-snug p-4">
          Somos <br />
          <span className="font-extralight italic">
            la <span className="font-semibold">plataforma</span>
          </span> <br />
          inmobiliaria de las <br />
          nuevas <span className="italic font-thin">generaciones.</span>
        </h1>
      </div>

      {/* Corner Text - CRECE JUNTO A NOSOTROS */}
      <div className="absolute top-2 left-8 text-white text-xl md:text-3xl lg:text-4xl font-light tracking-wider">
        CRECE
      </div>
      <div className="absolute top-2 right-8 text-white text-xl md:text-3xl lg:text-4xl font-light tracking-wider">
        JUNTO
      </div>
      <div className="absolute bottom-8 left-8 text-white text-xl md:text-3xl lg:text-4xl font-light tracking-wider">
        A
      </div>
      <div className="absolute bottom-8 right-8 text-white text-xl md:text-3xl lg:text-4xl font-light tracking-wider">
        NOSOTROS
      </div>
    </div>
  );
}

