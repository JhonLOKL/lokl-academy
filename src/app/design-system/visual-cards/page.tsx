"use client";

import React from "react";
import { VisualCard, VisualCardGroup, Navbar, Footer } from "@/components/design-system";
import { AdditionalCards } from "./additional-cards";

export default function VisualCardsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar
        logo={<span className="text-xl font-bold">LOKL <span className="text-[#5352F6]">Design System</span></span>}
        items={[
          { label: "Componentes", href: "/design-system" },
          { label: "Tarjetas Visuales", href: "/design-system/visual-cards", active: true },
        ]}
      />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight">Tarjetas Visuales LOKL</h1>
          <p className="text-[#6D6C6C] max-w-3xl">
            Componentes de tarjetas visuales diseñadas con una estética moderna, minimalista y profesional, 
            transmitiendo confianza, accesibilidad y vanguardia en inversión inmobiliaria.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Tarjeta Hero</h2>
          <VisualCard
            title="Transforma tu Futuro Financiero"
            subtitle="Inversión Inmobiliaria"
            description="Únete a la revolución de las inversiones inmobiliarias digitales y construye tu patrimonio de manera inteligente"
            imageUrl="/images/buildings-bw.jpg"
            ctaText="Comenzar Ahora"
            className="h-[500px]"
            alignment="center"
          />
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Tarjetas con Imagen</h2>
          <VisualCardGroup>
            <VisualCard
              title="Inversiones Accesibles"
              description="Descubre oportunidades de inversión inmobiliaria desde $1,000 MXN"
              imageUrl="/images/house-model.jpg"
              ctaText="Explorar"
              className="aspect-[4/5]"
            />
            <VisualCard
              title="Disfruta tus Inversiones"
              subtitle="Rentabilidad Garantizada"
              description="Obtén rendimientos del 12% al 18% anual con nuestro modelo probado"
              imageUrl="/images/couple-investing.jpg"
              ctaText="Ver más"
              className="aspect-[4/5]"
            />
            <VisualCard
              title="Inversión 100% Digital"
              description="Plataforma completamente digital para gestionar tus inversiones desde cualquier lugar"
              imageUrl="/images/digital-charts.jpg"
              ctaText="Comenzar"
              className="aspect-[4/5]"
            />
          </VisualCardGroup>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Tarjeta Promocional</h2>
          <VisualCard
            title={<>Refiere y Gana <span className="block text-5xl font-black">$500K</span></>}
            subtitle="PROGRAMA DE EMBAJADORES"
            description="Invita a tus amigos a invertir en LOKL y recibe recompensas por cada referido exitoso. Mientras más refieras, más ganas."
            imageUrl="/images/skyscraper-bw.jpg"
            ctaText="Unirme Ahora →"
            className="max-w-md"
          />
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Tarjetas Horizontales</h2>
          <div className="space-y-6">
            <VisualCard
              variant="horizontal"
              title="Invierte en el Futuro"
              subtitle="OPORTUNIDAD ÚNICA"
              description="Accede a proyectos inmobiliarios exclusivos con rendimientos superiores al mercado tradicional"
              imageUrl="/images/buildings-bw.jpg"
              ctaText="Conocer Proyectos"
              className="h-64"
            />
            <VisualCard
              variant="horizontal"
              title="Aprende a Invertir"
              description="Accede a nuestros cursos y webinars gratuitos sobre inversión inmobiliaria inteligente"
              imageUrl="/images/couple-investing.jpg"
              ctaText="Inscribirme"
              className="h-64"
            />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Tarjetas sin Imagen</h2>
          <VisualCardGroup columns={2}>
            <VisualCard
              hasImage={false}
              title="Comienza tu Portafolio"
              subtitle="PARA PRINCIPIANTES"
              description="Aprende los fundamentos de la inversión inmobiliaria y comienza a construir tu patrimonio"
              ctaText="Empezar"
            />
            <VisualCard
              hasImage={false}
              title="Diversifica tus Inversiones"
              subtitle="ESTRATEGIA AVANZADA"
              description="Optimiza tu portafolio con diferentes tipos de proyectos inmobiliarios"
              ctaText="Explorar Opciones"
              alignment="center"
            />
          </VisualCardGroup>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Tarjetas Centradas</h2>
          <VisualCardGroup columns={2}>
            <VisualCard
              title="Únete a la Comunidad"
              description="Conecta con otros inversionistas y expande tu red de contactos en el sector inmobiliario"
              imageUrl="/images/couple-investing.jpg"
              ctaText="Unirme"
              alignment="center"
              className="aspect-video"
            />
            <VisualCard
              title="Eventos Exclusivos"
              subtitle="SOLO MIEMBROS"
              description="Participa en eventos exclusivos con los principales líderes del sector inmobiliario"
              imageUrl="/images/digital-charts.jpg"
              ctaText="Ver Calendario"
              alignment="center"
              className="aspect-video"
            />
          </VisualCardGroup>
        </section>
        
        {/* Additional Card Types */}
        <AdditionalCards />
      </main>

      <Footer variant="simple" />
    </div>
  );
}