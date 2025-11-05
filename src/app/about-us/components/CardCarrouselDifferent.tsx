"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CardCarrouselDifferentProps {
  src: string;
  text: string;
  textButton: string;
  link: string;
}

export function CardCarrouselDifferent({ src, text, textButton, link }: CardCarrouselDifferentProps) {
  return (
    <div className="relative w-full max-w-[400px] mx-auto md:mx-0 h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg group">
      {/* Background Image with Grayscale Filter */}
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={text}
          fill
          className="object-cover grayscale transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Dark Gradient Overlay - Enhanced bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white z-10 flex flex-col items-center text-center">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-5 leading-tight max-w-[90%]" style={{ fontFamily: 'Inter, sans-serif' }}>
          {text}
        </h3>
        <Link 
          href={link}
          className="inline-block px-6 md:px-8 py-3 md:py-3.5 bg-[#5352F6] hover:bg-[#5352F6]/90 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg text-sm md:text-base"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {textButton}
        </Link>
      </div>
    </div>
  );
}

