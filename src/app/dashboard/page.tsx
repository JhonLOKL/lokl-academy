"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import ProtectedRoute from "@/components/auth/protected-route";
import ProfileAvatar from "@/components/auth/profile-avatar";
import { urls } from "@/config/urls";
import { getDashboardProjectsAction } from "@/actions/dashboard-projects-action";
import { type DashboardProject } from "@/services/dashboard-projects-service";
import { getUserReferralsAction } from "@/actions/user-referrals-action";
import { type ReferralUser } from "@/schemas/user-referrals-schema";
import {
  getCurrentLevelFromNextLevelName,
  getHighestLevel,
  translateLevel,
  type LevelKey,
} from "@/helpers/levels";
import { capitalizeFirstLetter } from "@/helpers/string-utils";
import { MobileBottomNav } from "@/components/dashboard/mobile-bottom-nav";
import { uploadProfilePhotoAction } from "@/actions/profile-action";
import { resizeImage } from "@/helpers/image-utils";
import {
  H1,
  H2,
  Paragraph,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  Badge,
  Text,
  Input,
  UserCard,
  useToast,
} from "@/components/design-system";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import CourseCard from "@/components/course/course-card";
import { getUserCoursesAction } from "@/actions/course-action";
import { Course } from "@/lib/course/schema";
import { useRouter } from "next/navigation";
import {
  Settings,
  LogOut,
  BookOpen,
  ChevronRight,
  TrendingUp,
  BarChart3,
  CreditCard,
  FileText,
  Users,
  Copy,
  Link2,
  MessageCircle,
  Linkedin,
  Twitter,
  Award,
  Rocket,
  Trophy,
  Sparkles,
  Crown,
  Camera,
  Loader2,
  UserCog,
  ShieldCheck,
  Landmark,
  Banknote,
  RefreshCw,
  Check,
  ArrowRight,
} from "lucide-react";

export default function DashboardPage() {
  const { user, logout, fetchUserProfile } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast();

  const [copiedLink, setCopiedLink] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Proyectos / niveles (desde /api/dashboard/projects)
  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);
  const [projects, setProjects] = useState<DashboardProject[]>([]);
  const [projectsError, setProjectsError] = useState<string | null>(null);

  // Referidos
  const [loadingReferrals, setLoadingReferrals] = useState<boolean>(true);
  const [referrals, setReferrals] = useState<ReferralUser[]>([]);

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

  // Cargar proyectos (niveles)
  useEffect(() => {
    let mounted = true;
    async function loadProjects() {
      setLoadingProjects(true);
      setProjectsError(null);
      try {
        const res = await getDashboardProjectsAction();
        if (!mounted) return;
        if (res?.success) {
          setProjects(res.projects || []);
        } else {
          setProjects([]);
          setProjectsError(res?.message || "No fue posible cargar los proyectos");
        }
      } catch {
        if (!mounted) return;
        setProjects([]);
        setProjectsError("No fue posible cargar los proyectos");
      } finally {
        if (mounted) setLoadingProjects(false);
      }
    }
    loadProjects();
    return () => { mounted = false; };
  }, []);

  // Cargar referidos
  useEffect(() => {
    let mounted = true;
    async function loadReferrals() {
      setLoadingReferrals(true);
      try {
        const res = await getUserReferralsAction();
        if (!mounted) return;
        if (res.success && res.data) {
          setReferrals(res.data);
        } else {
          setReferrals([]);
        }
      } catch (error) {
        console.error("Error cargando referidos:", error);
        if (!mounted) return;
        setReferrals([]);
      } finally {
        if (mounted) setLoadingReferrals(false);
      }
    }
    // Solo cargar si el usuario tiene código (ya está logueado y cargado)
    if (user?.uniqueCode) {
      loadReferrals();
    }
    return () => { mounted = false; };
  }, [user?.uniqueCode]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const referralCode = user?.uniqueCode || "";
  const referralLink = referralCode ? `${urls.SITE_URL}?code=${encodeURIComponent(referralCode)}` : "";

  const handleCopyReferralCode = async () => {
    if (!referralCode) return;
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const handleCopyReferralLink = async () => {
    if (!referralLink) return;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 1500);
    } catch {
      setCopiedLink(false);
    }
  };

  const handleAvatarClick = () => {
    if (isUploadingPhoto) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Formato no válido",
        description: "Por favor selecciona un archivo de imagen.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Archivo muy pesado",
        description: "El tamaño máximo permitido es 5MB.",
        variant: "destructive",
      });
      return;
    }

    setIsUploadingPhoto(true);
    try {
      const resizedFile = await resizeImage(file, 500);
      const result = await uploadProfilePhotoAction(resizedFile);

      if (result.success) {
        toast({
          title: "Foto actualizada",
          description: "Tu foto de perfil se ha actualizado correctamente.",
          variant: "success",
        });
        await fetchUserProfile();
      } else {
        toast({
          title: "Error al subir foto",
          description: result.message || "No se pudo actualizar la foto.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error procesando imagen:", error);
      toast({
        title: "Error inesperado",
        description: "Ocurrió un error al procesar la imagen.",
        variant: "destructive",
      });
    } finally {
      setIsUploadingPhoto(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const shareText = "Únete a LOKL con mi link y empecemos a crecer juntos:";
  const shareMessage = referralLink ? `${shareText} ${referralLink}` : shareText;
  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareMessage)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink || urls.SITE_URL)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`,
  };

  const totalGenerated = referrals.reduce((total, ref) => {
    const userTotal = ref.investments?.reduce((sum, inv) => sum + (inv.contributionAmount || 0), 0) || 0;
    return total + userTotal;
  }, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // ==========================
  // Niveles por proyecto (UI)
  // ==========================
  const projectLevels = projects.map((p) => {
    const nextLevelName = (p?.levelUp as { nextLevelName?: string | null } | undefined)?.nextLevelName ?? null;
    const currentLevel = getCurrentLevelFromNextLevelName(nextLevelName);
    const rawProjectName =
      (typeof p?.name === "string" && p.name) ||
      (typeof p?.code === "string" && p.code) ||
      (typeof p?.id === "string" && p.id) ||
      "Proyecto";

    const projectName = (() => {
      const name = String(rawProjectName || "").trim();
      if (!name) return "Proyecto";
      return name.charAt(0).toUpperCase() + name.slice(1);
    })();

    return { projectName, currentLevel, nextLevelName };
  });

  const highestLevel: LevelKey = getHighestLevel(projectLevels.map((x) => x.currentLevel));

  const getLevelBadge = (level: LevelKey) => {
    if (level === "hero") return { variant: "success" as const, label: translateLevel(level) };
    if (level === "adventurer") return { variant: "warning" as const, label: translateLevel(level) };
    if (level === "explorer") return { variant: "info" as const, label: translateLevel(level) };
    return { variant: "default" as const, label: translateLevel(level) };
  };

  const getLevelEmblem = (level: LevelKey) => {
    const baseChip =
      "bg-white/15 text-white backdrop-blur-md border border-white/25 shadow-sm shadow-black/10";

    if (level === "hero") {
      return {
        label: "Héroe",
        icon: Trophy,
        chipClass: baseChip,
        iconClass: "text-yellow-200",
        dotClass: "bg-yellow-300",
      };
    }
    if (level === "adventurer") {
      return {
        label: "Aventurero",
        icon: Rocket,
        chipClass: baseChip,
        iconClass: "text-pink-200",
        dotClass: "bg-pink-300",
      };
    }
    if (level === "explorer") {
      return {
        label: "Explorador",
        icon: Award,
        chipClass: baseChip,
        iconClass: "text-sky-200",
        dotClass: "bg-sky-300",
      };
    }
    return {
      label: "Sin nivel",
      icon: Sparkles,
      chipClass: baseChip,
      iconClass: "text-white/80",
      dotClass: "bg-white/70",
    };
  };

  const projectLevelTags = projectLevels
    .filter((p) => p.projectName && p.currentLevel !== "Sin nivel")
    .map((p) => ({
      projectName: p.projectName,
      level: p.currentLevel,
    }));

  const formatProjectTag = (name: string) => {
    const clean = String(name || "").trim();
    if (!clean) return "Proyecto";
    // Compacto pero legible (evita chips enormes en header)
    if (clean.length <= 14) return clean;
    return `${clean.slice(0, 12)}…`;
  };

  const getPlanChip = (planType: string | undefined | null) => {
    const raw = String(planType || "").toLowerCase();
    const baseChip =
      "bg-white/15 text-white backdrop-blur-md border border-white/25 shadow-sm shadow-black/10";

    if (raw === "investor" || raw === "inversionista") {
      return {
        label: "Plan Inversionista",
        className: baseChip,
        icon: Crown,
        iconClass: "text-yellow-200",
        dotClass: "bg-yellow-300",
      };
    }

    if (raw === "basic" || raw === "básico" || raw === "basico") {
      return {
        label: "Plan Básico",
        className: baseChip,
        icon: Sparkles,
        iconClass: "text-white/80",
        dotClass: "bg-white/70",
      };
    }

    if (!raw) {
      return null;
    }

    // Fallback para planes/tiers futuros
    return {
      label: `Plan ${planType}`,
      className: baseChip,
      icon: Sparkles,
      iconClass: "text-white/80",
      dotClass: "bg-white/70",
    };
  };

  // Estos datos se cargarán desde la API en el futuro
  /*   const recentCourses: never[] = [];
    const upcomingEvents: never[] = [];
  */
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#F5F5F5] pb-24 sm:pb-0">
        {/* Header con información del usuario - Mejorado con gradiente y mejor espaciado */}
        <header className="bg-gradient-to-r from-[#5352F6] to-[#4A4AE5] text-white rounded-b-[45px] md:rounded-b-none pb-6 md:pb-0">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                <div 
                  className="relative cursor-pointer group" 
                  onClick={handleAvatarClick}
                  title="Cambiar foto de perfil"
                >
                  <ProfileAvatar
                    profilePhoto={user?.profilePhoto}
                    firstName={user?.firstName}
                    lastName={user?.lastName}
                    size="lg"
                    className={`ring-4 ring-white/20 transition-opacity ${isUploadingPhoto ? 'opacity-60' : ''}`}
                  />
                  
                  {/* Overlay Hover */}
                  <div className="absolute inset-0 rounded-full bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <Camera className="text-white w-7 h-7 drop-shadow-sm" />
                  </div>

                  {/* Loading State */}
                  {isUploadingPhoto && (
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <Loader2 className="text-white w-8 h-8 animate-spin drop-shadow-md" />
                    </div>
                  )}

                  {highestLevel !== "Sin nivel" && (
                    <div className="absolute -right-2 -bottom-2 z-30">
                      {(() => {
                        const emblem = getLevelEmblem(highestLevel);
                        const Icon = emblem.icon;
                        return (
                          <div
                            className={[
                              "inline-flex items-center gap-2 rounded-full px-3 py-1.5",
                              emblem.chipClass,
                            ].join(" ")}
                            title={`Nivel más alto: ${emblem.label}`}
                            aria-label={`Nivel más alto: ${emblem.label}`}
                          >
                            <span className={["h-2 w-2 rounded-full", emblem.dotClass].join(" ")} aria-hidden="true" />
                            <Icon size={14} className={[emblem.iconClass].join(" ")} aria-hidden="true" />
                            <span className="text-[11px] font-semibold tracking-wide leading-none">
                              {emblem.label}
                            </span>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
                <input 
                  ref={fileInputRef} 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileChange} 
                />
                <div className="min-w-0 flex-1 w-full">
                  <H1 variant="page-title" color="white" className="mb-1 text-center sm:text-left truncate">
                    Bienvenido, {capitalizeFirstLetter(user?.firstName || "Usuario")}
                  </H1>
                  <Paragraph color="white" className="opacity-90 text-center sm:text-left truncate">
                    {user?.email}
                  </Paragraph>
                  <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start w-full">
                    {(() => {
                      const plan = getPlanChip(user?.planType);
                      if (!plan) return null;
                      const Icon = plan.icon;
                      return (
                        <Badge className={["px-3 py-1", plan.className].join(" ")}>
                          <span className="inline-flex items-center gap-2">
                            <span className={["h-1.5 w-1.5 rounded-full", plan.dotClass].join(" ")} aria-hidden="true" />
                            <Icon size={14} className={plan.iconClass} aria-hidden="true" />
                            <span className="text-xs font-semibold">{plan.label}</span>
                          </span>
                        </Badge>
                      );
                    })()}
                    {user?.uniqueCode && (
                      <Badge className="bg-white/20 text-white hover:bg-white/30 transition-colors">
                        Código: {user.uniqueCode}
                      </Badge>
                    )}
                    {projectLevelTags.length > 0 && (
                      <div className="w-full max-w-[calc(100vw-48px)] sm:max-w-none mt-2">
                        {/* Mobile: Swiper horizontal (todos los tags) */}
                        <div className="flex sm:hidden overflow-x-auto gap-2 pb-2 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] items-center">
                          {projectLevelTags.map((t) => {
                            const emblem = getLevelEmblem(t.level);
                            const Icon = emblem.icon;
                            return (
                              <div key={`mobile-${t.projectName}-${t.level}`} className="snap-start flex-none">
                                <Badge className={["px-3 py-1 whitespace-nowrap", emblem.chipClass].join(" ")}>
                                  <span className="inline-flex items-center gap-2">
                                    <span className={["h-1.5 w-1.5 rounded-full", emblem.dotClass].join(" ")} aria-hidden="true" />
                                    <Icon size={14} className={emblem.iconClass} aria-hidden="true" />
                                    <span className="text-xs font-semibold">
                                      {formatProjectTag(t.projectName)} · {emblem.label}
                                    </span>
                                  </span>
                                </Badge>
                              </div>
                            );
                          })}
                        </div>

                        {/* Desktop: Wrap con límite (max 3) */}
                        <div className="hidden sm:flex flex-wrap gap-2 justify-start">
                          {projectLevelTags.slice(0, 3).map((t) => {
                            const emblem = getLevelEmblem(t.level);
                            const Icon = emblem.icon;
                            return (
                              <span
                                key={`${t.projectName}-${t.level}`}
                                title={`${t.projectName}: ${emblem.label}`}
                              >
                                <Badge className={["px-3 py-1", emblem.chipClass].join(" ")}>
                                  <span className="inline-flex items-center gap-2">
                                    <span className={["h-1.5 w-1.5 rounded-full", emblem.dotClass].join(" ")} aria-hidden="true" />
                                    <Icon size={14} className={emblem.iconClass} aria-hidden="true" />
                                    <span className="text-xs font-semibold">
                                      {formatProjectTag(t.projectName)} · {emblem.label}
                                    </span>
                                  </span>
                                </Badge>
                              </span>
                            );
                          })}
                          {projectLevelTags.length > 3 && (
                            <Badge className="bg-white/20 text-white hover:bg-white/30 transition-colors">
                              +{projectLevelTags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-nowrap w-full sm:w-auto justify-center sm:justify-end gap-3 mt-4 md:mt-0">
                <Button
                  variant="dark"
                  size="lg"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all px-3"
                  onClick={() => { window.location.href = `${urls.DASHBOARD_URL}/dashboard/perfil?scrollTo=complete-profile`; }}
                  aria-label="Abrir configuración"
                >
                  <Settings size={18} className="flex-shrink-0" />
                  <span className="truncate">Configuración</span>
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all px-3" 
                  onClick={handleLogout} 
                  aria-label="Cerrar sesión"
                >
                  <LogOut size={18} className="flex-shrink-0" />
                  <span className="truncate">Salir</span>
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
              <Button variant="outline" className="hidden sm:flex items-center gap-2" onClick={() => router.push("/course")} aria-label="Explorar catálogo de cursos">
                <BookOpen size={16} />
                Explorar cursos
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Columna izquierda (2/3 en desktop): resumen + accesos + cursos */}
              <div className="lg:col-span-2">
                {/* Accesos rápidos (antes de cursos) - Oculto en mobile, reemplazado por MobileBottomNav */}
                <div className="mb-8 hidden sm:block">
                  <div className="flex flex-col gap-1 mb-4">
                    <H2 variant="card" id="accesos-rapidos">Accesos rápidos</H2>
                    <Text size="sm" color="muted">Atajos a los módulos principales</Text>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
                    {[
                      {
                        title: "Rentabilidad",
                        description: "Ingresos, retornos y métricas clave",
                        href: `${urls.DASHBOARD_URL}/dashboard/income`,
                        icon: TrendingUp,
                      },
                      {
                        title: "Proyecto-Desempeño",
                        description: "Estado y avance de tus proyectos",
                        href: `${urls.DASHBOARD_URL}/dashboard/projects`,
                        icon: BarChart3,
                      },
                      {
                        title: "Suscripciones",
                        description: "Planes, pagos y beneficios",
                        href: `${urls.DASHBOARD_URL}/dashboard/subscriptions`,
                        icon: CreditCard,
                      },
                      {
                        title: "Documentos",
                        description: "Contratos, reportes y archivos",
                        href: `${urls.DASHBOARD_URL}/dashboard/documents`,
                        icon: FileText,
                      },
                    ].map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        prefetch={false}
                        className="group block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5352F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F5F5] h-full"
                        aria-label={`Ir a ${item.title}`}
                      >
                        <Card className="relative border-none shadow-sm transition-all group-hover:shadow-md overflow-hidden aspect-square sm:aspect-auto sm:min-h-[116px] h-full p-0 sm:p-5">
                          <div
                            className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#5352F6] to-[#4A4AE5] hidden sm:block"
                            aria-hidden="true"
                          />
                          {/* Mobile: cuadrada premium — centrada */}
                          <div className="flex h-full flex-col sm:hidden relative overflow-hidden items-center justify-center text-center p-4  via-slate-50 to-slate-100">
                            {/* Ícono centrado y destacado */}
                            <div
                              className="mb-3 rounded-2xl bg-white p-3 ring-1 ring-indigo-50 transition-transform group-hover:scale-110"
                              aria-hidden="true"
                            >
                              <item.icon size={24} className="text-[#5352F6]" />
                            </div>

                            {/* Título centrado */}
                            <p className="text-[13px] font-semibold text-[#1C274C] leading-tight line-clamp-2 px-1">
                              {item.title}
                            </p>
                          </div>

                          {/* Desktop: layout original (más ancho, con descripción) */}
                          <div className="hidden sm:flex items-start gap-4">
                            <div
                              className="rounded-xl bg-[#5352F6]/10 p-3 ring-1 ring-[#5352F6]/10 transition-colors group-hover:bg-[#5352F6]/15 flex-none"
                              aria-hidden="true"
                            >
                              <item.icon size={20} className="text-[#5352F6]" />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-3">
                                <Text
                                  weight="semibold"
                                  className="text-[15px] leading-snug line-clamp-2"
                                  title={item.title}
                                >
                                  {item.title}
                                </Text>
                                <div
                                  className="rounded-full bg-[#F5F5F5] p-1.5 transition-colors group-hover:bg-[#5352F6]/10 flex-none self-center"
                                  aria-hidden="true"
                                >
                                  <ChevronRight
                                    size={16}
                                    className="text-[#919090] transition-colors group-hover:text-[#5352F6]"
                                  />
                                </div>
                              </div>

                              <Text size="sm" color="muted" className="mt-1 line-clamp-2">
                                {item.description}
                              </Text>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Banner Siguiente Nivel */}
                {(() => {
                  const nextLevelProject = projects.find(p => p.levelUp?.nextLevelName);
                  
                  if (!nextLevelProject || !nextLevelProject.levelUp?.nextLevelName) return null;

                  const nextLvlName = translateLevel(nextLevelProject.levelUp.nextLevelName);
                  const amountNeeded = nextLevelProject.levelUp.nextLevelAmount || 0;
                  const unitsNeeded = nextLevelProject.levelUp.nextLevelUnits || 0;
                  
                  // Mapa de imágenes estáticas (match por nombre)
                  const projectImages: Record<string, string> = {
                    "indie universe": "https://lokl-assets.s3.us-east-1.amazonaws.com/home/HeroLoklPage/IMG_INDIE.png",
                    "nido de agua": "https://lokl-assets.s3.us-east-1.amazonaws.com/home/HeroLoklPage/IMG_NDA.png",
                    "aldea": "https://lokl-assets.s3.us-east-1.amazonaws.com/home/HeroLoklPage/IMG_ALDEA.png",
                  };

                  const normalizedName = nextLevelProject.name?.toLowerCase().trim() || "";
                  // Buscar coincidencia (contiene el nombre clave)
                  const imageKey = Object.keys(projectImages).find(key => normalizedName.includes(key));
                  const bgImage = imageKey ? projectImages[imageKey] : null;

                  // Si no hay imagen del proyecto, no mostramos el banner
                  if (!bgImage) return null;

                  const targetUrl = `${urls.DASHBOARD_URL}/dashboard/reinvestment?projectId=${nextLevelProject.id}&units=${nextLevelProject.levelUp?.nextLevelUnits || 1}`;

                  return (
                    <div className="mb-8">
                       <Card 
                          className="relative overflow-hidden border-none bg-[#1C1C1C] text-white shadow-lg group cursor-pointer"
                          onClick={() => router.push(targetUrl)}
                       >
                          {/* Background Image & Gradient */}
                          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F] via-[#0F0F0F]/80 to-transparent z-10 pointer-events-none" />
                          <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60 sm:opacity-100"
                            style={{ backgroundImage: `url(${bgImage})` }}
                          />
                          
                          <div className="relative z-20 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                             <div className="space-y-4 max-w-2xl flex-1">
                                <div className="flex items-center gap-3">
                                   <Badge className="border border-white/30 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors">
                                      {nextLevelProject.name}
                                   </Badge>
                                   <span className="text-xs sm:text-sm text-gray-300">
                                      Nivel actual: {translateLevel(getCurrentLevelFromNextLevelName(nextLevelProject.levelUp.nextLevelName))}
                                   </span>
                                </div>
                                
                                <div>
                                   <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
                                      Sube a nivel <span className="text-[#5352F6]">{nextLvlName}</span>
                                   </h3>
                                   <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                                      Te faltan <span className="font-semibold text-white">{unitsNeeded} {unitsNeeded === 1 ? 'unidad' : 'unidades'}</span> <span className="text-white/70 text-xs sm:text-sm">({formatCurrency(amountNeeded)})</span> para desbloquear beneficios exclusivos.
                                   </p>
                                </div>

                                {/* Beneficios */}
                                {nextLevelProject.levelUp.benefits && nextLevelProject.levelUp.benefits.length > 0 && (
                                   <div className="flex flex-wrap gap-2 pt-1">
                                      {nextLevelProject.levelUp.benefits.slice(0, 3).map((benefit, i) => (
                                         <div key={i} className="flex items-center gap-1.5 text-xs sm:text-sm bg-white/10 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm text-gray-100">
                                            <Check size={14} className="text-[#5352F6]" />
                                            {benefit}
                                         </div>
                                      ))}
                                   </div>
                                )}
                             </div>

                             <div className="flex-shrink-0 w-full md:w-auto">
                                <Button 
                                  variant="secondary" 
                                  size="lg" 
                                  className="w-full md:w-auto font-semibold shadow-xl hover:bg-gray-100 transition-colors border-none text-[#0F0F0F]"
                                  onClick={(e) => {
                                     e.stopPropagation();
                                     router.push(targetUrl);
                                  }}
                                >
                                   <span>Ver oportunidad</span>
                                   <ArrowRight size={18} className="ml-2" />
                                </Button>
                             </div>
                          </div>
                       </Card>
                    </div>
                  );
                })()}

                {/* Mis cursos */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <H2 variant="card" id="mis-cursos">Mis cursos</H2>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 w-fit"
                    onClick={() => router.push("/course")}
                    aria-label="Explorar catálogo de cursos"
                  >
                    <BookOpen size={16} />
                    Explorar catálogo
                  </Button>
                </div>

                {loadingCourses ? (
                  <div
                    className="flex gap-4 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory [scrollbar-width:thin]"
                    role="region"
                    aria-label="Cargando cursos"
                    tabIndex={0}
                  >
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="flex-none w-[280px] sm:w-[320px] md:w-[360px] snap-start overflow-hidden rounded-lg border border-[#E5E5E5] bg-white shadow-sm"
                      >
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
                  <div
                    className="flex gap-4 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory [scrollbar-width:thin]"
                    role="region"
                    aria-label="Cursos inscritos"
                    tabIndex={0}
                  >
                    {userCourses.map((course) => (
                      <div
                        key={course.id}
                        className="flex-none w-[280px] sm:w-[320px] md:w-[360px] snap-start"
                      >
                        <CourseCard course={course} showProgress={true} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <Card className="border-none shadow-sm bg-gradient-to-br from-white to-[#F5F5F5]">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="flex items-start gap-4">
                          <div className="rounded-full bg-[#5352F6]/10 p-3" aria-hidden="true">
                            <BookOpen size={22} className="text-[#5352F6]" />
                          </div>
                          <div>
                            <CardTitle className="mb-1">Aún no tienes cursos inscritos</CardTitle>
                            <CardDescription className="max-w-xl">
                              Explora el catálogo y empieza tu ruta de aprendizaje. Te recomendamos comenzar por lo esencial y avanzar paso a paso.
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button
                            onClick={() => router.push("/course")}
                            rightIcon={<ChevronRight size={16} />}
                            aria-label="Explorar cursos disponibles"
                          >
                            Explorar cursos
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Columna derecha (1/3 en desktop): Referidos */}
              <div className="space-y-6">
                <Card className="border-none shadow-sm">
                  <CardContent className="space-y-5">
                    {/* Header minimal */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="rounded-2xl bg-[#5352F6]/10 p-3 ring-1 ring-[#5352F6]/15 flex-none" aria-hidden="true">
                          <Users size={20} className="text-[#5352F6]" />
                        </div>
                        <div className="min-w-0 ">
                          <Text weight="semibold" className="leading-tight">Referidos </Text>
                          <Text size="sm" color="muted" className="mt-1">
                            - Comparte tu link y acumula beneficios.
                          </Text>
                        </div>
                      </div>
                    </div>

                    {/* Beneficios (colapsable) */}
                    {/* <div className="rounded-2xl bg-[#F5F5F5] overflow-hidden">
                      <button
                        type="button"
                        className="w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-[#EEEEFE] transition-colors"
                        onClick={() => setBenefitsOpen((v) => !v)}
                        aria-expanded={benefitsOpen}
                        aria-controls="referral-benefits"
                      >
                        <div className="min-w-0 text-left">
                          <Text weight="semibold">Beneficios del programa</Text>
                          <Text size="sm" color="muted">Comisión, bonos y eventos</Text>
                        </div>
                        {benefitsOpen ? (
                          <ChevronUp size={18} className="text-[#6D6C6C]" aria-hidden="true" />
                        ) : (
                          <ChevronDown size={18} className="text-[#6D6C6C]" aria-hidden="true" />
                        )}
                      </button>
                      {benefitsOpen && (
                        <div id="referral-benefits" className="px-4 pb-4">
                          <div className="space-y-2 pt-1">
                            {[
                              "Comisión por cada referido",
                              "Bonos adicionales por volumen",
                              "Acceso a eventos exclusivos",
                            ].map((t) => (
                              <div key={t} className="flex items-start gap-2">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#5352F6]" aria-hidden="true" />
                                <Text size="sm" color="muted">{t}</Text>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div> */}

                    {/* Acción principal (debajo de beneficios) */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <Text size="sm" weight="semibold">Tu link de referido</Text>
                        {referralCode && (
                          <span className="inline-flex items-center gap-2">
                            <Badge className="bg-[#5352F6]/10 text-[#5352F6] border border-[#5352F6]/15">
                              Código: {referralCode}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2"
                              onClick={handleCopyReferralCode}
                              aria-label="Copiar código de referidos"
                            >
                              <Copy size={14} />
                            </Button>
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col xs:flex-row items-stretch gap-2">
                        <Input
                          value={referralLink || "No disponible"}
                          readOnly
                          aria-label="Link de referidos"
                          icon={<Link2 size={16} />}
                          className="h-12 bg-[#F5F5F5] border-none focus-visible:ring-offset-0 min-w-0"
                        />
                        <Button
                          variant="primary"
                          className="h-12 px-4 whitespace-nowrap w-full xs:w-auto"
                          onClick={handleCopyReferralLink}
                          disabled={!referralLink}
                          aria-label="Copiar link de referidos"
                        >
                          {copiedLink ? "Copiado" : "Copiar"}
                        </Button>
                      </div>

                      {/* Share icons (sin bordes) */}
                      <div className="flex items-center justify-between gap-3">
                        <Text size="sm" color="muted">Compartir</Text>
                        <div className="flex items-center gap-2">
                          <a
                            href={shareLinks.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F5F5] hover:bg-[#EEEEFE] transition-colors"
                            aria-label="Compartir por WhatsApp"
                            title="WhatsApp"
                          >
                            <MessageCircle size={18} className="text-[#5352F6]" />
                          </a>
                          <a
                            href={shareLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F5F5] hover:bg-[#EEEEFE] transition-colors"
                            aria-label="Compartir en LinkedIn"
                            title="LinkedIn"
                          >
                            <Linkedin size={18} className="text-[#5352F6]" />
                          </a>
                          <a
                            href={shareLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F5F5] hover:bg-[#EEEEFE] transition-colors"
                            aria-label="Compartir en X"
                            title="X"
                          >
                            <Twitter size={18} className="text-[#5352F6]" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Resumen de ganancia */}
                    <div className="rounded-xl bg-[#F5F5F5] p-4 flex items-center justify-between">
                      <div>
                        <Text size="sm" color="muted">Total ganado: </Text>
                        <Text size="xl" weight="bold" className="text-[#5352F6]">{formatCurrency(totalGenerated)}</Text>
                      </div>
                      <div className="text-right flex flex-col items-end justify-center">
                        <div className="flex items-baseline gap-1.5">
                          <Text size="lg" weight="bold" className="text-[#1C274C] leading-none">{referrals.length}</Text>
                          <Text size="xs" color="muted">Referidos</Text>
                        </div>
                      </div>
                    </div>

                    {/* Últimos referidos */}
                    <div className="flex items-center justify-between mt-2">
                      <Text size="sm" weight="semibold">Tus referidos</Text>
                    </div>

                    <div className="divide-y divide-[#E5E5E5] rounded-2xl bg-white overflow-hidden">
                      {loadingReferrals ? (
                        <div className="p-4 space-y-3">
                          <Skeleton className="h-12 w-full" />
                          <Skeleton className="h-12 w-full" />
                          <Skeleton className="h-12 w-full" />
                        </div>
                      ) : referrals.length > 0 ? (
                        referrals.map((ref, idx) => {
                          const initials = (ref.firstName || ref.email)
                            .split(" ")
                            .filter(Boolean)
                            .slice(0, 2)
                            .map((p) => p[0]?.toUpperCase())
                            .join("");

                          const investmentsSum = ref.investments?.reduce((s, i) => s + (i.contributionAmount || 0), 0) || 0;
                          const hasInvested = investmentsSum > 0 || ref.status === 'invested';

                          return (
                            <div key={`${ref.email}-${idx}`} className="px-4 py-3">
                              <UserCard
                                name={`${ref.firstName} ${ref.lastName || ''}`.trim() || 'Usuario'}
                                role={
                                  <span className="block truncate max-w-[120px] xs:max-w-[160px] sm:max-w-none text-muted-foreground text-xs sm:text-sm">
                                    {ref.email}
                                  </span> as unknown as string
                                }
                                className="border-none shadow-none bg-transparent rounded-none !p-0 !flex-row items-center gap-3"
                                avatar={
                                  <Avatar className="h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0">
                                    <AvatarFallback className="text-[#5352F6] bg-[#5352F6]/10 font-semibold text-xs sm:text-sm">
                                      {initials || "U"}
                                    </AvatarFallback>
                                  </Avatar>
                                }
                                actions={
                                  hasInvested ? (
                                    <div className="flex flex-col items-end min-w-[90px] text-right">
                                      <Badge variant="success" className="mb-0.5 px-2 py-0.5 text-[10px] sm:text-xs">Inversionista</Badge>
                                      {investmentsSum > 0 && (
                                        <Text size="xs" weight="medium" className="text-[#5352F6] text-[10px] sm:text-xs">
                                          +{formatCurrency(investmentsSum)}
                                        </Text>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="flex flex-col items-end gap-0.5 min-w-[90px] text-right">
                                      <Badge variant="warning" className="px-2 py-0.5 text-[10px] sm:text-xs">Registrado</Badge>
                                      <Text size="xs" color="muted" className="italic text-[10px] sm:text-xs">¡Anímalo!</Text>
                                    </div>
                                  )
                                }
                              />
                            </div>
                          );
                        })
                      ) : (
                        <div className="p-8 text-center">
                          <Users className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                          <Text size="sm" color="muted">Aún no tienes referidos.</Text>
                          <Text size="xs" color="muted" className="mt-1">Comparte tu link para empezar.</Text>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end pt-1">
                      <Button
                        variant="ghost"
                        className="flex items-center gap-2"
                        onClick={() => router.push("/ambassadors")}
                        aria-label="Ver programa de referidos"
                      >
                        Ver programa
                        <ChevronRight size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Niveles por proyecto */}
                <Card className="border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp size={20} className="text-[#5352F6]" />
                      Niveles por proyecto
                    </CardTitle>
                    <CardDescription>Tu nivel actual en cada inversión</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loadingProjects ? (
                      <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-5 w-24 rounded-full" />
                          </div>
                        ))}
                      </div>
                    ) : projectsError ? (
                      <div className="space-y-3">
                        <Text size="sm" color="muted">{projectsError}</Text>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            // Reintento simple sin duplicar lógica (recargar la página)
                            window.location.reload();
                          }}
                        >
                          Reintentar
                        </Button>
                      </div>
                    ) : projectLevels.length > 0 ? (
                      <div className="divide-y divide-[#E5E5E5]">
                        {projectLevels.map((p, idx) => {
                          const b = getLevelBadge(p.currentLevel);
                          return (
                            <div key={`${p.projectName}-${idx}`} className="flex items-center justify-between py-3">
                              <div className="min-w-0">
                                <Text weight="medium" className="truncate">{p.projectName}</Text>
                              </div>
                              <Badge variant={b.variant}>{b.label}</Badge>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <Text size="sm" color="muted">Aún no tienes proyectos con nivel.</Text>
                    )}
                  </CardContent>
                </Card>

                {/* Gestión de cuenta - Nueva Ubicación (Columna Derecha - Final) */}
                <div className="pt-4">
                  <div className="flex items-center justify-between mb-4">
                     <H2 variant="card" className="text-base font-semibold text-gray-900">Mi Cuenta</H2>
                  </div>
                  
                  <div className="space-y-2">
                    {[
                      { label: "Editar información básica", icon: UserCog, href: `${urls.DASHBOARD_URL}/dashboard/perfil?open=info` },
                      { label: "Validación de identidad", icon: ShieldCheck, href: `${urls.DASHBOARD_URL}/dashboard/perfil?open=identity` },
                      { label: "Métodos de pago", icon: CreditCard, href: `${urls.DASHBOARD_URL}/dashboard/perfil?open=payoutSources` },
                      { label: "Cuentas bancarias", icon: Landmark, href: `${urls.DASHBOARD_URL}/dashboard/withdrawal` },
                      { label: "Retiros", icon: Banknote, href: `${urls.DASHBOARD_URL}/dashboard/withdrawal` },
                      { label: "Reinversión", icon: RefreshCw, href: `${urls.DASHBOARD_URL}/dashboard/reinvestment` },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="group flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#5352F6]/30 transition-all duration-200"
                      >
                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-[#F5F5F5] text-[#6D6C6C] group-hover:bg-[#5352F6] group-hover:text-white transition-colors duration-200">
                          <item.icon size={16} />
                        </div>
                        <span className="text-sm font-medium text-[#0F0F0F] group-hover:text-[#5352F6] transition-colors duration-200 truncate">
                          {item.label}
                        </span>
                        <ChevronRight size={14} className="ml-auto text-gray-300 group-hover:text-[#5352F6] transition-colors duration-200 opacity-0 group-hover:opacity-100" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer con información adicional */}
        <footer className="bg-white border-t border-[#E5E5E5] py-6" role="contentinfo">
          <div className="container mx-auto px-4 text-center">
            <Text size="sm" color="muted">© {new Date().getFullYear()} LOKL Academy. Todos los derechos reservados.</Text>
          </div>
        </footer>
        <MobileBottomNav />
      </div>
    </ProtectedRoute>
  );
}