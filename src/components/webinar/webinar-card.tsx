"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/design-system";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Webinar } from "@/lib/webinar/schema";
import { useToast } from "@/components/design-system/ui/use-toast";

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
  const { toast } = useToast();

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
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border-2 border-[#E5E5E5] bg-white shadow-sm transition-all hover:shadow-lg hover:border-[#5352F6]/30 w-full">
      {/* Imagen en la parte superior */}
      <div className="relative w-full h-64 sm:h-80 md:h-[32rem]">
        <Image
          src={webinar.coverImageUrl || "/images/webinar-default.jpg"}
          alt={webinar.title}
          fill
          priority
          className="object-cover transition-all duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
        />
      </div>

      {/* Contenido debajo de la imagen */}
      <div className="flex-1 bg-white p-6 flex flex-col">
        {/* Título del webinar */}
        <h3 className="text-xl md:text-2xl font-bold text-[#0F0F0F] mb-4">
          {webinar.title}
        </h3>

        {/* Descripción completa */}
        <div className="mb-6 flex-grow">
          <div className="text-sm text-[#444444] leading-relaxed">
            {webinar.description}
          </div>
        </div>

        {/* Hora y fecha del webinar */}
        <div className="mb-6 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEEEFE]">
            <CalendarIcon className="h-4 w-4 text-[#5352F6]" />
          </div>
          <div>
            <p className="text-sm font-medium">{dateInfo.fullDate}</p>
            <p className="text-xs text-[#6D6C6C]">{dateInfo.time} hrs - Hora programada</p>
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
                  <div className="flex justify-center">
                    <Button 
                      variant="primary" 
                      className="w-full sm:w-auto sm:px-6"
                      onClick={() => {
                        navigator.clipboard.writeText(webinar.accessLink || "");
                        toast({
                          title: "¡Enlace copiado!",
                          description: "El enlace de acceso se ha copiado al portapapeles",
                          variant: "success",
                          icon: <CheckCircle className="h-4 w-4" />,
                        });
                      }}
                      type="button"
                    >
                      Copiar enlace
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : accessLink && isAuthenticated && !webinar.canEnroll ? (
            <div className="space-y-2">
              <div className="rounded-md bg-[#EEEEFE] p-3 text-sm break-all">
                <p className="font-semibold text-[#5352F6] mb-1">Enlace de acceso:</p>
                <p className="text-[#0F0F0F]">{webinar.accessLink}</p>
              </div>
              <div className="flex justify-center">
                <Button 
                  variant="primary" 
                  className="w-full sm:w-auto sm:px-6 py-2.5"
                  onClick={() => {
                    navigator.clipboard.writeText(webinar.accessLink || "");
                    toast({
                      title: "¡Enlace copiado!",
                      description: "El enlace de acceso se ha copiado al portapapeles",
                      variant: "success",
                      icon: <CheckCircle className="h-4 w-4" />,
                    });
                  }}
                  type="button"
                >
                  Copiar enlace
                </Button>
              </div>
            </div>
          ) : isAuthenticated ? (
            <div className="flex justify-center">
              <Button 
                onClick={() => onEnroll(webinar.id)}
                disabled={enrollingId === webinar.id}
                variant="primary"
                className="w-full sm:w-auto sm:px-6 py-2.5"
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
            </div>
          ) : (
              <div className="space-y-2">
                <div className="flex justify-center">
                  <Button 
                    variant="primary" 
                    className="w-full sm:w-auto sm:px-6"
                    onClick={() => window.location.href = "/login?redirect=/webinar"}
                    type="button"
                  >
                    Iniciar sesión para inscribirme
                  </Button>
                </div>
                <div className="flex justify-center">
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto sm:px-6"
                    onClick={() => window.location.href = "/register?redirect=/webinar"}
                    type="button"
                  >
                    Registrarme
                  </Button>
                </div>
              </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default WebinarCard;
