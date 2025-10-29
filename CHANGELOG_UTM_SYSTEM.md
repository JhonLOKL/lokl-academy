# Changelog - Sistema de Tracking UTM

## Fecha: 2025-10-28

### 🎯 Objetivo
Implementar un sistema global de captura y tracking de parámetros UTM que persista durante toda la sesión del usuario y se integre automáticamente con el guardado de simulaciones.

---

## ✅ Archivos Creados

### 1. **Store Global de UTM**
- 📄 `src/store/utm-store.ts`
  - Zustand store con persistencia en localStorage
  - Captura 5 parámetros: source, medium, campaign, term, content
  - Soporta ambos formatos: `utm_source` y `utmSource`
  - Métodos: `setUtmParams()`, `clearUtmParams()`, `hasUtmParams()`
  - Helper: `extractUtmParams(searchParams)`

### 2. **Componente de Tracking**
- 📄 `src/components/analytics/utm-tracker.tsx`
  - Captura automática de UTMs desde la URL
  - Ejecuta en el layout principal
  - No interfiere con la UI (invisible)
  - Mantiene UTMs existentes si no hay nuevos en URL

### 3. **Panel de Debug**
- 📄 `src/components/analytics/utm-debug-panel.tsx`
  - Visualización de UTMs capturados (solo desarrollo)
  - Panel flotante en esquina inferior derecha
  - Botones para limpiar y loguear UTMs
  - Se oculta automáticamente en producción

### 4. **Documentación**
- 📄 `src/store/README_UTM.md`
  - Documentación completa del sistema
  - Ejemplos de uso
  - Best practices
  - Guías de testing
  - Casos de uso

---

## 🔄 Archivos Modificados

### 1. **Layout Principal**
- 📝 `src/app/layout.tsx`
  - Agregado import de `UtmTracker`
  - Integrado en `<Suspense>` junto a `GAListener`
  - Captura UTMs en todas las páginas

### 2. **Schema de Simulación**
- 📝 `src/schemas/save-simulation-schema.ts`
  - Agregados 5 campos UTM opcionales en ambos schemas:
    - `SaveSimulationGuestSchema` (no autenticado)
    - `SaveSimulationAuthSchema` (autenticado)
  - Todos los campos son opcionales (no rompe schemas existentes)

### 3. **Componente SimulatorPhase1**
- 📝 `src/components/simulator/simulator-phase-1.tsx`
  - Importado `useUtmStore`
  - Extraídos UTMs del store al inicio
  - Integrados UTMs en `saveSimulation()` (usuarios autenticados)
  - Integrados UTMs en `handleLeadSubmit()` (usuarios no autenticados)

### 4. **README del Simulador**
- 📝 `src/components/simulator/README.md`
  - Agregada sección de Sistema de Tracking UTM
  - Ejemplos de integración
  - Referencias a documentación completa

---

## 🚀 Características Implementadas

### ✅ Captura Automática
- Los UTMs se capturan automáticamente al cargar cualquier página
- Funciona con ambos formatos: `utm_source` y `utmSource`
- No requiere código adicional en cada página

### ✅ Persistencia
- Guardado en `localStorage` con key `utm-storage`
- Persiste durante toda la sesión del navegador
- Se mantiene al navegar entre páginas
- Sobrevive a recargas de página

### ✅ Integración con Simulaciones

**Usuario Autenticado:**
```json
{
  "email": "user@example.com",
  "investmentValue": 5000000,
  "utmSource": "google",
  "utmMedium": "cpc",
  "utmCampaign": "verano2024"
}
```

**Usuario No Autenticado (Lead):**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "phone": "3001234567",
  "utmSource": "facebook",
  "utmMedium": "social",
  "utmCampaign": "launch"
}
```

### ✅ Formatos Soportados

| Formato Original | Formato Alternativo | Campo en Store |
|-----------------|---------------------|----------------|
| `utm_source`    | `utmSource`         | `utmSource`    |
| `utm_medium`    | `utmMedium`         | `utmMedium`    |
| `utm_campaign`  | `utmCampaign`       | `utmCampaign`  |
| `utm_term`      | `utmTerm`           | `utmTerm`      |
| `utm_content`   | `utmContent`        | `utmContent`   |

---

## 📊 Casos de Uso

### 1. **Attribution Marketing**
Identificar qué canales traen más conversiones:
```typescript
const { utmSource, utmMedium } = useUtmStore();
console.log(`Conversión desde ${utmSource} via ${utmMedium}`);
```

### 2. **ROI por Campaña**
Medir efectividad de campañas de marketing:
```typescript
// Los UTMs se guardan automáticamente con cada simulación
// Permite calcular ROI por campaña en analytics
```

### 3. **A/B Testing**
Personalizar contenido según la fuente:
```typescript
const { utmContent } = useUtmStore();
if (utmContent === "version_a") {
  return <LandingVersionA />;
}
```

### 4. **Embudos de Conversión**
Trackear el journey completo del usuario:
```
1. Click en anuncio (captura UTMs)
2. Visita landing page (UTMs persisten)
3. Navega a simulador (UTMs persisten)
4. Completa simulación (UTMs se guardan)
```

---

## 🧪 Testing

### URLs de Prueba

```bash
# Google Ads
http://localhost:3000/?utm_source=google&utm_medium=cpc&utm_campaign=brand

# Facebook Ads
http://localhost:3000/?utm_source=facebook&utm_medium=social&utm_campaign=launch

# Email Marketing
http://localhost:3000/?utm_source=newsletter&utm_medium=email&utm_campaign=monthly

# Formato Alternativo (camelCase)
http://localhost:3000/?utmSource=instagram&utmMedium=stories&utmCampaign=promo
```

### Verificación Manual

1. Abrir URL con UTMs
2. Abrir DevTools Console
3. Buscar: "UTM params capturados"
4. Verificar localStorage: `localStorage.getItem('utm-storage')`
5. Navegar a otra página
6. Confirmar que UTMs persisten

### Panel de Debug

Agregar en cualquier página (solo desarrollo):
```tsx
import UtmDebugPanel from "@/components/analytics/utm-debug-panel";

export default function Page() {
  return (
    <>
      <YourContent />
      <UtmDebugPanel />
    </>
  );
}
```

---

## 📈 Métricas Disponibles

Con este sistema puedes analizar:

- 📊 Conversiones por canal (source)
- 💰 ROI por campaña
- 🎯 Efectividad de anuncios (content)
- 🔄 Tiempo desde click hasta conversión
- 📈 Keywords que generan más interés (term)
- 🌐 Rendimiento de medios (medium)

---

## 🔒 Seguridad y Privacidad

### ✅ Seguro
- Solo almacena parámetros de marketing
- No contiene información personal
- Se limpia al limpiar navegador

### ⚠️ Consideraciones
- No usar para autenticación
- No guardar información sensible en UTMs
- Los usuarios pueden modificar localStorage
- UTMs son visibles en URLs

---

## 🎓 Documentación Adicional

### Archivos de Referencia
- 📚 `src/store/README_UTM.md` - Guía completa del sistema
- 📚 `src/components/simulator/README.md` - Integración con simulador

### Componentes Relacionados
- `useUtmStore` - Hook principal para acceder a UTMs
- `UtmTracker` - Componente de captura automática
- `UtmDebugPanel` - Panel de debugging (dev only)

---

## 🚀 Próximos Pasos (Opcionales)

### Posibles Mejoras Futuras
1. Dashboard de analytics con visualización de UTMs
2. Exportación de datos con UTMs a CSV
3. Integración con CRM (enviar UTMs junto con leads)
4. Alertas automáticas de campañas de alto rendimiento
5. Segmentación de usuarios por UTM source

---

## ✅ Checklist de Implementación

- [x] Store global de UTM con persistencia
- [x] Componente de captura automática
- [x] Integración en layout principal
- [x] Actualización de schemas
- [x] Integración en guardado de simulaciones
- [x] Soporte para ambos formatos (snake_case y camelCase)
- [x] Panel de debugging
- [x] Documentación completa
- [x] Ejemplos de uso
- [x] URLs de testing

---

## 📝 Notas Finales

- Sistema 100% funcional y listo para producción
- No rompe funcionalidad existente (campos opcionales)
- Se integra automáticamente sin configuración adicional
- Compatible con Google Analytics, Facebook Pixel, etc.
- Documentación completa disponible

---

**Desarrollado por:** LOKL Development Team  
**Fecha:** Octubre 28, 2025  
**Versión:** 1.0.0

