# 🚀 Guía de Optimización de Performance - LOKL Academy

## 📊 Estado Actual

### Métricas Actuales (Móvil):
- 🔴 **FCP (First Contentful Paint):** 23.1s → Objetivo: < 1.8s
- 🔴 **LCP (Largest Contentful Paint):** 73.7s → Objetivo: < 2.5s
- 🔴 **TBT (Total Blocking Time):** 4370ms → Objetivo: < 200ms
- 🔴 **Speed Index:** 29.7s → Objetivo: < 3.4s
- 🟢 **SEO:** 100/100 ✅

---

## ✅ Optimizaciones Implementadas

### 1. **Next.js Config Optimizations**
```typescript
// next.config.ts
- ✅ Habilitado AVIF y WebP para imágenes
- ✅ Configurado cache TTL de 1 año
- ✅ Optimizado tamaños de dispositivo
- ✅ Habilitado SWC minify
- ✅ Habilitado compresión
- ✅ Eliminación de console.log en producción
```

### 2. **Scripts de Terceros**
```typescript
// src/app/layout.tsx
- ✅ GTM movido a 'lazyOnload' (no bloquea renderizado)
- ✅ Google Analytics movido a 'lazyOnload'
- ✅ Preconnect a recursos externos críticos
- ✅ DNS-prefetch para analytics
```

### 3. **Optimización de Fuentes**
```typescript
- ✅ Display: 'swap' (evita FOIT)
- ✅ Preload habilitado
- ✅ Variable CSS para mejor performance
```

### 4. **Optimización de Imágenes**
```typescript
- ✅ Prop 'sizes' agregado a LazyImage
- ✅ Quality diferenciado (90 priority, 75 lazy)
- ✅ Width/height explícitos en hero
- ✅ Formato AVIF/WebP automático
```

---

## 🔧 Optimizaciones Adicionales Requeridas

### **CRÍTICO 1: Reducir JavaScript Bundle**

#### Problema:
El TBT de 4370ms indica que hay demasiado JavaScript bloqueando el hilo principal.

#### Soluciones:

**A) Análisis del Bundle**
```bash
# Instalar analyzer
npm install @next/bundle-analyzer

# En next.config.ts, agregar:
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Analizar
ANALYZE=true npm run build
```

**B) Code Splitting Agresivo**
```typescript
// Lazy load componentes pesados
import dynamic from 'next/dynamic';

// Ejemplo: Simulator
const SimulatorRedesigned = dynamic(
  () => import('@/components/simulator/simulator-redesigned'),
  { 
    loading: () => <SimulatorSkeleton />,
    ssr: false // Si no necesita SSR
  }
);

// Ejemplo: Charts (Recharts es pesado)
const ChartComponent = dynamic(
  () => import('@/components/charts/bar-chart'),
  { ssr: false }
);

// Ejemplo: FAQs
const FAQ = dynamic(() => import('@/components/landing/new-home/faq'));
```

**C) Identificar y Reducir Dependencias Pesadas**
```bash
# Ver tamaño de dependencias
npm install -g webpack-bundle-analyzer
npm run build

# Alternativas ligeras:
- Recharts (pesado) → Considerar Chart.js o Victory
- date-fns → day.js (más ligero)
- lodash → lodash-es + tree-shaking
```

---

### **CRÍTICO 2: Optimizar Imágenes de S3**

#### Problema:
Las imágenes de proyectos probablemente son muy pesadas (MB en lugar de KB).

#### Soluciones:

**A) Comprimir Imágenes en S3**
```bash
# Usar herramientas:
- TinyPNG / TinyJPG
- ImageOptim (Mac)
- Squoosh (Web)

# Objetivo:
- Hero images: < 200KB (JPEG quality 80-85)
- Project cards: < 100KB
- Thumbnails: < 50KB
```

**B) Implementar CDN con Transformación**
```typescript
// Considerar CloudFlare Images o AWS CloudFront

// Ejemplo de transformación on-the-fly:
const optimizedImageUrl = (url: string, width: number) => {
  return `${CDN_URL}/${url}?w=${width}&q=80&fm=webp`;
};
```

**C) Lazy Loading Más Agresivo**
```typescript
// En LazyImage, aumentar rootMargin
const observer = new IntersectionObserver(
  (entries) => { /* ... */ },
  { rootMargin: "50px" } // Reducir de 200px a 50px
);
```

---

### **CRÍTICO 3: Implementar Resource Hints**

#### En cada página:

```typescript
// src/app/page.tsx
export const metadata = {
  // ... existing metadata
  other: {
    // Preload imagen hero crítica
    'preload-image': '<link rel="preload" as="image" href="/images/hero.jpg" fetchpriority="high">',
  }
};
```

---

### **IMPORTANTE 4: Optimizar Video Hero**

#### Problema:
El video en el hero probablemente está bloqueando el renderizado.

#### Soluciones:

```typescript
// 1. Usar poster image optimizada
<video poster="/images/hero-poster.jpg" preload="none">

// 2. Lazy load el video
const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

useEffect(() => {
  // Cargar video después de que la página esté lista
  const timer = setTimeout(() => setShouldLoadVideo(true), 2000);
  return () => clearTimeout(timer);
}, []);

// 3. Considerar usar Intersection Observer
{shouldLoadVideo && (
  <video .../>
)}
```

---

### **IMPORTANTE 5: Reducir Rerenders**

#### Problema:
Componentes se están re-renderizando innecesariamente.

#### Soluciones:

```typescript
// A) Memoizar componentes pesados
import { memo } from 'react';

export const ProjectCard = memo(({ project }: Props) => {
  // ...
});

// B) Usar useMemo y useCallback
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

const handleClick = useCallback(() => {
  // handler
}, [dependencies]);

// C) Optimizar Zustand stores
// En lugar de:
const { user, projects, simulationData } = useStore();

// Hacer:
const user = useStore(state => state.user);
const projects = useStore(state => state.projects);
```

---

## 📝 Checklist de Implementación

### **Fase 1: Quick Wins (1-2 días)**
- [x] Scripts a lazyOnload
- [x] Preconnect/DNS-prefetch
- [x] Fuentes optimizadas
- [x] Next.js config optimizado
- [ ] Analizar bundle size
- [ ] Comprimir imágenes de S3 (todas < 200KB)
- [ ] Lazy load video hero

### **Fase 2: Code Splitting (2-3 días)**
- [ ] Dynamic import del Simulator
- [ ] Dynamic import de Charts
- [ ] Dynamic import de FAQs
- [ ] Dynamic import de Testimonials
- [ ] Separar vendor chunks

### **Fase 3: Optimización Avanzada (3-5 días)**
- [ ] Implementar CDN con transformación de imágenes
- [ ] Optimizar rerenders (memo, useMemo, useCallback)
- [ ] Reducir dependencias pesadas
- [ ] Implementar Service Worker para cache
- [ ] Optimizar CSS (eliminar unused)

### **Fase 4: Monitoreo (Continuo)**
- [ ] Configurar Google Lighthouse CI
- [ ] Configurar Web Vitals monitoring
- [ ] Alertas para regresiones de performance

---

## 🎯 Metas de Performance

### **Objetivo a 30 días:**
- 🟡 **FCP:** < 3.0s (mejora de 20s)
- 🟡 **LCP:** < 5.0s (mejora de 68s)
- 🟡 **TBT:** < 1000ms (mejora de 3.4s)
- 🟡 **Speed Index:** < 6.0s (mejora de 23s)

### **Objetivo a 60 días:**
- 🟢 **FCP:** < 1.8s
- 🟢 **LCP:** < 2.5s
- 🟢 **TBT:** < 200ms
- 🟢 **Speed Index:** < 3.4s

---

## 🔍 Herramientas de Diagnóstico

### **Durante Desarrollo:**
```bash
# Lighthouse local
npm install -g lighthouse
lighthouse http://localhost:3000 --view

# Bundle analyzer
ANALYZE=true npm run build

# React DevTools Profiler
# Instalar extensión y analizar rerenders
```

### **En Producción:**
```javascript
// src/lib/web-vitals.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  const body = JSON.stringify(metric);
  // Enviar a tu endpoint de analytics
  fetch('/api/analytics', {
    body,
    method: 'POST',
    keepalive: true,
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

---

## 🚨 Problemas Críticos Identificados

### 1. **Video en Hero**
- Está bloqueando el renderizado
- Considerar:
  - Poster image con lazy load
  - Formato más ligero (VP9/AV1)
  - Cargar después del FCP

### 2. **Imágenes de S3 sin Optimizar**
- Probablemente > 2MB cada una
- DEBEN ser < 200KB
- Usar CloudFlare Images o similar

### 3. **Recharts (si lo usas)**
- Librería muy pesada (~500KB)
- Considerar alternativas más ligeras
- O lazy load completo

### 4. **Radix UI**
- Genial para UX pero pesado
- Asegurar tree-shaking correcto
- Considerar cargar solo lo necesario

---

## 📚 Recursos

- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web Vitals](https://web.dev/vitals/)
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- [Image Optimization Guide](https://web.dev/fast/#optimize-your-images)

---

## 🎓 Próximos Pasos Recomendados

1. **AHORA MISMO:**
   - Comprimir todas las imágenes de S3
   - Lazy load el video del hero
   - Analizar bundle size

2. **ESTA SEMANA:**
   - Implementar dynamic imports
   - Optimizar rerenders
   - Configurar monitoring

3. **PRÓXIMAS 2 SEMANAS:**
   - Considerar CDN
   - Reducir dependencias
   - Optimizar CSS

---

**Última actualización:** Octubre 2025
**Autor:** Asistente de IA
**Prioridad:** 🔴 CRÍTICA

