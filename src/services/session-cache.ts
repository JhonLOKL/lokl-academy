/**
 * Módulo de Cache de Sesión
 * 
 * Optimiza el rendimiento evitando llamadas API duplicadas:
 * - Cache en memoria con TTL configurable (default: 30 segundos)
 * - Deduplicación de peticiones in-flight: si ya hay una petición en proceso
 *   para la misma key, devuelve la misma promesa en vez de lanzar otra
 * - Función clearSessionCache() para limpiar al hacer logout
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// Cache en memoria: almacena datos ya resueltos con su timestamp
const cache = new Map<string, CacheEntry<unknown>>();

// Peticiones en vuelo: almacena promesas pendientes para deduplicación
const inFlight = new Map<string, Promise<unknown>>();

// TTL por defecto: 30 segundos
const DEFAULT_TTL_MS = 30_000;

/**
 * Obtiene datos del cache o ejecuta el fetcher si no hay datos válidos.
 * Si ya hay una petición en vuelo para la misma key, devuelve esa promesa.
 * 
 * @param key - Clave única para identificar el recurso (ej: "user-profile", "dashboard-projects")
 * @param fetcher - Función que realiza la llamada API real
 * @param ttl - Tiempo de vida del cache en milisegundos (default: 30s)
 * @returns Los datos del recurso
 */
export async function cachedFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = DEFAULT_TTL_MS
): Promise<T> {
  // 1. Verificar si hay datos en cache que aún son válidos
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data as T;
  }

  // 2. Verificar si ya hay una petición en vuelo para esta key
  const existing = inFlight.get(key);
  if (existing) {
    return existing as Promise<T>;
  }

  // 3. No hay cache ni petición en vuelo: ejecutar el fetcher
  const promise = fetcher()
    .then((data) => {
      // Guardar en cache con timestamp
      cache.set(key, { data, timestamp: Date.now() });
      // Limpiar de in-flight
      inFlight.delete(key);
      return data;
    })
    .catch((error) => {
      // En caso de error, limpiar de in-flight para permitir reintentos
      inFlight.delete(key);
      throw error;
    });

  // Registrar como in-flight
  inFlight.set(key, promise);

  return promise;
}

/**
 * Invalida una entrada específica del cache.
 * Útil cuando se sabe que los datos cambiaron (ej: después de actualizar perfil).
 * 
 * @param key - Clave del recurso a invalidar
 */
export function invalidateCache(key: string): void {
  cache.delete(key);
  // No cancelamos in-flight porque la promesa ya fue entregada a consumidores
}

/**
 * Limpia TODO el cache de sesión y peticiones en vuelo.
 * DEBE llamarse en logout() para evitar que datos viejos se muestren
 * si el usuario inicia sesión con otra cuenta.
 */
export function clearSessionCache(): void {
  cache.clear();
  inFlight.clear();
}

// Claves de cache predefinidas para uso consistente en toda la app
export const CACHE_KEYS = {
  USER_PROFILE: 'user-profile',
  DASHBOARD_PROJECTS: 'dashboard-projects',
  USER_REFERRALS: 'user-referrals',
  USER_COURSES: 'user-courses',
} as const;
