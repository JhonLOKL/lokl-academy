// ===================================================================
// LOKL ACADEMY - SCHEMAS COMPLETOS PARA CURSOS Y RUTAS
// Sistema escalable con enfoque SEO
// ===================================================================

// ===================================================================
// TIPOS BASE Y COMUNES
// ===================================================================

// Constantes para tipos de pricing
export const PRICING_TYPES = {
  FREE: 'free',
  PREMIUM: 'premium',
  EXCLUSIVE: 'exclusive',
  INVESTOR: 'investor'
} as const;

export type PricingType = typeof PRICING_TYPES[keyof typeof PRICING_TYPES];

// Constantes para planes de acceso
export const ACCESS_PLANS = {
  NONE: 'none',
  DREAMER: 'dreamer',
  VISIONARY: 'visionary',
  DEVELOPER: 'developer',
  INVESTOR: 'investor',
  ANY: 'any'
} as const;

export type AccessPlan = typeof ACCESS_PLANS[keyof typeof ACCESS_PLANS];

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
  author?: string;
  language?: string; // "es-CO", "es-ES"

  // Open Graph
  ogImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  ogType: "article" | "website" | "course";
  ogSiteName?: string;
  ogLocale?: string; // "es_CO", "es_ES"

  // Twitter Cards
  twitterCard: "summary" | "summary_large_image";
  twitterSite?: string;
  twitterCreator?: string;

  // Robots
  robots?: {
    index?: boolean;
    follow?: boolean;
    maxSnippet?: number;
    maxImagePreview?: "none" | "standard" | "large";
    maxVideoPreview?: number;
  };

  // Datos estructurados personalizados
  structuredData?: Record<string, unknown>;

  // Breadcrumbs para navegación
  breadcrumbs?: Array<{
    name: string;
    url: string;
    position: number;
  }>;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  courseCount?: number;
  pathCount?: number;
  keywords?: string[];
  parentId?: string; // Para subcategorías
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  color?: string;
  description?: string;
  usageCount?: number;
}

export interface Instructor {
  id: string;
  name: string;
  slug: string;
  bio: string;
  avatar: string;
  title?: string;
  role?: string;
  company?: string;
  expertise: string[];

  // Redes sociales
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    website?: string;
  };

  // Estadísticas
  stats?: {
    totalCourses: number;
    totalStudents: number;
    averageRating: number;
    yearsExperience: number;
  };

  // SEO
  seo?: SEOMetadata;
}

export interface MediaAsset {
  url: string;
  alt: string;
  caption?: string;
  credit?: string;
  width?: number;
  height?: number;
  duration?: number; // Para videos en segundos
  fileSize?: number; // En bytes
  format?: string; // "mp4", "jpg", "webp"
}

// ===================================================================
// SISTEMA DE PROGRESO Y USUARIO
// ===================================================================

export interface UserProgress {
  userId: string;
  courseId?: string;
  pathId?: string;

  // Progreso general
  overallProgress: number; // 0-100
  completedLessons: number;
  totalLessons: number;
  timeSpent: number; // En minutos

  // Progreso por módulo/sección
  moduleProgress: Array<{
    moduleId: string;
    progress: number;
    completedAt?: string;
  }>;

  // Fechas importantes
  startedAt: string;
  lastAccessedAt: string;
  completedAt?: string;

  // Certificaciones
  certificateIssued?: boolean;
  certificateUrl?: string;

  // Evaluaciones
  quizScores?: Array<{
    quizId: string;
    score: number;
    attempts: number;
    bestScore: number;
  }>;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;

  // Plan y permisos
  plan: AccessPlan;
  isInvestor?: boolean;
  permissions: string[];
  subscriptionEndsAt?: string;

  // Preferencias de aprendizaje
  preferences: {
    language: string;
    timezone: string;
    emailNotifications: boolean;
    pushNotifications: boolean;
    preferredLearningTime?: 'morning' | 'afternoon' | 'evening';
  };

  // Estadísticas de aprendizaje
  learningStats: {
    totalCoursesEnrolled: number;
    totalCoursesCompleted: number;
    totalTimeSpent: number; // En minutos
    currentStreak: number; // Días consecutivos
    longestStreak: number;
    certificatesEarned: number;
  };

  // Cursos y rutas
  enrolledCourses: string[]; // Course IDs
  enrolledPaths: string[]; // Path IDs
  wishlist: string[]; // Course/Path IDs
  completedCourses: string[];
  completedPaths: string[];
}

// ===================================================================
// SISTEMA DE CURSOS
// ===================================================================

export interface Module {
  id: string;
  title: string;
  description?: string;
  order: number;
  duration: number; // En minutos

  // Contenido del módulo
  lessons: Lesson[];

  // Recursos adicionales
  resources?: Array<{
    title: string;
    url: string;
    type: 'pdf' | 'link' | 'download';
  }>;

  // Evaluación
  quiz?: Quiz;
  assignment?: Assignment;

  // Requisitos
  prerequisites?: string[]; // Module IDs
  isOptional?: boolean;

  // Estado de completado (conveniencia; puede derivarse de las lecciones)
  isCompleted?: boolean;
  completedAt?: string;
  progress?: number; // 0-100
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  description?: string;
  order: number;
  duration: number; // En minutos
  type: 'video' | 'text' | 'interactive' | 'live';

  // Contenido
  videoUrl?: string;
  textContent?: string; // contenido escrito de la clase
  interactiveContent?: Record<string, unknown>;

  // Recursos
  thumbnail?: MediaAsset;
  attachments?: MediaAsset[];

  // Configuración
  isPreview?: boolean; // Accesible sin inscripción
  isPremium?: boolean; // Requiere plan premium

  // Estado de completado (fuente de verdad a nivel granular)
  isCompleted?: boolean;
  completedAt?: string;
}

export interface Quiz {
  id: string;
  slug: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  timeLimit?: number; // En minutos
  passingScore: number; // Porcentaje mínimo para aprobar
  maxAttempts?: number;

  // Estado de completado/aprobación
  isCompleted?: boolean;
  passed?: boolean;
  completedAt?: string;
  attempts?: QuizAttempt[];
}

export interface QuizAttempt {
  id: string;
  score: number;
  answers: QuizAnswer[];
  passed: boolean;
  quizId: string;
  completedAt: string;
  isCompleted: boolean;
}

export interface QuizAnswer {
  id: string;
  questionId: string;
  answer: string;
  isCorrect: boolean;
  points: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: string[]; // Para multiple choice
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  instructions: string;
  dueDate?: string;
  submissionType: 'file' | 'text' | 'link';
  maxPoints: number;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  excerpt: string;

  // SEO específico
  seo: SEOMetadata;

  // Contenido del curso
  content: {
    modules: Module[];
    totalLessons: number;
    totalDuration: number; // En minutos
    difficulty: 'principiante' | 'intermedio' | 'avanzado';
    requirements: string[];
    learningObjectives: string[];
    skillsYouWillLearn: string[];
    targetAudience: string[];
  };

  // Categorización
  category: Category;
  tags: Tag[];
  instructor: Instructor;

  // Princing y acceso
  princing: CoursePrincing;

  // Requisitos de acceso (visibilidad/elegibilidad)
  accessRequirements: AccessRequirements;

  // Multimedia
  thumbnail: MediaAsset;
  coverImage?: MediaAsset;
  previewVideo?: MediaAsset;
  gallery?: MediaAsset[];

  // Métricas y engagement
  stats?: {
    enrolledCount: number;
    completedCount: number;
    completionRate: number; // Porcentaje
    averageRating: number;
    reviewsCount: number;
    totalViews: number;
    averageTimeToComplete: number; // En horas
  };

  // Reviews y testimonios
  reviews?: CourseReview[];
  testimonials?: Testimonial[];

  // Certificación
  certificate?: {
    available: boolean;
    template?: string;
    criteria: {
      completionRequired: boolean;
      minimumScore?: number;
      timeRequirement?: number; // En horas
    };
  };

  // Fechas y estado
  publishedAt: string;
  updatedAt: string;
  status: 'draft' | 'published' | 'archived';
  featured?: boolean;
  isNew?: boolean;

  // Progreso
  progress?: {
    overallProgress: number;
    completedLessons: number;
    totalLessons: number;
  };

  // Configuración adicional
  settings: {
    allowDownloads: boolean;
    allowDiscussions: boolean;
    showProgress: boolean;
    enforceOrder: boolean; // Lecciones deben completarse en orden
  };
}

// ===================================================================
// SISTEMA DE REGLAS DE PRECIOS Y ACCESO
// ===================================================================

export interface PrincingRule {
  id: string;
  description?: string;

  // Condición
  plans?: AccessPlan[]; // Si se especifica, el usuario debe tener uno de estos planes
  isInvestor?: boolean; // Si se especifica, el usuario debe/no debe ser inversionista

  // Efecto
  price: number; // 0 = Gratis
  isBlocked?: boolean; // Si es true, el usuario no puede comprar ni acceder bajo esta regla

  // Metadata
  priority: number; // Para ordenar la evaluación
}

export interface CoursePrincing {
  type: PricingType;
  basePrice: number; // Precio por defecto si ninguna regla aplica
  originalPrice?: number;
  currency: string;
  rules: PrincingRule[];
}

export interface AccessRequirements {
  allowedPlans?: AccessPlan[]; // Quienes pueden ver/acceder al contenido. Si está vacío, cualquiera.
  requiresInvestor?: boolean;
  prerequisites?: string[]; // Course/Path IDs requeridos
  minimumLevel?: string;
}

export interface CourseReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  courseId: string;
  rating: number; // 1-5
  title?: string;
  comment: string;
  helpful: number; // Número de "me gusta"
  createdAt: string;
  verified: boolean; // Usuario realmente tomó el curso
}

export interface Testimonial {
  id: string;
  userName: string;
  userAvatar?: string;
  userTitle?: string;
  content: string;
  rating?: number;
  featured: boolean;
  createdAt: string;
}

// ===================================================================
// SISTEMA DE RUTAS DE APRENDIZAJE
// ===================================================================

export interface LearningPath {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  excerpt: string;

  // SEO
  seo: SEOMetadata;

  // Estructura de la ruta
  structure: {
    totalCourses: number;
    totalModules: number;
    totalLessons: number;
    totalDuration: number; // En minutos
    estimatedCompletionTime: string; // "3 meses", "6 semanas"
    difficulty: 'principiante' | 'intermedio' | 'avanzado';
    learningObjectives: string[];
    skillsYouWillLearn: string[];
  };

  // Cursos en orden específico
  courses: Array<{
    courseId: string;
    course?: Course; // Populated cuando se necesite
    order: number;
    isOptional?: boolean;
    prerequisites?: string[]; // Course IDs que deben completarse antes
    estimatedTime?: number; // Tiempo sugerido para este curso en la ruta
    description?: string; // Por qué este curso está en la ruta
  }>;

  // Milestone y progreso
  milestones: Array<{
    id: string;
    title: string;
    description: string;
    requiredCourses: string[]; // Course IDs que deben completarse
    order: number;
    certificate?: {
      available: boolean;
      template?: string;
    };
  }>;

  // Categorización
  category: Category;
  tags: Tag[];

  // Princing
  princing: CoursePrincing;

  // Acceso
  accessRequirements: AccessRequirements;

  // Multimedia
  thumbnail: MediaAsset;
  coverImage?: MediaAsset;
  previewVideo?: MediaAsset;

  // Métricas
  stats: {
    enrolledCount: number;
    completedCount: number;
    completionRate: number;
    averageRating: number;
    reviewsCount: number;
    averageTimeToComplete: number; // En semanas
  };

  // Reviews específicas de la ruta
  reviews?: PathReview[];

  // Fechas y estado
  publishedAt: string;
  updatedAt: string;
  status: 'draft' | 'published' | 'archived';
  featured?: boolean;

  // Configuración
  settings: {
    enforceOrder: boolean; // Los cursos deben tomarse en orden
    allowSkipping: boolean;
    showDetailedProgress: boolean;
  };
}

export interface PathReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  pathId: string;
  rating: number;
  title?: string;
  comment: string;
  helpful: number;
  createdAt: string;
  verified: boolean;
  completionStatus: 'completed' | 'in-progress' | 'enrolled';
}

// ===================================================================
// PERFILES DE APRENDIZAJE (COMO RUTAS ESPECIALIZADAS)
// ===================================================================

export interface LearningProfile {
  id: string;
  slug: string;
  title: string; // "Inversionista Explorador", "Inversionista Héroe"
  description: string;
  level: 'explorer' | 'adventurer' | 'hero';

  // Rutas incluidas en este perfil
  paths: Array<{
    pathId: string;
    path?: LearningPath;
    order: number;
    isCore: boolean; // Ruta esencial vs opcional
    description?: string;
  }>;

  // Estadísticas agregadas
  aggregatedStats: {
    totalCourses: number;
    totalDuration: number; // En horas
    estimatedCompletionTime: string;
    averageRating: number;
    totalEnrolled: number;
  };

  // Beneficios del perfil
  benefits: string[];

  // Multimedia
  thumbnail: MediaAsset;
  badge?: MediaAsset; // Badge que se obtiene al completar

  // SEO y metadata
  seo: SEOMetadata;
}

// ===================================================================
// SISTEMA DE PLANES Y SUSCRIPCIONES
// ===================================================================

export interface SubscriptionPlan {
  id: string;
  name: string; // "Básico", "Inversionista", "Premium"
  slug: string;
  description: string;

  // Princing
  princing: {
    monthly: number;
    yearly: number;
    currency: string;
    yearlyDiscount?: number; // Porcentaje de descuento anual
  };

  // Características y límites
  features: {
    // Acceso a contenido
    basicCourses: boolean;
    premiumCourses: boolean;
    exclusiveCourses: boolean;
    allBlogs: boolean;
    podcasts: boolean;

    // Soporte y comunidad
    dedicatedSupport: boolean;
    liveConferences: boolean;
    communityAccess: boolean;

    // Beneficios de inversión (específico de LOKL)
    earlyProjectAccess: boolean;
    exclusiveProjects: boolean;
    investmentTools: boolean;

    // Límites técnicos
    maxConcurrentCourses?: number;
    downloadLimit?: number;
    certificatesIncluded: boolean;
  };

  // Audiencia objetivo
  targetAudience: string[];

  // Estado
  isPopular?: boolean;
  isActive: boolean;

  // Metadata
  createdAt: string;
  updatedAt: string;
}

// ===================================================================
// COMENTARIOS Y REVIEWS GENERALES
// ===================================================================

export interface PlatformReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  userTitle?: string;

  // Contenido del review
  rating: number; // 1-5
  title?: string;
  comment: string;

  // Contexto
  userPlan: AccessPlan;
  coursesCompleted: number;
  timeOnPlatform: number; // En meses

  // Engagement
  helpful: number;
  featured: boolean;

  // Fechas
  createdAt: string;
  updatedAt?: string;

  // Moderación
  status: 'pending' | 'approved' | 'rejected';
}

// ===================================================================
// HERRAMIENTAS Y RECURSOS EXTERNOS
// ===================================================================

export interface ExternalTool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: 'simulator' | 'calculator' | 'comparator' | 'analyzer';

  // Multimedia
  thumbnail: MediaAsset;
  screenshots?: MediaAsset[];

  // Metadata
  isActive: boolean;
  requiresLogin: boolean;
  isPremium: boolean;

  // Estadísticas
  stats: {
    totalClicks: number;
    averageTimeSpent: number;
    userRating: number;
  };
}

// ===================================================================
// NEWSLETTERS Y CONTENIDO DE TENDENCIAS
// ===================================================================

export interface NewsletterItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  type: 'blog' | 'news' | 'trend' | 'announcement';

  // Multimedia
  featuredImage?: MediaAsset;

  // Metadata
  publishedAt: string;
  author?: Instructor;
  tags: Tag[];

  // Engagement
  views: number;
  likes: number;
  shares: number;

  // Estado
  featured: boolean;
  status: 'draft' | 'published';
}

// ===================================================================
// TIPOS PARA API Y RESPONSES
// ===================================================================

// Its not used
export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Its not used
export interface ApiResponse<T> {
  data: T;
  pagination?: PaginationData;
  meta?: {
    totalCount: number;
    filters?: Record<string, unknown>;
    sort?: {
      field: string;
      order: 'asc' | 'desc';
    };
  };
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface InstructorLite {
  id: string;
  name: string;
  slug: string;
  bio: string;
  avatar: string;
}

export interface CourseCardLite {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  excerpt: string;
  seo: SEOMetadata;
  instructor: InstructorLite;
  category: Category;
  tags: Tag[];
  // Métricas resumidas para la tarjeta
  rating?: number | null; // 0-5
  studentsCount?: number | null; // número de estudiantes
  durationMinutes?: number | null; // duración total del curso en minutos
  princing: {
    type: PricingType;
    price: number;
    originalPrice: number;
    currency: string;
  };
  accessRequirements: AccessRequirements;
  thumbnail: MediaAsset;
  // Progreso simplificado para la tarjeta
  progress?: {
    overallProgress: number; // 0-100
    completedLessons: number;
    totalLessons: number;
  };
}

export interface CoursesCardsResponse {
  success: boolean;
  message?: string;
  data: {
    courses: CourseCardLite[];
    pagination: PaginationData;
  };
}

export interface CourseBySlugResponse {
  success: boolean;
  message?: string;
  course: Course;
}

// Its not used
export interface SearchFilters {
  query?: string;
  categories?: string[];
  tags?: string[];
  instructors?: string[];
  difficulty?: string[];
  pricing?: string[];
  duration?: {
    min?: number;
    max?: number;
  };
  rating?: number;
  isNew?: boolean;
  featured?: boolean;
}

// Its not used
export interface SortOptions {
  field: 'title' | 'publishedAt' | 'rating' | 'enrolledCount' | 'duration' | 'price';
  order: 'asc' | 'desc';
}

// ===================================================================
// TIPOS PARA COMPONENTES DE UI
// ===================================================================

// Its not used
export interface BreadcrumbItem {
  name: string;
  href: string;
  current?: boolean;
}

// Its very used
export interface CourseCardProps {
  course: Course;
  variant?: 'default' | 'compact' | 'featured' | 'horizontal';
  showProgress?: boolean;
  progress?: UserProgress;
  onClick?: (course: Course) => void;
  showInstructor?: boolean;
  showStats?: boolean;
}

// Its not used
export interface LearningPathCardProps {
  path: LearningPath;
  userProgress?: UserProgress;
  variant?: 'default' | 'detailed' | 'compact';
  onClick?: (path: LearningPath) => void;
}

// Its not used
export interface CourseGridProps {
  courses: Course[];
  loading?: boolean;
  layout?: 'grid' | 'list';
  columns?: 2 | 3 | 4;
  showFilters?: boolean;
  pagination?: PaginationData;
  onPageChange?: (page: number) => void;
}
