"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { getWebinarsAction, enrollWebinarAction, getAllEnrolledWebinarsAction } from "@/actions/webinar-action";
import { Webinar } from "@/lib/webinar/schema";
import { useAuthStore } from "@/store/auth-store";
import { 
  HighlightHeading, 
  Paragraph, 
  H2,
  Button
} from "@/components/design-system";
import CourseSwiper from "@/components/course/course-swiper";
import WebinarCard from "@/components/webinar/webinar-card";

function WebinarsContent() {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrollingId, setEnrollingId] = useState<string | null>(null);
  const [enrollSuccess, setEnrollSuccess] = useState<{id: string, message: string} | null>(null);
  const [autoEnrollProcessed, setAutoEnrollProcessed] = useState(false);
  
  const { user, token } = useAuthStore();
  const isAuthenticated = !!token && !!user;
  const searchParams = useSearchParams();



  const sortWebinarsByDate = useCallback((webinarsToSort: Webinar[]) => {
    return [...webinarsToSort].sort(
      (a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime()
    );
  }, []);

  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        setLoading(true);
        // Cargar todos los webinars disponibles
        const { webinars: fetchedWebinars, error: fetchError } = await getWebinarsAction();
        
        if (fetchError) {
          setError(fetchError);
          return;
        }

        // Si el usuario está autenticado, cargar también sus webinars inscritos
        let enrolledWebinarIds: string[] = [];
        
        if (isAuthenticated) {
          try {
            const { enrollments, error: enrolledError } = await getAllEnrolledWebinarsAction();
            
            console.log("Respuesta de webinars inscritos:", { enrollments, enrolledError });
            
            if (!enrolledError && enrollments) {
              enrolledWebinarIds = enrollments;
              console.log("IDs de webinars inscritos:", enrolledWebinarIds);
            } else {
              console.log("No hay webinars inscritos o error:", enrolledError);
            }
          } catch (enrollError) {
            console.error("Error al obtener webinars inscritos:", enrollError);
          }
        }

        // Procesar los webinars para determinar el estado de inscripción
        // Si el usuario está inscrito, usar el accessLink del webinar original
        const sortedWebinars = sortWebinarsByDate(fetchedWebinars);
        const processedWebinars = sortedWebinars.map(webinar => {
          const isEnrolled = enrolledWebinarIds.includes(webinar.id);
          
          return {
            ...webinar,
            canEnroll: isAuthenticated ? !isEnrolled : true,
            // Si está inscrito, el accessLink debería estar en el webinar original
            accessLink: isEnrolled ? webinar.accessLink : undefined
          };
        });
        
        setWebinars(processedWebinars);
        
        // Log para depuración
        console.log("Webinars procesados:", processedWebinars);
        console.log("IDs de webinars inscritos:", enrolledWebinarIds);
      } catch {
        setError("Error al cargar los webinars. Por favor, intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchWebinars();
    // Resetear el estado de auto-enroll cuando cambie la autenticación
    setAutoEnrollProcessed(false);
  }, [isAuthenticated, sortWebinarsByDate]); // Recargar cuando cambie el estado de autenticación

  const handleEnroll = useCallback(async (webinarId: string) => {
    if (!isAuthenticated) {
      // Redirigir a login o mostrar mensaje
      return;
    }

    try {
      setEnrollingId(webinarId);
      const response = await enrollWebinarAction({ webinarId });
      
      if (response.success) {
        setEnrollSuccess({
          id: webinarId,
          message: "¡Te has inscrito correctamente al webinar!"
        });
        
        // Recargar todos los webinars para obtener los datos actualizados con accessLink
        try {
          const { webinars: refreshedWebinars, error: refreshError } = await getWebinarsAction();
          
          if (!refreshError && refreshedWebinars) {
            // También obtener las inscripciones actualizadas
            const { enrollments: updatedEnrollments, error: enrolledError } = await getAllEnrolledWebinarsAction();
            
            if (!enrolledError && updatedEnrollments) {
              // Procesar los webinars con la información actualizada
              const sortedWebinars = sortWebinarsByDate(refreshedWebinars);
              const processedWebinars = sortedWebinars.map(webinar => {
                const isEnrolled = updatedEnrollments.includes(webinar.id);
                
                return {
                  ...webinar,
                  canEnroll: !isEnrolled,
                  accessLink: isEnrolled ? webinar.accessLink : undefined
                };
              });
              
              setWebinars(processedWebinars);
              console.log("Webinars recargados después de inscripción:", processedWebinars);
            }
          }
        } catch (refreshError) {
          console.error("Error al recargar webinars:", refreshError);
          // Como fallback, actualizar solo el webinar actual sin accessLink
          setWebinars(currentWebinars => 
            currentWebinars.map(webinar => 
              webinar.id === webinarId 
                ? { ...webinar, canEnroll: false } 
                : webinar
            )
          );
        }
        
        console.log("Inscripción exitosa al webinar:", webinarId);
      } else {
        setError(response.error || "Error al inscribirse al webinar");
      }
    } catch {
      setError("Error al procesar tu inscripción. Por favor, intenta nuevamente.");
    } finally {
      setEnrollingId(null);
    }
  }, [isAuthenticated, sortWebinarsByDate]);

  // Auto-enroll cuando hay parámetro enroll y el usuario está autenticado
  useEffect(() => {
    const autoEnroll = async () => {
      const enrollParam = searchParams.get('enroll');
      
      // Solo procesar si:
      // 1. Hay parámetro enroll
      // 2. El usuario está autenticado
      // 3. Los webinars ya están cargados
      // 4. No se ha procesado ya el auto-enroll
      if (enrollParam && isAuthenticated && webinars.length > 0 && !autoEnrollProcessed) {
        // Verificar que el webinar existe
        const webinarExists = webinars.find(webinar => webinar.id === enrollParam);
        
        if (webinarExists) {
          // Verificar si ya está inscrito
          const isAlreadyEnrolled = !webinarExists.canEnroll;
          
          if (!isAlreadyEnrolled) {
            console.log("Auto-inscribiendo al webinar:", enrollParam);
            await handleEnroll(enrollParam);
          } else {
            console.log("Usuario ya está inscrito al webinar:", enrollParam);
            setEnrollSuccess({
              id: enrollParam,
              message: "¡Ya estás inscrito a este webinar!"
            });
          }
        } else {
          console.log("Webinar no encontrado:", enrollParam);
          setError("El webinar solicitado no existe o no está disponible.");
        }
        
        // Marcar como procesado para evitar múltiples auto-enrolls
        setAutoEnrollProcessed(true);
        
        // Limpiar el parámetro de la URL
        const url = new URL(window.location.href);
        url.searchParams.delete('enroll');
        window.history.replaceState({}, '', url.toString());
      }
    };

    autoEnroll();
  }, [isAuthenticated, webinars, searchParams, autoEnrollProcessed, handleEnroll]);

    return (
    <main className="min-h-screen bg-[#FAFAFA] py-12">
      <div className="container mx-auto px-4">
        {/* Título principal atractivo */}
        <div className="mb-6 text-center">
          <HighlightHeading
            level={1}
            text="Inscríbete a nuestros webinars sobre inversiones inmobiliarias"
            highlight="Inscríbete"
            highlightColor="purple"
            align="center"
            className="mb-4"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#5352F6] border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="rounded-md bg-red-50 p-4 text-center">
            <p className="text-red-700">{error}</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Intentar nuevamente
            </Button>
          </div>
        ) : webinars.length === 0 ? (
          <div className="rounded-md bg-gray-50 p-8 text-center">
            <H2 variant="section" className="mb-4">No hay webinars disponibles</H2>
            <Paragraph color="muted">
              Actualmente no hay webinars programados. ¡Vuelve pronto para ver nuevas fechas!
            </Paragraph>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              <CourseSwiper
                slidesPerView={1}
                spaceBetween={32}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 1,
                    spaceBetween: 40,
                  },
                  1440: {
                    slidesPerView: 1,
                    spaceBetween: 50,
                  },
                  1800: {
                    slidesPerView: 1,
                    spaceBetween: 60,
                  },
                }}
              >
            {webinars.map((webinar) => (
              <WebinarCard
                key={webinar.id}
                webinar={webinar}
                isAuthenticated={isAuthenticated}
                enrollingId={enrollingId}
                enrollSuccess={enrollSuccess}
                onEnroll={handleEnroll}
                accessLink={webinar.accessLink}
              />
            ))}
              </CourseSwiper>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function WebinarsPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#FAFAFA] py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#5352F6] border-t-transparent"></div>
          </div>
        </div>
      </main>
    }>
      <WebinarsContent />
    </Suspense>
  );
}