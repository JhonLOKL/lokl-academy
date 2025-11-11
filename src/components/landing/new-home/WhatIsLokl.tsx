"use client";

import { Paragraph, Text, Heading } from "@/components/design-system";
import YouTubeLite from "@/components/ui/youtube-lite";

interface WhatIsLoklProps {
  isVisible: boolean;
}

export default function WhatIsLokl({ isVisible }: WhatIsLoklProps) {
  if (!isVisible) return null;

  return (
    <section id="que-es-lokl" className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <Heading
            level={2}
            parts={[
              { text: "¿Quiénes ", weight: "semibold" },
              { text: "somos", weight: "bold", color: "purple" },
              { text: "?", weight: "semibold" }
            ]}
            align="center"
            tracking="tight"
            className="mb-4 text-4xl md:text-5xl"
          />
          <div className="inline-block">
            <Text size="xl" color="purple" weight="medium">
              #CreceConLokl
            </Text>
          </div>
        </div>

        {/* Video Section */}
        <div className="mb-12 max-w-4xl mx-auto">
          <YouTubeLite
            videoId="tuGviQOfMQU"
            title="¿Cómo funciona LOKL?"
            className="shadow-2xl border-2 border-primary/20"
          />
        </div>

        {/* Description */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Paragraph variant="lead" align="center" className="mb-6">
            <Text color="purple" weight="semibold">Lokl</Text> es una plataforma de inversión
            inmobiliaria; aunque más que eso, es
            una comunidad que conecta a personas
            y proyectos únicos.
          </Paragraph>
          <Paragraph variant="lead" align="center">
            A través de un ecosistema <Text color="purple" weight="semibold">100% digital</Text>{" "}
            democratizamos el acceso a la inversión
            y a los bienes raíces de manera accesible,
            transparente y con gran impacto social.
          </Paragraph>
        </div>
      </div>
    </section>
  );
}
