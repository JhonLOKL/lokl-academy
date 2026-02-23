"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import { consumePostLoginRedirect, setPostLoginRedirect } from "@/lib/auth-utils";
import { Button } from "@/components/design-system";
import { Input } from "@/components/design-system";
import { FormField } from "@/components/design-system";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/design-system";
import { Checkbox } from "@/components/design-system";
import { Text } from "@/components/design-system";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from "@/components/design-system";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/design-system";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { countryCodes } from "@/lib/country-codes";
import { Eye, EyeOff, Check, ChevronsUpDown, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { AuthLayout } from "./auth-layout";
import { motion, AnimatePresence } from "framer-motion";
import { upsertLeadAction } from "@/actions/user-action";
import { useUtmStore } from "@/store/utm-store";

interface WindowWithDataLayer extends Window {
  dataLayer: Record<string, unknown>[];
}

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
  countryIso, 
  setCountryIso, 
  phone, 
  setPhone, 
  error 
}: { 
  countryIso: string; 
  setCountryIso: (iso: string) => void; 
  phone: string; 
  setPhone: (phone: string) => void; 
  error?: string;
}) => {
  const [open, setOpen] = useState(false);
  const selectedCountry = countryCodes.find((c) => c.country === countryIso);

  return (
    <div className="grid grid-cols-[140px_1fr] gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between px-3 font-normal"
          >
            {selectedCountry ? (
               <span className="truncate flex items-center">
                {selectedCountry.code} <span className="ml-1 text-xs text-muted-foreground hidden sm:inline">{selectedCountry.country}</span>
               </span>
            ) : (
              "Código"
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Buscar país o código..." />
            <CommandList>
              <CommandEmpty>No se encontró el país.</CommandEmpty>
              <CommandGroup>
                {countryCodes.map((country) => (
                  <CommandItem
                    key={`${country.country}-${country.code}`}
                    value={`${country.name} ${country.code}`} 
                    onSelect={() => {
                      setCountryIso(country.country);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        countryIso === country.country ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span className="mr-2 font-medium">{country.code}</span>
                    <span className="truncate text-muted-foreground">{country.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
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
  const searchParams = useSearchParams();
  const navigatedRef = useRef(false);
  const { register, error, isLoading, clearError, token, user } = useAuthStore();

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
    if ((token || user) && !navigatedRef.current) {
      // Si el usuario ya está autenticado, redirigir al dashboard o a la página objetivo
      const target = consumePostLoginRedirect() || searchParams.get("redirect") || "/dashboard";
      navigatedRef.current = true;
      router.push(target);
    }
  }, [token, user, router, searchParams]);
  
  // Estados para los campos del formulario
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [countryIso, setCountryIso] = useState("CO");
  const [phone, setPhone] = useState("");
  const [howDidYouHearAboutUs, setHowDidYouHearAboutUs] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [recaptchaCompleted, setRecaptchaCompleted] = useState(false);
  
  // Estado para el paso actual
  const [currentStep, setCurrentStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);
  const totalSteps = 4;

  // Estados para mostrar/ocultar contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Estado para errores de validación
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [isSavingLead, setIsSavingLead] = useState(false);
  const isSubmitting = isLoading || isSavingLead;
  const [stepAttempted, setStepAttempted] = useState<Record<number, boolean>>({});

  const { utmSource, utmMedium, utmCampaign, utmTerm, utmContent } = useUtmStore();
  
  // Función para validar el paso actual
  const validateStep = (step: number) => {
    const errors: Record<string, string> = {};
    let isValid = true;

    if (step === 1) {
      if (!firstName) errors.firstName = "El nombre es obligatorio";
      if (!lastName) errors.lastName = "El apellido es obligatorio";
      if (!email) {
        errors.email = "El correo electrónico es obligatorio";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "El correo electrónico no es válido";
      }
    }

    if (step === 2) {
      if (!password) {
        errors.password = "La contraseña es obligatoria";
      } else if (password.length < 8) {
        errors.password = "La contraseña debe tener al menos 8 caracteres";
      }
      
      if (password !== confirmPassword) {
        errors.confirmPassword = "Las contraseñas no coinciden";
      }
    }

    if (step === 3) {
      if (!phone) errors.phone = "El teléfono es obligatorio";
      if (!howDidYouHearAboutUs) errors.howDidYouHearAboutUs = "Este campo es obligatorio";
    }

    if (step === 4) {
      if (!termsAccepted) errors.termsAccepted = "Debes aceptar los términos y condiciones";
      if (!recaptchaCompleted) errors.recaptcha = "Por favor, completa el captcha";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      isValid = false;
    } else {
      setValidationErrors({});
    }

    return isValid;
  };

  const handleNextStep = () => {
    setStepAttempted((prev) => ({ ...prev, [currentStep]: true }));
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => {
        const next = Math.min(prev + 1, totalSteps);
        setMaxStepReached((m) => Math.max(m, next));
        return next;
      });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleGoToStep = (step: number) => {
    if (step <= maxStepReached) {
      setCurrentStep(step);
      setValidationErrors({});
    }
  };
  
  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep !== totalSteps) return;
    setStepAttempted((prev) => ({ ...prev, [currentStep]: true }));
    if (!validateStep(currentStep)) return;
    
    const success = await register({
      firstName,
      lastName,
      email,
      password,
      phone,
      countryPhoneCode: countryCodes.find(c => c.country === countryIso)?.code.replace("+", "") || "34",
      howDidYouHearAboutUs,
      referralCode,
      termsAccepted,
      pageOrigin: "LOKL Academy",
      ...(utmSource && { utmSource }),
      ...(utmMedium && { utmMedium }),
      ...(utmCampaign && { utmCampaign }),
      ...(utmTerm && { utmTerm }),
      ...(utmContent && { utmContent }),
    });
    
    if (success) {
      // Guardar lead (Sheets/CRM) SOLO si el registro fue exitoso.
      // No bloquea el flujo si falla; es best-effort.
      try {
        setIsSavingLead(true);
        const prefix = countryCodes.find((c) => c.country === countryIso)?.code || "";
        const fullPhone = `${prefix}${phone}`.replace(/\s+/g, " ").trim();

        await upsertLeadAction({
          email,
          firstName,
          ...(fullPhone && { phone: fullPhone.replace(/\+/g, "") }),
          // Mantener "origin" fijo para el canal, pero leadOrigin debe reflejar lo que eligió el usuario
          origin: "Registro academy",
          leadOrigin: howDidYouHearAboutUs,
          ...(utmSource && { utmSource }),
          ...(utmMedium && { utmMedium }),
          ...(utmCampaign && { utmCampaign }),
          ...(utmTerm && { utmTerm }),
          ...(utmContent && { utmContent }),
        });
      } catch {
        // noop
      } finally {
        setIsSavingLead(false);
      }

      // Evento GA: Registro exitoso
      if (typeof window !== "undefined") {
        const w = window as unknown as WindowWithDataLayer;
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: "register_on_lokl_next",
        });
      }

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
  
  // Simulación de reCAPTCHA (en producción usaríamos react-google-recaptcha)
  const handleRecaptchaChange = () => {
    setRecaptchaCompleted(true);
  };
  
  return (
    <div className="relative min-h-screen w-full bg-white">
      <AuthLayout
        title="Regístrate y únete a LOKL"
        subtitle="Comienza tu camino en inversiones inmobiliarias hoy mismo."
        imageSide="right"
        desktopImages={desktopHeroImages}
        mobileImages={mobileHeroImages}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Stepper compacto (progresivo): NO se muestra en el inicio */}
          {currentStep > 1 && (() => {
            const steps = [
              { step: 1, label: "Datos" },
              { step: 2, label: "Seguridad" },
              { step: 3, label: "Contacto" },
              { step: 4, label: "Confirmar" },
            ];
            const visibleSteps = steps.filter((s) => s.step <= maxStepReached);
            const currentLabel = steps.find((s) => s.step === currentStep)?.label ?? "";

            return (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Paso <span className="font-semibold text-gray-700">{currentStep}</span> de{" "}
                    <span className="font-semibold text-gray-700">{totalSteps}</span>
                  </p>
                  <p className="text-sm font-semibold text-gray-800">{currentLabel}</p>
                </div>

                <div className="flex items-center gap-2">
                  {visibleSteps.map((s, idx) => {
                    const isActive = currentStep === s.step;
                    const isComplete = s.step < currentStep;

                    return (
                      <div key={s.step} className="flex items-center gap-2 flex-1">
                        <button
                          type="button"
                          onClick={() => handleGoToStep(s.step)}
                          aria-current={isActive ? "step" : undefined}
                          className={cn(
                            "h-8 w-8 rounded-full border text-sm font-semibold transition-colors",
                            isActive
                              ? "border-[#5352F6] bg-[#5352F6] text-white"
                              : isComplete
                                ? "border-[#5352F6] bg-[#5352F6]/10 text-[#5352F6] hover:bg-[#5352F6]/15"
                                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                          )}
                          title={s.label}
                        >
                          {s.step}
                        </button>

                        {idx < visibleSteps.length - 1 && (
                          <div
                            className={cn(
                              "h-[2px] w-full rounded-full",
                              s.step < currentStep ? "bg-[#5352F6]" : "bg-gray-200"
                            )}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="space-y-5"
            >
              {currentStep === 1 && (
                <>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <FormField label="Nombre" htmlFor="firstName">
                      <Input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Tu nombre"
                        className={cn("h-12 bg-gray-50", stepAttempted[1] && validationErrors.firstName && "border-[#FF3B30]")}
                      />
                      {stepAttempted[1] && validationErrors.firstName && (
                        <p className="mt-1 text-sm text-[#FF3B30]">{validationErrors.firstName}</p>
                      )}
                    </FormField>
                    <FormField label="Apellido" htmlFor="lastName">
                      <Input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Tu apellido"
                        className={cn("h-12 bg-gray-50", stepAttempted[1] && validationErrors.lastName && "border-[#FF3B30]")}
                      />
                      {stepAttempted[1] && validationErrors.lastName && (
                        <p className="mt-1 text-sm text-[#FF3B30]">{validationErrors.lastName}</p>
                      )}
                    </FormField>
                  </div>
                  <FormField label="Correo electrónico" htmlFor="email">
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className={cn("h-12 bg-gray-50", stepAttempted[1] && validationErrors.email && "border-[#FF3B30]")}
                    />
                    {stepAttempted[1] && validationErrors.email && (
                      <p className="mt-1 text-sm text-[#FF3B30]">{validationErrors.email}</p>
                    )}
                  </FormField>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <FormField label="Contraseña" htmlFor="password">
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mínimo 8 caracteres"
                        className={cn("h-12 bg-gray-50 pr-10", stepAttempted[2] && validationErrors.password && "border-[#FF3B30]")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {stepAttempted[2] && validationErrors.password && (
                      <p className="mt-1 text-sm text-[#FF3B30]">{validationErrors.password}</p>
                    )}
                  </FormField>
                  <FormField label="Confirmar contraseña" htmlFor="confirmPassword">
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repite tu contraseña"
                        className={cn(
                          "h-12 bg-gray-50 pr-10",
                          stepAttempted[2] && validationErrors.confirmPassword && "border-[#FF3B30]"
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {stepAttempted[2] && validationErrors.confirmPassword && (
                      <p className="mt-1 text-sm text-[#FF3B30]">{validationErrors.confirmPassword}</p>
                    )}
                  </FormField>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <FormField label="Teléfono" htmlFor="phone">
                    <PhoneInput
                      countryIso={countryIso}
                      setCountryIso={setCountryIso}
                      phone={phone}
                      setPhone={setPhone}
                      error={stepAttempted[3] ? validationErrors.phone : undefined}
                    />
                  </FormField>
                  <FormField label="¿Cómo nos conociste?" htmlFor="howDidYouHearAboutUs">
                    <Select value={howDidYouHearAboutUs} onValueChange={setHowDidYouHearAboutUs}>
                      <SelectTrigger
                        className={cn("h-12 bg-gray-50", stepAttempted[3] && validationErrors.howDidYouHearAboutUs && "border-[#FF3B30]")}
                      >
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
                    {stepAttempted[3] && validationErrors.howDidYouHearAboutUs && (
                      <p className="mt-1 text-sm text-[#FF3B30]">{validationErrors.howDidYouHearAboutUs}</p>
                    )}
                  </FormField>
                  <FormField label="Código de referido (opcional)" htmlFor="referralCode">
                    <Input
                      id="referralCode"
                      type="text"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      placeholder="Si tienes un código de referido"
                      className="h-12 bg-gray-50"
                    />
                  </FormField>
                </>
              )}

              {currentStep === 4 && (
                <>
                  <div className="border border-[#E5E5E5] p-4 rounded-md bg-gray-50/50">
                    <div className="flex items-center justify-between">
                      <Text>No soy un robot</Text>
                      <Checkbox
                        checked={recaptchaCompleted}
                        onCheckedChange={handleRecaptchaChange}
                        className={stepAttempted[4] && validationErrors.recaptcha ? "border-[#FF3B30]" : ""}
                      />
                    </div>
                    {stepAttempted[4] && validationErrors.recaptcha && (
                      <p className="mt-1 text-sm text-[#FF3B30]">{validationErrors.recaptcha}</p>
                    )}
                  </div>

                  <div className="flex items-start space-x-2 pt-1">
                    <Checkbox
                      id="terms"
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                      className={stepAttempted[4] && validationErrors.termsAccepted ? "border-[#FF3B30]" : "mt-1"}
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer leading-tight">
                      Acepto los{" "}
                      <Link
                        href="https://drive.google.com/file/d/1R6aOvsRjYVo-d398PskWJjwL4_WrY9PP/view"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#5352F6] font-medium hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        términos y condiciones
                      </Link>
                    </label>
                  </div>
                  {stepAttempted[4] && validationErrors.termsAccepted && (
                    <p className="mt-1 text-sm text-[#FF3B30]">{validationErrors.termsAccepted}</p>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navegación */}
          {currentStep === 1 ? (
            <div className="flex items-center justify-end pt-1">
              <Button type="button" onClick={handleNextStep} className="h-11 px-5" disabled={isSubmitting}>
                Siguiente
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between pt-1">
              <Button type="button" variant="outline" onClick={handlePrevStep} className="h-11 px-4" disabled={isSubmitting}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Atrás
              </Button>

              {currentStep < totalSteps ? (
                <Button type="button" onClick={handleNextStep} className="h-11 px-5" disabled={isSubmitting}>
                  Siguiente
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="h-11 px-6 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creando tu cuenta...
                    </span>
                  ) : (
                    "Crear cuenta"
                  )}
                </Button>
              )}
            </div>
          )}

          {isSubmitting && currentStep === totalSteps && (
            <p className="text-center text-xs text-gray-500">
              Estamos creando tu cuenta. Esto puede tardar unos segundos.
            </p>
          )}

          <div className="text-center pt-2 text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link
              href={searchParams.get("redirect") ? `/login?redirect=${encodeURIComponent(searchParams.get("redirect") || "")}` : "/login"}
              className="text-[#5352F6] font-semibold hover:underline"
            >
              Inicia sesión
            </Link>
          </div>
        </form>
      </AuthLayout>
      
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
