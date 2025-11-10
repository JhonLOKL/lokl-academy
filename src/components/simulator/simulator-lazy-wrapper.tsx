"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

// Lazy load del simulador solo cuando esté cerca del viewport
const Simulator = dynamic(() => import("./simulator"), {
  loading: () => (
    <div className="w-full min-h-[600px] bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-[#5352F6] rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg font-semibold text-gray-700">Cargando simulador...</p>
        <p className="text-sm text-gray-500 mt-2">Preparando tu proyección de inversión</p>
      </div>
    </div>
  ),
  ssr: false,
});

interface SimulatorLazyWrapperProps {
  hideRightColumn?: boolean;
  id?: string;
}

export default function SimulatorLazyWrapper({ hideRightColumn, id }: SimulatorLazyWrapperProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = wrapperRef.current;
    
    if (!currentRef) return;

    // Usar IntersectionObserver para cargar el simulador cuando esté cerca
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect(); // Dejar de observar una vez cargado
          }
        });
      },
      {
        rootMargin: "400px", // Cargar 400px antes de que entre en viewport
        threshold: 0,
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={wrapperRef} id={id} className="w-full">
      {shouldLoad ? (
        <Simulator hideRightColumn={hideRightColumn} />
      ) : (
        <div className="w-full min-h-[600px] bg-gradient-to-b from-slate-50 to-white" />
      )}
    </div>
  );
}

