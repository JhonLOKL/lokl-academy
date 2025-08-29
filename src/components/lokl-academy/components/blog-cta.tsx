"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface BlogCTAProps {
  heading: string;
  content?: string;
  buttonText: string;
  buttonUrl: string;
  buttonVariant?: "primary" | "secondary" | "outline";
  className?: string;
}

const BlogCTA: React.FC<BlogCTAProps> = ({
  heading,
  content,
  buttonText,
  buttonUrl,
  buttonVariant = "primary",
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded-xl ${className}`}
    >
      {/* Fondo con gradiente y patrón */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5352F6] to-[#4A4AE5] opacity-95">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>
      
      {/* Círculos decorativos */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white opacity-10"></div>
      <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white opacity-10"></div>
      
      {/* Contenido */}
      <div className="relative z-10 p-8 md:p-12">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h3 
            className="mb-4 text-2xl font-extrabold text-white md:text-3xl"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {heading}
          </motion.h3>
          
          {content && (
            <motion.p 
              className="mb-8 text-lg text-white/90"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {content}
            </motion.p>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link 
              href={buttonUrl} 
              className={`
                inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-medium shadow-lg transition-all duration-300
                ${buttonVariant === "secondary" ? 
                  "bg-black text-white hover:bg-black/90" : 
                buttonVariant === "outline" ? 
                  "border-2 border-white bg-transparent text-white hover:bg-white/10" : 
                  "bg-white text-[#5352F6] hover:bg-gray-100"}
              `}
            >
              {buttonText}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="ml-2"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCTA;
