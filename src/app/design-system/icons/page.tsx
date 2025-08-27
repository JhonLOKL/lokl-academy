"use client";

import React from "react";
import { Navbar, Footer } from "@/components/design-system";
import {
  User, Users, Home, Building, CreditCard, Wallet, 
  DollarSign, PieChart, LineChart, BarChart, 
  Search, Mail, Calendar, Clock, Settings, Bell,
  Star, Heart, Share, Bookmark, Edit, Trash,
  Plus, Minus, X, ChevronRight, ArrowRight, Check,
  FileText, Globe, Lock, Unlock, Shield, Eye,
  EyeOff, Smartphone, Laptop, Monitor, Headphones,
  Camera, Video, Mic, Speaker, Volume2, VolumeX,
  Play, Pause, Square, SkipBack, SkipForward, Repeat,
  Shuffle, Download, Upload, ExternalLink, Link, Unlink,
  Map, MapPin, Navigation, Compass, Flag, Target,
  Zap, Cloud, CloudRain, Sun, Moon, Wind, Phone
} from "lucide-react";

export default function IconsPage() {
  // Agrupar iconos por categoría para mejor organización
  const iconCategories = [
    {
      name: "Usuarios y Perfiles",
      icons: [
        { icon: User, name: "User" },
        { icon: Users, name: "Users" },
        { icon: Mail, name: "Mail" },
        { icon: Phone, name: "Phone" },
        { icon: Shield, name: "Shield" },
        { icon: Lock, name: "Lock" },
        { icon: Unlock, name: "Unlock" },
        { icon: Eye, name: "Eye" },
        { icon: EyeOff, name: "EyeOff" },
      ]
    },
    {
      name: "Finanzas e Inversiones",
      icons: [
        { icon: Wallet, name: "Wallet" },
        { icon: CreditCard, name: "CreditCard" },
        { icon: DollarSign, name: "DollarSign" },
        { icon: PieChart, name: "PieChart" },
        { icon: LineChart, name: "LineChart" },
        { icon: BarChart, name: "BarChart" },
        { icon: Building, name: "Building" },
        { icon: Home, name: "Home" },
      ]
    },
    {
      name: "Navegación y Acciones",
      icons: [
        { icon: ArrowRight, name: "ArrowRight" },
        { icon: ChevronRight, name: "ChevronRight" },
        { icon: Search, name: "Search" },
        { icon: Plus, name: "Plus" },
        { icon: Minus, name: "Minus" },
        { icon: Check, name: "Check" },
        { icon: X, name: "X" },
        { icon: Edit, name: "Edit" },
        { icon: Trash, name: "Trash" },
        { icon: Settings, name: "Settings" },
        { icon: ExternalLink, name: "ExternalLink" },
        { icon: Link, name: "Link" },
        { icon: Unlink, name: "Unlink" },
      ]
    },
    {
      name: "Tiempo y Calendario",
      icons: [
        { icon: Calendar, name: "Calendar" },
        { icon: Clock, name: "Clock" },
        { icon: Bell, name: "Bell" },
      ]
    },
    {
      name: "Interacción y Feedback",
      icons: [
        { icon: Star, name: "Star" },
        { icon: Heart, name: "Heart" },
        { icon: Share, name: "Share" },
        { icon: Bookmark, name: "Bookmark" },
        { icon: Download, name: "Download" },
        { icon: Upload, name: "Upload" },
      ]
    },
    {
      name: "Dispositivos y Multimedia",
      icons: [
        { icon: Smartphone, name: "Smartphone" },
        { icon: Laptop, name: "Laptop" },
        { icon: Monitor, name: "Monitor" },
        { icon: Headphones, name: "Headphones" },
        { icon: Camera, name: "Camera" },
        { icon: Video, name: "Video" },
        { icon: Mic, name: "Mic" },
        { icon: Speaker, name: "Speaker" },
        { icon: Volume2, name: "Volume2" },
        { icon: VolumeX, name: "VolumeX" },
      ]
    },
    {
      name: "Controles Multimedia",
      icons: [
        { icon: Play, name: "Play" },
        { icon: Pause, name: "Pause" },
        { icon: Square, name: "Square" },
        { icon: SkipBack, name: "SkipBack" },
        { icon: SkipForward, name: "SkipForward" },
        { icon: Repeat, name: "Repeat" },
        { icon: Shuffle, name: "Shuffle" },
      ]
    },
    {
      name: "Mapas y Ubicación",
      icons: [
        { icon: Map, name: "Map" },
        { icon: MapPin, name: "MapPin" },
        { icon: Navigation, name: "Navigation" },
        { icon: Compass, name: "Compass" },
        { icon: Flag, name: "Flag" },
        { icon: Target, name: "Target" },
      ]
    },
    {
      name: "Clima y Naturaleza",
      icons: [
        { icon: Zap, name: "Zap" },
        { icon: Cloud, name: "Cloud" },
        { icon: CloudRain, name: "CloudRain" },
        { icon: Sun, name: "Sun" },
        { icon: Moon, name: "Moon" },
        { icon: Wind, name: "Wind" },
      ]
    },
    {
      name: "Documentos y Archivos",
      icons: [
        { icon: FileText, name: "FileText" },
        { icon: Globe, name: "Globe" },
      ]
    },
  ];

  // Función para renderizar un icono con su nombre
  const renderIcon = (IconComponent: React.ComponentType<any>, name: string) => (
    <div key={name} className="flex flex-col items-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F5F5]">
        <IconComponent size={32} className="text-[#5352F6]" />
      </div>
      <p className="text-sm font-medium">{name}</p>
    </div>
  );

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
          { label: "Iconos", href: "/design-system/icons", active: true },
          { label: "Tarjetas Visuales", href: "/design-system/visual-cards" },
          { label: "Tipografía", href: "/design-system/typography" },
        ]}
      />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight">Iconografía LOKL</h1>
          <p className="text-[#6D6C6C] max-w-3xl">
            Sistema de iconos lineales y minimalistas para una experiencia visual coherente y profesional, basado en la librería Lucide.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Estilos de Iconos</h2>
          <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center">
                <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#F5F5F5]">
                  <Building size={48} className="text-[#5352F6]" />
                </div>
                <p className="font-semibold">Color Primario</p>
                <p className="text-sm text-[#6D6C6C]">Púrpura LOKL (#5352F6)</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#F5F5F5]">
                  <Building size={48} className="text-[#0F0F0F]" />
                </div>
                <p className="font-semibold">Color Negro</p>
                <p className="text-sm text-[#6D6C6C]">Negro (#0F0F0F)</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#F5F5F5]">
                  <Building size={48} className="text-[#6D6C6C]" />
                </div>
                <p className="font-semibold">Color Gris</p>
                <p className="text-sm text-[#6D6C6C]">Gris (#6D6C6C)</p>
              </div>
            </div>
            
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center">
                <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#0F0F0F]">
                  <Building size={48} className="text-white" />
                </div>
                <p className="font-semibold">Fondo Oscuro</p>
                <p className="text-sm text-[#6D6C6C]">Icono blanco sobre negro</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#5352F6]">
                  <Building size={48} className="text-white" />
                </div>
                <p className="font-semibold">Fondo Primario</p>
                <p className="text-sm text-[#6D6C6C]">Icono blanco sobre púrpura</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white border border-[#E5E5E5]">
                  <Building size={48} className="text-[#5352F6]" />
                </div>
                <p className="font-semibold">Fondo Blanco</p>
                <p className="text-sm text-[#6D6C6C]">Icono púrpura sobre blanco</p>
              </div>
            </div>
            
            <p className="mt-8 text-sm text-[#6D6C6C]">
              Los iconos de LOKL siguen un estilo lineal y minimalista, con un grosor consistente y esquinas redondeadas para una apariencia moderna y amigable.
            </p>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Tamaños de Iconos</h2>
          <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
            <div className="flex flex-wrap items-center justify-around gap-8">
              <div className="flex flex-col items-center">
                <Building size={16} className="mb-2 text-[#5352F6]" />
                <p className="text-sm font-semibold">Extra Pequeño</p>
                <p className="text-xs text-[#6D6C6C]">16px</p>
              </div>
              
              <div className="flex flex-col items-center">
                <Building size={20} className="mb-2 text-[#5352F6]" />
                <p className="text-sm font-semibold">Pequeño</p>
                <p className="text-xs text-[#6D6C6C]">20px</p>
              </div>
              
              <div className="flex flex-col items-center">
                <Building size={24} className="mb-2 text-[#5352F6]" />
                <p className="text-sm font-semibold">Mediano</p>
                <p className="text-xs text-[#6D6C6C]">24px</p>
              </div>
              
              <div className="flex flex-col items-center">
                <Building size={32} className="mb-2 text-[#5352F6]" />
                <p className="text-sm font-semibold">Grande</p>
                <p className="text-xs text-[#6D6C6C]">32px</p>
              </div>
              
              <div className="flex flex-col items-center">
                <Building size={48} className="mb-2 text-[#5352F6]" />
                <p className="text-sm font-semibold">Extra Grande</p>
                <p className="text-xs text-[#6D6C6C]">48px</p>
              </div>
            </div>
            <p className="mt-8 text-sm text-[#6D6C6C]">
              Los iconos están disponibles en diferentes tamaños para adaptarse a distintos contextos de interfaz, desde elementos pequeños como botones hasta áreas destacadas.
            </p>
          </div>
        </section>

        {/* Renderizar categorías de iconos */}
        {iconCategories.map((category) => (
          <section key={category.name} className="mb-16">
            <h2 className="mb-6 text-2xl font-bold">{category.name}</h2>
            <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
                {category.icons.map((iconData) => (
                  renderIcon(iconData.icon, iconData.name)
                ))}
              </div>
            </div>
          </section>
        ))}
        
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Uso de Iconos</h2>
          <div className="rounded-lg border border-[#E5E5E5] bg-white p-8">
            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-lg font-semibold">Iconos en Botones</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5352F6] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#5352F6]/90">
                    <User size={18} />
                    <span>Perfil</span>
                  </button>
                  
                  <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-black/90">
                    <span>Siguiente</span>
                    <ArrowRight size={18} />
                  </button>
                  
                  <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#E5E5E5] bg-white px-4 py-2 text-sm font-semibold text-[#0F0F0F] transition-colors hover:bg-[#F5F5F5]">
                    <Download size={18} />
                    <span>Descargar</span>
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="mb-4 text-lg font-semibold">Iconos en Campos de Formulario</h3>
                <div className="max-w-md">
                  <div className="mb-4 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D6C6C]">
                      <Search size={18} />
                    </span>
                    <input
                      type="text"
                      placeholder="Buscar..."
                      className="w-full rounded-lg border border-[#E5E5E5] py-2 pl-10 pr-3 focus:border-[#5352F6] focus:outline-none"
                    />
                  </div>
                  
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D6C6C]">
                      <Mail size={18} />
                    </span>
                    <input
                      type="email"
                      placeholder="Correo electrónico"
                      className="w-full rounded-lg border border-[#E5E5E5] py-2 pl-10 pr-3 focus:border-[#5352F6] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="mb-4 text-lg font-semibold">Iconos en Tarjetas</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="flex flex-col items-center rounded-lg border border-[#E5E5E5] bg-white p-6 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#5352F6]/10">
                      <Home size={32} className="text-[#5352F6]" />
                    </div>
                    <h4 className="mb-2 text-lg font-semibold">Inversiones Inmobiliarias</h4>
                    <p className="text-sm text-[#6D6C6C]">Accede a proyectos exclusivos con alta rentabilidad</p>
                  </div>
                  
                  <div className="flex flex-col items-center rounded-lg border border-[#E5E5E5] bg-white p-6 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black/10">
                      <PieChart size={32} className="text-black" />
                    </div>
                    <h4 className="mb-2 text-lg font-semibold">Diversificación</h4>
                    <p className="text-sm text-[#6D6C6C]">Optimiza tu portafolio con diferentes tipos de inversión</p>
                  </div>
                  
                  <div className="flex flex-col items-center rounded-lg border border-[#E5E5E5] bg-white p-6 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#6D6C6C]/10">
                      <Shield size={32} className="text-[#6D6C6C]" />
                    </div>
                    <h4 className="mb-2 text-lg font-semibold">Seguridad</h4>
                    <p className="text-sm text-[#6D6C6C]">Inversiones respaldadas y verificadas por expertos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer variant="simple" />
    </div>
  );
}
