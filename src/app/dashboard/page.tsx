"use client";

import { useAuthStore } from "@/store/auth-store";
import ProtectedRoute from "@/components/auth/protected-route";
import ProfileAvatar from "@/components/auth/profile-avatar";
import {
  H1,
  Paragraph,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  VisualCard,
  Badge,
  Text
} from "@/components/design-system";
import { useRouter } from "next/navigation";
import {
  User,
  Settings,
  LogOut
} from "lucide-react";

export default function DashboardPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  // Depuración de datos de usuario
  console.log('Datos de usuario:', user);
  console.log('Foto de perfil:', user?.profilePhoto);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // Estos datos se cargarán desde la API en el futuro
/*   const recentCourses: any[] = [];
  const upcomingEvents: any[] = [];
 */
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header con información del usuario */}
        <div className="bg-[#5352F6] text-white">
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
              <div className="flex items-center gap-6">
                <ProfileAvatar
                  profilePhoto={user?.profilePhoto}
                  firstName={user?.firstName}
                  lastName={user?.lastName}
                  size="lg"
                />
                <div>
                  <H1 variant="page-title" color="white" className="mb-1">
                    Bienvenido, {user?.firstName || "Usuario"}
                  </H1>
                  <Paragraph color="white" className="opacity-90">
                    {user?.email}
                  </Paragraph>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {user?.planType && (
                      <Badge className="bg-white/30 text-white">
                        Plan {user.planType === "investor" ? "Inversionista" : user.planType === "basic" ? "Básico" : user.planType}
                      </Badge>
                    )}
                    {user?.uniqueCode && (
                      <Badge className="bg-white/20 text-white">
                        Código de referido: {user.uniqueCode}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button variant="dark" size="lg" className="flex items-center gap-2">
                  <Settings size={18} />
                  Configuración
                </Button>
                <Button variant="secondary" size="lg" className="flex items-center gap-2" onClick={handleLogout}>
                  <LogOut size={18} />
                  Cerrar sesión
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="container mx-auto px-4 py-8">
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

          {/* Sección principal con grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna izquierda (2/3 en desktop) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Perfil completo */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User size={20} className="text-[#5352F6]" />
                    Información Personal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Text size="sm" color="muted">Nombre completo</Text>
                      <Text weight="medium">{user?.firstName} {user?.lastName}</Text>
                    </div>

                    <div>
                      <Text size="sm" color="muted">Email</Text>
                      <Text weight="medium">{user?.email}</Text>
                    </div>

                    <div>
                      <Text size="sm" color="muted">Teléfono</Text>
                      <Text weight="medium">
                        {user?.countryPhoneCode && user?.phone ? `+${user.countryPhoneCode} ${user.phone}` : 'No especificado'}
                      </Text>
                    </div>

                    <div>
                      <Text size="sm" color="muted">Fecha de nacimiento</Text>
                      <Text weight="medium">
                        {user?.birthDate ? new Date(user.birthDate).toLocaleDateString() : 'No especificada'}
                      </Text>
                    </div>

                    {user?.documentType && (
                      <div>
                        <Text size="sm" color="muted">Documento</Text>
                        <Text weight="medium">{user.documentType}: {user.documentNumber}</Text>
                      </div>
                    )}

                    {user?.address && (
                      <div>
                        <Text size="sm" color="muted">Dirección</Text>
                        <Text weight="medium">{user.address}</Text>
                      </div>
                    )}

                    {(user?.city || user?.state) && (
                      <div>
                        <Text size="sm" color="muted">Ciudad/Estado</Text>
                        <Text weight="medium">{[user.city, user.state].filter(Boolean).join(", ")}</Text>
                      </div>
                    )}
                    
                    {user?.planType && (
                      <div>
                        <Text size="sm" color="muted">Tipo de plan</Text>
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
                  {/*    <Button variant="ghost" className="ml-auto flex items-center gap-2">
                    Editar perfil
                    <ChevronRight size={16} />
                  </Button> */}
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

              {/* Oportunidades de inversión */}
              <VisualCard
                title="Explora Oportunidades de Inversión"
                description="Descubre proyectos inmobiliarios exclusivos con alto potencial de retorno."
                imageUrl="/images/skyscraper-bw.jpg"
                ctaText="Ver proyectos"
                hasImage={true}
                ctaAction={() => router.push("https://lokl.life/#projects")}
              />

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
        </div>
      </div>
    </ProtectedRoute>
  );
}