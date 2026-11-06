// components/Vuelos.jsx · la foto del producto "vuela" hasta el carrito
import { useEffect, useRef, useState } from "react";
import "./Vuelos.css";

export default function Vuelos() {
  const [vuelos, setVuelos] = useState([]);
  const capa = useRef(null);
  const siguiente = useRef(0); // contador de ids que no provoca renders

  useEffect(() => {
    // Escucha un evento propio que dispara ProductoCard
    const despegar = (e) => {
      const { origen, imagen } = e.detail;
      const base = capa.current.getBoundingClientRect(); // esquina de la capa (0, 0 en la tienda)
      const destino = capa.current.getRootNode().querySelector(".contador-carrito").getBoundingClientRect();
      const nuevo = {
        id: ++siguiente.current,
        imagen,
        x: origen.left - base.left,
        y: origen.top - base.top,
        ancho: origen.width,
        dx: destino.left - origen.left, // distancia horizontal hasta el carrito
        dy: destino.top - origen.top, // distancia vertical
      };
      setVuelos((lista) => [...lista, nuevo]);
    };
    window.addEventListener("vuelo-carrito", despegar);
    return () => window.removeEventListener("vuelo-carrito", despegar);
  }, []);

  // Al terminar la animación CSS, quitamos la imagen
  const aterrizo = (id) => setVuelos((lista) => lista.filter((v) => v.id !== id));

  return (
    <div className="vuelos" ref={capa} aria-hidden="true">
      {vuelos.map((v) => (
        <img
          key={v.id}
          src={v.imagen}
          alt=""
          className="volador"
          // Variables CSS desde JavaScript: el CSS usa var(--dx) y var(--dy)
          style={{ left: v.x, top: v.y, width: v.ancho, "--dx": `${v.dx}px`, "--dy": `${v.dy}px` }}
          onAnimationEnd={() => aterrizo(v.id)}
        />
      ))}
    </div>
  );
}
