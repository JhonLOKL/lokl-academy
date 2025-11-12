"use client";

import { useEffect, useState, useRef } from "react";
import Simulator from "./simulator";

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

