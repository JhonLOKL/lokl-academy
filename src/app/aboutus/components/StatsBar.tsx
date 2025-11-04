"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import useCountUp from "@/hooks/useCountUp";

interface StatsBarProps {
  investors: number;
  totalInvestmentValue: number;
}

interface PopoverDisclaimerProps {
  triggerRef: React.RefObject<HTMLDivElement | null>;
  isVisible: boolean;
}

const PopoverDisclaimer = ({ triggerRef, isVisible }: PopoverDisclaimerProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  // Posicionar el popover manualmente
  useEffect(() => {
    if (triggerRef.current && popoverRef.current && isVisible) {
      const trigger = triggerRef.current.getBoundingClientRect();
      const popover = popoverRef.current;
      
      // Posicionar arriba del trigger
      popover.style.position = 'fixed';
      popover.style.left = `${trigger.left - 100}px`;
      popover.style.top = `${trigger.top - popover.offsetHeight - 10}px`;
      popover.style.zIndex = '50';
    }
  }, [triggerRef, isVisible]);

  return (
    <div
      ref={popoverRef}
      className={`${
        isVisible ? "block" : "hidden"
      } font-sans w-72 bg-white text-sm text-[#928C8C] p-4 border mb-2 rounded shadow-lg`}
    >
      <span className="font-bold font-sans">Las estimaciones de retorno</span> dependen netamente de la operación y pueden variar acorde a los resultados de la misma.
    </div>
  );
};

export default function StatsBar({ investors, totalInvestmentValue }: StatsBarProps) {
  const [popoverShow, setPopoverShow] = useState(false);
  const btnTriggerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const blackBarRef = useRef<HTMLDivElement>(null);

  const animatedInvestors = useCountUp(investors, 1700); 
  const animatedInvestmentValue = useCountUp(totalInvestmentValue, 1700);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (blackBarRef.current) observer.observe(blackBarRef.current);

    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: animatedInvestors, label: "Total inversionistas" },
    { value: "12-14% E.A", label: "Retorno estimado", icon: true },
    { value: `${animatedInvestmentValue.toLocaleString("es-ES")}M`, label: "Inversión a la fecha" },
  ];

  return (
    <div
      ref={blackBarRef}
      className="relative px-4 sm:px-6 md:px-12 lg:px-24 xl:px-[200px] w-full gap-3 sm:gap-4 md:gap-6 lg:gap-7 min-h-[130px] h-auto md:h-[174px] py-3 md:py-2.5 bottom-0 bg-black flex flex-row justify-between items-center"
    >
      {stats.map((item, index) => (
        <motion.div
          key={index}
          className="flex items-center space-x-2 flex-1 justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8, delay: index * 0.3 }}
        >
              {/* Icon Plus */}
              <div className="relative w-[28px] h-[20px] sm:w-[35px] sm:h-[25px] md:w-[56px] md:h-[46px] flex-shrink-0">
                <Image
                  src="/images/about-us/img-boton-plus.png"
                  alt="icon plus"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 28px, (max-width: 768px) 35px, 56px"
                />
              </div>

          <div
            className="text-white text-center min-w-0 flex-1"
          >
            <div className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-[40px] font-mono font-bold relative break-words">
              {item.value}
              {item.icon && (
                <div
                  ref={btnTriggerRef}
                  onClick={() => setPopoverShow(!popoverShow)}
                  className="absolute top-0 -right-4 cursor-pointer mt-1"
                >
                      <motion.div
                        className="relative w-4 h-4"
                        initial={{ opacity: 0, y: -10 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                        transition={{ duration: 0.5, delay: index * 0.3 + 0.3 }}
                      >
                        <Image
                          src="/images/about-us/img-info.png"
                          alt="info icon"
                          fill
                          className="object-contain"
                          sizes="16px"
                        />
                      </motion.div>
                </div>
              )}
            </div>
            <div className="text-[10px] sm:text-xs md:text-base lg:text-lg mt-1 md:mt-2 break-words">{item.label}</div>
          </div>
        </motion.div>
      ))}
      <PopoverDisclaimer triggerRef={btnTriggerRef} isVisible={popoverShow} />
    </div>
  );
}

