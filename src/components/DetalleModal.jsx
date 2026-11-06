// components/DetalleModal.jsx · ventana modal con el <dialog> nativo del navegador
import { useEffect, useRef } from "react";
import { soles } from "../utils/formato.js";
import "./DetalleModal.css";

export default function DetalleModal({ producto, onCerrar }) {
  const dialogo = useRef(null); // referencia directa al <dialog> del DOM

  // Cuando llega un producto, abrimos; cuando es null, cerramos
  useEffect(() => {
    const d = dialogo.current;
    if (producto && !d.open) d.showModal(); // API del navegador: fondo oscuro + foco
    if (!producto && d.open) d.close();
  }, [producto]);

  // Esc o close() disparan el evento "close": avisamos al padre
  useEffect(() => {
    const d = dialogo.current;
    d.addEventListener("close", onCerrar);
    return () => d.removeEventListener("close", onCerrar);
  }, [onCerrar]);

  return (
    <dialog
      ref={dialogo}
      className="modal"
      // Clic en el fondo: el target es el propio <dialog>, no su contenido
      onClick={(e) => e.target === dialogo.current && dialogo.current.close()}
    >
      {producto && (
        <div className="modal-cuerpo">
          <img src={producto.imagen} alt={producto.nombre} />
          <h3>{producto.nombre}</h3>
          <p className="suave">
            {producto.categoria} · {producto.stock > 0 ? `${producto.stock} disponibles` : "Agotado"} ·{" "}
            {producto.vendidos} vendidos
          </p>
          <div className="modal-pie">
            <span className="precio">{soles(producto.precio)}</span>
            <button className="boton" onClick={() => dialogo.current.close()}>Cerrar</button>
          </div>
        </div>
      )}
    </dialog>
  );
}
