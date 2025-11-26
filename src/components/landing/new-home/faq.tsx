"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, ChevronUp, ChevronDown, ChevronRight } from 'lucide-react';

export default function FAQ() {
  const [searchTerm, ] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [showAllMobile, setShowAllMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const categories = [
    { id: 'riesgos', label: 'Riesgos', color: 'bg-orange-100 text-orange-800 border-orange-200' },
    { id: 'seguridad', label: 'Seguridad', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { id: 'funcionamiento', label: 'Funcionamiento', color: 'bg-teal-100 text-teal-800 border-teal-200' },
    { id: 'liquidez', label: 'Liquidez', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { id: 'beneficios', label: 'Beneficios', color: 'bg-pink-100 text-pink-800 border-pink-200' },
    { id: 'proyectos', label: 'Proyectos', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' }
  ];

  const faqsData = [
    // ... tus FAQs existentes ...

    // Nuevas FAQs - Columna A
    {
      id: 'riesgos-inversion-inmobiliaria',
      question: '¿Qué riesgos existen en una inversión inmobiliaria?',
      answer: 'Todo activo conlleva riesgo de mercado, ejecución y liquidez. En LOKL priorizamos proyectos verificados y divulgamos todos los riesgos antes de invertir para que tomes decisiones informadas.',
      category: 'riesgos',
      column: 'A'
    },
    {
      id: 'puedo-perder-inversion',
      question: '¿Puedo perder parte o la totalidad de mi inversión?',
      answer: 'Sí. No hay garantías en ninguna inversión; por eso promovemos la diversificación y la educación financiera para que puedas tomar decisiones más informadas y reducir tu exposición al riesgo.',
      category: 'riesgos',
      column: 'A'
    },
    {
      id: 'evaluacion-riesgo-proyecto',
      question: '¿Cómo evalúan el riesgo de cada proyecto?',
      answer: 'Aplicamos una curaduría estandarizada que incluye: due diligence legal, técnica y financiera, además de análisis de demanda del mercado. Cada proyecto pasa por filtros rigurosos antes de ser publicado.',
      category: 'riesgos',
      column: 'A'
    },
    {
      id: 'proteccion-datos',
      question: '¿Cómo protegen mis datos personales?',
      answer: 'Cumplimos con estándares internacionales de seguridad y políticas de privacidad. Utilizamos cifrado de datos y accesos restringidos. Solo áreas autorizadas bajo acuerdos de confidencialidad tienen acceso a tu información.',
      category: 'seguridad',
      column: 'A'
    },
    {
      id: 'pago-seguro',
      question: '¿Mi pago es seguro?',
      answer: 'Sí, utilizamos pasarelas de pago certificadas y sistemas de conciliación. Nunca solicitamos claves por fuera de la plataforma. Si detectas actividad sospechosa, cambia tu contraseña inmediatamente y repórtalo por soporte.',
      category: 'seguridad',
      column: 'A'
    },
    {
      id: 'panel-inversionista',
      question: '¿Qué es el panel del inversionista?',
      answer: 'Es tu tablero personal donde encuentras todos los documentos del proyecto, el estado actual, comunicaciones oficiales, cronograma de pagos y reportes de avance. Es tu centro de control para dar seguimiento a tus inversiones.',
      category: 'funcionamiento',
      column: 'A'
    },
    {
      id: 'seleccion-proyectos',
      question: '¿Cómo seleccionan los proyectos?',
      answer: 'Tenemos un pipeline propio de proyectos que pasan por filtros de curaduría técnica, legal y financiera. Evaluamos la trayectoria del desarrollador/operador, antecedentes, contratos, equipo y métricas de ejecución.',
      category: 'funcionamiento',
      column: 'A'
    },
    {
      id: 'documentos-inversion',
      question: '¿Qué documentos recibo al invertir?',
      answer: 'Recibes el contrato o boletos de participación, anexos correspondientes y certificaciones del esquema del proyecto. Todos los documentos están disponibles en tu panel del inversionista.',
      category: 'funcionamiento',
      column: 'A'
    },

    // Nuevas FAQs - Columna B
    {
      id: 'cuando-salir-inversion',
      question: '¿Cuándo puedo salir de una inversión?',
      answer: 'Puedes solicitar la salida a través del mercado secundario después del primer año, si está habilitado para el proyecto. La liquidez depende de que haya compradores interesados. Revisa la sección "Liquidez" en la ficha del proyecto.',
      category: 'liquidez',
      column: 'B'
    },
    {
      id: 'liquidez-inversiones',
      question: '¿Qué tan líquidas son estas inversiones?',
      answer: 'Son menos líquidas que instrumentos bursátiles tradicionales. Considera tu horizonte de inversión al participar. Si no hay demanda en el mercado secundario, debes esperar las ventanas de liquidez o el vencimiento del proyecto.',
      category: 'liquidez',
      column: 'B'
    },
    {
      id: 'solicitar-cesion',
      question: '¿Cómo solicito la cesión de mi participación?',
      answer: 'Solicítalo a través de la mesa de ayuda. Validaremos los requisitos y las contrapartes interesadas. El proceso se gestiona completamente por la plataforma de LOKL.',
      category: 'liquidez',
      column: 'B'
    },
    {
      id: 'por-que-invertir-lokl',
      question: '¿Por qué invertir con LOKL?',
      answer: 'Ofrecemos curaduría de oportunidades inmobiliarias de calidad, transparencia total en el proceso, acompañamiento experto, acceso a proyectos reales, comunidad de inversionistas, educación financiera y seguimiento centralizado.',
      category: 'beneficios',
      column: 'B'
    },
    {
      id: 'valor-adicional',
      question: '¿Qué valor obtengo además del potencial retorno?',
      answer: 'Acceso a proyectos inmobiliarios exclusivos, comunidad de inversionistas, educación financiera a través de LOKL Academy, seguimiento centralizado en tu panel, y la posibilidad de invertir con propósito generando impacto local.',
      category: 'beneficios',
      column: 'B'
    },
    {
      id: 'diversificar-portafolio',
      question: '¿Puedo diversificar mi portafolio?',
      answer: 'Sí, puedes invertir en varios proyectos simultáneamente. Recomendamos diversificar por vertical (hospitalidad, vivienda, renta corta), ubicación geográfica y plazo de inversión para reducir tu riesgo.',
      category: 'beneficios',
      column: 'B'
    },
    {
      id: 'tipos-proyectos',
      question: '¿Qué tipos de proyectos presentan?',
      answer: 'Presentamos proyectos de hospitalidad, vivienda, renta corta y desarrollos inmobiliarios seleccionados. Cada proyecto pasa por nuestra rigurosa curaduría antes de ser publicado en la plataforma.',
      category: 'proyectos',
      column: 'B'
    },

    {
      id: 'como-elegir-proyecto',
      question: '¿Cómo elijo el proyecto adecuado para mí?',
      answer: 'Define tu horizonte de inversión, nivel de riesgo que toleras y objetivos financieros. Usa el test de perfil inversionista en LOKL Academy, compara proyectos con nuestro simulador y revisa los documentos clave en el data room.',
      category: 'proyectos',
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
  const mobileDisplayedFAQs = showAllMobile ? filteredFAQs : filteredFAQs.slice(0, 5);

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

        {/* Mobile list with Show More */}
        {isMounted ? (
          <>
            <div className="md:hidden mb-8">
              <Accordion
                type="multiple"
                value={expandedItems}
                onValueChange={setExpandedItems}
                className="space-y-4"
              >
                {mobileDisplayedFAQs.map((faq) => (
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
              {filteredFAQs.length > 5 && (
                <Button
                  variant="secondary"
                  className="w-full mt-6"
                  onClick={() => setShowAllMobile((v) => !v)}
                >
                  {showAllMobile ? 'Ver menos' : `Ver más (${filteredFAQs.length - 5})`}
                </Button>
              )}
            </div>

            {/* Two Column Layout for md+ */}
            <div className="hidden md:grid lg:grid-cols-2 gap-6 md:gap-8 mb-12">
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
          </>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-12">
            <div className="space-y-4">
              {columnA.map((faq) => (
                <div key={faq.id} className="border rounded-lg bg-card shadow-sm p-6">
                  <div className="flex items-start gap-3 animate-pulse">
                    <div className="h-5 w-5 bg-muted rounded mt-0.5"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {columnB.map((faq) => (
                <div key={faq.id} className="border rounded-lg bg-card shadow-sm p-6">
                  <div className="flex items-start gap-3 animate-pulse">
                    <div className="h-5 w-5 bg-muted rounded mt-0.5"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ver todas las FAQs */}
        <div className="text-center mt-8">
          <Link href="/faqs">
            <Button variant="outline" className="border-[#5352F6]/20 text-[#5352F6] hover:bg-[#5352F6]/5">
              Ver todas
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
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
