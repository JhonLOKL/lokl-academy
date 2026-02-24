"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/auth-store";

/**
 * SessionInitializer: Componente no-visual que valida la sesión al iniciar la app.
 * 
 * - Si no hay usuario en el store, intenta recuperarlo del backend (via cookie HttpOnly).
 * - Si la cookie no es válida, el 401 se maneja en el interceptor global (axios-config).
 * - fetchUserProfile() usa el cache de sesión, por lo que llamadas duplicadas
 *   desde otros componentes no generan peticiones HTTP adicionales.
 */
export default function SessionInitializer() {
  const { user, fetchUserProfile } = useAuthStore();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    if (!user) {
      // Intentar recuperar sesión desde cookie HttpOnly.
      // No necesita try/catch: los errores 401 los maneja el interceptor global.
      // fetchUserProfile usa cache, así que es seguro si otros componentes también lo llaman.
      fetchUserProfile();
    }
  }, [user, fetchUserProfile]);

  return null;
}
