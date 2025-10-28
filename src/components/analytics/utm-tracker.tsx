"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useUtmStore, extractUtmParams } from "@/store/utm-store";

/**
 * Componente que rastrea y guarda los parámetros UTM de la URL
 * Debe ser incluido en el layout principal para capturar UTMs en todas las páginas
 */
export default function UtmTracker() {
  const searchParams = useSearchParams();
  const { setUtmParams, hasUtmParams } = useUtmStore();

  useEffect(() => {
    if (!searchParams) return;

    const utmParams = extractUtmParams(searchParams);

    // Solo actualizar si hay al menos un parámetro UTM en la URL
    const hasAnyUtm = Object.values(utmParams).some(value => value !== undefined);
    
    if (hasAnyUtm) {
      console.log("UTM params capturados:", utmParams);
      setUtmParams(utmParams);
    } else if (hasUtmParams()) {
      // Si no hay UTMs en la URL pero ya tenemos guardados, los mantenemos
      console.log("UTM params existentes mantenidos en store");
    }
  }, [searchParams, setUtmParams, hasUtmParams]);

  // Este componente no renderiza nada
  return null;
}

