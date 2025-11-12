"use client";

import React, { useEffect, useState } from 'react';
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

  const handleClick = (item: MenuItem) => {
    setActiveSection(item.id);
    if (onItemClick) {
      onItemClick(item);
    } else {
      scrollToSection(item.id, 180);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 md:gap-4 overflow-x-auto pb-2 scrollbar-hide">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item)}
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
  );
}


