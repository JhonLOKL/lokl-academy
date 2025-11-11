"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface YouTubeLiteProps {
  videoId: string;
  title?: string;
  className?: string;
  thumbnailQuality?: "default" | "mqdefault" | "hqdefault" | "sddefault" | "maxresdefault";
  autoplay?: boolean;
  controls?: boolean;
  rel?: boolean;
  modestbranding?: boolean;
  showCaption?: boolean;
  caption?: string;
}

/**
 * Componente optimizado de YouTube que usa la técnica "facade"
 * Solo carga el iframe pesado de YouTube cuando el usuario hace clic
 * Ahorra ~6.4 segundos de tiempo de CPU en la carga inicial
 */
export default function YouTubeLite({
  videoId,
  title = "Video de YouTube",
  className = "",
  thumbnailQuality = "maxresdefault",
  autoplay = true,
  controls = true,
  rel = false,
  modestbranding = true,
  showCaption = false,
  caption,
}: YouTubeLiteProps) {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  const getThumbnailUrl = () => {
    return `https://i.ytimg.com/vi/${videoId}/${thumbnailQuality}.jpg`;
  };

  const getEmbedUrl = () => {
    const params = new URLSearchParams({
      autoplay: autoplay ? "1" : "0",
      controls: controls ? "1" : "0",
      rel: rel ? "1" : "0",
      modestbranding: modestbranding ? "1" : "0",
      enablejsapi: "1",
      playsinline: "1",
    });
    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
  };

  const handlePlayClick = () => {
    setIsIframeLoaded(true);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
        {!isIframeLoaded ? (
          // Facade: Miniatura con botón de play
          <button
            onClick={handlePlayClick}
            className="group relative h-full w-full cursor-pointer"
            aria-label={`Reproducir video: ${title}`}
          >
            {/* Thumbnail */}
            <Image
              src={getThumbnailUrl()}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority={false}
            />

            {/* Overlay oscuro */}
            <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/30" />

            {/* Botón de Play */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-red-600 p-4 shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-red-700">
                <Play className="h-8 w-8 text-white ml-1" fill="currentColor" />
              </div>
            </div>

            {/* Badge de YouTube */}
            <div className="absolute bottom-4 right-4 rounded bg-black/70 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              YouTube
            </div>
          </button>
        ) : (
          // Iframe real de YouTube (solo se carga al hacer clic)
          <iframe
            src={getEmbedUrl()}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute left-0 top-0 h-full w-full border-0"
            loading="lazy"
          />
        )}
      </div>

      {/* Caption opcional */}
      {showCaption && caption && (
        <p className="mt-2 text-center text-sm text-gray-600">{caption}</p>
      )}
    </div>
  );
}

