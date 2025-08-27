"use client";

import React from "react";
import { 
  Navbar, 
  Footer, 
  HeroSection,
  StepsSection,
  StepsContainer,
  StepItem,
  Button
} from "@/components/design-system";
import { User, Building, Wallet } from "lucide-react";

export default function LayoutsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar
        logo={<span className="text-xl font-bold">LOKL <span className="text-[#5352F6]">Design System</span></span>}
        items={[
          { label: "Componentes", href: "/design-system" },
          { label: "Botones", href: "/design-system/buttons" },
          { label: "Formularios", href: "/design-system/forms" },
          { label: "Tarjetas", href: "/design-system/cards" },
          { label: "Gráficos", href: "/design-system/charts" },
          { label: "Layouts", href: "/design-system/layouts", active: true },
          { label: "Colores", href: "/design-system/colors" },
          { label: "Iconos", href: "/design-system/icons" },
          { label: "Tarjetas Visuales", href: "/design-system/visual-cards" },
          { label: "Tipografía", href: "/design-system/typography" },
        ]}
      />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight">Layouts LOKL</h1>
          <p className="text-[#6D6C6C] max-w-3xl">
            Componentes de layout diseñados para construir estructuras de página completas con un estilo coherente y profesional.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Navbar</h2>
          <div className="space-y-8">
            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold">Navbar Estándar</h3>
              <div className="overflow-hidden rounded-lg border border-[#E5E5E5]">
                <Navbar
                  logo={<span className="text-xl font-bold">LOKL</span>}
                  items={[
                    { label: "Inicio", href: "#", active: true },
                    { label: "Inversiones", href: "#" },
                    { label: "Proyectos", href: "#" },
                    { label: "Nosotros", href: "#" },
                    { label: "Contacto", href: "#" },
                  ]}
                  actions={
                    <div className="flex items-center space-x-4">
                      <Button variant="secondary" size="sm">Iniciar sesión</Button>
                      <Button size="sm">Registrarse</Button>
                    </div>
                  }
                />
              </div>
              <p className="mt-4 text-sm text-[#6D6C6C]">
                Navbar principal con logo, menú de navegación y botones de acción.
              </p>
            </div>

            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold">Navbar Simple</h3>
              <div className="overflow-hidden rounded-lg border border-[#E5E5E5]">
                <Navbar
                  logo={<span className="text-xl font-bold">LOKL</span>}
                  items={[
                    { label: "Inicio", href: "#" },
                    { label: "Inversiones", href: "#" },
                    { label: "Contacto", href: "#" },
                  ]}
                />
              </div>
              <p className="mt-4 text-sm text-[#6D6C6C]">
                Versión simplificada del navbar con solo logo y menú de navegación.
              </p>
            </div>
            
            <div className="rounded-lg border border-[#E5E5E5] bg-[#0F0F0F] p-6">
              <h3 className="mb-4 text-lg font-semibold text-white">Navbar Oscuro</h3>
              <div className="overflow-hidden rounded-lg">
                <Navbar
                  logo={<span className="text-xl font-bold text-white">LOKL <span className="text-[#5352F6]">Inversiones</span></span>}
                  items={[
                    { label: "Inicio", href: "#" },
                    { label: "Inversiones", href: "#", active: true },
                    { label: "Proyectos", href: "#" },
                    { label: "Nosotros", href: "#" },
                  ]}
                  actions={
                    <Button variant="outline" className="border-white text-white hover:bg-white/10">
                      Mi cuenta
                    </Button>
                  }
                />
              </div>
              <p className="mt-4 text-sm text-white opacity-80">
                Navbar con tema oscuro para secciones o sitios con fondo oscuro.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Hero Sections</h2>
          <div className="space-y-8">
            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold">Hero con Fondo de Color</h3>
              <div className="overflow-hidden rounded-lg">
                <HeroSection
                  title={<span>Invierte en el <span className="text-[#5352F6]">futuro inmobiliario</span></span>}
                  subtitle="Accede a las mejores oportunidades de inversión con montos accesibles"
                  className="bg-[#F5F5F5]"
                >
                  <Button>Comenzar ahora</Button>
                  <Button variant="secondary">Conocer más</Button>
                </HeroSection>
              </div>
              <p className="mt-4 text-sm text-[#6D6C6C]">
                Hero section con fondo de color claro, título destacado y botones de llamada a la acción.
              </p>
            </div>
            
            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold">Hero con Fondo Oscuro</h3>
              <div className="overflow-hidden rounded-lg">
                <HeroSection
                  title={<span className="text-white">Sé parte de la <span className="text-[#5352F6]">revolución inmobiliaria</span></span>}
                  subtitle={<span className="text-white">Democratizando el acceso a inversiones de alto rendimiento</span>}
                  className="bg-black"
                  align="center"
                >
                  <Button>Invertir ahora</Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Ver proyectos
                  </Button>
                </HeroSection>
              </div>
              <p className="mt-4 text-sm text-[#6D6C6C]">
                Hero section con fondo oscuro, alineación centrada y botones contrastantes.
              </p>
            </div>
            
            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold">Hero con Imagen de Fondo</h3>
              <div className="overflow-hidden rounded-lg">
                <HeroSection
                  title={<span className="text-white">Construye tu <span className="text-[#5352F6]">patrimonio</span></span>}
                  subtitle={<span className="text-white">Inversiones inmobiliarias desde $100.000 COP</span>}
                  imageUrl="/images/buildings-bw.jpg"
                  imageBw={true}
                  overlay={true}
                  align="left"
                >
                  <Button>Explorar opciones</Button>
                </HeroSection>
              </div>
              <p className="mt-4 text-sm text-[#6D6C6C]">
                Hero section con imagen de fondo en blanco y negro, overlay oscuro y alineación a la izquierda.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Secciones de Pasos</h2>
          <div className="space-y-8">
            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold">Pasos Horizontales</h3>
              <StepsSection
                title={<span>Cómo <span className="text-[#5352F6]">funciona</span></span>}
                subtitle="Proceso simple y transparente para invertir en LOKL"
                variant="default"
              >
                <StepsContainer>
                  <StepItem
                    number={1}
                    title="Regístrate"
                    description="Crea tu cuenta en menos de 2 minutos"
                  />
                  <StepItem
                    number={2}
                    title="Selecciona un proyecto"
                    description="Explora las diferentes opciones de inversión"
                  />
                  <StepItem
                    number={3}
                    title="Invierte"
                    description="Realiza tu inversión de forma segura"
                  />
                </StepsContainer>
              </StepsSection>
              <p className="mt-4 text-sm text-[#6D6C6C]">
                Sección de pasos con números secuenciales para explicar procesos de forma clara.
              </p>
            </div>
            
            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold">Pasos con Iconos</h3>
              <StepsSection
                title="Proceso de inversión"
                subtitle="Tres simples pasos para comenzar"
                variant="gray"
              >
                <StepsContainer>
                  <StepItem
                    icon={<User size={24} />}
                    title="Crea tu perfil"
                    description="Completa tu información personal"
                  />
                  <StepItem
                    icon={<Building size={24} />}
                    title="Elige un proyecto"
                    description="Selecciona el que mejor se adapte a tus objetivos"
                  />
                  <StepItem
                    icon={<Wallet size={24} />}
                    title="Financia"
                    description="Realiza tu inversión y comienza a ganar"
                  />
                </StepsContainer>
              </StepsSection>
              <p className="mt-4 text-sm text-[#6D6C6C]">
                Sección de pasos con iconos ilustrativos en lugar de números, con fondo gris claro.
              </p>
            </div>
            
            <div className="rounded-lg border border-[#E5E5E5] bg-[#0F0F0F] p-6">
              <h3 className="mb-4 text-lg font-semibold text-white">Pasos con Tema Oscuro</h3>
              <StepsSection
                title={<span className="text-white">Tu camino al <span className="text-[#5352F6]">éxito</span></span>}
                subtitle={<span className="text-white opacity-90">Inversión inmobiliaria simplificada</span>}
                variant="dark"
                centered={true}
              >
                <StepsContainer>
                  <StepItem
                    number={1}
                    title="Aprende"
                    description="Accede a recursos educativos gratuitos"
                  />
                  <StepItem
                    number={2}
                    title="Planifica"
                    description="Define tus objetivos financieros"
                  />
                  <StepItem
                    number={3}
                    title="Invierte"
                    description="Comienza con el monto que puedas"
                  />
                  <StepItem
                    number={4}
                    title="Crece"
                    description="Reinvierte y diversifica tu portafolio"
                  />
                </StepsContainer>
              </StepsSection>
              <p className="mt-4 text-sm text-white opacity-80">
                Sección de pasos con tema oscuro, cuatro pasos y texto centrado.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Footer</h2>
          <div className="space-y-8">
            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold">Footer Completo</h3>
              <div className="overflow-hidden rounded-lg">
                <Footer variant="default" />
              </div>
              <p className="mt-4 text-sm text-[#6D6C6C]">
                Footer completo con logo, menú de navegación, enlaces de redes sociales y texto legal.
              </p>
            </div>
            
            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold">Footer Simple</h3>
              <div className="overflow-hidden rounded-lg">
                <Footer variant="simple" />
              </div>
              <p className="mt-4 text-sm text-[#6D6C6C]">
                Versión simplificada del footer con información esencial y enlaces principales.
              </p>
            </div>
            
            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold">Footer Minimalista</h3>
              <div className="overflow-hidden rounded-lg">
                <Footer variant="simple" />
              </div>
              <p className="mt-4 text-sm text-[#6D6C6C]">
                Footer minimalista con solo copyright y enlaces legales esenciales.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Página Completa</h2>
          <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
            <p className="mb-4 text-[#6D6C6C]">
              Ejemplo de estructura completa de página combinando los componentes de layout:
            </p>
            <div className="overflow-hidden rounded-lg border border-[#E5E5E5]">
              <div className="flex flex-col min-h-[600px]">
                <Navbar
                  logo={<span className="text-xl font-bold">LOKL</span>}
                  items={[
                    { label: "Inicio", href: "#", active: true },
                    { label: "Inversiones", href: "#" },
                    { label: "Nosotros", href: "#" },
                    { label: "Contacto", href: "#" },
                  ]}
                  actions={
                    <Button size="sm">Mi cuenta</Button>
                  }
                />
                
                <HeroSection
                  title={<span>Invierte en <span className="text-[#5352F6]">LOKL</span></span>}
                  subtitle="La plataforma líder de inversión inmobiliaria en Latinoamérica"
                  className="bg-[#F5F5F5]"
                >
                  <Button>Comenzar</Button>
                </HeroSection>
                
                <div className="flex-grow py-8">
                  <StepsSection
                    title="Proceso simple"
                    subtitle="Tres pasos para comenzar a invertir"
                    variant="default"
                    centered={true}
                    className="container mx-auto px-4"
                  >
                    <StepsContainer>
                      <StepItem
                        icon={<User size={24} />}
                        title="Regístrate"
                        description="Crea tu cuenta"
                      />
                      <StepItem
                        icon={<Building size={24} />}
                        title="Explora"
                        description="Encuentra proyectos"
                      />
                      <StepItem
                        icon={<Wallet size={24} />}
                        title="Invierte"
                        description="Desde $100.000"
                      />
                    </StepsContainer>
                  </StepsSection>
                </div>
                
                <Footer variant="simple" />
              </div>
            </div>
            <p className="mt-4 text-sm text-[#6D6C6C]">
              Estructura básica de página con navbar, hero section, sección de contenido y footer.
            </p>
          </div>
        </section>
      </main>

      <Footer variant="simple" />
    </div>
  );
}
