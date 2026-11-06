// hooks/useContadorAnimado.js · el número "corre" hasta su nuevo valor
import { useEffect, useRef, useState } from "react";

export function useContadorAnimado(destino, duracion = 600) {
  const [valor, setValor] = useState(destino);
  const actual = useRef(destino); // recuerda el valor sin volver a dibujar

  useEffect(() => {
    const inicio = performance.now();
    const origen = actual.current;
    let id;
    // requestAnimationFrame: el navegador llama a "paso" en cada cuadro (~60 por segundo)
    const paso = (ahora) => {
      const t = Math.min(1, (ahora - inicio) / duracion); // avance de 0 a 1
      const suave = 1 - Math.pow(1 - t, 3); // frena al final
      actual.current = origen + (destino - origen) * suave;
      setValor(actual.current);
      if (t < 1) id = requestAnimationFrame(paso);
    };
    id = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(id); // limpieza si el destino cambia antes
  }, [destino, duracion]);

  return valor;
}
