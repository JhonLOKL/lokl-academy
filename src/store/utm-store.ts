import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UtmParams {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

interface UtmState extends UtmParams {
  setUtmParams: (params: UtmParams) => void;
  clearUtmParams: () => void;
  hasUtmParams: () => boolean;
}

/**
 * Store global para parámetros UTM
 * Persiste en localStorage y se mantiene durante toda la sesión
 */
export const useUtmStore = create<UtmState>()(
  persist(
    (set, get) => ({
      utmSource: undefined,
      utmMedium: undefined,
      utmCampaign: undefined,
      utmTerm: undefined,
      utmContent: undefined,

      setUtmParams: (params) => set({
        utmSource: params.utmSource,
        utmMedium: params.utmMedium,
        utmCampaign: params.utmCampaign,
        utmTerm: params.utmTerm,
        utmContent: params.utmContent,
      }),

      clearUtmParams: () => set({
        utmSource: undefined,
        utmMedium: undefined,
        utmCampaign: undefined,
        utmTerm: undefined,
        utmContent: undefined,
      }),

      hasUtmParams: () => {
        const state = get();
        return !!(
          state.utmSource ||
          state.utmMedium ||
          state.utmCampaign ||
          state.utmTerm ||
          state.utmContent
        );
      },
    }),
    {
      name: 'utm-storage', // nombre en localStorage
    }
  )
);

/**
 * Extrae parámetros UTM de una URL o del objeto URLSearchParams
 * Busca tanto el formato con guion bajo (utm_source) como camelCase (utmSource)
 */
export function extractUtmParams(searchParams: URLSearchParams): UtmParams {
  const utmParams: UtmParams = {};

  // utm_source o utmSource
  utmParams.utmSource = 
    searchParams.get('utm_source') || 
    searchParams.get('utmSource') || 
    undefined;

  // utm_medium o utmMedium
  utmParams.utmMedium = 
    searchParams.get('utm_medium') || 
    searchParams.get('utmMedium') || 
    undefined;

  // utm_campaign o utmCampaign
  utmParams.utmCampaign = 
    searchParams.get('utm_campaign') || 
    searchParams.get('utmCampaign') || 
    undefined;

  // utm_term o utmTerm
  utmParams.utmTerm = 
    searchParams.get('utm_term') || 
    searchParams.get('utmTerm') || 
    undefined;

  // utm_content o utmContent
  utmParams.utmContent = 
    searchParams.get('utm_content') || 
    searchParams.get('utmContent') || 
    undefined;

  return utmParams;
}

/**
 * Hook para inicializar UTMs desde la URL actual
 * Debe ser llamado en un componente client-side
 */
export function useInitializeUtms() {
  if (typeof window === 'undefined') return;

  const { setUtmParams } = useUtmStore.getState();
  const searchParams = new URLSearchParams(window.location.search);
  const utmParams = extractUtmParams(searchParams);

  // Solo actualizar si hay al menos un parámetro UTM
  const hasAnyUtm = Object.values(utmParams).some(value => value !== undefined);
  if (hasAnyUtm) {
    setUtmParams(utmParams);
  }
}

