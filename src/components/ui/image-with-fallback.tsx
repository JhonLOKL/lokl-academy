"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fallbackSrc?: string;
  onLoad?: () => void;
}

export const ImageWithFallback = ({
  src,
  alt,
  className = "",
  width = 800,
  height = 600,
  priority = false,
  fallbackSrc = "https://via.placeholder.com/800x600?text=Image+Not+Available",
  onLoad,
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
      onLoad={onLoad}
      priority={priority}
      style={{ objectFit: 'cover' }}
    />
  );
};
