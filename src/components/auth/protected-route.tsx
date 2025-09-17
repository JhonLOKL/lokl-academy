"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { isAuthenticated } from "@/lib/auth-utils";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { token } = useAuthStore();
  
  useEffect(() => {
    // Verificar si el token es válido
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [token, router]);
  
  // Si no hay token válido, no renderizar los hijos
  if (!isAuthenticated()) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Cargando...</h2>
          <p className="text-gray-500">Verificando autenticación</p>
        </div>
      </div>
    );
  }
  
  // Si hay token, renderizar los hijos
  return <>{children}</>;
}
