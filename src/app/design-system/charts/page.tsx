"use client";

import React from "react";
import { 
  Navbar, 
  Footer, 
  ProgressCircle, 
  BarChart,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/design-system";

export default function ChartsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar
        logo={<span className="text-xl font-bold">LOKL <span className="text-[#5352F6]">Design System</span></span>}
        items={[
          { label: "Componentes", href: "/design-system" },
          { label: "Botones", href: "/design-system/buttons" },
          { label: "Formularios", href: "/design-system/forms" },
          { label: "Tarjetas", href: "/design-system/cards" },
          { label: "Gráficos", href: "/design-system/charts", active: true },
          { label: "Layouts", href: "/design-system/layouts" },
          { label: "Colores", href: "/design-system/colors" },
          { label: "Iconos", href: "/design-system/icons" },
          { label: "Tarjetas Visuales", href: "/design-system/visual-cards" },
          { label: "Tipografía", href: "/design-system/typography" },
        ]}
      />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight">Gráficos LOKL</h1>
          <p className="text-[#6D6C6C] max-w-3xl">
            Componentes de visualización de datos diseñados para presentar información de forma clara y atractiva.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Círculos de Progreso</h2>
          <Card>
            <CardHeader>
              <CardTitle>Indicadores de Progreso Circular</CardTitle>
              <CardDescription>
                Visualización de progreso o porcentajes en formato circular con diferentes tamaños y estilos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center justify-around gap-8 py-8">
                <div className="flex flex-col items-center">
                  <ProgressCircle
                    value={75}
                    label={<span className="text-lg font-bold">75%</span>}
                  />
                  <p className="mt-2 text-sm text-[#6D6C6C]">Progreso estándar</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <ProgressCircle
                    value={40}
                    size={80}
                    strokeWidth={6}
                    color="#000000"
                    label={<span className="text-sm font-bold">40%</span>}
                  />
                  <p className="mt-2 text-sm text-[#6D6C6C]">Tamaño pequeño</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <ProgressCircle
                    value={90}
                    size={150}
                    strokeWidth={10}
                    color="#5352F6"
                    backgroundColor="#E5E5E5"
                    label={<span className="text-2xl font-bold">90%</span>}
                  />
                  <p className="mt-2 text-sm text-[#6D6C6C]">Tamaño grande</p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col items-center">
                  <ProgressCircle
                    value={60}
                    color="#5352F6"
                    label={<span className="text-lg font-bold">60%</span>}
                  />
                  <p className="mt-2 text-sm text-[#6D6C6C]">Color primario</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <ProgressCircle
                    value={50}
                    color="#000000"
                    backgroundColor="#F5F5F5"
                    label={<span className="text-lg font-bold">50%</span>}
                  />
                  <p className="mt-2 text-sm text-[#6D6C6C]">Color negro</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <ProgressCircle
                    value={25}
                    color="#6D6C6C"
                    backgroundColor="#E5E5E5"
                    label={<span className="text-lg font-bold">25%</span>}
                  />
                  <p className="mt-2 text-sm text-[#6D6C6C]">Color gris</p>
                </div>
              </div>
              
              <div className="mt-12 rounded-lg bg-[#0F0F0F] p-8">
                <div className="flex flex-wrap items-center justify-around gap-8">
                  <div className="flex flex-col items-center">
                    <ProgressCircle
                      value={65}
                      color="#5352F6"
                      backgroundColor="#444444"
                      label={<span className="text-lg font-bold text-white">65%</span>}
                    />
                    <p className="mt-2 text-sm text-white opacity-80">Fondo oscuro</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <ProgressCircle
                      value={80}
                      color="#FFFFFF"
                      backgroundColor="#444444"
                      label={<span className="text-lg font-bold text-white">80%</span>}
                    />
                    <p className="mt-2 text-sm text-white opacity-80">Progreso blanco</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Gráficos de Barras</h2>
          <Card>
            <CardHeader>
              <CardTitle>Gráficos de Barras Verticales</CardTitle>
              <CardDescription>
                Visualización de datos comparativos mediante barras verticales con diferentes configuraciones.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-12">
              <div>
                <h3 className="mb-4 text-lg font-semibold">Rendimiento Mensual</h3>
                <BarChart
                  data={[
                    { label: "Ene", value: 45, color: "#5352F6" },
                    { label: "Feb", value: 60, color: "#7A79F9" },
                    { label: "Mar", value: 30, color: "#A1A0FB" },
                    { label: "Abr", value: 80, color: "#5352F6" },
                    { label: "May", value: 55, color: "#7A79F9" },
                    { label: "Jun", value: 70, color: "#A1A0FB" },
                  ]}
                  height={200}
                />
                <p className="mt-4 text-sm text-[#6D6C6C]">
                  Gráfico de barras mostrando el rendimiento mensual con colores alternados.
                </p>
              </div>
              
              <div>
                <h3 className="mb-4 text-lg font-semibold">Comparativa de Inversiones</h3>
                <BarChart
                  data={[
                    { label: "Proyecto A", value: 85, color: "#5352F6" },
                    { label: "Proyecto B", value: 65, color: "#000000" },
                    { label: "Proyecto C", value: 45, color: "#7A79F9" },
                    { label: "Proyecto D", value: 90, color: "#5352F6" },
                  ]}
                  height={180}
                />
                <p className="mt-4 text-sm text-[#6D6C6C]">
                  Comparativa de rendimiento entre diferentes proyectos de inversión.
                </p>
              </div>
              
              <div>
                <h3 className="mb-4 text-lg font-semibold">Distribución de Cartera</h3>
                <BarChart
                  data={[
                    { label: "Inmuebles", value: 65, color: "#5352F6" },
                    { label: "Bonos", value: 25, color: "#7A79F9" },
                    { label: "Acciones", value: 10, color: "#A1A0FB" },
                  ]}
                  height={220}
                  showValues={true}
                />
                <p className="mt-4 text-sm text-[#6D6C6C]">
                  Distribución porcentual de una cartera de inversiones con valores mostrados.
                </p>
              </div>
              
              <div className="rounded-lg bg-[#0F0F0F] p-8">
                <h3 className="mb-4 text-lg font-semibold text-white">Rendimiento Anual (Tema Oscuro)</h3>
                <BarChart
                  data={[
                    { label: "2020", value: 55, color: "#5352F6" },
                    { label: "2021", value: 68, color: "#7A79F9" },
                    { label: "2022", value: 75, color: "#A1A0FB" },
                    { label: "2023", value: 82, color: "#FFFFFF" },
                  ]}
                  height={180}
                  darkTheme={true}
                />
                <p className="mt-4 text-sm text-white opacity-80">
                  Gráfico de barras con tema oscuro para mostrar el rendimiento anual.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
        
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Combinaciones y Casos de Uso</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Rendimiento de Inversión</CardTitle>
                <CardDescription>
                  Progreso hacia la meta de rentabilidad anual
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <ProgressCircle
                  value={78}
                  size={180}
                  strokeWidth={12}
                  color="#5352F6"
                  backgroundColor="#F5F5F5"
                  label={
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-black">78%</span>
                      <span className="text-sm font-medium text-[#6D6C6C]">de la meta</span>
                    </div>
                  }
                />
                <div className="mt-8 w-full">
                  <p className="mb-2 text-sm font-medium">Progreso mensual</p>
                  <BarChart
                    data={[
                      { label: "Ago", value: 55, color: "#A1A0FB" },
                      { label: "Sep", value: 62, color: "#7A79F9" },
                      { label: "Oct", value: 70, color: "#5352F6" },
                      { label: "Nov", value: 78, color: "#5352F6" },
                    ]}
                    height={100}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Portafolio</CardTitle>
                <CardDescription>
                  Análisis de la diversificación actual de inversiones
                </CardDescription>
              </CardHeader>
              <CardContent className="py-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col items-center">
                    <ProgressCircle
                      value={60}
                      size={120}
                      strokeWidth={8}
                      color="#5352F6"
                      label={<span className="text-lg font-bold">60%</span>}
                    />
                    <p className="mt-2 text-sm font-medium">Inmobiliario</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <ProgressCircle
                      value={25}
                      size={120}
                      strokeWidth={8}
                      color="#000000"
                      label={<span className="text-lg font-bold">25%</span>}
                    />
                    <p className="mt-2 text-sm font-medium">Bonos</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <ProgressCircle
                      value={10}
                      size={120}
                      strokeWidth={8}
                      color="#7A79F9"
                      label={<span className="text-lg font-bold">10%</span>}
                    />
                    <p className="mt-2 text-sm font-medium">Acciones</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <ProgressCircle
                      value={5}
                      size={120}
                      strokeWidth={8}
                      color="#6D6C6C"
                      label={<span className="text-lg font-bold">5%</span>}
                    />
                    <p className="mt-2 text-sm font-medium">Otros</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer variant="simple" />
    </div>
  );
}
