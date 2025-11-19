"use client";

import { useMemo, useState } from "react";
import { faqs } from "./data";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShieldAlert, Lock, Laptop, ArrowLeftRight, Gift, Building } from "lucide-react";

interface FAQSectionProps {
  activeCategory: string | null;
  searchQuery: string;
}

export function FAQSection({ activeCategory, searchQuery }: FAQSectionProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const filteredFaqs = useMemo(() => {
    let filtered = faqs;

    // Filtrar por categoría si hay una activa
    if (activeCategory) {
      filtered = filtered.filter(
        (faq) => faq.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Filtrar por búsqueda si hay texto
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query) ||
          faq.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [activeCategory, searchQuery]);

  const allValues = useMemo(() => {
    return filteredFaqs.map((faq) => `faq-${faq.id}`);
  }, [filteredFaqs]);

  const handleExpandAll = () => {
    setExpandedItems(allValues);
  };

  const handleCollapseAll = () => {
    setExpandedItems([]);
  };

  const isAllExpanded = expandedItems.length === allValues.length && allValues.length > 0;

  const categoryIcons: Record<string, typeof ShieldAlert> = {
    Riesgos: ShieldAlert,
    Seguridad: Lock,
    Funcionamiento: Laptop,
    Liquidez: ArrowLeftRight,
    Beneficios: Gift,
    Proyectos: Building,
  };

  return (
    <section id="faq-section" className="py-12 md:py-16 lg:py-20 bg-neutral-50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-0 lg:ml-auto lg:mr-auto">
        {/* Mostrar mensaje si no hay resultados */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No se encontraron preguntas que coincidan con tu búsqueda.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Intenta con otros términos o categorías.
            </p>
          </div>
        ) : (
          <>
            {/* Botones de Expandir/Contraer todo */}
            <div className="mb-6 flex justify-end">
              <button
                onClick={isAllExpanded ? handleCollapseAll : handleExpandAll}
                className="flex items-center gap-2 text-[#5352F6] hover:text-[#4341E6] transition-colors duration-200 font-medium text-sm md:text-base"
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isAllExpanded ? "rotate-180" : ""
                  }`}
                />
                {isAllExpanded ? "Contraer todo" : "Expandir todo"}
              </button>
            </div>

            <Accordion
              type="multiple"
              value={expandedItems}
              onValueChange={setExpandedItems}
              className="w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 md:items-start">
                {/* Primera columna */}
                <div className="flex flex-col gap-4 md:gap-6">
                  {filteredFaqs
                    .filter((_, index) => index % 2 === 0)
                    .map((faq) => {
                      const IconComponent = categoryIcons[faq.category] || ShieldAlert;
                      return (
                        <AccordionItem
                          key={faq.id}
                          value={`faq-${faq.id}`}
                          className="border rounded-lg bg-white shadow-sm hover:shadow-lg hover:border-blue-500/50 hover:bg-blue-50/50 transition-all duration-300 group"
                        >
                          <AccordionTrigger className="text-left hover:no-underline px-6 py-4 group-hover:text-blue-600">
                            <div className="flex items-start gap-3 w-full">
                              <IconComponent className="w-5 h-5 text-gray-600 group-hover:text-blue-600 flex-shrink-0 mt-0.5 transition-colors duration-300" />
                              <span className="font-medium text-gray-900 group-hover:text-blue-600 flex-1 transition-colors duration-300">
                                {faq.question}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-6 pt-0">
                            <div className="pl-8 text-gray-600 whitespace-pre-line leading-relaxed">
                              {faq.answer}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                </div>
                {/* Segunda columna */}
                <div className="flex flex-col gap-4 md:gap-6">
                  {filteredFaqs
                    .filter((_, index) => index % 2 === 1)
                    .map((faq) => {
                      const IconComponent = categoryIcons[faq.category] || ShieldAlert;
                      return (
                        <AccordionItem
                          key={faq.id}
                          value={`faq-${faq.id}`}
                          className="border rounded-lg bg-white shadow-sm hover:shadow-lg hover:border-blue-500/50 hover:bg-blue-50/50 transition-all duration-300 group"
                        >
                          <AccordionTrigger className="text-left hover:no-underline px-6 py-4 group-hover:text-blue-600">
                            <div className="flex items-start gap-3 w-full">
                              <IconComponent className="w-5 h-5 text-gray-600 group-hover:text-blue-600 flex-shrink-0 mt-0.5 transition-colors duration-300" />
                              <span className="font-medium text-gray-900 group-hover:text-blue-600 flex-1 transition-colors duration-300">
                                {faq.question}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-6 pt-0">
                            <div className="pl-8 text-gray-600 whitespace-pre-line leading-relaxed">
                              {faq.answer}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                </div>
              </div>
            </Accordion>
          </>
        )}
      </div>
    </section>
  );
}

