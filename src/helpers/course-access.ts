import type { AccessPlan, PricingType } from "@/lib/course/schema";

// ===================================================================
// UTILIDADES DE ACCESO Y PRICING PARA CURSOS
// ===================================================================

export type UserPlanType = 'basic' | 'investor' | 'premium';

interface CourseAccessInput {
  pricingType: PricingType;
  price?: number;
  accessPlan: AccessPlan;
}

/**
 * Verifica si un usuario tiene acceso a un curso basado en su plan.
 *
 * Jerarquía de planes:
 *   - basic → solo cursos con plan 'any' o 'basic'
 *   - premium → cursos 'any', 'basic', 'premium'
 *   - investor → cursos 'any', 'basic', 'premium', 'investor'
 */
export function hasAccessToCourse(
  userPlan: UserPlanType,
  requiredPlan: AccessPlan
): boolean {
  if (requiredPlan === 'any' || requiredPlan === 'basic') return true;
  if (requiredPlan === 'premium') return userPlan === 'premium' || userPlan === 'investor';
  if (requiredPlan === 'investor') return userPlan === 'investor';
  return false;
}

/**
 * Determina la etiqueta visual a mostrar según pricing y access plan.
 */
export function getCourseAccessLabel(input: CourseAccessInput): {
  label: string;
  variant: 'free' | 'premium' | 'investor' | 'paid';
} {
  const { pricingType, price, accessPlan } = input;

  // 1. Prioridad absoluta: Si hay precio, es de pago (Pago Único)
  // Esto arregla casos donde el tipo viene mal (ej. 'free' por defecto) pero sí tiene precio
  if (price && price > 0) {
    return { label: `$${price.toLocaleString('es-CO')}`, variant: 'paid' };
  }

  // Investor exclusivo
  if (accessPlan === 'investor' || pricingType === 'investor') {
    return { label: 'Inversionista', variant: 'investor' };
  }

  // Premium (incluido en suscripción)
  if (accessPlan === 'premium' || pricingType === 'premium') {
    return { label: 'Premium', variant: 'premium' };
  }

  // Si llegamos aquí, es gratis
  return { label: 'Gratis', variant: 'free' };
}

/**
 * Obtiene las clases CSS para la etiqueta de acceso.
 */
export function getAccessBadgeClasses(variant: 'free' | 'premium' | 'investor' | 'paid'): string {
  switch (variant) {
    case 'free':
      return 'bg-green-100 text-green-700';
    case 'premium':
      return 'bg-amber-100 text-amber-700';
    case 'investor':
      return 'bg-[#5352F6]/10 text-[#5352F6]';
    case 'paid':
      return 'bg-blue-100 text-blue-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

/**
 * Genera el mensaje de restricción para cursos bloqueados.
 */
export function getAccessRestrictionMessage(requiredPlan: AccessPlan): string {
  switch (requiredPlan) {
    case 'premium':
      return 'Este curso requiere un plan Premium o Inversionista. Actualiza tu plan para acceder.';
    case 'investor':
      return 'Este curso es exclusivo para inversionistas LOKL. Invierte con LOKL para desbloquear este contenido.';
    default:
      return 'Tu plan actual no permite acceder a este curso.';
  }
}

/**
 * Obtiene el nombre legible del plan.
 */
export function getPlanDisplayName(plan: string): string {
  switch (plan) {
    case 'investor':
      return 'Inversionista';
    case 'premium':
      return 'Premium';
    case 'basic':
    default:
      return 'Básico';
  }
}
