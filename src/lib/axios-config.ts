import axios from 'axios';
import { useAuthStore } from '@/store/auth-store';

// Crear una instancia de axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  withCredentials: true, // Habilitar envío de cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de solicitud (ya no se añade el token manual)
api.interceptors.request.use(
  (config) => {
    // Ya no es necesario añadir Authorization: Bearer token
    // Las cookies HttpOnly se encargan de la autenticación
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el error es 401 (No autorizado) o 403 (Forbidden), cerrar sesión
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Evitar bucle infinito si la llamada de logout falla
      // Solo llamar a logout si no estamos ya en proceso de logout o login
      // Pero authStore.logout() es síncrono y limpia el estado local
      useAuthStore.getState().logout();
      
      // Redirigir a la página de inicio de sesión si estamos en el navegador
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
