"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/design-system";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Webinar } from "@/lib/webinar/schema";

interface WebinarCardProps {
  webinar: Webinar;
  isAuthenticated: boolean;
  enrollingId: string | null;
  enrollSuccess: { id: string; message: string } | null;
  onEnroll: (webinarId: string) => void;
  accessLink?: string; // Enlace de acceso del webinar inscrito
}

const WebinarCard: React.FC<WebinarCardProps> = ({
  webinar,
  isAuthenticated,
  enrollingId,
  enrollSuccess,
  onEnroll,
  accessLink,
}) => {
  const formatWebinarDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return {
        day: format(date, "dd", { locale: es }),
        month: format(date, "MMM", { locale: es }).toUpperCase(),
        time: format(date, "HH:mm", { locale: es }),
        fullDate: format(date, "EEEE d 'de' MMMM, yyyy", { locale: es }),
      };
    } catch {
      return {
        day: "--",
        month: "---",
        time: "--:--",
        fullDate: "Fecha por confirmar",
      };
    }
  };

  const dateInfo = formatWebinarDate(webinar.scheduledAt);

  // Log para depurar el accessLink
  console.log(`Webinar ${webinar.id}:`, {
    accessLink,
    webinarAccessLink: webinar.accessLink,
    canEnroll: webinar.canEnroll,
    enrollSuccess: enrollSuccess?.id === webinar.id,
    isAuthenticated
  });

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border-2 border-[#E5E5E5] bg-white shadow-sm transition-all hover:shadow-lg hover:border-[#5352F6]/30 min-h-[500px] w-full">
      {/* Imagen grande como fondo que ocupa toda la tarjeta */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={webinar.coverImageUrl || "/images/webinar-default.jpg"}
          alt={webinar.title}
          fill
          priority
          className="object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/20" />
        <div className="absolute inset-0 bg-[url('/images/dot-pattern.png')] opacity-10"></div>
      </div>

      <div className="relative flex h-full flex-col md:flex-row">
        {/* Columna izquierda con información principal (transparente sobre la imagen) */}
        <div className="w-full md:w-3/5 p-8 text-white flex flex-col justify-between z-10">
          {/* Fecha del webinar */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 p-1.5">
              <CalendarIcon className="h-6 w-6 text-[#5352F6]" />
            </div>
            <div className="bg-white/90 px-3 py-1 text-sm font-medium text-[#0F0F0F] rounded-md">
              {dateInfo.fullDate}
            </div>
          </div>

          {/* Título del webinar */}
          <div>
            <h3 className="mb-4 text-2xl md:text-3xl font-bold tracking-tight text-white">
              {webinar.title}
            </h3>


            {/* Hora del webinar */}
            <div className="flex items-center gap-2 mb-6">
              <Clock className="h-5 w-5 text-white/90" />
              <div>
                <p className="text-lg font-bold text-white">{dateInfo.time} hrs</p>
                <p className="text-xs text-white/70">Hora programada</p>
              </div>
            </div>
          </div>

          {/* Botones para móvil */}
          <div className="mt-6 md:hidden">
            {enrollSuccess && enrollSuccess.id === webinar.id ? (
              <div className="space-y-3">
                <div className="rounded-md bg-green-50 p-3 text-center text-green-700">
                  {enrollSuccess.message}
                </div>
                {/* Mostrar el enlace inmediatamente después de inscribirse - siempre mostrar si existe */}
                {webinar.accessLink && (
                  <div className="space-y-2">
                    <div className="rounded-md bg-[#EEEEFE] p-3 text-sm break-all">
                      <p className="font-semibold text-[#5352F6] mb-1">Enlace de acceso:</p>
                      <p className="text-[#0F0F0F]">{webinar.accessLink}</p>
                    </div>
                    <Button 
                      variant="primary" 
                      className="w-full"
                      onClick={() => navigator.clipboard.writeText(webinar.accessLink || "")}
                      type="button"
                    >
                      Copiar enlace
                    </Button>
                  </div>
                )}
              </div>
            ) : accessLink && isAuthenticated && !webinar.canEnroll ? (
              <div className="space-y-2">
                <div className="rounded-md bg-[#EEEEFE] p-3 text-sm break-all">
                  <p className="font-semibold text-[#5352F6] mb-1">Enlace de acceso:</p>
                  <p className="text-[#0F0F0F]">{webinar.accessLink}</p>
                </div>
                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={() => navigator.clipboard.writeText(webinar.accessLink || "")}
                  type="button"
                >
                  Copiar enlace
                </Button>
              </div>
            ) : isAuthenticated ? (
              <Button 
                onClick={() => onEnroll(webinar.id)}
                disabled={enrollingId === webinar.id}
                variant="primary"
                className="w-full"
                type="button"
              >
                {enrollingId === webinar.id ? (
                  <span className="flex items-center">
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Inscribiendo...
                  </span>
                ) : (
                  "Inscribirme ahora"
                )}
              </Button>
            ) : (
              <div className="space-y-2">
                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={() => window.location.href = "/login?redirect=/webinar"}
                  type="button"
                >
                  Iniciar sesión para inscribirme
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = "/register?redirect=/webinar"}
                  type="button"
                >
                  Registrarme
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Columna derecha con contenido blanco */}
        <div className="hidden md:flex md:w-2/5 bg-white p-6 flex-col z-10 ml-auto rounded-l-3xl shadow-[-10px_0px_15px_rgba(0,0,0,0.1)]">
          {/* Duración estimada */}
          <div className="mb-6 flex items-center gap-2 rounded-md border border-dashed border-[#E5E5E5] bg-[#FAFAFA] px-3 py-2">
            <Clock className="h-4 w-4 text-[#5352F6]" />
            <span className="text-sm">
              <span className="font-medium">{dateInfo.fullDate}</span>
            </span>
          </div>

          {/* Hora del webinar */}
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEEEFE]">
              <Clock className="h-4 w-4 text-[#5352F6]" />
            </div>
            <div>
              <p className="text-sm font-medium">{dateInfo.time} hrs</p>
              <p className="text-xs text-[#6D6C6C]">Hora programada</p>
            </div>
          </div>

          {/* Descripción completa */}
          <div className="mb-6 flex-grow">
            <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold">
              <div className="h-1 w-5 rounded-full bg-[#5352F6]"></div>
              Descripción
            </h4>
            <div className="text-sm text-[#444444] overflow-y-auto max-h-[200px] custom-scrollbar">
              {webinar.description}
            </div>
          </div>

          {/* Contenedor de botones en la parte inferior */}
          <div className="mt-auto space-y-4">
            {/* Botón de acción o enlace de acceso */}
            {enrollSuccess && enrollSuccess.id === webinar.id ? (
              <div className="space-y-3">
                <div className="rounded-md bg-green-50 p-3 text-center text-green-700">
                  {enrollSuccess.message}
                </div>
                {/* Mostrar el enlace inmediatamente después de inscribirse - siempre mostrar si existe */}
                {webinar.accessLink && (
                  <div className="space-y-2">
                    <div className="rounded-md bg-[#EEEEFE] p-3 text-sm break-all">
                      <p className="font-semibold text-[#5352F6] mb-1">Enlace de acceso:</p>
                      <p className="text-[#0F0F0F]">{webinar.accessLink}</p>
                    </div>
                    <Button 
                      variant="primary" 
                      className="w-full"
                      onClick={() => navigator.clipboard.writeText(webinar.accessLink || "")}
                      type="button"
                    >
                      Copiar enlace
                    </Button>
                  </div>
                )}
              </div>
            ) : accessLink && isAuthenticated && !webinar.canEnroll ? (
              <div className="space-y-2">
                <div className="rounded-md bg-[#EEEEFE] p-3 text-sm break-all">
                  <p className="font-semibold text-[#5352F6] mb-1">Enlace de acceso:</p>
                  <p className="text-[#0F0F0F]">{webinar.accessLink}</p>
                </div>
                <Button 
                  variant="primary" 
                  className="w-full py-2.5"
                  onClick={() => navigator.clipboard.writeText(webinar.accessLink || "")}
                  type="button"
                >
                  Copiar enlace
                </Button>
              </div>
            ) : isAuthenticated ? (
              <Button 
                onClick={() => onEnroll(webinar.id)}
                disabled={enrollingId === webinar.id}
                variant="primary"
                className="w-full py-2.5"
                type="button"
              >
                {enrollingId === webinar.id ? (
                  <span className="flex items-center">
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Inscribiendo...
                  </span>
                ) : (
                  "Inscribirme ahora"
                )}
              </Button>
            ) : (
              <div className="space-y-2">
                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={() => window.location.href = "/login?redirect=/webinar"}
                  type="button"
                >
                  Iniciar sesión para inscribirme
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = "/register?redirect=/webinar"}
                  type="button"
                >
                  Registrarme
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c5c5c5;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #5352F6;
        }
      `}</style>
    </div>
  );
};

export default WebinarCard;
