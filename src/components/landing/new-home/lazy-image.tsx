"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fallbackSrc?: string;
  onLoad?: () => void;
}

export default function LazyImage({
  src,
  alt,
  className = "",
  width,
  height,
  priority = false,
  fallbackSrc = "https://via.placeholder.com/800x600?text=Imagen+no+disponible",
  onLoad,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    // Solo observar si no es priority
    if (priority) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px" } // Cargar imágenes cuando estén a 200px de entrar en la pantalla
    );

    const currentElement = document.getElementById(`lazy-img-${src.replace(/[^a-zA-Z0-9]/g, "-")}`);
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, priority]);

  // Reiniciar el estado cuando cambia la fuente
  useEffect(() => {
    setImgSrc(src);
    setIsLoaded(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <div 
      id={`lazy-img-${src.replace(/[^a-zA-Z0-9]/g, "-")}`}
      className={`relative overflow-hidden ${className}`}
      style={{ minHeight: height ? `${height}px` : "auto" }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      {(isIntersecting || priority) && (
        <Image
          src={imgSrc}
          alt={alt}
          width={width || 800}
          height={height || 600}
          className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
          priority={priority}
        />
      )}
    </div>
  );
}
