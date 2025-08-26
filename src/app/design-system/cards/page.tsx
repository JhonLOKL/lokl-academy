"use client";

import React from "react";
import { 
  Navbar, 
  Footer, 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  BenefitCard,
  InvestmentCard,
  UserCard,
  Button,
  FeatureCard,
  FeatureCardGrid,
  ProgramCard,
  InfoCard,
  InfoCardGroup,
  BenefitCardGroup
} from "@/components/design-system";
import { 
  User, 
  Home, 
  PieChart, 
  Users, 
  Building,
  Check,
  ArrowRight,
  Star
} from "lucide-react";

export default function CardsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar
        logo={<span className="text-xl font-bold">LOKL <span className="text-[#5352F6]">Design System</span></span>}
        items={[
          { label: "Componentes", href: "/design-system" },
          { label: "Botones", href: "/design-system/buttons" },
          { label: "Formularios", href: "/design-system/forms" },
          { label: "Tarjetas", href: "/design-system/cards", active: true },
          { label: "Gráficos", href: "/design-system/charts" },
          { label: "Layouts", href: "/design-system/layouts" },
          { label: "Colores", href: "/design-system/colors" },
          { label: "Iconos", href: "/design-system/icons" },
          { label: "Tarjetas Visuales", href: "/design-system/visual-cards" },
          { label: "Tipografía", href: "/design-system/typography" },
        ]}
      />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight">Tarjetas LOKL</h1>
          <p className="text-[#6D6C6C] max-w-3xl">
            Componentes de tarjetas diseñados para mostrar información de forma estructurada y atractiva, con diferentes variantes y estilos.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Tarjeta Básica</h2>
          <div className="max-w-md">
            <Card>
              <CardHeader>
                <CardTitle>Título de la tarjeta</CardTitle>
                <CardDescription>Descripción de la tarjeta que explica su contenido</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Contenido principal de la tarjeta con información relevante para el usuario.</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost">Cancelar</Button>
                <Button>Continuar</Button>
              </CardFooter>
            </Card>
            <div className="mt-8">
              <p className="text-sm text-[#6D6C6C]">
                Tarjeta básica con cabecera, contenido y pie, ideal para mostrar información estructurada con acciones.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Tarjetas de Beneficio</h2>
          <div className="space-y-8">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Estilo Estándar</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <BenefitCard
                  icon={<Home size={32} />}
                  title="Inversiones accesibles"
                  description="Comienza con montos desde $100.000 COP"
                />
                
                <BenefitCard
                  icon={<PieChart size={32} />}
                  title="Rentabilidad garantizada"
                  description="Retornos anuales de hasta 14%"
                />

                <BenefitCard
                  icon={<Building size={32} />}
                  title="Proyectos seleccionados"
                  description="Análisis riguroso de cada oportunidad"
                />
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">Variantes de Beneficio</h3>
              <BenefitCardGroup>
                <BenefitCard
                  icon={<Check size={24} />}
                  title="Sin comisiones ocultas"
                  description="Transparencia en todas las operaciones"
                  variant="simple"
                />
                
                <BenefitCard
                  icon={<Star size={24} />}
                  title="Servicio premium"
                  description="Atención personalizada para inversionistas"
                  variant="compact"
                  iconBackground="purple"
                />

                <BenefitCard
                  icon={<ArrowRight size={24} />}
                  title="Proceso simplificado"
                  description="Invierte en pocos pasos desde la app"
                  iconBackground="dark"
                />
              </BenefitCardGroup>
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Tarjetas de Inversión</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <InvestmentCard
              price="$500.000"
              title="Bono Estándar"
              description="Rentabilidad anual del 12%"
            />
            
            <InvestmentCard
              price="$1.000.000"
              title="Bono Premium"
              description="Rentabilidad anual del 14%"
              ctaText="Invertir ahora"
            />

            <InvestmentCard
              price="$2.500.000"
              title="Bono Élite"
              description="Rentabilidad anual del 16% + beneficios exclusivos"
              ctaText="Acceso prioritario"
            />
          </div>
          <div className="mt-8">
            <p className="text-sm text-[#6D6C6C]">
              Tarjetas diseñadas específicamente para mostrar opciones de inversión con precios destacados y llamadas a la acción.
            </p>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Tarjetas de Usuario</h2>
          <div className="space-y-6 max-w-md">
            <UserCard
              avatar={<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5352F6] text-white"><User /></div>}
              name="Carlos Rodríguez"
              role="Inversionista"
              actions={<Button variant="outline" size="sm">Ver perfil</Button>}
            />
            
            <UserCard
              avatar={<div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white"><Users /></div>}
              name="María González"
              role="Administradora"
              actions={
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Mensaje</Button>
                  <Button size="sm">Seguir</Button>
                </div>
              }
            />

            <UserCard
              avatar={<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#444444] text-white"><Building /></div>}
              name="Grupo Inversor LOKL"
              role="Empresa"
              actions={<Button variant="dark" size="sm">Contactar</Button>}
            />
          </div>
          <div className="mt-8">
            <p className="text-sm text-[#6D6C6C]">
              Tarjetas para mostrar información de usuario o entidad con avatar, nombre, rol y acciones disponibles.
            </p>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Tarjetas de Característica</h2>
          <FeatureCardGrid>
            <FeatureCard
              title="Inversión Inteligente"
              subtitle="TECNOLOGÍA"
              description="Algoritmos avanzados que analizan el mercado para ofrecerte las mejores oportunidades de inversión inmobiliaria."
              ctaText="Conocer más"
            />
            
            <FeatureCard
              title="Seguridad Garantizada"
              subtitle="PROTECCIÓN"
              description="Todas las transacciones están respaldadas por tecnología blockchain y contratos legales verificados."
              ctaText="Ver certificaciones"
              variant="bordered"
            />
            
            <FeatureCard
              title="Comunidad LOKL"
              subtitle="NETWORKING"
              description="Conéctate con otros inversionistas y expande tu red de contactos en el sector inmobiliario."
              ctaText="Unirme"
              variant="subtle"
              align="center"
            />
          </FeatureCardGrid>
          <div className="mt-8">
            <p className="text-sm text-[#6D6C6C]">
              Tarjetas para destacar características o beneficios del producto con diferentes estilos y alineaciones.
            </p>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Tarjeta de Programa</h2>
          <div className="max-w-lg">
            <ProgramCard
              hashtag="#ProgramaEmbajadores"
              title="Refiere y gana hasta $500.000"
              benefits={[
                "Comisión del 5% por cada referido",
                "Bonos adicionales por volumen",
                "Acceso a eventos exclusivos"
              ]}
              stats={[
                { label: "Referidos", value: "10+" },
                { label: "Ganancia", value: "$500K" }
              ]}
              winMessage="¡Tú ganas, ellos ganan!"
              ctaText="Unirme al programa"
            />
          </div>
          <div className="mt-8">
            <p className="text-sm text-[#6D6C6C]">
              Tarjeta promocional para programas especiales con beneficios destacados, estadísticas y mensaje motivacional.
            </p>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Tarjetas de Información</h2>
          <InfoCardGroup>
            <InfoCard
              tag="SOBRE NOSOTROS"
              title="Misión"
              highlight="Democratizar la inversión inmobiliaria"
              description="Buscamos hacer accesible la inversión en bienes raíces para todos los colombianos, sin importar su capacidad económica."
              variant="light"
            />
            
            <InfoCard
              tag="FILOSOFÍA"
              title="Visión"
              highlight="Líderes en inversión digital"
              description="Convertirnos en la plataforma líder de inversión inmobiliaria en Latinoamérica, impulsando el desarrollo económico de la región."
              variant="dark"
            />
          </InfoCardGroup>
          
          <div className="mt-8">
            <InfoCard
              tag="IMPACTO SOCIAL"
              title="Construyendo"
              highlight="un mejor futuro para todos"
              description="Cada inversión en LOKL contribuye al desarrollo de proyectos inmobiliarios que generan empleo y mejoran la calidad de vida en las comunidades donde operamos."
              variant="accent"
              align="center"
              className="max-w-2xl mx-auto"
            />
          </div>
          <div className="mt-8">
            <p className="text-sm text-[#6D6C6C]">
              Tarjetas para mostrar información institucional o corporativa con diferentes fondos y estilos.
            </p>
          </div>
        </section>
      </main>

      <Footer variant="simple" />
    </div>
  );
}
