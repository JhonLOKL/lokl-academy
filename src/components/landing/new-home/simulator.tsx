"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Calendar,
  TrendingUp,
  DollarSign,
  Percent,
  Building2,
  Plus,
} from "lucide-react";

export default function Simulator() {
  const [selectedProject, setSelectedProject] =
    useState("nido-de-agua");
  const [investmentAmount, setInvestmentAmount] =
    useState("12900000");
  const [installments, setInstallments] = useState("unico");
  const [isCalculated, setIsCalculated] = useState(false);

  const projects = [
    {
      id: "nido-de-agua",
      name: "Nido de Agua",
      location: "Guatapé, Colombia",
      image: "https://lokl-assets.s3.amazonaws.com/nido-de-agua/AEREA+NOCHE.jpg",
      roi: 13.5,
      minRoi: 6.18,
      maxRoi: 14.26,
      totalUnits: 100,
      unitCost: 129000,
      occupancyRate: 65,
      avgRent: 845000,
      costMargin: 50,
      accommodation: 60,
    },
    {
      id: "indie-universe",
      name: "Indie Universe",
      location: "Medellín, Laureles",
      image: "https://lokl-assets.s3.us-east-1.amazonaws.com/indie-universe/indie_universe.jpg",
      roi: 12.5,
      minRoi: 5.8,
      maxRoi: 13.2,
      totalUnits: 132,
      unitCost: 120000,
      occupancyRate: 70,
      avgRent: 780000,
      costMargin: 45,
      accommodation: 55,
    },
    {
      id: "aldea",
      name: "Aldea",
      location: "La Unión, Colombia",
      image: "https://lokl-assets.s3.us-east-1.amazonaws.com/aldea/aldea_houses.jpeg",
      roi: 15.2,
      minRoi: 7.5,
      maxRoi: 16.8,
      totalUnits: 138,
      unitCost: 115000,
      occupancyRate: 68,
      avgRent: 920000,
      costMargin: 52,
      accommodation: 62,
    },
  ];

  const currentProject =
    projects.find((p) => p.id === selectedProject) ||
    projects[0];
  const investment = parseFloat(investmentAmount) || 0;
  const numUnits = Math.floor(
    investment / currentProject.unitCost,
  );
  const participation = (
    (numUnits / currentProject.totalUnits) *
    100
  ).toFixed(3);
  const monthlyCost =
    installments === "unico"
      ? 0
      : investment / parseFloat(installments);

  // Cálculos de rentabilidad a 5 años
  const calculateReturns = () => {
    const years = 5;
    const yearlyData = [];
    let totalRents = 0;
    let totalAppreciation = 0;

    for (let year = 1; year <= years; year++) {
      // Rentas anuales (disminuyen ligeramente año a año por variabilidad)
      const yearlyRent =
        investment *
        (currentProject.roi / 100) *
        (1 - (year - 1) * 0.02);
      totalRents += yearlyRent;

      // Valorización acumulada (3-5% anual)
      const appreciationRate = 0.04;
      const yearlyAppreciation =
        investment * appreciationRate * year;
      totalAppreciation = investment * appreciationRate * year;

      // Retorno total anual
      const annualReturn = (
        (yearlyRent / investment) *
        100
      ).toFixed(2);

      yearlyData.push({
        name: `Año ${year}`,
        Valorización: Math.round(yearlyAppreciation / 1000000),
        Utilidades: Math.round(yearlyRent / 1000000),
        "Retorno anual": parseFloat(annualReturn),
      });
    }

    return {
      totalRents: Math.round(totalRents),
      totalAppreciation: Math.round(totalAppreciation),
      totalUtility: Math.round(totalRents + totalAppreciation),
      yearlyData,
    };
  };

  const returns = calculateReturns();

  const handleCalculate = () => {
    setIsCalculated(true);
  };

  return (
    <section className="py-16 md:py-24 bg-[#F3F3F3]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 font-bold font-normal">
            <span className="text-[#5352F6] font-bold">Simulador</span> de
            inversiones
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Calcula el retorno de tu inversión y descubre cómo
            hacer crecer tu patrimonio con{" "}
            <span className="text-[#5352F6]">LOKL</span>
          </p>
        </div>

        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Panel Izquierdo - Controles con fondo azul */}
            <div className="bg-[#5352F6] p-8 lg:p-12 text-white">
              <div className={`space-y-6 ${!isCalculated ? 'min-h-[450px] lg:min-h-[550px] flex flex-col justify-center' : ''}`}>
                {/* Selector de Proyecto */}
                <div className="space-y-2">
                  <Label
                    htmlFor="project"
                    className="flex items-center gap-2 text-white"
                  >
                    <Building2 className="w-4 h-4" />
                    Selecciona tu Proyecto
                  </Label>
                  <Select
                    value={selectedProject}
                    onValueChange={setSelectedProject}
                  >
                    <SelectTrigger
                      id="project"
                      className="bg-white/10 backdrop-blur-sm border-white/20 text-white"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem
                          key={project.id}
                          value={project.id}
                        >
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Monto de Inversión */}
                <div className="space-y-2">
                  <Label
                    htmlFor="amount"
                    className="flex items-center gap-2 text-white"
                  >
                    <DollarSign className="w-4 h-4" />
                    Monto a Invertir (COP)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={investmentAmount}
                    onChange={(e) =>
                      setInvestmentAmount(e.target.value)
                    }
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50"
                    placeholder="12900000"
                  />
                </div>

                {/* Número de Cuotas */}
                <div className="space-y-2">
                  <Label
                    htmlFor="installments"
                    className="flex items-center gap-2 text-white"
                  >
                    <Calendar className="w-4 h-4" />
                    Forma de Pago
                  </Label>
                  <Select
                    value={installments}
                    onValueChange={setInstallments}
                  >
                    <SelectTrigger
                      id="installments"
                      className="bg-white/10 backdrop-blur-sm border-white/20 text-white"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unico">
                        Pago único
                      </SelectItem>
                      <SelectItem value="3">
                        3 cuotas
                      </SelectItem>
                      <SelectItem value="6">
                        6 cuotas
                      </SelectItem>
                      <SelectItem value="12">
                        12 cuotas
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Botón Calcular */}
                <Button
                  onClick={handleCalculate}
                  className="w-full bg-white hover:bg-white/90 text-[#5352F6] border-2 border-white/20"
                  size="lg"
                >
                  Calcular Retorno
                </Button>

                {/* Indicadores */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex flex-wrap justify-center items-center gap-6">
                    <div className="space-y-1 text-center">
                      <p className="text-xs text-white/70">
                        Total a pagar
                      </p>
                      <p className="text-xl text-white">
                        ${investment.toLocaleString("es-CO")}
                      </p>
                    </div>
                    <div className="w-px h-10 bg-white/20"></div>
                    <div className="space-y-1 text-center">
                      <p className="text-xs text-white/70">
                        Costo unit.
                      </p>
                      <p className="text-xl text-white">
                        $
                        {currentProject.unitCost.toLocaleString(
                          "es-CO",
                        )}
                      </p>
                    </div>
                    <div className="w-px h-10 bg-white/20"></div>
                    <div className="space-y-1 text-center">
                      <p className="text-xs text-white/70">
                        Participación
                      </p>
                      <p className="text-xl text-white">
                        {participation}%{" "}
                        <span className="text-sm text-white/70">
                          ({numUnits.toFixed(1)} # de units)
                        </span>
                      </p>
                    </div>
                    {installments !== "unico" && (
                      <>
                        <div className="w-px h-10 bg-white/20"></div>
                        <div className="space-y-1 text-center">
                          <p className="text-xs text-white/70">
                            Cuota mensual
                          </p>
                          <p className="text-xl text-white">
                            $
                            {monthlyCost.toLocaleString(
                              "es-CO",
                              { maximumFractionDigits: 0 },
                            )}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Utilidad Estimada */}
                {isCalculated && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h3 className="text-sm mb-6 text-white text-center">
                      Utilidad de tu inversión estimada a 5
                      años*
                    </h3>
                    <div className="flex items-center justify-center gap-3 flex-wrap">
                      {/* Rentas percibidas */}
                      <div className="space-y-1 text-center">
                        <p className="text-2xl text-white">
                          $
                          {(
                            returns.totalRents / 1000000
                          ).toFixed(1)}
                          M
                        </p>
                        <p className="text-xs text-white/70">
                          Rentas percibidas
                        </p>
                      </div>

                      {/* Símbolo + */}
                      <div className="text-3xl text-white/50 mt-[-20px]">
                        +
                      </div>

                      {/* Valorización */}
                      <div className="space-y-1 text-center">
                        <p className="text-2xl text-white">
                          $
                          {(
                            returns.totalAppreciation / 1000000
                          ).toFixed(1)}
                          M
                        </p>
                        <p className="text-xs text-white/70">
                          Valorización activo
                        </p>
                      </div>

                      {/* Símbolo = */}
                      <div className="text-3xl text-white/50 mt-[-20px]">
                        =
                      </div>

                      {/* Utilidad Total - Destacada */}
                      <div className="px-4 py-3 space-y-1 text-center bg-[rgba(255,255,255,0)]">
                        <p className="text-3xl text-white">
                          $
                          {(
                            returns.totalUtility / 1000000
                          ).toFixed(1)}
                          M
                        </p>
                        <p className="text-xs text-white/90">
                          Utilidad estimada*
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Supuestos de Operación */}
                {isCalculated && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-6">
                    <h4 className="mb-4 text-white text-center">Supuestos Operación*</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between py-2 border-b border-white/20">
                        <span className="text-white/70">
                          Alojamiento
                        </span>
                        <span className="text-white">
                          {currentProject.accommodation} días
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-white/20">
                        <span className="text-white/70">
                          Tarifa Promedio
                        </span>
                        <span className="text-white">
                          $
                          {currentProject.avgRent.toLocaleString(
                            "es-CO",
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-white/20">
                        <span className="text-white/70">
                          Ocupación Hotel
                        </span>
                        <span className="text-white">
                          {currentProject.occupancyRate}%
                        </span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-white/70">
                          Margen de Costos
                        </span>
                        <span className="text-white">{currentProject.costMargin}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Panel Derecho - Resultados */}
            <div className="bg-gray-50">
              {!isCalculated ? (
                /* Vista inicial: Imagen a pantalla completa */
                <div className="relative h-full min-h-[700px] lg:min-h-[800px]">
                  <img 
                    src={currentProject.image} 
                    alt={currentProject.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* Overlay con gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  
                  {/* Info del proyecto */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
                    <div className="flex items-center gap-3 mb-4">
                      <Building2 className="w-7 h-7 text-white" />
                      <h3 className="text-white text-4xl lg:text-5xl">
                        {currentProject.name}
                      </h3>
                    </div>
                    <p className="text-white/90 text-xl flex items-center gap-2 mb-6">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {currentProject.location}
                    </p>
                    
                    {/* CTA para calcular */}
                    <div className="mt-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                      <p className="text-white text-lg mb-2">
                        👈 Completa los datos y presiona <span className="font-bold">"Calcular Retorno"</span>
                      </p>
                      <p className="text-white/80">
                        para ver tu proyección de inversión
                      </p>
                    </div>
                  </div>

                  {/* Tag ROI en rangos - Esquina superior derecha */}
                  <div className="absolute top-8 right-8 bg-[#5352F6]/95 backdrop-blur-sm px-5 py-3 rounded-full shadow-xl">
                    <div className="flex items-center gap-2">
                      <Percent className="w-4 h-4 text-white" />
                      <p className="text-white">
                        {currentProject.minRoi}% - {currentProject.maxRoi}% ROI Anual Estimado
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Vista de simulación con imagen resumida */
                <div className="p-8 lg:p-12 space-y-8">
                  {/* Imagen resumida del proyecto con retorno */}
                  <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                    <div className="relative h-72">
                      <img 
                        src={currentProject.image} 
                        alt={currentProject.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Overlay con gradiente mejorado */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                      
                      {/* Contenido centrado vertical y horizontalmente */}
                      <div className="absolute inset-0 p-5">
                        
                        {/* Tag de ROI por rangos - Esquina superior */}
                        <div className="absolute top-5 right-5">
                          <div className="inline-flex items-center gap-1.5 bg-[#5352F6] px-3 py-1.5 rounded-full shadow-lg">
                            <Percent className="w-3.5 h-3.5 text-white" />
                            <span className="text-white text-sm">
                              {currentProject.minRoi}% - {currentProject.maxRoi}%
                            </span>
                          </div>
                        </div>
                        
                        {/* Nombre y ubicación - Parte inferior */}
                        <div className="absolute bottom-5 left-5 right-5">
                          <h3 className="text-white text-2xl mb-2">
                            {currentProject.name}
                          </h3>
                          
                          <p className="text-white/90 flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {currentProject.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gráfica de Barras Mejorada */}
                  <div>
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <h4 className="text-center">
                        Proyección de retorno a 5 años
                      </h4>
                    </div>
                    <div className="h-80">
                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                      >
                        <BarChart
                          data={returns.yearlyData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 40,
                          }}
                          barGap={2}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#E5E7EB"
                            vertical={false}
                          />
                          <XAxis
                            dataKey="name"
                            tick={(props) => {
                              const { x, y, payload } = props;
                              const dataPoint =
                                returns.yearlyData.find(
                                  (d) => d.name === payload.value,
                                );
                              return (
                                <g
                                  transform={`translate(${x},${y})`}
                                >
                                  <text
                                    x={0}
                                    y={0}
                                    dy={10}
                                    textAnchor="middle"
                                    fill="#6B7280"
                                    fontSize={13}
                                    fontWeight={500}
                                  >
                                    {payload.value}
                                  </text>
                                  {/* Badge de rentabilidad con borde azul */}
                                  <rect
                                    x={-28}
                                    y={16}
                                    width={56}
                                    height={22}
                                    rx={11}
                                    fill="white"
                                    stroke="#5352F6"
                                    strokeWidth={1.5}
                                  />
                                  <text
                                    x={0}
                                    y={29}
                                    dy={3}
                                    textAnchor="middle"
                                    fill="#5352F6"
                                    fontSize={12}
                                    fontWeight={600}
                                  >
                                    {dataPoint?.["Retorno anual"]}
                                    %
                                  </text>
                                </g>
                              );
                            }}
                            axisLine={{ stroke: "#E5E7EB" }}
                            tickLine={false}
                            height={60}
                          />
                          <YAxis
                            tick={{
                              fontSize: 13,
                              fill: "#6B7280",
                              fontWeight: 500,
                            }}
                            axisLine={false}
                            tickLine={false}
                            label={{
                              value: "Millones COP",
                              angle: -90,
                              position: "insideLeft",
                              fontSize: 13,
                              fill: "#6B7280",
                              fontWeight: 500,
                            }}
                          />
                          <Tooltip
                            cursor={{
                              fill: "rgba(83, 82, 246, 0.05)",
                            }}
                            contentStyle={{
                              backgroundColor: "white",
                              border: "1px solid #E5E7EB",
                              borderRadius: "12px",
                              fontSize: "13px",
                              boxShadow:
                                "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                            }}
                          />
                          <Legend
                            wrapperStyle={{
                              fontSize: "13px",
                              fontWeight: 500,
                              paddingTop: "20px",
                            }}
                            content={(props) => {
                              return (
                                <div className="flex items-center justify-center gap-6 pt-5">
                                  {/* Valorización */}
                                  <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#5352F6]"></div>
                                    <span className="text-sm">Valorización</span>
                                  </div>
                                  {/* Utilidades */}
                                  <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
                                    <span className="text-sm">Utilidades</span>
                                  </div>
                                  {/* Rentabilidad */}
                                  <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-white border-[1.5px] border-[#5352F6]"></div>
                                    <span className="text-sm">Rentabilidad</span>
                                  </div>
                                </div>
                              );
                            }}
                          />
                          <Bar
                            dataKey="Valorización"
                            fill="#5352F6"
                            radius={[8, 8, 0, 0]}
                            maxBarSize={60}
                          />
                          <Bar
                            dataKey="Utilidades"
                            fill="#10B981"
                            radius={[8, 8, 0, 0]}
                            maxBarSize={60}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* CTA Asesor - Compacto */}
                  <div className="bg-gray-100 rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                      {/* Foto del asesor - Izquierda */}
                      <img
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face"
                        alt="Asesor LOKL"
                        className="w-16 h-16 rounded-full object-cover border-3 border-[#5352F6]/20 flex-shrink-0"
                      />

                      {/* Contenido - Derecha */}
                      <div className="flex-1">
                        <h4 className="mb-1 text-foreground">
                          ¿Necesitas ayuda para decidir?
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Agenda una llamada con nuestros expertos
                        </p>
                        <Button className="bg-[#5352F6] hover:bg-[#5352F6]/90 text-white px-6">
                          <Calendar className="w-4 h-4 mr-2" />
                          Agendar llamada
                        </Button>
                      </div>
                    </div>

                    {/* Disclaimer */}
                    <p className="text-xs text-muted-foreground text-center mt-6 pt-4 border-t border-gray-300">
                      * Los retornos mostrados son estimaciones
                      basadas en supuestos de mercado y pueden
                      variar. Las inversiones en bienes raíces
                      conllevan riesgos y no garantizan
                      rendimientos.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
