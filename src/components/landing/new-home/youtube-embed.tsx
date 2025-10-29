"use client";

import { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';
import Image from 'next/image';

interface YouTubeEmbedProps {
  videoId: string;
  onPlayStateChange: (isPlaying: boolean) => void;
}

export default function YouTubeEmbed({ videoId, onPlayStateChange }: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Función para obtener la miniatura del video
  const getThumbnailUrl = (id: string) => {
    return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  };

  // Función para manejar el clic en reproducir
  const handlePlayClick = () => {
    // Siempre cargar el iframe si no está cargado al hacer clic
    if (!isLoaded) {
      setIsLoaded(true);
      // Esperamos a que el iframe se cargue antes de intentar reproducir
      setTimeout(() => {
        if (iframeRef.current) {
          // Enviamos mensaje para reproducir inmediatamente
          iframeRef.current.contentWindow?.postMessage(
            JSON.stringify({ event: 'command', func: 'playVideo' }),
            '*'
          );
          setIsPlaying(true);
          onPlayStateChange(true);
        }
      }, 300);
    } else if (isPlaying) {
      // Si ya está reproduciendo, pausamos
      if (iframeRef.current) {
        iframeRef.current.contentWindow?.postMessage(
          JSON.stringify({ event: 'command', func: 'pauseVideo' }),
          '*'
        );
        setIsPlaying(false);
        onPlayStateChange(false);
      }
    } else {
      // Si está cargado pero no reproduciendo, reproducimos
      if (iframeRef.current) {
        iframeRef.current.contentWindow?.postMessage(
          JSON.stringify({ event: 'command', func: 'playVideo' }),
          '*'
        );
        setIsPlaying(true);
        onPlayStateChange(true);
      }
    }
  };

  // Inicializar el componente
  useEffect(() => {
    // Asegurarnos de que el componente esté listo para cargar el iframe
    setIsInitialized(true);
  }, []);

  // Configurar listener para mensajes del iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        // Detectar cuando el video termina o se pausa
        if (data.event === 'onStateChange') {
          // 0: terminado, 2: pausado
          if (data.info === 0 || data.info === 2) {
            setIsPlaying(false);
            onPlayStateChange(false);
          }
          // 1: reproduciendo
          else if (data.info === 1) {
            setIsPlaying(true);
            onPlayStateChange(true);
          }
        }
      } catch (e) {
        // Ignorar mensajes que no son JSON
        console.error(e);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [onPlayStateChange]);

  // Cargar el iframe inmediatamente al montar el componente
  useEffect(() => {
    if (isInitialized && !isLoaded) {
      setIsLoaded(true);
    }
  }, [isInitialized, isLoaded]);
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-black rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      {/* Thumbnail que se muestra cuando no está cargado el iframe */}
      {!isLoaded && (
        <div 
          onClick={handlePlayClick}
          className="w-full h-full cursor-pointer relative"
        >
          <Image 
            src={getThumbnailUrl(videoId)} 
            alt="Video thumbnail"
            fill
            className="object-cover rounded-xl"
          />
          
          {/* Overlay con botón de play sobre la miniatura */}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-xl">
            <div className="bg-white/95 rounded-full p-4 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg">
              <Play className="h-8 w-8 text-[#5352F6] ml-1" fill="currentColor" />
            </div>
          </div>
        </div>
      )}
      
      {/* YouTube iframe (cargado automáticamente) */}
      {isLoaded && (
        <iframe
          ref={iframeRef}
          className="w-full h-full absolute inset-0 rounded-xl"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&enablejsapi=1&controls=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&origin=${encodeURIComponent(window.location.origin)}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}
