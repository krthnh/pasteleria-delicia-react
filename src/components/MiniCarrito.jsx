// components/MiniCarrito.jsx · panel lateral que entra desde la derecha
import { useEffect } from "react";
import { useCarrito } from "../context/CarritoContext.jsx";
import { soles } from "../utils/formato.js";
import "./MiniCarrito.css";

export default function MiniCarrito({ abierto, onCerrar, onVerCarrito }) {
  const { items, unidades } = useCarrito();
  const total = items.reduce((s, i) => s + i.precio * i.cantidad, 0);

  // Solo escuchamos Esc mientras el panel está abierto
  useEffect(() => {
    if (!abierto) return; // sin panel abierto, no hay nada que escuchar
    const alPresionar = (e) => e.key === "Escape" && onCerrar();
    window.addEventListener("keydown", alPresionar);
    return () => window.removeEventListener("keydown", alPresionar);
  }, [abierto, onCerrar]);

  return (
    // La clase "abierto" activa las transiciones del CSS
    <div className={abierto ? "mini abierto" : "mini"} aria-hidden={!abierto}>
      <div className="mini-velo" onClick={onCerrar} />
      <aside className="mini-panel">
        <header>
          <b>Tu carrito · {unidades}</b>
          <button className="mini-cerrar" onClick={onCerrar} aria-label="Cerrar">×</button>
        </header>
        {items.length === 0 && <p className="suave">Todavía no agregas productos.</p>}
        {items.map((i, n) => (
          // Cada línea entra un poco después (retraso calculado con JS)
          <div key={i.id} className="mini-linea" style={{ transitionDelay: abierto ? `${120 + n * 70}ms` : "0ms" }}>
            <img src={i.imagen} alt="" />
            <span>{i.cantidad} × {i.nombre}</span>
            <b>{soles(i.precio * i.cantidad)}</b>
          </div>
        ))}
        <footer>
          <p>Total <b>{soles(total)}</b></p>
          <button className="boton" onClick={onVerCarrito} disabled={items.length === 0}>Ver carrito</button>
        </footer>
      </aside>
    </div>
  );
}
