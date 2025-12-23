"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/store/auth-store";
import { consumePostLoginRedirect, setPostLoginRedirect } from "@/lib/auth-utils";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription
} from "@/components/design-system";
import { Button } from "@/components/design-system";
import { Input } from "@/components/design-system";
import { FormField } from "@/components/design-system";
import { H2, Paragraph, Text } from "@/components/design-system";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from "@/components/design-system";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const navigatedRef = useRef(false);
  const { login, error, isLoading, clearError, token } = useAuthStore();

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

  // Estados para controlar los índices de imágenes
  const [currentMobileImageIndex, setCurrentMobileImageIndex] = useState(0);
  const [currentDesktopImageIndex, setCurrentDesktopImageIndex] = useState(0);

  // Rotación automática de imágenes móviles cada 5 segundos
  useEffect(() => {
    if (mobileHeroImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentMobileImageIndex(
        (prev) => (prev + 1) % mobileHeroImages.length,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [mobileHeroImages.length]);

  // Rotación automática de imágenes desktop cada 5 segundos
  useEffect(() => {
    if (desktopHeroImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentDesktopImageIndex(
        (prev) => (prev + 1) % desktopHeroImages.length,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [desktopHeroImages.length]);

  // Si viene ?redirect en la URL, guardarlo para post-login
  useEffect(() => {
    const redirectParam = searchParams.get("redirect");
    if (redirectParam) {
      setPostLoginRedirect(redirectParam);
    }
  }, [searchParams]);

  // Redirigir si ya está autenticado (respeta redirect almacenado o de la URL)
  useEffect(() => {
    if (token && !navigatedRef.current) {
      const target = consumePostLoginRedirect() || searchParams.get("redirect") || "/";
      navigatedRef.current = true;
      router.push(target);
    }
  }, [token, router, searchParams]);

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
      const target = consumePostLoginRedirect() || searchParams.get("redirect") || "/";
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
    <div className="relative min-h-screen w-full">
      {/* Fondo */}
      <div className="absolute inset-0 z-0">
        {/* Fondo Desktop */}
        <div className="hidden md:block absolute inset-0 overflow-hidden">
          {desktopHeroImages.map((imageUrl, index) => (
            <div
              key={index}
              aria-hidden="true"
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentDesktopImageIndex
                  ? "opacity-100"
                  : "opacity-0"
                }`}
            >
              <Image
                src={imageUrl}
                alt={`LOKL Academy - Iniciar sesión desktop ${index + 1}`}
                fill
                className="object-cover object-center"
                priority={true}
                quality={90}
              />
            </div>
          ))}
        </div>

        {/* Fondo Móvil */}
        <div className="md:hidden absolute inset-0 overflow-hidden">
          {mobileHeroImages.map((imageUrl, index) => (
            <div
              key={index}
              aria-hidden="true"
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentMobileImageIndex
                  ? "opacity-100"
                  : "opacity-0"
                }`}
            >
              <Image
                src={imageUrl}
                alt={`LOKL Academy - Iniciar sesión móvil ${index + 1}`}
                fill
                className="object-cover object-center"
                priority={true}
                quality={90}
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-16">
        <Card className="mx-auto max-w-md backdrop-blur-sm bg-white/95 shadow-xl">
          <CardHeader>
            <CardTitle>
              <H2 variant="section" className="text-center">
                Iniciar sesión
              </H2>
            </CardTitle>
            <CardDescription>
              <Paragraph variant="lead" color="muted" className="text-center">
                Accede a tu cuenta de LOKL Academy
              </Paragraph>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <FormField label="Correo electrónico" htmlFor="email">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className={validationErrors.email ? "border-[#FF3B30]" : ""}
                />
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-[#FF3B30]">{validationErrors.email}</p>
                )}
              </FormField>

              {/* Contraseña */}
              <FormField label="Contraseña" htmlFor="password">
                <div className="flex items-center justify-between">
                  <Link href="https://dashboard.lokl.life/reset-password" className="text-sm text-[#5352F6] hover:underline">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tu contraseña"
                  className={validationErrors.password ? "border-[#FF3B30]" : ""}
                />
                {validationErrors.password && (
                  <p className="mt-1 text-sm text-[#FF3B30]">{validationErrors.password}</p>
                )}
              </FormField>

              {/* Botón de inicio de sesión */}
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center">
            <Text>
              ¿No tienes una cuenta?{" "}
              <Link href={searchParams.get("redirect") ? `/register?redirect=${encodeURIComponent(searchParams.get("redirect") || "")}` : "/register"} className="text-[#5352F6] hover:underline">
                Regístrate
              </Link>
            </Text>
          </CardFooter>
        </Card>
      </div>

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
