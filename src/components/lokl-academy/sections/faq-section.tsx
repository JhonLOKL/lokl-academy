"use client";

import React from "react";
import { H2, Paragraph } from "@/components/design-system";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const FaqSection = () => {
  const faqs = [
    {
      question: "¿Qué incluye el acceso a LOKL Academy?",
      answer: "El acceso a LOKL Academy incluye todos nuestros cursos en línea, biblioteca de podcasts, artículos de blog, noticias actualizadas, entrevistas exclusivas y recursos descargables. También tendrás acceso a nuestra comunidad de inversores y eventos virtuales mensuales."
    },
    {
      question: "¿Cómo puedo inscribirme a los cursos?",
      answer: "Para inscribirte a nuestros cursos, simplemente crea una cuenta en LOKL Academy, navega por nuestro catálogo de cursos y selecciona el que te interese. Puedes inscribirte individualmente a cada curso o adquirir una membresía que te dará acceso ilimitado a todo el contenido."
    },
    {
      question: "¿Los cursos tienen certificación?",
      answer: "Sí, todos nuestros cursos ofrecen un certificado de finalización que puedes añadir a tu perfil profesional. Algunos cursos avanzados también ofrecen certificaciones especializadas reconocidas en el sector inmobiliario."
    },
    {
      question: "¿Puedo acceder al contenido desde cualquier dispositivo?",
      answer: "Absolutamente. LOKL Academy está optimizada para funcionar en cualquier dispositivo: ordenadores, tablets y smartphones. Nuestra plataforma se adapta a cualquier tamaño de pantalla para que puedas aprender donde y cuando quieras."
    },
    {
      question: "¿Con qué frecuencia se actualiza el contenido?",
      answer: "Actualizamos nuestro contenido semanalmente. Los cursos se revisan trimestralmente para asegurar que la información esté al día, publicamos nuevos artículos de blog tres veces por semana, y lanzamos episodios de podcast cada semana."
    },
    {
      question: "¿Ofrecen soporte para dudas sobre los cursos?",
      answer: "Sí, todos nuestros cursos cuentan con un foro de preguntas donde los instructores responden regularmente. Además, organizamos sesiones de preguntas y respuestas en vivo mensualmente para los miembros de la plataforma."
    }
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="mb-12 text-center">
        <H2 variant="section" className="mb-4">
          Preguntas <span className="text-[#5352F6]">frecuentes</span>
        </H2>
        <Paragraph variant="lead" color="muted" className="mx-auto max-w-2xl">
          Resolvemos tus dudas sobre LOKL Academy y cómo sacarle el máximo provecho.
        </Paragraph>
      </div>

      <motion.div 
        className="mx-auto max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                <Paragraph color="muted">
                  {faq.answer}
                </Paragraph>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  );
};

export default FaqSection;
