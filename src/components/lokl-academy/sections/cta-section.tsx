"use client";

import React from "react";
import { H2, Paragraph, Button } from "@/components/design-system";
import { motion } from "framer-motion";

const CtaSection = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <H2 variant="section" color="white" className="mb-6">
            Comienza tu camino hacia el éxito en inversiones inmobiliarias
          </H2>
          <Paragraph variant="lead" color="white" className="mb-8">
            Registrate completamente gratis y comienza a invertir en propiedades inmobiliarias hoy mismo.
          </Paragraph>
          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button size="lg" variant="dark" onClick={() => window.open("https://www.lokl.life/register?utmSource=lokl-academy&utmMedium=organic", "_blank")}>Registrate en LOKL</Button>
            <Button size="lg" variant="secondary" onClick={() => window.open("https://www.lokl.life#projects?utmSource=lokl-academy&utmMedium=organic", "_blank")}>Conoce nuestros proyectos</Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CtaSection;
