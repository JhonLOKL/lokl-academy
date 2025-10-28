"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
}

export const ImageWithFallback = ({ 
  src, 
  alt, 
  className, 
  width = 800, 
  height = 600,
  fill = false 
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      className={className}
      onError={() => {
        setImgSrc("https://via.placeholder.com/800x600?text=Imagen+no+disponible");
      }}
    />
  );
};
