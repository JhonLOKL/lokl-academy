"use client";

/**
 * Optimización de Framer Motion con LazyMotion
 * Reduce el bundle de ~45KB a ~15KB usando solo las features necesarias
 * 
 * Uso:
 * import { MotionDiv, MotionSection } from '@/lib/framer-motion-lazy';
 * 
 * <MotionDiv animate={{ opacity: 1 }}>Content</MotionDiv>
 */

import { LazyMotion, domAnimation, m } from "framer-motion";
import { ReactNode } from "react";

// Wrapper que proporciona las features de animación
export function FramerMotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

// Componentes optimizados pre-configurados
export const MotionDiv = m.div;
export const MotionSection = m.section;
export const MotionArticle = m.article;
export const MotionSpan = m.span;
export const MotionP = m.p;
export const MotionH1 = m.h1;
export const MotionH2 = m.h2;
export const MotionH3 = m.h3;
export const MotionButton = m.button;
export const MotionA = m.a;
export const MotionImg = m.img;
export const MotionUl = m.ul;
export const MotionLi = m.li;

// Variantes de animación comunes optimizadas
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const slideInFromLeftVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export const slideInFromRightVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

export const scaleVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

// Transiciones comunes
export const smoothTransition = {
  duration: 0.3,
  ease: "easeOut",
};

export const springTransition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
};

