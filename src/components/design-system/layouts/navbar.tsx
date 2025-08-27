"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  items?: {
    label: string;
    href: string;
    active?: boolean;
    external?: boolean;
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
                  <li key={index}>
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
              <a
                key={index}
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
