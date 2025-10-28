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
    { id: 'pagos', label: 'Pagos', color: 'bg-green-100 text-green-800 border-green-200' },
    { id: 'impuestos', label: 'Impuestos', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { id: 'seguridad', label: 'Seguridad', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { id: 'funcionamiento', label: 'Funcionamiento', color: 'bg-teal-100 text-teal-800 border-teal-200' },
    { id: 'liquidez', label: 'Liquidez', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' }
  ];

  const faqsData = [
    // Columna A
    {
      id: 'seguridad-regulacion',
      question: '¿Es seguro invertir con LOKL y quién nos regula?',
      answer: 'LOKL opera bajo el marco legal colombiano para plataformas de financiación participativa. Estamos registrados ante la Cámara de Comercio y cumplimos con todas las regulaciones aplicables. Utilizamos encriptación SSL 256-bit, autenticación de dos factores y auditorías periódicas para proteger tu información y fondos.',
      category: 'seguridad',
      column: 'A'
    },
    {
      id: 'riesgos-mitigacion',
      question: '¿Cuáles son los riesgos y cómo los mitigan?',
      answer: 'Los principales riesgos incluyen: fluctuaciones del mercado inmobiliario, retrasos en construcción, y cambios económicos. Los mitigamos mediante: due diligence exhaustivo, diversificación de proyectos, seguros de cumplimiento, y seguimiento continuo con reportes mensuales.',
      category: 'riesgos',
      column: 'A'
    },
    {
      id: 'liquidez-salida',
      question: '¿Puedo salir del proyecto antes del plazo?',
      answer: 'Las inversiones tienen plazos definidos (12-36 meses). Durante este período tu capital está comprometido. Ofrecemos un mercado secundario limitado donde puedes transferir tu participación a otros inversionistas, sujeto a disponibilidad y con posibles descuentos.',
      category: 'liquidez',
      column: 'A'
    },
    {
      id: 'tarifas-costos',
      question: '¿Qué tarifas y costos cobra LOKL?',
      answer: 'Comisión de administración: 2% anual sobre capital invertido. Comisión de éxito: 20% sobre ganancias. Sin comisiones de entrada/salida. Transferencias ACH gratuitas. Todos los costos se detallan antes de invertir, sin sorpresas.',
      category: 'pagos',
      column: 'A'
    },

    // Columna B
    {
      id: 'monto-minimo',
      question: '¿Cuánto puedo empezar a invertir?',
      answer: 'Puedes empezar desde $1.300.000 COP mensuales. Esto te permite acceder a proyectos fraccionados de alta calidad que tradicionalmente requerían millones. No hay monto máximo, y puedes incrementar gradualmente según tu capacidad.',
      category: 'funcionamiento',
      column: 'B'
    },
    {
      id: 'calculo-retornos',
      question: '¿Cómo calculan los retornos proyectados?',
      answer: 'Utilizamos metodología DCF (Flujo de Caja Descontado) considerando: precio de compra, costos de desarrollo, cronograma de obra, precios de venta proyectados, gastos operativos, y factores de riesgo. Basamos proyecciones en data histórica del mercado inmobiliario.',
      category: 'funcionamiento',
      column: 'B'
    },
    {
      id: 'pagos-cobros',
      question: '¿Cómo y cuándo pago o recibo dinero?',
      answer: 'Pagos: transferencia bancaria o débito automático mensual. Retornos: se distribuyen al finalizar el proyecto (12-36 meses) o según cronograma específico. Todo vía transferencia ACH a tu cuenta registrada. Recibes notificación 48h antes de cada movimiento.',
      category: 'pagos',
      column: 'B'
    },
    {
      id: 'impuestos-reportes',
      question: '¿Cómo manejo impuestos y reportes?',
      answer: 'Te enviamos certificado de retención en la fuente y resumen anual de ganancias. Las ganancias pueden estar sujetas a impuesto sobre renta. Recomendamos consultar un contador. Proporcionamos todos los documentos necesarios para tu declaración de renta.',
      category: 'impuestos',
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
                    <div className="pl-8">
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
                    <div className="pl-8">
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
