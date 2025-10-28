# Simulador de Inversión - Documentación

## Uso del Componente

### Ejemplo Básico

```tsx
import Simulator from "@/components/simulator/simulator";

// Simulador sin proyecto preseleccionado
<Simulator simulatorName="Landing Page Principal" />
```

### Con Proyecto Preseleccionado

```tsx
import Simulator from "@/components/simulator/simulator";
import { ProjectCard } from "@/schemas/project-card-schema";

const project: ProjectCard = {
  // ... datos del proyecto
};

<Simulator 
  project={project}
  simulatorName="Simulador Detalle de Proyecto"
/>
```

## Props

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| `project` | `ProjectCard` | No | `undefined` | Proyecto preseleccionado para simular |
| `simulatorName` | `string` | No | `"Simulador General"` | Nombre del simulador para tracking y analytics |

## Ejemplos de Nombres de Simulador

Usa nombres descriptivos según la ubicación del simulador:

- `"Landing Page Principal"` - Simulador en la página principal
- `"Detalle de Proyecto"` - Simulador en la página de un proyecto específico
- `"Dashboard Usuario"` - Simulador en el dashboard del usuario
- `"Página de Precios"` - Simulador en la página de planes y precios
- `"Blog Post"` - Simulador embebido en un artículo del blog

## Flujo de Guardado de Simulación

### Usuario Autenticado

Cuando un usuario autenticado simula, se guardan automáticamente:

```typescript
{
  email: user.email,
  installments: number,
  investmentValue: number,
  name: "Nombre Completo",
  projectId: string,
  simulator: "Nombre del Simulador",
  termsAccepted: true,
  unitsQuantity: number
}
```

### Usuario No Autenticado

1. El usuario configura la simulación
2. Hace clic en "Simular"
3. Ve los resultados (blur si no está autenticado)
4. Completa el formulario de captura de leads
5. Se guarda la simulación con datos completos:

```typescript
{
  countryCodePhone: "+57",
  email: "email@example.com",
  installments: number,
  investmentValue: number,
  leadOrigin: "google" | "redes_sociales" | ...,
  name: "Nombre Completo",
  phone: "3001234567",
  projectId: string,
  simulator: "Nombre del Simulador",
  termsAccepted: true,
  unitsQuantity: number
}
```

## Analytics y Tracking

El campo `simulator` permite identificar de dónde provienen las simulaciones:

- **Conversión por fuente**: Saber qué páginas generan más simulaciones
- **A/B Testing**: Comparar diferentes ubicaciones del simulador
- **Embudos de conversión**: Trackear el journey del usuario
- **ROI por canal**: Identificar canales más efectivos

## Características

- ✅ Selección de proyecto (o preselección vía props)
- ✅ Configuración de monto de inversión (slider)
- ✅ Configuración de número de cuotas (select)
- ✅ Cálculo de simulación en tiempo real
- ✅ Captura de leads para usuarios no autenticados
- ✅ Validación de teléfonos internacionales
- ✅ Blur de resultados hasta completar formulario
- ✅ Guardado automático de simulaciones
- ✅ Integración con Zustand para estado global
- ✅ Caching de proyectos disponibles

## Estados Globales (Zustand)

### `useSimulatorStore`

Maneja el estado de la simulación:

- `selectedProject`: Proyecto seleccionado
- `investmentAmount`: Monto de inversión
- `installments`: Número de cuotas
- `availableProjects`: Proyectos disponibles
- `isLoadingProjects`: Estado de carga
- `projectsError`: Errores de carga

### `useAuthStore`

Verifica autenticación del usuario:

- `user`: Datos del usuario autenticado
- Si `user` existe → guardar con datos básicos
- Si `user` es null → mostrar formulario de lead

## API Endpoints

### POST `/api/simulator/createSimulation`

Crea una nueva simulación y retorna los resultados.

**Body:**
```json
{
  "projectId": "uuid",
  "investmentValue": 5000000,
  "installmentsNumber": 12
}
```

### POST `/api/simulator/saveSimulation`

Guarda la simulación en la base de datos.

**Body (autenticado):**
```json
{
  "email": "user@example.com",
  "installments": 12,
  "investmentValue": 5000000,
  "name": "Juan Pérez",
  "projectId": "uuid",
  "simulator": "Landing Page Principal",
  "termsAccepted": true,
  "unitsQuantity": 2.5
}
```

**Body (no autenticado):**
```json
{
  "countryCodePhone": "+57",
  "email": "lead@example.com",
  "installments": 12,
  "investmentValue": 5000000,
  "leadOrigin": "google",
  "name": "Juan Pérez",
  "phone": "3001234567",
  "projectId": "uuid",
  "simulator": "Landing Page Principal",
  "termsAccepted": true,
  "unitsQuantity": 2.5
}
```

## Schemas

Todos los schemas están definidos en:

- `src/schemas/simulator-schema.ts` - Simulación y resultados
- `src/schemas/save-simulation-schema.ts` - Guardado de simulación
- `src/schemas/project-card-schema.ts` - Proyectos
- `src/schemas/lead-schema.ts` - Captura de leads

## Sistema de Tracking UTM

El simulador incluye tracking automático de parámetros UTM:

### Captura Automática

Los UTMs se capturan automáticamente de la URL:

```
https://lokl.life/?utm_source=google&utm_medium=cpc&utm_campaign=verano2024
```

### Persistencia

- ✅ Se guardan en `localStorage`
- ✅ Se mantienen durante toda la sesión
- ✅ Persisten al navegar entre páginas
- ✅ Se incluyen automáticamente al guardar simulaciones

### Formatos Soportados

El sistema acepta **ambos formatos**:

```
utm_source o utmSource
utm_medium o utmMedium
utm_campaign o utmCampaign
utm_term o utmTerm
utm_content o utmContent
```

### Integración en Simulaciones

Al guardar una simulación, los UTMs se incluyen automáticamente:

```json
{
  "email": "user@example.com",
  "projectId": "uuid",
  "investmentValue": 5000000,
  "utmSource": "google",
  "utmMedium": "cpc",
  "utmCampaign": "verano2024",
  "utmTerm": "inversion inmobiliaria",
  "utmContent": "banner_principal"
}
```

### Debugging (Solo Desarrollo)

Para ver los UTMs capturados, agregar en cualquier página:

```tsx
import UtmDebugPanel from "@/components/analytics/utm-debug-panel";

<UtmDebugPanel />
```

### Documentación Completa

Ver: `src/store/README_UTM.md`

