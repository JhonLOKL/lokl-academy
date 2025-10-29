# 🔴 Análisis Crítico: TBT 4370ms (Total Blocking Time)

## 🎯 **¿Qué es TBT?**

**Total Blocking Time (TBT)** mide cuánto tiempo el navegador está "bloqueado" ejecutando JavaScript y **NO puede responder** a interacciones del usuario.

**Síntomas:**
- 🐌 Página se siente trabada/lenta
- ⏳ Scroll no fluido
- 🚫 Botones/menús no responden inmediatamente
- 😰 Experiencia frustrante para el usuario

**Tu TBT:** 4370ms (CRÍTICO)
**Objetivo:** < 200ms
**Problema:** Estás **21x por encima** del límite

---

## 🔍 **CAUSAS PRINCIPALES EN TU APLICACIÓN**

### **1️⃣ RECHARTS (Librería de Gráficos) - CULPABLE #1**

```json
"recharts": "^2.15.4"  // ⚠️ ~450KB minified + gzipped
```

**Problema:**
- Recharts es una librería **MUY PESADA**
- Solo se usa en `Phase3Summary` (resultados finales del simulador)
- Se está cargando en el bundle principal, bloqueando TODA la página

**Impacto estimado:** 🔴 **-1500-2000ms de TBT**

**Solución URGENTE:**
```typescript
// En src/components/simulator/phases/results-final.tsx
// Lazy load Recharts
import dynamic from 'next/dynamic';

const BarChart = dynamic(
  () => import('recharts').then(mod => mod.BarChart),
  { ssr: false }
);

const ResponsiveContainer = dynamic(
  () => import('recharts').then(mod => mod.ResponsiveContainer),
  { ssr: false }
);

// ... otros componentes de Recharts
```

**Alternativa mejor:**
- Considerar **Chart.js** (más ligero ~150KB)
- O **Victory Charts** (~200KB)
- O simplemente usar **SVG personalizado** (0KB adicionales)

---

### **2️⃣ RADIX UI (25+ Componentes) - CULPABLE #2**

```json
// En package.json:
"@radix-ui/react-accordion": "^1.2.12",
"@radix-ui/react-alert-dialog": "^1.1.15",
"@radix-ui/react-dialog": "^1.1.15",
"@radix-ui/react-dropdown-menu": "^2.1.16",
// ... 20+ más
```

**Problema:**
- Tienes **25+ componentes** de Radix UI instalados
- Cada uno agrega ~20-50KB al bundle
- Total estimado: **~800KB-1.2MB**
- Muchos probablemente NO los usas

**Impacto estimado:** 🔴 **-800-1200ms de TBT**

**Solución URGENTE:**
```bash
# 1. Analizar qué componentes realmente usas
npm run build

# 2. Desinstalar los que NO usas
# Ejemplo, si no usas menubar:
npm uninstall @radix-ui/react-menubar

# 3. Asegurar tree-shaking correcto
# En tu componente, importar específicamente:
import { Select } from '@radix-ui/react-select';
// NO: import * as Select from '@radix-ui/react-select';
```

**Lista de componentes que probablemente NO usas:**
- ❓ `react-menubar` (¿lo usas?)
- ❓ `react-context-menu` (¿lo usas?)
- ❓ `react-hover-card` (¿lo usas?)
- ❓ `react-toggle-group` (¿lo usas?)
- ❓ `react-resizable-panels` (¿lo usas?)

---

### **3️⃣ FRAMER MOTION (Animaciones) - CULPABLE #3**

```json
"framer-motion": "^12.23.12"  // ⚠️ ~200KB minified
```

**Problema:**
- Framer Motion es pesado
- Si lo usas para animaciones simples, es overkill
- Bloquea el hilo principal durante animaciones

**Impacto estimado:** 🟡 **-400-600ms de TBT**

**Solución:**
```typescript
// Opción 1: Lazy load Framer Motion
import dynamic from 'next/dynamic';

const AnimatedComponent = dynamic(
  () => import('./animated-component'),
  { ssr: false }
);

// Opción 2: Reemplazar con CSS animations
// En lugar de:
<motion.div animate={{ x: 100 }}>

// Usar:
<div className="animate-slide-in">
// Con Tailwind:
@keyframes slide-in {
  from { transform: translateX(0); }
  to { transform: translateX(100px); }
}
```

---

### **4️⃣ SIMULADOR NO LAZY LOADED - CULPABLE #4**

```typescript
// src/sections/home/home-page-client.tsx
import Simulator from "@/components/simulator/simulator";

// ❌ Se carga TODO el simulador al cargar la página
// Aunque el usuario NO lo vea hasta hacer scroll
```

**Problema:**
- El simulador es PESADO (Recharts, forms, validaciones)
- Se carga inmediatamente al cargar la página
- Debería cargarse solo cuando el usuario lo necesita

**Impacto estimado:** 🔴 **-800-1200ms de TBT**

**Solución INMEDIATA:**
```typescript
// src/sections/home/home-page-client.tsx
const Simulator = dynamic(
  () => import("@/components/simulator/simulator"),
  {
    loading: () => <SimulatorSkeleton />,
    ssr: false
  }
);
```

**O mejor aún, lazy load cuando entre en viewport:**
```typescript
const SimulatorLazy = dynamic(
  () => import("@/components/simulator/simulator"),
  { ssr: false }
);

export default function HomePageClient() {
  const [showSimulator, setShowSimulator] = useState(false);
  const simulatorRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowSimulator(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (simulatorRef.current) {
      observer.observe(simulatorRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ... otras secciones ... */}
      
      <div ref={simulatorRef}>
        {showSimulator ? <SimulatorLazy /> : <SimulatorSkeleton />}
      </div>
    </>
  );
}
```

---

### **5️⃣ ZUSTAND STORES - CULPABLE MENOR**

```typescript
// Múltiples stores se inicializan al cargar
import { useSimulatorStore } from "@/store/simulator-store";
import { useAuthStore } from "@/store/auth-store";
import { useUtmStore } from "@/store/utm-store";
import { useProjectStore } from "@/store/project-store";
```

**Problema:**
- Cada store se inicializa inmediatamente
- Los selectores pueden causar re-renders

**Impacto estimado:** 🟢 **-100-200ms de TBT**

**Solución:**
```typescript
// Usar selectores específicos en lugar de todo el store
// ❌ MAL:
const { user, projects, simulationData, ...everything } = useStore();

// ✅ BIEN:
const user = useStore(state => state.user);
const projects = useStore(state => state.projects);
```

---

### **6️⃣ SWIPER (Carruseles) - CULPABLE MENOR**

```json
"swiper": "^11.2.10"  // ⚠️ ~150KB
```

**Problema:**
- Swiper es pesado para carruseles simples
- Si solo lo usas en testimonios, puede ser overkill

**Impacto estimado:** 🟢 **-200-300ms de TBT**

**Solución:**
```typescript
// Lazy load Swiper solo donde se usa
const Testimonials = dynamic(
  () => import('@/components/testimonials'),
  { ssr: false }
);
```

---

### **7️⃣ REACT HOOK FORM - NECESARIO PERO OPTIMIZABLE**

```json
"react-hook-form": "^7.62.0"
```

**Problema:**
- Necesario para el simulador
- Pero se carga incluso si el usuario no lo usa

**Impacto estimado:** 🟢 **-100-150ms de TBT**

**Solución:**
Ya cubierto con el lazy load del simulador.

---

## 📊 **RESUMEN DE IMPACTO**

| Culpable | TBT Impacto | Prioridad | Dificultad |
|----------|-------------|-----------|------------|
| **Recharts** | -1500-2000ms | 🔴 CRÍTICA | Fácil |
| **Simulador no lazy** | -800-1200ms | 🔴 CRÍTICA | Fácil |
| **Radix UI (exceso)** | -800-1200ms | 🔴 CRÍTICA | Media |
| **Framer Motion** | -400-600ms | 🟡 ALTA | Media |
| **Swiper** | -200-300ms | 🟢 MEDIA | Fácil |
| **Zustand** | -100-200ms | 🟢 BAJA | Fácil |

**Total potencial de mejora:** -3800-5500ms
**TBT actual:** 4370ms
**TBT objetivo:** < 500ms ✅

---

## ✅ **PLAN DE ACCIÓN INMEDIATO**

### **FASE 1: Quick Wins (30 minutos)**

```bash
# 1. Lazy load del simulador
# Editar: src/sections/home/home-page-client.tsx
const Simulator = dynamic(
  () => import("@/components/simulator/simulator"),
  { ssr: false }
);

# 2. Lazy load de Recharts
# Editar: src/components/simulator/phases/results-final.tsx
const BarChart = dynamic(
  () => import('recharts').then(mod => mod.BarChart),
  { ssr: false }
);
```

**Mejora esperada:** -2000-3000ms TBT ✅

---

### **FASE 2: Limpieza de Dependencias (1 hora)**

```bash
# 1. Analizar bundle
npm install --save-dev @next/bundle-analyzer

# 2. Identificar Radix UI components no usados
# Buscar en todo el proyecto:
grep -r "react-menubar" src/
grep -r "react-context-menu" src/
# Si no hay resultados, desinstalar

# 3. Desinstalar los no usados
npm uninstall @radix-ui/react-menubar
npm uninstall @radix-ui/react-context-menu
# ... etc
```

**Mejora esperada:** -800-1200ms TBT ✅

---

### **FASE 3: Optimizar Animaciones (30 minutos)**

```typescript
// Reemplazar Framer Motion con CSS animations
// En componentes simples que solo necesitan fade-in/slide

// ANTES:
import { motion } from 'framer-motion';
<motion.div animate={{ opacity: 1 }}>

// DESPUÉS:
<div className="animate-fade-in">

// Tailwind config:
animation: {
  'fade-in': 'fadeIn 0.3s ease-in',
}
```

**Mejora esperada:** -400-600ms TBT ✅

---

## 🎯 **RESULTADO FINAL ESPERADO**

### **Con TODAS las optimizaciones:**

| Métrica | Antes | Después | Mejora |
|---------|-------|---------|--------|
| **TBT** | 4370ms | **370-570ms** | **-3800ms** ✅ |
| **FCP** | 23.1s | **8-12s** | **-11-15s** ✅ |
| **LCP** | 73.7s | **20-30s** | **-43-53s** ✅ |
| **Bundle** | ~2MB | **~800KB** | **-1.2MB** ✅ |

---

## 🔥 **PRIORIDAD MÁXIMA**

### **1. Lazy Load del Simulador (AHORA)**
```typescript
// src/sections/home/home-page-client.tsx
const Simulator = dynamic(() => import("@/components/simulator/simulator"), { ssr: false });
```

### **2. Lazy Load de Recharts (AHORA)**
```typescript
// src/components/simulator/phases/results-final.tsx
const BarChart = dynamic(() => import('recharts').then(m => m.BarChart), { ssr: false });
```

### **3. Analizar Bundle (HOY)**
```bash
npm install --save-dev @next/bundle-analyzer
ANALYZE=true npm run build
```

---

## 📝 **NOTA IMPORTANTE**

**NO es culpa de blogs/cursos para SEO:**
- Los metadatos son solo texto (negligible)
- El problema es **JavaScript bloqueante**
- Los 3 culpables principales:
  1. **Recharts** (gráficos)
  2. **Simulador no lazy**
  3. **Radix UI excesivo**

**Prioriza:**
1. ✅ Lazy load simulador
2. ✅ Lazy load Recharts
3. ✅ Limpiar dependencias no usadas

**Con estas 3 acciones, TBT bajará de 4370ms a ~800-1200ms.** 🎯

---

**Última actualización:** Octubre 2025
**Urgencia:** 🔴 CRÍTICA
**Tiempo estimado:** 2-3 horas para implementar todo
**ROI:** Mejora de 80% en TBT

