'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ArrowRight,
  TrendingUp,
  Shield,
  Calendar,
  BarChart3,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/design-system";
import { buttonVariants } from "@/components/design-system/ui/button";

const FloatingWhatsAppButton = dynamic(
  () => import("@/components/shared/floating-whatsapp-button"),
  { ssr: false }
);

const pensionPainPoints = [
  {
    icon: BarChart3,
    iconClass: "text-red-600",
    badgeClass: "bg-red-100",
    title: "Ingresos variables",
    description:
      "Tus ingresos cambian mes a mes. Un esquema rígido no se adapta a tu realidad financiera.",
  },
  {
    icon: Shield,
    iconClass: "text-orange-600",
    badgeClass: "bg-orange-100",
    title: "Sin beneficios laborales",
    description:
      "No tienes prima, vacaciones pagadas, ni cesantías. Tu futuro depende 100% de lo que puedas ahorrar.",
  },
  {
    icon: Calendar,
    iconClass: "text-yellow-600",
    badgeClass: "bg-yellow-100",
    title: "Pensión insuficiente",
    description:
      "Con cotizaciones irregulares, la pensión será mínima. ¿Quieres seguir trabajando hasta los 80?",
  },
];

const benefitHighlights = [
  {
    title: "Flexibilidad total",
    description:
      "Invierte cuando tengas buenos meses, pausa cuando necesites liquidez.",
  },
  {
    title: "Rentabilidad atractiva",
    description: "Hasta 15% EA en proyectos inmobiliarios seleccionados.",
  },
  {
    title: "Diversificación inteligente",
    description: "Invierte en múltiples proyectos para reducir riesgos.",
  },
];

export default function InvestmentForFreelancersLanding() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 items-center lg:grid-cols-2">
            <div className="space-y-6">
              <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-[#212529]">
                Tu <span className="text-[#3533FF]">libertad</span> no se
                negocia. Se invierte.
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-[#333333]">
                ¿Tu plan de retiro es seguir trabajando? Descubre cómo invertir
                a tu ritmo y construye la estabilidad financiera que mereces, sin
                importar lo variables que sean tus ingresos.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/#simulador-desktop"
                  prefetch={false}
                  className={buttonVariants({
                    size: "lg",
                    className:
                      "inline-flex items-center gap-2 px-8 py-4 text-lg font-medium transition-transform duration-200 hover:scale-[1.02]",
                  })}
                >
                  <span>Simula tu futuro freelance</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/landing/freelancer.png"
                alt="Freelancer trabajando con tranquilidad en su laptop, representando la seguridad financiera"
                width={600}
                height={600}
                className="rounded-2xl shadow-2xl"
                priority
              />

              <div className="absolute -bottom-6 -left-6 rounded-xl border bg-white p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex size-12 items-center justify-center rounded-full bg-green-100">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-[#212529]">
                      Rentabilidad promedio
                    </p>
                    <p className="text-2xl font-bold text-green-500">12.5% EA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#E0E0E0]/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#212529] md:text-4xl">
              ¿Por qué la pensión obligatoria no es suficiente?
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-[#333333]">
              Como freelancer enfrentas desafíos únicos que el sistema
              tradicional no contempla.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {pensionPainPoints.map(
              ({ icon: Icon, iconClass, badgeClass, title, description }) => (
                <Card
                  key={title}
                  className="border-0 shadow-lg transition-shadow duration-200 hover:shadow-xl"
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`mx-auto mb-4 flex size-16 items-center justify-center rounded-full ${badgeClass}`}
                    >
                      <Icon className={`h-8 w-8 ${iconClass}`} />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-[#212529]">
                      {title}
                    </h3>
                    <p className="text-[#333333]">{description}</p>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#212529] md:text-4xl">
              Crea tus propios beneficios (prima, vacaciones y más)
            </h2>
            <p className="text-lg text-[#333333]">
              Con LOKL inviertes en proyectos inmobiliarios reales desde $1M.
              Tu dinero crece mientras tú te enfocas en lo que mejor sabes hacer.
            </p>
          </div>

          <div className="my-12 grid gap-8 text-left md:grid-cols-3 md:gap-10">
            {benefitHighlights.map(({ title, description }) => (
              <div key={title} className="flex items-start space-x-3">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-green-500" />
                <div>
                  <h4 className="font-medium text-[#212529]">{title}</h4>
                  <p className="text-sm text-[#333333]">{description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/#featured-projects"
              prefetch={false}
              className={buttonVariants({
                size: "lg",
                className:
                  "inline-flex items-center gap-2 px-8 py-4 text-lg font-medium transition-transform duration-200 hover:scale-[1.02]",
              })}
            >
              <span>Comenzar a invertir ahora</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#3533FF] to-[#3533FF]/80 py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="mx-auto flex max-w-4xl flex-col items-center space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Plan diseñado para profesionales independientes
            </div>

            <h2 className="text-4xl font-bold md:text-5xl">
              ¡Toma el control de tu futuro financiero!
            </h2>
            <p className="text-xl text-white/90">
              No esperes a que el sistema tradicional resuelva tu futuro.
              Construye tu libertad financiera invirtiendo a tu ritmo.
            </p>

            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <Link
                href="/#simulador-desktop"
                prefetch={false}
                className={buttonVariants({
                  variant: "secondary",
                  size: "lg",
                  className:
                    "inline-flex items-center gap-3 bg-white text-[#3533FF] hover:bg-white/90 px-12 py-6 text-xl font-bold shadow-lg",
                })}
              >
                <span>Simula tu futuro freelance</span>
                <ArrowRight className="h-6 w-6" />
              </Link>
              <div className="text-sm text-white/80">
                ⚡ Simulación gratuita en 2 minutos
                <br />
                🔒 Sin compromiso ni tarjeta de crédito
              </div>
            </div>
          </div>
        </div>
      </section>

      <FloatingWhatsAppButton />
    </div>
  );
}


