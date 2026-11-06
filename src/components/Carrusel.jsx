// components/Carrusel.jsx · destacados que avanzan solos con setInterval
import { useEffect, useState } from "react";
import { productos } from "../data/productos.js";
import { soles } from "../utils/formato.js";
import "./Carrusel.css";

const destacados = productos.filter((p) => p.vendidos >= 130); // los más vendidos

export default function Carrusel() {
  const [indice, setIndice] = useState(0);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    if (pausado) return; // en pausa no creamos el intervalo
    // % (módulo): al pasar el último vuelve a 0  ->  0, 1, 2, 3, 0, 1...
    const id = setInterval(() => setIndice((i) => (i + 1) % destacados.length), 3000);
    return () => clearInterval(id); // limpieza: detiene el intervalo anterior
  }, [pausado]);

  return (
    <section className="contenedor destacados">
      <h2>Los más pedidos</h2>
      <div className="carrusel" onMouseEnter={() => setPausado(true)} onMouseLeave={() => setPausado(false)}>
        {/* Toda la pista se desplaza: -100% por cada lámina */}
        <div className="pista" style={{ transform: `translateX(-${indice * 100}%)` }}>
          {destacados.map((p) => (
            <figure key={p.id} className="lamina">
              <img src={p.imagen} alt={p.nombre} />
              <figcaption>
                {p.nombre} · {soles(p.precio)}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="puntos">
          {destacados.map((p, i) => (
            <button
              key={p.id}
              className={i === indice ? "activo" : ""}
              onClick={() => setIndice(i)}
              aria-label={`Ver ${p.nombre}`}
            />
          ))}
        </div>
        {pausado && <span className="pausa">En pausa</span>}
      </div>
    </section>
  );
}
