"use client";


interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
}

export const ImageWithFallback = ({ src, alt, className }: ImageWithFallbackProps) => {
  return (
    <img 
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null;
        target.src = "https://via.placeholder.com/800x600?text=Imagen+no+disponible";
      }}
    />
  );
};
