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
            Únete a miles de estudiantes que ya están transformando su futuro financiero con LOKL Academy.
          </Paragraph>
          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button size="lg" variant="dark">Únete a LOKL Academy</Button>
            <Button size="lg" variant="secondary">Conoce nuestros planes</Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CtaSection;
