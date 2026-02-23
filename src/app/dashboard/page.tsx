"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import ProtectedRoute from "@/components/auth/protected-route";
import ProfileAvatar from "@/components/auth/profile-avatar";
import { urls } from "@/config/urls";
import { getDashboardProjectsAction } from "@/actions/dashboard-projects-action";
import { type DashboardProject } from "@/services/dashboard-projects-service";
import {
  getCurrentLevelFromNextLevelName,
  getHighestLevel,
  translateLevel,
  type LevelKey,
} from "@/helpers/levels";
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
  Badge,
  Text,
  Input,
  UserCard,
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
  ChevronDown,
  ChevronUp,
  Award,
  Rocket,
  Trophy,
  Sparkles,
  Crown,
} from "lucide-react";

export default function DashboardPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [benefitsOpen, setBenefitsOpen] = useState(false);

  // Proyectos / niveles (desde /api/dashboard/projects)
  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);
  const [projects, setProjects] = useState<DashboardProject[]>([]);
  const [projectsError, setProjectsError] = useState<string | null>(null);

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

  const shareText = "Únete a LOKL con mi link y empecemos a crecer juntos:";
  const shareMessage = referralLink ? `${shareText} ${referralLink}` : shareText;
  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareMessage)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink || urls.SITE_URL)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`,
  };

  const mockReferrals: Array<{
    id: string;
    name: string;
    email: string;
    status: "Activo" | "Registrado" | "Pendiente";
    statusVariant: "success" | "info" | "warning";
  }> = [
      {
        id: "ref-1",
        name: "María González",
        email: "maria.gonzalez@mail.com",
        status: "Activo",
        statusVariant: "success",
      },
      {
        id: "ref-2",
        name: "Carlos Restrepo",
        email: "carlos.restrepo@mail.com",
        status: "Registrado",
        statusVariant: "info",
      },
      {
        id: "ref-3",
        name: "Ana Patricia Silva",
        email: "ana.silva@mail.com",
        status: "Pendiente",
        statusVariant: "warning",
      },
    ];

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
      <div className="min-h-screen bg-[#F5F5F5]">
        {/* Header con información del usuario - Mejorado con gradiente y mejor espaciado */}
        <header className="bg-gradient-to-r from-[#5352F6] to-[#4A4AE5] text-white">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                <div className="relative">
                  <ProfileAvatar
                    profilePhoto={user?.profilePhoto}
                    firstName={user?.firstName}
                    lastName={user?.lastName}
                    size="lg"
                    className="ring-4 ring-white/20"
                  />
                  {highestLevel !== "Sin nivel" && (
                    <div className="absolute -right-2 -bottom-2">
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
                <div className="min-w-0 flex-1 w-full">
                  <H1 variant="page-title" color="white" className="mb-1 text-center sm:text-left truncate">
                    Bienvenido, {user?.firstName || "Usuario"}
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

              <div className="flex flex-wrap justify-center sm:justify-end gap-3 mt-4 md:mt-0">
                <Button
                  variant="dark"
                  size="lg"
                  className="flex items-center gap-2 shadow-sm hover:shadow transition-all"
                  onClick={() => { window.location.href = `${urls.DASHBOARD_URL}/dashboard/perfil`; }}
                  aria-label="Abrir configuración"
                >
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
              <Button variant="outline" className="hidden sm:flex items-center gap-2" onClick={() => router.push("/course")} aria-label="Explorar catálogo de cursos">
                <BookOpen size={16} />
                Explorar cursos
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Columna izquierda (2/3 en desktop): resumen + accesos + cursos */}
              <div className="lg:col-span-2">
                {/* Accesos rápidos (antes de cursos) */}
                <div className="mb-8">
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

                    {/* Últimos referidos */}
                    <div className="flex items-center justify-between">
                      <Text size="sm" weight="semibold">Últimos referidos</Text>
                      <Badge variant="info">{mockReferrals.length}</Badge>
                    </div>

                    <div className="divide-y divide-[#E5E5E5] rounded-2xl bg-white">
                      {mockReferrals.map((ref) => {
                        const initials = ref.name
                          .split(" ")
                          .filter(Boolean)
                          .slice(0, 2)
                          .map((p) => p[0]?.toUpperCase())
                          .join("");

                        return (
                          <div key={ref.id} className="px-4 py-3">
                            <UserCard
                              name={ref.name}
                              role={
                                <span className="block truncate max-w-[140px] xs:max-w-[200px] sm:max-w-none text-muted-foreground text-sm">
                                  {ref.email}
                                </span> as unknown as string
                              }
                              className="border-none shadow-none bg-transparent rounded-none !p-0"
                              avatar={
                                <Avatar className="h-10 w-10">
                                  <AvatarFallback className="text-[#5352F6] bg-[#5352F6]/10 font-semibold">
                                    {initials || "U"}
                                  </AvatarFallback>
                                </Avatar>
                              }
                              actions={<Badge variant={ref.statusVariant}>{ref.status}</Badge>}
                            />
                          </div>
                        );
                      })}
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
      </div>
    </ProtectedRoute>
  );
}