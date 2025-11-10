"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "@/components/simulator/phone-input-styles.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { NestedSelect } from "@/components/ui/nested-select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LeadFormSchema, LeadFormData, howDidYouHearAboutUsOptions } from "@/schemas/lead-schema";
import { User, Phone, Mail, Users, ArrowLeft } from "lucide-react";
import LazyImage from "./lazy-image";
import { useProjectStore } from "@/store/project-store";
import { useSimulatorStore } from "@/store/simulator-store";
import { parsePhoneData } from "@/lib/phone-utils";
import { createSimulationAction, createQuiivenContactAction, sendFirstMessageAction, saveSimulationAction } from "@/actions/simulator-actions";
import { upsertLeadAction } from "@/actions/user-action";
import { useUtmStore } from "@/store/utm-store";
import { useAuthStore } from "@/store/auth-store";

interface HeroProps {
  onWhatIsClick?: () => void;
}

export default function Hero({ onWhatIsClick }: HeroProps) {
  const { projects: globalProjects } = useProjectStore();
  const { setSelectedProject, setInvestmentAmount, setInstallments, setPrefetchedSimulationData } = useSimulatorStore();
  const { user } = useAuthStore();
  const { utmSource, utmMedium, utmCampaign, utmTerm, utmContent } = useUtmStore();

  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  // Filtrar proyectos activos (que no estén en "Etapa 0")
  const availableProjects = globalProjects.filter(p => p.phase !== "Etapa 0");

  // Imágenes para el hero móvil
  const mobileHeroImages = [
    "https://lokl-assets.s3.us-east-1.amazonaws.com/home/Hero-indie-movil.png",
    "https://lokl-assets.s3.us-east-1.amazonaws.com/home/Hero-nido-movil.png"
  ];

  // Estado para el simulador del hero
  const [selectedHeroProjectId, setSelectedHeroProjectId] = useState<string>("");
  const [heroInvestmentAmount, setHeroInvestmentAmount] = useState(5310000);
  const [heroPhase, setHeroPhase] = useState<1 | 2>(1); // 1: configuración, 2: captura de datos
  const [isSubmittingHero, setIsSubmittingHero] = useState(false);

  // Formulario de captura de datos
  const form = useForm<LeadFormData>({
    resolver: zodResolver(LeadFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      howDidYouHearAboutUs: "",
      termsAccepted: false,
    },
  });

  

  // Inicializar el proyecto y monto cuando estén disponibles
  useEffect(() => {
    if (availableProjects.length > 0 && !selectedHeroProjectId) {
      const firstProject = availableProjects[0];
      setSelectedHeroProjectId(firstProject.id);
      const { minInvestment } = calculateSliderRange(firstProject);
      setHeroInvestmentAmount(minInvestment);
    }
  }, [availableProjects, selectedHeroProjectId]);

  // Obtener el proyecto actualmente seleccionado
  const currentHeroProject = availableProjects.find(p => p.id === selectedHeroProjectId) || availableProjects[0];

  // Rotación automática de imágenes móviles cada 5 segundos
  useEffect(() => {
    if (mobileHeroImages.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentProjectIndex(
        (prev) => (prev + 1) % mobileHeroImages.length,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [mobileHeroImages.length]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Helper para calcular rangos del slider
  const calculateSliderRange = (project: { unitPrice: number; minInvestmentUnits: number }) => {
    const minInvestment = project.unitPrice * project.minInvestmentUnits;
    const calculatedMax = project.unitPrice * 100;
    
    // Asegurar que el máximo sea siempre mayor que el mínimo
    let maxInvestment;
    if (calculatedMax <= minInvestment) {
      // Si el máximo calculado es menor o igual al mínimo, usar un múltiplo del mínimo
      maxInvestment = minInvestment * 10; // 10 veces el mínimo para dar rango suficiente
    } else {
      maxInvestment = calculatedMax;
    }
    
    const step = project.unitPrice;
    
    
    return { minInvestment, maxInvestment, step };
  };

  // Actualizar el monto mínimo cuando cambia el proyecto en el hero
  const handleHeroProjectChange = (projectId: string) => {
    const project = availableProjects.find(p => p.id === projectId);
    if (project) {
      setSelectedHeroProjectId(projectId);
      const { minInvestment } = calculateSliderRange(project);
      
      // Siempre iniciar en el valor mínimo del proyecto
      setHeroInvestmentAmount(minInvestment);
    }
  };

  // Handler para el cambio del slider
  const handleSliderChange = (value: number[]) => {
    if (currentHeroProject) {
      const newValue = value[0];
      const { minInvestment, maxInvestment } = calculateSliderRange(currentHeroProject);
      
      // Asegurar que el valor esté dentro del rango válido
      if (newValue >= minInvestment && newValue <= maxInvestment) {
        setHeroInvestmentAmount(newValue);
      }
    }
  };

  const handleViewFullProjection = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!currentHeroProject) return;
    // Cambiar a fase 2 para capturar datos
    setHeroPhase(2);
  };

  // Handler para enviar el formulario y calcular simulación
  const handleHeroFormSubmit = async (formData: LeadFormData) => {
    if (!currentHeroProject) return;
    
    setIsSubmittingHero(true);
    
    try {
      // 1. Guardar datos en el store global del simulador
      setSelectedProject(currentHeroProject);
      setInvestmentAmount(heroInvestmentAmount);
      setInstallments(1);

      // 2. Crear la simulación
      const installmentsToSend = 0; // Pago único por defecto
      const simulationResponse = await createSimulationAction({
        projectId: currentHeroProject.id,
        investmentValue: heroInvestmentAmount,
        installmentsNumber: installmentsToSend,
      });

      if (simulationResponse.success && simulationResponse.data) {
        // Guardar simulación prefetched para que el simulador principal la muestre con los mismos valores
        setPrefetchedSimulationData(simulationResponse.data);

        // 3. Procesar datos del usuario (igual que onFirstSimulationWithData)
        const fullName = `${formData.firstName} ${formData.lastName}`.trim();
        const isAuthenticated = !!user;
        const phoneData = parsePhoneData(formData.phone);

        // 3.1. Guardar lead en CRM
        const leadData = {
          email: formData.email,
          firstName: formData.firstName,
          project: currentHeroProject.name,
          ...(phoneData.phoneNumber && { phone: phoneData.phoneNumber }),
          ...(formData.howDidYouHearAboutUs && { leadOrigin: formData.howDidYouHearAboutUs }),
          ...(utmSource && { utmSource }),
          ...(utmMedium && { utmMedium }),
          ...(utmCampaign && { utmCampaign }),
          ...(utmTerm && { utmTerm }),
          ...(utmContent && { utmContent }),
          origin: 'Simulador Hero',
          status: isAuthenticated ? 'Interesado' : 'Interesado',
        };

        console.log('Guardando lead desde hero:', leadData);
        const leadResponse = await upsertLeadAction(leadData);
        
        if (leadResponse.success) {
          console.log('✅ Lead guardado exitosamente desde hero');
        } else {
          console.error('❌ Error al guardar lead:', leadResponse.message);
        }

        // 3.2. Enviar datos a Quiiven
        const quiivenData = {
          name: fullName,
          email: formData.email,
          investmentValue: heroInvestmentAmount.toString(),
          shares: simulationResponse.data.unitsAmount,
          numberInstallments: installmentsToSend,
          phone: phoneData.phoneNumber || '',
          termsAccepted: formData.termsAccepted,
          leadOrigin: formData.howDidYouHearAboutUs || 'Simulador Hero',
          utmSource,
          utmMedium,
          utmCampaign,
          utmTerm,
          utmContent,
        };

        console.log('Enviando datos a Quiiven desde hero:', quiivenData);
        const quiivenResponse = await createQuiivenContactAction(quiivenData);
        
        if (quiivenResponse.success) {
          console.log('✅ Contacto creado exitosamente en Quiiven');
        } else {
          console.error('❌ Error al crear contacto en Quiiven:', quiivenResponse.error);
        }

        // 3.3. Enviar mensaje de WhatsApp (solo si hay teléfono)
        if (phoneData.phoneNumber) {
          const whatsappData = {
            name: fullName,
            projectId: currentHeroProject.id,
            email: formData.email,
            numberToSend: phoneData.phoneNumber,
          };

          console.log('📱 Enviando mensaje de WhatsApp desde hero:', whatsappData);
          const whatsappResponse = await sendFirstMessageAction(whatsappData);
          
          if (whatsappResponse.success) {
            if (whatsappResponse.skipped) {
              console.log('⏱️ Mensaje de WhatsApp omitido:', whatsappResponse.message);
            } else {
              console.log('✅ Mensaje de WhatsApp enviado exitosamente');
            }
          } else {
            console.error('❌ Error al enviar mensaje de WhatsApp:', whatsappResponse.error);
          }
        }

        // 4. Hacer scroll al simulador completo
        const isDesktop = typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches;
        const targetId = isDesktop ? 'simulador-desktop' : 'simulador-mobile';

        const tryScroll = (attemptsLeft: number) => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          } else if (attemptsLeft > 0) {
            setTimeout(() => tryScroll(attemptsLeft - 1), 200);
          }
        };

        tryScroll(5);
      }
    } catch (error) {
      console.error("Error al procesar simulación desde hero:", error);
    } finally {
      setIsSubmittingHero(false);
    }
  };

  const handleWhatIsClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (onWhatIsClick) {
      onWhatIsClick();
      return;
    }

    if (typeof window === 'undefined') return;
    const target = document.getElementById("que-es-lokl");
    if (!target) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    if (prefersReducedMotion) {
      target.scrollIntoView({ behavior: 'auto', block: 'start' });
      return;
    }

    if (!isMobile) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    // Mobile: scroll suave con offset y easing
    const headerOffset = 72; // pequeño offset para evitar solaparse con header
    const startY = window.pageYOffset;
    const targetY = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    const distance = targetY - startY;
    const duration = 600; // ms
    const startTime = performance.now();

    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);
      window.scrollTo(0, startY + distance * eased);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  return (
    <section
      id="hero"
      className="relative text-white"
    >
      {/* Contenedor del Hero con imagen de fondo */}
      <div className="relative min-h-[100dvh] md:min-h-screen overflow-hidden">
        {/* Video de fondo - Solo desktop */}
        <div className="absolute inset-0 hidden md:block overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            poster="https://lokl-assets.s3.us-east-1.amazonaws.com/home/video_heroe_poster.jpg"
            aria-label="Video de fondo mostrando proyectos inmobiliarios LOKL"
          >
            <source 
              src="https://lokl-assets.s3.us-east-1.amazonaws.com/home/Hero_Video.mp4" 
              type="video/mp4"
            />
            <track
              kind="captions"
              srcLang="es"
              label="Español"
            />
            Tu navegador no soporta videos HTML5.
          </video>
        </div> 

        {/* Fondo con imágenes - Solo móvil - ocupa toda la altura de viewport */}
        <div className="absolute inset-0 md:hidden h-screen">
          {mobileHeroImages.length > 0 ? (
            mobileHeroImages.map((imageUrl, index) => (
              <div
                key={index}
                aria-hidden="true"
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentProjectIndex
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              >
                <picture>
                  <LazyImage
                    src={imageUrl}
                    alt={`Hero móvil ${index + 1} - LOKL`}
                    className="absolute inset-0 h-full w-full object-cover"
                    priority={index === 0}
                    width={1920}
                    height={1080}
                  />
                </picture>
              </div>
            ))
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#5352F6] to-[#3a39c4]" />
          )}
        </div>

        {/* Overlay para contraste del texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 via-50% to-transparent"></div>

        {/* Overlay con opacidad en todo el hero - Solo móvil */}
        <div className="absolute inset-0 md:hidden bg-black/25 pointer-events-none z-[5]"></div>

        {/* Contenido en 2 columnas - Desktop, 1 columna Mobile - Centrado verticalmente */}
        <div className="relative z-10 mx-auto flex items-start md:items-center max-w-7xl px-6 pt-28 pb-24 landscape:pt-32 landscape:pb-28 md:pt-0 md:pb-0 md:h-full">
          <div className="grid grid-cols-1 w-full gap-8 md:grid-cols-12">
          {/* Columna IZQUIERDA: texto */}
          <div className="md:col-span-7">
            <h1 className="leading-[1.1] md:leading-[0.85] font-semibold md:text-6xl text-4xl text-left text-[rgb(255,248,248)] max-w-xl">
              Inversiones inmobiliarias rentables
            </h1>

            <p className="mt-6 md:mt-4 max-w-xl text-lg text-white/90"> 
              Accede a oportunidades inmobiliarias reales y vive la experiencia de invertir con confianza.
            </p>

            {/* "Invierte" / micro-beneficios */}
            <div className="mt-5 hidden md:flex flex-wrap gap-2 w-fit">
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-center whitespace-nowrap">
                <span className="text-[rgba(255,255,255,1)] font-bold">
                  Diversificación
                </span>
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-center whitespace-nowrap">
                <span className="text-[rgba(255,255,255,1)] font-bold">
                  Hospitality
                </span>
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-center whitespace-nowrap">
                <span className="text-[rgba(255,255,255,1)] font-bold">
                  Sostenibilidad
                </span>
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-center whitespace-nowrap">
                <span className="text-[rgba(255,255,255,1)] font-bold">
                  Crowdfunding
                </span>
              </span>
            </div>

            {/* Proyecto destacado rotativo - fuera de tarjeta */}
            {availableProjects.length > 0 && (
              <div className="mt-10 md:mt-6">
                <div
                  key={currentProjectIndex}
                  className="animate-in fade-in duration-500"
                >
                  <p className="text-lg text-white/90 mb-2">
                    <span className="text-white/90">
                      Invierte en{" "}
                    </span>
                    <span className="text-[rgba(255,255,255,1)] font-semibold font-bold">
                      {availableProjects[currentProjectIndex]?.name}
                    </span>
                    <span className="text-white/90"> desde</span>
                  </p>
                  <p className="text-3xl font-semibold text-white">
                    {formatCurrency(
                      availableProjects[currentProjectIndex]?.unitPrice * 
                      availableProjects[currentProjectIndex]?.minInvestmentUnits
                    )}
                  </p>
                </div>
              </div>
            )}

            {/* CTAs */}
            {/* Mobile: botón de ancho completo + enlace de texto debajo */}
            <div className="mt-10 flex flex-col gap-4 md:hidden">
              <a
                href="#featured-projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("featured-projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full rounded-xl bg-[#5352F6] px-5 py-3 font-medium text-white text-center hover:bg-[#5352F6]/90 focus:outline-none focus:ring-2 focus:ring-[#5352F6]/30"
              >
                Ver proyectos
              </a>
              <a
                href="#que-es-lokl"
                onClick={handleWhatIsClick}
                className="mt-2 text-center text-white/90 hover:text-white underline-offset-2 hover:underline"
              >
                ¿Qué es LOKL?
              </a>
            </div>

            {/* Desktop/Tablet: botones originales en fila */}
            <div className="mt-6 hidden md:flex flex-wrap gap-3">
              <a
                href="#featured-projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("featured-projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-xl bg-[#5352F6] px-5 py-3 font-medium text-white hover:bg-[#5352F6]/90 focus:outline-none focus:ring-2 focus:ring-[#5352F6]/30"
              >
                Ver proyectos
              </a>
              <a
                href="#que-es-lokl"
                onClick={handleWhatIsClick}
                className="rounded-xl border border-white/70 px-5 py-3 font-medium text-white hover:bg-white/10"
              >
                <span className="text-white">¿Qué es </span>
                <span className="text-[rgba(255,255,255,1)] font-bold">
                  LOKL
                </span>
                <span className="text-white">?</span>
              </a>
            </div>
          </div>

          {/* Columna DERECHA: preview del simulador con glassmorphism - Solo desktop */}
          <div className="hidden md:block md:col-span-5">
            <div className="rounded-2xl p-6 shadow-2xl ring-1 ring-white/20 bg-white/15 backdrop-blur-xl backdrop-saturate-150 max-w-sm mx-auto">
              {/* Título del teaser */}
              <h2 className="text-xl font-semibold text-white mb-1">
                Proyección rápida
              </h2>
              <p className="text-sm text-white/70 mb-6">
                Simula tu inversión en segundos
              </p>

              {/* Simulador funcional del hero */}
              {availableProjects.length > 0 && selectedHeroProjectId && currentHeroProject ? (
                heroPhase === 1 ? (
                  <div className="space-y-5 max-w-xs mx-auto">
                    {/* Selector de Proyecto */}
                    <div className="w-full">
                      <label className="text-sm text-white/90 block mb-2">
                        Proyecto
                      </label>
                      <Select
                        value={selectedHeroProjectId}
                        onValueChange={handleHeroProjectChange}
                      >
                        <SelectTrigger className="bg-white/20 border-white/30 text-white hover:bg-white/25 transition-colors w-full">
                          <SelectValue placeholder="Selecciona un proyecto" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableProjects.map((project) => (
                            <SelectItem key={project.id} value={project.id}>
                              {project.name} - {project.city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Barra deslizable para monto de inversión en units */}
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm text-white/90">
                          Units a invertir
                        </label>
                        <div className="text-right">
                          <span className="text-sm font-semibold text-white block">
                            {Math.round(heroInvestmentAmount / currentHeroProject.unitPrice)} units
                          </span>
                          <span className="text-xs text-white/70">
                            {formatCurrency(heroInvestmentAmount)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="w-full py-2">
                        {(() => {
                          const minUnits = currentHeroProject.minInvestmentUnits;
                          const maxUnits = 500;
                          const currentUnits = Math.round(heroInvestmentAmount / currentHeroProject.unitPrice);
                          
                          return (
                            <Slider
                              value={[currentUnits]}
                              onValueChange={([units]) => {
                                setHeroInvestmentAmount(units * currentHeroProject.unitPrice);
                              }}
                              min={minUnits}
                              max={maxUnits}
                              step={1}
                              className="w-full touch-pan-y"
                            />
                          );
                        })()}
                      </div>
                      
                      <div className="flex justify-between mt-1 text-xs text-white/60">
                        <span>{currentHeroProject.minInvestmentUnits} units</span>
                        <span>500 units</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={handleViewFullProjection}
                      className="block w-full rounded-xl bg-[#5352F6] px-4 py-3 text-center font-medium text-white hover:bg-[#5352F6]/90 focus:outline-none focus:ring-2 focus:ring-[#5352F6]/30 transition-all shadow-lg hover:shadow-xl"
                    >
                      Simular inversión
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 max-w-xs mx-auto">
                    {/* Botón volver */}
                    <button
                      onClick={() => setHeroPhase(1)}
                      className="flex items-center gap-2 text-white/90 hover:text-white text-sm"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Volver
                    </button>

                    {/* Formulario de captura de datos */}
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handleHeroFormSubmit)} className="space-y-3">
                        {/* Nombre y Apellido */}
                        <div className="grid grid-cols-2 gap-2">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs text-white/90">Nombre</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Juan"
                                    {...field}
                                    disabled={isSubmittingHero}
                                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50 h-9 text-sm"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-200 text-xs" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs text-white/90">Apellido</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Pérez"
                                    {...field}
                                    disabled={isSubmittingHero}
                                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50 h-9 text-sm"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-200 text-xs" />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Email */}
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs text-white/90">Correo</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="juan@ejemplo.com"
                                  {...field}
                                  disabled={isSubmittingHero}
                                  className="bg-white/20 border-white/30 text-white placeholder:text-white/50 h-9 text-sm"
                                />
                              </FormControl>
                              <FormMessage className="text-red-200 text-xs" />
                            </FormItem>
                          )}
                        />

                        {/* Teléfono */}
                        <Controller
                          control={form.control}
                          name="phone"
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormLabel className="text-xs text-white/90">Teléfono</FormLabel>
                              <FormControl>
                                <PhoneInput
                                  {...field}
                                  defaultCountry="CO"
                                  international
                                  countryCallingCodeEditable={false}
                                  disabled={isSubmittingHero}
                                  className="phone-input-custom flex h-9 w-full rounded-md border border-white/30 bg-white/20 px-3 py-2 text-sm text-white placeholder:text-white/50"
                                  placeholder="300 123 4567"
                                />
                              </FormControl>
                              {fieldState.error && (
                                <p className="text-xs font-medium text-red-200">
                                  {fieldState.error.message}
                                </p>
                              )}
                            </FormItem>
                          )}
                        />

                        {/* ¿Cómo nos conociste? */}
                        <FormField
                          control={form.control}
                          name="howDidYouHearAboutUs"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs text-white/90">¿Por dónde nos conociste?</FormLabel>
                              <FormControl>
                                <NestedSelect
                                  options={howDidYouHearAboutUsOptions}
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  placeholder="Selecciona"
                                  disabled={isSubmittingHero}
                                  className="w-full text-sm h-9"
                                />
                              </FormControl>
                              <FormMessage className="text-red-200 text-xs" />
                            </FormItem>
                          )}
                        />

                        {/* Términos */}
                        <FormField
                          control={form.control}
                          name="termsAccepted"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  disabled={isSubmittingHero}
                                  className="border-white data-[state=checked]:bg-white data-[state=checked]:text-[#5352F6] mt-1"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-xs text-white/90">
                                  Acepto los{" "}
                                  <a
                                    href="/terminos-y-condiciones"
                                    target="_blank"
                                    className="underline"
                                  >
                                    términos
                                  </a>
                                </FormLabel>
                                <FormMessage className="text-red-200 text-xs" />
                              </div>
                            </FormItem>
                          )}
                        />

                        {/* Botón Submit */}
                        <Button
                          type="submit"
                          disabled={isSubmittingHero}
                          className="w-full bg-[#5352F6] hover:bg-[#5352F6]/90 text-white font-semibold h-10 text-sm"
                        >
                          {isSubmittingHero ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                              Procesando...
                            </>
                          ) : (
                            "Ver mi proyección"
                          )}
                        </Button>
                      </form>
                    </Form>
                  </div>
                )
              ) : (
                <div className="text-center text-white/70 py-8">
                  Cargando simulador...
                </div>
              )}
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Schema JSON-LD para SEO del video */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": "LOKL - Inversiones inmobiliarias con propósito",
            "description": "Descubre cómo invertir en bienes raíces y proyectos hoteleros con LOKL. Crowdfunding inmobiliario accesible desde $1.3M mensuales.",
            "thumbnailUrl": "https://lokl-assets.s3.us-east-1.amazonaws.com/home/hero-img-1.jpg",
            "uploadDate": "2025-10-28T00:00:00.000Z",
            "contentUrl": "https://lokl-assets.s3.us-east-1.amazonaws.com/home/video_heroe.mp4",
            "embedUrl": "https://lokl.life",
            "duration": "PT1M",
            "publisher": {
              "@type": "Organization",
              "name": "LOKL",
              "logo": {
                "@type": "ImageObject",
                "url": "https://lokl.life/images/lokl-logo.png"
              }
            },
            "inLanguage": "es",
            "keywords": "inversiones inmobiliarias, crowdfunding, bienes raíces, hotelería, LOKL"
          })
        }}
      />
    </section>
  );
}
