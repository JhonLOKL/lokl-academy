"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShieldAlert, Lock, Laptop, ArrowLeftRight, Gift, Building } from "lucide-react";

const categoryIcons: Record<string, typeof ShieldAlert> = {
  Riesgos: ShieldAlert,
  Seguridad: Lock,
  Funcionamiento: Laptop,
  Liquidez: ArrowLeftRight,
  Beneficios: Gift,
  Proyectos: Building,
};

interface FAQAccordionProps {
  category: string;
  icon: string;
  question: string;
  answer: string;
  value: string;
}

export function FAQAccordion({
  category,
  icon,
  question,
  answer,
  value,
}: FAQAccordionProps) {
  const IconComponent = categoryIcons[category] || ShieldAlert;
  
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem 
        value={value} 
        className="border rounded-lg bg-white shadow-sm hover:shadow-lg hover:border-blue-500/50 hover:bg-blue-50/50 transition-all duration-300 group"
      >
        <AccordionTrigger className="text-left hover:no-underline px-6 py-4 group-hover:text-blue-600">
          <div className="flex items-start gap-3 w-full">
            <IconComponent className="w-5 h-5 text-gray-600 group-hover:text-blue-600 flex-shrink-0 mt-0.5 transition-colors duration-300" />
            <span className="font-medium text-gray-900 group-hover:text-blue-600 flex-1 transition-colors duration-300">{question}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6 pt-0">
          <div className="pl-8 text-gray-600 whitespace-pre-line leading-relaxed">
            {answer}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

