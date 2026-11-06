// hooks/useFlip.js · anima el cambio de posición de los hijos de un contenedor
// Técnica FLIP: First (antes), Last (después), Invert, Play
import { useLayoutEffect, useRef } from "react";

export function useFlip(dependencia) {
  const contenedor = useRef(null); // se conecta con ref={...} en el JSX
  const antes = useRef(new Map()); // id -> posición anterior

  // useLayoutEffect corre después de pintar el DOM y antes de mostrarlo
  useLayoutEffect(() => {
    const base = contenedor.current.getBoundingClientRect();
    for (const el of contenedor.current.children) {
      const r = el.getBoundingClientRect();
      const ahora = { x: r.left - base.left, y: r.top - base.top };
      const previo = antes.current.get(el.dataset.id);
      if (previo && (previo.x !== ahora.x || previo.y !== ahora.y)) {
        // Lo ponemos donde estaba y lo dejamos viajar a su nuevo lugar
        el.animate(
          [{ transform: `translate(${previo.x - ahora.x}px, ${previo.y - ahora.y}px)` }, { transform: "none" }],
          { duration: 450, easing: "cubic-bezier(.2, .8, .2, 1)" }
        );
      }
      antes.current.set(el.dataset.id, ahora);
    }
  }, [dependencia]);

  return contenedor;
}
