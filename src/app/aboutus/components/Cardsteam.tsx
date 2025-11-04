"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Linkedin } from 'lucide-react';

interface CardsteamProps {
  src: string;
  name: string;
  role: string;
  url: string;
}

export function Cardsteam({ src, name, role, url }: CardsteamProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 group">
      {/* Image Container with Blue Border */}
      <div className="relative w-64 h-64 md:w-72 md:h-72 mb-6 rounded-full overflow-hidden shadow-lg border-4 border-[#2563EB]">
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110 rounded-full"
          sizes="(max-width: 768px) 256px, 288px"
        />
        
        {/* Overlay con LinkedIn - Aparece en hover */}
        {url && (
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
          >
            <div className="bg-white p-4 rounded-full">
              <Linkedin className="w-8 h-8 text-[#0077B5]" />
            </div>
          </Link>
        )}
      </div>

      {/* Info */}
      <div className="text-center">
        <h3 className="text-3xl md:text-4xl font-bold font-sans text-black mb-2 transition-colors duration-300 group-hover:text-[#2563EB]">
          {name}
        </h3>
        <p className="text-lg md:text-xl font-sans text-gray-600 italic">
          {role}
        </p>
      </div>
    </div>
  );
}

