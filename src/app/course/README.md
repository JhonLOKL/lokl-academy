# LOKL Academy - Documentación

## 📚 Estructura General

La página principal de LOKL Academy está diseñada para mostrar una plataforma educativa enfocada en inversiones inmobiliarias, IA, crowdfunding y otros temas financieros. La página sigue un diseño mobile-first y está optimizada para conversión siguiendo las mejores prácticas 2025.

## 🧩 Componentes Principales

### 1. HeroSection
- **Propósito**: Introducción visual impactante con título, subtítulo y barra de búsqueda.
- **Características**: Imagen en blanco y negro (identidad LOKL), overlay con gradiente, animaciones con Framer Motion.
- **Optimización**: Imagen con priority para mejorar LCP.

### 2. CourseCard
- **Propósito**: Mostrar información de cursos individuales.
- **Variantes**: default, compact, featured, horizontal.
- **Características**: 
  - Muestra progreso del usuario cuando está disponible
  - Tag para cursos exclusivos
  - Información del instructor
  - Estadísticas del curso

### 3. PathCard
- **Propósito**: Mostrar rutas de aprendizaje completas.
- **Variantes**: default, detailed, compact.
- **Características**:
  - Muestra progreso del usuario
  - Lista expandible de cursos incluidos
  - Información de tiempo estimado y dificultad

### 4. ProfileCard
- **Propósito**: Mostrar perfiles de aprendizaje (Explorador, Aventurero, Héroe).
- **Características**:
  - Muestra estadísticas agregadas
  - Lista expandible de rutas incluidas
  - Beneficios del perfil

### 5. HorizontalScroll
- **Propósito**: Contenedor para scroll horizontal suave.
- **Características**:
  - Controles de navegación
  - Detección de límites de scroll
  - Optimizado para móvil (touch)

### 6. SubscriptionPlanCard
- **Propósito**: Mostrar planes de suscripción disponibles.
- **Características**:
  - Resalta plan actual del usuario
  - Muestra características incluidas/no incluidas
  - Destaca el plan más popular

### 7. BenefitsSection
- **Propósito**: Destacar los beneficios de estudiar en LOKL Academy.
- **Características**:
  - Iconos representativos
  - Diseño en grid responsive
  - CTA estratégicamente ubicado

### 8. Otros Componentes
- **NewsletterCard**: Muestra artículos y tendencias recientes.
- **ToolCard**: Enlaces a herramientas externas de LOKL.
- **TestimonialCard**: Muestra testimonios de usuarios.

## 🎨 Identidad Visual

La página implementa la identidad visual de LOKL:

- **Color primario**: `#5352F6` (LOKL purple)
- **Estética B&N**: Todas las imágenes utilizan `grayscale` para mantener la identidad visual.
- **Tipografía**: Sistema de tipografía con tracking específico (-0.038em).
- **Espaciado**: Sistema basado en múltiplos de 4px.

## 📱 Responsive Design

La página está diseñada siguiendo un enfoque mobile-first:

- **Mobile (< 768px)**: Diseño de columna única, elementos apilados.
- **Tablet (768px - 1023px)**: Grid de 2 columnas para tarjetas, secciones más espaciadas.
- **Desktop (1024px+)**: Grid de 3-4 columnas según la sección, mayor espaciado.

## 🚀 Optimización de Rendimiento

- **Lazy loading**: Imágenes bajo el pliegue cargan con lazy loading.
- **Priorización**: Imágenes críticas (hero) con atributo `priority`.
- **Animaciones eficientes**: Uso de Framer Motion con valores optimizados.
- **Code splitting**: Componentes cargados según necesidad.

## 🔍 SEO

- **Estructura semántica**: Uso correcto de H1, H2, H3 para jerarquía.
- **Metadatos**: Título y descripción optimizados (implementados en los datos mock).
- **Imágenes accesibles**: Todas las imágenes incluyen atributos `alt`.
- **Breadcrumbs**: Estructura de navegación clara (en datos mock).

## 💰 Optimización de Conversión

- **CTAs estratégicos**: Botones de acción ubicados en puntos clave.
- **Social proof**: Testimonios cerca de puntos de decisión.
- **Reducción de fricción**: Formularios simples, navegación intuitiva.
- **Microinteracciones**: Feedback visual en interacciones del usuario.

## 🧪 Testing

Se incluye un archivo `test.tsx` con pruebas básicas para los componentes principales. Para ejecutar estas pruebas se necesitaría configurar Jest o Vitest con React Testing Library.

## 📦 Datos Mock

Los datos de ejemplo se encuentran en `src/lib/course/mock-data.ts` y siguen la estructura definida en `src/lib/course/schema.ts`. Estos datos incluyen:

- Cursos
- Rutas de aprendizaje
- Perfiles de aprendizaje
- Planes de suscripción
- Progreso de usuario
- Herramientas externas
- Artículos y tendencias
- Testimonios

## 🔄 Próximos Pasos

1. Implementar funcionalidad real de búsqueda
2. Conectar con API para datos dinámicos
3. Implementar sistema de autenticación
4. Añadir analíticas para tracking de conversión
5. Implementar A/B testing en CTAs principales
