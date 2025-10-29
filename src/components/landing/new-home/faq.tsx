"use client";

import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, ChevronUp, ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [searchTerm, ] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const categories = [
    { id: 'riesgos', label: 'Riesgos', color: 'bg-orange-100 text-orange-800 border-orange-200' },
    { id: 'seguridad', label: 'Seguridad', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { id: 'funcionamiento', label: 'Funcionamiento', color: 'bg-teal-100 text-teal-800 border-teal-200' },
    { id: 'liquidez', label: 'Liquidez', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { id: 'beneficios', label: 'Beneficios', color: 'bg-pink-100 text-pink-800 border-pink-200' },
    { id: 'proyectos', label: 'Proyectos', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' }
  ];

  const faqsData = [
    // Columna A
    {
      id: 'como-invertir',
      question: '¿Cómo puedo invertir?',
      answer: 'La inversión en LOKL es 100% digital y puedes comenzar siguiendo estos pasos:\n\n1. Regístrate en la plataforma\n2. Elige el proyecto Nido de Agua\n3. Define el monto de tu participación\n4. Llena tus datos personales y firma el contrato\n5. Paga tu membresía\n6. Revisa en tu perfil la participación\n\nPuedes pagar por PSE o tarjeta de crédito (nacional e internacional). Ten presente que si utilizas tarjeta de crédito tendrás un fee adicional de 2,5%.',
      category: 'funcionamiento',
      column: 'A'
    },
    {
      id: 'riesgos-proyectos',
      question: '¿Qué riesgos tienen los proyectos en los que participo?',
      answer: 'Los principales riesgos que manejamos son:\n\n• Riesgo de Construcción: Mitigado con estudios de suelos y estructurales que aseguran la viabilidad del proyecto.\n\n• Riesgo de Inversión: Si no alcanza el punto de equilibrio, el dinero se devuelve descontando costos transaccionales.\n\n• Riesgo Comercial: Contratos de operación con indicadores de éxito, metas comerciales y control de costos.\n\n• Riesgo de Valorización: Modelo de flujo de caja futuro con mercado secundario para potencial de compra.',
      category: 'riesgos',
      column: 'A'
    },
    {
      id: 'beneficios-lokl',
      question: '¿Cuáles son los beneficios de invertir con LOKL?',
      answer: 'Los beneficios varían según el monto de inversión. Por ejemplo, si inviertes desde 15 millones tendrás: 10% de descuento en espacios operados por Nido de Agua, participación en loterías para noches y beneficios, ser el primero en listas de espera para nuevos proyectos, y acceso al mercado secundario.',
      category: 'beneficios',
      column: 'A'
    },
    {
      id: 'proyectos-exitosos',
      question: '¿Qué proyectos exitosos han tenido?',
      answer: 'Nuestro proyecto exitoso es Indie Universe, un coliving para creativos ubicado en el barrio Laureles - Medellín con proyecciones de retorno de +12% E.A. Hemos levantado +$3.500 millones COP y somos +500 inversionistas. Actualmente estamos en etapa 3, con un valor del Unit de $125.000, con posibilidad de invertir a través de mercado secundario.',
      category: 'proyectos',
      column: 'A'
    },

    // Columna B
    {
      id: 'reinversion-proyectos',
      question: '¿Hay posibilidad de reinversión en otros proyectos?',
      answer: 'Sí, puedes reinvertir en los proyectos utilizando tanto las ganancias generadas como tus ingresos adicionales. Uno de los beneficios de invertir con LOKL es que puedes reinvertir con el Unit al mismo precio al que inviertiste inicialmente.',
      category: 'funcionamiento',
      column: 'B'
    },
    {
      id: 'certificado-inversion',
      question: '¿Cuál es el certificado de la inversión?',
      answer: 'Tu inversión está respaldada por un contrato de mandato que te otorga derechos fiduciarios sobre el proyecto, es decir, obtienes una participación sobre este según el monto que inviertas.',
      category: 'seguridad',
      column: 'B'
    },
    {
      id: 'mercado-secundario',
      question: '¿Qué es mercado secundario?',
      answer: 'LOKL te ofrece vender tu participación a terceros interesados en invertir en el proyecto, lo que se conoce como mercado secundario. Puedes retirar tu inversión a través de la plataforma de LOKL luego del primer año sobre el cual habrás obtenido valorización, en caso que aún el proyecto se encuentre en fase de construcción, o valorización y rentabilidad en caso que el proyecto ya esté operando.',
      category: 'liquidez',
      column: 'B'
    }
  ];

  const filteredFAQs = faqsData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const columnA = filteredFAQs.filter(faq => faq.column === 'A');
  const columnB = filteredFAQs.filter(faq => faq.column === 'B');

  const toggleExpandAll = () => {
    if (expandedItems.length === filteredFAQs.length) {
      setExpandedItems([]);
    } else {
      setExpandedItems(filteredFAQs.map(faq => faq.id));
    }
  };

  return (
    <section id="faq" className="py-12 md:py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Header */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Preguntas <span className="text-[#5352F6]">frecuentes</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Respuestas claras a las dudas más importantes sobre invertir con <span className="text-[#5352F6] font-medium">LOKL</span>
            </p>
          </div>

          {/* Right: Utilities */}
          <div className="space-y-4">
            {/* Category Chips - Hidden on mobile */}
            <div className="hidden md:flex flex-wrap gap-2">
              <Badge
                variant={selectedCategory === '' ? "default" : "secondary"}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setSelectedCategory('')}
              >
                Todas
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category.id}
                  variant="outline"
                  className={`cursor-pointer hover:opacity-80 transition-opacity ${
                    selectedCategory === category.id ? category.color : ''
                  }`}
                  onClick={() => setSelectedCategory(category.id === selectedCategory ? '' : category.id)}
                >
                  {category.label}
                </Badge>
              ))}
            </div>

            {/* Expand/Collapse All */}
            <div className="flex justify-center md:justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleExpandAll}
                className="text-[#5352F6] hover:text-[#5352F6]/80"
              >
                {expandedItems.length === filteredFAQs.length ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-2" />
                    Contraer todo
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Expandir todo
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-12">
          {/* Column A */}
          <div>
            <Accordion 
              type="multiple" 
              value={expandedItems}
              onValueChange={setExpandedItems}
              className="space-y-4"
            >
              {columnA.map((faq) => (
                <AccordionItem 
                  key={faq.id} 
                  value={faq.id} 
                  className="border rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left hover:no-underline px-6 py-4 [&[data-state=open]>svg]:rotate-180">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="h-5 w-5 text-[#5352F6] mt-0.5 flex-shrink-0" />
                      <span className="font-medium">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground px-6 pb-6 pt-0">
                    <div className="pl-8 whitespace-pre-line">
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Column B */}
          <div>
            <Accordion 
              type="multiple" 
              value={expandedItems}
              onValueChange={setExpandedItems}
              className="space-y-4"
            >
              {columnB.map((faq) => (
                <AccordionItem 
                  key={faq.id} 
                  value={faq.id} 
                  className="border rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left hover:no-underline px-6 py-4 [&[data-state=open]>svg]:rotate-180">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="h-5 w-5 text-[#5352F6] mt-0.5 flex-shrink-0" />
                      <span className="font-medium">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground px-6 pb-6 pt-0">
                    <div className="pl-8 whitespace-pre-line">
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

      </div>

      {/* Schema JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqsData.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
    </section>
  );
}
