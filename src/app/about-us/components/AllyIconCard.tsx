"use client";

import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface AllyIconCardProps {
  icon: string | StaticImageData;
  alt: string;
  className?: string;
}

export default function AllyIconCard({ icon, alt, className = '' }: AllyIconCardProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative w-[100px] h-[100px] md:w-[140px] md:h-[140px]">
        <Image
          src={icon}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100px, 140px"
        />
      </div>
    </div>
  );
}

