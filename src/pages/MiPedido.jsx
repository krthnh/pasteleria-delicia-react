// pages/MiPedido.jsx · seguimiento del pedido; lo que se ve depende del rol
import { useState } from "react";
import LineaTiempo from "../components/LineaTiempo.jsx";
import { ESTADOS, guardarPedido, leerPedido } from "../services/pedidos.js";
import { soles } from "../utils/formato.js";
import "./MiPedido.css";

// Qué puede hacer cada rol (en la semana 13: empleado y administrador reales)
const ROLES = {
  cliente: { titulo: "Vista del cliente", puedeAvanzar: false },
  empleado: { titulo: "Vista del empleado", puedeAvanzar: true },
};

const EJEMPLO = { codigo: "PD-000042", total: 78, entrega: "delivery", estado: 1, items: [] };

export default function MiPedido({ onNavegar }) {
  const [pedido, setPedido] = useState(() => leerPedido() ?? EJEMPLO);
  const [rol, setRol] = useState("cliente");
  const { titulo, puedeAvanzar } = ROLES[rol];
  const ultimo = pedido.estado === ESTADOS.length - 1;

  const avanzar = () => {
    const nuevo = { ...pedido, estado: pedido.estado + 1 }; // objeto nuevo, nunca mutar
    setPedido(nuevo);
    guardarPedido(nuevo);
  };

  return (
    <section className="contenedor mi-pedido">
      <div className="roles" role="group" aria-label="Ver como">
        {Object.keys(ROLES).map((r) => (
          <button key={r} className={r === rol ? "chip activo" : "chip"} onClick={() => setRol(r)}>
            {r}
          </button>
        ))}
      </div>

      {/* key={rol}: al cambiar de rol la tarjeta entra de nuevo */}
      <article key={rol} className={`pedido-tarjeta ${rol}`}>
        <p className="suave">{titulo}</p>
        <h2>
          Pedido {pedido.codigo} · {ESTADOS[pedido.estado]}
        </h2>
        <LineaTiempo pasos={ESTADOS} actual={pedido.estado} />
        <p>
          {pedido.entrega === "delivery" ? "Delivery" : "Recojo en tienda"} · Total <b>{soles(pedido.total)}</b>
          {pedido.items.length > 0 && ` · ${pedido.items.length} productos`}
        </p>

        {/* Renderizado condicional por rol */}
        {puedeAvanzar ? (
          <button className="boton" onClick={avanzar} disabled={ultimo}>
            {ultimo ? "Pedido entregado" : `Pasar a "${ESTADOS[pedido.estado + 1]}"`}
          </button>
        ) : (
          <p className="nota">El estado lo actualiza el personal de la pastelería.</p>
        )}
      </article>

      {pedido === EJEMPLO && (
        <button className="chip" onClick={() => onNavegar("catalogo")}>
          Es un pedido de ejemplo: haz uno desde el catálogo
        </button>
      )}
    </section>
  );
}
