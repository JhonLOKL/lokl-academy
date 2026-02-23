"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import { consumePostLoginRedirect, setPostLoginRedirect } from "@/lib/auth-utils";
import { Button } from "@/components/design-system";
import { Input } from "@/components/design-system";
import { FormField } from "@/components/design-system";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from "@/components/design-system";
import { Cookie } from "lucide-react";
import { urls } from "@/config/urls";
import { AuthLayout } from "./auth-layout";
import { cn } from "@/lib/utils";

// URL base del dashboard, usar variable de entorno o fallback

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const navigatedRef = useRef(false);
  const { login, error, isLoading, clearError, user } = useAuthStore();

  // Detección de cookies
  const [showCookieWarning, setShowCookieWarning] = useState(false);

  useEffect(() => {
    // Verificar si las cookies están habilitadas
    if (typeof navigator !== 'undefined' && !navigator.cookieEnabled) {
      setShowCookieWarning(true);
    }
  }, []);

  // Imágenes para el hero móvil
  const mobileHeroImages = [
    "https://lokl-assets.s3.us-east-1.amazonaws.com/home/Hero-indie-movil.png",
    "https://lokl-assets.s3.us-east-1.amazonaws.com/home/Hero-nido-movil.png"
  ];

  // Imágenes para el hero desktop
  const desktopHeroImages = [
    "https://lokl-assets.s3.us-east-1.amazonaws.com/home/HeroLoklPage/IMG_ALDEA.png",
    "https://lokl-assets.s3.us-east-1.amazonaws.com/home/HeroLoklPage/IMG_INDIE.png",
    "https://lokl-assets.s3.us-east-1.amazonaws.com/home/HeroLoklPage/IMG_NDA.png"
  ];

  // Si viene ?redirect en la URL, guardarlo para post-login
  useEffect(() => {
    const redirectParam = searchParams.get("redirect");
    if (redirectParam) {
      setPostLoginRedirect(redirectParam);
    }
  }, [searchParams]);

  // Redirigir si ya está autenticado (respeta redirect almacenado o de la URL)
  useEffect(() => {
    if (user && !navigatedRef.current) {
      // Si el usuario ya está autenticado, redirigir al dashboard o a la página objetivo
      // Esto evita que usuarios logueados vean la pantalla de login
      const target = consumePostLoginRedirect() || searchParams.get("redirect") || "/dashboard";
      navigatedRef.current = true;
      router.push(target);
    }
  }, [user, router, searchParams]);

  // Estados para los campos del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estado para errores de validación
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  // Función para validar el formulario
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!email) {
      errors.email = "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "El correo electrónico no es válido";
    }

    if (!password) {
      errors.password = "La contraseña es obligatoria";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const success = await login(email, password);

    if (success) {
      const target = consumePostLoginRedirect() || searchParams.get("redirect") || "/dashboard";
      if (!navigatedRef.current) {
        navigatedRef.current = true;
        router.push(target);
      }
    } else {
      setShowErrorDialog(true);
    }
  };

  // Función para cerrar el diálogo de error
  const handleCloseErrorDialog = () => {
    setShowErrorDialog(false);
    clearError();
  };

  return (
    <div className="relative min-h-screen w-full bg-white">
      <AuthLayout
        title="¡Hola de nuevo!"
        subtitle="Accede a tu cuenta de LOKL Academy para continuar aprendiendo."
        imageSide="left"
        desktopImages={desktopHeroImages}
        mobileImages={mobileHeroImages}
      >
        {/* Aviso de cookies deshabilitadas */}
        {showCookieWarning && (
          <div className="mb-6 w-full rounded-lg bg-amber-50 p-4 border border-amber-200 shadow-sm relative animate-in fade-in slide-in-from-top-4">
            <button 
              onClick={() => setShowCookieWarning(false)}
              className="absolute top-2 right-2 text-amber-500 hover:text-amber-700"
            >
              ×
            </button>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-100 rounded-full shrink-0 text-amber-600">
                <Cookie size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-amber-900 text-sm">Cookies deshabilitadas</h4>
                <p className="text-amber-800 text-xs mt-1">
                  Hemos detectado que las cookies están bloqueadas. Algunas funciones podrían limitarse.
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <FormField label="Correo electrónico" htmlFor="email">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className={cn("h-12 bg-gray-50", validationErrors.email && "border-[#FF3B30]")}
            />
            {validationErrors.email && (
              <p className="mt-1 text-sm text-[#FF3B30]">{validationErrors.email}</p>
            )}
          </FormField>

          {/* Contraseña */}
          <FormField label="Contraseña" htmlFor="password">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Contraseña</label>
              <Link href={`${urls.DASHBOARD_URL}/reset-password`} className="text-xs font-medium text-[#5352F6] hover:text-[#3D3BF3] transition-colors">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña"
              className={cn("h-12 bg-gray-50", validationErrors.password && "border-[#FF3B30]")}
            />
            {validationErrors.password && (
              <p className="mt-1 text-sm text-[#FF3B30]">{validationErrors.password}</p>
            )}
          </FormField>

          {/* Botón de inicio de sesión */}
          <Button
            type="submit"
            className="w-full h-12 text-lg font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>

          <div className="text-center pt-4 text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link href={searchParams.get("redirect") ? `/register?redirect=${encodeURIComponent(searchParams.get("redirect") || "")}` : "/register"} className="text-[#5352F6] font-semibold hover:underline">
              Regístrate
            </Link>
          </div>
        </form>
      </AuthLayout>

      {/* Diálogo de error */}
      <AlertDialog open={showErrorDialog} onOpenChange={handleCloseErrorDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Error de inicio de sesión</AlertDialogTitle>
            <AlertDialogDescription>
              {error || "Credenciales incorrectas. Por favor, verifica tu correo y contraseña."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="mt-4 flex justify-end">
            <Button onClick={handleCloseErrorDialog}>Aceptar</Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
