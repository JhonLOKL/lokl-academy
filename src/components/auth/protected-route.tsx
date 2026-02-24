"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { isAuthenticated } from "@/lib/auth-utils";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Verificar si el usuario está autenticado
    if (!isAuthenticated()) {
      router.push("/login");
    } else {
      // Si está autenticado, ya no estamos cargando
      setIsLoading(false);
    }
  }, [user, router]);
  
  // Si no hay token válido o estamos cargando, mostrar pantalla de carga
  if (!isAuthenticated() || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Cargando...</h2>
          <p className="text-gray-500">Verificando autenticación</p>
        </div>
      </div>
    );
  }
  
  // Si hay token y no estamos cargando, renderizar los hijos
  return <>{children}</>;
}
