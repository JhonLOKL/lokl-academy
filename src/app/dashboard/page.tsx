"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import ProtectedRoute from "@/components/auth/protected-route";
import ProfileAvatar from "@/components/auth/profile-avatar";
import {
  H1,
  H2,
  Paragraph,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
  VisualCard,
  Badge,
  Text
} from "@/components/design-system";
import { Skeleton } from "@/components/ui/skeleton";
import CourseCard from "@/components/course/course-card";
import { getUserCoursesAction } from "@/actions/course-action";
import { Course } from "@/lib/course/schema";
import { useRouter } from "next/navigation";
import {
  User,
  Settings,
  LogOut,
  BookOpen,
  ChevronRight,
  GraduationCap,
  Building
} from "lucide-react";

export default function DashboardPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  // Cursos del usuario
  const [loadingCourses, setLoadingCourses] = useState<boolean>(true);
  const [userCourses, setUserCourses] = useState<Course[]>([]);

  // Eliminar logs de depuración en producción

  // Cargar cursos del usuario
  useEffect(() => {
    let mounted = true;
    async function loadUserCourses() {
      setLoadingCourses(true);
      try {
        const res = await getUserCoursesAction();
        if (!mounted) return;
        if (res.success) {
          setUserCourses(res.data || []);
        } else {
          setUserCourses([]);
        }
      } catch {
        if (!mounted) return;
        setUserCourses([]);
      } finally {
        if (mounted) setLoadingCourses(false);
      }
    }
    loadUserCourses();
    return () => { mounted = false; };
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // Estos datos se cargarán desde la API en el futuro
/*   const recentCourses: never[] = [];
  const upcomingEvents: never[] = [];
*/
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#F5F5F5]">
          {/* Header con información del usuario - Mejorado con gradiente y mejor espaciado */}
          <header className="bg-gradient-to-r from-[#5352F6] to-[#4A4AE5] text-white">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                <ProfileAvatar
                  profilePhoto={user?.profilePhoto}
                  firstName={user?.firstName}
                  lastName={user?.lastName}
                  size="lg"
                  className="ring-4 ring-white/20"
                />
                <div>
                  <H1 variant="page-title" color="white" className="mb-1">
                    Bienvenido, {user?.firstName || "Usuario"}
                  </H1>
                  <Paragraph color="white" className="opacity-90">
                    {user?.email}
                  </Paragraph>
                  <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                    {user?.planType && (
                      <Badge className="bg-white/30 text-white hover:bg-white/40 transition-colors">
                        Plan {user.planType === "investor" ? "Inversionista" : user.planType === "basic" ? "Básico" : user.planType}
                      </Badge>
                    )}
                    {user?.uniqueCode && (
                      <Badge className="bg-white/20 text-white hover:bg-white/30 transition-colors">
                        Código: {user.uniqueCode}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center sm:justify-end gap-3 mt-4 md:mt-0">
                <Button variant="dark" size="lg" className="flex items-center gap-2 shadow-sm hover:shadow transition-all" aria-label="Abrir configuración">
                  <Settings size={18} />
                  Configuración
                </Button>
                <Button variant="secondary" size="lg" className="flex items-center gap-2 shadow-sm hover:shadow transition-all" onClick={handleLogout} aria-label="Cerrar sesión">
                  <LogOut size={18} />
                  Cerrar sesión
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Contenido principal - Mejorado con espaciado y estructura */}
        <main className="container mx-auto px-4 py-8 md:py-12">
          {/* Dashboard Overview - Nueva sección de resumen */}
          <section className="mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <H2 variant="section" id="panel-control">Panel de Control</H2>
              <Button variant="outline" className="flex items-center gap-2" onClick={() => router.push("/course")} aria-label="Explorar catálogo de cursos">
                <BookOpen size={16} />
                Explorar cursos
              </Button>
            </div>
            
            <Card className="mb-8 bg-gradient-to-br from-[#F5F5F5] to-white border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-[#5352F6]/10 p-3" aria-hidden="true">
                      <GraduationCap size={24} className="text-[#5352F6]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Text size="lg" weight="semibold">Progreso de aprendizaje</Text>
                      <Text size="sm" color="muted">Continúa tu camino educativo</Text>
                    </div>
                  </div>
                  <Button onClick={() => router.push("/course")} rightIcon={<ChevronRight size={16} />} aria-label="Ver todos los cursos disponibles">
                    Ver todos los cursos
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Mis cursos */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
              <H2 variant="card" id="mis-cursos">Mis cursos</H2>
              <Text size="sm" color="purple" weight="medium" className="flex items-center gap-1 cursor-pointer hover:underline" role="button" tabIndex={0}>
                <span>Ordenar por más recientes</span>
                <ChevronRight size={14} />
              </Text>
            </div>
            {loadingCourses ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="overflow-hidden rounded-lg border border-[#E5E5E5] bg-white shadow-sm">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-4">
                      <Skeleton className="mb-2 h-4 w-24" />
                      <Skeleton className="mb-2 h-6 w-full" />
                      <Skeleton className="mb-4 h-4 w-3/4" />
                      <Skeleton className="mb-3 h-4 w-32" />
                      <Skeleton className="h-2 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : userCourses.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {userCourses.map((course) => (
                  <CourseCard key={course.id} course={course} showProgress={true} />
                ))}
              </div>
            ) : (
              <Card className="border-none shadow-sm bg-white">
                <CardContent className="p-8 flex flex-col items-center justify-center text-center">
                  <div className="rounded-full bg-[#F5F5F5] p-4 mb-4" aria-hidden="true">
                    <GraduationCap size={32} className="text-[#6D6C6C]" />
                  </div>
                  <CardTitle className="mb-2">Aún no tienes cursos inscritos</CardTitle>
                  <CardDescription className="mb-6 max-w-md">Explora nuestro catálogo de cursos y comienza tu camino de aprendizaje en inversión inmobiliaria.</CardDescription>
                  <Button onClick={() => router.push("/course")} size="lg" className="shadow-sm hover:shadow transition-all" aria-label="Explorar cursos disponibles">
                    Explorar cursos disponibles
                  </Button>
                </CardContent>
              </Card>
            )}
          </section>
          
          <hr className="my-8 border-t border-[#E5E5E5]" />

          {/* Métricas principales - Comentadas hasta tener datos reales */}
          {/* 
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <MetricCard
              title="Cursos Inscritos"
              value="0"
              icon={<BookOpen className="text-[#5352F6]" />}
              description="Cursos activos"
              trend="neutral"
            />
            
            <MetricCard
              title="Horas de Aprendizaje"
              value="0"
              icon={<Clock className="text-[#5352F6]" />}
              description="Total acumulado"
              trend="neutral"
            />
            
            <MetricCard
              title="Certificaciones"
              value="0"
              icon={<Award className="text-[#5352F6]" />}
              description="Pendientes de completar"
              trend="neutral"
            />
            
            <MetricCard
              title="Inversiones"
              value="0"
              icon={<Wallet className="text-[#5352F6]" />}
              description="Proyectos activos"
              trend="neutral"
            />
          </div>
          */}

          {/* Sección principal con grid - Mejorada la estructura */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Columna izquierda (2/3 en desktop) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Perfil completo - Mejorado con mejor organización */}
              <Card className="border-none shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <User size={20} className="text-[#5352F6]" />
                    Información Personal
                  </CardTitle>
                  <CardDescription>Datos de tu perfil en LOKL</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                    <div>
                      <Text size="sm" color="muted" className="mb-1">Nombre completo</Text>
                      <Text weight="medium">{user?.firstName} {user?.lastName || ""}</Text>
                    </div>

                    <div>
                      <Text size="sm" color="muted" className="mb-1">Email</Text>
                      <Text weight="medium">{user?.email || "No especificado"}</Text>
                    </div>

                    <div>
                      <Text size="sm" color="muted" className="mb-1">Teléfono</Text>
                      <Text weight="medium">
                        {user?.countryPhoneCode && user?.phone ? `+${user.countryPhoneCode} ${user.phone}` : 'No especificado'}
                      </Text>
                    </div>

                    <div>
                      <Text size="sm" color="muted" className="mb-1">Fecha de nacimiento</Text>
                      <Text weight="medium">
                        {user?.birthDate ? new Date(user.birthDate).toLocaleDateString() : 'No especificada'}
                      </Text>
                    </div>

                    {user?.documentType && (
                      <div>
                        <Text size="sm" color="muted" className="mb-1">Documento</Text>
                        <Text weight="medium">{user.documentType}: {user.documentNumber}</Text>
                      </div>
                    )}

                    {user?.address && (
                      <div>
                        <Text size="sm" color="muted" className="mb-1">Dirección</Text>
                        <Text weight="medium">{user.address}</Text>
                      </div>
                    )}

                    {(user?.city || user?.state) && (
                      <div>
                        <Text size="sm" color="muted" className="mb-1">Ciudad/Estado</Text>
                        <Text weight="medium">{[user.city, user.state].filter(Boolean).join(", ")}</Text>
                      </div>
                    )}
                    
                    {user?.planType && (
                      <div>
                        <Text size="sm" color="muted" className="mb-1">Tipo de plan</Text>
                        <Text weight="medium">
                          {user.planType === "investor" ? (
                            <span className="flex items-center gap-1">
                              Plan Inversionista
                              <Badge className="bg-[#5352F6]/10 text-[#5352F6] ml-1">Premium</Badge>
                            </span>
                          ) : user.planType === "basic" ? (
                            "Plan Básico"
                          ) : (
                            user.planType
                          )}
                        </Text>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="ml-auto flex items-center gap-2" aria-label="Actualizar información personal">
                    Actualizar información
                    <ChevronRight size={16} />
                  </Button>
                </CardFooter>
              </Card>

              {/* Cursos recientes - Comentado hasta tener datos reales */}
              {/* 
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen size={20} className="text-[#5352F6]" />
                    Mis Cursos
                  </CardTitle>
                  <CardDescription>Continúa tu aprendizaje donde lo dejaste</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <GraduationCap size={48} className="mx-auto text-gray-300 mb-3" />
                    <Text weight="medium">No tienes cursos inscritos actualmente</Text>
                    <Text size="sm" color="muted" className="mt-1">Explora nuestro catálogo para comenzar tu aprendizaje</Text>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className="w-full">Ver todos los cursos</Button>
                </CardFooter>
              </Card>
              */}
            </div>

            {/* Columna derecha (1/3 en desktop) */}
            <div className="space-y-8">
              {/* Próximos eventos - Comentado hasta tener datos reales */}
              {/* 
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar size={20} className="text-[#5352F6]" />
                    Próximos Eventos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <Calendar size={32} className="mx-auto text-gray-300 mb-2" />
                    <Text size="sm" color="muted">No hay eventos programados</Text>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full">Ver todos los eventos</Button>
                </CardFooter>
              </Card>
              */}

              {/* Oportunidades de inversión - Mejorado con mejor diseño */}
              <div className="space-y-6">
                <H2 variant="card" className="flex items-center gap-2" id="oportunidades-inversion">
                  <Building size={20} className="text-[#5352F6]" />
                  Oportunidades
                </H2>
                
                <VisualCard
                  title="Explora Oportunidades de Inversión"
                  description="Descubre proyectos inmobiliarios exclusivos con alto potencial de retorno y comienza a diversificar tu portafolio."
                  imageUrl="/images/skyscraper-bw.jpg"
                  ctaText="Ver proyectos"
                  hasImage={true}
                  ctaAction={() => router.push("https://lokl.life/#projects")}
                  className="shadow-sm hover:shadow-md transition-all duration-300"
                />
              </div>

              {/* Recursos - Comentado hasta tener datos reales */}
              {/* 
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText size={20} className="text-[#5352F6]" />
                    Recursos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 rounded-lg border p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                    <FileText size={18} className="text-[#5352F6]" />
                    <Text>Guía de inversión inmobiliaria</Text>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                    <FileText size={18} className="text-[#5352F6]" />
                    <Text>Calculadora de retorno de inversión</Text>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                    <FileText size={18} className="text-[#5352F6]" />
                    <Text>Glosario de términos inmobiliarios</Text>
                  </div>
                </CardContent>
              </Card>
              */}
            </div>
          </div>
        </main>
        
        {/* Footer con información adicional */}
        <footer className="bg-white border-t border-[#E5E5E5] py-6" role="contentinfo">
          <div className="container mx-auto px-4 text-center">
            <Text size="sm" color="muted">© {new Date().getFullYear()} LOKL Academy. Todos los derechos reservados.</Text>
          </div>
        </footer>
      </div>
    </ProtectedRoute>
  );
}