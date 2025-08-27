"use client";

import React from "react";
import { H2, Paragraph, H3 } from "@/components/design-system";
import { BookOpen, Headphones, FileText, TrendingUp, Video, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <BookOpen className="h-10 w-10 text-[#5352F6]" />,
      title: "Cursos Online",
      description: "Aprende a tu ritmo con cursos diseñados por expertos en inversiones inmobiliarias."
    },
    {
      icon: <Headphones className="h-10 w-10 text-[#5352F6]" />,
      title: "Podcasts de Expertos",
      description: "Escucha conversaciones con los mejores profesionales del sector inmobiliario."
    },
    {
      icon: <FileText className="h-10 w-10 text-[#5352F6]" />,
      title: "Blogs Actualizados",
      description: "Contenido de valor sobre inversiones, bienes raíces e inteligencia artificial."
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-[#5352F6]" />,
      title: "Últimas Noticias",
      description: "Mantente al día con las tendencias y oportunidades del mercado inmobiliario."
    },
    {
      icon: <Video className="h-10 w-10 text-[#5352F6]" />,
      title: "Videos Educativos",
      description: "Contenido visual que facilita el aprendizaje de conceptos complejos."
    },
    {
      icon: <MessageCircle className="h-10 w-10 text-[#5352F6]" />,
      title: "Entrevistas",
      description: "Aprende de las experiencias de inversores exitosos y referentes del sector."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mb-12 text-center">
        <H2 variant="section" className="mb-4">
          Todo lo que necesitas para <span className="text-[#5352F6]">dominar las inversiones</span>
        </H2>
        <Paragraph variant="lead" color="muted" className="mx-auto max-w-2xl">
          Cursos diseñados para convertirte en un experto en bienes raíces e inversiones, con materiales actualizados y accesibles.
        </Paragraph>
      </div>

      <motion.div 
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            className="rounded-lg bg-white p-6 shadow-sm transition-transform hover:translate-y-[-4px]"
            variants={itemVariants}
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F5F5]">
              {benefit.icon}
            </div>
            <H3 variant="feature" className="mb-2">
              {benefit.title}
            </H3>
            <Paragraph color="muted">
              {benefit.description}
            </Paragraph>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BenefitsSection;
