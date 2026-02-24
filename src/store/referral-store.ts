import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ReferralState {
  code?: string;
  setCode: (code: string) => void;
  clearCode: () => void;
  hasCode: () => boolean;
}

/**
 * Store global para código de referido (?code=...)
 * Persiste en localStorage para mantenerlo mientras el usuario navega.
 */
export const useReferralStore = create<ReferralState>()(
  persist(
    (set, get) => ({
      code: undefined,

      setCode: (code) => set({ code }),
      clearCode: () => set({ code: undefined }),
      hasCode: () => !!get().code,
    }),
    { name: "referral-code-storage" }
  )
);

/**
 * Extrae el código de referido desde los query params.
 * Acepta `code` (requerido) y un fallback `referralCode`.
 */
export function extractReferralCode(searchParams: URLSearchParams): string | undefined {
  const code =
    searchParams.get("code") ||
    searchParams.get("referralCode") ||
    undefined;

  const normalized = code?.trim();
  return normalized ? normalized : undefined;
}

