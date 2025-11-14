"use client";

import React, { useEffect, useRef, useState } from 'react';
import { scrollToSection } from '@/helpers/functions';

interface MenuItem {
  name: string;
  id: string;
}

interface MenuTabsProps {
  menuItems: MenuItem[];
  scroll?: boolean;
  onItemClick?: (item: MenuItem) => void;
  activeIndex?: number;
}

export default function MenuTabs({ menuItems, scroll = false, onItemClick, activeIndex }: MenuTabsProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const dragMovedRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (activeIndex !== undefined && menuItems[activeIndex]) {
      setActiveSection(menuItems[activeIndex].id);
    }
  }, [activeIndex, menuItems]);

  useEffect(() => {
    if (!scroll) return;

    const handleScroll = () => {
      const sections = menuItems.map(item => item.id);
      const scrollPosition = window.scrollY + 200; // Offset para considerar el navbar

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Llamar una vez al cargar

    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuItems, scroll]);

  useEffect(() => {
    const handlePointerUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDragging(false);
    };

    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, []);

  const handleDragStart = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    isDraggingRef.current = true;
    dragMovedRef.current = false;
    setIsDragging(true);
    startXRef.current = event.clientX;
    scrollLeftRef.current = containerRef.current.scrollLeft;
  };

  const handleDragMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    event.preventDefault();
    const walk = event.clientX - startXRef.current;
    if (Math.abs(walk) > 4) {
      dragMovedRef.current = true;
    }
    containerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleDragEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, item: MenuItem) => {
    if (dragMovedRef.current) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    setActiveSection(item.id);
    if (onItemClick) {
      onItemClick(item);
    } else {
      scrollToSection(item.id, 180);
    }
  };

  const handleArrowScroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const scrollAmount = containerRef.current.clientWidth * 0.6;
    containerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative w-full flex items-center gap-2">
      <button
        type="button"
        aria-label="Ver pestañas anteriores"
        onClick={() => handleArrowScroll('left')}
        className="md:hidden flex-shrink-0 w-9 h-9 mr-2 rounded-full bg-white/95 shadow-md border border-black/5 flex items-center justify-center"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="rotate-180"
        >
          <path
            d="M12.5007 22.9166C18.2538 22.9166 22.9173 18.253 22.9173 12.4999C22.9173 6.74679 18.2538 2.08325 12.5007 2.08325C6.74753 2.08325 2.08398 6.74679 2.08398 12.4999C2.08398 18.253 6.74753 22.9166 12.5007 22.9166Z"
            stroke="#656565"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.1875 16.1772L14.8542 12.5001L11.1875 8.823"
            stroke="#656565"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="flex-1 min-w-0">
        <div
          ref={containerRef}
          className={`flex flex-nowrap justify-start md:justify-center gap-2 md:gap-4 overflow-x-auto pb-2 scrollbar-hide select-none px-4 ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          onPointerDown={handleDragStart}
          onPointerMove={handleDragMove}
          onPointerUp={handleDragEnd}
        >
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={(event) => handleClick(event, item)}
              className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all whitespace-nowrap ${
                activeSection === item.id
                  ? 'bg-[#5352F6] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Ver más pestañas"
        onClick={() => handleArrowScroll('right')}
        className="md:hidden flex-shrink-0 w-9 h-9 ml-2 rounded-full bg-white/95 shadow-md border border-black/5 flex items-center justify-center"
      >
        <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.5007 22.9166C18.2538 22.9166 22.9173 18.253 22.9173 12.4999C22.9173 6.74679 18.2538 2.08325 12.5007 2.08325C6.74753 2.08325 2.08398 6.74679 2.08398 12.4999C2.08398 18.253 6.74753 22.9166 12.5007 22.9166Z"
            stroke="#656565"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.1875 16.1772L14.8542 12.5001L11.1875 8.823"
            stroke="#656565"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}


