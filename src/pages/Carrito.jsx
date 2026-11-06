// pages/Carrito.jsx · botón para pasar al checkout
import { useCarrito } from "../context/CarritoContext.jsx";
import { useContadorAnimado } from "../hooks/useContadorAnimado.js";
import { soles } from "../utils/formato.js";
import SelectorCantidad from "../components/SelectorCantidad.jsx";
import "./Carrito.css";

export default function Carrito({ onNavegar }) {
  const { items, cambiar, quitar, vaciar } = useCarrito();

  // reduce: recorre el arreglo y acumula UN solo valor (empieza en 0)
  const total = items.reduce((suma, i) => suma + i.precio * i.cantidad, 0);
  const totalMostrado = useContadorAnimado(total);

  // Retorno temprano: si no hay nada, otra vista
  if (items.length === 0) {
    return (
      <section className="contenedor carrito-vacio">
        <h2>Tu carrito está vacío</h2>
        <button className="boton" onClick={() => onNavegar("catalogo")}>Ir al catálogo</button>
      </section>
    );
  }

  return (
    <section className="contenedor carrito">
      <h2>Tu carrito</h2>
      <ul className="carrito-lista">
        {items.map((i) => (
          <li key={i.id} className="carrito-item">
            <img src={i.imagen} alt="" />
            <div>
              <b>{i.nombre}</b>
              <small className="suave">{soles(i.precio)} c/u</small>
            </div>
            <SelectorCantidad
              cantidad={i.cantidad}
              maximo={i.stock}
              onCambiar={(n) => cambiar(i.id, n)}
            />
            <b>{soles(i.precio * i.cantidad)}</b>
            <button className="quitar" onClick={() => quitar(i.id)} aria-label={`Quitar ${i.nombre}`}>
              ×
            </button>
          </li>
        ))}
      </ul>
      <footer className="carrito-pie">
        <button className="chip" onClick={vaciar}>Vaciar carrito</button>
        <p className="carrito-total">
          Total <strong>{soles(totalMostrado)}</strong>
        </p>
        <button className="boton" onClick={() => onNavegar("checkout")}>Ir a pagar</button>
      </footer>
    </section>
  );
}
