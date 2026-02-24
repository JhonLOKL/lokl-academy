"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { Skeleton } from "@/components/ui/skeleton";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute: Protege rutas privadas.
 * 
 * - Espera brevemente a que Zustand hidrate desde localStorage.
 * - Si hay usuario → renderiza children inmediatamente.
 * - Si no hay usuario después de hidratar → redirige a /login.
 * - NO depende de isLoading global del store (ya no se setea en fetchUserProfile).
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [hydrated, setHydrated] = useState(false);

  // Esperar a que Zustand hidrate desde localStorage (es prácticamente instantáneo)
  useEffect(() => {
    // Zustand persist hydrates synchronously after first render
    setHydrated(true);
  }, []);

  useEffect(() => {
    // Solo redirigir después de que Zustand haya hidratado
    if (hydrated && !user) {
      router.push("/login");
    }
  }, [hydrated, user, router]);

  // Mientras Zustand hidrata, mostrar skeleton de dashboard
  if (!hydrated || !user) {
    return <ProtectedRouteSkeleton />;
  }

  return <>{children}</>;
}

/** Skeleton representativo del dashboard mientras se verifica la autenticación */
function ProtectedRouteSkeleton() {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header skeleton */}
      <div className="bg-gradient-to-r from-[#5352F6] to-[#4A4AE5] rounded-b-[45px] md:rounded-b-none pb-6 md:pb-0">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Skeleton className="h-20 w-20 rounded-full bg-white/20" />
            <div className="space-y-3 flex-1 w-full">
              <Skeleton className="h-7 w-48 bg-white/20" />
              <Skeleton className="h-4 w-64 bg-white/15" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-28 rounded-full bg-white/15" />
                <Skeleton className="h-6 w-20 rounded-full bg-white/15" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-6 w-40 mb-6" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-48 rounded-xl" />
            <Skeleton className="h-6 w-32" />
            <div className="flex gap-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-64 w-[300px] rounded-lg flex-none" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-96 rounded-xl" />
            <Skeleton className="h-48 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
