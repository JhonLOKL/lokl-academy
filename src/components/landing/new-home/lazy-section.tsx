"use client";

import { useState, useEffect, ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  threshold?: number;
  rootMargin?: string;
  placeholder?: ReactNode;
}

export default function LazySection({
  children,
  className = "",
  id,
  threshold = 0.1,
  rootMargin = "200px 0px",
  placeholder,
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const sectionId = id || `lazy-section-${Math.random().toString(36).substr(2, 9)}`;
    const currentElement = document.getElementById(sectionId);

    if (!currentElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(currentElement);

    return () => {
      observer.disconnect();
    };
  }, [id, threshold, rootMargin]);

  useEffect(() => {
    if (isVisible) {
      // Pequeño retraso para asegurar una transición suave
      const timer = setTimeout(() => {
        setHasLoaded(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <section
      id={id || `lazy-section-${Math.random().toString(36).substr(2, 9)}`}
      className={`${className} transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {isVisible ? (
        children
      ) : (
        placeholder || (
          <div className="w-full h-64 bg-gray-100 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-[#5352F6] rounded-full animate-spin"></div>
          </div>
        )
      )}
    </section>
  );
}
