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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/design-system";
import { Checkbox } from "@/components/design-system";
import { H2, Paragraph, Text } from "@/components/design-system";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from "@/components/design-system";

// Opciones para "¿Cómo nos conociste?"
const referralOptions = [
  { value: "social_media", label: "Redes sociales" },
  { value: "friends", label: "Amigos" },
  { value: "events", label: "Eventos" },
  { value: "search", label: "Búsqueda en internet" },
  { value: "ads", label: "Publicidad" },
  { value: "other", label: "Otro" }
];

// Componente para seleccionar el código de país y teléfono
const PhoneInput = ({ 
  countryCode, 
  setCountryCode, 
  phone, 
  setPhone, 
  error 
}: { 
  countryCode: string; 
  setCountryCode: (code: string) => void; 
  phone: string; 
  setPhone: (phone: string) => void; 
  error?: string;
}) => {
  // Lista de códigos de país comunes
  const countryCodes = [
    { code: "+1", country: "US/CA" },
    { code: "+34", country: "ES" },
    { code: "+52", country: "MX" },
    { code: "+57", country: "CO" },
    { code: "+54", country: "AR" },
    { code: "+56", country: "CL" },
    { code: "+51", country: "PE" },
    { code: "+58", country: "VE" },
    { code: "+55", country: "BR" },
    { code: "+44", country: "GB" },
  ];

  return (
    <div className="grid grid-cols-[100px_1fr] gap-2">
      <Select value={countryCode} onValueChange={setCountryCode}>
        <SelectTrigger>
          <SelectValue placeholder="Código" />
        </SelectTrigger>
        <SelectContent>
          {countryCodes.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              {country.code} {country.country}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input 
        type="tel" 
        placeholder="Número de teléfono" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
      />
      {error && <p className="col-span-2 text-sm text-[#FF3B30]">{error}</p>}
    </div>
  );
};

export default function RegisterForm() {
  const router = useRouter();
  const { register, error, isLoading, clearError, token } = useAuthStore();
  
  // Redirigir si ya está autenticado
  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token, router]);
  
  // Estados para los campos del formulario
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [countryCode, setCountryCode] = useState("+34");
  const [phone, setPhone] = useState("");
  const [howDidYouHearAboutUs, setHowDidYouHearAboutUs] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [recaptchaCompleted, setRecaptchaCompleted] = useState(false);
  
  // Estado para errores de validación
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  
  // Función para validar el formulario
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!firstName) errors.firstName = "El nombre es obligatorio";
    if (!lastName) errors.lastName = "El apellido es obligatorio";
    
    if (!email) {
      errors.email = "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "El correo electrónico no es válido";
    }
    
    if (!password) {
      errors.password = "La contraseña es obligatoria";
    } else if (password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres";
    }
    
    if (password !== confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }
    
    if (!phone) {
      errors.phone = "El teléfono es obligatorio";
    }
    
    if (!howDidYouHearAboutUs) {
      errors.howDidYouHearAboutUs = "Este campo es obligatorio";
    }
    
    if (!termsAccepted) {
      errors.termsAccepted = "Debes aceptar los términos y condiciones";
    }
    
    if (!recaptchaCompleted) {
      errors.recaptcha = "Por favor, completa el captcha";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const success = await register({
      firstName,
      lastName,
      email,
      password,
      phone,
      countryPhoneCode: countryCode.replace("+", ""),
      howDidYouHearAboutUs,
      referralCode,
      termsAccepted,
      pageOrigin: "LOKL Academy"
    });
    
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
  
  // Simulación de reCAPTCHA (en producción usaríamos react-google-recaptcha)
  const handleRecaptchaChange = () => {
    setRecaptchaCompleted(true);
  };
  
  return (
    <div className="relative min-h-screen w-full">
      {/* Fondo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/skyscraper-bw.jpg"
          alt="LOKL Academy - Registro"
          fill
          className="object-cover grayscale"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#5352F6]/80 via-[#5352F6]/50 to-[#5352F6]/30" />
      </div>
      
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-16">
        <Card className="mx-auto max-w-lg backdrop-blur-sm bg-white/95 shadow-xl">
        <CardHeader>
          <CardTitle>
            <H2 variant="section" className="text-center">
              Crear una cuenta
            </H2>
          </CardTitle>
          <CardDescription>
            <Paragraph variant="lead" color="muted" className="text-center">
              Únete a LOKL Academy y comienza tu camino en inversiones inmobiliarias
            </Paragraph>
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Nombre */}
              <FormField label="Nombre" htmlFor="firstName">
                <label htmlFor="firstName" className="block text-sm font-medium">
                  Nombre
                </label>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Tu nombre"
                  className={validationErrors.firstName ? "border-[#FF3B30]" : ""}
                />
                {validationErrors.firstName && (
                  <p className="mt-1 text-sm text-[#FF3B30]">{validationErrors.firstName}</p>
                )}
              </FormField>
              
              {/* Apellido */}
              <FormField label="Apellido" htmlFor="lastName">
                <label htmlFor="lastName" className="block text-sm font-medium">
                  Apellido
                </label>
                <Input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Tu apellido"
                  className={validationErrors.lastName ? "border-[#FF3B30]" : ""}
                />
                {validationErrors.lastName && (
                  <p className="mt-1 text-sm text-[#FF3B30]">{validationErrors.lastName}</p>
                )}
              </FormField>
            </div>
            
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
              <label htmlFor="password" className="block text-sm font-medium">
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                className={validationErrors.password ? "border-[#FF3B30]" : ""}
              />
              {validationErrors.password && (
                <p className="mt-1 text-sm text-[#FF3B30]">{validationErrors.password}</p>
              )}
            </FormField>
            
            {/* Confirmar Contraseña */}
            <FormField label="Confirmar contraseña" htmlFor="confirmPassword">
              <label htmlFor="confirmPassword" className="block text-sm font-medium">
                Confirmar contraseña
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repite tu contraseña"
                className={validationErrors.confirmPassword ? "border-[#FF3B30]" : ""}
              />
              {validationErrors.confirmPassword && (
                <p className="mt-1 text-sm text-[#FF3B30]">{validationErrors.confirmPassword}</p>
              )}
            </FormField>
            
            {/* Teléfono */}
            <FormField label="Teléfono" htmlFor="phone">
              <label htmlFor="phone" className="block text-sm font-medium">
                Teléfono
              </label>
              <PhoneInput
                countryCode={countryCode}
                setCountryCode={setCountryCode}
                phone={phone}
                setPhone={setPhone}
                error={validationErrors.phone}
              />
            </FormField>
            
            {/* ¿Cómo nos conociste? */}
            <FormField label="¿Cómo nos conociste?" htmlFor="howDidYouHearAboutUs">
              <label htmlFor="howDidYouHearAboutUs" className="block text-sm font-medium">
                ¿Cómo nos conociste?
              </label>
              <Select 
                value={howDidYouHearAboutUs} 
                onValueChange={setHowDidYouHearAboutUs}
              >
                <SelectTrigger className={validationErrors.howDidYouHearAboutUs ? "border-[#FF3B30]" : ""}>
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  {referralOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {validationErrors.howDidYouHearAboutUs && (
                <p className="mt-1 text-sm text-[#FF3B30]">{validationErrors.howDidYouHearAboutUs}</p>
              )}
            </FormField>
            
            {/* Código de referido (opcional) */}
            <FormField label="Código de referido (opcional)" htmlFor="referralCode">
              <label htmlFor="referralCode" className="block text-sm font-medium">
                Código de referido (opcional)
              </label>
              <Input
                id="referralCode"
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                placeholder="Si tienes un código de referido"
              />
            </FormField>
            
            {/* reCAPTCHA */}
            <div className="border border-[#E5E5E5] p-4 rounded-md">
              <div className="flex items-center justify-between">
                <Text>No soy un robot</Text>
                <Checkbox 
                  checked={recaptchaCompleted}
                  onCheckedChange={handleRecaptchaChange}
                  className={validationErrors.recaptcha ? "border-[#FF3B30]" : ""}
                />
              </div>
              {validationErrors.recaptcha && (
                <p className="mt-1 text-sm text-[#FF3B30]">{validationErrors.recaptcha}</p>
              )}
            </div>
            
            {/* Términos y condiciones */}
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="terms" 
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                className={validationErrors.termsAccepted ? "border-[#FF3B30]" : ""}
              />
              <label htmlFor="terms" className="text-sm">
                Acepto los <Link href="/terms" className="text-[#5352F6] hover:underline">términos y condiciones</Link> y la <Link href="/privacy" className="text-[#5352F6] hover:underline">política de privacidad</Link>
              </label>
            </div>
            {validationErrors.termsAccepted && (
              <p className="mt-1 text-sm text-[#FF3B30]">{validationErrors.termsAccepted}</p>
            )}
            
            {/* Botón de registro */}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Registrando..." : "Crear cuenta"}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <Text>
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="text-[#5352F6] hover:underline">
              Inicia sesión
            </Link>
          </Text>
        </CardFooter>
      </Card>
      </div>
      
      {/* Diálogo de error */}
      <AlertDialog open={showErrorDialog} onOpenChange={handleCloseErrorDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Error de registro</AlertDialogTitle>
            <AlertDialogDescription>
              {error || "Ha ocurrido un error al registrarse. Por favor, inténtalo de nuevo."}
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
