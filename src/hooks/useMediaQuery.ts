import { useState, useEffect } from 'react';

/**
 * Hook para detectar media queries
 * @param query - Media query string (ejemplo: '(max-width: 500px)')
 * @returns boolean indicando si la media query coincide
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Verificar si estamos en el navegador
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    
    // Establecer el valor inicial
    setMatches(media.matches);

    // Función listener para cambios
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Agregar el listener (compatible con navegadores antiguos)
    if (media.addEventListener) {
      media.addEventListener('change', listener);
    } else {
      // Fallback para navegadores antiguos
      media.addListener(listener);
    }

    // Cleanup
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', listener);
      } else {
        media.removeListener(listener);
      }
    };
  }, [query]);

  return matches;
};

