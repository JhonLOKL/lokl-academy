"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/auth-store";

export default function SessionInitializer() {
  const { user, fetchUserProfile, logout } = useAuthStore();
  const initialized = useRef(false);

  useEffect(() => {
    // Evitar doble ejecución en modo estricto de desarrollo
    if (initialized.current) return;
    initialized.current = true;

    // Función para validar la sesión
    const validateSession = async () => {
      // Si no tenemos usuario en el estado, intentamos obtenerlo del backend
      // El backend usará la cookie HttpOnly si existe
      if (!user) {
        try {
          // Intentamos obtener el perfil.
          // fetchUserProfile maneja internamente:
          // 1. Éxito: actualiza el store con el usuario
          // 2. Error 401/403: limpia el estado (logout)
          await fetchUserProfile();
        } catch (error) {
          console.error("Error validando sesión:", error);
          // Si falla catastróficamente, mejor limpiar para evitar estados inconsistentes
          logout();
        }
      } else {
        // Si tenemos usuario pero la cookie fue eliminada en otro dominio,
        // el siguiente request fallará con 401/403 y se limpiará automáticamente.
        // Pero también limpiamos cualquier token residual en localStorage aquí
        // para asegurar consistencia en SSO multi-dominio
        if (typeof window !== 'undefined') {
          try {
            const storageKey = 'lokl-auth-storage';
            const stored = localStorage.getItem(storageKey);
            if (stored) {
              const parsed = JSON.parse(stored);
              // Si existe un token en localStorage pero no debería estar ahí (SSO con cookies),
              // lo eliminamos para mantener consistencia
              if (parsed.state?.token) {
                parsed.state.token = null;
                localStorage.setItem(storageKey, JSON.stringify(parsed));
              }
            }
          } catch (e) {
            // Silenciar errores de parsing, no es crítico
          }
        }
      }
    };

    // Ejecutar validación
    validateSession();
    
    // Configurar un intervalo para re-validar periódicamente (opcional, ej: cada 15 min)
    // O simplemente confiar en que los errores 401 en otras peticiones cerrarán la sesión
    
  }, [user, fetchUserProfile, logout]);

  // Este componente no renderiza nada visualmente
  return null;
}
