"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HorizontalScrollProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  showControls?: boolean;
  className?: string;
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  title,
  subtitle,
  children,
  showControls = true,
  className = "",
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.75;
    const newScrollLeft =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Mostrar flecha izquierda si no estamos al inicio
    setShowLeftArrow(container.scrollLeft > 0);
    
    // Mostrar flecha derecha si no estamos al final
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollButtons();
      container.addEventListener("scroll", checkScrollButtons);
      window.addEventListener("resize", checkScrollButtons);
      
      return () => {
        container.removeEventListener("scroll", checkScrollButtons);
        window.removeEventListener("resize", checkScrollButtons);
      };
    }
  }, []);

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight md:text-2xl">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-[#6D6C6C]">{subtitle}</p>}
        </div>
        
        {showControls && (
          <div className="flex space-x-2">
            <button
              onClick={() => scroll("left")}
              disabled={!showLeftArrow}
              className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                showLeftArrow
                  ? "border-[#E5E5E5] bg-white text-[#0F0F0F] hover:bg-[#F5F5F5]"
                  : "border-[#E5E5E5] bg-[#F5F5F5] text-[#D1D1D1]"
              }`}
              aria-label="Desplazar a la izquierda"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!showRightArrow}
              className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                showRightArrow
                  ? "border-[#E5E5E5] bg-white text-[#0F0F0F] hover:bg-[#F5F5F5]"
                  : "border-[#E5E5E5] bg-[#F5F5F5] text-[#D1D1D1]"
              }`}
              aria-label="Desplazar a la derecha"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      <div
        ref={scrollContainerRef}
        className="flex w-full gap-4 overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>
    </div>
  );
};

export default HorizontalScroll;
