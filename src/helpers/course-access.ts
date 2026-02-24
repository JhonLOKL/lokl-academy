import type { AccessPlan, PricingType, CoursePrincing, AccessRequirements, PrincingRule } from "@/lib/course/schema";

// ===================================================================
// UTILIDADES DE ACCESO Y PRINCING PARA CURSOS
// ===================================================================

export type UserPlanType = AccessPlan;

interface UserContext {
  plan: AccessPlan;
  isInvestor?: boolean;
}

/**
 * Verifica si un usuario puede VER/ACCEDER a la página de un curso.
 * No implica que sea gratis, solo que es elegible para verlo.
 */
export function canUserViewCourse(
  user: UserContext,
  requirements: AccessRequirements
): boolean {
  // 1. Requisito de Inversionista
  if (requirements.requiresInvestor && !user.isInvestor) {
    return false;
  }

  // 2. Requisito de Planes específicos
  if (requirements.allowedPlans && requirements.allowedPlans.length > 0) {
    // 'any' permite a cualquiera
    if (requirements.allowedPlans.includes('any')) return true;

    if (!requirements.allowedPlans.includes(user.plan)) {
      return false;
    }
  }

  // Si no hay requisitos específicos, cualquiera puede verlo
  return true;
}

/**
 * Calcula el precio final para un usuario basado en las reglas del curso.
 */
export function calculatePrincingForUser(
  user: UserContext,
  princing: CoursePrincing
): {
  price: number;
  isFree: boolean;
  isBlocked: boolean;
  appliedRule?: PrincingRule;
} {
  // Ordenar reglas por prioridad (mayor primero)
  const sortedRules = [...(princing.rules || [])].sort((a, b) => b.priority - a.priority);

  for (const rule of sortedRules) {
    let planMatch = true;
    if (rule.plans && rule.plans.length > 0) {
      planMatch = rule.plans.includes(user.plan);
    }

    let investorMatch = true;
    if (rule.isInvestor !== undefined) {
      investorMatch = rule.isInvestor === !!user.isInvestor;
    }

    if (planMatch && investorMatch) {
      return {
        price: rule.price,
        isFree: rule.price === 0,
        isBlocked: !!rule.isBlocked,
        appliedRule: rule
      };
    }
  }

  // Si ninguna regla aplica, usar precio base
  return {
    price: princing.basePrice,
    isFree: princing.basePrice === 0,
    isBlocked: false
  };
}

/**
 * Determina la etiqueta visual a mostrar según princing y access requirements.
 */
export function getCourseAccessLabel(
  user: UserContext,
  princing: CoursePrincing,
  requirements: AccessRequirements
): {
  label: string;
  variant: 'free' | 'premium' | 'investor' | 'paid' | 'blocked';
} {
  const result = calculatePrincingForUser(user, princing);

  if (result.isBlocked) {
    return { label: 'No disponible', variant: 'blocked' };
  }

  if (result.isFree) {
    // Si es gratis por una regla de plan
    if (result.appliedRule?.plans && result.appliedRule.plans.length > 0) {
      return { label: 'Incluido en Plan', variant: 'premium' };
    }
    // Si es gratis por ser inversionista
    if (result.appliedRule?.isInvestor) {
      return { label: 'Inversionista', variant: 'investor' };
    }
    return { label: 'Gratis', variant: 'free' };
  }

  return {
    label: `$${result.price.toLocaleString('es-CO')}`,
    variant: 'paid'
  };
}

/**
 * Obtiene las clases CSS para la etiqueta de acceso.
 */
export function getAccessBadgeClasses(variant: 'free' | 'premium' | 'investor' | 'paid' | 'blocked'): string {
  switch (variant) {
    case 'free':
      return 'bg-green-100 text-green-700';
    case 'premium':
      return 'bg-amber-100 text-amber-700';
    case 'investor':
      return 'bg-[#5352F6]/10 text-[#5352F6]';
    case 'paid':
      return 'bg-blue-100 text-blue-700';
    case 'blocked':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

/**
 * Genera el mensaje de restricción para cursos bloqueados.
 */
export function getAccessRestrictionMessage(requirements: AccessRequirements): string {
  if (requirements.requiresInvestor) {
    return 'Este contenido es exclusivo para inversionistas LOKL. Invierte con nosotros para desbloquearlo.';
  }

  if (requirements.allowedPlans && requirements.allowedPlans.length > 0) {
    const plans = requirements.allowedPlans.map(p => getPlanDisplayName(p)).join(', ');
    return `Este curso requiere uno de los siguientes planes: ${plans}.`;
  }

  return 'Tu cuenta actual no tiene acceso a este contenido.';
}

/**
 * Obtiene el nombre legible del plan.
 */
export function getPlanDisplayName(plan: string): string {
  switch (plan) {
    case 'dreamer':
      return 'Dreamer';
    case 'visionary':
      return 'Visionary';
    case 'developer':
      return 'Developer';
    case 'investor':
      return 'Inversionista';
    case 'none':
      return 'Sin Plan';
    default:
      return 'Básico';
  }
}
