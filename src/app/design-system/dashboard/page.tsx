"use client";

import React, { useState } from "react";
import {
  Navbar,
  Footer,
  SimpleBarChart,
  SimpleLineChart,
  PieChart,
  DonutChart,
  SimpleAreaChart,
  SimpleRadarChart,
  DataTable,
  Badge,
  MetricCard,
  KpiCard,
  StatCard,
} from "@/components/design-system";
import {
  Building,
  Calendar,
  LineChart,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

export default function DashboardPage() {
  // Datos para los gráficos
  const barChartData = [
    { label: "Ene", value: 1200 },
    { label: "Feb", value: 1800 },
    { label: "Mar", value: 3000 },
    { label: "Abr", value: 2800 },
    { label: "May", value: 3400 },
    { label: "Jun", value: 4200 },
  ];

  const lineChartData = [
    { label: "Ene", value: 1200 },
    { label: "Feb", value: 1800 },
    { label: "Mar", value: 3000 },
    { label: "Abr", value: 2800 },
    { label: "May", value: 4300 },
    { label: "Jun", value: 4800 },
    { label: "Jul", value: 5000 },
    { label: "Ago", value: 5200 },
  ];

  const areaChartData = [
    { label: "Ene", value: 2500 },
    { label: "Feb", value: 1500 },
    { label: "Mar", value: 9800 },
    { label: "Abr", value: 3700 },
    { label: "May", value: 5000 },
    { label: "Jun", value: 4000 },
    { label: "Jul", value: 4200 },
  ];

  const pieChartData = [
    { name: "Residencial", value: 45 },
    { name: "Comercial", value: 25 },
    { name: "Hospitalario", value: 20 },
    { name: "Mixto", value: 10 },
  ];

  const radarChartData = [
    { category: "Rentabilidad", value: 80 },
    { category: "Liquidez", value: 60 },
    { category: "Seguridad", value: 90 },
    { category: "Crecimiento", value: 70 },
    { category: "Ubicación", value: 85 },
    { category: "Gestión", value: 75 },
  ];

  // Datos para la tabla de proyectos
  const projectsData = [
    {
      id: 1,
      name: "Nido de Agua",
      type: "Hospitalario",
      location: "Guatapé, Colombia",
      roi: "12-15%",
      status: "Construcción",
      partners: 984,
      occupancy: 87,
      available: true,
      startDate: "ene 24",
    },
    {
      id: 2,
      name: "Bosque Verde",
      type: "Hospitalario",
      location: "El Peñón, Colombia",
      roi: "14-18%",
      status: "Operando",
      partners: 1247,
      occupancy: 92,
      available: true,
      startDate: "ago 23",
    },
    {
      id: 3,
      name: "Project Aldea",
      type: "Mixto",
      location: "El Retiro, Colombia",
      roi: "16-20%",
      status: "Próximamente",
      partners: 0,
      occupancy: 0,
      available: false,
      startDate: "may 24",
    },
    {
      id: 4,
      name: "Oasis Montaña",
      type: "Residencial",
      location: "San Rafael, Colombia",
      roi: "15-18%",
      status: "Próximamente",
      partners: 0,
      occupancy: 0,
      available: false,
      startDate: "sept 24",
    },
    {
      id: 5,
      name: "Vista del Valle",
      type: "Hospitalario",
      location: "Jardín, Colombia",
      roi: "13-16%",
      status: "Operando",
      partners: 756,
      occupancy: 78,
      available: false,
      startDate: "nov 23",
    },
    {
      id: 6,
      name: "Urban Plaza",
      type: "Comercial",
      location: "Medellín, Colombia",
      roi: "18-22%",
      status: "Construcción",
      partners: 1563,
      occupancy: 45,
      available: true,
      startDate: "feb 24",
    },
  ];

  // Datos para la tabla de inversores
  const investorsData = [
    {
      id: 1,
      name: "María González",
      userId: "USR001",
      tier: "Premium",
      projects: 3,
      roi: "14.2%",
    },
    {
      id: 2,
      name: "Carlos Restrepo",
      userId: "USR002",
      tier: "VIP",
      projects: 5,
      roi: "16.8%",
    },
    {
      id: 3,
      name: "Ana Patricia Silva",
      userId: "USR003",
      tier: "Básico",
      projects: 2,
      roi: "12.5%",
    },
    {
      id: 4,
      name: "Roberto Mendoza",
      userId: "USR004",
      tier: "VIP",
      projects: 8,
      roi: "18.9%",
    },
    {
      id: 5,
      name: "Isabel López",
      userId: "USR005",
      tier: "Básico",
      projects: 1,
      roi: "11.3%",
    },
  ];

  // Datos para la tabla de rendimiento trimestral
  const performanceData = [
    {
      id: 1,
      period: "Q1 2024",
      projects: 8,
      investors: 2847,
      roi: "15.6%",
      growth: "+12.3%",
    },
    {
      id: 2,
      period: "Q4 2023",
      projects: 6,
      investors: 2534,
      roi: "14.8%",
      growth: "+8.7%",
    },
    {
      id: 3,
      period: "Q3 2023",
      projects: 7,
      investors: 2341,
      roi: "13.9%",
      growth: "+6.2%",
    },
    {
      id: 4,
      period: "Q2 2023",
      projects: 5,
      investors: 2156,
      roi: "13.2%",
      growth: "+4.8%",
    },
  ];

  // Estado para el gráfico de dona
  const [activeDonutIndex, setActiveDonutIndex] = useState<number | undefined>(undefined);

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
          { label: "Layouts", href: "/design-system/layouts" },
          { label: "Colores", href: "/design-system/colors" },
          { label: "Iconos", href: "/design-system/icons" },
          { label: "Tarjetas Visuales", href: "/design-system/visual-cards" },
          { label: "Tipografía", href: "/design-system/typography" },
          { label: "Dashboard", href: "/design-system/dashboard", active: true },
        ]}
      />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight">Dashboard LOKL</h1>
          <p className="text-[#6D6C6C] max-w-3xl">
            Componentes de visualización de datos para crear dashboards interactivos con el estilo LOKL.
          </p>
        </div>

        {/* Tarjetas de Métricas */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Tarjetas de Métricas</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Inversión Total"
              subtitle="Este mes"
              value="$2.4M"
              description="Capital total invertido"
              trend={12.5}
              icon={<TrendingUp className="h-5 w-5 text-[#5352F6]" />}
            />
            <MetricCard
              title="Proyectos Activos"
              subtitle="Actualmente"
              value="47"
              description="Proyectos en desarrollo"
              trend={8.2}
              variant="bordered"
              icon={<Building className="h-5 w-5 text-[#0F0F0F]" />}
            />
            <MetricCard
              title="ROI Promedio"
              subtitle="Últimos 12 meses"
              value="16.3%"
              description="Retorno anual promedio"
              trend={2.1}
              variant="subtle"
              icon={<LineChart className="h-5 w-5 text-[#5352F6]" />}
            />
            <MetricCard
              title="Usuarios Activos"
              subtitle="Este mes"
              value="2,847"
              description="Inversionistas activos"
              trend={-3.2}
              variant="bordered"
              icon={<Users className="h-5 w-5 text-[#0F0F0F]" />}
            />
          </div>
        </section>

        {/* Tarjetas KPI */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Tarjetas KPI</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <KpiCard
              title="Meta de Inversión"
              subtitle="Q1 2024"
              value="2.4M"
              target="3.0M USD"
              progress={80}
              progressLabel="80.0% completado"
              remainingLabel="0.6M restante"
              trend={14.3}
              icon={<Wallet className="h-5 w-5 text-[#5352F6]" />}
            />
            <KpiCard
              title="Ocupación de Proyectos"
              subtitle="Promedio actual"
              value="75"
              target="85 %"
              progress={88.2}
              progressLabel="88.2% completado"
              remainingLabel="10 restante"
              trend={10.3}
              icon={<Building className="h-5 w-5 text-[#5352F6]" />}
            />
            <KpiCard
              title="Nuevos Inversionistas"
              subtitle="Este trimestre"
              value="842"
              target="1000 usuarios"
              progress={84.2}
              progressLabel="84.2% completado"
              remainingLabel="158 restante"
              trend={16.8}
              icon={<Users className="h-5 w-5 text-[#5352F6]" />}
            />
          </div>
        </section>

        {/* Tarjetas de Estadísticas */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Tendencias y Progreso</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Ingresos Diarios"
              value="140K"
              changeText="+10K desde ayer"
              change={7.7}
              chart={
                <SimpleLineChart
                  data={[
                    { label: "Lun", value: 120 },
                    { label: "Mar", value: 150 },
                    { label: "Mié", value: 130 },
                    { label: "Jue", value: 160 },
                    { label: "Vie", value: 140 },
                    { label: "Sáb", value: 120 },
                    { label: "Dom", value: 140 },
                  ]}
                  height={60}
                  color="#5352F6"
                  className="mt-2"
                />
              }
            />
            <StatCard
              title="Comparativa Mensual"
              value="2.4K"
              changeText="Mes anterior: 2.1K"
              change={14.3}
              icon={<Calendar className="h-5 w-5 text-[#5352F6]" />}
            />
            <StatCard
              title="Proyectos Completados"
              value="12"
              changeText="/ 15 proyectos"
              change={0}
              chart={
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#E5E5E5]">
                  <div
                    className="h-full rounded-full bg-[#5352F6]"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              }
            />
            <StatCard
              title="Satisfacción"
              value="78%"
              change={2.5}
              chart={
                <div className="mx-auto mt-2 h-16 w-16">
                  <div className="relative h-full w-full">
                    <div className="h-full w-full rounded-full border-4 border-[#E5E5E5]"></div>
                    <div
                      className="absolute top-0 h-full w-full rounded-full border-4 border-[#22C55E]"
                      style={{
                        clipPath: `polygon(50% 50%, 50% 0, ${50 + 50 * Math.cos(Math.PI * 2 * 0.78)}% ${50 - 50 * Math.sin(Math.PI * 2 * 0.78)}%, 50% 50%)`,
                      }}
                    ></div>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold">
                      78%
                    </div>
                  </div>
                </div>
              }
            />
          </div>
        </section>

        {/* Gráficos Básicos */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Gráficas Básicas</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <SimpleBarChart
                data={barChartData}
                title="Gráfica de Barras"
                subtitle="Inversiones por mes"
                valuePrefix="$"
                height={300}
              />
            </div>
            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <SimpleLineChart
                data={lineChartData}
                title="Gráfica de Líneas"
                subtitle="Tendencia de crecimiento"
                valuePrefix="$"
                height={300}
              />
            </div>
            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <SimpleAreaChart
                data={areaChartData}
                title="Gráfica de Área"
                subtitle="Volumen acumulado"
                valuePrefix="$"
                height={300}
              />
            </div>
            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <SimpleAreaChart
                data={areaChartData}
                title="Análisis de Volumen"
                subtitle="Flujo de inversiones mensual"
                valuePrefix="$"
                height={300}
              />
            </div>
          </div>
        </section>

        {/* Gráficos de Distribución */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Gráficas de Distribución</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <PieChart
                data={pieChartData}
                title="Gráfica Circular"
                subtitle="Distribución por tipo de inversión"
                height={300}
                activeIndex={activeDonutIndex}
                onActiveIndexChange={setActiveDonutIndex}
              />
            </div>
            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <DonutChart
                data={pieChartData}
                title="Gráfica de Dona"
                subtitle="Portfolio de inversiones"
                height={300}
                activeIndex={activeDonutIndex}
                onActiveIndexChange={setActiveDonutIndex}
              />
            </div>
          </div>
        </section>

        {/* Gráficos Avanzados */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Gráficas Avanzadas</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <SimpleRadarChart
                data={radarChartData}
                title="Gráfica Radar"
                subtitle="Análisis multidimensional del proyecto"
                height={300}
                maxValue={100}
              />
            </div>
            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <SimpleLineChart
                data={[
                  { label: "Ene", value: 800 },
                  { label: "Feb", value: 1200 },
                  { label: "Mar", value: 1800 },
                  { label: "Abr", value: 2000 },
                  { label: "May", value: 2400 },
                  { label: "Jun", value: 3200 },
                ]}
                title="Múltiples Series"
                subtitle="Comparativa de inversión, retorno y gastos"
                valuePrefix="$"
                height={300}
              />
            </div>
          </div>
        </section>

        {/* Tablas de Datos */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Proyectos Inmobiliarios LOKL</h2>
          <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
            <p className="mb-4 text-[#6D6C6C]">Vista completa del portafolio de inversiones con métricas en tiempo real</p>
            <DataTable
              columns={[
                {
                  key: "name",
                  header: "Proyecto",
                  cell: (row) => (
                    <div>
                      <div className="font-medium">{row.name}</div>
                      <div className="text-xs text-[#6D6C6C]">{row.type}</div>
                    </div>
                  ),
                },
                {
                  key: "location",
                  header: "Ubicación",
                  cell: (row) => <div>{row.location}</div>,
                },
                {
                  key: "roi",
                  header: "ROI Esperado",
                  cell: (row) => (
                    <div className="font-medium text-[#5352F6]">{row.roi}</div>
                  ),
                },
                {
                  key: "status",
                  header: "Estado",
                  cell: (row) => (
                    <Badge
                      variant={
                        row.status === "Operando"
                          ? "success"
                          : row.status === "Construcción"
                          ? "info"
                          : "warning"
                      }
                    >
                      {row.status}
                    </Badge>
                  ),
                },
                {
                  key: "partners",
                  header: "Partners",
                  cell: (row) => (
                    <div className="font-medium">
                      {row.partners > 0 ? row.partners : "-"}
                    </div>
                  ),
                },
                {
                  key: "occupancy",
                  header: "Ocupación",
                  cell: (row) => (
                    <div className="w-32">
                      {row.occupancy > 0 ? (
                        <>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-xs">{row.occupancy}%</span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E5E5E5]">
                            <div
                              className="h-full rounded-full bg-[#5352F6]"
                              style={{ width: `${row.occupancy}%` }}
                            ></div>
                          </div>
                        </>
                      ) : (
                        "0%"
                      )}
                    </div>
                  ),
                },
                {
                  key: "available",
                  header: "Disponible",
                  cell: (row) => (
                    <div className="flex justify-center">
                      {row.available ? (
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      ) : (
                        <div className="h-3 w-3 rounded-full bg-[#D1D1D1]"></div>
                      )}
                    </div>
                  ),
                  align: "center",
                },
                {
                  key: "startDate",
                  header: "Inicio",
                  cell: (row) => <div>{row.startDate}</div>,
                },
              ]}
              data={projectsData}
              zebra
            />
          </div>
        </section>

        {/* Más tablas */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Tablas de Datos Adicionales</h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <h3 className="mb-4 text-xl font-semibold">Top Inversores</h3>
              <p className="mb-4 text-[#6D6C6C]">Usuarios más activos de la plataforma</p>
              <DataTable
                columns={[
                  {
                    key: "name",
                    header: "Inversionista",
                    cell: (row) => (
                      <div>
                        <div className="font-medium">{row.name}</div>
                        <div className="text-xs text-[#6D6C6C]">{row.userId}</div>
                      </div>
                    ),
                  },
                  {
                    key: "tier",
                    header: "Tier",
                    cell: (row) => (
                      <Badge
                        variant={
                          row.tier === "Premium"
                            ? "info"
                            : row.tier === "VIP"
                            ? "success"
                            : "default"
                        }
                      >
                        {row.tier}
                      </Badge>
                    ),
                  },
                  {
                    key: "projects",
                    header: "Proyectos",
                    cell: (row) => <div className="text-center">{row.projects}</div>,
                    align: "center",
                  },
                  {
                    key: "roi",
                    header: "ROI",
                    cell: (row) => (
                      <div className="font-medium text-[#5352F6]">{row.roi}</div>
                    ),
                  },
                ]}
                data={investorsData}
                bordered={false}
                compact
              />
            </div>
            <div className="rounded-lg border border-[#E5E5E5] bg-white p-6">
              <h3 className="mb-4 text-xl font-semibold">Performance Trimestral</h3>
              <p className="mb-4 text-[#6D6C6C]">Métricas clave por período</p>
              <DataTable
                columns={[
                  {
                    key: "period",
                    header: "Periodo",
                    cell: (row) => <div className="font-medium">{row.period}</div>,
                  },
                  {
                    key: "projects",
                    header: "Proyectos",
                    cell: (row) => <div>{row.projects}</div>,
                    align: "center",
                  },
                  {
                    key: "investors",
                    header: "Inversores",
                    cell: (row) => <div>{row.investors}</div>,
                    align: "center",
                  },
                  {
                    key: "roi",
                    header: "ROI Avg",
                    cell: (row) => (
                      <div className="font-medium text-[#5352F6]">{row.roi}</div>
                    ),
                  },
                  {
                    key: "growth",
                    header: "Growth",
                    cell: (row) => (
                      <div className="text-green-600 font-medium">{row.growth}</div>
                    ),
                  },
                ]}
                data={performanceData}
                bordered={false}
                compact
              />
            </div>
          </div>
        </section>
      </main>

      <Footer variant="simple" />
    </div>
  );
}
