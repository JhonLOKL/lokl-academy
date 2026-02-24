"use client";

import React from "react";
import { Check, X } from "lucide-react";
import { SubscriptionPlan } from "@/lib/course/schema";

interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan;
  isCurrentPlan?: boolean;
}

const SubscriptionPlanCard: React.FC<SubscriptionPlanCardProps> = ({
  plan,
  isCurrentPlan = false,
}) => {
  return (
    <div
      className={`relative flex flex-col rounded-lg border ${isCurrentPlan
          ? "border-[#5352F6] bg-[#EEEEFE]/20"
          : plan.isPopular
            ? "border-[#5352F6]"
            : "border-[#E5E5E5]"
        } bg-white p-6 shadow-sm transition-all hover:shadow-md`}
    >
      {/* Etiqueta de plan actual o popular */}
      {isCurrentPlan && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#5352F6] px-4 py-1 text-xs font-medium text-white">
          Tu plan actual
        </div>
      )}
      {!isCurrentPlan && plan.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#5352F6] px-4 py-1 text-xs font-medium text-white">
          Más popular
        </div>
      )}

      {/* Encabezado del plan */}
      <div className="mb-6 text-center">
        <h3 className="text-xl font-bold">{plan.name}</h3>
        <p className="mt-1 text-sm text-[#6D6C6C]">{plan.description}</p>
      </div>

      {/* Princing */}
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center">
          <span className="text-3xl font-bold">{`$${plan.princing.monthly.toLocaleString('es-CO')}`}</span>
          <span className="ml-1 text-sm text-[#6D6C6C]">/mes</span>
        </div>

        {plan.princing.yearlyDiscount && (
          <div className="mt-2">
            <div className="text-sm font-medium">
              <span className="text-[#5352F6]">{`$${plan.princing.yearly.toLocaleString('es-CO')}`}</span>
              <span className="ml-1 text-[#6D6C6C]">/año</span>
            </div>
            <div className="mt-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
              Ahorra {plan.princing.yearlyDiscount}% anual
            </div>
          </div>
        )}
      </div>

      {/* Características */}
      <div className="mb-6 space-y-3">
        <h4 className="font-semibold">Incluye:</h4>

        {/* Acceso a contenido */}
        <div className="space-y-2">
          <FeatureItem
            feature="Cursos básicos"
            included={plan.features.basicCourses}
          />
          <FeatureItem
            feature="Cursos premium"
            included={plan.features.premiumCourses}
          />
          <FeatureItem
            feature="Cursos exclusivos"
            included={plan.features.exclusiveCourses}
          />
          <FeatureItem
            feature="Acceso a todos los blogs"
            included={plan.features.allBlogs}
          />
          <FeatureItem
            feature="Podcasts"
            included={plan.features.podcasts}
          />
        </div>

        {/* Soporte y comunidad */}
        <div className="space-y-2 pt-2">
          <FeatureItem
            feature="Soporte dedicado"
            included={plan.features.dedicatedSupport}
          />
          <FeatureItem
            feature="Conferencias en vivo"
            included={plan.features.liveConferences}
          />
          <FeatureItem
            feature="Acceso a comunidad"
            included={plan.features.communityAccess}
          />
        </div>

        {/* Beneficios de inversión */}
        <div className="space-y-2 pt-2">
          <FeatureItem
            feature="Acceso anticipado a proyectos"
            included={plan.features.earlyProjectAccess}
          />
          <FeatureItem
            feature="Proyectos exclusivos"
            included={plan.features.exclusiveProjects}
          />
          <FeatureItem
            feature="Herramientas de inversión"
            included={plan.features.investmentTools}
          />
        </div>

        {/* Límites técnicos */}
        {plan.features.maxConcurrentCourses && (
          <div className="pt-2 text-sm">
            <span className="text-[#6D6C6C]">Cursos simultáneos: </span>
            <span className="font-medium">{plan.features.maxConcurrentCourses}</span>
          </div>
        )}

        {plan.features.downloadLimit && (
          <div className="text-sm">
            <span className="text-[#6D6C6C]">Descargas mensuales: </span>
            <span className="font-medium">{plan.features.downloadLimit}</span>
          </div>
        )}

        <FeatureItem
          feature="Certificados incluidos"
          included={plan.features.certificatesIncluded}
        />
      </div>

      {/* Botón de acción */}
      <div className="mt-auto">
        <button
          className={`w-full rounded-md px-4 py-2 text-center text-sm font-medium ${isCurrentPlan
              ? "bg-[#0F0F0F] text-white hover:bg-black"
              : "bg-[#5352F6] text-white hover:opacity-90"
            }`}
        >
          {isCurrentPlan ? "Tu plan actual" : "Seleccionar plan"}
        </button>
      </div>
    </div>
  );
};

// Componente auxiliar para mostrar características
const FeatureItem: React.FC<{ feature: string; included: boolean }> = ({
  feature,
  included,
}) => (
  <div className="flex items-center text-sm">
    {included ? (
      <Check size={16} className="mr-2 text-green-600" />
    ) : (
      <X size={16} className="mr-2 text-red-500" />
    )}
    <span className={included ? "" : "text-[#919090]"}>{feature}</span>
  </div>
);

export default SubscriptionPlanCard;
