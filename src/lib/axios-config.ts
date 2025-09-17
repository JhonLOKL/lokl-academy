import axios from 'axios';
import { useAuthStore } from '@/store/auth-store';

// Crear una instancia de axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token a las solicitudes
api.interceptors.request.use(
  (config) => {
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
    // Si el error es 401 (No autorizado) o 403 (Forbidden), cerrar sesión
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      useAuthStore.getState().logout();
      
      // Redirigir a la página de inicio de sesión si estamos en el navegador
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
