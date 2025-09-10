"use client";

import React from "react";
import NextImage, { ImageProps } from "next/image";

type SafeImageProps = ImageProps & {
  fallbackSrc?: string;
};

const DEFAULT_FALLBACK = "/images/modern-building.jpg";

function isLikelyValidSrc(src: unknown): src is string {
  if (typeof src !== "string") return false;
  const trimmed = src.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith("/")) return true;
  if (trimmed.startsWith("data:")) return true;
  if (trimmed.startsWith("blob:")) return true;
  try {
    const url = new URL(trimmed);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function SafeImage({ src, fallbackSrc = DEFAULT_FALLBACK, onError, alt, ...rest }: SafeImageProps) {
  const initial = React.useMemo(() => (isLikelyValidSrc(src) ? (src as string) : fallbackSrc), [src, fallbackSrc]);
  const [currentSrc, setCurrentSrc] = React.useState<string>(initial);

  React.useEffect(() => {
    setCurrentSrc(isLikelyValidSrc(src) ? (src as string) : fallbackSrc);
  }, [src, fallbackSrc]);

  return (
    <NextImage
      src={currentSrc}
      alt={alt || "Imagen"}
      onError={(e) => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
        if (onError) onError(e);
      }}
      {...rest}
    />
  );
}


