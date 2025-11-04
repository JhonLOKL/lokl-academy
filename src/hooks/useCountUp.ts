import { useState, useEffect } from "react";

/**
 * Hook para animar números con efecto de conteo
 * @param endValue - Valor final al que debe llegar el contador
 * @param duration - Duración de la animación en milisegundos (default: 2000)
 * @returns Valor actual del contador
 */
const useCountUp = (endValue: number, duration: number = 2000): number => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let start = 0;
    const incrementTime = 10; 
    const steps = Math.ceil(duration / incrementTime);
    const increment = endValue / steps;

    const counter = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        clearInterval(counter);
        setCount(endValue);
      } else {
        setCount(Math.ceil(start));
      }
    }, incrementTime);

    return () => clearInterval(counter);
  }, [endValue, duration]);

  return count;
};

export default useCountUp;

