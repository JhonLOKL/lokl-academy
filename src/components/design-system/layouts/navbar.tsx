"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { motion, AnimatePresence } from "framer-motion";
import { SideDrawer } from "../ui/drawer";

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  items?: {
    label: React.ReactNode;
    href?: string;
    active?: boolean;
    external?: boolean;
    dropdown?: {
      label: string;
      href: string;
      external?: boolean;
    }[];
  }[];
  actions?: React.ReactNode;
  mobileActions?: React.ReactNode;
  mobileItems?: NavbarProps['items'];
}

export function Navbar({
  className,
  logo,
  items,
  actions,
  mobileActions,
  mobileItems,
  ...props
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile(1024);

  const activeItems = (isMobile && mobileItems) ? mobileItems : items;

  const handleMouseEnter = (index: number) => {
    if (isMobile) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpenDropdown(index);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const toggleMobileItem = (index: number) => {
    setExpandedMobileItem(expandedMobileItem === index ? null : index);
  }

  // Cerrar dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Cerrar menú móvil cuando cambie la orientación o el tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (!isMobile) {
        setIsMenuOpen(false);
        setOpenDropdown(null);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [isMobile]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-[#E5E5E5] bg-white",
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {isMobile ? (
            <>
              {/* Mobile Left: Hamburger (Drawer Trigger) */}
              <div className="flex-shrink-0">
                <SideDrawer
                  side="left"
                  open={isMenuOpen}
                  onOpenChange={setIsMenuOpen}
                  className="bg-[#0F0F0F] border-r border-[#2A2A2A] p-0 w-[85vw] sm:max-w-sm"
                  showClose={false}
                  trigger={
                    <button
                      className="inline-flex items-center justify-center rounded-md p-2 text-[#0F0F0F] hover:bg-gray-100"
                      aria-label="Menu"
                    >
                      <Menu size={24} />
                    </button>
                  }
                >
                  <div className="flex flex-col h-full text-white">
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-[#2A2A2A]">
                      <div className="w-24 brightness-0 invert">
                        {logo || <span className="text-xl font-bold text-white">LOKL</span>}
                      </div>
                      <button 
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 -mr-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    {/* Drawer Content */}
                    <div className="flex-1 overflow-y-auto py-6 px-4">
                      <nav className="space-y-4">
                        {activeItems?.map((item, index) => (
                          <div key={index}>
                            {item.dropdown ? (
                              <div className="space-y-2">
                                <button
                                  onClick={() => toggleMobileItem(index)}
                                  className={cn(
                                    "w-full text-left px-2 py-1 text-lg font-bold flex items-center justify-between transition-colors",
                                    expandedMobileItem === index ? "text-[#5352F6]" : "text-white hover:text-[#5352F6]"
                                  )}
                                >
                                  {item.label}
                                  {expandedMobileItem === index ? (
                                    <ChevronUp className="h-5 w-5 opacity-70" />
                                  ) : (
                                    <ChevronDown className="h-5 w-5 opacity-70" />
                                  )}
                                </button>
                                <AnimatePresence>
                                  {expandedMobileItem === index && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="overflow-hidden pl-4 border-l border-[#333] ml-2"
                                    >
                                      <div className="py-2 space-y-3">
                                        {item.dropdown.map((subItem, subIndex) => (
                                          <div key={subIndex}>
                                            {subItem.external ? (
                                              <a
                                                href={subItem.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block text-base font-medium text-gray-400 hover:text-[#5352F6] transition-colors"
                                              >
                                                {subItem.label}
                                              </a>
                                            ) : (
                                              <Link
                                                href={subItem.href}
                                                className="block text-base font-medium text-gray-400 hover:text-[#5352F6] transition-colors"
                                                onClick={() => setIsMenuOpen(false)}
                                              >
                                                {subItem.label}
                                              </Link>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            ) : (
                              item.external ? (
                                <a
                                  href={item.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={cn(
                                    "block px-2 py-1 text-lg font-bold transition-colors",
                                    item.active ? "text-[#5352F6]" : "text-white hover:text-[#5352F6]"
                                  )}
                                >
                                  {item.label}
                                </a>
                              ) : (
                                <Link
                                  href={item.href || "#"}
                                  className={cn(
                                    "block px-2 py-1 text-lg font-bold transition-colors",
                                    item.active 
                                      ? "text-[#4DE29F] mt-6 text-center border border-[#4DE29F] rounded-full py-3 hover:bg-[#4DE29F]/10" // Estilo especial para CTA activo
                                      : "text-white hover:text-[#5352F6]"
                                  )}
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {item.label}
                                </Link>
                              )
                            )}
                          </div>
                        ))}
                      </nav>
                    </div>

                    {/* Drawer Footer */}
                    <div className="p-6 border-t border-[#2A2A2A]">
                      <p className="text-center text-xs text-gray-500 leading-relaxed px-4">
                        Sé parte de una comunidad, crece tu patrimonio y construye tu futuro con LOKL
                      </p>
                    </div>
                  </div>
                </SideDrawer>
              </div>

              {/* Mobile Center: Logo */}
              <div className="flex-1 flex justify-center">
                {logo || <span className="text-xl font-bold">LOKL</span>}
              </div>

              {/* Mobile Right: Profile/Actions */}
              <div className="flex-shrink-0">
                {mobileActions || actions}
              </div>
            </>
          ) : (
            <>
              {/* Desktop Layout (Original) */}
              <div className="flex items-center">
                <div className="mr-4">
                  {logo || <span className="text-xl font-bold">LOKL</span>}
                </div>

                <nav>
                  <ul className="flex space-x-8">
                    {items?.map((item, index) => (
                      <li
                        key={index}
                        className="relative"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {item.dropdown ? (
                          <div className="relative">
                            <button
                              onClick={() => toggleDropdown(index)}
                              className={cn(
                                "text-sm font-medium transition-colors hover:text-[#5352F6] flex items-center gap-1 py-4",
                                item.active ? "text-[#5352F6]" : "text-[#0F0F0F]"
                              )}
                            >
                              {item.label}
                              <motion.svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                animate={{ rotate: openDropdown === index ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </motion.svg>
                            </button>

                            <AnimatePresence>
                              {openDropdown === index && (
                                <motion.div
                                  ref={dropdownRef}
                                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                  transition={{ duration: 0.2, ease: "easeOut" }}
                                  className="absolute top-full left-0 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden"
                                >
                                  {item.dropdown.map((dropdownItem, dropdownIndex) => (
                                    dropdownItem.external ? (
                                      <a
                                        key={dropdownIndex}
                                        href={dropdownItem.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#F8F8FF] hover:text-[#5352F6] transition-colors"
                                      >
                                        {dropdownItem.label}
                                      </a>
                                    ) : (
                                      <Link
                                        key={dropdownIndex}
                                        href={dropdownItem.href}
                                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#F8F8FF] hover:text-[#5352F6] transition-colors"
                                        onClick={() => setOpenDropdown(null)}
                                      >
                                        {dropdownItem.label}
                                      </Link>
                                    )
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          item.external ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cn(
                                "text-sm font-medium transition-colors hover:text-[#5352F6] flex items-center py-4",
                                item.active ? "text-[#5352F6]" : "text-[#0F0F0F]"
                              )}
                            >
                              {item.label}
                            </a>
                          ) : (
                            item.href ? (
                              <Link
                                href={item.href}
                                className={cn(
                                  "text-sm font-medium transition-colors hover:text-[#5352F6] flex items-center py-4",
                                  item.active ? "text-[#5352F6]" : "text-[#0F0F0F]"
                                )}
                              >
                                {item.label}
                              </Link>
                            ) : null
                          )
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {!isMobile && (
                <div className="flex items-center">
                  {actions}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

