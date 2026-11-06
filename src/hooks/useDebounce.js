// hooks/useDebounce.js · devuelve el valor solo cuando el usuario deja de escribir
import { useEffect, useState } from "react";

export function useDebounce(valor, espera = 350) {
  const [retrasado, setRetrasado] = useState(valor);

  useEffect(() => {
    const id = setTimeout(() => setRetrasado(valor), espera);
    // Si llega otra tecla antes de tiempo, este temporizador se cancela
    return () => clearTimeout(id);
  }, [valor, espera]);

  return retrasado;
}
