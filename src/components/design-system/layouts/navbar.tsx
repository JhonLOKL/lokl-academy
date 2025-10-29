"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
            
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                {items?.map((item, index) => (
                  <li key={index} className="relative">
                    {item.dropdown ? (
                      <div className="relative" ref={dropdownRef}>
                        <button
                          onClick={() => toggleDropdown(index)}
                          className={cn(
                            "text-sm font-medium transition-colors hover:text-[#5352F6] flex items-center gap-1",
                            item.active ? "text-[#5352F6]" : "text-[#0F0F0F]"
                          )}
                        >
                          {item.label}
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {openDropdown === index && (
                          <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                            {item.dropdown.map((dropdownItem, dropdownIndex) => (
                              <a
                                key={dropdownIndex}
                                href={dropdownItem.href}
                                target={dropdownItem.external ? "_blank" : undefined}
                                rel={dropdownItem.external ? "noopener noreferrer" : undefined}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#5352F6] transition-colors"
                              >
                                {dropdownItem.label}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <a
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        className={cn(
                          "text-sm font-medium transition-colors hover:text-[#5352F6]",
                          item.active ? "text-[#5352F6]" : "text-[#0F0F0F]"
                        )}
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          <div className="hidden items-center md:flex">
            {actions}
          </div>
          
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-[#0F0F0F] md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="container mx-auto px-4 md:hidden">
          <div className="space-y-1 pb-3 pt-2">
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
                          <a
                            key={dropdownIndex}
                            href={dropdownItem.href}
                            target={dropdownItem.external ? "_blank" : undefined}
                            rel={dropdownItem.external ? "noopener noreferrer" : undefined}
                            className="block rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-[#F5F5F5] hover:text-[#5352F6]"
                          >
                            {dropdownItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className={cn(
                      "block rounded-md px-3 py-2 text-base font-medium",
                      item.active
                        ? "bg-[#F5F5F5] text-[#5352F6]"
                        : "text-[#0F0F0F] hover:bg-[#F5F5F5] hover:text-[#5352F6]"
                    )}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </div>
          {actions && (
            <div className="border-t border-[#E5E5E5] pb-3 pt-4">
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

