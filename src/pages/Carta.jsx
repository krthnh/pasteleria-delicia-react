// pages/Carta.jsx · carta por categorías con índice, barra de progreso y "volver arriba"
import { useRef, useState } from "react";
import { productos } from "../data/productos.js";
import { soles } from "../utils/formato.js";
import "./Carta.css";

// reduce para agrupar: { Tortas: [...], Panes: [...], ... }
const porCategoria = productos.reduce((grupos, p) => {
  (grupos[p.categoria] ??= []).push(p); // ??= crea el arreglo si no existe
  return grupos;
}, {});

export default function Carta() {
  const caja = useRef(null); // el <div> que se desplaza
  const secciones = useRef({}); // categoría -> <section>
  const [progreso, setProgreso] = useState(0); // de 0 a 1

  const alDesplazar = () => {
    const { scrollTop, scrollHeight, clientHeight } = caja.current;
    setProgreso(scrollTop / (scrollHeight - clientHeight));
  };

  // offsetTop: distancia de la sección al inicio de la caja
  const irA = (categoria) =>
    caja.current.scrollTo({ top: secciones.current[categoria].offsetTop, behavior: "smooth" });

  return (
    <section className="contenedor carta">
      <h2>Nuestra carta</h2>
      <nav className="carta-indice">
        {Object.keys(porCategoria).map((c) => (
          <button key={c} className="chip" onClick={() => irA(c)}>{c}</button>
        ))}
      </nav>

      <div className="carta-marco">
        {/* scaleX: la barra crece de 0 a 1 según el avance */}
        <div className="carta-progreso" style={{ transform: `scaleX(${progreso})` }} />
        <div className="carta-caja" ref={caja} onScroll={alDesplazar}>
          {Object.entries(porCategoria).map(([categoria, lista]) => (
            <section key={categoria} ref={(el) => (secciones.current[categoria] = el)}>
              <h3>{categoria}</h3>
              {lista.map((p) => (
                <div key={p.id} className="carta-renglon">
                  <img src={p.imagen} alt="" />
                  <span>{p.nombre}</span>
                  <i className="carta-puntos" />
                  <b>{soles(p.precio)}</b>
                </div>
              ))}
            </section>
          ))}
        </div>
        <button
          className={progreso > 0.25 ? "carta-arriba visible" : "carta-arriba"}
          onClick={() => caja.current.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Volver arriba
        </button>
      </div>
    </section>
  );
}
