"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { motion, AnimatePresence } from "framer-motion";

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
}

export function Navbar({
  className,
  logo,
  items,
  actions,
  ...props
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile(1024);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
    }, 150); // Delay de cierre para mayor estabilidad
  };

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

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
          <div className="flex items-center">
            <div className="mr-4">
              {logo || <span className="text-xl font-bold">LOKL</span>}
            </div>

            {!isMobile && (
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
            )}
          </div>

          {!isMobile && (
            <div className="flex items-center">
              {actions}
            </div>
          )}

          {isMobile && (
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-[#0F0F0F]"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="container mx-auto px-4 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="space-y-1 pb-6 pt-2">
            {items?.map((item, index) => (
              <div key={index}>
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(index)}
                      className={cn(
                        "w-full text-left rounded-md px-3 py-2 text-base font-medium flex items-center justify-between",
                        item.active
                          ? "bg-[#F5F5F5] text-[#5352F6]"
                          : "text-[#0F0F0F] hover:bg-[#F5F5F5] hover:text-[#5352F6]"
                      )}
                    >
                      {item.label}
                      <svg className={cn("w-4 h-4 transition-transform", openDropdown === index ? "rotate-180" : "")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openDropdown === index && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.dropdown.map((dropdownItem, dropdownIndex) => (
                          dropdownItem.external ? (
                            <a
                              key={dropdownIndex}
                              href={dropdownItem.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-[#F5F5F5] hover:text-[#5352F6]"
                            >
                              {dropdownItem.label}
                            </a>
                          ) : (
                            <Link
                              key={dropdownIndex}
                              href={dropdownItem.href}
                              className="block rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-[#F5F5F5] hover:text-[#5352F6]"
                              onClick={() => {
                                setOpenDropdown(null);
                                setIsMenuOpen(false);
                              }}
                            >
                              {dropdownItem.label}
                            </Link>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "block rounded-md px-3 py-2 text-base font-medium",
                        item.active
                          ? "bg-[#F5F5F5] text-[#5352F6]"
                          : "text-[#0F0F0F] hover:bg-[#F5F5F5] hover:text-[#5352F6]"
                      )}
                    >
                      {item.label}
                    </a>
                  ) : (
                    item.href ? (
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-md px-3 py-2 text-base font-medium",
                          item.active
                            ? "bg-[#F5F5F5] text-[#5352F6]"
                            : "text-[#0F0F0F] hover:bg-[#F5F5F5] hover:text-[#5352F6]"
                        )}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : null
                  )
                )}
              </div>
            ))}
          </div>
          {actions && (
            <div className="border-t border-[#E5E5E5] pb-6 pt-4">
              <div className="space-y-2">
                {actions}
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

