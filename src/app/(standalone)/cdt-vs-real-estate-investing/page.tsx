import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, TrendingUp, Shield, Calculator } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/design-system";
import { buttonVariants } from "@/components/design-system/ui/button";

export const metadata: Metadata = {
  title: "CDT vs. inversión inmobiliaria | LOKL",
  description:
    "Compara la seguridad de un CDT con el potencial de crecimiento que obtienes al invertir en bienes raíces con LOKL. Entiende cómo proteger y hacer crecer tu dinero.",
  alternates: {
    canonical: "https://academy.lokl.life/cdt-vs-real-estate-investing",
  },
};

const heroHighlights = [
  "Respaldado por activos reales",
  "Mayor rentabilidad",
  "Diversificación inteligente",
];

const cdtBenefits = [
  "Es simple y fácil de entender",
  "Tu dinero está protegido por Fogafín",
  "Sabes exactamente cuánto vas a recibir",
  "No requiere conocimiento especializado",
];

const comparisonRows = [
  {
    aspect: "Rentabilidad anual",
    cdt: "8% - 12%",
    lokl: "12% - 15%",
    loklHighlight: true,
  },
  {
    aspect: "Protección contra inflación",
    cdt: "Limitada",
    lokl: "Excelente",
    loklHighlight: true,
  },
  {
    aspect: "Activo de respaldo",
    cdt: "Promesa del banco",
    lokl: "Bienes raíces reales",
    loklHighlight: false,
  },
  {
    aspect: "Conexión con tu inversión",
    cdt: "No sabes dónde va tu dinero",
    lokl: "Ves exactamente el proyecto",
    loklHighlight: false,
  },
  {
    aspect: "Seguridad",
    cdt: "Fogafín hasta $50M",
    lokl: "Activo físico + diversificación",
    loklHighlight: true,
  },
];

const allocationSuggestions = [
  {
    color: "bg-blue-500",
    label: "CDT (40-60%)",
    description: "Tu base segura y estable.",
  },
  {
    color: "bg-green-500",
    label: "LOKL (40-60%)",
    description: "Tu motor de crecimiento.",
  },
];

const HeroSection = () => (
  <section className="py-24 md:py-32">
    <div className="container px-4">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
          Tu CDT cuida tu dinero.
          <br />
          <span className="text-[#5352F6]">
            ¿Pero quién lo hace crecer de verdad?
          </span>
        </h1>
        <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-gray-600 md:text-2xl">
          Los CDTs son excelentes para mantener tu dinero seguro, pero existe
          una forma más inteligente de hacerlo trabajar para ti. Descubre cómo
          puedes obtener mayor rentabilidad respaldada por activos reales:
          bienes raíces que puedes ver y tocar.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 text-[#2F855A] sm:flex-row">
          {heroHighlights.map((item) => (
            <div key={item} className="flex items-center font-medium">
              <CheckCircle className="mr-2 h-5 w-5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/#newprojects"
            className={buttonVariants({ size: "lg", variant: "primary" })}
          >
            Explorar proyectos reales
          </Link>
          <a
            href="https://wa.me/573017328112"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ size: "lg", variant: "secondary" })}
          >
            Habla con un asesor
          </a>
        </div>
      </div>
    </div>
  </section>
);

const CdtValidationSection = () => (
  <section className="bg-gray-50 py-16">
    <div className="container px-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            El CDT: un primer paso excelente y seguro
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <div className="mb-4 flex items-center">
              <Shield className="mr-3 h-8 w-8 text-green-500" />
              <h3 className="text-xl font-semibold text-gray-900">
                Lo que hace bien el CDT
              </h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              {cdtBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center text-lg text-orange-800 md:text-xl">
                <TrendingUp className="mr-2 h-5 w-5" />
                Pero hay un problema silencioso...
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0 text-orange-700">
              <p className="font-semibold">
                La inflación se está comiendo tus ganancias.
              </p>
              <p className="text-sm text-orange-600">
                Si tu CDT te da 12% anual y la inflación es 10%, en realidad
                solo estás ganando 2% real. Tu dinero está &quot;seguro&quot;,
                pero su poder de compra apenas crece.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </section>
);

const ComparisonSection = () => (
  <section className="py-16">
    <div className="container px-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            CDT vs. LOKL: dos formas de poner tu dinero a trabajar
          </h2>
          <p className="text-xl text-gray-600">
            Ambos cuidan tu dinero, pero de maneras muy diferentes
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse overflow-hidden rounded-lg bg-white text-left shadow-lg">
            <thead>
              <tr className="bg-gray-50 text-gray-900">
                <th className="p-6 font-semibold">Aspecto</th>
                <th className="border-l p-6 text-center font-semibold text-[#5352F6]">
                  CDT tradicional
                </th>
                <th className="border-l p-6 text-center font-semibold text-green-600">
                  LOKL
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, index) => (
                <tr
                  key={row.aspect}
                  className={index % 2 === 1 ? "bg-gray-50" : undefined}
                >
                  <td className="p-6 font-medium text-gray-900">
                    {row.aspect}
                  </td>
                  <td className="border-l p-6 text-center text-gray-700">
                    {row.cdt}
                  </td>
                  <td
                    className={`border-l p-6 text-center ${
                      row.loklHighlight
                        ? "bg-green-50 font-semibold text-green-700"
                        : "text-gray-800"
                    }`}
                  >
                    {row.lokl}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
);

const GrowthInsightsSection = () => (
  <section className="bg-gradient-to-r from-blue-50 to-green-50 py-16">
    <div className="container px-4">
      <div className="mx-auto max-w-4xl text-center">
        <Calculator className="mx-auto mb-4 h-16 w-16 text-[#5352F6]" />
        <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
          Descubre cuánto más podría crecer tu dinero
        </h2>
        <p className="text-xl leading-relaxed text-gray-600">
          Descarga la guía práctica para comparar el potencial de crecimiento de
          un CDT frente a una inversión en bienes raíces con LOKL. Entiende
          escenarios reales, proyecciones y cómo combinar ambas estrategias.
        </p>
      </div>
      <div className="mx-auto mt-12 grid gap-6 md:max-w-5xl md:grid-cols-3">
        <Card className="border-blue-200 bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-[#5352F6]">
              Comparaciones claras
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-sm text-gray-600">
            Analiza escenarios de rentabilidad a 12, 24 y 36 meses para tomar
            decisiones con información.
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-[#5352F6]">
              Riesgos bajo control
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-sm text-gray-600">
            Comprende cómo funciona la diversificación entre renta fija y bienes
            raíces físicos.
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-[#5352F6]">
              Pasos accionables
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-sm text-gray-600">
            Sigue un plan sencillo para pasar de una inversión tradicional a una
            estrategia híbrida.
          </CardContent>
        </Card>
      </div>
      <div className="mt-10 flex justify-center">
        <a
          href="https://lokl.life/#projects"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ size: "lg", variant: "primary" })}
        >
          Descargar guía comparativa
        </a>
      </div>
    </div>
  </section>
);

const DiversificationSection = () => (
  <section className="py-16">
    <div className="container px-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            No tienes que elegir. Tienes que diversificar.
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <div className="mb-6 rounded-lg bg-blue-50 p-6">
              <h3 className="mb-3 flex items-center text-xl font-semibold text-blue-800">
                <Shield className="mr-2 h-6 w-6" />
                Piénsalo como un equipo de fútbol
              </h3>
              <p className="text-blue-700">
                Tu CDT es como la defensa: protege lo que ya tienes. LOKL es
                como tus delanteros: buscan hacer crecer el marcador.
              </p>
            </div>
            <p className="leading-relaxed text-gray-600">
              <strong>La estrategia inteligente</strong> es tener ambos
              trabajando para ti. Mantén una parte de tu dinero en la seguridad
              del CDT y pon otra parte a trabajar con LOKL. Así consigues lo
              mejor de ambos mundos: seguridad y crecimiento.
            </p>
          </div>
          <div className="space-y-4">
            {allocationSuggestions.map((item) => (
              <Card
                key={item.label}
                className="border-blue-200 bg-white shadow-sm md:flex md:items-center md:justify-between"
              >
                <CardContent className="flex items-start gap-3 pt-0 md:flex-row md:items-center md:pt-4">
                  <span
                    className={`mt-2 h-3 w-3 flex-shrink-0 rounded-full md:mt-0 ${item.color}`}
                  />
                  <div>
                    <p className="font-medium text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FinalCtaSection = () => (
  <section className="bg-gray-900 py-16 text-white">
    <div className="container px-4">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-6 text-3xl font-bold md:text-4xl">
          Es hora de que tu dinero no solo esté seguro, sino que trabaje para ti
        </h2>
        <p className="mb-8 text-lg leading-relaxed text-gray-300 md:text-xl">
          Ya viste el potencial y entiendes la diferencia. Explora los proyectos
          reales donde puedes poner tu dinero a trabajar de manera inteligente.
        </p>
        <Link
          href="/#newprojects"
          className={buttonVariants({ size: "lg", variant: "secondary" })}
        >
          Explorar proyectos reales
        </Link>
        <p className="mt-4 text-sm text-gray-400">
          Sin compromisos. Explora primero, decide después.
        </p>
      </div>
    </div>
  </section>
);

export default function CDTvsRealEstateInvestingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <main>
        <HeroSection />
        <CdtValidationSection />
        <ComparisonSection />
        <GrowthInsightsSection />
        <DiversificationSection />
        <FinalCtaSection />
      </main>
    </div>
  );
}

