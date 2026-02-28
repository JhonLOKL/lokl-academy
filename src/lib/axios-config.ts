import axios from 'axios';
import { useAuthStore } from '@/store/auth-store';

// Rutas de autenticación que NO deben disparar auto-logout en 401/403
// (para evitar bucles: login falla → logout → logout falla → logout ...)
const AUTH_ROUTES = ['/api/auth/signIn', '/api/auth/signUp', '/api/auth/logout'];

// Flag para evitar múltiples llamadas simultáneas a logout desde el interceptor
let _isHandling401 = false;

// Crear una instancia de axios
const api = axios.create({
  withCredentials: true, // Habilitar envío de cookies
});

// Interceptor de solicitud
api.interceptors.request.use(
  (config) => {
    // Fallback: Añadir token si existe en el store
    // Las cookies HttpOnly son el método principal, pero si fallan o están bloqueadas,
    // el backend puede aceptar el header Authorization como respaldo.
    const token = useAuthStore.getState().token;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || '';

    // Solo manejar 401/403 si:
    // 1. No es una ruta de auth (evita bucles)
    // 2. No hay otro 401 siendo procesado (evita llamadas duplicadas a logout)
    if (
      (status === 401 || status === 403) &&
      !AUTH_ROUTES.some(route => requestUrl.includes(route)) &&
      !_isHandling401
    ) {
      _isHandling401 = true;

      // Cerrar sesión y redirigir
      useAuthStore.getState().logout().finally(() => {
        _isHandling401 = false;

        if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      });
    }

    return Promise.reject(error);
  }
);

export default api;
