"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/store/auth-store";
import { consumePostLoginRedirect } from "@/lib/auth-utils";
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
  const { login, error, isLoading, clearError, token } = useAuthStore();
  
  // Redirigir si ya está autenticado
  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token, router]);
  
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
      const target = consumePostLoginRedirect() || "/";
      router.push(target);
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
        <Image
          src="/images/buildings-bw.jpg"
          alt="LOKL Academy - Iniciar sesión"
          fill
          className="object-cover grayscale"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#5352F6]/90 via-[#5352F6]/60 to-[#5352F6]/30" />
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
              <label htmlFor="email" className="block text-sm font-medium">
                Correo electrónico
              </label>
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
                <label htmlFor="password" className="block text-sm font-medium">
                  Contraseña
                </label>
                <Link href="/forgot-password" className="text-sm text-[#5352F6] hover:underline">
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
            <Link href="/register" className="text-[#5352F6] hover:underline">
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
