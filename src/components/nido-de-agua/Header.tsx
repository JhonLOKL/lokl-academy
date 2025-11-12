"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, Play, Eye, Calculator, Info, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Datos hardcodeados
const PROJECT_DATA = {
  tag: "Construcción",
  name: "Nido de Agua",
  location: "Vda. Palestina, Guatapé",
  rating: 5.0,
  estimatedReturn: "12 - 15% E.A",
  valuePerUnit: "$ 129.250",
  totalInvestors: 1032,
  minInvestment: "$2.585.000",
  minInvestmentPeriod: "mensuales + fee",
  validUntil: "30 de noviembre de 2025",
  totalInvestment: "$ 13.541.133.728 COP",
  availableSlots: {
    current: "23",
    total: "30"
  },
  viewers: 2,
  videoUrl: "https://www.youtube.com/embed/VogBkJMkJhY?autoplay=1&start=2",
  description: "Es el primer hotel de lujo ubicado en Guatapé. Un bosque que te atiende de lunes a domingo, donde la rutina se convierte en un buen café en las mañanas.",
  features: {
    area: "40.000m²",
    cabins: "50 Cabañas",
    trees: "1.200 Arboles"
  },
  videoQuote: "Creemos que la vida es una sola, para solo vivirla los fines de semana.",
  stages: [
    {
      month: "Octubre",
      price: "$129.000 x Unit",
      validUntil: "Hasta el 2025-11-01"
    },
    {
      month: "Noviembre",
      price: "$129.250 x Unit",
      validUntil: "Hasta el 2025-12-01"
    }
  ],
  images: {
    hero: "https://lokl-assets.s3.us-east-1.amazonaws.com/nido-de-agua/nido-de-agua.jpg",
    preview: "https://lokl-assets.s3.us-east-1.amazonaws.com/nido-de-agua/TERRAZA.jpg",
    gallery: [
      "https://lokl-assets.s3.us-east-1.amazonaws.com/nido-de-agua/RENDER+NIDO+1D+TARDE.jpg",
      "https://lokl-assets.s3.us-east-1.amazonaws.com/nido-de-agua/RENDER+NIDO+1E+NOCHE.jpg",
      "https://lokl-assets.s3.us-east-1.amazonaws.com/nido-de-agua/CENITAL_.jpg",
      "https://lokl-assets.s3.us-east-1.amazonaws.com/nido-de-agua/BA%C3%91O.jpg",
      "https://lokl-assets.s3.us-east-1.amazonaws.com/nido-de-agua/RENDER+NIDO+1F+TARDE.jpg",
      "https://lokl-assets.s3.us-east-1.amazonaws.com/nido-de-agua/LOBBY+NIDO+DE+AGUA+1.jpeg",
      "https://lokl-assets.s3.us-east-1.amazonaws.com/nido-de-agua/LOBBY+NIDO+DE+AGUA+3.jpeg",
    ],
  },
};

const numberFormatter = new Intl.NumberFormat("es-CO", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const formatNumber = (value: number) => numberFormatter.format(value);

export default function Header() {
  const [videoActive, setVideoActive] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const remainingGallery =
    Math.max(PROJECT_DATA.images.gallery.length - 1, 0);

  const handleGoToSimulator = () => {
    const simulator = document.getElementById('simulator');
    if (simulator) {
      simulator.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleGoToBuy = () => {
    // Redirigir a checkout o registro
    window.location.href = '/register';
  };

  const openGallery = (index = 0) => {
    setActiveImage(index);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
  };

  const handlePrev = () => {
    setActiveImage((prev) =>
      (prev - 1 + PROJECT_DATA.images.gallery.length) %
      PROJECT_DATA.images.gallery.length
    );
  };

  const handleNext = () => {
    setActiveImage((prev) =>
      (prev + 1) % PROJECT_DATA.images.gallery.length
    );
  };

  return (
    <header className="w-full flex flex-col items-start space-y-8">
      {/* Tag de estado */}
      <div className="flex bg-[#00F0B5] text-[#3533FF] font-medium px-3 py-2 rounded">
        <div className="ml-2">{PROJECT_DATA.tag}</div>
      </div>

      {/* Título y métricas (Desktop) */}
      <div className="lg:w-3/5 flex flex-col lg:flex-row justify-between items-center space-x-10">
        <div>
          <h2 className="font-black text-3xl md:text-4xl mb-2">{PROJECT_DATA.name}</h2>
          <div className="flex items-center font-medium gap-2 text-sm md:text-base">
            <p>
              <span className="font-extrabold">{PROJECT_DATA.location}</span>
            </p>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <p>{PROJECT_DATA.rating}</p>
            </div>
          </div>
        </div>

        {/* Métricas Desktop */}
        <div className="hidden lg:flex justify-between items-end gap-8">
          <div className="text-center relative">
            <div className="flex items-center gap-1 justify-center">
              <p className="text-2xl font-extrabold">{PROJECT_DATA.estimatedReturn}</p>
              <button
                onClick={() => setShowDisclaimer(!showDisclaimer)}
                className="cursor-pointer"
              >
                <Info className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <p className="text-sm">Retorno Estimado</p>
          </div>

          <div className="text-center">
            <p className="font-black text-xl">{PROJECT_DATA.valuePerUnit}</p>
            <p className="text-sm">Valor $ por Unit</p>
          </div>

          <div className="text-center">
            <p className="font-black text-xl">{formatNumber(PROJECT_DATA.totalInvestors)}</p>
            <p className="text-sm">Inversionistas</p>
          </div>
        </div>
      </div>

      {/* Contenido principal: Video/Imágenes y Descripción */}
      <div className="flex w-full flex-col lg:flex-row gap-8">
        {/* Sección de imágenes/video (Desktop) */}
        <div className="hidden lg:block lg:w-3/5">
          <div className="mb-3 relative aspect-video rounded-lg overflow-hidden">
            {videoActive ? (
              <iframe
                width="100%"
                height="100%"
                src={PROJECT_DATA.videoUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="rounded-lg"
              ></iframe>
            ) : (
              <>
                <Image
                  src={PROJECT_DATA.images.hero}
                  alt={`Imagen principal del proyecto ${PROJECT_DATA.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                  priority
                />
                <div
                  className="absolute top-0 left-0 w-full h-full flex flex-col justify-between text-white p-8 font-extrabold cursor-pointer z-10 bg-black/20"
                  onClick={() => setVideoActive(true)}
                >
                  <div className="text-xl">
                    {PROJECT_DATA.videoQuote}
                  </div>

                  <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                    <div className="bg-white/20 rounded-full p-4 hover:bg-white/30 transition">
                      <Play className="w-12 h-12" fill="white" />
                    </div>
                  </div>

                  <div className="flex items-center space-x-10">
                    <div className="text-lg">{PROJECT_DATA.features.area}</div>
                    <div className="text-lg">{PROJECT_DATA.features.cabins}</div>
                    <div className="text-lg">{PROJECT_DATA.features.trees}</div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex justify-between gap-2 mb-3">
            <button
              type="button"
              onClick={() => openGallery(0)}
              className="w-[68%] h-32 relative rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5452F6]"
            >
              <Image
                src={PROJECT_DATA.images.preview}
                alt={`Vista previa del proyecto ${PROJECT_DATA.name}`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </button>
            <button
              type="button"
              onClick={() => openGallery(1)}
              className="w-[32%] relative cursor-pointer rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5452F6]"
            >
              {PROJECT_DATA.images.gallery.length > 0 && (
                <Image
                  src={PROJECT_DATA.images.gallery[0]}
                  alt={`Galería del proyecto ${PROJECT_DATA.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 20vw"
                  className="object-cover"
                />
              )}
              <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white z-10">
                {remainingGallery > 0 && (
                  <div className="text-4xl font-extrabold">+{remainingGallery}</div>
                )}
                <div className="font-light underline text-sm">Ver más fotos</div>
              </div>
            </button>
          </div>

          <div className="my-3">
            <p className="text-xs text-gray-500">
              *Las imágenes son ilustrativas y no tienen valor contractual. Pueden haber cambios en dimensiones, materiales y colores. Los elementos decorativos no están incluidos.
            </p>
          </div>
        </div>

        {/* Descripción y tabs (Desktop) */}
        <Tabs defaultValue="investment" className="hidden lg:block lg:w-2/5 space-y-7">
          <div>
            <h2 className="font-black text-xl mb-3">¿Qué es Nido de agua?</h2>
            <p className="text-[#5B5B5B]">{PROJECT_DATA.description}</p>
          </div>

          <div>
            <h2 className="font-black text-xl mb-3">¿A partir de qué monto puedo invertir?</h2>
            <div className="flex justify-between items-start relative">
              <div>
                <div className="font-black text-4xl">
                  {PROJECT_DATA.minInvestment} <span className="text-lg">{PROJECT_DATA.minInvestmentPeriod}</span>
                </div>
                <div className="text-[#5452F6] font-light underline text-sm mt-1">
                  Válido hasta el {PROJECT_DATA.validUntil}
                </div>
              </div>
              <button
                onClick={handleGoToSimulator}
                className="w-16 h-16 flex justify-center items-center bg-green-500 rounded-full cursor-pointer hover:bg-green-600 transition"
              >
                <Calculator className="w-8 h-8 text-white" />
              </button>
            </div>
          </div>

          <TabsList className="flex space-x-3 bg-transparent p-0">
            <TabsTrigger 
              value="investment" 
              className="rounded-md px-4 py-2 font-medium text-sm transition-all data-[state=active]:bg-[#DDE4FF] data-[state=active]:text-gray-800 data-[state=inactive]:bg-[#F0F0F0] data-[state=inactive]:text-gray-700"
            >
              Cupo de inversión
            </TabsTrigger>
            <TabsTrigger 
              value="stages" 
              className="rounded-md px-4 py-2 font-medium text-sm transition-all data-[state=active]:bg-[#DDE4FF] data-[state=active]:text-gray-800 data-[state=inactive]:bg-[#F0F0F0] data-[state=inactive]:text-gray-700"
            >
              Etapas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="investment" className="space-y-4">
            <div className="font-extrabold text-lg">
              {PROJECT_DATA.totalInvestment}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-black text-6xl text-gray-800">
                {PROJECT_DATA.availableSlots.current}
              </span>
              <span className="font-black text-4xl text-gray-400">
                /{PROJECT_DATA.availableSlots.total}
              </span>
              <p className="text-sm text-gray-600 ml-auto flex-shrink-0 max-w-[60%]">
                Cupos disponibles antes de que suba el precio por unit. ¡No te quedes por fuera!
              </p>
            </div>
          </TabsContent>

          <TabsContent value="stages" className="flex space-x-4">
            {PROJECT_DATA.stages.map((stage, index) => (
              <div key={index} className="bg-[#F6F6F6] py-3 px-4 rounded">
                <div className="font-roboto text-sm font-extrabold mb-1">{stage.month}</div>
                <div className="font-roboto text-sm mb-1">{stage.price}</div>
                <div className="text-[#5452F6] text-xs">{stage.validUntil}</div>
              </div>
            ))}
          </TabsContent>

          <button
            onClick={handleGoToBuy}
            className="w-full bg-black text-white py-3 px-6 rounded-lg font-bold hover:bg-gray-800 transition"
          >
            Quiero ser socio
          </button>

          <div className="flex gap-2 items-center">
            <Eye className="w-5 h-5 text-[#5452F6]" />
            <p className="text-[#3533FF] font-medium text-lg">
              {PROJECT_DATA.viewers} personas viendo este proyecto
            </p>
          </div>
        </Tabs>
      </div>

      {/* Sección de imágenes/video (Mobile) */}
      <div className="lg:hidden w-full space-y-4">
        <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
          {videoActive ? (
            <iframe
              width="100%"
              height="100%"
              src={PROJECT_DATA.videoUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="rounded-lg"
            ></iframe>
          ) : (
            <>
              <Image
                src={PROJECT_DATA.images.hero}
                alt={`Imagen principal del proyecto ${PROJECT_DATA.name}`}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              <div
                className="absolute top-0 left-0 w-full h-full flex flex-col justify-between text-white p-6 font-extrabold cursor-pointer z-10 bg-black/25"
                onClick={() => setVideoActive(true)}
              >
                <div className="text-lg">
                  {PROJECT_DATA.videoQuote}
                </div>

                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                  <div className="bg-white/20 rounded-full p-3 hover:bg-white/30 transition">
                    <Play className="w-10 h-10" fill="white" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div>{PROJECT_DATA.features.area}</div>
                  <div>{PROJECT_DATA.features.cabins}</div>
                  <div>{PROJECT_DATA.features.trees}</div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-between gap-2">
          <button
            type="button"
            onClick={() => openGallery(0)}
            className="w-[70%] h-28 relative rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5452F6]"
          >
            <Image
              src={PROJECT_DATA.images.preview}
              alt={`Vista previa del proyecto ${PROJECT_DATA.name}`}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </button>

          <button
            type="button"
            onClick={() => openGallery(1)}
            className="w-[30%] h-28 relative cursor-pointer rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5452F6]"
          >
            {PROJECT_DATA.images.gallery.length > 0 && (
              <Image
                src={PROJECT_DATA.images.gallery[0]}
                alt={`Galería del proyecto ${PROJECT_DATA.name}`}
                fill
                sizes="100vw"
                className="object-cover"
              />
            )}
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white z-10 bg-black/30">
              {remainingGallery > 0 && (
                <div className="text-2xl font-extrabold">+{remainingGallery}</div>
              )}
              <div className="font-light underline text-xs">Ver más fotos</div>
            </div>
          </button>
        </div>

        <p className="text-[11px] text-gray-500 leading-relaxed">
          *Las imágenes son ilustrativas y no tienen valor contractual. Pueden haber cambios en dimensiones, materiales y colores. Los elementos decorativos no están incluidos.
        </p>
      </div>

      {/* Métricas Mobile */}
      <div className="flex w-full lg:hidden">
        <div className="w-2 h-auto bg-[#DADADA]"></div>
        <div className="w-full flex justify-around bg-[#9393930D] py-4">
          <div className="text-center">
            <div className="font-black text-xl">{PROJECT_DATA.estimatedReturn}</div>
            <div className="text-sm">Retorno Estimado</div>
          </div>
          <div className="text-center">
            <div className="font-black text-xl">{PROJECT_DATA.valuePerUnit}</div>
            <div className="text-sm">Valor $ por unit</div>
          </div>
          <div className="text-center">
            <div className="font-black text-xl">{formatNumber(PROJECT_DATA.totalInvestors)}</div>
            <div className="text-sm">Total de socios</div>
          </div>
        </div>
      </div>

      {/* Tabs Mobile */}
      <Tabs defaultValue="investment" className="lg:hidden w-full space-y-7">
        <div>
          <h2 className="font-black text-xl mb-3">¿A partir de qué monto puedo invertir?</h2>
          <div className="flex justify-between items-start relative">
            <div>
              <div className="font-black text-4xl">
                {PROJECT_DATA.minInvestment} <span className="text-lg">{PROJECT_DATA.minInvestmentPeriod}</span>
              </div>
              <div className="text-[#5452F6] font-light underline text-sm mt-1">
                Válido hasta el {PROJECT_DATA.validUntil}
              </div>
            </div>
            <button
              onClick={handleGoToSimulator}
              className="w-16 h-16 flex justify-center items-center bg-green-500 rounded-full cursor-pointer hover:bg-green-600 transition"
            >
              <Calculator className="w-8 h-8 text-white" />
            </button>
          </div>
        </div>

        <TabsList className="flex space-x-3 bg-transparent p-0">
          <TabsTrigger 
            value="investment" 
            className="rounded-md px-4 py-2 font-medium text-sm transition-all data-[state=active]:bg-[#DDE4FF] data-[state=active]:text-gray-800 data-[state=inactive]:bg-[#F0F0F0] data-[state=inactive]:text-gray-700"
          >
            Cupo de inversión
          </TabsTrigger>
          <TabsTrigger 
            value="stages" 
            className="rounded-md px-4 py-2 font-medium text-sm transition-all data-[state=active]:bg-[#DDE4FF] data-[state=active]:text-gray-800 data-[state=inactive]:bg-[#F0F0F0] data-[state=inactive]:text-gray-700"
          >
            Etapas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="investment" className="space-y-4">
          <div className="font-extrabold text-lg">
            {PROJECT_DATA.totalInvestment}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-black text-6xl text-gray-800">
              {PROJECT_DATA.availableSlots.current}
            </span>
            <span className="font-black text-4xl text-gray-400">
              /{PROJECT_DATA.availableSlots.total}
            </span>
          </div>
        </TabsContent>

        <TabsContent value="stages" className="flex space-x-4">
          {PROJECT_DATA.stages.map((stage, index) => (
            <div key={index} className="bg-[#F6F6F6] py-3 px-4 rounded">
              <div className="font-roboto text-sm font-extrabold mb-1">{stage.month}</div>
              <div className="font-roboto text-sm mb-1">{stage.price}</div>
              <div className="text-[#5452F6] text-xs">{stage.validUntil}</div>
            </div>
          ))}
        </TabsContent>

        <button
          onClick={handleGoToBuy}
          className="w-full bg-black text-white py-3 px-6 rounded-lg font-bold hover:bg-gray-800 transition"
        >
          Quiero ser socio
        </button>
      </Tabs>

      {galleryOpen && PROJECT_DATA.images.gallery.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col">
          <div className="flex justify-end p-4">
            <button
              type="button"
              onClick={closeGallery}
              className="text-white p-2 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Cerrar galería"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center gap-4 px-4 pb-6 md:gap-6 md:px-6 md:pb-8">
            <button
              type="button"
              onClick={handlePrev}
              className="text-white p-2 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white md:p-3"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <div className="relative w-full max-w-4xl h-[55vh] md:h-auto md:aspect-[16/10]">
              <Image
                src={PROJECT_DATA.images.gallery[activeImage]}
                alt={`Imagen ${activeImage + 1} del proyecto ${PROJECT_DATA.name}`}
                fill
                className="object-contain rounded-lg"
                sizes="100vw"
                priority
              />
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="text-white p-2 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white md:p-3"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>

          <div className="flex justify-center gap-2 pb-4 flex-wrap px-4 md:pb-6 md:px-6">
            {PROJECT_DATA.images.gallery.map((image, index) => (
              <button
                type="button"
                key={image}
                onClick={() => setActiveImage(index)}
                className={`relative w-16 h-16 rounded overflow-hidden border ${activeImage === index ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'}`}
                aria-label={`Ver imagen ${index + 1}`}
              >
                <Image
                  src={image}
                  alt={`Miniatura ${index + 1} del proyecto ${PROJECT_DATA.name}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

