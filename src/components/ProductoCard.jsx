// components/ProductoCard.jsx · avisa con una notificación al agregar
import { useState } from "react";
import { soles, igvIncluido } from "../utils/formato.js";
import { useCarrito } from "../context/CarritoContext.jsx";
import { useAvisos } from "../context/AvisosContext.jsx";
import "./ProductoCard.css";

export default function ProductoCard({ producto, onVerDetalle }) {
  const { agregar: agregarAlCarrito } = useCarrito(); // renombramos al desestructurar
  const { avisar } = useAvisos();
  const { nombre, categoria, precio, imagen, stock } = producto;
  const agotado = stock === 0;
  const pocos = stock > 0 && stock <= 3;
  const [agregado, setAgregado] = useState(false); // estado local de ESTA tarjeta

  function agregar(e) {
    e.stopPropagation(); // el clic se queda en el botón: no sube al <article>
    agregarAlCarrito(producto); // 1. el contexto actualiza el carrito
    // Posición de la foto en pantalla: { left, top, width, height }
    const foto = e.currentTarget.closest(".card").querySelector("img");
    const origen = foto.getBoundingClientRect();
    // CustomEvent: un evento propio con datos en "detail"
    window.dispatchEvent(new CustomEvent("vuelo-carrito", { detail: { origen, imagen } }));
    avisar(`${nombre} agregado al carrito`); // notificación
    setAgregado(true); // 2. cambia el texto del botón
    setTimeout(() => setAgregado(false), 1200); // 3. a los 1.2 s vuelve a "Agregar"
  }

  return (
    // Clic en cualquier parte de la tarjeta: ver detalle
    <article className={agotado ? "card agotado" : "card"} onClick={() => onVerDetalle(producto)}>
      <div className="card-foto">
        <img src={imagen} alt={nombre} />
        {agotado && <span className="sello sello-agotado">Agotado</span>}
        {pocos && <span className="sello sello-pocos">Últimas {stock}</span>}
      </div>
      <div className="card-cuerpo">
        <small className="card-categoria">{categoria}</small>
        <h3>{nombre}</h3>
        <p className="precio">{soles(precio)}</p>
        <small className="suave">
          {agotado ? "Vuelve mañana" : `${stock} disponibles · IGV ${soles(igvIncluido(precio))}`}
        </small>
        <button className={agregado ? "boton listo" : "boton"} disabled={agotado} onClick={agregar}>
          {agotado ? "Sin stock" : agregado ? "Agregado" : "Agregar"}
        </button>
      </div>
    </article>
  );
}
