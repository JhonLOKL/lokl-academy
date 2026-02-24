"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { extractReferralCode, useReferralStore } from "@/store/referral-store";

/**
 * Captura `?code=` en la URL y lo persiste en el store global
 * Debe ir en el layout principal (similar a UtmTracker).
 */
export default function ReferralTracker() {
  const searchParams = useSearchParams();
  const { setCode, hasCode } = useReferralStore();

  useEffect(() => {
    if (!searchParams) return;

    const code = extractReferralCode(searchParams);
    if (code) {
      setCode(code);
    } else if (hasCode()) {
      // Mantener el existente
    }
  }, [searchParams, setCode, hasCode]);

  return null;
}

